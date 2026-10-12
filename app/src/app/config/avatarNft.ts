import type { Address } from 'viem';

export const avatarNftAbi = [
  { type: 'function', name: 'mint', stateMutability: 'nonpayable', inputs: [{ name: 'tokenId', type: 'uint256' }], outputs: [{ type: 'uint256' }] },
  { type: 'function', name: 'minted', stateMutability: 'view', inputs: [{ name: 'tokenId', type: 'uint256' }], outputs: [{ type: 'bool' }] },
  { type: 'function', name: 'ownerOf', stateMutability: 'view', inputs: [{ name: 'tokenId', type: 'uint256' }], outputs: [{ type: 'address' }] },
] as const;

export const deployments: Record<number, { address?: Address; explorer: string; name: string }> = {
  968: { address: process.env.NEXT_PUBLIC_BOT_TESTNET_CONTRACT_ADDRESS as Address | undefined, explorer: 'https://scan.bohr.life', name: 'BOT Chain Testnet' },
  677: { address: process.env.NEXT_PUBLIC_BOT_MAINNET_CONTRACT_ADDRESS as Address | undefined, explorer: 'https://scan.botchain.ai', name: 'BOT Chain' },
};
