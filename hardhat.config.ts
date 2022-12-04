import "@nomicfoundation/hardhat-toolbox";
import {config} from "dotenv";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan"
import "hardhat-gas-reporter"
import "solidity-coverage"
import "hardhat-contract-sizer"
import "./tasks/tasks"



config()

module.exports = {
  solidity: "0.8.15",
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      blockGasLimit: 124500000,
      accounts:
        process.env.RINKEBY_PRIVAT_KEY !== undefined
          ? [process.env.RINKEBY_PRIVAT_KEY]
          : [],
    },
  },

  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },


};
