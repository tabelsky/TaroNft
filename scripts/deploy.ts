import { ethers } from "hardhat";
import * as config_ from "../config.json";

const config = (config_ as any);

async function main() {

  const settings = config[config.defaultNetwork]; 
  const Nft721 = await ethers.getContractFactory('TaroNft');
  const nft721 = await Nft721.deploy(settings.name, settings.symbol, settings.base_url, settings.count);
  await nft721.deployed();

  console.log("nft721 deployed to:", nft721.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
