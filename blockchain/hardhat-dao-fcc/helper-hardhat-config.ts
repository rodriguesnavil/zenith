export interface networkConfigItem {
  ethUsdPriceFeed?: string
  blockConfirmations?: number
}

export interface networkConfigInfo {
  [key: string]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
  localhost: {},
  hardhat: {},
  sepolia: {
    blockConfirmations: 6,
  },
  lotus:{}
}

export const developmentChains = ["hardhat", "localhost"]
export const proposalsFile = "proposals.json"

// Governor Values
export const QUORUM_PERCENTAGE = 4 // Need 4% of voters to pass
export const MIN_DELAY = 60 // 1 hour - after a vote passes, you have 1 hour before you can enact
// export const VOTING_PERIOD = 45818 // 1 week - how long the vote lasts. This is pretty long even for local tests
export const VOTING_PERIOD = 5 // blocks
export const VOTING_DELAY = 1 // 1 Block - How many blocks till a proposal vote becomes active
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"

export const NEW_STORE_VALUE = "0x6aC1BD25251409Afc3009ba3c53F10c2C4a1671b"
export const FUNC = "addReviewer"
export const PROPOSAL_DESCRIPTION = "Proposal #2 Add 0x6aC1BD25251409Afc3009ba3c53F10c2C4a1671b to reviewer set!"
