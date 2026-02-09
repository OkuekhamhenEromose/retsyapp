'use client'

import Image from "next/image";
import Link from "next/link";

// Use Unsplash images or local public folder images
const categories = [
  { 
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=800&fit=crop", 
    label: "Special Starts on Etsy" 
  },
  { 
    image: "https://images.unsplash.com/photo-1567016376408-0226e1d3d0c6?w=800&h=800&fit=crop", 
    label: "Global Seller Spotlight" 
  },
  { 
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w-800&h=800&fit=crop", 
    label: "Vintage Home Decor" 
  },
  { 
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=800&fit=crop", 
    label: "Explore Unique Wall Art" 
  },
];

const DiscoverMore = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-serif text-center mb-8 underline underline-offset-4">
        Discover more
      </h2>
      
      {/* Category Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {categories.map((category, index) => (
          <Link 
            key={index}
            href="#"
            className="group"
          >
            <div className="aspect-square rounded-xl overflow-hidden bg-secondary mb-3 group-hover:shadow-lg transition-shadow relative">
              <Image
                src={category.image}
                alt={category.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                priority={index < 2}
              />
            </div>
            <h3 className="text-base font-medium text-foreground group-hover:underline">
              {category.label}
            </h3>
          </Link>
        ))}
      </div>

      {/* Gift Cards Banner */}
      <div className="bg-gray-100 rounded-2xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-serif mb-3">
              Shop Etsy gift cards
            </h3>
            <p className="text-muted-foreground mb-4">
              Get them something one-of-a-kind in minutes, no guesswork needed.
            </p>
            <Link href="#" className="inline-flex items-center gap-1 text-base font-medium text-foreground hover:underline">
              Pick a design →
            </Link>
          </div>
          <div className="relative h-48 md:h-auto bg-gradient-to-br from-orange-400 via-blue-400 to-pink-300 flex items-center justify-center">
            <div className="text-4xl md:text-6xl font-bold text-white font-serif transform -rotate-6">
              Etsy
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverMore;