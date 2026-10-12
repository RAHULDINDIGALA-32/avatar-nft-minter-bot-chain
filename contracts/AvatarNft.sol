// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title AvatarNft
 * @author Rahul Dindigala
 * @dev ERC721 token representing unique avatars with URI storage.
 */
contract AvatarNft is ERC721, ERC721URIStorage, Ownable, Pausable {
    mapping(uint256 tokenId => string uri) private _registeredUris;
    mapping(uint256 tokenId => bool) public minted;

    event TokenRegistered(uint256 indexed tokenId, string uri);
    event TokenMinted(address indexed recipient, uint256 indexed tokenId, string uri);

    constructor(address initialOwner)
        ERC721("AvatarNft", "ANFT")
        Ownable(initialOwner)
    {}

    /// @notice Registers immutable collection metadata before public minting.
    function registerToken(uint256 tokenId, string calldata uri) external onlyOwner {
        require(bytes(uri).length > 0, "AvatarNft: empty URI");
        require(!minted[tokenId], "AvatarNft: already minted");
        require(bytes(_registeredUris[tokenId]).length == 0, "AvatarNft: already registered");

        _registeredUris[tokenId] = uri;
        emit TokenRegistered(tokenId, uri);
    }

    /// @notice Mints one registered collection item to the caller.
    function mint(uint256 tokenId) external returns (uint256) {
        _requireNotPaused();
        string memory uri = _registeredUris[tokenId];
        require(bytes(uri).length > 0, "AvatarNft: token not registered");
        require(!minted[tokenId], "AvatarNft: already minted");

        minted[tokenId] = true;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);

        emit TokenMinted(msg.sender, tokenId, uri);
        return tokenId;
    }

    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
