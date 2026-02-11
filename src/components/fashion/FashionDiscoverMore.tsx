// components/fashion/FashionDiscoverMore.tsx
import { FashionDiscover } from "@/services/api";
import Image from "next/image";

interface FashionDiscoverMoreProps {
  discoverItems: FashionDiscover[];
}

const FashionDiscoverMore = ({ discoverItems }: FashionDiscoverMoreProps) => {
  if (!discoverItems || discoverItems.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-serif text-center underline mb-8">
        Discover more
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {discoverItems.map((item) => (
          <a 
            key={item.id} 
            href={item.url}
            className="group"
          >
            <div className="aspect-square rounded-2xl overflow-hidden mb-3">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>
            <p className="text-sm font-medium">{item.title}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default FashionDiscoverMore;