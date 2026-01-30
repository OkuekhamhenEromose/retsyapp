'use client'

import { Heart } from "lucide-react";
import { Product } from "@/services/api";
import Link from "next/link";

interface GiftProductCardProps {
  product: Product;
  isEtsyPick?: boolean;
  shopName?: string;
  badgeText?: string;
  showFreeDelivery?: boolean;
}

const GiftProductCard = ({
  product,
  isEtsyPick = true,
  shopName,
  badgeText,
  showFreeDelivery = false,
}: GiftProductCardProps) => {
  const formatReviewCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className="group">
      {/* Image Container */}
      <Link href={`/product/${product.slug}`} className="block relative aspect-[4/5] rounded-lg overflow-hidden bg-secondary mb-3">
        <img
          src={product.main}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Etsy's Pick Badge */}
        {isEtsyPick && (
          <div className="absolute top-3 left-3 bg-white px-3 py-1.5 rounded-full text-xs font-medium shadow-sm">
            Etsy's Pick
          </div>
        )}
        
        {/* Favorite Button */}
        <button className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform opacity-0 group-hover:opacity-100">
          <Heart className="h-5 w-5 text-foreground" />
        </button>
      </Link>

      {/* Product Info */}
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-foreground truncate">
          {product.title}
        </h3>
        
        <div className="flex items-center gap-1 text-sm">
          <span className="font-medium">{product.rating}</span>
          <span className="text-foreground">★</span>
          <span className="text-muted-foreground">({formatReviewCount(product.review_count)})</span>
          {shopName && (
            <>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground truncate">{shopName}</span>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`font-medium ${product.discount_price ? 'text-green-700' : 'text-foreground'}`}>
            USD {product.final_price.toFixed(2)}
          </span>
          {product.discount_price && product.discount_percentage > 0 && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                USD {product.price.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground">
                ({product.discount_percentage}% off)
              </span>
            </>
          )}
        </div>
        
        {showFreeDelivery && (
          <p className="text-xs text-muted-foreground">Free delivery</p>
        )}
        
        {badgeText && (
          <p className="text-xs text-muted-foreground">{badgeText}</p>
        )}
        
        <Link href={`/product/${product.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline mt-1">
          More like this →
        </Link>
      </div>
    </div>
  );
};

export default GiftProductCard;