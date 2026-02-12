'use client';

import { 
  Heart, Egg, Moon, Star, Cake, Gift, 
  Mail, Flower, SmilePlus, CircleDot, ChevronRight,
  LucideIcon 
} from "lucide-react";
import { useState } from "react";
import { GiftOccasion } from "@/services/api";

// Map icon names to Lucide components
const iconMap: Record<string, LucideIcon> = {
  Heart, Egg, Moon, Star, Cake, Gift, 
  Mail, Flower, SmilePlus, CircleDot
};

interface GiftFinderHeroProps {
  occasions: GiftOccasion[];
}

const GiftFinderHero = ({ occasions }: GiftFinderHeroProps) => {
  const [selected, setSelected] = useState(0);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-serif mb-3 text-gray-900">
          Extra-special gifting made extra-easy
        </h1>
        <p className="text-lg md:text-xl font-bold text-gray-700 mb-10">
          Discover perfect picks for the occasion!
        </p>

        <div className="flex items-center justify-center gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {occasions.map((occasion, index) => {
            const Icon = iconMap[occasion.icon] || Gift;
            return (
              <button
                key={occasion.id}
                onClick={() => setSelected(index)}
                className={`flex flex-col items-center gap-2 min-w-[80px] group transition-opacity ${
                  selected === index ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selected === index 
                    ? 'border-gray-900 bg-gray-100' 
                    : 'border-gray-300'
                }`}>
                  <Icon className="h-7 w-7 text-gray-900" />
                </div>
                <span className="text-xs font-medium text-gray-900 whitespace-nowrap">
                  {occasion.label}
                </span>
                {occasion.date && (
                  <span className="text-xs text-gray-500">{occasion.date}</span>
                )}
                {selected === index && (
                  <div className="w-8 h-0.5 bg-gray-900 rounded-full" />
                )}
              </button>
            );
          })}
          <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center shrink-0 hover:bg-gray-100 transition-colors">
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default GiftFinderHero;