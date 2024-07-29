const { createClient, parseEther } = require('viem');
const { getPrivateKeyFromFile } = require('./config');
const { validateSolanaAddress } = require('./validate');
const deposit = require('./deposit');

// Define network configurations
const NETWORK_CONFIG = {
  mainnet: {
    etherBridgeAddress: '0xMainnetContractAddress',
    rpcUrl: 'todo',
  },
  sepolia: {
    etherBridgeAddress: '0xSepoliaContractAddress',
    rpcUrl: 'https://rpc2.sepolia.org',
  },
};

async function runDeposit({
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

module.exports = {
  runDeposit,
};
