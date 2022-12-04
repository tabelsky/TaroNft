import { task } from "hardhat/config";
import * as config_ from "../config.json";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import "@nomiclabs/hardhat-waffle";

const config = (config_ as any);
const network = process.env.network || config.defaultNetwork;
const settings = config[network];


async function getNft721(hre: HardhatRuntimeEnvironment) {
    const Nft721 =  await hre.ethers.getContractFactory("TaroNft");
    return await Nft721.attach(settings.contract);   
}


task("uri", "uri").addParam('id', 'token id').setAction(
    async({id}, hre) => {
        const nft721 = await getNft721(hre);
        console.log(await nft721.tokenURI(id));
    }
)


task("mint", "mint").addOptionalParam('to', 'to').setAction(
    async({to}, hre) => {
        const nft721 = await getNft721(hre);
        if (!to) {
            to = (await hre.ethers.getSigners())[0].address
        }
        await nft721.mintTo(to)
    }
)




