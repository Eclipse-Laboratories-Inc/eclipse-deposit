import { createWalletClient, http, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { NETWORK_CONFIG, getPrivateKeyFromFile } from './config.js';
import { validateSolanaAddress } from './validate.js';
import { deposit } from './deposit.js';

export async function runDeposit({ destination, amount, chainName, keyFile }) {
  try {
    // Validate and decode destination address
    if (!validateSolanaAddress(destination)) {
      throw new Error('Invalid Solana address.');
    }

    // Parse and validate the amount
    const amountWei = parseEther(amount);
    const minAmountWei = parseEther('0.002');
    if (amountWei < minAmountWei) {
      throw new Error(
        'Insufficient deposit value. Min is 0.002 ether / 2_000_000 gwei',
      );
    }

    // Retrieve and validate the private key from file
    let privateKey = getPrivateKeyFromFile(keyFile);
    if (!privateKey.startsWith('0x')) {
      privateKey = `0x${privateKey}`;
    }
    const account = privateKeyToAccount(privateKey);

    // Create wallet client from chain
    const networkConfig = NETWORK_CONFIG[chainName];
    if (!networkConfig) {
      throw new Error(`No configuration found for chain: ${chainName}`);
    }
    const { chain, etherBridgeAddress } = networkConfig;
    const client = createWalletClient({
      chain: chain,
      transport: http(),
    });

    // Call the deposit function with the validated inputs
    await deposit(client, account, etherBridgeAddress, destination, amountWei);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
