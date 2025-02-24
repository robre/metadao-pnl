'use client';

import React, { useState } from 'react';
import PnLCard from '@/components/PnLCard';

// Add your background images here
const backgrounds = [
  '/bg.png',
  '/bg2.png',  // Add your additional background images
  '/bg3.png'   // Add more as needed
];

export default function TestPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const handleImageGenerated = (dataUrl: string) => {
    setImageUrl(dataUrl);
  };

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.download = 'pnl-card.png';
      link.href = imageUrl;
      link.click();
    }
  };

  const cycleBackground = () => {
    setCurrentBgIndex((prev) => (prev + 1) % backgrounds.length);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 gap-8">
      {/* Controls */}
      <div className="flex gap-4">
        {imageUrl && (
          <button
            onClick={handleDownload}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-lg font-medium"
          >
            Download PNG
          </button>
        )}
        
        <button
          onClick={cycleBackground}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium"
        >
          Change Background
        </button>
      </div>
      
      {/* Card Preview */}
      <div className="scale-50 origin-top">
        <PnLCard 
          onImageGenerated={handleImageGenerated}
          selectedBackground={backgrounds[currentBgIndex]} 
        />
      </div>
    </div>
  );
}
