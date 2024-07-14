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

1. Obtain and set up the `deposit.js` script:
   - Clone this repository
   - Install script dependencies:
     - `yarn install`
2. Execute the script:

   - `node deposit.js`

3. Follow the prompts to input the required parameters:
   - **Solana Address**: The address you generated using the Solana CLI or Phantom.
   - **EtherBridge Address**: The Ethereum contract address to which you are depositing.
   - **Amount in Gwei**: The desired deposit amount, with a minimum of `1500000` gwei (0.0015 ETH).
   - **Ethereum Private Key**: Your private key from Metamask.
   - **JSON RPC URL (optional)**: The URL of the Ethereum node. Press Enter to use the default `https://rpc2.sepolia.org/`.

Details:

- The `[Solana Address]` is the one you generated using the Solana CLI or Phantom.
- The `[EtherBridge Address]` is the Ethereum contract address to which you are depositing.
- The `[Amount in Gwei]` is the desired deposit amount, with a minimum of `1500000` gwei (0.0015 ETH).
- The `[Ethereum Private Key]` is sourced from Metamask.
- The `[JSON RPC URL]` defaults to `https://rpc2.sepolia.org/` if not provided.

## Example

````js node deposit.js

Enter Solana Address: 6g8wB6cJbodeYaEb5aD9QYqhdxiS8igfcHpz36oHY7p8
Enter EtherBridge Address: 0x11b8db6bb77ad8cb9af09d0867bb6b92477dd68e
Enter Amount in Gwei: 1500000
Enter Private Key: <your-private-key>
Enter JSON RPC URL (optional, press enter to use default https://rpc2.sepolia.org/):

Starting the deposit process...

Transaction hash: 0x325c065c7280aa3bd2d688cd4c8694c86b3f7fe785be5379c5d98731db0269cf```
````
