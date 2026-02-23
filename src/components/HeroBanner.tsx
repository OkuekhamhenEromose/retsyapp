'use client'

import React from 'react';
import Image from 'next/image';

interface HeroBannerProps {
  bannerData?: {
    message: string;
    image: string | null;
    secondary_image?: string | null;
    search_placeholder?: string;
  };
}

const HeroBanner: React.FC<HeroBannerProps> = ({ bannerData }) => {
  const message = bannerData?.message || "Make this your best Valentine's Day yet";

  return (
    <section className="max-w-[1440px] mx-auto px-4 py-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* ── LEFT / MAIN HERO (2 cols) ─────────────────────── */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[360px] lg:min-h-[420px]">

          {/* Pink text panel */}
          <div
            className="flex flex-col justify-center px-10 py-10 md:py-14 lg:px-14"
            style={{
              backgroundColor: '#fde8ec',
              flex: '0 0 42%',
              minWidth: 0,
            }}
          >
            <h1
              className="text-[2rem] md:text-[2.4rem] lg:text-[2.7rem] leading-[1.2] text-gray-900 mb-8"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 400 }}
            >
              {message}
            </h1>
            <button
              className="bg-gray-900 hover:bg-gray-700 active:bg-black text-white font-semibold px-7 py-3 rounded-full transition-colors w-fit text-sm tracking-wide"
            >
              Shop our must-haves
            </button>
          </div>

          {/* Main product photo */}
          <div className="flex-1 relative overflow-hidden" style={{ minHeight: 260 }}>
            {bannerData?.image ? (
              <Image
                src={bannerData.image}
                alt="Valentine's Day gifts"
                fill
                className="object-cover"
                priority
              />
            ) : (
              /* Fallback: exact colour gradient mimicking the red/gift photo */
              <div
                className="w-full h-full"
                style={{
                  background:
                    'linear-gradient(135deg, #c0392b 0%, #922b21 30%, #7b241c 55%, #6e2c00 80%, #5d4037 100%)',
                }}
              >
                {/* Decorative "YOU & ME" card element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white rounded-lg shadow-xl p-6 text-center rotate-[-3deg]">
                    <p
                      className="text-gray-900 text-xl leading-tight"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      YOU
                      <br />
                      &amp;
                      <br />
                      ME
                    </p>
                    <div className="mt-1 text-red-500 text-2xl">♥</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT / SECONDARY CARD ────────────────────────── */}
        <div className="relative rounded-2xl overflow-hidden min-h-[300px] lg:min-h-0 group cursor-pointer">

          {/* Background image */}
          {bannerData?.secondary_image ? (
            <Image
              src={bannerData.secondary_image}
              alt="Valentine's Day for kids"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
          ) : (
            /* Fallback: colourful stamp / kids stationery look */
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(160deg, #f8f4f0 0%, #e8e0d8 30%, #c8bfb2 60%, #3d4a3e 100%)',
              }}
            >
              {/* Simulated stamp cards */}
              <div className="absolute inset-0 flex flex-wrap gap-3 p-6 items-start justify-center opacity-80">
                {[
                  { emoji: '🐱', bg: '#fde8ec' },
                  { emoji: '🐛', bg: '#e8f5e9' },
                  { emoji: '🦊', bg: '#fff3e0' },
                  { emoji: '🐻', bg: '#ede7f6' },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="w-28 h-36 rounded-md shadow-md flex items-center justify-center text-4xl border-4 border-white"
                    style={{ backgroundColor: card.bg, transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (i + 1)}deg)` }}
                  >
                    {card.emoji}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dark gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

          {/* Text overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <h2
              className="text-[1.35rem] lg:text-[1.5rem] font-medium text-white leading-snug mb-2"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              How to plan a Valentine&apos;s Day for kids
            </h2>
            <button className="text-white text-sm font-semibold hover:underline underline-offset-2 w-fit">
              Shop now
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroBanner;