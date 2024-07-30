import { encodeFunctionData } from 'viem';

export async function deposit(
  client,
  account,
  etherBridgeAddress,
  destinationHex,
  amountWei,
) {
  try {
    // Define the ABI for the EtherBridge contract
    const abi = [
      {
        inputs: [
          { internalType: 'bytes32', name: '', type: 'bytes32' },
          { internalType: 'uint256', name: '', type: 'uint256' },
        ],
        name: 'deposit',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
    ];

    // Encode the function data
    const data = encodeFunctionData({
      abi,
      functionName: 'deposit',
      args: [destinationHex, amountWei],
    });

    // Send the transaction
    const hash = await client.sendTransaction({
      data: data.toString(),
      account,
      to: etherBridgeAddress,
      value: amountWei,
    });
    console.log(`Transaction hash: ${hash}`);
  } catch (error) {
    console.error(`Error during deposit: ${error.message}`);
    throw error;
  }
}
