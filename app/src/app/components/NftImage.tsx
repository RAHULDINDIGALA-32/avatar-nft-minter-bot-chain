 'use client';

import { useState, useSyncExternalStore } from 'react';
import { ipfsToHttp } from '../lib/ipfs';

export default function NftImage({
  src,
  alt,
  priority = false,
  className = '',
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const [error, setError] = useState(false);

  const imageSrc = ipfsToHttp(src);

  return (
    <div
      className={`bg-bone relative aspect-square overflow-hidden ${className}`}
    >
      {!mounted ? (
        <div className="absolute inset-0 animate-pulse bg-bone" aria-hidden="true" />
      ) : error ? (
        <div className="absolute inset-0 grid place-items-center p-4 text-center text-sm">
          Image unavailable
          <button
            type="button"
            onClick={() => setError(false)}
            className="underline"
          >
            Retry
          </button>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setError(true)}
          className="block h-full w-full object-cover"
        />
      )}
    </div>
  );
}
