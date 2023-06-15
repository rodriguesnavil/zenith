import { ethers } from "ethers";
import * as ZenithContract from "../src/ABIs/Zenith.json";
import * as GovernorContract from "../src/ABIs/GovernorContract.json";

//export const PROVIDER_URL= "http://localhost:8545";
export const PROVIDER_URL= "http://127.0.0.1:1234/rpc/v1"

//const privateKey = process.env.PRIVATE_KEY_HARDHAT;
const privateKey = process.env.PRIVATE_KEY_LOTUS;

export const ZENITH_ADDRESS = "0x43C795bE3575F2F4137237cF217D752Ce27870E4";
export const GOVERNOR_ADDRESS = "0x83d999C0DF47Bc70A8b1bf76a68a9ac85d011C96";

export const FUNCTION_TO_CALL_Reviewer = "addReviewer";
export const FUNCTION_TO_CALL_Article = "addArticle";



// Check if private key is present
if (!privateKey) {
  console.error("Private key not found in environment variables!");
  process.exit(1);
}

async function getProvider() {
  const provider = await new ethers.providers.JsonRpcProvider(
    PROVIDER_URL
  );
  return provider;
}
async function getWallet() {
  const provider = await getProvider();
  const wallet = await new ethers.Wallet(privateKey, provider);
  return wallet;
}
async function getZenithAddressAndABI() {
  const provider = await getProvider();
  const abi = ZenithContract.abi;
  const wallet = await getWallet();
  const contract = await new ethers.Contract(ZENITH_ADDRESS, abi, wallet);
  return contract;
}

async function getGovernorContractAndABI() {
  const provider = await getProvider();
  const abi = GovernorContract.abi;
  const wallet = await getWallet();
  const contract = await new ethers.Contract(GOVERNOR_ADDRESS, abi, wallet);
  return contract;
}
export { getZenithAddressAndABI, getGovernorContractAndABI };
