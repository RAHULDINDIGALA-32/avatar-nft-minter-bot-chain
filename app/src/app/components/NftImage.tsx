 'use client';

import { useState, useEffect } from 'react';
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
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const imageSrc = ipfsToHttp(src);

  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [imageSrc]);

  return (
    <div
      className={`bg-bone relative aspect-square overflow-hidden ${className}`}
    >
      {!loaded && !error && (
        <div className="bg-bone absolute inset-0 animate-pulse" />
      )}

      {error ? (
        <p className="muted absolute inset-0 grid place-items-center p-4 text-center text-sm">
          Image unavailable. Reload to retry.
        </p>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}