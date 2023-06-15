import { ethers } from "hardhat";
import  CID  from "cids";


    const contract = "0xB00DF6806999d41c2135d571fbc6C11019D882c5"
    const pieceCid = "baga6ea4seaqjufkzz5ys2kyg34sfkifff3di5nqqv4s3sfjdfhwxmszjerxhqpi"
    const pieceSize = 256
    const verifiedDeal= false
    const label = "bafybeieeonqa3syayibimheecdcy34o3fcxptso423msk3rpwyaqtxvkzy"
    const startEpoch = 10000
    const endEpoch = 1000000
    const storagePricePerEpoch = 0
    const providerCollateral = 0
    const clientCollateral = 0
    const extraParamsVersion= 1
    const locationRef = "https://data-depot.lighthouse.storage/api/download/download_car?fileId=a94a1a4f-3a6b-4855-8eb0-8c08b4e35d4c.car"
    const carSize = 254
    


    const cid = pieceCid;
    const cidHexRaw = new CID(cid).toString("base16").substring(1);
    const cidHex = "0x" + cidHexRaw;
    const contractAddr = contract;

    const verified = false
    const skipIpniAnnounce = false;
    const removeUnsealedCopy =false;

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
    

    export async function makeDeal() {
      const dealClient = await ethers.getContract("DealClient");
      // const balanceTx = await dealClient.addBalance("100000",{value:100000})
      // const balanceTxReceipt = await balanceTx.wait(1)
      // console.log(balanceTxReceipt)
      console.log("Making deal proposal on network")
        const dealTX = await dealClient.makeDealProposal(DealRequestStruct)
        const dealClientTxReceipt = await dealTX.wait(1)

        const event = dealClientTxReceipt.events[0].topics[1]
        console.log("Complete! Event emitted. ProposalId is", event);
    }

makeDeal().then(() => process.exit(0)).catch((error)=> {
  console.error(error)
  process.exit(1)
})



