import { Heart, Play } from "lucide-react";
import { Product } from '@/services/api';
import Link from 'next/link';

interface ValentinesProductCardProps extends Product {
  shop_name?: string | null;
  etsy_pick?: boolean;
  free_delivery?: boolean;
  has_video?: boolean;
}

const ValentinesProductCard = ({
  id,
  title,
  slug,
  main,
  rating,
  review_count,
  shop_name,
  price,
  discount_price,
  discount_percentage,
  free_delivery,
  has_video,
  etsy_pick,
}: ValentinesProductCardProps) => {
  return (
    <div className="group">
      {/* Image Container */}
      <Link href={`/product/${slug}`} className="block relative aspect-[4/5] rounded-lg overflow-hidden bg-secondary mb-3">
        <img
          src={main || '/api/placeholder/400/500'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Favorite Button */}
        <button className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform opacity-0 group-hover:opacity-100">
          <Heart className="h-5 w-5 text-foreground" />
        </button>
        
        {/* Video Play Button */}
        {has_video && (
          <button className="absolute bottom-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
            <Play className="h-4 w-4 text-foreground fill-foreground ml-0.5" />
          </button>
        )}
        
        {/* Etsy's Pick Badge */}
        {etsy_pick && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-white text-gray-900 text-xs font-semibold rounded shadow-sm">
            Etsy's Pick
          </div>
        )}
        
        {/* Discount Badge */}
        {discount_percentage > 0 && (
          <div className="absolute bottom-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded">
            -{discount_percentage}%
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-medium text-foreground line-clamp-1 flex-1">
            {title}
          </h3>
          <div className="flex items-center gap-1 text-sm shrink-0">
            <span className="font-medium">{rating.toFixed(1)}</span>
            <span className="text-foreground">★</span>
            <span className="text-muted-foreground">({review_count})</span>
          </div>
        </div>
        
        {shop_name && (
          <p className="text-sm text-muted-foreground">{shop_name}</p>
        )}
        
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-foreground">
            USD {price.toFixed(2)}
          </span>
          {discount_price && discount_price < price && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                USD {discount_price.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground">
                ({discount_percentage}% off)
              </span>
            </>
          )}
        </div>
        
        {free_delivery && (
          <span className="inline-block text-xs font-medium text-white bg-green-700 px-2 py-0.5 rounded">
            FREE delivery
          </span>
        )}
      </div>
    </div>
  );
};

export default ValentinesProductCard;