async function deposit(client, etherBridgeAddress, destination, amountWei) {
  try {
    // Define the ABI for the EtherBridge contract
    const abi = ['function deposit(bytes32,uint256) payable'];
    const contract = new client.Contract(etherBridgeAddress, abi);

    // Convert destination to bytes32 for compatibility
    const destinationBytes32 = `0x${Buffer.from(destination).toString('hex').padEnd(64, '0')}`;

    // Send the deposit transaction
    const tx = await contract.deposit(destinationBytes32, amountWei);
    console.log(`Transaction hash: ${tx.hash}`);
  } catch (error) {
    console.error(`Error during deposit: ${error.message}`);
    throw error;
  }
}

module.exports = deposit;
