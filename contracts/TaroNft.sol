// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";



contract TaroNft is ERC721, Ownable  {

    uint256 private _count;
    string private _base_url;

    constructor(string memory name_, string memory symbol, string memory base_url, uint256 count) ERC721(name_, symbol)  {
        _base_url = base_url;
        _count = count;
    }


    function tokenURI(uint256 tokenId) public view  override returns (string memory) {
        require(tokenId > 0 && tokenId <= _count, "token doesn't exist");
        return string(abi.encodePacked(_base_url, Strings.toString(tokenId)));
    }

    function mintTo(address recipient) public 
    {

        for (uint256 i=1; i <= _count; i++) {
            _safeMint(recipient, i);

        }
       
    }


}