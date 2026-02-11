// components/fashion/FashionProductCard.tsx
import { Heart, Star, ArrowRight } from "lucide-react";
import { Product } from "@/services/api";
import Image from "next/image";

interface FashionProductCardProps {
  product: Product;
  etsysPick?: boolean;
}

const FashionProductCard = ({
  product,
  etsysPick = true,
}: FashionProductCardProps) => {
  const {
    title,
    main,
    rating,
    review_count,
    shop_name,
    final_price,
    discount_price,
    discount_percentage,
    freeDelivery,
  } = product;

  const displayRating = rating || 0;
  const displayReviewCount = review_count || 0;
  const displayShopName = shop_name || "Unknown Shop";

  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-2">
        {main ? (
          <Image
            src={main}
            alt={title}
            width={300}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
        {etsysPick && (
          <span className="absolute top-3 left-3 bg-white/90 text-xs font-medium px-2.5 py-1 rounded">
            Etsy's Pick
          </span>
        )}
        <button className="absolute top-3 right-3 p-1.5 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="h-4 w-4" />
        </button>
      </div>
      <h3 className="text-sm font-normal truncate">{title}</h3>
      <div className="flex items-center gap-1 mt-0.5">
        <span className="text-sm font-medium">{displayRating.toFixed(1)}</span>
        <Star className="h-3 w-3 fill-foreground text-foreground" />
        <span className="text-xs text-muted-foreground">
          ({displayReviewCount.toLocaleString()})
        </span>
        <span className="text-xs text-muted-foreground">· {displayShopName}</span>
      </div>
      <div className="flex items-center gap-2 mt-1">
        {discount_price && discount_percentage ? (
          <>
            <span 
              className="text-sm font-semibold" 
              style={{ color: "hsl(142, 71%, 29%)" }}
            >
              USD {final_price.toFixed(2)}
            </span>
            <span className="text-xs text-muted-foreground line-through">
              USD {discount_price.toFixed(2)}
            </span>
            <span className="text-xs text-muted-foreground">
              ({discount_percentage}% off)
            </span>
          </>
        ) : (
          <span className="text-sm font-semibold">USD {final_price.toFixed(2)}</span>
        )}
      </div>
      {freeDelivery && (
        <p className="text-xs text-muted-foreground mt-0.5">Free delivery</p>
      )}
      <a 
        href={`/product/${product.slug}`} 
        className="inline-flex items-center gap-1 text-xs font-medium mt-1 hover:underline"
      >
        More like this <ArrowRight className="h-3 w-3" />
      </a>
    </div>
  );
};

export default FashionProductCard;