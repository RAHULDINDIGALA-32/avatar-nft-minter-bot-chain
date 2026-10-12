import type { NFT } from '../types';
import { getTrait } from '../lib/nft';
import NftImage from './NftImage';

export default function NftCard({ nft, onSelect }: { nft: NFT; onSelect: (nft: NFT) => void }) {
  const archetype = getTrait(nft, 'Archetype');
  return (
    <button type="button" className="print-card" onClick={() => onSelect(nft)} aria-label={`View ${nft.name}`}>
      <NftImage src={nft.image} alt={`${nft.name}${archetype ? `, ${archetype}` : ''}`} className="bd-b" />
      <div className="px-4 py-3">
        <h3 className="display text-lg leading-tight">{nft.name}</h3>
        {archetype && <p className="muted mt-0.5 truncate text-sm">{archetype}</p>}
      </div>
    </button>
  );
}
