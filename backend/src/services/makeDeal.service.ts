import { ethers } from "ethers";
import {getDealClientContractAndABI} from "../helper-contract"
import LightHouseService from "../services/lighthouse.service"
import {LIGHTHOUSE_DOWNLOAD_URL} from "../helper-lighthouse"
const CID = require("cids")

import {
  storagePricePerEpoch,
  providerCollateral,
  clientCollateral,
  extraParamsVersion,
  verifiedDeal,
  verified,
  skipIpniAnnounce,
  removeUnsealedCopy
} from "../helper-contract";

export default class makeDealClass {
  constructor() {}

  public makeDeal(payload:any) {
    return new Promise(async (resolve, reject) => {
      try {

        const filename=payload.filename
        const startEpoch = payload.startEpoch
        const endEpoch = payload.endEpoch
        
        let lightHouseService = new LightHouseService()
        const params: Record<string, any> = await lightHouseService.getParams(filename)
        
        const pieceCid = params.pieceCid;
        const pieceSize = params.pieceSize;
        const label = params.label
        const carSize = params.carSize
        const id = params.id
        const locationRef = LIGHTHOUSE_DOWNLOAD_URL+id+".car"
        const cid = pieceCid;
        const cidHexRaw = new CID(cid).toString("base16").substring(1);
        const cidHex = "0x" + cidHexRaw;
        
       
        const extraParamsV1 = [
            locationRef,
            carSize,
            skipIpniAnnounce,
            removeUnsealedCopy,
          ];
       
        const DealRequestStruct = [
            cidHex,
            pieceSize,
            verified,
            label,
            startEpoch,
            endEpoch,
            storagePricePerEpoch,
            providerCollateral,
            clientCollateral,
            extraParamsVersion,
            extraParamsV1,
          ];

        const dealClient = await getDealClientContractAndABI()
        console.log(`Deal request struct is ${DealRequestStruct}`)
        console.log("Making deal proposal")
        const dealTx = await dealClient.makeDealProposal(DealRequestStruct)
        console.log(`Deal Success`)
        const dealClientTxReceipt = await dealTx.wait(1)

        const event = dealClientTxReceipt.events[0].topics[1]
        console.log("Complete! Event emitted. ProposalId is", event);
        return resolve(event)
      } catch (e) {
        console.log(`error: ${e}`);
        return reject(e);
      }
    });
  }
}
