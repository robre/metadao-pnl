'use client';

import React, { useState } from 'react';
import PnLCard from '@/components/PnLCard';

export default function TestPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 gap-8">
      {/* Download Button */}
      {imageUrl && (
        <button
          onClick={handleDownload}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-lg font-medium"
        >
          Download PNG
        </button>
      )}
      
      {/* Card Preview */}
      <div className="scale-50 origin-top">
        <PnLCard onImageGenerated={handleImageGenerated} />
      </div>
    </div>
  );
}
