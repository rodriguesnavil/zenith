import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../helper-functions"
import { networkConfig, developmentChains } from "../helper-hardhat-config"
import { ethers } from "hardhat"


const deployDealClient: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  log("----------------------------------------------------")
  log("Deploying Deal client and waiting for confirmations...")
  const dealClient = await deploy("DealClient", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
   // waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`DealClient at ${dealClient.address}`)
}

export default deployDealClient
deployDealClient.tags = ["all","dealClient"]