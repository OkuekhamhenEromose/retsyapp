import ValentinesProductCard from "./ValentinesProductCard";
import { Product } from '@/services/api';

interface ValentinesProductGridProps {
  products: Product[];
}

const ValentinesProductGrid = ({ products }: ValentinesProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No products found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
      {products.map((product) => (
        <ValentinesProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ValentinesProductGrid;