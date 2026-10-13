import { useMemo } from 'react';
import type { NFT } from '../types';
import NftImage from './NftImage';

const FAN = [
  { left: '0%', top: '10%', rot: -7, delay: 0 },
  { left: '24%', top: '0%', rot: 3, delay: 0.12 },
  { left: '44%', top: '18%', rot: 9, delay: 0.24 },
];

export default function Hero({ nfts, networkName, onSurprise }: {
  nfts: NFT[]; networkName: string; onSurprise: () => void;
}) {
  const featuredNfts = useMemo(() => nfts.slice(0, 3), [nfts]);

  const facts = [
    { k: 'Price', v: 'Free, gas only' },
    { k: 'Network', v: networkName },
    { k: 'Characters', v: nfts.length.toString() },
    { k: 'Limit', v: 'None per wallet' },
  ];
  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pb-6 pt-10 md:pt-16">
      <div className="grid gap-12 md:grid-cols-[1.15fr_1fr] md:items-center">
        <div>
          <h1 className="display text-[clamp(2.9rem,8.5vw,5.75rem)] leading-[0.94]">
            Pick a character.<br />Mint it free.
          </h1>
          <p className="muted mt-6 max-w-[46ch] text-lg leading-relaxed">
            Open mint on {networkName}. You pay network gas and nothing else. Choose any character, as many times as you like.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#characters" className="btn btn-primary">Browse characters</a>
            {nfts.length > 0 && <button className="btn" onClick={onSurprise}>Surprise me</button>}
          </div>
        </div>

        {nfts.length > 0 && (
          <div className="relative mx-auto h-[20rem] w-full max-w-md sm:h-[25rem]" aria-hidden>
            {featuredNfts.slice(0, 3).map((nft, i) => (
              <div
                key={nft.catalogId}
                className="fan-print absolute w-[56%]"
                style={{ left: FAN[i].left, top: FAN[i].top, zIndex: i, ['--rot' as string]: `${FAN[i].rot}deg`, animationDelay: `${FAN[i].delay}s` }}
              >
                <NftImage src={nft.image} alt="" priority />
              </div>
            ))}
          </div>
        )}
      </div>

      <dl className="bd bg-paper-2 mt-14 grid grid-cols-2 overflow-hidden rounded-2xl md:grid-cols-4">
        {facts.map((f) => (
          <div key={f.k} className="fact px-5 py-4">
            <dt className="muted text-sm">{f.k}</dt>
            <dd className="display mt-1 text-xl">{f.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
