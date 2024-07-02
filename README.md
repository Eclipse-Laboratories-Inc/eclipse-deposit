# Deposit on Testnet

This script allows end users to deposit Ether from Sepolia to the Eclipse test network.

## Prerequisites

### Yarn

Yarn is required for installation. For Mac users, Yarn can be installed via Homebrew using `brew install yarn`. Alternatively, if npm is available, use `npm install -g yarn`.

### Ethereum Wallet

An Ethereum wallet such as Phantom or Metamask is needed.

For Metamask:
1. Choose the account you wish to use and copy its address.
2. Visit the [Sepolia faucet](https://sepoliafaucet.com/) to airdrop tokens to yourself.
3. To obtain your private key for later use, navigate to 'account details' in Metamask and select 'reveal private key'.

### Solana CLI

The Solana CLI tools are necessary for generating a deposit address on the rollup. 

To generate a wallet for deposits:
1. Install the Solana CLI tools.
2. To generate a wallet:
    - Execute `solana-keygen new --no-outfile` or `solana-keygen new --outfile my-wallet.json`.
3. Copy the public key from the output, which should resemble `6g8wB6cJbodeYaEb5aD9QYqhdxiS8igfcHpz36oHY7p8`.

## Create a Deposit

1. Obtain and set up the deposit.js script:
    - Clone this repository
    - Install script dependencies:
        - `yarn install`
2. Execute the script:
    - `node deposit.js [Solana Address] 0x11b8db6bb77ad8cb9af09d0867bb6b92477dd68e [Amount in Gwei] [Ethereum Private Key] https://rpc.sepolia.org

Details:
- The `[Solana Address]` is the one you generated using the Solana CLI or Phantom.
- The `[Ethereum Private Key]` is sourced from Metamask.
- `[Amount in Gwei]` is the desired deposit amount, with a minimum of '1500000' gwei (0.0015 ETH).

