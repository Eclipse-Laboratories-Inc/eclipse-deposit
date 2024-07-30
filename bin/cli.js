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
    .requiredOption('-k, --key-file <path>', 'Path to the Ethereum private key file')
    .requiredOption('-d, --destination <address>', 'Destination address on the rollup (base58 encoded)')
    .requiredOption('-a, --amount <ether>', 'Amount in Ether to deposit')
    .option('--mainnet', 'Use Ethereum Mainnet')
    .option('--sepolia', 'Use Sepolia test network')
    .option('-r, --rpc-url <url>', 'Optional: JSON RPC URL to override the default')
    .action((options) => {
        if (!options.mainnet && !options.sepolia) {
            console.error('Error: You must specify either --mainnet or --sepolia');
            process.exit(1);
        }
        runDeposit(options);
    });

// Defaults to 'deposit' subcommand if no other subcommand is provided
program
    .arguments('[args...]')
    .action((args, cmdObj) => {
        if (cmdObj.opts().keyFile || cmdObj.opts().destination || cmdObj.opts().amount || cmdObj.opts().mainnet || cmdObj.opts().sepolia || cmdObj.opts().rpcUrl) {
            runDeposit(cmdObj.opts());
        } else {
            console.error('Error: Missing arguments for deposit.');
            program.outputHelp();
        }
    });
program.parse(process.argv);
