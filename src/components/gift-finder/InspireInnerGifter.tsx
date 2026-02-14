'use client';

import Image from "next/image";
import Link from "next/link";
import { GiftPersona } from "@/services/api";

interface InspireInnerGifterProps {
  guiltyPleasures: GiftPersona[];
  zodiacSigns: GiftPersona[];
}

const InspireInnerGifter = ({ guiltyPleasures, zodiacSigns }: InspireInnerGifterProps) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-gray-900">
          Inspire your inner gifter!
        </h2>

        {/* Guilty Pleasures */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">What's their guilty pleasure?</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {guiltyPleasures.map((persona) => (
              <Link 
                key={persona.id} 
                href={`/gift-ideas/${persona.slug}`} 
                className="group relative rounded-2xl overflow-hidden aspect-[4/5]"
              >
                <div className={`absolute inset-0 ${persona.bg_color || 'bg-gray-200'}`} />
                <div className="absolute top-4 left-4 z-10">
                  <p className="text-gray-900 text-sm font-bold">The</p>
                  <p className="text-gray-900 font-bold text-base">{persona.name}</p>
                </div>
                <div className="absolute bottom-0 right-0 w-3/4 h-3/4">
                  {persona.image && (
                    <Image
                      src={persona.image}
                      alt={persona.name}
                      fill
                      className="object-cover rounded-tl-[40px]"
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Star Signs */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">What's their sign?</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {zodiacSigns.map((sign) => (
              <Link 
                key={sign.id} 
                href={`/gift-ideas/${sign.slug}`} 
                className={`relative rounded-2xl overflow-hidden aspect-[4/5] ${sign.bg_color || 'bg-gray-200'}`}
              >
                <div className="absolute top-4 left-4 z-10">
                  <p className="text-gray-900 text-sm font-bold">The</p>
                  <p className="text-gray-900 font-bold text-base">{sign.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InspireInnerGifter;