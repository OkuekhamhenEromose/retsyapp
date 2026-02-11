// components/fashion/FashionProductSection.tsx
import { useState } from "react";
import { SlidersHorizontal, Check } from "lucide-react";
import FashionProductCard from "./FashionProductCard";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Product } from "@/services/api";

interface FashionProductSectionProps {
  title: string;
  products: Product[];
  filters?: {
    price_options: Array<{ value: string; label: string }>;
  };
}

const FashionProductSection = ({ 
  title, 
  products, 
  filters = { price_options: [] }
}: FashionProductSectionProps) => {
  const [selectedPrice, setSelectedPrice] = useState("any");
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [itemType, setItemType] = useState("all");
  const [acceptsGiftCards, setAcceptsGiftCards] = useState(false);
  const [canBeWrapped, setCanBeWrapped] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [customLowPrice, setCustomLowPrice] = useState("");
  const [customHighPrice, setCustomHighPrice] = useState("");

  const visibleProducts = showAll ? products : products.slice(0, 8);

  const handleCustomPriceApply = () => {
    if (customLowPrice && customHighPrice) {
      console.log(`Applying custom price filter: ${customLowPrice} to ${customHighPrice}`);
      // In a real app, this would trigger a new API call with the price range
    }
  };

  const getFilteredProducts = () => {
    let filtered = [...products];

    if (freeDelivery) {
      filtered = filtered.filter(product => product.freeDelivery);
    }

    if (onSale) {
      filtered = filtered.filter(product => product.discount_price);
    }

    if (selectedPrice !== "any") {
      switch (selectedPrice) {
        case "under25":
          filtered = filtered.filter(product => product.final_price < 25);
          break;
        case "25to50":
          filtered = filtered.filter(product => product.final_price >= 25 && product.final_price <= 50);
          break;
        case "50to100":
          filtered = filtered.filter(product => product.final_price >= 50 && product.final_price <= 100);
          break;
        case "over100":
          filtered = filtered.filter(product => product.final_price > 100);
          break;
      }
    }

    return filtered;
  };

  const displayProducts = getFilteredProducts();
  const displayVisibleProducts = showAll ? displayProducts : displayProducts.slice(0, 8);

  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-serif text-center mb-8">{title}</h2>

      <div className="mb-6">
        <Sheet>
          <SheetTrigger asChild>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-foreground rounded-full text-sm font-medium hover:bg-secondary transition-colors">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="sr-only">Filters</SheetTitle>
            </SheetHeader>
            <div className="space-y-6 py-4">
              <div>
                <h3 className="font-semibold text-sm mb-3">Special offers</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`fd-${title}`} 
                      checked={freeDelivery} 
                      onCheckedChange={(c) => setFreeDelivery(c as boolean)} 
                    />
                    <Label htmlFor={`fd-${title}`} className="font-normal cursor-pointer">
                      FREE delivery
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`sale-${title}`} 
                      checked={onSale} 
                      onCheckedChange={(c) => setOnSale(c as boolean)} 
                    />
                    <Label htmlFor={`sale-${title}`} className="font-normal cursor-pointer">
                      On sale
                    </Label>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-3">Item type</h3>
                <RadioGroup value={itemType} onValueChange={setItemType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id={`all-${title}`} />
                    <Label htmlFor={`all-${title}`} className="font-normal cursor-pointer">
                      All items
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="vintage" id={`vintage-${title}`} />
                    <Label htmlFor={`vintage-${title}`} className="font-normal cursor-pointer">
                      Vintage
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-3">Price ($)</h3>
                <RadioGroup value={selectedPrice} onValueChange={setSelectedPrice}>
                  {filters.price_options.map((opt) => (
                    <div key={opt.value} className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value={opt.value} 
                        id={`price-${opt.value}-${title}`} 
                      />
                      <Label 
                        htmlFor={`price-${opt.value}-${title}`} 
                        className="font-normal cursor-pointer"
                      >
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {selectedPrice === "custom" && (
                  <div className="flex items-center gap-2 mt-3">
                    <Input 
                      placeholder="Low" 
                      className="w-20" 
                      value={customLowPrice}
                      onChange={(e) => setCustomLowPrice(e.target.value)}
                      type="number"
                    />
                    <span className="text-sm text-muted-foreground">to</span>
                    <Input 
                      placeholder="High" 
                      className="w-20" 
                      value={customHighPrice}
                      onChange={(e) => setCustomHighPrice(e.target.value)}
                      type="number"
                    />
                    <button 
                      onClick={handleCustomPriceApply}
                      className="p-2 bg-foreground text-background rounded-full hover:bg-secondary transition-colors"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-3">Ordering options</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`gc-${title}`} 
                      checked={acceptsGiftCards} 
                      onCheckedChange={(c) => setAcceptsGiftCards(c as boolean)} 
                    />
                    <Label htmlFor={`gc-${title}`} className="font-normal cursor-pointer">
                      Accepts Etsy gift cards
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`gw-${title}`} 
                      checked={canBeWrapped} 
                      onCheckedChange={(c) => setCanBeWrapped(c as boolean)} 
                    />
                    <Label htmlFor={`gw-${title}`} className="font-normal cursor-pointer">
                      Can be gift-wrapped
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {displayVisibleProducts.map((product) => (
          <FashionProductCard 
            key={product.id} 
            product={product}
          />
        ))}
      </div>

      {displayProducts.length > 8 && !showAll && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll(true)}
            className="px-8 py-3 border border-foreground rounded-full text-sm font-medium hover:bg-secondary transition-colors"
          >
            Show more
          </button>
        </div>
      )}
    </section>
  );
};

export default FashionProductSection;