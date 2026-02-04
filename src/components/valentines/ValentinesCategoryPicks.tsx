import { Category } from '@/services/api';
import Link from 'next/link';

interface ValentinesCategoryPicksProps {
  categories: Category[];
}

const ValentinesCategoryPicks = ({ categories }: ValentinesCategoryPicksProps) => {
  return (
    <div className="flex justify-center gap-6 mb-10 overflow-x-auto pb-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/category/${category.slug}`}
          className="flex flex-col items-center group shrink-0"
        >
          <div className="w-36 h-36 md:w-44 md:h-44 rounded-xl overflow-hidden mb-3 bg-secondary">
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <p className="text-sm text-center font-medium text-foreground group-hover:underline max-w-[140px]">
            {category.title}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default ValentinesCategoryPicks;