import { createClient, parseEther } from 'viem';
import { NETWORK_CONFIG, getPrivateKeyFromFile } from './config.js';
import { validateSolanaAddress } from './validate.js';
import { deposit } from './deposit.js';

export async function runDeposit({
  keyFile,
  destination,
  amount,
  mainnet,
  sepolia,
  rpcUrl,
}) {
  try {
    // Determine the network and validate
    const network = mainnet ? 'mainnet' : sepolia ? 'sepolia' : null;
    if (!network) {
      throw new Error('Invalid network selection.');
    }

    // Validate and decode destination address
    if (!validateSolanaAddress(destination)) {
      throw new Error('Invalid Solana address.');
    }

    // Parse and validate the amount
    const amountWei = parseEther(amount);

    // Retrieve the private key from file
    const privateKey = getPrivateKeyFromFile(keyFile);

    // Get network-specific configuration
    const { etherBridgeAddress, rpcUrl: defaultRpcUrl } =
      NETWORK_CONFIG[network];
    const effectiveRpcUrl = rpcUrl || defaultRpcUrl;

    // Set up the client
    const client = createClient({
      transport: effectiveRpcUrl,
      wallet: { privateKey },
    });

    // Call the deposit function with the validated inputs
    await deposit(client, etherBridgeAddress, destination, amountWei);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
