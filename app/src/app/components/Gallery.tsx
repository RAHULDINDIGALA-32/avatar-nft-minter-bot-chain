'use client';

import { useMemo, useState } from 'react';
import type { NFT } from '../types';
import { getTrait } from '../lib/nft';
import NftCard from './NftCard';

export default function Gallery({ nfts, onSelect }: {
  nfts: NFT[]; onSelect: (nft: NFT, scope: NFT[]) => void;
}) {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  const groups = useMemo(() => {
    const counts = new Map<string, number>();
    nfts.forEach((n) => { const a = getTrait(n, 'Archetype'); if (a) counts.set(a, (counts.get(a) ?? 0) + 1); });
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [nfts]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return nfts.filter((n) => {
      if (filter !== 'All' && getTrait(n, 'Archetype') !== filter) return false;
      if (!q) return true;
      return [n.name, ...n.attributes.map((a) => String(a.value))].some((s) => s.toLowerCase().includes(q));
    });
  }, [nfts, filter, query]);

  const chips: [string, number][] = [['All', nfts.length], ...groups];

  return (
    <section id="characters" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-14">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <h2 className="display text-4xl">Choose your character</h2>
        <label className="block md:w-72">
          <span className="sr-only">Search characters</span>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or trait" className="field w-full" />
        </label>
      </div>

      {groups.length > 1 && (
        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by archetype">
          {chips.map(([name, count]) => (
            <button key={name} className="chip" aria-pressed={filter === name} onClick={() => setFilter(name)}>
              {name} <span className="opacity-70">{count}</span>
            </button>
          ))}
        </div>
      )}

      <p className="muted mt-5 text-sm" role="status">Showing {visible.length} of {nfts.length}</p>

      {nfts.length === 0 ? (
        <div className="bd mt-6 rounded-2xl p-8">
          <p className="display text-2xl">No characters uploaded yet</p>
          <p className="muted mt-2 max-w-[60ch]">
            Add images to <code>nfts/images</code> and metadata to <code>nfts/metadata</code>, then run <code>npm run upload</code>.
          </p>
        </div>
      ) : visible.length === 0 ? (
        <div className="bd mt-6 rounded-2xl p-8">
          <p className="display text-2xl">No characters match</p>
          <p className="muted mt-2">Try a different search or filter.</p>
          <button className="btn btn-sm mt-5" onClick={() => { setFilter('All'); setQuery(''); }}>Clear filters</button>
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5">
          {visible.map((nft) => (
            <li key={nft.catalogId}><NftCard nft={nft} onSelect={(n) => onSelect(n, visible)} /></li>
          ))}
        </ul>
      )}
    </section>
  );
}
