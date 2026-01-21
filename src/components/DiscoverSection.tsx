'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Compass } from 'lucide-react';
import { Category } from '@/services/api';

interface DiscoverSectionProps {
  categories?: Category[];
}

const DiscoverSection: React.FC<DiscoverSectionProps> = ({ categories = [] }) => {
  if (!categories.length) {
    return (
      <section className="container mx-auto px-4 py-8">
        <h2 className="section-title">Discover our best of winter 2026</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-xl mb-3"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="section-title">Discover our best of winter 2026</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {categories.slice(0, 5).map((category) => (
          <Link 
            key={category.id}
            href={`/category/${category.slug}`}
            className="group text-center"
          >
            <div className="aspect-square overflow-hidden rounded-xl bg-secondary mb-3 relative">
              {category.image ? (
                <Image
                  src={category.image.startsWith('http') ? category.image : `/api/proxy?url=${encodeURIComponent(category.image)}`}
                  alt={category.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                  <Compass className="w-12 h-12 text-primary" />
                </div>
              )}
            </div>
            <p className="font-medium text-sm text-foreground line-clamp-2">
              {category.title}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {category.products_count} {category.products_count === 1 ? 'item' : 'items'}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default DiscoverSection;