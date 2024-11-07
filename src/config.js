import { readFileSync } from 'fs';
import { mainnet, sepolia } from 'viem/chains';

// Define network configurations
export const NETWORK_CONFIG = {
  mainnet: {
    etherBridgeAddress: '0x83cB71D80078bf670b3EfeC6AD9E5E6407cD0fd1',
    chain: mainnet,
    rpc: 'https://empty-responsive-patron.quiknode.pro/91dfa8475605dcdec9afdc8273578c9f349774a1/',
  },
  sepolia: {
    etherBridgeAddress: '0xe49AAa25a10fd6e15DD7DDCb50904cA1E91f6E01',
    chain: sepolia,
    rpc: 'https://maximum-frosty-forest.ethereum-sepolia.quiknode.pro/cca5941eb8511a5df51881ed54cb91d4eec479a1/',
  },
};

export function getPrivateKeyFromFile(filePath) {
  try {
    return readFileSync(filePath, 'utf8').trim();
  } catch (error) {
    throw new Error(`Failed to read private key from file: ${error.message}`);
  }
}
