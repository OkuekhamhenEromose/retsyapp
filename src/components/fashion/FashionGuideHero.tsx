// components/fashion/FashionGuideHero.tsx
import { ArrowRight } from "lucide-react";
import { Category } from "@/services/api";
import Image from "next/image";

interface FashionGuideHeroProps {
  title: string;
  description: string;
  categories: Category[];
}

const FashionGuideHero = ({ title, description, categories }: FashionGuideHeroProps) => {
  return (
    <>
      <section className="bg-[#232347] py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-serif mb-3">{title}</h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto opacity-90">
            {description}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <a 
              key={cat.id} 
              href={`/category/${cat.slug}`}
              className="group flex flex-col items-center text-center gap-2"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden">
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    width={144}
                    height={144}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>
              <span className="text-sm font-medium text-foreground flex items-center gap-1 group-hover:underline">
                {cat.title} <ArrowRight className="h-3 w-3" />
              </span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
};

export default FashionGuideHero;