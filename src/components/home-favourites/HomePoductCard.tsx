'use client'

import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface HomeProductCardProps {
  image: any; // Next.js Image import
  title: string;
  rating: number;
  reviewCount: string;
  shopName: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  freeDelivery?: boolean;
  isEtsyPick?: boolean;
}

const HomeProductCard = ({
  image,
  title,
  rating,
  reviewCount,
  shopName,
  price,
  originalPrice,
  discount,
  freeDelivery,
  isEtsyPick = true,
}: HomeProductCardProps) => {
  return (
    <div className="group">
      {/* Image Container */}
      <Link href="#" className="block relative aspect-[4/5] rounded-lg overflow-hidden bg-secondary mb-3">
        <Image
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        
        {/* Etsy's Pick Badge */}
        {isEtsyPick && (
          <div className="absolute top-3 left-3 bg-white px-3 py-1.5 rounded-full text-xs font-medium shadow-sm">
            Etsy's Pick
          </div>
        )}
        
        {/* Favorite Button */}
        <button className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform opacity-0 group-hover:opacity-100 z-10">
          <Heart className="h-5 w-5 text-foreground" />
        </button>
      </Link>

      {/* Product Info */}
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-foreground line-clamp-2 min-h-[2.5rem]">
          {title}
        </h3>
        
        <div className="flex items-center gap-1 text-sm">
          <span className="font-medium">{rating}</span>
          <span className="text-foreground">★</span>
          <span className="text-muted-foreground">({reviewCount})</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground truncate">{shopName}</span>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`font-medium ${discount ? 'text-green-700' : 'text-foreground'}`}>
            USD {price.toFixed(2)}
          </span>
          {originalPrice && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                USD {originalPrice.toFixed(2)}
              </span>
              {discount && (
                <span className="text-sm text-muted-foreground">
                  ({discount})
                </span>
              )}
            </>
          )}
        </div>
        
        {freeDelivery && (
          <p className="text-xs text-muted-foreground">Free delivery</p>
        )}
        
        <Link href="#" className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline mt-1">
          More like this →
        </Link>
      </div>
    </div>
  );
};

export default HomeProductCard;