import { ethers } from "hardhat";
import { Contract, Signer, BigNumber } from "ethers";
import { expect } from "chai";


describe("nft721", function() {
    let nft721: Contract,  owner: Signer, account1: Signer;
    this.beforeEach(async function() {
        [owner, account1] = await ethers.getSigners();
        const Nft721 = await ethers.getContractFactory("Nft721", owner);
        nft721 = await Nft721.deploy("Sample Token", "ST");
        
    })

    it("check constructor", async function() {
        expect(await nft721.name()).to.equals("Sample Token");
        expect(await nft721.symbol()).to.equals("ST");

    })

    it('check get unexisted token', async function() {
        expect(nft721.tokenURI(0)).to.be.revertedWith("token doesn't exists");
        expect(nft721.tokenURI(1)).to.be.revertedWith("token doesn't exists");
        
    })

    it('check mint not owner', async function() {
        expect(nft721.connect(account1).mint(await account1.getAddress(), 'A')).to.be.revertedWith("Ownable: caller is not the owner");
    }) 

    it("check mint", async function() {
        const event = (await (await nft721.mint(await owner.getAddress(), 'A')).wait()).events[0];
        expect(event.args[0]).to.equals('0x0000000000000000000000000000000000000000');
        expect(event.args[1]).to.equals(await owner.getAddress());
        expect(event.args[2]).to.equals(BigNumber.from(1));
    })

    it("check get token", async function() {
        nft721.mint(await owner.getAddress(), "A")
        expect(await nft721.tokenURI(1)).to.equals("ipfs://A")  
    })

})