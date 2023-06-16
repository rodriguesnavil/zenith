import { ethers } from "hardhat";
import  CID  from "cids";


    const contract = "0xAd7D24be745C9725c16BCAaC1324e3579AbF392c"
    const pieceCid = "baga6ea4seaqec6updz2yw7y4bmcv5vufqtn47cqdekdqg6ckl32plpy4tlskeii"
    const pieceSize = 256
    const verifiedDeal= false
    const label = "bafybeianzsb2luqeot7bkycbc67sqw3m7k4wm5ulsytuuyslph34e26cca"
    const startEpoch = 20000
    const endEpoch = 1000000
    const storagePricePerEpoch = 0
    const providerCollateral = 0
    const clientCollateral = 0
    const extraParamsVersion= 1
    const locationRef = "https://data-depot.lighthouse.storage/api/download/download_car?fileId=5ab075be-3a13-4c77-b6db-29440812df3e.car"
    const carSize = 220
    


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



