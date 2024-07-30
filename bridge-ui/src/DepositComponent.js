import React, { useState } from 'react';
import { ethers } from 'ethers';
import { PublicKey } from '@solana/web3.js';
import './DepositComponent.css'; 


const DepositComponent = () => {
  const [destinationSolana, setDestinationSolana] = useState('');
  const [amountEther, setAmountEther] = useState('');

  const contractAddress = '0x83cB71D80078bf670b3EfeC6AD9E5E6407cD0fd1';
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

  const solanaToBytes32 = (solanaAddress) => {
    try {
      const publicKey = new PublicKey(solanaAddress);
      return ethers.hexlify(publicKey.toBytes().slice(0, 32));
    } catch (error) {
      console.error('Invalid Solana address', error);
      throw new Error('Invalid Solana address');
    }
  };

  const deposit = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask!');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      // Convert Solana address to bytes32
      const destinationBytes32 = solanaToBytes32(destinationSolana);

      // Convert Ether to Wei
      const amountWei = ethers.parseEther(amountEther);

      const tx = await contract.deposit(destinationBytes32, amountWei, { value: amountWei });
      console.log(`Transaction hash: ${tx.hash}`);
      alert(`Transaction sent! Hash: ${tx.hash}`);
    } catch (error) {
      console.error(`Error during deposit: ${error.message}`);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Deposit to Eclipse</h1>
      <input
        type="text"
        placeholder="Solana Destination Address"
        value={destinationSolana}
        onChange={(e) => setDestinationSolana(e.target.value)}
      />
      <input
        type="number"
        step="0.000000000000000001"
        placeholder="Amount in Ether"
        value={amountEther}
        onChange={(e) => setAmountEther(e.target.value)}
      />
      <button onClick={deposit}>Deposit</button>
    </div>
  );
};

export default DepositComponent;