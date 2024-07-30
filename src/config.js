import { readFileSync } from 'fs';

// Define network configurations
export const NETWORK_CONFIG = {
  mainnet: {
    etherBridgeAddress: '0x83cB71D80078bf670b3EfeC6AD9E5E6407cD0fd1',
    rpcUrl: 'https://eth.llamarpc.com',
  },
  sepolia: {
    etherBridgeAddress: '0xA54BCb72deDdEA36ef2B4dA12741eFcdC7c72eF1',
    rpcUrl: 'https://rpc2.sepolia.org',
  },
};

export function getPrivateKeyFromFile(filePath) {
  try {
    return readFileSync(filePath, 'utf8').trim();
  } catch (error) {
    throw new Error(`Failed to read private key from file: ${error.message}`);
  }
}
