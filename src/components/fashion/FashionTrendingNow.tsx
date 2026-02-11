// components/fashion/FashionTrendingNow.tsx
import { ArrowRight } from "lucide-react";
import { FashionTrending } from "@/services/api";
import Image from "next/image";

interface FashionTrendingNowProps {
  trending: FashionTrending;
}

const FashionTrendingNow = ({ trending }: FashionTrendingNowProps) => {
  if (!trending) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white border border-border rounded-2xl overflow-hidden">
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">{trending.title}</h2>
          {trending.subtitle && (
            <p className="text-lg font-medium text-muted-foreground mb-4">
              {trending.subtitle}
            </p>
          )}
          <p className="text-muted-foreground mb-6">
            {trending.description}
          </p>
          <a 
            href={trending.button_url}
            className="inline-flex items-center gap-1 text-sm font-semibold hover:underline"
          >
            {trending.button_text} <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="aspect-square md:aspect-auto">
          {trending.image ? (
            <Image
              src={trending.image}
              alt={trending.title}
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FashionTrendingNow;