'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/services/api';

interface DiscoverSectionProps {
  categories?: Category[];
}

const DiscoverSection: React.FC<DiscoverSectionProps> = ({ categories = [] }) => {
  // Default discoveries from screenshot
  const defaultDiscoveries = [
    {
      id: 1,
      title: "Valentine's Day Cards",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w-400&h=400&fit=crop",
      badge: "Seasonal"
    },
    {
      id: 2,
      title: "Top 100 Aquarius Gifts",
      image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&h=400&fit=crop",
      badge: "Astrology"
    },
    {
      id: 3,
      title: "New Arrivals",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
      badge: "Fresh"
    },
    {
      id: 4,
      title: "Best of Game Day",
      image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=400&h=400&fit=crop",
      badge: "Sports"
    },
    {
      id: 5,
      title: "Best of Valentine's Day",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
      badge: "Romance"
    }
  ];

  const displayDiscoveries = categories.length > 0 ? categories.slice(0, 5) : defaultDiscoveries;

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header with winter theme */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-light text-gray-900 mb-3 tracking-tight">
            Discover our best of winter 2026
          </h2>
          <div className="inline-flex items-center justify-center gap-4 mb-6">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">OUR MOON PHASE DIDN'T ALIGN</span>
            <div className="w-16 h-px bg-gray-300"></div>
          </div>
        </div>

        {/* Discoveries Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
          {displayDiscoveries.map((discovery: any, index) => (
            <Link 
              key={discovery.id || index}
              href={`/category/${discovery.slug || discovery.id}`}
              className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
                <Image
                  src={discovery.image || discovery.image}
                  alt={discovery.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                {/* Badge */}
                {discovery.badge && (
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full">
                      {discovery.badge}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Text Content */}
              <div className="p-4 text-center">
                <h3 className="font-medium text-gray-900 text-sm md:text-base line-clamp-2 min-h-[2.5rem]">
                  {discovery.title}
                </h3>
                {discovery.products_count && (
                  <p className="text-xs text-gray-500 mt-1">
                    {discovery.products_count} {discovery.products_count === 1 ? 'item' : 'items'}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Subcategories Row - From Screenshot */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap justify-center gap-8">
            {["100 Aquarius Gifts", "New Arrivals", "Best of Game Day", "Sweets Charcuterie Boxes", "Cake Pops"].map((category, index) => (
              <Link
                key={index}
                href="#"
                className="text-sm font-medium text-gray-700 hover:text-etsy-orange hover:underline transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;