import { Heart } from "lucide-react";

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  rating?: number;
  freeDelivery?: boolean;
  saleBadge?: string;
}

const ProductCard = ({
  image,
  title,
  price,
  originalPrice,
  discount,
  rating,
  freeDelivery,
  saleBadge,
}: ProductCardProps) => {
  return (
    <div className="group relative">
      {/* Image Container */}
      <a href="#" className="block relative aspect-square rounded-xl overflow-hidden bg-secondary">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Favorite Button */}
        <button className="favorite-button">
          <Heart className="h-4 w-4" />
        </button>

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3 price-badge">
          <span className="text-price">USD {price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-price-original ml-1.5 text-xs">
              USD {originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </a>

      {/* Product Info */}
      <div className="mt-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-medium text-foreground truncate">
            {title}
          </h3>
          {rating && (
            <div className="flex items-center gap-0.5 text-sm shrink-0">
              <span>{rating}</span>
              <span className="text-foreground">★</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 mt-1">
          {discount && (
            <span className="sale-badge">{discount}</span>
          )}
          {saleBadge && (
            <span className="text-xs text-muted-foreground">{saleBadge}</span>
          )}
        </div>
        
        {freeDelivery && (
          <p className="text-xs text-muted-foreground mt-1">Free delivery</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;