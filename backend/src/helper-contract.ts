import { ethers } from "ethers";
import * as ZenithContract from "../src/ABIs/Zenith.json";
import * as GovernorContract from "../src/ABIs/GovernorContract.json";
import * as DealClientContract from "../src/ABIs/DealClient.json";

//export const PROVIDER_URL= "http://localhost:8545";
export const PROVIDER_URL = "https://api.calibration.node.glif.io/rpc/v1";

//const privateKey = process.env.PRIVATE_KEY_HARDHAT;
const privateKey = process.env.PRIVATE_KEY_LOTUS;

export const ZENITH_ADDRESS = "0xe11dDcd59FFfd713d15b3e4d1796CE4509408563";
export const GOVERNOR_ADDRESS = "0x55E652D84F92fB4Da2B1fE459F30B15eaaEA747B";
export const DEALCLIENT_ADDRESS = "0x5419F024c09EaE62E80e933493c844bDA664C5bD";

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
