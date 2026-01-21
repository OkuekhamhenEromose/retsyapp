'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/services/api';

interface FeaturedInterestsProps {
  interests?: Category[];
}

const FeaturedInterests: React.FC<FeaturedInterestsProps> = ({ interests = [] }) => {
  if (!interests.length) {
    return (
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Jump into featured interests</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-gray-200 rounded-xl mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Jump into featured interests</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {interests.map((interest) => (
          <Link 
            key={interest.id}
            href={`/category/${interest.slug}`}
            className="group block"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-xl mb-3 relative bg-gray-100">
              {interest.image ? (
                <Image
                  src={interest.image.startsWith('http') ? interest.image : `/api/proxy?url=${encodeURIComponent(interest.image)}`}
                  alt={interest.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-4xl">🎁</span>
                </div>
              )}
            </div>
            <div className="text-center">
              <h3 className="font-medium text-foreground mb-1">{interest.title}</h3>
              <p className="text-sm text-muted-foreground">
                {interest.products_count} {interest.products_count === 1 ? 'item' : 'items'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedInterests;