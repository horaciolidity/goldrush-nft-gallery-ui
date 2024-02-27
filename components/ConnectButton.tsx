import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
const ConnectButton = () => {
  const [userAddress, setUserAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            setUserAddress(accounts[0]);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    checkIfWalletIsConnected();
  }, []);
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        setIsLoading(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setUserAddress(accounts[0]);
      } catch (error) {
        console.error(error);
        alert('Failed to connect wallet');
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('Metamask is not installed. Please install it to use this feature.');
    }
  };
  return (
    <button 
      onClick={connectWallet} 
      disabled={isLoading} 
      className="fixed top-0 right-0 m-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
    >
      {isLoading ? 'Connecting...' : userAddress ? `Connected: ${userAddress.substring(0, 6)}...` : 'Connect Wallet'}
    </button>
  );
};
export default ConnectButton;
