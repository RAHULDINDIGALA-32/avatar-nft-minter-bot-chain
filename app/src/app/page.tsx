"use client";

import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
  type BaseError,
} from 'wagmi';
import AvatarNft from '../../contractDeployments/AvatarNft.Sepolia.json';
import NFTS from './data/nftsData';
import NFTCard from './components/NftCard';
import NFTModal from './components/NftModal';
import Footer from './components/Footer';
import type { NFT } from './types';

import { Toaster, toast } from 'react-hot-toast';

export default function Home() {
  const { address, isConnected } = useAccount();
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);

  const { data: txHash, writeContract, isPending, error } =
    useWriteContract();

  const { isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success('NFT Minted Successfully!');
      // schedule state update to avoid synchronous setState inside effect
      setTimeout(() => setSelectedNFT(null), 0);
    }
    if (error) {
      toast.error((error as BaseError).shortMessage);
    }
  }, [isSuccess, error]);

  const handleMint = () => {
    if (!selectedNFT) return;
    writeContract({
      address: AvatarNft.address as `0x${string}`,
      abi: AvatarNft.abi,
      functionName: 'safeMint',
      args: [address, selectedNFT.tokenURI],
    });
  };



  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-indigo-900 text-white p-8">
      <Toaster position="bottom-right" />

      <header className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <h1 className="text-4xl font-extrabold tracking-wide">
          Cyberpunk Web3 Avatars
        </h1>
        <ConnectButton />
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {NFTS.map((nft) => (
          <NFTCard
            key={nft.tokenId}
            nft={nft}
            isConnected={isConnected}
            address={address}
            onSelect={setSelectedNFT}
          />
        ))}
      </section>

      {selectedNFT && (
        <NFTModal
          nft={selectedNFT}
          onMint={handleMint}
          onClose={() => setSelectedNFT(null)}
          isMinting={isPending}
          isConnected={isConnected}
        />
      )}

      {txHash && (
        <a
          href={`https://sepolia.etherscan.io/tx/${txHash}`}
          target="_blank"
          className="block text-center mt-6 text-blue-400 underline"
        >
          View on Etherscan
        </a>
      )}

       <Footer />
    </main>

  );
}
