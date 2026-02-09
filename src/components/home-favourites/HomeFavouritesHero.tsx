'use client'

import Image from "next/image";
import Link from "next/link";

interface HomeFavouritesHeroProps {
  title: string;
  description: string;
  categories: Array<{
    image: string;
    label: string;
  }>;
}

const HomeFavouritesHero = ({ title, description, categories }: HomeFavouritesHeroProps) => {
  return (
    <section className="bg-[#232347] text-white py-12 pb-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif mb-4">
          {title}
        </h1>
        <p className="text-lg md:text-xl font-medium mb-12 max-w-3xl mx-auto">
          {description}
        </p>
        
        {/* Category Circles */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <Link 
              key={index}
              href={`/category/${category.label.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-')}`}
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden bg-amber-100 group-hover:scale-105 transition-transform duration-300 relative">
                <Image
                  src={category.image}
                  alt={category.label}
                  className="w-full h-full object-cover"
                  fill
                  sizes="(max-width: 768px) 112px, 128px"
                  priority={index < 3}
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