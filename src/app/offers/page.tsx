'use client'

import React from 'react';

// ─────────────────────────────────────────────────────────────
// Product data — exact titles, prices, ratings from screenshot 3
// ─────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    title: 'Custom Comfort Colors Vintage Bootleg Pet Shirt Pet Photo +...',
    stars: 4.5, reviews: '69,983',
    price: '8.00', original: '19.99', discount: '60% off',
    badge: 'FAST SHIPPING', freeDelivery: false,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=320&h=320&fit=crop',
    extraBadge: 'UNLIMITED PROOFS',
  },
  {
    id: 2,
    title: 'Personalized Photo Flipbook Animation Box, Custom wooden...',
    stars: 4.5, reviews: '1,386',
    price: '25.41', original: '61.97', discount: '59% off',
    badge: null, freeDelivery: true,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=320&h=320&fit=crop',
    extraBadge: null,
  },
  {
    id: 3,
    title: 'Engraved Bridesmaids Gifts Pocket Makeup Mirror, Elegant...',
    stars: 4.5, reviews: '5,302',
    price: '1.62', original: '6.49', discount: '75% off',
    badge: null, freeDelivery: false,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=320&h=320&fit=crop',
    extraBadge: null,
  },
  {
    id: 4,
    title: 'Custom Embroidered Baby Name Sweater: Personalized Knit...',
    stars: 5.0, reviews: '6,076',
    price: '12.99', original: '19.98', discount: '35% off',
    badge: null, freeDelivery: false,
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=320&h=320&fit=crop',
    extraBadge: null,
  },
  {
    id: 5,
    title: "Personalized Men's Leather Toiletry Bag, Dopp Kit,...",
    stars: 5.0, reviews: '9,506',
    price: '7.20', original: '12.00', discount: '40% off',
    badge: null, freeDelivery: false,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=320&h=320&fit=crop',
    extraBadge: null,
  },
];

// ─────────────────────────────────────────────────────────────
// StarRating — orange filled / half / empty stars
// ─────────────────────────────────────────────────────────────
const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <span className="flex items-center gap-[1px]">
    {[1, 2, 3, 4, 5].map((s) => {
      const full = s <= Math.floor(rating);
      const half = !full && s === Math.ceil(rating) && rating % 1 !== 0;
      return (
        <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill="none">
          {half ? (
            <>
              <defs>
                <linearGradient id={`hg${s}${rating}`}>
                  <stop offset="50%" stopColor="#F1641E" />
                  <stop offset="50%" stopColor="#e5e7eb" />
                </linearGradient>
              </defs>
              <polygon
                points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                fill={`url(#hg${s}${rating})`}
                stroke="#F1641E" strokeWidth="0.5"
              />
            </>
          ) : (
            <polygon
              points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
              fill={full ? '#F1641E' : '#e5e7eb'}
              stroke={full ? '#F1641E' : '#e5e7eb'}
              strokeWidth="0.5"
            />
          )}
        </svg>
      );
    })}
  </span>
);

// ─────────────────────────────────────────────────────────────
// CouponIcon — dark diagonal rotated ticket with % circle
// Hand-matched to screenshots 1 & 2 exactly
// ─────────────────────────────────────────────────────────────
const CouponIcon: React.FC = () => (
  <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
    <g transform="rotate(-38, 48, 48)">
      {/* Main ticket body */}
      <rect x="8" y="26" width="80" height="44" rx="4" fill="#1c1c1c" />
      {/* Left notch */}
      <circle cx="8" cy="48" r="9" fill="white" />
      {/* Right notch */}
      <circle cx="88" cy="48" r="9" fill="white" />
      {/* Perforation dashes */}
      <line x1="24" y1="31" x2="24" y2="65"
        stroke="#3a3a3a" strokeWidth="1.5" strokeDasharray="3 2.5" />
      {/* % circle background */}
      <circle cx="53" cy="48" r="15" fill="#2d2d2d" />
      {/* % symbol */}
      <text
        x="53" y="54"
        textAnchor="middle"
        fill="white"
        fontSize="16"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        %
      </text>
    </g>
  </svg>
);

// ─────────────────────────────────────────────────────────────
// ProductCard
// ─────────────────────────────────────────────────────────────
interface ProductItem {
  id: number;
  title: string;
  stars: number;
  reviews: string;
  price: string;
  original: string;
  discount: string;
  badge: string | null;
  freeDelivery: boolean;
  image: string;
  extraBadge: string | null;
}

