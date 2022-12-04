import { task } from "hardhat/config";
import * as config_ from "../config.json";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import "@nomiclabs/hardhat-waffle";

const config = (config_ as any);
const network = process.env.network || config.defaultNetwork;
const settings = config[network];


async function getNft721(hre: HardhatRuntimeEnvironment) {
    const Nft721 =  await hre.ethers.getContractFactory("Nft721");
    return await Nft721.attach(settings.contract);   
}

task("mint", "mint").addOptionalParam('address', 'address').addParam('hash', 'ipfs hash').setAction(
    async({address}, hre) => {
        const nft721 = await getNft721(hre);
        console.log((await (await (await nft721.mint(address)).wait())).events[0].args);
    }
)

task("uri", "uri").addParam('id', 'token id').setAction(
    async({id}, hre) => {
        const nft721 = await getNft721(hre);
        console.log(await nft721.tokenURI(id));
    }
)



