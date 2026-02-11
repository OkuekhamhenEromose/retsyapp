// components/fashion/FashionPromoCards.tsx
import { ArrowRight } from "lucide-react";
import { FashionPromoCard } from "@/services/api";
import Image from "next/image";

interface FashionPromoCardsProps {
  cards: FashionPromoCard[];
}

const FashionPromoCards = ({ cards }: FashionPromoCardsProps) => {
  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card) => (
          <a 
            key={card.id}
            href={card.button_url}
            className="group flex items-center bg-white border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="w-1/3 aspect-square">
              {card.image ? (
                <Image
                  src={card.image}
                  alt={card.title}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>
            <div className="flex-1 p-6">
              <h3 className="text-xl font-serif mb-2">{card.title}</h3>
              {card.subtitle && (
                <p className="text-sm text-muted-foreground mb-2">{card.subtitle}</p>
              )}
              <span className="inline-flex items-center gap-1 text-sm font-semibold group-hover:underline">
                {card.button_text} <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default FashionPromoCards;