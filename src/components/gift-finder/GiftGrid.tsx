'use client';

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GiftGridItem } from "@/services/api";

interface GiftGridProps {
  giftItems: GiftGridItem[];
}

const GiftGrid = ({ giftItems }: GiftGridProps) => {
  return (
    <section className="container mx-auto px-4 pb-12">
      <div className="columns-2 md:columns-4 gap-4 space-y-4">
        {giftItems.map((item) => (
          <Link 
            key={item.id} 
            href={`/gift-finder/${item.slug}`} 
            className="block break-inside-avoid group"
          >
            <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className={item.size === "large" ? "aspect-[3/4]" : "aspect-square"}>
                <div className="relative w-full h-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900 text-center py-3 px-2">
                {item.title}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-10">
        <button className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-900 rounded-full text-base font-medium hover:bg-gray-100 transition-colors">
          More ideas for Valentine's Day
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};

export default GiftGrid;