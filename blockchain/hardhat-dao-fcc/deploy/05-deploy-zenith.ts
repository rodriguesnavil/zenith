import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../helper-functions"
import { networkConfig, developmentChains } from "../helper-hardhat-config"
import { ethers } from "hardhat"

const deployZenith: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  log("----------------------------------------------------")
  log("Deploying Zenith and waiting for confirmations...")
  const zenith = await deploy("Zenith", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`Zenith at ${zenith.address}`)
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(zenith.address, [])
  }
  const zenithContract = await ethers.getContractAt("Zenith", zenith.address)
  const timeLock = await ethers.getContract("TimeLock")
  const transferTx = await zenithContract.transferOwnership(timeLock.address)
  await transferTx.wait(1)
}

export default deployZenith
deployZenith.tags = ["all", "zenith"]
