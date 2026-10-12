import type { NFT } from '../types';

export const getTrait = (nft: NFT, type: string) =>
  nft.attributes.find((a) => a.trait_type === type)?.value?.toString();

export const shortHash = (h: string) => `${h.slice(0, 6)}…${h.slice(-4)}`;
