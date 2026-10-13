import type { Address } from 'viem';

export const chainfolkAvatarNftAbi = [
  {
    type: 'function',
    name: 'mint',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'tokenUri', type: 'string' }],
    outputs: [{ name: 'tokenId', type: 'uint256' }],
  },
] as const;

export const deployments: Record<number, { address?: Address; explorer: string; name: string }> = {
  968: {
    address: process.env.NEXT_PUBLIC_CHAINFOLK_TESTNET_CONTRACT_ADDRESS as Address | undefined,
    explorer: 'https://scan.bohr.life',
    name: 'BOT Chain Testnet',
  },
  677: {
    address: process.env.NEXT_PUBLIC_CHAINFOLK_MAINNET_CONTRACT_ADDRESS as Address | undefined,
    explorer: 'https://scan.botchain.ai',
    name: 'BOT Chain',
  },
};
