'use client';

import { useEffect, useRef } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import {
  ArrowTopRightOnSquareIcon, ChevronLeftIcon, ChevronRightIcon, XMarkIcon,
} from '@heroicons/react/24/outline';
import type { NFT } from '../types';
import type { MintApi } from '../hooks/useMint';
import { getTrait } from '../lib/nft';
import NftImage from './NftImage';

interface Props {
  nft: NFT;
  index: number;
  total: number;
  mint: MintApi;
  mintingNft: NFT | null;
  onMint: () => void;
  onClose: () => void;
  onStep: (dir: -1 | 1) => void;
}

function IconButton({ label, onClick, disabled, children }: {
  label: string; onClick: () => void; disabled?: boolean; children: React.ReactNode;
}) {
  return (
    <button type="button" className="icon-btn" aria-label={label} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

function MintAction({ nft, mint, mine, onMint }: { nft: NFT; mint: MintApi; mine: boolean; onMint: () => void }) {
  const { openConnectModal } = useConnectModal();

  if (!mint.isConnected)
    return <button className="btn btn-primary w-full" onClick={openConnectModal}>Connect wallet to mint</button>;

  if (mint.wrongNetwork)
    return (
      <button className="btn btn-primary w-full" disabled={!mint.targetChain || mint.isSwitching}
        onClick={() => mint.targetChain && mint.switchNetwork(mint.targetChain.id)}>
        {mint.targetChain ? `Switch to ${mint.targetChain.name}` : 'Network not supported'}
      </button>
    );

  if (mint.isBusy && !mine)
    return <button className="btn w-full" disabled>Another mint is in progress</button>;

  if (mine && mint.status === 'wallet')
    return <button className="btn btn-primary w-full" disabled aria-busy><span className="spinner" />Confirm in your wallet</button>;

  if (mine && mint.status === 'confirming')
    return <button className="btn btn-primary w-full" disabled aria-busy><span className="spinner" />Minting…</button>;

  return (
    <button className="btn btn-primary w-full" onClick={onMint}>
      {mine && mint.status === 'error' ? 'Try again' : `Mint ${nft.name} for free`}
    </button>
  );
}

export default function NftModal({ nft, index, total, mint, mintingNft, onMint, onClose, onStep }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const mine = mintingNft?.catalogId === nft.catalogId;
  const status = mine ? mint.status : 'idle';
  const walletOpen = mint.status === 'wallet';
  const explorer = mint.deployment?.explorer ?? mint.targetDeployment?.explorer;
  const archetype = getTrait(nft, 'Archetype');

  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; if (d?.open) d.close(); };
  }, []);

  return (
    <dialog
      ref={ref}
      className="nft-dialog"
      aria-labelledby="nft-title"
      onCancel={(e) => { e.preventDefault(); if (!walletOpen) onClose(); }}
      onClick={(e) => { if (e.target === ref.current && !walletOpen) onClose(); }}
      onKeyDown={(e) => {
        if (mint.isBusy) return;
        if (e.key === 'ArrowLeft') onStep(-1);
        if (e.key === 'ArrowRight') onStep(1);
      }}
    >
      <div className="grid md:grid-cols-2">
        <div className="pane-img">
          <NftImage src={nft.image} alt={`${nft.name}${archetype ? `, ${archetype}` : ''}`} priority />
        </div>

        <div className="flex flex-col p-6">
          <div className="flex items-center justify-between">
            <p className="muted text-sm">{index + 1} of {total}</p>
            <div className="flex gap-2">
              <IconButton label="Previous character" onClick={() => onStep(-1)} disabled={total < 2 || mint.isBusy}>
                <ChevronLeftIcon className="h-5 w-5" />
              </IconButton>
              <IconButton label="Next character" onClick={() => onStep(1)} disabled={total < 2 || mint.isBusy}>
                <ChevronRightIcon className="h-5 w-5" />
              </IconButton>
              <IconButton label="Close" onClick={onClose} disabled={walletOpen}>
                <XMarkIcon className="h-5 w-5" />
              </IconButton>
            </div>
          </div>

          <h2 id="nft-title" className="display mt-5 text-4xl leading-none">{nft.name}</h2>
          {archetype && <p className="muted mt-2 font-semibold">{archetype}</p>}
          <p className="mt-4 max-w-[52ch] leading-relaxed">{nft.description}</p>

          <dl className="mt-5 grid grid-cols-2 gap-2">
            {nft.attributes.map((a) => (
              <div key={a.trait_type} className="trait">
                <dt className="muted text-xs">{a.trait_type}</dt>
                <dd className="font-semibold">{String(a.value)}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto pt-7">
            <p className="sr-only" role="status" aria-live="polite">
              {status === 'wallet' && 'Confirm the transaction in your wallet.'}
              {status === 'confirming' && 'Transaction sent. Waiting for confirmation.'}
              {status === 'success' && 'Mint complete.'}
            </p>

            {mine && status === 'success' ? (
              <div className="success">
                <span className="stamp">Minted</span>
                <p className="mt-3 font-semibold">
                  {nft.name} is yours{mint.tokenId !== null ? `, token #${mint.tokenId.toString()}` : ''}.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {mint.hash && explorer && (
                    <a className="btn btn-sm" href={`${explorer}/tx/${mint.hash}`} target="_blank" rel="noopener noreferrer">
                      View transaction <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                    </a>
                  )}
                  <button className="btn btn-sm btn-primary" onClick={mint.reset}>Mint another</button>
                </div>
              </div>
            ) : (
              <>
                {mine && status === 'error' && mint.errorMessage && (
                  <p role="alert" className="alert mb-3">{mint.errorMessage}</p>
                )}
                <MintAction nft={nft} mint={mint} mine={mine} onMint={onMint} />
                <p className="muted mt-3 text-center text-sm">
                  {mine && status === 'confirming' && mint.hash && explorer ? (
                    <>Transaction sent. <a className="link" href={`${explorer}/tx/${mint.hash}`} target="_blank" rel="noopener noreferrer">Track it on the explorer</a>.</>
                  ) : 'Free. You only pay network gas.'}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
