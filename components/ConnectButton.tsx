import React, { useState } from 'react';
import { ethers } from 'ethers';

const ConnectButton = () => {
  const [userAddress, setUserAddress] = useState('');

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // Solicitar acceso a la cuenta si es necesario
        const accounts = await provider.send("eth_requestAccounts", []);
        const account = accounts[0];
        setUserAddress(account);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Metamask is not installed. Please install it to use this feature.');
    }
  };

  return (
    <button onClick={connectWallet} className="fixed top-0 right-0 m-4 p-2 bg-blue-500 text-white rounded">
      {userAddress ? `Connected: ${userAddress.substring(0, 6)}...` : 'Connect Wallet'}
    </button>
  );
};

export default ConnectButton;
