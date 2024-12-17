#!/usr/bin/env node

/**
 * Script to deposit funds to the Eclipse rollup.
 *
 * Usage with direct address:
 * node bin/cli.js -k private-key.txt -d [Solana Address] -a [Amount Ether] --mainnet|--sepolia
 * 
 * Usage with Solana key.json:
 * node bin/cli.js -k private-key.txt --solana-key [key.json] -a [Amount Ether] --mainnet|--sepolia
 */
import { Command } from 'commander';
import { runDeposit } from '../src/lib.js';
import fs from 'fs';
import { Keypair } from '@solana/web3.js';

const program = new Command();

program
    .name('eclipse-deposit')
    .description('CLI to deposit Ether into the Eclipse rollup')
    .version('2.0.0');

program
    .description('Deposit Ether into the Eclipse rollup')
    .option('-d, --destination <address>', 'Destination address on the rollup (base58 encoded)')
    .option('--solana-key <path>', 'Path to Solana key.json file (alternative to --destination)')
    .requiredOption('-a, --amount <ether>', 'Amount in Ether to deposit')
    .option('--mainnet', 'Use Ethereum Mainnet')
    .option('--sepolia', 'Use Sepolia test network')
    .requiredOption('-k, --key-file <path>', 'Path to the Ethereum private key file')
    .action((options) => {
        if (!options.mainnet && !options.sepolia) {
            console.error('Error: You must specify either --mainnet or --sepolia');
            process.exit(1);
        }

        if (!options.destination && !options.solanaKey) {
            console.error('Error: You must specify either --destination or --solana-key');
            process.exit(1);
        }

        if (options.destination && options.solanaKey) {
            console.error('Error: Cannot specify both --destination and --solana-key');
            process.exit(1);
        }

        let destination = options.destination;
        if (options.solanaKey) {
            try {
                // Reads the keypair from the JSON file
                const keyData = JSON.parse(fs.readFileSync(options.solanaKey, 'utf8'));

                // Creates a Keypair from the array of bytes
                const keypair = Keypair.fromSecretKey(new Uint8Array(keyData));

                // Gets the public key in base58 format
                destination = keypair.publicKey.toBase58();

                console.log(`Using Solana public key: ${destination}`);
            } catch (error) {
                console.error(`Error reading/processing Solana key file: ${error.message}`);
                process.exit(1);
            }
        }

        let chainName = options.mainnet ? 'mainnet' : 'sepolia';

        runDeposit({
            destination,
            amount: options.amount,
            chainName,
            keyFile: options.keyFile
        });
    });

program.parse(process.argv);
