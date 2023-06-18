# Zenith Backend

**Instructions to setup:**

1. git clone https://github.com/rodriguesnavil/zenith
2. cd zenith/backend. 
4. npm install
5. create .env file
6. Copy contents on .env-example to .env file
7. Make sure contracts are deployed and contract Addresses(helper-contract.ts) and ABI are updated.
8. npm start

**Instructions to create .env file**
1. MONGO_URI is the URL of the mongoDB Atlas (). Either setup a new cluster with name "Zenith-CLUSTER" or use an existing cluster
2. PRIVATE_KEY_HARDHAT and PRIVATE_KEY_LOTUS are the private keys that are used to interact with the smart contracts deployed on hardhat network and lotus network respectively. Remember lotus is also a local network formed by running https://github.com/hammertoe/filecoin-fvm-localnet
3. LIGHTHOUSE_API_KEY is the bearer token to interact with https://data.lighthouse.storage/dashboard. Has to perform some reverse engineering to obtain the bearer token. Go to the website data.lighthouse.storage and login. After login, right- click on the browser to inspect. Go to Network and select user_details API. In header, Authorization token can be found.
