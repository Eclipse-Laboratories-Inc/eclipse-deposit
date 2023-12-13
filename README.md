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
    - `node deposit.js [Solana Address] 0x7C9e161ebe55000a3220F972058Fb83273653a6e [Amount in Gwei] [Fee in Gwei] [Ethereum Private Key] https://rpc.sepolia.org

Details:
- The `[Solana Address]` is the one you generated using the Solana CLI or Phantom.
- The `[Ethereum Private Key]` is sourced from Metamask.
- `[Amount in Gwei]` is the desired deposit amount, with a minimum of '1500000' gwei (0.0015 ETH).
- `[Fee in Gwei]` is the transaction processing fee, currently is ignored but can set to '100' gwei.

A successful command example:

> node deposit.js yyiecymjvwYE6Wxg4ZSt4ibdfFRo3JUNhQ99AKnaRqu 0x7C9e161ebe55000a3220F972058Fb83273653a6e 1500000 100 3e1bf180e4778c7944f509b422711101186d26ac15337934f12088623755c0b7 https://rpc.sepolia.org/

> Transaction successful: 0xb05a37f4e4b420f651fdffb0b169ba96cb8c8e201b32f3d8d0c94705d7dc6d5f
