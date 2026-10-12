'use client';

import { useState } from 'react';
import { ipfsToHttp } from '../lib/ipfs';

export default function NftImage({ src, alt, priority = false, className = '' }: {
  src: string; alt: string; priority?: boolean; className?: string;
}) {
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  return (
    <div className={`bg-bone relative aspect-square overflow-hidden ${className}`}>
      {state === 'loading' && <div className="bg-bone absolute inset-0 animate-pulse" />}
      {state === 'error' ? (
        <p className="muted absolute inset-0 grid place-items-center p-4 text-center text-sm">
          Image unavailable. Reload to retry.
        </p>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={ipfsToHttp(src)}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setState('ready')}
          onError={() => setState('error')}
          className={`h-full w-full object-cover transition-opacity duration-300 ${state === 'ready' ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
}
