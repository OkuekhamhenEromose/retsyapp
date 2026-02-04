import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ValentinesFiltersProps {
  filters: {
    price: string;
    on_sale: boolean;
    etsy_picks: boolean;
    sort: string;
  };
  onFilterChange: (filters: any) => void;
  filterOptions: {
    price_options: Array<{ value: string; label: string }>;
    sort_options: Array<{ value: string; label: string }>;
    shipping_options: Array<{ value: string; label: string }>;
  };
}

const ValentinesFilters = ({ filters, onFilterChange, filterOptions }: ValentinesFiltersProps) => {
  const countries = [
    { code: "", label: "Anywhere" },
    { code: "AU", label: "Australia" },
    { code: "CA", label: "Canada" },
    { code: "FR", label: "France" },
    { code: "DE", label: "Germany" },
    { code: "UK", label: "United Kingdom" },
    { code: "US", label: "United States" },
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {/* Price Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-800 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
            Price ($)
            <ChevronDown className="h-4 w-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4 bg-white" align="start">
          <RadioGroup 
            value={filters.price} 
            onValueChange={(value) => onFilterChange({ price: value })}
          >
            {filterOptions.price_options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2 py-1.5">
                <RadioGroupItem value={option.value} id={`price-${option.value}`} />
                <Label htmlFor={`price-${option.value}`} className="font-normal cursor-pointer text-gray-900">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </PopoverContent>
      </Popover>

      {/* On Sale Filter */}
      <button
        onClick={() => onFilterChange({ on_sale: !filters.on_sale })}
        className={`inline-flex items-center gap-2 px-4 py-2.5 border rounded-full text-sm font-medium transition-colors ${
          filters.on_sale 
            ? "bg-gray-900 text-white border-gray-900" 
            : "border-gray-800 hover:bg-gray-100"
        }`}
      >
        On sale
      </button>

      {/* Etsy's Picks Filter */}
      <button
        onClick={() => onFilterChange({ etsy_picks: !filters.etsy_picks })}
        className={`inline-flex items-center gap-2 px-4 py-2.5 border rounded-full text-sm font-medium transition-colors ${
          filters.etsy_picks 
            ? "bg-gray-900 text-white border-gray-900" 
            : "border-gray-800 hover:bg-gray-100"
        }`}
      >
        Etsy's Picks
      </button>

      {/* Sort Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-800 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
            Sort
            <ChevronDown className="h-4 w-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-0 bg-white" align="start">
          <div className="p-2">
            {filterOptions.sort_options.map((option) => (
              <button
                key={option.value}
                onClick={() => onFilterChange({ sort: option.value })}
                className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 transition-colors ${
                  filters.sort === option.value ? "bg-gray-100" : ""
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Sent From Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-800 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
            Sent from
            <ChevronDown className="h-4 w-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-0 bg-white" align="start">
          <ScrollArea className="h-48">
            <div className="p-2">
              {countries.map((country) => (
                <button
                  key={country.code}
                  className="w-full text-left px-3 py-2 text-sm text-gray-900 rounded hover:bg-gray-100 transition-colors"
                >
                  {country.code && (
                    <span className="text-xs text-gray-500 mr-2">{country.code}</span>
                  )}
                  {country.label}
                </button>
              ))}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ValentinesFilters;