#!/usr/bin/env node

import { Command } from 'commander';
import { runDeposit } from '../src/lib.js'; // Note the `.js` extension

const program = new Command();

program
    .name('eclipse-deposit')
    .description('CLI to deposit Ether into the Eclipse rollup')
    .version('2.0.0');

program
    .command('deposit')
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
// destination, amount, chain_name, keyFile,
// Defaults to 'deposit' subcommand if no other subcommand is provided
// program
//     .arguments('[args...]')
//     .action((args, cmdObj) => {
//         let chainName = '';
//         if (cmdObj.opts().mainnet) {
//             chainName = 'mainnet'
//         } else if (cmdObj.opts().sepolia) {
//             chainName = 'sepolia'
//         } else {
//             throw new Error("Invalid chain name");
//         }
//         if (cmdObj.opts().destination || cmdObj.opts().amount || cmdObj.opts().keyFile ) {
//             runDeposit({
//                 destination: cmdObj.opts().destination,
//                 amount: cmdObj.opts().amount,
//                 chainName: chainName,
//                 keyFile: cmdObj.opts().keyFile
//             });
//         } else {
//             console.error('Error: Missing arguments for deposit.');
//             program.outputHelp();
//         }
//     });

program.parse(process.argv);
