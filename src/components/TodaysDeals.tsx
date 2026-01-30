'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Clock, Star, Heart } from 'lucide-react';
import { Product } from '@/services/api';

interface TodaysDealsProps {
  products?: Product[];
}

const TodaysDeals: React.FC<TodaysDealsProps> = ({ products = [] }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 22, minutes: 24, seconds: 10 });

  // Filter deals with discount
  const deals = products.filter(p => p.is_deal && p.discount_percentage > 0).slice(0, 4);

  // Fallback deals matching your screenshot
  const fallbackDeals = [
    {
      id: 1,
      title: "CROCHET PATTERN & Tutorial",
      slug: "crochet-pattern-tutorial",
      price: 9.94,
      discount_price: 7.45,
      discount_percentage: 25,
      final_price: 7.45,
      main: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
      rating: 4.9,
      review_count: 156,
      is_featured: true,
      is_bestseller: true,
      is_deal: true,
      is_new_arrival: false,
      condition: "new",
      short_description: "Complete crochet pattern with video tutorial",
      color: "White",
      saleBadge: "Biggest sale in 60+ days"
    },
    {
      id: 2,
      title: "Personalized Photo Pillow",
      slug: "personalized-photo-pillow",
      price: 32.00,
      discount_price: 9.60,
      discount_percentage: 70,
      final_price: 9.60,
      main: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      rating: 4.9,
      review_count: 234,
      is_featured: true,
      is_bestseller: false,
      is_deal: true,
      is_new_arrival: false,
      condition: "new",
      short_description: "Custom photo printed on premium pillow",
      color: "White",
      saleBadge: "Biggest sale in 60+ days",
      freeDelivery: true
    },
    {
      id: 3,
      title: "Personalized Leather Watch Box",
      slug: "leather-watch-box",
      price: 48.72,
      discount_price: 24.36,
      discount_percentage: 50,
      final_price: 24.36,
      main: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&h=400&fit=crop",
      rating: 4.9,
      review_count: 89,
      is_featured: false,
      is_bestseller: true,
      is_deal: true,
      is_new_arrival: false,
      condition: "new",
      short_description: "Handcrafted leather watch storage box",
      color: "Brown",
      saleBadge: "Biggest sale in 60+ days"
    },
    {
      id: 4,
      title: "Neon Sign Custom Wedding",
      slug: "neon-sign-wedding",
      price: 90.85,
      discount_price: 36.33,
      discount_percentage: 60,
      final_price: 36.33,
      main: "https://images.unsplash.com/photo-1562602839-2d3f01163e78?w=400&h=400&fit=crop",
      rating: 5.0,
      review_count: 45,
      is_featured: true,
      is_bestseller: false,
      is_deal: true,
      is_new_arrival: false,
      condition: "new",
      short_description: "Custom LED neon sign for weddings",
      color: "Pink",
      saleBadge: "Biggest sale in 60+ days",
      freeDelivery: true
    }
  ];

  const displayDeals = deals.length > 0 ? deals : fallbackDeals;

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newSeconds = prev.seconds - 1;
        if (newSeconds >= 0) {
          return { ...prev, seconds: newSeconds };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <h2 className="section-title text-2xl md:text-3xl font-light text-gray-900 mb-0">
            Today's big deals
          </h2>
          
          {/* Countdown Timer */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-rose-50 to-pink-50 px-4 py-2 rounded-full border border-rose-100">
            <Clock className="h-4 w-4 text-rose-500" />
            <span className="text-sm font-medium text-gray-700">
              Fresh deals in {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
            </span>
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button 
            className="p-2.5 rounded-full border border-gray-200 hover:border-rose-200 hover:bg-rose-50 transition-all duration-300"
            aria-label="Previous deals"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button 
            className="p-2.5 rounded-full border border-gray-200 hover:border-rose-200 hover:bg-rose-50 transition-all duration-300"
            aria-label="Next deals"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-5">
        {displayDeals.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
          >
            {/* Sale Badge */}
            {product.saleBadge && (
              <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                {product.saleBadge}
              </div>
            )}

            {/* Free Delivery Badge */}
            {product.freeDelivery && (
              <div className="absolute top-3 right-3 z-10 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                FREE DELIVERY
              </div>
            )}

            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
              {product.main ? (
                <Image
                  src={product.main}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  🏷️
                </div>
              )}
              
              {/* Favorite Button */}
              <button 
                className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-300 hover:scale-110 shadow-sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Add to favorites:', product.id);
                }}
              >
                <Heart className="h-4 w-4 text-gray-700" />
              </button>
            </div>

            {/* Product Details */}
            <div className="p-4">
              {/* Title */}
              <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 min-h-[40px]">
                {product.title}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  {product.rating.toFixed(1)} ({product.review_count})
                </span>
              </div>

              {/* Price Section */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl font-bold text-gray-900">
                  ${product.final_price.toFixed(2)}
                </span>
                {product.discount_price && product.discount_price < product.price && (
                  <>
                    <span className="text-sm text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-sm font-bold text-red-500 bg-red-50 px-2 py-1 rounded">
                      -{product.discount_percentage}%
                    </span>
                  </>
                )}
              </div>

              {/* Free Delivery Badge */}
              {product.freeDelivery && (
                <div className="inline-flex items-center gap-1 text-xs text-green-600 font-medium mt-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                  FREE delivery
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TodaysDeals;