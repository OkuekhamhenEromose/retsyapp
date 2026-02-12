'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PopularGiftCategory, GiftProduct } from "@/services/api";
import { apiService } from "@/services/api";

interface DiscoverPopularGiftsProps {
  categories: PopularGiftCategory[];
}

const DiscoverPopularGifts = ({ categories }: DiscoverPopularGiftsProps) => {
  const [selectedCategory, setSelectedCategory] = useState("Jewellery");
  const [products, setProducts] = useState<GiftProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await apiService.getPopularGiftsByCategory(selectedCategory);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching popular gifts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-8 text-gray-900">
          Discover popular gifts sure to delight
        </h2>

        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-6 py-3 rounded-full text-sm font-medium border transition-colors ${
                selectedCategory === cat.name
                  ? "border-gray-900 bg-white text-gray-900"
                  : "border-gray-200 hover:border-gray-900 text-gray-700"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-etsy-orange"></div>
          </div>
        ) : (
          <div className="columns-2 md:columns-4 gap-4 space-y-4">
            {products.map((product) => (
              <Link 
                key={product.id} 
                href={`/product/${product.slug}`} 
                className="block break-inside-avoid group"
              >
                <div className={`relative rounded-xl overflow-hidden ${
                  product.is_featured ? "aspect-[3/4]" : "aspect-square"
                }`}>
                  <Image
                    src={product.main}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-sm">
                    <span className="text-gray-900">USD {formatPrice(product.final_price)}</span>
                    {product.discount_price && (
                      <span className="text-gray-500 line-through text-xs">
                        USD {formatPrice(product.price)}
                      </span>
                    )}
                  </div>
                  {product.etsy_pick && (
                    <span className="absolute top-3 left-3 bg-etsy-orange text-white text-xs px-2 py-1 rounded-full">
                      Etsy's Pick
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <button className="px-8 py-4 border-2 border-gray-900 rounded-full text-base font-medium hover:bg-gray-100 transition-colors">
            Show more
          </button>
        </div>
      </div>
    </section>
  );
};

export default DiscoverPopularGifts;