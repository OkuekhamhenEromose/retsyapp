'use client'

import React from 'react';
import Image from 'next/image';

interface HeroBannerProps {
  bannerData?: {
    message: string;
    image: string | null;
    search_placeholder?: string;
  };
}

const HeroBanner: React.FC<HeroBannerProps> = ({ bannerData }) => {
  const message = bannerData?.message || "Make this your best Valentine's Day yet";

  return (
    <section className="container mx-auto px-4 py-6 md:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Hero - Valentine's Day */}
        <div className="lg:col-span-2 flex flex-col md:flex-row rounded-2xl overflow-hidden bg-gradient-to-r from-[#fff5f7] to-[#fff0f5] min-h-[400px]">
          {/* Text Content */}
          <div className="flex-1 flex flex-col justify-center px-6 md:px-10 lg:px-12 py-8 md:py-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-gray-900 leading-tight mb-6">
              {message}
            </h1>
            <button className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-full transition-colors w-fit text-sm md:text-base">
              Shop our must-haves
            </button>
          </div>
          
          {/* Image - Right side */}
          <div className="hidden md:block w-full md:w-[40%] lg:w-[45%] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fff5f7]/30 to-[#fff5f7]" />
            <div className="relative w-full h-full">
              {/* Placeholder image - Replace with actual image from backend */}
              <div className="w-full h-full bg-gradient-to-br from-pink-200 to-rose-300" />
              {/* You would use next/image here when you have the actual image */}
              {/* <Image
                src={bannerData?.image || "/placeholder-valentines.jpg"}
                alt="Valentine's Day gifts and decorations"
                fill
                className="object-cover"
                priority
              /> */}
            </div>
          </div>
        </div>

        {/* Secondary Hero - Kids Valentine's */}
        <div className="relative rounded-2xl overflow-hidden min-h-[300px] lg:min-h-0 group cursor-pointer">
          {/* Image Container */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
          <div className="relative w-full h-full">
            <div className="w-full h-full bg-gradient-to-br from-rose-400 to-pink-500" />
            {/* You would use next/image here when you have the actual image */}
            {/* <Image
              src="/placeholder-kids-valentines.jpg"
              alt="Valentine's Day for kids"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority
            /> */}
          </div>
          
          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <h2 className="text-xl lg:text-2xl font-serif font-medium text-white leading-snug mb-3">
              How to plan a Valentine's Day for kids
            </h2>
            <button className="text-white text-sm font-medium hover:underline w-fit">
              Shop now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;