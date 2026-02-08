'use client'

import Image from "next/image";
import Link from "next/link";

// You'll need to add these images to your public folder
const categories = [
  { image: "/images/ceramic-mug.jpg", label: "Home Decor" },
  { image: "/images/vintage-glass.jpg", label: "Kitchen & Dining" },
  { image: "/images/macrame.jpg", label: "Furniture" },
  { image: "/images/vintage-rack.jpg", label: "Vintage Rugs" },
  { image: "/images/linen-spotlight.jpg", label: "Lighting" },
  { image: "/images/crochet-blanket.jpg", label: "Bedding" },
];

const HomeFavouritesHero = () => {
  return (
    <section className="bg-[#232347] text-white py-12 pb-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif mb-4">
          Etsy's Guide to Home
        </h1>
        <p className="text-lg md:text-xl font-medium mb-12 max-w-3xl mx-auto">
          Discover original wall art, comfy bedding, unique lighting, and more from small shops.
        </p>
        
        {/* Category Circles */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <Link 
              key={index}
              href="#"
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden bg-amber-100 group-hover:scale-105 transition-transform duration-300 relative">
                <Image
                  src={category.image}
                  alt={category.label}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 112px, 128px"
                />
              </div>
              <span className="text-sm font-medium group-hover:underline flex items-center gap-1">
                {category.label} <span>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFavouritesHero;