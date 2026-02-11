// components/fashion/FashionShopsWeLove.tsx
import { Heart, Star } from "lucide-react";
import { FashionShop } from "@/services/api";
import Image from "next/image";

interface FashionShopsWeLoveProps {
  shops: FashionShop[];
}

const FashionShopsWeLove = ({ shops }: FashionShopsWeLoveProps) => {
  if (!shops || shops.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-serif text-center mb-8">Discover shops we love</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {shops.map((shop) => (
          <div 
            key={shop.id} 
            className="border border-border rounded-xl p-3 hover:shadow-md transition-shadow"
          >
            <div className="grid grid-cols-2 gap-1.5 mb-3">
              {shop.featured_products_preview.map((product, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden">
                  {product.main ? (
                    <Image
                      src={product.main}
                      alt={product.title}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-xs text-gray-400">No image</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                  {shop.display_name?.charAt(0) || shop.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{shop.display_name || shop.name}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 ${i < Math.floor(shop.rating) ? 'fill-foreground text-foreground' : 'fill-muted text-muted'}`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground">
                      ({shop.review_count.toLocaleString()})
                    </span>
                  </div>
                </div>
              </div>
              <button className="p-1.5 hover:bg-secondary rounded-full">
                <Heart className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FashionShopsWeLove;