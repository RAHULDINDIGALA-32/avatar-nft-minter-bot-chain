import type { NftCardProps } from '../types.ts';
import { ipfsToHttp } from '../lib/ipfs';
import { useChainId, useReadContract } from 'wagmi';
import { avatarNftAbi, deployments } from '../config/avatarNft';

export default function NFTCard({ nft, isConnected, address, onSelect }: NftCardProps) {
  const chainId = useChainId();
  const deployment = deployments[chainId];
  const { data: minted } = useReadContract({
    address: deployment?.address,
    abi: avatarNftAbi,
    functionName: 'minted',
    args: [BigInt(nft.tokenId)],
    query: { enabled: Boolean(deployment?.address) },
  });

  return (
    // <div
    //   onClick={() => !isMinted && onSelect(nft)}
    //   className={`relative cursor-pointer rounded-2xl overflow-hidden border transition-all
    //     ${isMinted ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105'}
    //     ${isOwnedByUser ? 'border-green-400' : 'border-white/10'}
    //   `}
    // >
    //   {isMinted && (
    //     <span className="absolute top-3 right-3 bg-red-500 text-xs px-3 py-1 rounded-full">
    //       Minted
    //     </span>
    //   )}

    //   {isOwnedByUser && (
    //     <span className="absolute top-3 left-3 bg-green-500 text-xs px-3 py-1 rounded-full">
    //       Yours
    //     </span>
    //   )}

<div className={`relative cursor-pointer rounded-2xl overflow-hidden border transition-all hover:scale-105 ${minted ? 'opacity-60' : ''}`}
onClick={() => onSelect(nft)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={ipfsToHttp(nft.image)} alt={nft.name} className="w-full h-64 object-cover" />

      <div className="p-4 bg-black/70 h-full">
        <h3 className="text-lg font-bold">{nft.name}</h3>
        <p className="text-sm text-gray-300">{nft.description}</p>
        {minted && <p className="text-xs text-emerald-300 mt-2">Already minted</p>}
      </div>
    </div>
  );
}
