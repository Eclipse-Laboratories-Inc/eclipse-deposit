import { encodeFunctionData } from 'viem';
import bs58 from 'bs58';

export async function deposit(
  client,
  etherBridgeAddress,
  destination,
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

    // Convert destination to bytes32 for compatibility
    const decodedSolanaAddress = bs58.decode(destination);
    // Check the length of the decoded address
    if (decodedSolanaAddress.length > 32) {
      throw new Error('Decoded address exceeds 32 bytes');
    }
    // Convert to hex and pad to 32 bytes (64 hex characters)
    const destinationBytes32 = `0x${Buffer.from(decodedSolanaAddress).toString('hex').padStart(64, '0')}`;

    // Encode the function data
    const data = encodeFunctionData({
      abi,
      functionName: 'deposit',
      args: [destinationBytes32, amountWei],
    });

    // Convert amountWei to a hex string
    const valueHex = `0x${amountWei.toString(16)}`;

    // Send the transaction
    const tx = await client.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: client.account.address,
          to: etherBridgeAddress,
          data,
          value: valueHex,
        },
      ],
    });
    console.log(`Transaction hash: ${tx.hash}`);
  } catch (error) {
    console.error(`Error during deposit: ${error.message}`);
    throw error;
  }
}
