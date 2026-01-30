'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CategoryWithDetails } from '@/services/api';

interface CategoriesProps {
  categories?: CategoryWithDetails[];
}

const Categories: React.FC<CategoriesProps> = ({ categories = [] }) => {
  // Get main categories (no parent) or use first 6 categories
  const mainCategories = categories.filter(cat => 
    !cat.parent_id || cat.parent_id === null
  ).slice(0, 6);

  // Fallback categories matching your screenshot
  const fallbackCategories = [
    {
      id: 1,
      title: "Craft supplies and tools",
      slug: "craft-supplies",
      image: "https://images.unsplash.com/photo-1566793849773-e1375992cd59?w=400&h=400&fit=crop",
      products_count: 1234,
      subcategories: [],
      featured_products: []
    },
    {
      id: 2,
      title: "Mugs",
      slug: "mugs",
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop",
      products_count: 856,
      subcategories: [],
      featured_products: []
    },
    {
      id: 3,
      title: "Digital drawings and illustrations",
      slug: "digital-art",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
      products_count: 2456,
      subcategories: [],
      featured_products: []
    },
    {
      id: 4,
      title: "Stickers",
      slug: "stickers",
      image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400&h=400&fit=crop",
      products_count: 789,
      subcategories: [],
      featured_products: []
    },
    {
      id: 5,
      title: "Women's dresses",
      slug: "womens-dresses",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop",
      products_count: 1456,
      subcategories: [],
      featured_products: []
    },
    {
      id: 6,
      title: "Necklaces",
      slug: "necklaces",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
      products_count: 987,
      subcategories: [],
      featured_products: []
    }
  ];

  const displayCategories = mainCategories.length > 0 ? mainCategories : fallbackCategories;

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="section-title text-2xl md:text-3xl font-light text-gray-900 mb-6">
        Shop our most-loved categories
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {displayCategories.map((category) => (
          <Link 
            key={category.id}
            href={`/category/${category.slug}`}
            className="group text-center"
          >
            <div className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 mb-3 relative">
              {category.image ? (
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 16vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl">
                  🛍️
                </div>
              )}
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </div>
            
            <p className="text-sm font-medium text-gray-900 leading-tight group-hover:text-rose-600 transition-colors">
              {category.title}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {category.products_count.toLocaleString()} items
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;