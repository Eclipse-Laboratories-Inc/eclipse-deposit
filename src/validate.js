import bs58 from 'bs58';
import PublicKey from '@solana/web3.js';

// List of known Solana native program addresses
const SOLANA_NATIVE_PROGRAMS = new Set([
  '11111111111111111111111111111111', // System Program
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA', // SPL Token Program
  'Stake11111111111111111111111111111111111111', // Stake Program
  // Add other known native programs as needed
]);

// Function to validate Solana address
export function validateSolanaAddress(address) {
  try {
    // Decode the base58 address
    const decoded = bs58.decode(address);

    // Check the length to ensure it's a valid Ed25519 public key
    if (decoded.length !== 32) {
      throw new Error('Invalid length for a Solana address.');
    }

    // TODO: finish validation for solana addres
    // // Convert the decoded address to a PublicKey object
    // const publicKey = new PublicKey(decoded);
    //
    // // Check if the address is a known native program
    // if (SOLANA_NATIVE_PROGRAMS.has(publicKey.toString())) {
    //   throw new Error('Address is a reserved Solana native program.');
    // }
    //
    // // Additional check using Solana Web3's PublicKey class for verification
    // if (!PublicKey.isOnCurve(publicKey.toBuffer())) {
    //   throw new Error('Address is not a valid Ed25519 public key.');
    // }

    return true;
  } catch (error) {
    console.error(`Validation error: ${error.message}`);
    return false;
  }
}
