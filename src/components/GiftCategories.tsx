'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/services/api';

interface GiftCategoriesProps {
  categories?: Category[];
}

const GiftCategories: React.FC<GiftCategoriesProps> = ({ categories = [] }) => {
  // Filter only gift-related categories
  const giftCategories = categories.filter(cat => 
    cat.category_type?.includes('gift') || 
    cat.title.toLowerCase().includes('gift')
  ).slice(0, 5);

  // Fallback categories matching your screenshot
  const fallbackCategories = [
    {
      id: 1,
      title: "Galentine's Gifts",
      slug: "galentines-gifts",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=200&h=200&fit=crop",
      icon: "💝",
      products_count: 245,
      category_type: "gift_occasion"
    },
    {
      id: 2,
      title: "Aquarius Gifts",
      slug: "aquarius-gifts",
      image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=200&h=200&fit=crop",
      icon: "♒",
      products_count: 120,
      category_type: "gift_interest"
    },
    {
      id: 3,
      title: "Home Decor Gifts",
      slug: "home-decor-gifts",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop",
      icon: "🏠",
      products_count: 456,
      category_type: "gifts"
    },
    {
      id: 4,
      title: "Gifts for Kids",
      slug: "gifts-for-kids",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200&h=200&fit=crop",
      icon: "🎁",
      products_count: 189,
      category_type: "gift_recipient"
    },
    {
      id: 5,
      title: "Jewellery Gifts",
      slug: "jewellery-gifts",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&h=200&fit=crop",
      icon: "💎",
      products_count: 312,
      category_type: "gifts"
    }
  ];

  const displayCategories = giftCategories.length > 0 ? giftCategories : fallbackCategories;

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="section-title text-2xl md:text-3xl font-light text-gray-900 mb-6">
        Gifts as special as they are
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {displayCategories.map((category) => (
          <Link 
            key={category.id}
            href={`/category/${category.slug}`}
            className="group flex items-center gap-3 p-4 rounded-2xl bg-white border border-gray-100 hover:border-rose-200 hover:bg-rose-50 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            {/* Category Image */}
            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-gradient-to-br from-rose-50 to-pink-50">
              {category.image ? (
                <Image
                  src={category.image}
                  alt={category.title}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl">
                  {category.icon || '🎁'}
                </div>
              )}
            </div>
            
            {/* Category Title */}
            <div className="text-left min-w-0">
              <span className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-rose-600 transition-colors">
                {category.title}
              </span>
              <p className="text-xs text-gray-500 mt-0.5">
                {category.products_count} items
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default GiftCategories;