const ProductCard: React.FC<{ product: ProductItem }> = ({ product }) => (
  <div className="flex flex-col cursor-pointer group">
    {/* Square product image */}
    <div className="relative w-full aspect-square overflow-hidden bg-gray-100 mb-2">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        loading="lazy"
      />
      {/* Play / video icon — white circle, bottom-right */}
      <div className="absolute bottom-2 right-2 w-7 h-7 bg-white/85 rounded-full flex items-center justify-center shadow-sm">
        <svg width="9" height="10" viewBox="0 0 9 10" fill="none">
          <polygon points="1,1 9,5 1,9" fill="#111" />
        </svg>
      </div>
      {/* FAST SHIPPING rounded badge top-right */}
      {product.badge && (
        <div
          className="absolute top-2 right-2 flex flex-col items-center justify-center text-center leading-tight text-white font-bold rounded-full"
          style={{
            backgroundColor: '#c4711a',
            fontSize: 9,
            width: 52,
            height: 52,
            padding: 4,
          }}
        >
          <span>FAST</span>
          <span>SHIPPING</span>
        </div>
      )}
      {/* UNLIMITED PROOFS badge bottom-left */}
      {product.extraBadge && (
        <div
          className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-white/90 rounded text-center leading-tight font-semibold text-gray-700"
          style={{ fontSize: 8 }}
        >
          {product.extraBadge}
        </div>
      )}
    </div>

    {/* Text block */}
    <div className="flex flex-col gap-[3px]">
      <p className="text-[13px] text-gray-800 leading-snug line-clamp-2 min-h-[34px]">
        {product.title}
      </p>
      <div className="flex items-center gap-1 mt-0.5">
        <StarRating rating={product.stars} />
        <span className="text-[12px] text-gray-500">({product.reviews})</span>
      </div>
      <div className="flex flex-wrap items-baseline gap-x-1 gap-y-0.5">
        <span className="text-[14px] font-semibold text-gray-900">
          USD {product.price}
        </span>
        <span className="text-[12px] text-gray-400 line-through">
          USD {product.original}
        </span>
        <span className="text-[12px] text-gray-600">({product.discount})</span>
      </div>
      {product.freeDelivery && (
        <span
          className="inline-block self-start px-2 py-0.5 rounded-sm font-bold text-green-800 bg-green-100 mt-0.5"
          style={{ fontSize: 11 }}
        >
          FREE delivery
        </span>
      )}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// SpecialOffersPage — main export
// ─────────────────────────────────────────────────────────────
export default function SpecialOffersPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ════════════════════════════════════════════════════
          SECTION 1 — Hero banner (peach #fde8d2)
          Left: large Georgia serif heading, body copy, link.
          Right: the clap.png illustration from the upload.
          NOTE: place clap.png in your /public folder.
      ════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#fde8d2', width: '100%' }}>
        <div
          className="mx-auto px-8 sm:px-14 py-12 sm:py-14 flex items-center justify-between gap-6"
          style={{ maxWidth: 1280 }}
        >
          {/* Left text */}
          <div style={{ flex: 1, maxWidth: 580 }}>
            <h1
              className="text-gray-900 leading-[1.08] mb-5"
              style={{
                fontFamily: "Georgia,'Times New Roman',serif",
                fontWeight: 400,
                fontSize: 'clamp(38px, 4vw, 52px)',
              }}
            >
              Special offers created just for you
            </h1>
            <p
              className="text-gray-800 leading-[1.65] mb-3"
              style={{ fontSize: 15, maxWidth: 520 }}
            >
              Etsy sellers crafted these offers for shoppers like you. Whether you're
              a new customer or a longtime fan, they're grateful for your support!
              Terms may apply, contact the seller for terms and conditions.
            </p>
            <a
              href="#details"
              className="text-gray-900 hover:text-[#F1641E] transition-colors"
              style={{ fontSize: 15, textDecoration: 'underline', textUnderlineOffset: 3 }}
            >
              Get more details.
            </a>
          </div>

          {/* Right: clap illustration */}
          {/*
            Copy the downloaded clap.png to your Next.js /public directory.
            The file is available in the outputs alongside this component.
          */}
          <div
            className="hidden sm:block shrink-0"
            style={{ width: 320, height: 280 }}
          >
            <img
              src="/clap.png"
              alt="Two people celebrating with a high-five"
              style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom' }}
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 2 — Empty / no active offers state
          White bg, centred.
          Top: rotated dark ticket icon with % circle.
          Mid: large serif "Looks like you don't have any active offers"
          Sub: paragraph about when offers will appear.
          CTA: near-black "Start shopping" rounded-full pill.
      ════════════════════════════════════════════════════ */}
      <section className="w-full bg-white py-16 sm:py-20">
        <div className="text-center" style={{ maxWidth: 580, margin: '0 auto', padding: '0 24px' }}>

          {/* Coupon icon */}
          <div className="flex justify-center mb-5">
            <CouponIcon />
          </div>

          {/* Heading */}
          <h2
            className="text-gray-900 leading-tight mb-5"
            style={{
              fontFamily: "Georgia,'Times New Roman',serif",
              fontWeight: 400,
              fontSize: 'clamp(28px, 3.2vw, 36px)',
            }}
          >
            Looks like you don't have any active offers
          </h2>

          {/* Sub-text */}
          <p
            className="text-gray-600 leading-relaxed mb-9 mx-auto"
            style={{ fontSize: 16, maxWidth: 440 }}
          >
            Sometimes sellers will send a discount directly to new
            or returning customers. When they do, you'll find the offer here!
          </p>

          {/* CTA */}
          <button
            className="inline-flex items-center justify-center font-semibold text-white rounded-full transition-all hover:opacity-90 active:scale-[0.98]"
            style={{
              backgroundColor: '#1a1a1a',
              fontSize: 16,
              padding: '14px 40px',
              minWidth: 200,
            }}
            onClick={() => { window.location.href = '/'; }}
          >
            Start shopping
          </button>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 3 — "Popular gifts right now"
          White bg, bold sans heading left-aligned.
          5 equal-width product cards in a responsive grid.
          Each card matches screenshot 3 precisely:
          square image + badges + play icon + stars + pricing.
      ════════════════════════════════════════════════════ */}
      <section className="w-full bg-white pb-16" style={{ paddingTop: 4 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>

          <h3
            className="font-bold text-gray-900 mb-5"
            style={{ fontSize: 'clamp(20px, 2vw, 26px)' }}
          >
            Popular gifts right now
          </h3>

          <div
            className="grid gap-4 sm:gap-5"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            }}
          >
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}