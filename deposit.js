/**
 * Script to deposit funds to EtherBridge contract using a Solana address and amount to be used in the Eclipse rollup.
 *
 * Usage:
 * node deposit.js [Solana Address] [EtherBridge Address] [Amount in Gwei] [Private Key] [JSON RPC URL]
 *
 * Example on Anvil devnode:
 * node deposit.js EAjFK3iWqYdRbCAuDhfCNHo2EMj3S7eg5QrU7DMcNEXD 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 1500000 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 http://localhost:8545
 *
 * Example on EtherBridge (0x11b8db6bb77ad8cb9af09d0867bb6b92477dd68e) on Sepolia test network:
 * node deposit.js 6g8wB6cJbodeYaEb5aD9QYqhdxiS8igfcHpz36oHY7p8 0x11b8db6bb77ad8cb9af09d0867bb6b92477dd68e 1500000 <use-your-sepolia-private-key> https://rpc2.sepolia.org
 * Transaction hash: 0x335c067c7280aa3bd2d688cd4c8695c86b3f7fe785be5379c5d98731db0269cf
 */

const ethers = require("ethers");
const bs58 = require("bs58");
const utils = require("ethers/utils");
const readline = require("readline");

// Function to prompt user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function askQuestion(query) {
  return new Promise((resolve) =>
    rl.question(query, (answer) => resolve(answer))
  );
}

async function main() {
  const solanaAddress = await askQuestion("Enter Solana Address: ");
  const etherBridgeAddress = await askQuestion("Enter EtherBridge Address: ");
  const amount = await askQuestion("Enter Amount in Gwei: ");
  const privateKey = await askQuestion("Enter Private Key: ");

  // Note about JSON RPC URL being optional
  console.log(
    "Enter JSON RPC URL (optional, press enter to use default https://rpc2.sepolia.org/):"
  );
  let jsonRpcUrl = await askQuestion("");
  if (!jsonRpcUrl) {
    jsonRpcUrl = "https://rpc2.sepolia.org/";
  }

  // Convert Solana address from base58 to hex
  const decodedSolanaAddress = bs58.decode(solanaAddress);
  const hexSolanaAddress = utils.hexlify(decodedSolanaAddress);

  // Setup Ethereum blockchain connection
  const provider = new ethers.JsonRpcProvider(jsonRpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  // Define the EtherBridge contract interaction
  async function depositToEtherBridge() {
    const abi = [
      "function deposit(bytes32,uint256) payable",
      "function MIN_DEPOSIT() pure returns (uint256)",
    ];
    const contract = new ethers.Contract(etherBridgeAddress, abi, wallet);

    try {
      // Convert the amount to Wei for consistency with Solidity
      const amountWei = ethers.parseUnits(amount, "gwei");

      // Notify user that deposit is starting
      console.log("Starting the deposit process...");

      // Submit a deposit transaction
      const tx = await contract.deposit(hexSolanaAddress, amountWei, {
        value: amountWei,
        gasLimit: "300000",
      });

      // Output transaction hash
      console.log(`Transaction hash: ${tx.hash}`);
    } catch (error) {
      console.error(`Exception: ${error.message}`);
    }
  }

  await depositToEtherBridge();
  rl.close();
}

main();
