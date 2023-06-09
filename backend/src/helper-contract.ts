import { ethers } from "ethers";
import * as ZenithContract from "../src/ABIs/Zenith.json";
import * as GovernorContract from "../src/ABIs/GovernorContract.json";
import * as DealClientContract from "../src/ABIs/DealClient.json";

//export const PROVIDER_URL= "http://localhost:8545";
export const PROVIDER_URL = "http://127.0.0.1:1234/rpc/v1";

//const privateKey = process.env.PRIVATE_KEY_HARDHAT;
const privateKey = process.env.PRIVATE_KEY_LOTUS;

export const ZENITH_ADDRESS = "0x6b08D8a645e7CED381f9e6AbADe6a695a0CFE3Bf";
export const GOVERNOR_ADDRESS = "0xf273cf3930859b12d8d479f806Ed6ced252f440D";
export const DEALCLIENT_ADDRESS = "0xA3DF65DD60365fE1986DA0b35FfE092AED5443b8";

export const FUNCTION_TO_CALL_Reviewer = "addReviewer";
export const FUNCTION_TO_CALL_Article = "addArticle";

export const storagePricePerEpoch = 0;
export const providerCollateral = 0;
export const clientCollateral = 0;
export const extraParamsVersion = 1;
export const verifiedDeal = false;
export const verified = false
export const skipIpniAnnounce = false;
export const removeUnsealedCopy =false;


// Check if private key is present
if (!privateKey) {
  console.error("Private key not found in environment variables!");
  process.exit(1);
}

async function getProvider() {
  const provider = await new ethers.providers.JsonRpcProvider(PROVIDER_URL);
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

async function getDealClientContractAndABI() {
  const provider = await getProvider();
  const abi = DealClientContract.abi;
  const wallet = await getWallet();
  const contract = await new ethers.Contract(DEALCLIENT_ADDRESS,abi, wallet)
  return contract
}
export { getZenithAddressAndABI, getGovernorContractAndABI, getDealClientContractAndABI };
