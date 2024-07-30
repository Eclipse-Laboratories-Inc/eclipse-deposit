import { readFileSync } from 'fs';

export function getPrivateKeyFromFile(filePath) {
  try {
    return readFileSync(filePath, 'utf8').trim();
  } catch (error) {
    throw new Error(`Failed to read private key from file: ${error.message}`);
  }
}
