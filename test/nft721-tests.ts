import { ethers } from "hardhat";
import { Contract, Signer} from "ethers";
import { expect } from "chai";


async function extractEvents(response: any) {
    return (await response.wait()).events;
  }


describe("nft721", function() {
    let nft721: Contract,  owner: Signer, account1: Signer;
    this.beforeEach(async function() {
        [owner, account1] = await ethers.getSigners();
        const Nft721 = await ethers.getContractFactory("TaroNft", owner);
        nft721 = await Nft721.deploy("Sample Token", "ST", "ipfs://hash/", 70);
        
    })

    it("check constructor", async function() {
        expect(await nft721.name()).to.equals("Sample Token");
        expect(await nft721.symbol()).to.equals("ST");

    })

    it('check get unexisted token', async function() {
        expect(nft721.tokenURI(0)).to.be.revertedWith("token doesn't exists");
        expect(nft721.tokenURI(71)).to.be.revertedWith("token doesn't exists");
        
    })


    it("check get token", async function() {
        expect(await nft721.tokenURI(1)).to.equals("ipfs://hash/1")  
    })

    it ("check mint", async function() {
        const result = await nft721.mintTo(await account1.getAddress())
        const events = (await extractEvents(result))
        expect(events.length).to.equals(70)
        
    })

})
