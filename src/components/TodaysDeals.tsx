'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Tag, Star, Heart } from 'lucide-react';
import { Product } from '@/services/api'; // Import Product from services/api

// Remove the local Product interface declaration
interface TodaysDealsProps {
  products?: Product[]; // Now using the imported Product type
}

const TodaysDeals: React.FC<TodaysDealsProps> = ({ products = [] }) => {
  if (!products.length) {
    return (
      <section className="container mx-auto px-4 py-8">
        <h2 className="section-title">Today's Deals</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title">Today's Deals</h2>
        <Link 
          href="/products?deal=true"
          className="text-primary hover:text-primary-dark font-medium flex items-center gap-1"
        >
          See all deals
          <span className="text-lg">→</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.slice(0, 10).map((product) => (
          <Link 
            key={product.id}
            href={`/product/${product.slug}`}
            className="group relative"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg mb-3">
              {product.main ? (
                <Image
                  src={product.main}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
                  <Tag className="w-12 h-12 text-primary" />
                </div>
              )}
              
              {/* Discount Badge */}
              {product.discount_percentage > 0 && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  -{product.discount_percentage}%
                </div>
              )}
              
              {/* Favorite Button */}
              <button className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                <Heart className="w-4 h-4" />
              </button>
            </div>
            
            <h3 className="font-medium text-sm text-foreground line-clamp-2 mb-2">
              {product.title}
            </h3>
            
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">
                  ({product.review_count})
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">
                ${product.final_price.toFixed(2)}
              </span>
              {product.discount_price && product.discount_price < product.price && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TodaysDeals;