'use client';

import { useState } from 'react';
import type { NftModalProps, Attribute } from '../types.ts';

export default function NFTModal({ nft, onMint, onClose, isMinting, isConnected }: NftModalProps) {
  const [showAttributes, setShowAttributes] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
     onClick={onClose}>
      <div className="relative bg-gradient-to-br from-black to-purple-900 rounded-2xl px-6 py-5 max-w-md w-full shadow-2xl max-h-[100vh] overflow-y-auto scrollbar-hide"
      onClick={(e) => e.stopPropagation()}>

        {/* 3D Flip Container */}
        <div className="relative w-full h-[26rem] perspective">
          <div
            className={`absolute inset-0 transition-transform duration-700 ease-in-out transform-style-preserve-3d
              ${showAttributes ? 'rotate-y-180' : ''}
            `}
          >
            {/* Front — NFT Image */}
            <div className="absolute inset-0 backface-hidden">
              
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            {/* Back — Attributes */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl bg-black/70 backdrop-blur-md p-4 overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Attributes
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {nft.attributes.map((attr: Attribute, idx: number) => (
                  <div
                    key={idx}
                    className="border border-white/10 rounded-lg p-3 bg-black/40"
                  >
                    <p className="text-[11px] uppercase tracking-wider text-gray-400">
                      {attr.trait_type}
                    </p>
                    <p className="text-sm font-medium text-white">
                      {attr.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

         {/* Toggle Button */}
        <button
          onClick={() => setShowAttributes(!showAttributes)}
          className="absolute bottom-[23vh] right-4  text-xs uppercase tracking-wide text-white/70 hover:text-white transition hover:cursor-pointer rounded-2xl bg-black/40 px-4 py-2"
        >
          {showAttributes ? 'NFT' : 'Attributes'}
        </button>

        {/* NFT Info */}
        <h2 className="text-2xl font-bold mt-5 mb-1">{nft.name}</h2>
        <p className="text-gray-300 text-sm mb-6">
          {nft.description}
        </p>

        {/* Mint Button */}
        <button
          onClick={onMint}
          disabled={isMinting || !isConnected}
          className="w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 font-bold transition hover:opacity-90 disabled:opacity-50 hover:disabled:cursor-not-allowed hover:cursor-pointer"
        >
          {isMinting ? 'Minting...' : 'Mint NFT'}
        </button>

        {/* Close */}
        <button
          onClick={onClose}
          className="w-full mt-3 text-gray-400 hover:text-white transition cursor-pointer"
        >
          Close
        </button>
      </div>

      {/* Required CSS */}
      <style jsx>{`
        .perspective {
          perspective: 1200px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
