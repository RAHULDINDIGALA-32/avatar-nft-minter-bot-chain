export interface Attribute {
  trait_type: string;
  value: string;
}

export interface NFT {
  tokenId: number;
  name: string;
  description: string;
  image: string;
  tokenURI: string;
  attributes: Attribute[];
}

export interface NftCardProps {
  nft: NFT;
  isConnected: boolean;
  address?: string | null;
  onSelect: (nft: NFT) => void;
}

export interface NftModalProps {
  nft: NFT;
  onMint: () => void;
  onClose: () => void;
  isMinting: boolean;
  isConnected: boolean;
}
