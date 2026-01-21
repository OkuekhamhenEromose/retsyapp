'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category, Product } from '@/services/api'; // Import types from services/api

interface CategoriesProps {
  categories?: Category[]; // Use imported Category type
}

const Categories: React.FC<CategoriesProps> = ({ categories = [] }) => {
  if (!categories.length) {
    return (
      <section className="container mx-auto px-4 py-8">
        <h2 className="section-title">Shop our most-loved categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-xl mb-3"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Get only top 6 categories for display
  const displayCategories = categories.slice(0, 6);

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="section-title">Shop our most-loved categories</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {displayCategories.map((category) => (
          <Link 
            key={category.id}
            href={`/category/${category.slug}`}
            className="group text-center"
          >
            <div className="aspect-square overflow-hidden rounded-xl bg-secondary mb-3 relative">
              {category.image ? (
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-4xl">🛍️</span>
                </div>
              )}
            </div>
            <p className="text-sm font-medium text-foreground leading-tight">
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

export default Categories;