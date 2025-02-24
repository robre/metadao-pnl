'use client';

import React, { useRef, useEffect } from 'react';
import * as htmlToImage from 'html-to-image';

const PnLCard = ({ 
  data = {
    proposalTitle: "Treasury Management Vote",
    proposalResult: "Passed",
    totalPnLDollars: 12500.50,
    totalPnLPercentage: 25.4,
    traderPubkey: "AKzqHXo2MkNsD5ifTMDFKYXvqXX5wQGP5vrwkbKvEhrg"
  },
  onImageGenerated = (dataUrl: string) => {}
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const formatPubKey = (pubkey: string) => {
    if (!pubkey) return '';
    return `${pubkey.slice(0, 4)}...${pubkey.slice(-4)}`;
  };

  useEffect(() => {
    if (elementRef.current) {
      htmlToImage.toPng(elementRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        width: 1920,
        height: 1080
      })
      .then(dataUrl => {
        onImageGenerated(dataUrl);
      })
      .catch(error => {
        console.error('Error generating image:', error);
      });
    }
  }, [data, onImageGenerated]);

  return (
    <div 
      ref={elementRef}
      className="relative w-[1920px] h-[1080px] overflow-hidden"
      style={{
        backgroundImage: 'url(/bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Content overlay */}
      <div className="relative z-10 p-16 text-white h-full flex flex-col justify-between bg-black/10">
        {/* Header */}
        <div>
          <h1 className="text-5xl font-bold mb-4 text-white/90">{data.proposalTitle}</h1>
          <div className="flex items-center space-x-3">
            <span className={`px-4 py-2 rounded-lg text-lg font-medium ${
              data.proposalResult === "Passed" ? "bg-red-500/20 text-red-400" : "bg-red-800/20 text-red-600"
            }`}>
              {data.proposalResult}
            </span>
          </div>
        </div>

        {/* Main Stats */}
        <div className="space-y-12 max-w-4xl">
          <div className="space-y-8">
            <h2 className="text-3xl font-medium text-white/70">Performance Summary</h2>
            <div className="grid grid-cols-2 gap-12">
              <div>
                <p className="text-xl text-white/50 mb-2">Total PnL</p>
                <p className="text-6xl font-bold text-red-500">
                  ${data.totalPnLDollars.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xl text-white/50 mb-2">Return</p>
                <p className="text-6xl font-bold text-red-500">
                  {data.totalPnLPercentage}%
                </p>
              </div>
            </div>
          </div>

          {/* Trader Info */}
          <div className="border-t border-white/10 pt-8 mt-12">
            <div className="flex items-center">
              <span className="text-lg text-white/50 mr-3">Trader</span>
              <p className="text-xl font-mono text-white/90">
                {formatPubKey(data.traderPubkey)}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-white/30 text-sm">
          Generated by MetaDAO Analytics
        </div>
      </div>
    </div>
  );
};

export default PnLCard;
