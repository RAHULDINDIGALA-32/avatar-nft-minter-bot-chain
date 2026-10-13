'use client';

import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { siteConfig } from '../lib/site';
import type { MintApi } from '../hooks/useMint';

export function Header() {
  return (
    <header className="bg-paper bd-b sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <a
          href="#top"
          className="flex items-center gap-2"
          aria-label={`${siteConfig.name} home`}
        >
          <Image
            src="/chainfolks-logo-trans.png"
            alt="chainfolks-logo"
            width={80}
            height={80}
            priority
            className="h-20 w-20 object-contain"
          />
          <span className="display text-2xl">{siteConfig.name}</span>
        </a>
        <nav aria-label="Sections" className="hidden items-center gap-7 sm:flex">
          <a href="#characters" className="link">Characters</a>
          <a href="#faq" className="link">FAQ</a>
        </nav>
        <ConnectButton
          showBalance={false}
          chainStatus={{ smallScreen: 'icon', largeScreen: 'full' }}
          accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }}
        />
      </div>
    </header>
  );
}

export function NetworkNotice({ mint }: { mint: MintApi }) {
  if (!mint.isConnected || !mint.wrongNetwork) return null;
  const { targetChain } = mint;
  return (
    <div role="alert" className="bd-b bg-mustard">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3">
        <p className="font-semibold">
          {targetChain
            ? `Your wallet is on the wrong network. Minting runs on ${targetChain.name}.`
            : 'No NFT contract is configured for any supported network.'}
        </p>
        {targetChain && (
          <button className="btn btn-sm" disabled={mint.isSwitching} onClick={() => mint.switchNetwork(targetChain.id)}>
            {mint.isSwitching ? 'Check your wallet' : `Switch to ${targetChain.name}`}
          </button>
        )}
      </div>
    </div>
  );
}
