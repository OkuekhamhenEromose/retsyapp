'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Gift } from 'lucide-react';
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

  if (!categories.length && !products.length) {
    return (
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Text Block */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-serif font-medium text-foreground mb-4">
            Etsy-special gifts for birthdays
          </h2>
          <button className="pill-button w-fit">
            <Gift className="w-4 h-4 mr-2" />
            Get inspired
          </button>
        </div>

        {/* Gift Cards */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(products.length > 0 ? products.slice(0, 3) : categories.slice(0, 3)).map((item: any, index) => (
            <Link 
              key={item.id || index}
              href={item.slug ? (item.main ? `/product/${item.slug}` : `/category/${item.slug}`) : '#'}
              className="relative group rounded-2xl overflow-hidden aspect-square block"
            >
              <div className="relative w-full h-full">
                {item.main || item.image ? (
                  <Image
                    src={(item.main || item.image).startsWith('http') ? (item.main || item.image) : `/api/proxy?url=${encodeURIComponent(item.main || item.image)}`}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                    <Gift className="w-16 h-16 text-primary" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-white font-medium text-lg">
                  {item.title}
                </p>
                {item.final_price && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold">${item.final_price.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BirthdayGifts;