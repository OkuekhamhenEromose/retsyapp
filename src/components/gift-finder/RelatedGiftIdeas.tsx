'use client';

import Image from "next/image";
import Link from "next/link";
import { GiftPersona } from "@/services/api";

interface RelatedGiftIdeasProps {
  personas: GiftPersona[];
}

const RelatedGiftIdeas = ({ personas }: RelatedGiftIdeasProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-gray-900">
          Related gift ideas for: Jewellery
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {personas.map((persona) => (
            <Link 
              key={persona.id} 
              href={`/gift-ideas/${persona.slug}`} 
              className="group relative rounded-2xl overflow-hidden aspect-square"
            >
              <div className={`absolute inset-0 ${persona.bg_color || 'bg-purple-400'}`} />
              <div className="absolute top-4 left-4 z-10">
                <p className="text-white text-sm">The</p>
                <p className="text-white font-bold text-lg">{persona.name.replace("The ", "")}</p>
              </div>
              <div className="absolute bottom-0 right-0 w-3/4 h-3/4">
                {persona.image && (
                  <Image
                    src={persona.image}
                    alt={persona.name}
                    fill
                    className="object-cover rounded-tl-3xl"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <button className="px-8 py-4 border-2 border-gray-900 rounded-full text-base font-medium hover:bg-gray-100 transition-colors">
            Browse All
          </button>
        </div>
      </div>
    </section>
  );
};

export default RelatedGiftIdeas;