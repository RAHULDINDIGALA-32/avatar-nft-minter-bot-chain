export interface Attribute {
  trait_type: string;
  value: string | number;
}

export interface NFT {
  catalogId: number;
  name: string;
  description: string;
  image: string;
  tokenURI: string;
  attributes: Attribute[];
  external_url: string
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




