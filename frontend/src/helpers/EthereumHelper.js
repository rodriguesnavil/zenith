import { ethers } from 'ethers';

export const connectToMetamask = async () => {
    // Check if Metamask is installed
    if (!window.ethereum) {
        alert('Please install Metamask');
        return;
    }

    // Request account access
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
        alert('Access to your Ethereum account rejected');
        return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider.getSigner();  // returns the user's signer
};

export const setUserRole = async (role, signer) => {
    // Get the contract address and ABI
    // const contractAddress = 'contract-address';
    // const contractABI = 'contract-ABI';

    return true;
    // try {
    //     // // Create a new instance of the contract
    //     // const contract = new ethers.Contract(contractAddress, contractABI, signer);

    //     // const tx = await contract.setRole(role);

    //     // // Wait for the transaction to be mined
    //     // const receipt = await tx.wait();

    //     // // Check if the transaction was successful
    //     // if (receipt.status === 1) {
    //     //     return true;
    //     // } else {
    //     //     return false;
    //     // }
    // } catch (error) {
    //     console.error('An error occurred while setting the user role:', error);
    //     return false;
    // }
};  
