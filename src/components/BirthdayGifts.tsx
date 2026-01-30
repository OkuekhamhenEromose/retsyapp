'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Gift, Sparkles } from 'lucide-react';
import { Category, Product } from '@/services/api';

interface BirthdayGiftsProps {
  data?: {
    categories: Category[];
    products: Product[];
  };
}

const BirthdayGifts: React.FC<BirthdayGiftsProps> = ({ data }) => {
  const categories = data?.categories || [];
  const products = data?.products || [];

  // Default birthday gifts from screenshot
  const defaultBirthdayGifts = [
    {
      id: 1,
      title: "Sweets Charcuterie Boxes",
      price: 49.98,
      originalPrice: 69.99,
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop",
      badge: "Popular"
    },
    {
      id: 2,
      title: "Cake Pops",
      price: 28.00,
      image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=400&fit=crop",
      badge: "New"
    },
    {
      id: 3,
      title: "Custom Birthday Crowns",
      price: 32.50,
      originalPrice: 65.00,
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop",
      badge: "50% OFF"
    }
  ];

  const displayGifts = products.length > 0 ? products.slice(0, 3) : defaultBirthdayGifts;

  return (
    <section className="bg-gradient-to-r from-rose-50 to-pink-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
          <div className="max-w-lg">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-rose-500" />
              <span className="text-sm font-medium text-rose-600 uppercase tracking-wider">Seasonal Picks</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 leading-tight">
              Etsy-special gifts for birthdays
            </h2>
            <p className="text-gray-600 mt-3 text-sm">
              Thoughtful, handmade, and personalized gifts that make birthdays extra special.
            </p>
          </div>
          
          <button className="group inline-flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            <Gift className="w-4 h-4" />
            Get inspired
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* Gift Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayGifts.map((gift: any, index) => (
            <Link 
              key={gift.id || index}
              href={gift.slug ? `/product/${gift.slug}` : '#'}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={gift.image || gift.main}
                  alt={gift.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                
                {/* Price Badge */}
                <div className="absolute top-4 left-4">
                  <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">
                        ${gift.price?.toFixed(2) || gift.final_price?.toFixed(2) || '0.00'}
                      </span>
                      {gift.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${gift.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Discount Badge */}
                {gift.badge && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 bg-rose-500 text-white text-xs font-bold rounded-full">
                      {gift.badge}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="font-medium text-gray-900 text-lg mb-3 line-clamp-2">
                  {gift.title}
                </h3>
                
                {/* Rating and Details */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-4 h-4 ${i < (gift.rating || 4) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      ({gift.review_count || 42})
                    </span>
                  </div>
                  
                  {gift.discount_percentage && gift.discount_percentage > 0 && (
                    <span className="text-sm font-medium text-rose-600">
                      {gift.discount_percentage}% OFF
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Subcategories Section */}
        <div className="mt-12 pt-10 border-t border-rose-100">
          <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">Explore by interest</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Aquarius Gifts", "Home Decor Gifts", "Gifts for Kids", "Personalized Gifts"].map((interest, index) => (
              <Link
                key={index}
                href="#"
                className="group p-4 bg-white rounded-xl border border-gray-100 hover:border-rose-200 hover:bg-rose-50 transition-all duration-300 text-center"
              >
                <h4 className="font-medium text-gray-900 group-hover:text-rose-600">
                  {interest}
                </h4>
                <p className="text-xs text-gray-500 mt-1">Browse collection</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BirthdayGifts;
 