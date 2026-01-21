'use client'

import React from 'react';
import { Search } from 'lucide-react';

interface HeroBannerProps {
  bannerData?: {
    message: string;
    image: string | null;
    search_placeholder?: string;
  };
}

const HeroBanner: React.FC<HeroBannerProps> = ({ bannerData }) => {
  const message = bannerData?.message || "Find something you love";
  const searchPlaceholder = bannerData?.search_placeholder || "Search for anything";

  return (
    <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-12 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-medium text-foreground mb-6">
          {message}
        </h1>
        
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full py-4 px-6 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition-colors">
              <Search className="h-5 w-5" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Popular searches: handmade jewelry, vintage furniture, custom gifts, home decor
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;