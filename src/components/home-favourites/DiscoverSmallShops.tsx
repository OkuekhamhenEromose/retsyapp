'use client'

import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Use Unsplash images
const shops = [
  {
    name: "OliveLaneInteriors",
    rating: 5,
    reviewCount: "100",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1548625320-cf6858a7c538?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1567016376408-0226e1d3d0c6?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop"
    ],
  },
  {
    name: "BrooxFurniture",
    rating: 5,
    reviewCount: "116",
    images: [
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1548625320-cf6858a7c538?w=400&h=400&fit=crop"
    ],
  },
  {
    name: "ForestlandLinen",
    rating: 5,
    reviewCount: "4,977",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1567016376408-0226e1d3d0c6?w=400&h=400&fit=crop"
    ],
  },
  {
    name: "MDTMobilier",
    rating: 3,
    reviewCount: "70",
    images: [
      "https://images.unsplash.com/photo-1548625320-cf6858a7c538?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1548625320-cf6858a7c538?w=400&h=400&fit=crop"
    ],
  },
];

const DiscoverSmallShops = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-serif text-center mb-8">
        Discover small shops
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {shops.map((shop, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-1 p-3">
              {shop.images.map((image, imgIndex) => (
                <div 
                  key={imgIndex}
                  className="aspect-square rounded-lg overflow-hidden bg-secondary relative"
                >
                  <Image
                    src={image}
                    alt={`${shop.name} product ${imgIndex + 1}`}
                    className="w-full h-full object-cover"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    priority={index === 0 && imgIndex === 0}
                  />
                </div>
              ))}
            </div>
            
            {/* Shop Info */}
            <div className="px-3 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                  {shop.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <Link href={`/shop/${shop.name.toLowerCase()}`}>
                    <p className="text-sm font-medium text-foreground hover:underline">
                      {shop.name}
                    </p>
                  </Link>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-3 w-3 ${i < shop.rating ? 'fill-foreground text-foreground' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">({shop.reviewCount})</span>
                  </div>
                </div>
              </div>
              <button 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label={`Add ${shop.name} to favorites`}
              >
                <Heart className="h-5 w-5 text-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DiscoverSmallShops;