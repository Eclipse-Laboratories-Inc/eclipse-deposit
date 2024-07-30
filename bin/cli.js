#!/usr/bin/env node

/**
 * Script to deposit funds to the Eclipse rollup.
 *
 * Usage:
 * node deposit.js [Solana Address] [EtherBridge Address] [Amount in Gwei] [Private Key] [JSON RPC URL]
 *
 * Example on Anvil devnode:
 * node deposit.js EAjFK3iWqYdRbCAuDhfCNHo2EMj3S7eg5QrU7DMcNEXD 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 1500000 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 http://localhost:8545
 *
 * Example on EtherBridge (0x11b8db6bb77ad8cb9af09d0867bb6b92477dd68e) on Sepolia test network:
 * node deposit.js 6g8wB6cJbodeYaEb5aD9QYqhdxiS8igfcHpz36oHY7p8 0x11b8db6bb77ad8cb9af09d0867bb6b92477dd68e 1500000 <use-your-sepolia-private-key> https://rpc2.sepolia.org
 * Transaction hash: 0x335c067c7280aa3bd2d688cd4c8695c86b3f7fe785be5379c5d98731db0269cf
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
