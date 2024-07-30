#!/usr/bin/env node

/**
 * Script to deposit funds to the Eclipse rollup.
 *
 * Usage:
 * # To deposit on Sepolia
 * node bin/cli.js --address [Solana Address] --amount [Amount Ether] --key-file [Private Key File] --sepolia
 *
 * # To deposit on Mainnet
 * node bin/cli.js --address [Solana Address] --amount [Amount Ether] --key-file [Private Key File] --mainnet
 *
 * Example on Sepolia:
 * > node bin/cli.js --address EAjFK3iWqYdRbCAuDhfCNHo2EMj3S7eg5QrU7DMcNEXD --amount 0.002 --key-file private-key.txt --sepolia
 * > Transaction hash: 0x335c067c7280aa3bd2d688cd4c8695c86b3f7fe785be5379c5d98731db0269cf
 */
import { Command } from 'commander';
import { runDeposit } from '../src/lib.js'; // Note the `.js` extension

const program = new Command();

program
    .name('eclipse-deposit')
    .description('CLI to deposit Ether into the Eclipse rollup')
    .version('2.0.0');

program
    .description('Deposit Ether into the Eclipse rollup')
    .requiredOption('-d, --destination <address>', 'Destination address on the rollup (base58 encoded)')
    .requiredOption('-a, --amount <ether>', 'Amount in Ether to deposit')
    .option('--mainnet', 'Use Ethereum Mainnet')
    .option('--sepolia', 'Use Sepolia test network')
    .requiredOption('-k, --key-file <path>', 'Path to the Ethereum private key file')
    .action((options) => {
        if (!options.mainnet && !options.sepolia) {
            console.error('Error: You must specify either --mainnet or --sepolia');
            process.exit(1);
        }
        let chainName = '';
        if (options.mainnet) {
            chainName = 'mainnet'
        } else if (options.sepolia) {
            chainName = 'sepolia'
        } else {
            throw new Error("Invalid chain name");
        }
        runDeposit({
            destination: options.destination,
            amount: options.amount,
            chainName: chainName,
            keyFile: options.keyFile
        });
    });

program.parse(process.argv);
