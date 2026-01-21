'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
import { Product } from '@/services/api'; // Import Product from services/api

// Remove the local Product interface declaration
interface EditorsPicksVintageProps {
  products?: Product[]; // Now using the imported Product type
}

const EditorsPicksVintage: React.FC<EditorsPicksVintageProps> = ({ products = [] }) => {
  const vintageProducts = products.filter(p => p.condition === 'vintage').slice(0, 4);

  if (!vintageProducts.length) {
    return (
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-16 bg-gray-200 rounded mb-6"></div>
            <div className="h-10 bg-gray-200 rounded w-48"></div>
          </div>
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-xl"></div>
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
          <p className="text-sm text-muted-foreground mb-2">Editors' Picks</p>
          <h2 className="text-2xl md:text-3xl font-serif font-medium text-foreground mb-4">
            Etsy's Guide to Vintage
          </h2>
          <p className="text-foreground mb-6 leading-relaxed">
            Discover timeless denim, heirloom jewellery, antique decor, and more from small shops.
          </p>
          <Link 
            href="/products?condition=vintage"
            className="outline-button w-fit"
          >
            Shop these unique finds
          </Link>
        </div>

        {/* Vintage Items Grid */}
        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
          {vintageProducts.map((product) => (
            <Link 
              key={product.id}
              href={`/product/${product.slug}`}
              className="relative group rounded-xl overflow-hidden aspect-square bg-secondary block"
            >
              <div className="relative w-full h-full">
                {product.main ? (
                  <Image
                    src={product.main}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
                    <span className="text-4xl">🏺</span>
                  </div>
                )}
                
                {/* Favorite Button */}
                <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors z-10">
                  <Heart className="h-4 w-4" />
                </button>

                {/* Rating */}
                {product.rating > 0 && (
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-medium">{product.rating.toFixed(1)}</span>
                  </div>
                )}

                {/* Price Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <div className="price-badge bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-price font-bold">${product.final_price.toFixed(2)}</span>
                  </div>
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium">
                    Vintage
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EditorsPicksVintage;