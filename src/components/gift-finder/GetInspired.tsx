'use client';

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GiftPersona } from "@/services/api";

interface GetInspiredProps {
  personas: GiftPersona[];
}

const GetInspired = ({ personas }: GetInspiredProps) => {
  // Take only first 10 personas
  const displayPersonas = personas.slice(0, 10);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Get Inspired! Popular Gift Ideas
          </h2>
          <Link 
            href="/gift-ideas" 
            className="flex items-center gap-1 text-sm font-medium hover:underline text-gray-700"
          >
            Browse all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {displayPersonas.map((persona) => (
            <Link 
              key={persona.id} 
              href={`/gift-ideas/${persona.slug}`} 
              className="group relative rounded-2xl overflow-hidden aspect-[4/5]"
            >
              <div className={`absolute inset-0 ${persona.bg_color || 'bg-gray-200'}`} />
              <div className="absolute top-4 left-4 z-10">
                <p className="text-gray-900 text-sm font-medium">The</p>
                <p className="text-gray-900 font-bold text-base">{persona.name}</p>
              </div>
              <div className="absolute bottom-0 right-0 w-3/4 h-3/4">
                <div className={`absolute inset-0 ${persona.accent_color || 'bg-gray-400'} rounded-tl-[40px]`} />
                {persona.image && (
                  <Image
                    src={persona.image}
                    alt={persona.name}
                    fill
                    className="relative object-cover rounded-tl-[40px]"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetInspired;