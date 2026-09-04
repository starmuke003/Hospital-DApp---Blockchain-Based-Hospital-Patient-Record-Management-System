# Hospital DApp — Blockchain-Based Patient Record Management System

A decentralized hospital application developed as a group project to demonstrate how blockchain technology can be used to manage and retrieve patient records securely.

The application provides a web-based interface that allows users to connect their cryptocurrency wallet, register patient information, and retrieve records stored on a local Ethereum blockchain.

## Features

* MetaMask wallet integration for connecting users to the blockchain.
* Patient registration including name, age, and disease information.
* Blockchain-based storage and retrieval of patient records.
* Retrieval of the latest patient record.
* Retrieval and display of multiple patient records.
* Loading states and status feedback for blockchain operations.
* Transaction confirmation through MetaMask.
* React-based user interface for interacting with the hospital system.

## Technologies Used

* React.js
* JavaScript
* Solidity
* Ethereum
* Hardhat
* Ethers.js
* MetaMask
* HTML
* CSS
* Node.js
* npm

## How It Works

1. The user opens the Hospital DApp in a web browser.
2. The user connects their MetaMask wallet.
3. The frontend connects to the hospital smart contract using Ethers.js and the contract ABI.
4. Patient information is entered through the registration form.
5. The registration transaction is submitted to the blockchain.
6. The user confirms the transaction through MetaMask.
7. Once the transaction is confirmed, the patient record can be retrieved from the smart contract.
8. Users can view the latest patient record or load multiple registered records.

## My Contribution

My contribution focused primarily on User Interface Development and blockchain integration.

I:

* Designed and implemented the React-based user interface.
* Integrated MetaMask wallet connection into the application.
* Connected the frontend to the hospital smart contract using Ethers.js and the contract ABI.
* Implemented patient registration through the frontend.
* Implemented patient record retrieval and display.
* Added loading states and status feedback for blockchain operations.
* Implemented toast notifications to improve user experience.
* Tested the interface by registering and retrieving patient records from the blockchain.

## Security

The application uses wallet-based authentication through MetaMask. Transactions that modify blockchain data require the user's wallet to approve and sign the transaction.

MetaMask handles transaction signing and wallet authorization, meaning the application does not directly access the user's private keys.

## Testing

The application was tested by:

* Connecting a MetaMask wallet.
* Registering patient records.
* Confirming blockchain transactions through MetaMask.
* Retrieving the latest patient record.
* Loading multiple patient records.
* Testing loading and error states.
* Verifying that registered information could be retrieved from the blockchain.

## Project Purpose

This project demonstrates the practical application of blockchain technology in healthcare, particularly for decentralized patient record management. It also demonstrates how a React-based web interface can interact with Ethereum smart contracts.

## Project Type

Group University Project

Area: Blockchain, Web3 and Healthcare Technology
