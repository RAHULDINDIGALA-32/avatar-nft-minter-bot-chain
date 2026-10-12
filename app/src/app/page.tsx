'use client';

import { useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useChainId, useWaitForTransactionReceipt, useWriteContract, type BaseError } from 'wagmi';
import { Toaster, toast } from 'react-hot-toast';
import NFTS from './data/nftsData';
import NFTCard from './components/NftCard';
import NFTModal from './components/NftModal';
import Footer from './components/Footer';
import { avatarNftAbi, deployments } from './config/avatarNft';
import type { NFT } from './types';

export default function Home() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const deployment = deployments[chainId];
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const { data: txHash, writeContract, isPending, error } = useWriteContract();
  const { isSuccess, isLoading: isConfirming } = useWaitForTransactionReceipt({ hash: txHash });

  useEffect(() => {
    if (isSuccess) { toast.success('NFT minted successfully'); setSelectedNFT(null); }
    if (error) toast.error((error as BaseError).shortMessage ?? 'Transaction failed');
  }, [isSuccess, error]);

  function handleMint() {
    if (!selectedNFT || !isConnected) return;
    if (!deployment?.address) { toast.error('Connect to BOT Chain Testnet or configure the contract address'); return; }
    writeContract({ address: deployment.address, abi: avatarNftAbi, functionName: 'mint', args: [BigInt(selectedNFT.tokenId)] });
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-indigo-900 text-white p-8">
      <Toaster position="bottom-right" />
      <header className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <div><h1 className="text-4xl font-extrabold tracking-wide">BOT Avatar Collection</h1><p className="text-sm text-white/70 mt-2">One-of-one NFTs on BOT Chain</p></div>
        <ConnectButton />
      </header>
      {!deployment?.address && <p className="mb-6 rounded-lg bg-amber-500/20 p-4 text-amber-200">This network has no configured NFT contract yet.</p>}
      {NFTS.length === 0 && <p className="rounded-lg bg-white/10 p-6">No NFTs have been uploaded yet. Add assets to <code>nfts/images</code> and metadata to <code>nfts/metadata</code>, then run <code>npm run upload</code>.</p>}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {NFTS.map((nft) => <NFTCard key={nft.tokenId} nft={nft} isConnected={isConnected} onSelect={setSelectedNFT} />)}
      </section>
      {selectedNFT && <NFTModal nft={selectedNFT} onMint={handleMint} onClose={() => setSelectedNFT(null)} isMinting={isPending || isConfirming} isConnected={isConnected} />}
      {txHash && deployment && <a href={`${deployment.explorer}/tx/${txHash}`} target="_blank" rel="noreferrer" className="block text-center mt-6 text-blue-300 underline">View transaction on BOTScan</a>}
      <Footer />
    </main>
  );
}
