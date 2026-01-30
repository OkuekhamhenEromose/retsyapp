'use client'

import { SlidersHorizontal } from "lucide-react";
import GiftProductCard from "./GiftProductCard";
import { useEffect, useState } from "react";
import { apiService, Product, GiftGuideSection } from "@/services/api";

interface GiftProductSectionProps {
  sectionType: 'valentines_gifts' | 'bestselling_gifts' | 'personalized_presents';
  defaultTitle: string;
}

const GiftProductSection = ({ sectionType, defaultTitle }: GiftProductSectionProps) => {
  const [section, setSection] = useState<GiftGuideSection | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.getGiftsPageData();
        
        let sectionData;
        switch (sectionType) {
          case 'valentines_gifts':
            sectionData = data.valentines_gifts[0];
            break;
          case 'bestselling_gifts':
            sectionData = data.bestselling_gifts[0];
            break;
          case 'personalized_presents':
            sectionData = data.personalized_presents[0];
            break;
        }
        
        if (sectionData) {
          setSection(sectionData);
          
          // Use gift_products if available, otherwise use featured_products
          if (sectionData.gift_products && sectionData.gift_products.length > 0) {
            setProducts(sectionData.gift_products.map(gp => gp.product));
          } else if (sectionData.featured_products && sectionData.featured_products.length > 0) {
            setProducts(sectionData.featured_products);
          } else {
            // Fallback to API call for section-specific products
            const sectionResponse = await apiService.getGiftGuideSection(sectionType);
            setProducts(sectionResponse.products);
          }
        }
      } catch (error) {
        console.error(`Error fetching ${sectionType}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sectionType]);

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-10">
        <div className="text-center">Loading {defaultTitle}...</div>
      </section>
    );
  }

  const title = section?.title || defaultTitle;

  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-serif text-center mb-8">
        {title}
      </h2>
      
      {/* Filters Button */}
      <div className="mb-6">
        <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-foreground rounded-full text-sm font-medium hover:bg-secondary transition-colors">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product, index) => {
            const giftProduct = section?.gift_products?.[index];
            return (
              <GiftProductCard
                key={product.id}
                product={product}
                isEtsyPick={giftProduct?.etsy_pick || true}
                shopName={giftProduct?.shop_name ?? undefined}
                badgeText={giftProduct?.badge_text ?? undefined}
                showFreeDelivery={sectionType === 'valentines_gifts' && index === 3} // Example logic
              />
            );
          })
        ) : (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No products found for {title}
          </div>
        )}
      </div>
    </section>
  );
};

export default GiftProductSection;