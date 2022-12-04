// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract Nft721 is ERC721, Ownable  {

    using Counters for Counters.Counter;

    mapping (uint256 => string) ipfsHashes; 
    Counters.Counter private _tokenIdCounter;


    constructor(string memory name_, string memory symbol) ERC721(name_, symbol)  {
    }


    function tokenURI(uint256 tokenId) public view  override returns (string memory) {
        require(tokenId > 0 && tokenId <= _tokenIdCounter.current(), "token doesn't exist");
        return string(abi.encodePacked("ipfs://", ipfsHashes[tokenId]));
    }


    function mint(address to, string memory ipfsHash) public onlyOwner {

        _tokenIdCounter.increment();
        uint256 newToken = _tokenIdCounter.current();
        ipfsHashes[newToken] = ipfsHash;
        _mint(to, newToken);
    }
}
