'use client';

import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import NFTS from './data/nftsData';
import { useMint } from './hooks/useMint';
import { siteConfig } from './lib/site';
import { Header, NetworkNotice } from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Faq from './components/Faq';
import Footer from './components/Footer';
import NftModal from './components/NftModal';
import type { NFT } from './types';

export default function Home() {
  const mint = useMint();
  const [selected, setSelected] = useState<NFT | null>(null);
  const [scope, setScope] = useState<NFT[]>(NFTS);
  const [mintingNft, setMintingNft] = useState<NFT | null>(null);

  function open(nft: NFT, list: NFT[] = NFTS) {
    if (mint.status === 'success' || mint.status === 'error') mint.reset();
    setScope(list);
    setSelected(nft);
  }

  function step(dir: -1 | 1) {
    if (!selected || scope.length < 2) return;
    const i = scope.findIndex((n) => n.catalogId === selected.catalogId);
    const next = scope[(i + dir + scope.length) % scope.length];
    if (mint.status === 'success' || mint.status === 'error') mint.reset();
    setSelected(next);
  }

  function close() {
    setSelected(null);
    if (mint.status === 'success' || mint.status === 'error') mint.reset();
  }

  const surprise = () => open(NFTS[Math.floor(Math.random() * NFTS.length)]);
  const networkName = mint.isConnected
    ? mint.activeChain?.name ?? 'Unsupported network'
    : mint.targetChain?.name ?? siteConfig.fallbackNetworkName;

  return (
    <>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: 'var(--paper)', color: 'var(--ink)', fontWeight: 600,
            border: '2.5px solid var(--ink)', borderRadius: '12px', boxShadow: '4px 4px 0 var(--ink)',
          },
        }}
      />
      <Header />
      <NetworkNotice mint={mint} />
      <main>
        <Hero nfts={NFTS} networkName={networkName} onSurprise={surprise} />
        <Gallery nfts={NFTS} onSelect={open} />
        <Faq />
      </main>
      <Footer networkName={networkName} explorer={mint.deployment?.explorer} contract={mint.deployment?.address} />

      {selected && (
        <NftModal
          nft={selected}
          index={Math.max(0, scope.findIndex((n) => n.catalogId === selected.catalogId))}
          total={scope.length}
          mint={mint}
          mintingNft={mintingNft}
          onMint={() => { setMintingNft(selected); mint.mint(selected); }}
          onClose={close}
          onStep={step}
        />
      )}
    </>
  );
}
