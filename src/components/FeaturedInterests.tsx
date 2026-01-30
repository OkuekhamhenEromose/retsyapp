'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/services/api';

interface FeaturedInterestsProps {
  interests?: Category[];
}

const FeaturedInterests: React.FC<FeaturedInterestsProps> = ({ interests = [] }) => {
  // Default interests from screenshot
  const defaultInterests = [
    {
      id: 1,
      title: "Linen Spotlight",
      subtitle: "Effortlessly elegant",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=500&fit=crop"
    },
    {
      id: 2,
      title: "Tactile Glass",
      subtitle: "Touchable textures",
      image: "https://images.unsplash.com/photo-1548625320-cf6858a7c538?w=400&h=500&fit=crop"
    },
    {
      id: 3,
      title: "Handcrafted Home",
      subtitle: "Rustic domain",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=500&fit=crop"
    },
    {
      id: 4,
      title: "Macrame Essentials",
      subtitle: "Make it modern",
      image: "https://images.unsplash.com/photo-1567016376408-0226e1d3d0c6?w=400&h=500&fit=crop"
    }
  ];

  // Safely handle interests data
  const displayInterests = interests && interests.length > 0 ? 
    interests.slice(0, 4) : defaultInterests;

  return (
    <section className="container mx-auto px-4 py-10">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[28px] font-light tracking-tight text-gray-900">
          Jump into featured interests
        </h2>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-700 uppercase tracking-wide">winter 2026</p>
        </div>
      </div>

      {/* Interest Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {displayInterests.map((interest: any) => (
          <Link 
            key={interest.id}
            href={`/category/${interest.slug || interest.id}`}
            className="group relative block overflow-hidden rounded-lg hover:no-underline transition-all duration-300 hover:shadow-lg"
          >
            {/* Image Container */}
            <div className="aspect-[3/4] relative overflow-hidden bg-gray-100">
              <Image
                src={interest.image || interest.main || `/api/placeholder/400/500`}
                alt={interest.title || 'Featured interest'}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
                priority={interest.id === 1}
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            {/* Text Content - Positioned at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-bold text-white mb-1 leading-tight">
                {interest.title || 'Featured Interest'}
              </h3>
              <p className="text-sm text-white/90 font-normal">
                {interest.subtitle || (interest.products_count ? `${interest.products_count} items` : 'Explore now')}
              </p>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Bottom Section with seasonal theme */}
      <div className="mt-10 pt-8 border-t border-gray-100 text-center">
        <h3 className="text-2xl font-light text-gray-900 mb-2">Winter 2026 Collection</h3>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm">
          Discover curated collections for the season. Our moon phase didn't align, but these finds surely will.
        </p>
      </div>
    </section>
  );
};

export default FeaturedInterests;