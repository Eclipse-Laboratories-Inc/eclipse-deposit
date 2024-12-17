import { jest } from '@jest/globals';
import fs from 'fs';
import { Keypair } from '@solana/web3.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { Command } from 'commander';

// Creates mock functions
const mockRunDeposit = jest
    .fn()
    .mockImplementation(async ({ destination, amount, chainName, keyFile }) => {
        if (!destination || !amount || !chainName || !keyFile) {
            throw new Error('Missing required parameters');
        }
        // Mock transaction hash
        return '0x123...';
    });

// Mocks the entire lib.js module
jest.mock('../src/lib.js', () => ({
    runDeposit: mockRunDeposit,
}));

// Gets the directory name in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

class CLIError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}

function createCliProgram() {
    const program = new Command();
    program
        .option(
            '-d, --destination <address>',
            'Destination address on the rollup (base58 encoded)',
        )
        .option(
            '--solana-key <path>',
            'Path to Solana key.json file (alternative to --destination)',
        )
        .requiredOption('-a, --amount <ether>', 'Amount in Ether to deposit')
        .option('--mainnet', 'Use Ethereum Mainnet')
        .option('--sepolia', 'Use Sepolia test network')
        .requiredOption(
            '-k, --key-file <path>',
            'Path to the Ethereum private key file',
        )
        .action(async (options) => {
            if (!options.mainnet && !options.sepolia) {
                console.error('Error: You must specify either --mainnet or --sepolia');
                process.exit(1);
            }

            if (!options.destination && !options.solanaKey) {
                console.error(
                    'Error: You must specify either --destination or --solana-key',
                );
                process.exit(1);
            }

            if (options.destination && options.solanaKey) {
                console.error(
                    'Error: Cannot specify both --destination and --solana-key',
                );
                process.exit(1);
            }

            let destination = options.destination;
            if (options.solanaKey) {
                try {
                    const keyData = JSON.parse(
                        fs.readFileSync(options.solanaKey, 'utf8'),
                    );
                    const keypair = Keypair.fromSecretKey(new Uint8Array(keyData));
                    destination = keypair.publicKey.toBase58();
                    console.log(`Using Solana public key: ${destination}`);
                } catch (error) {
                    console.error(
                        `Error reading/processing Solana key file: ${error.message}`,
                    );
                    throw new CLIError('Failed to process key file', 1);
                }
            }

            let chainName = options.mainnet ? 'mainnet' : 'sepolia';

            try {
                const txHash = await mockRunDeposit({
                    destination,
                    amount: options.amount,
                    chainName,
                    keyFile: options.keyFile,
                });
                console.log(`Transaction hash: ${txHash}`);
                return txHash;
            } catch (error) {
                console.error(`Transaction failed: ${error.message}`);
                throw error;
            }
        });

    return program;
}

describe('CLI Solana Key Handling', () => {
    const TEST_AMOUNT = '0.001';
    const TEST_ETH_KEY = 'eth-key.txt';
    const TEST_NETWORK = '--mainnet';

    let mockExit;
    let mockConsoleError;
    let mockConsoleLog;
    let testKeypair;
    let testKeyPath;

    const createCliArgs = (keyPath, additionalArgs = []) => [
        'node',
        'cli.js',
        '-k',
        TEST_ETH_KEY,
        '--solana-key',
        keyPath,
        '-a',
        TEST_AMOUNT,
        TEST_NETWORK,
        ...additionalArgs,
    ];

    const writeKeyFile = (path, data) => {
        fs.writeFileSync(path, JSON.stringify(data));
    };

    // Helper to clean up temporary test files
    const cleanupFile = (path) => {
        if (fs.existsSync(path)) {
            fs.unlinkSync(path);
        }
    };

    beforeEach(() => {
        // Mocks process.exit
        mockExit = jest.spyOn(process, 'exit').mockImplementation((code) => {
            throw new CLIError('Process exit', code);
        });

        // Mocks console.error and console.log
        mockConsoleError = jest
            .spyOn(console, 'error')
            .mockImplementation(() => { });
        mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => { });

        // Creates test keypair and path
        testKeypair = Keypair.generate();
        testKeyPath = path.join(__dirname, 'test-key.json');

        jest.clearAllMocks();
    });

    afterEach(() => {
        // Restores all mocks
        mockExit.mockRestore();
        mockConsoleError.mockRestore();
        mockConsoleLog.mockRestore();

        cleanupFile(testKeyPath);
    });

    test('should correctly derive public key from Solana keypair file', async () => {
        try {
            writeKeyFile(testKeyPath, Array.from(testKeypair.secretKey));

            const program = createCliProgram();
            await program.parseAsync(createCliArgs(testKeyPath));

            expect(mockConsoleLog).toHaveBeenCalledWith(
                `Using Solana public key: ${testKeypair.publicKey.toBase58()}`,
            );

            expect(mockRunDeposit).toHaveBeenCalledWith({
                destination: testKeypair.publicKey.toBase58(),
                amount: TEST_AMOUNT,
                chainName: 'mainnet',
                keyFile: TEST_ETH_KEY,
            });
        } finally {
            cleanupFile(testKeyPath);
        }
    });

    test('should fail gracefully with invalid Solana key file', async () => {
        try {
            writeKeyFile(testKeyPath, { invalid: 'data' });

            const program = createCliProgram();
            await expect(async () => {
                await program.parseAsync(createCliArgs(testKeyPath));
            }).rejects.toThrow('Failed to process key file');

            expect(mockConsoleError).toHaveBeenCalledWith(
                expect.stringContaining('Error reading/processing Solana key file'),
            );

            expect(mockRunDeposit).not.toHaveBeenCalled();
        } finally {
            cleanupFile(testKeyPath);
        }
    });

    test('should handle transaction errors gracefully', async () => {
        mockRunDeposit.mockImplementationOnce(async () => {
            throw new Error('Transaction failed');
        });

        try {
            writeKeyFile(testKeyPath, Array.from(testKeypair.secretKey));

            const program = createCliProgram();
            await expect(
                program.parseAsync(createCliArgs(testKeyPath)),
            ).rejects.toThrow('Transaction failed');

            expect(mockRunDeposit).toHaveBeenCalledWith({
                destination: testKeypair.publicKey.toBase58(),
                amount: TEST_AMOUNT,
                chainName: 'mainnet',
                keyFile: TEST_ETH_KEY,
            });
            expect(mockConsoleError).toHaveBeenCalledWith(
                'Transaction failed: Transaction failed',
            );
        } finally {
            cleanupFile(testKeyPath);
        }
    });

    test('should handle successful transaction', async () => {
        try {
            writeKeyFile(testKeyPath, Array.from(testKeypair.secretKey));

            const program = createCliProgram();
            await program.parseAsync(createCliArgs(testKeyPath));

            expect(mockRunDeposit).toHaveBeenCalledWith({
                destination: testKeypair.publicKey.toBase58(),
                amount: TEST_AMOUNT,
                chainName: 'mainnet',
                keyFile: TEST_ETH_KEY,
            });

            expect(mockConsoleLog).toHaveBeenCalledWith('Transaction hash: 0x123...');
        } finally {
            cleanupFile(testKeyPath);
        }
    });
});
