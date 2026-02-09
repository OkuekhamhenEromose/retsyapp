'use client'

import Image from "next/image";
import Link from "next/link";

// Use Unsplash images
const categories = [
  { 
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=400&fit=crop", 
    label: "Artisanal Dinnerware" 
  },
  { 
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop", 
    label: "Outdoor Furniture & Decor" 
  },
  { 
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop", 
    label: "Garden Decor & Supplies" 
  },
  { 
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop", 
    label: "Personalised Home Decor" 
  },
  { 
    image: "https://images.unsplash.com/photo-1548625320-cf6858a7c538?w=400&h=400&fit=crop", 
    label: "Candles & Home Fragrance" 
  },
  { 
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400&h=400&fit=crop", 
    label: "Vintage Home Decor" 
  },
];

const HomeFavouritesCategories = () => {
  return (
    <section className="container mx-auto px-4 py-12 -mt-16">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
        {categories.map((category, index) => (
          <Link 
            key={index}
            href={`/category/${category.label.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-')}`}
            className="group flex flex-col items-center gap-3"
          >
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden bg-secondary group-hover:scale-105 transition-transform duration-300 shadow-md relative">
              <Image
                src={category.image}
                alt={category.label}
                className="w-full h-full object-cover"
                fill
                sizes="(max-width: 768px) 112px, 128px"
                priority={index < 3}
              />
            </div>
            <span className="text-sm font-medium text-foreground text-center group-hover:underline flex items-center gap-1">
              {category.label} <span>→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HomeFavouritesCategories;