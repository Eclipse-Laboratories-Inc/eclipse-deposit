const { readFileSync } = require('fs');

function getPrivateKeyFromFile(filePath) {
  try {
    return readFileSync(filePath, 'utf8').trim();
  } catch (error) {
    throw new Error(`Failed to read private key from file: ${error.message}`);
  }
}

module.exports = { getPrivateKeyFromFile };
