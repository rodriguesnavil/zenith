import {ethers} from 'ethers';
import * as ZenithContract from "../src/ABIs/Zenith.json"


export const PROVIDER_URL = 'http://localhost:8545'
export const ZENITH_ADDRESS = '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853'

async function getProvider() {    
    const provider = await new ethers.providers.JsonRpcProvider(PROVIDER_URL);
    return provider;
}

async function getZenithAddressAndABI() {   
   const provider = await getProvider();
   const abi = ZenithContract.abi
   const contract = await new ethers.Contract(ZENITH_ADDRESS,abi,provider)
   return contract
}
export { getZenithAddressAndABI}