'use client'

import Image from "next/image";
import Link from "next/link";

interface Category {
  image: string;
  label: string;
}

interface HomeFavouritesCategoriesProps {
  categories: Category[];
}

const HomeFavouritesCategories = ({ categories }: HomeFavouritesCategoriesProps) => {
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