import { ethers } from "ethers";
import * as ZenithContract from "../src/ABIs/Zenith.json";
import * as GovernorContract from "../src/ABIs/GovernorContract.json";

export const PROVIDER_URL_HARDHAT = "http://localhost:8545";
export const PROVIDER_URL_LOTUS= "http://127.0.0.1:1234/rpc/v1"
export const ZENITH_ADDRESS = "0x147c97e090a09914f3F8281F4996486F2209736D";
export const GOVERNOR_ADDRESS = "0xe0C407793a2faD0898C0efd3a2098A51ee458811";

export const FUNCTION_TO_CALL_Reviewer = "addReviewer";
export const FUNCTION_TO_CALL_Article = "addArticle";

//const privateKey = process.env.PRIVATE_KEY_HARDHAT;
const privateKey = process.env.PRIVATE_KEY_LOTUS;

// Check if private key is present
if (!privateKey) {
  console.error("Private key not found in environment variables!");
  process.exit(1);
}

async function getProvider() {
  const provider = await new ethers.providers.JsonRpcProvider(
    PROVIDER_URL_LOTUS
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
