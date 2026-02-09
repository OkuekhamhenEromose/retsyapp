'use client'

import { useState } from "react";
import { SlidersHorizontal, Check } from "lucide-react";
import HomeProductCard from "./HomePoductCard";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Product {
  image: any;
  title: string;
  rating: number;
  reviewCount: string;
  shopName: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  freeDelivery?: boolean;
}

interface HomeProductSectionProps {
  title: string;
  products: Product[];
}

const priceOptions = [
  { value: "any", label: "Any price" },
  { value: "under25", label: "Under USD 25" },
  { value: "25to50", label: "USD 25 to USD 50" },
  { value: "50to100", label: "USD 50 to USD 100" },
  { value: "over100", label: "Over USD 100" },
  { value: "custom", label: "Custom" },
];

const HomeProductSection = ({ title, products }: HomeProductSectionProps) => {
  const [selectedPrice, setSelectedPrice] = useState("any");
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [itemType, setItemType] = useState("all");
  const [acceptsGiftCards, setAcceptsGiftCards] = useState(false);
  const [canBeWrapped, setCanBeWrapped] = useState(false);
  const [customLowPrice, setCustomLowPrice] = useState("");
  const [customHighPrice, setCustomHighPrice] = useState("");

  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-serif text-center mb-8">
        {title}
      </h2>
      
      {/* Filters Button */}
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
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            
            <div className="space-y-6 py-4">
              {/* Special Offers */}
              <div>
                <h3 className="font-semibold text-sm mb-3">Special offers</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="freeDelivery" 
                      checked={freeDelivery}
                      onCheckedChange={(checked) => setFreeDelivery(checked as boolean)}
                    />
                    <Label htmlFor="freeDelivery" className="font-normal cursor-pointer">
                      FREE delivery
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="onSale" 
                      checked={onSale}
                      onCheckedChange={(checked) => setOnSale(checked as boolean)}
                    />
                    <Label htmlFor="onSale" className="font-normal cursor-pointer">
                      On sale
                    </Label>
                  </div>
                </div>
              </div>

              {/* Item Type */}
              <div>
                <h3 className="font-semibold text-sm mb-3">Item type</h3>
                <RadioGroup value={itemType} onValueChange={setItemType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all" className="font-normal cursor-pointer">
                      All items
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="vintage" id="vintage" />
                    <Label htmlFor="vintage" className="font-normal cursor-pointer">
                      Vintage
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Price */}
              <div>
                <h3 className="font-semibold text-sm mb-3">Price ($)</h3>
                <RadioGroup value={selectedPrice} onValueChange={setSelectedPrice}>
                  {priceOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`price-${option.value}`} />
                      <Label htmlFor={`price-${option.value}`} className="font-normal cursor-pointer">
                        {option.label}
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
                    />
                    <span className="text-sm text-muted-foreground">to</span>
                    <Input 
                      placeholder="High" 
                      className="w-20" 
                      value={customHighPrice}
                      onChange={(e) => setCustomHighPrice(e.target.value)}
                    />
                    <button className="p-2 bg-foreground text-background rounded-full">
                      <Check className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Ordering Options */}
              <div>
                <h3 className="font-semibold text-sm mb-3">Ordering options</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="giftCards" 
                      checked={acceptsGiftCards}
                      onCheckedChange={(checked) => setAcceptsGiftCards(checked as boolean)}
                    />
                    <Label htmlFor="giftCards" className="font-normal cursor-pointer">
                      Accepts Etsy gift cards
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="giftWrapped" 
                      checked={canBeWrapped}
                      onCheckedChange={(checked) => setCanBeWrapped(checked as boolean)}
                    />
                    <Label htmlFor="giftWrapped" className="font-normal cursor-pointer">
                      Can be gift-wrapped
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <HomeProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
};

export default HomeProductSection;