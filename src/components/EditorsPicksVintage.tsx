'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
import { Product } from '@/services/api';

interface EditorsPicksVintageProps {
  products?: Product[];
}

const EditorsPicksVintage: React.FC<EditorsPicksVintageProps> = ({ products = [] }) => {
  // Filter vintage products
  const vintageProducts = products.filter(p => 
    p.condition === 'vintage' || p.title.toLowerCase().includes('vintage')
  ).slice(0, 4);

  // Fallback vintage items matching your screenshot
  const fallbackVintage = [
    {
      id: 1,
      title: "Vintage Glass Decanter",
      slug: "vintage-glass-decanter",
      price: 65.00,
      discount_price: undefined,
      discount_percentage: 0,
      final_price: 65.00,
      main: "https://images.unsplash.com/photo-1548625320-cf6858a7c538?w-400&h=400&fit=crop",
      rating: 4.8,
      review_count: 23,
      is_featured: true,
      is_bestseller: false,
      is_deal: false,
      is_new_arrival: false,
      condition: "vintage",
      short_description: "Antique glass decanter set",
      color: "Clear"
    },
    {
      id: 2,
      title: "Vintage Seashell Collection",
      slug: "vintage-seashell-collection",
      price: 42.00,
      discount_price: undefined,
      discount_percentage: 0,
      final_price: 42.00,
      main: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
      rating: 4.9,
      review_count: 15,
      is_featured: false,
      is_bestseller: false,
      is_deal: false,
      is_new_arrival: false,
      condition: "vintage",
      short_description: "Curated vintage seashell collection",
      color: "Natural"
    },
    {
      id: 3,
      title: "Antique Wall Mirror",
      slug: "antique-wall-mirror",
      price: 85.00,
      discount_price: undefined,
      discount_percentage: 0,
      final_price: 85.00,
      main: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&h=400&fit=crop",
      rating: 4.7,
      review_count: 31,
      is_featured: true,
      is_bestseller: false,
      is_deal: false,
      is_new_arrival: false,
      condition: "vintage",
      short_description: "Ornate antique wall mirror",
      color: "Gold"
    },
    {
      id: 4,
      title: "Vintage Wooden Rack",
      slug: "vintage-wooden-rack",
      price: 118.00,
      discount_price: undefined,
      discount_percentage: 0,
      final_price: 118.00,
      main: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&h=400&fit=crop",
      rating: 5.0,
      review_count: 8,
      is_featured: false,
      is_bestseller: true,
      is_deal: false,
      is_new_arrival: false,
      condition: "vintage",
      short_description: "Rustic wooden display rack",
      color: "Brown"
    }
  ];

  const displayProducts = vintageProducts.length > 0 ? vintageProducts : fallbackVintage;

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Text Block - Exactly matching screenshot */}
        <div className="flex flex-col justify-center lg:pr-8">
          <p className="text-sm text-gray-500 font-medium mb-2 uppercase tracking-wider">
            Editors' Picks
          </p>
          <h2 className="text-2xl md:text-3xl font-serif font-medium text-gray-900 mb-4 leading-tight">
            Etsy's Guide to Vintage
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed text-sm md:text-base">
            Discover timeless denim, heirloom jewellery, antique decor, and more from small shops.
          </p>
          <Link 
            href="/products?condition=vintage"
            className="inline-flex items-center justify-center w-fit px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-full font-medium hover:bg-gray-900 hover:text-white transition-all duration-300 group"
          >
            <span className="text-sm">Shop these unique finds</span>
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Vintage Items Grid */}
        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayProducts.map((product, index) => (
            <Link 
              key={product.id}
              href={`/product/${product.slug}`}
              className="group relative rounded-xl overflow-hidden aspect-square bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 block"
            >
              <div className="relative w-full h-full">
                {/* Product Image */}
                {product.main ? (
                  <Image
                    src={product.main}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl">
                    🏺
                  </div>
                )}
                
                {/* Vintage Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Favorite Button */}
                <button 
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-300 hover:scale-110 shadow-sm z-10"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Add to favorites:', product.id);
                  }}
                >
                  <Heart className="h-4 w-4 text-gray-700" />
                </button>

                {/* Rating */}
                {product.rating > 0 && (
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-medium">{product.rating.toFixed(1)}</span>
                  </div>
                )}

                {/* Price Badge - Only show on the 4th item like screenshot */}
                {index === 3 && (
                  <div className="absolute bottom-3 left-3">
                    <div className="price-badge bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">FROM</span>
                        <span className="text-lg font-bold text-gray-900">
                          ${product.final_price.toFixed(2)}
                        </span>
                      </div>
                    </div>
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

export default EditorsPicksVintage;