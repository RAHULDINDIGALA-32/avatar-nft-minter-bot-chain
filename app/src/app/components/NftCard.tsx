import { useReadContract } from 'wagmi';
import AvatarNft from '../../../contractDeployments/AvatarNft.Sepolia.json';
import type { NftCardProps } from '../types.ts';

export default function NFTCard({ nft, isConnected, address, onSelect }: NftCardProps) {
  const { data: owner } = useReadContract({
    address: AvatarNft.address as `0x${string}`,
    abi: AvatarNft.abi,
    functionName: 'ownerOf',
    args: [BigInt(nft.tokenId)],
  });

  const isMinted = !!owner;
  const isOwnedByUser = (isConnected && typeof owner === 'string' && typeof address === 'string' && owner.toLowerCase() === address.toLowerCase());

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

<div className="relative cursor-pointer rounded-2xl overflow-hidden border transition-all hover:scale-105"
onClick={() => onSelect(nft)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={nft.image} alt={nft.name} className="w-full h-64 object-cover" />

      <div className="p-4 bg-black/70 h-full">
        <h3 className="text-lg font-bold">{nft.name}</h3>
        <p className="text-sm text-gray-300">{nft.description}</p>
      </div>
    </div>
  );
}
