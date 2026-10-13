// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

/// @title ChainfolkAvatarNft
/// @notice Public gas-only ERC-721 minting. There is no wallet cap or supply cap.
contract ChainfolkAvatarNft is ERC721, ERC721URIStorage, Ownable, Pausable {
    uint256 private _nextTokenId;

    event TokenMinted(address indexed recipient, uint256 indexed tokenId, string tokenUri);

    constructor(address initialOwner)
        ERC721("Chainfolk Avatar NFTs", "CFNFT")
        Ownable(initialOwner)
    {}

    /// @notice Mints a new Chainfolk NFT to the caller for gas only.
    /// @dev Every call creates a new token ID; no per-wallet or total-supply limit exists.
    function mint(string calldata tokenUri) external whenNotPaused returns (uint256 tokenId) {
        require(bytes(tokenUri).length > 0, "ChainfolkAvatarNft: empty URI");

        tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenUri);

        emit TokenMinted(msg.sender, tokenId, tokenUri);
    }

    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    function tokenURI(uint256 tokenId)
        public view override(ERC721, ERC721URIStorage) returns (string memory)
    { return super.tokenURI(tokenId); }

    function supportsInterface(bytes4 interfaceId)
        public view override(ERC721, ERC721URIStorage) returns (bool)
    { return super.supportsInterface(interfaceId); }
}
