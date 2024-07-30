# Eclipse Deposit CLI

This CLI tool allows end users to deposit Ether from Ethereum Mainnet or the Sepolia test network into the Eclipse rollup, which utilizes the Solana Virtual Machine (SVM).

## Prerequisites

### Yarn

Yarn is required for installation. For Mac users, Yarn can be installed via Homebrew using `brew install yarn`. Alternatively, if npm is available, use `npm install -g yarn`.

### Ethereum Wallet

An Ethereum wallet such as Phantom or Metamask is needed.

For Metamask:
1. Choose the account you wish to use and copy its address.
2. Visit the [Sepolia faucet](https://sepoliafaucet.com/) to airdrop tokens to yourself, if using Sepolia.
3. Navigate to 'account details' in MetaMask and select 'reveal private key'. Store this key in a secure file.

### Solana CLI

The Solana CLI tools are necessary for generating a deposit address on the rollup. 

To generate a wallet for deposits:
1. Install the Solana CLI tools.
2. To generate a wallet:
    - Execute `solana-keygen new --no-outfile` or `solana-keygen new --outfile my-wallet.json`.
3. Copy the public key from the output, which should resemble `6g8wB6cJbodeYaEb5aD9QYqhdxiS8igfcHpz36oHY7p8`.

## Installation (via npm)

TODO

## Installation (via GitHub)

1. Clone this repository:
    ```bash
    git clone https://github.com/Eclipse-Laboratories-Inc/eclipse-deposit.git
    cd eclipse-deposit
    ```

2. Install the necessary dependencies:
    ```bash
    yarn install
    ```

## Create a Deposit

1. Run the CLI tool with the necessary options:
    ```bash
    node bin/cli.js -k <path_to_private_key> -d <solana_destination_address> -a <amount_in_ether> --mainnet|--sepolia 
    ```

   For example:

   **Mainnet Deposit:**
    ```bash
    node bin/cli.js -k private-key.txt -d 6g8wB6cJbodeYaEb5aD9QYqhdxiS8igfcHpz36oHY7p8 -a 0.002 --mainnet
    ```

   **Sepolia Testnet Deposit:**
    ```bash
    node bin/cli.js -k private-key.txt -d 6g8wB6cJbodeYaEb5aD9QYqhdxiS8igfcHpz36oHY7p8 -a 0.002 --sepolia
    ```
   - 
   - The `-k, --key-file` option specifies the path to the Ethereum private key file.
   - The `-d, --destination` option specifies the Solana destination address on the rollup (base58 encoded).
   - The `-a, --amount` option specifies the amount of Ether to deposit.
   - Use `--mainnet` or `--sepolia` to select the network. The tool will use different contract addresses depending on the network.
   - The `-r, --rpc-url` option is optional and allows overriding the default JSON RPC URL.

## Security Note

Keep your Ethereum private key secure. Do not share it publicly or expose it in untrusted environments.

## Support

For issues or questions, please contact cooper@eclipse.xyz.