# Zenith Blockchain 

**Instructions to set up**

1. git clone https://github.com/rodriguesnavil/zenith
2. cd zenith/blockchain/hardhat-dao-fcc
3. yarn install
4. Create a .env file as shown in .env.example. Give the private key of the account you want to use to deploy the contracts.
5. To deploy on hardhat network
   1. yarn hardhat node
   2. In another terminal, yarn hardhat deploy --network localhost
6. To deploy on lotus
   1. Follow the instructions to set up and start lotus network from "https://github.com/hammertoe/filecoin-fvm-localnet"
   2. yarn hardhat deploy --network lotus 
7. In subsequent deployments, make sure you delete cache and deployment folders.
8. Make sure you copy the contract addresses and ABI to zenith/backend


