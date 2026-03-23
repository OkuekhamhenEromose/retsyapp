"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./ProductDetailPage.module.css";
import { useCart } from "@/context/CartContext";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface ProductVariant {
  id: number;
  color: string;
  color_code?: string;
  design?: string;
  image: string;
  in_stock: number;
  price_adjustment: number;
  final_price: number;
  is_default: boolean;
  display_order: number;
}

interface StarRatingBreakdown {
  five_star_count: number;
  four_star_count: number;
  three_star_count: number;
  two_star_count: number;
  one_star_count: number;
  quality_mentions: number;
  appearance_mentions: number;
  seller_service_mentions: number;
  description_accuracy_mentions: number;
  ai_highlights: string[];
}

interface Review {
  id: number;
  rating: number;
  title?: string;
  comment: string;
  username: string;
  created: string;
  helpful_count: number;
}

// ── options is REQUIRED (always provide it, even as [] for textarea fields) ──
interface PersonalizationOption {
  id: number;
  field_name: string;
  field_type: string;
  is_required: boolean;
  placeholder: string;
  help_text: string;
  options: string[];           // <── always include this, even when empty
  display_order: number;
}

interface DeliveryPolicy {
  estimated_delivery_min: number;
  estimated_delivery_max: number;
  delivery_cost: number;
  dispatches_from: string;
  returns_accepted: boolean;
  return_period_days: number;
  has_purchase_protection: boolean;
}

interface SimilarProduct {
  id: number;
  t?: string;
  title?: string;
  s?: string;
  slug?: string;
  p?: number;
  price?: number;
  f?: number;
  final_price?: number;
  dp?: number;
  discount_percentage?: number;
  i?: string;
  main?: string;
  r?: number;
  rating?: number;
  rc?: number;
  review_count?: number;
}

interface RelatedSearch {
  name: string;
  slug: string;
  type: string;
  image?: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface Product {
  id: number;
  title: string;
  slug: string;
  short_description?: string;
  description: string;
  price: number;
  discount_price?: number | null;
  discount_percentage: number;
  final_price: number;
  main: string;
  photo1?: string;
  photo2?: string;
  photo3?: string;
  photo4?: string;
  rating: number;
  review_count: number;
  in_stock: number;
  is_deal: boolean;
  is_featured: boolean;
  condition: string;
  color?: string;
  material?: string;
  category?: { title: string; slug: string };
  brand?: string;
  seller_name?: string;
  etsy_pick?: boolean;
  basket_display?: string;
  sale_ends_in?: { hours: number; minutes: number; seconds: number };
  variants?: ProductVariant[];
  rating_breakdown?: StarRatingBreakdown;
  reviews?: Review[];
  personalization_options?: PersonalizationOption[];
  delivery_policy?: DeliveryPolicy;
  similar_items?: SimilarProduct[];
  related_searches?: RelatedSearch[];
  breadcrumb?: BreadcrumbItem[];
}

// ─── Seed data (all PersonalizationOption objects include `options`) ────────────
const MOCK_PRODUCT: Product = {
  id: 1,
  title: "Custom Embroidered Pet Photo Dad Hat - Personalized Dog and Cat Baseball Cap",
  slug: "custom-embroidered-pet-photo-dad-hat",
  short_description: "Custom embroidered pet hat personalized with your dog or cat face",
  description: "Turn your beloved pet into wearable art with our custom embroidered dad hat!",
  price: 65.98,
  discount_price: 23.09,
  discount_percentage: 65,
  final_price: 23.09,
  main:   "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop",
  photo1: "https://images.unsplash.com/photo-1546961342-ea5f70a193fc?w=800&h=800&fit=crop",
  photo2: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop",
  photo3: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=800&fit=crop",
  photo4: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=800&fit=crop",
  rating: 4.7,
  review_count: 1200,
  in_stock: 15,
  is_deal: true,
  is_featured: true,
  condition: "handmade",
  color: "Light Blue",
  material: "Cotton, Cotton Twill",
  category: { title: "Accessories", slug: "accessories" },
  brand: "ModPawsUS",
  seller_name: "ModPawsUS",
  etsy_pick: true,
  basket_display: "In 20+ baskets",
  sale_ends_in: { hours: 8, minutes: 4, seconds: 7 },
  variants: [
    { id: 1, color: "Light Blue", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=200&h=200&fit=crop", in_stock: 10, price_adjustment: 0, final_price: 23.09, is_default: true,  display_order: 0 },
    { id: 2, color: "Dark Grey",  image: "https://images.unsplash.com/photo-1546961342-ea5f70a193fc?w=200&h=200&fit=crop", in_stock: 5,  price_adjustment: 0, final_price: 23.09, is_default: false, display_order: 1 },
    { id: 3, color: "Green",      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=200&fit=crop", in_stock: 8,  price_adjustment: 2, final_price: 25.09, is_default: false, display_order: 2 },
    { id: 4, color: "Tan",        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop", in_stock: 3,  price_adjustment: 0, final_price: 23.09, is_default: false, display_order: 3 },
  ],
  rating_breakdown: {
    five_star_count: 856, four_star_count: 212, three_star_count: 78,
    two_star_count: 34,   one_star_count: 20,
    quality_mentions: 373, appearance_mentions: 308,
    seller_service_mentions: 275, description_accuracy_mentions: 209,
    ai_highlights: ["Love it","Great product","Gift-worthy","Great quality","Cute","Would recommend","Looks great"],
  },
  reviews: [
    { id: 1, rating: 5, comment: "Dad hat was good quality. Gift was a big hit.", username: "Erin", created: "2026-03-15", helpful_count: 12 },
    { id: 2, rating: 5, comment: "They sent me a proof that wasn't super accurate to the reference photos. I sent an edited version and it came out great! Great quality and turned out super cute!", username: "Victoria", created: "2026-03-14", helpful_count: 8 },
    { id: 3, rating: 4, comment: "Beautiful hat, the embroidery is stunning. Ships fast from USA. Would definitely recommend for pet lovers!", username: "Sarah M.", created: "2026-03-10", helpful_count: 5 },
  ],
  personalization_options: [
    // ── select: options array is populated ───────────────────────────────────
    {
      id: 1,
      field_name: "Number of Pets",
      field_type: "select",
      is_required: true,
      placeholder: "Select",
      help_text: "",
      options: ["1 Pet", "2 Pets", "3 Pets"],   // ← required, populated
      display_order: 0,
    },
    // ── textarea: options array is empty [] – NOT omitted ────────────────────
    {
      id: 2,
      field_name: "Personalization",
      field_type: "textarea",
      is_required: true,
      placeholder: "Enter your pets names...",
      help_text: "After purchase please send us your pets photo by email at submit@shopmodpaws.com with your Etsy Order Number.",
      options: [],              // ← required, but empty for textarea
      display_order: 1,
    },
  ],
  delivery_policy: {
    estimated_delivery_min: 6, estimated_delivery_max: 22,
    delivery_cost: 9.99, dispatches_from: "United States",
    returns_accepted: true, return_period_days: 14, has_purchase_protection: true,
  },
  similar_items: [
    { id: 101, t: "Custom Embroidered Pet Hat",      p: 19.99, f: 7.00,  dp: 65, i: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop", r: 4.8, rc: 892 },
    { id: 102, t: "Custom EMBROIDERED Pet Hat",      p: 36.00, f: 14.40, dp: 60, i: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop", r: 4.9, rc: 2341 },
    { id: 103, t: "Custom Embroidered Pet Cap",      p: 30.15, f: 12.06, dp: 60, i: "https://images.unsplash.com/photo-1546961342-ea5f70a193fc?w=400&h=400&fit=crop", r: 4.7, rc: 445 },
    { id: 104, t: "Custom Dog Hat Blue",             p: 6.00,  f: 6.00,  dp: 0,  i: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop", r: 4.6, rc: 123 },
    { id: 105, t: "Custom Embroidered Dog Hat",      p: 30.15, f: 12.06, dp: 60, i: "https://images.unsplash.com/photo-1546961342-ea5f70a193fc?w=400&h=400&fit=crop", r: 4.9, rc: 3211 },
    { id: 106, t: "Custom EMBROIDERED Dog Cap",      p: 21.50, f: 9.03,  dp: 58, i: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop", r: 5.0, rc: 560 },
    { id: 107, t: "Custom Pet Baseball Cap",         p: 36.00, f: 14.40, dp: 60, i: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop", r: 4.8, rc: 1899 },
    { id: 108, t: "Custom Embroidered Dog Hoodie",   p: 38.00, f: 13.30, dp: 65, i: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop", r: 4.7, rc: 334 },
  ],
  related_searches: [
    { name: "Pet Embroidery Hat",   slug: "pet-embroidery-hat",   type: "keyword", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop" },
    { name: "Custom Pet Hat",       slug: "custom-pet-hat",       type: "keyword", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100&h=100&fit=crop" },
    { name: "Custom Dog Hat",       slug: "custom-dog-hat",       type: "keyword", image: "https://images.unsplash.com/photo-1546961342-ea5f70a193fc?w=100&h=100&fit=crop" },
    { name: "Dog Hat",              slug: "dog-hat",              type: "keyword", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=100&h=100&fit=crop" },
    { name: "Pet Hat",              slug: "pet-hat",              type: "keyword", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop" },
    { name: "Pet Hats",             slug: "pet-hats",             type: "keyword", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100&h=100&fit=crop" },
    { name: "Modpawsus",            slug: "modpawsus",            type: "seller",  image: "https://images.unsplash.com/photo-1546961342-ea5f70a193fc?w=100&h=100&fit=crop" },
    { name: "Modpaws",              slug: "modpaws",              type: "seller",  image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=100&h=100&fit=crop" },
    { name: "Mod Paws",             slug: "mod-paws",             type: "keyword", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop" },
    { name: "Embroidered Pet Hat",  slug: "embroidered-pet-hat",  type: "keyword", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100&h=100&fit=crop" },
    { name: "Embroidered Dog Hat",  slug: "embroidered-dog-hat",  type: "keyword", image: "https://images.unsplash.com/photo-1546961342-ea5f70a193fc?w=100&h=100&fit=crop" },
  ],
  breadcrumb: [
    { name: "Homepage",             url: "/" },
    { name: "Accessories",          url: "/accessories" },
    { name: "Hats & Head Coverings",url: "/c/hats-head-coverings" },
    { name: "Hats & Caps",          url: "/c/hats-caps" },
  ],
};

const MORE_RELATED_SEARCHES = [
  "Pet on Hat","Pet Personalized Gifts","Personalized Dog Stuff","Personalized Dog Hat",
  "Mod Paws Hat","Embroidered Hat","Gift From Pet to Adult","Dog Gifts for Dog Moms",
  "Gifts With Custom Dog Image","Personalized Pet Hat Portrait Patch",
  "Custom Dog Outline Gift","Custom Embroidered Dog Trucker Hat",
];

const YOU_MAY_ALSO_LIKE = [
  { id: 201, title: "Custom Embroidered Pet Ha...", price: 54.00, sale_price: 29.70, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop", is_ad: false },
  { id: 202, title: "Custom Pet Portrait Hat Pe...",  price: 54.00, sale_price: 39.96, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop", is_ad: false },
  { id: 203, title: "Custom Pet Photo Trucker Ha...", price: 35.59, sale_price: 26.69, image: "https://images.unsplash.com/photo-1546961342-ea5f70a193fc?w=400&h=400&fit=crop", is_ad: true  },
  { id: 204, title: "Custom Embroidered Pet Ha...", price:  9.87, sale_price:  5.92, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop", is_ad: false },
  { id: 205, title: "Custom Embroidered Pet Ha...", price: 40.99, sale_price: 26.64, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop", is_ad: false },
  { id: 206, title: "Custom Embroidered Pet Ha...", price: 10.90, sale_price:  3.71, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop", is_ad: false },
  { id: 207, title: "Custom Embroidered Pet Ha...", price: 21.00, sale_price: 10.29, image: "https://images.unsplash.com/photo-1546961342-ea5f70a193fc?w=400&h=400&fit=crop", is_ad: true  },
  { id: 208, title: "Custom Embroidered Pet Ha...", price: 54.00, sale_price: 29.70, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop", is_ad: true  },
  { id: 209, title: "Personalized Dog Cat Bas...",   price: 30.80, sale_price: 10.78, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop", is_ad: true  },
  { id: 210, title: "Custom Embroidered Pet Ph...",  price: 19.99, sale_price:  6.00, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop", is_ad: true  },
  { id: 211, title: "Custom Embroidered Pet Ha...", price: 40.99, sale_price: 39.96, image: "https://images.unsplash.com/photo-1546961342-ea5f70a193fc?w=400&h=400&fit=crop", is_ad: true  },
  { id: 212, title: "Personalized Pet Photo Hat ...",price: 23.30, sale_price:  9.32, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop", is_ad: true  },
];

const RELATED_TRENDS = [
  { name: "Personalised Style Finds", sub: "Pet Paradise",           images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop","https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop"] },
  { name: "Preppy Pet Finds",         sub: "Personalised Home Finds", images: ["https://images.unsplash.com/photo-1546961342-ea5f70a193fc?w=300&h=300&fit=crop","https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&h=300&fit=crop"] },
  { name: "Gift Ideas for Dad",       sub: "Embroidered Accents",     images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop","https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop"] },
];

// Deterministic avatar colours – no runtime inline style needed
const AVATAR_COLORS = ["bg-sky-400","bg-emerald-400","bg-violet-400","bg-amber-400","bg-rose-400","bg-teal-400"];
function avatarColor(index: number) { return AVATAR_COLORS[index % AVATAR_COLORS.length]; }

// ─── Helpers ───────────────────────────────────────────────────────────────────
function fmtCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toLocaleString();
}

// ─── StarRating ───────────────────────────────────────────────────────────────
function StarRating({ rating, count, size = 13 }: { rating: number; count?: number; size?: number }) {
  const full  = Math.floor(rating);
  const half  = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f${i}`} width={size} height={size} viewBox="0 0 24 24" fill="#F1641E">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      {half && (
        <svg width={size} height={size} viewBox="0 0 24 24">
          <defs>
            <linearGradient id="halfGrad">
              <stop offset="50%" stopColor="#F1641E" />
              <stop offset="50%" stopColor="#ddd" />
            </linearGradient>
          </defs>
          <path fill="url(#halfGrad)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`e${i}`} width={size} height={size} viewBox="0 0 24 24" fill="#ddd">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      {count !== undefined && count > 0 && (
        <span className="text-xs text-gray-500 ml-1">({fmtCount(count)})</span>
      )}
    </span>
  );
}

// ─── 1. Trust Banner ──────────────────────────────────────────────────────────
const TRUST_CONFIG = [
  {
    key: "protection",
    label: "Etsy Purchase Protection",
    title: "Etsy Purchase Protection",
    body: "If something goes wrong with your order, you'll get a full refund.\n\nHere's what's eligible:\n• Your order doesn't match the item description or photos\n• Your item arrived damaged\n• Your item arrived after the estimated arrival window\n• Your item didn't arrive or was lost in the mail",
    link: "View programme terms",
  },
  {
    key: "payment",
    label: "Secure payment options",
    title: "Secure payment options",
    body: "Etsy keeps your payment information secure.\n\nEtsy shops never receive your credit card information.",
    link: null,
  },
  {
    key: "reviews",
    label: "Verified reviews",
    title: "Verified reviews",
    body: "All reviews are from verified buyers – real people who actually bought the item they're talking about.",
    link: null,
  },
] as const;

function TrustIcon({ k }: { k: string }) {
  if (k === "protection")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2557a7" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  if (k === "payment")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2557a7" strokeWidth="2">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    );
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#F1641E">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function TrustBanner() {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  return (
    <div className="bg-gray-50 border-y border-gray-200 py-2.5 relative z-20">
      <div className="max-w-screen-xl mx-auto px-5 flex items-center justify-center gap-10 flex-wrap">
        {TRUST_CONFIG.map((item) => (
          <div
            key={item.key}
            className="relative"
            onMouseEnter={() => setActiveKey(item.key)}
            onMouseLeave={() => setActiveKey(null)}
          >
            <button className="flex items-center gap-2 bg-transparent border-0 cursor-pointer text-sm font-semibold text-gray-800 py-1 p-0">
              <TrustIcon k={item.key} />
              <span className="underline">{item.label}</span>
            </button>

            {activeKey === item.key && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl p-5 w-72 z-50">
                <p className="font-bold text-sm mb-2 text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">{item.body}</p>
                {item.link && (
                  <a href="#" className="text-xs text-blue-700 underline block mt-2">{item.link}</a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center flex-wrap gap-1.5 text-sm text-gray-500">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <a href={item.url} className="hover:underline">{item.name}</a>
          {i < items.length - 1 && <span className="text-gray-300">›</span>}
        </span>
      ))}
    </nav>
  );
}

// ─── 2. Similar Items ─────────────────────────────────────────────────────────
function SimilarItems({ items }: { items: SimilarProduct[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 300 : -300, behavior: "smooth" });
  };

  return (
    <section className="py-8 border-t border-gray-200">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-gray-900">
          Similar items <span className="font-normal text-sm text-gray-400">Including ads</span>
        </h2>
        <a href="#" className="text-sm font-semibold text-gray-800 no-underline hover:underline">See more</a>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll similar items left"
          className="absolute -left-4 top-1/3 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div ref={scrollRef} className={`flex gap-3 overflow-x-auto pb-2 ${styles.hideScrollbar}`}>
          {items.map((item) => {
            const title     = item.t  ?? item.title         ?? "";
            const price     = item.f  ?? item.final_price   ?? 0;
            const origPrice = item.p  ?? item.price         ?? 0;
            const discount  = item.dp ?? item.discount_percentage ?? 0;
            const image     = item.i  ?? item.main          ?? "";
            const rating    = item.r  ?? item.rating        ?? 0;
            const reviews   = item.rc ?? item.review_count  ?? 0;

            return (
              <div
                key={item.id}
                className="flex-shrink-0 w-44 cursor-pointer"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative rounded-lg overflow-hidden aspect-square bg-gray-100">
                  <img
                    src={image}
                    alt={title}
                    className={`w-full h-full object-cover transition-transform duration-300 ${hoveredId === item.id ? "scale-105" : "scale-100"}`}
                  />
                  {hoveredId === item.id && (
                    <div className="absolute inset-0 flex items-end justify-center pb-2 bg-black/5">
                      <span className="bg-white border border-gray-900 rounded-full px-3 py-1 text-xs font-semibold">
                        Add to basket
                      </span>
                    </div>
                  )}
                </div>
                <div className="pt-2">
                  <p className="text-xs text-gray-700 truncate">{title}</p>
                  <StarRating rating={rating} count={reviews} size={11} />
                  <div className="flex items-baseline gap-1.5 mt-1 flex-wrap">
                    <span className="text-sm font-bold text-[#F1641E]">USD {price.toFixed(2)}</span>
                    {discount > 0 && (
                      <span className="text-xs text-gray-400 line-through">USD {origPrice.toFixed(2)}</span>
                    )}
                  </div>
                  {discount > 0 && <span className="text-xs text-gray-500">({discount}% off)</span>}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => scroll("right")}
          aria-label="Scroll similar items right"
          className="absolute -right-4 top-1/3 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
}

// ─── 3. Image Gallery ─────────────────────────────────────────────────────────
function ImageGallery({ product }: { product: Product }) {
  const images = [product.main, product.photo1, product.photo2, product.photo3, product.photo4]
    .filter((x): x is string => Boolean(x));
  const [activeIdx, setActiveIdx] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  const prev = () => setActiveIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIdx((i) => (i + 1)                 % images.length);

  return (
    <div className="flex gap-3">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2 w-16 flex-shrink-0">
        {images.slice(0, 7).map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            aria-label={`View image ${i + 1}`}
            className={`w-16 h-16 rounded-md overflow-hidden border-2 cursor-pointer p-0 bg-transparent transition-colors ${activeIdx === i ? "border-gray-900" : "border-transparent"}`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1 relative rounded-xl overflow-hidden aspect-square bg-gray-100">
        <img src={images[activeIdx]} alt={product.title} className="w-full h-full object-cover" />

        {product.etsy_pick && (
          <div className="absolute top-3 left-3 bg-[#F1641E] text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Etsy Pick
          </div>
        )}

        <button
          onClick={() => setWishlisted((v) => !v)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 border-0 flex items-center justify-center cursor-pointer shadow-md hover:scale-110 transition-transform"
        >
          <svg
            width="18" height="18" viewBox="0 0 24 24"
            fill={wishlisted ? "#e05260" : "none"}
            stroke={wishlisted ? "#e05260" : "#555"}
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {images.length > 1 && (
          <>
            <button onClick={prev} aria-label="Previous image" className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border-0 flex items-center justify-center cursor-pointer shadow-md">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button onClick={next} aria-label="Next image" className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border-0 flex items-center justify-center cursor-pointer shadow-md">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Sale Timer ───────────────────────────────────────────────────────────────
function SaleTimer({ initial }: { initial: { hours: number; minutes: number; seconds: number } }) {
  const [time, setTime] = useState(initial);

  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => {
        if (t.seconds > 0) return { ...t, seconds: t.seconds - 1 };
        if (t.minutes > 0) return { ...t, minutes: t.minutes - 1, seconds: 59 };
        if (t.hours   > 0) return { hours: t.hours - 1, minutes: 59, seconds: 59 };
        return t;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="text-sm text-gray-500">
      Sale ends in{" "}
      <strong className="text-gray-900">
        {String(time.hours).padStart(2, "0")}:
        {String(time.minutes).padStart(2, "0")}:
        {String(time.seconds).padStart(2, "0")}
      </strong>
    </span>
  );
}

// ─── Product Panel ────────────────────────────────────────────────────────────
function ProductPanel({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.find((v) => v.is_default) ?? null
  );
  const [quantity, setQuantity]             = useState("1");
  const [personalValues, setPersonalValues] = useState<Record<string, string>>({});
  const [addedToCart, setAddedToCart]       = useState(false);
  const [addError, setAddError]             = useState<string | null>(null);
  const [isAdding, setIsAdding]             = useState(false);
  const [detailsOpen, setDetailsOpen]       = useState(true);

  const currentPrice = selectedVariant ? selectedVariant.final_price : product.final_price;

  const handleAddToCart = useCallback(async () => {
    if (isAdding) return;
    setIsAdding(true);
    setAddError(null);

    const personalizations = Object.entries(personalValues)
      .filter(([, v]) => v.trim() !== '')
      .map(([field_name, value]) => ({ field_name, value }));

    const { success, error } = await addToCart({
      product_id:          product.id,
      product_name:        product.title,
      product_slug:        product.slug,
      product_image:       selectedVariant?.image ?? product.main,
      price_per_unit:      currentPrice,
      original_price:      product.price !== currentPrice ? product.price : null,
      discount_percentage: product.discount_percentage,
      quantity:            parseInt(quantity, 10) || 1,
      variant_id:          selectedVariant?.id ?? null,
      variant_color:       selectedVariant?.color ?? '',
      variant_design:      selectedVariant?.design ?? '',
      variant_color_code:  selectedVariant?.color_code ?? '',
      seller_id:           0,
      seller_name:         product.seller_name ?? product.brand ?? 'Shop',
      seller_rating:       product.rating ?? 0,
      seller_review_count: product.review_count ?? 0,
      personalizations,
    });

    setIsAdding(false);
    if (success) {
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    } else {
      setAddError(error ?? 'Failed to add to basket');
    }
  }, [isAdding, personalValues, product, currentPrice, quantity, selectedVariant, addToCart]);

  const deliveryMin = new Date();
  deliveryMin.setDate(deliveryMin.getDate() + (product.delivery_policy?.estimated_delivery_min ?? 6));
  const deliveryMax = new Date();
  deliveryMax.setDate(deliveryMax.getDate() + (product.delivery_policy?.estimated_delivery_max ?? 22));
  const fmtDate = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const caretIcon = (
    <svg
      width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      className="pointer-events-none flex-shrink-0"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Basket count */}
      {product.basket_display && (
        <p className="text-sm text-gray-600 font-medium">{product.basket_display}</p>
      )}

      {/* Price */}
      <div>
        <div className="flex items-baseline gap-2.5 flex-wrap">
          <span className="text-2xl font-extrabold text-gray-900">Now USD {currentPrice.toFixed(2)}</span>
          <span className="text-lg text-gray-400 line-through">USD {product.price.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-3 mt-1 flex-wrap">
          <span className="text-sm font-bold text-[#F1641E]">{product.discount_percentage}% off</span>
          {product.sale_ends_in && <SaleTimer initial={product.sale_ends_in} />}
        </div>
        <p className="text-xs text-gray-400 mt-1">Local taxes included (where applicable)</p>
      </div>

      {/* Title */}
      <h1 className="text-lg font-semibold text-gray-900 leading-snug">{product.title}</h1>

      {/* Seller + rating */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-semibold text-gray-800">{product.seller_name ?? product.brand}</span>
        <StarRating rating={product.rating} count={product.review_count} />
      </div>

      {/* Returns */}
      <div className="flex items-center gap-2">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span className="text-sm text-green-700 font-medium">Returns accepted</span>
      </div>

      {/* Variant selector */}
      {product.variants && product.variants.length > 0 && (
        <div>
          <p className="text-sm font-bold text-gray-900 mb-2">
            Color/Hat Type: <span className="font-normal">{selectedVariant?.color ?? "Select"}</span>
          </p>
          <div className="flex gap-2 flex-wrap">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariant(v)}
                title={v.color}
                className={`w-11 h-11 rounded-lg overflow-hidden border-2 cursor-pointer p-0 bg-transparent transition-colors ${selectedVariant?.id === v.id ? "border-gray-900" : "border-gray-200 hover:border-gray-400"}`}
              >
                <img src={v.image} alt={v.color} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Personalization options */}
      {product.personalization_options?.map((opt) => {
        const fieldId = `personalization-${opt.id}`;
        return (
        <div key={opt.id}>
          <label htmlFor={fieldId} className="block text-sm font-bold text-gray-900 mb-2">
            {opt.field_name}
            {opt.is_required && <span className="text-red-500 ml-0.5">*</span>}
          </label>

          {opt.field_type === "select" ? (
            /* ── dropdown ─────────────────────────────────────── */
            <div className="relative">
              <select
                id={fieldId}
                value={personalValues[opt.field_name] ?? (opt.options[0] ?? "")}
                onChange={(e) =>
                  setPersonalValues((prev) => ({ ...prev, [opt.field_name]: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white appearance-none cursor-pointer pr-10 focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                {opt.options.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">{caretIcon}</span>
            </div>
          ) : (
            /* ── textarea ─────────────────────────────────────── */
            <div>
              <textarea
                id={fieldId}
                placeholder={opt.placeholder}
                maxLength={25}
                value={personalValues[opt.field_name] ?? ""}
                onChange={(e) =>
                  setPersonalValues((prev) => ({ ...prev, [opt.field_name]: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm resize-y min-h-20 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <p className="text-xs text-gray-400 text-right">
                {(personalValues[opt.field_name] ?? "").length}/25
              </p>
              {opt.help_text && <p className="text-xs text-gray-500 mt-1">{opt.help_text}</p>}
            </div>
          )}
        </div>
        );
      })}

      {/* Quantity */}
      <div>
        <label htmlFor="quantity-select" className="block text-sm font-bold text-gray-900 mb-2">Quantity</label>
        <div className="relative inline-block">
          <select
            id="quantity-select"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white appearance-none cursor-pointer pr-10 min-w-28 focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">{caretIcon}</span>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <button className="w-full py-3.5 rounded-full border-2 border-gray-900 bg-white text-gray-900 text-sm font-bold cursor-pointer hover:bg-gray-50 transition-colors">
          Buy it now
        </button>
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-3.5 rounded-full border-0 text-white text-sm font-bold cursor-pointer transition-all ${
            addedToCart
              ? 'bg-green-700'
              : isAdding
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gray-900 hover:bg-gray-700'
          }`}
        >
          {addedToCart ? '✓ Added to basket!' : isAdding ? 'Adding…' : 'Add to basket'}
        </button>
        {addError && (
          <p className="text-[12px] text-red-600 text-center -mt-1">{addError}</p>
        )}
        {addedToCart && (
          <a
            href="/basket"
            className="block w-full py-2.5 rounded-full border-2 border-[#F1641E] text-[#F1641E] text-sm font-bold text-center hover:bg-orange-50 transition-colors"
          >
            View basket →
          </a>
        )}
        <button className="w-full py-3 rounded-full border border-gray-200 bg-white text-gray-500 text-sm cursor-pointer flex items-center justify-center gap-2 hover:border-gray-400 transition-colors">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#e05260">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          Add to collection
        </button>
      </div>

      {/* Delivery & returns */}
      <div className="border-t border-gray-100 pt-4">
        <button
          onClick={() => setDetailsOpen((v) => !v)}
          className="w-full flex items-center justify-between text-sm font-bold text-gray-900 cursor-pointer bg-transparent border-0 p-0 mb-3"
        >
          Delivery and return policies
          <svg
            width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="#555" strokeWidth="2"
            className={`transition-transform ${detailsOpen ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {detailsOpen && (
          <div className="flex flex-col gap-2.5 text-sm text-gray-600">
            <div className="flex items-center gap-2.5">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" className="flex-shrink-0"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span>Order today to get by <strong className="underline cursor-pointer">{fmtDate(deliveryMin)}–{fmtDate(deliveryMax)}</strong></span>
            </div>
            <div className="flex items-center gap-2.5">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" className="flex-shrink-0"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
              <span><a href="#" className="underline">Returns accepted</a> within {product.delivery_policy?.return_period_days ?? 14} days</span>
            </div>
            <div className="flex items-center gap-2.5">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" className="flex-shrink-0"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              <span>Delivery cost: <strong>USD {(product.delivery_policy?.delivery_cost ?? 9.99).toFixed(2)}</strong></span>
            </div>
            <div className="flex items-center gap-2.5">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" className="flex-shrink-0"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              <span>Dispatched from: <strong>{product.delivery_policy?.dispatches_from ?? "United States"}</strong></span>
            </div>
          </div>
        )}
      </div>

      {/* Report */}
      <button className="text-xs text-gray-400 bg-transparent border-0 cursor-pointer flex items-center gap-1.5 p-0 hover:text-gray-600 transition-colors self-start">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
          <line x1="4" y1="22" x2="4" y2="15"/>
        </svg>
        Report this item to Etsy
      </button>
    </div>
  );
}

// ─── 4. Related Searches (image grid) ─────────────────────────────────────────
function RelatedSearchesSection({ searches }: { searches: RelatedSearch[] }) {
  return (
    <section className="py-8 border-t border-gray-200">
      <h2 className="text-lg font-bold text-gray-900 mb-5">Related searches</h2>
      <div className="grid grid-cols-3 gap-3 md:grid-cols-2 sm:grid-cols-1">
        {searches.slice(0, 9).map((s, i) => (
          <a
            key={i}
            href={`/search?q=${s.slug}`}
            className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 no-underline text-gray-900 hover:shadow-md transition-shadow"
          >
            {s.image && (
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
              </div>
            )}
            <span className="text-sm font-medium leading-snug">{s.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

// ─── 5. Reviews ───────────────────────────────────────────────────────────────
const REVIEW_FILTERS = ["Quality","Appearance","Seller service","Description accuracy"] as const;
type ReviewFilter = (typeof REVIEW_FILTERS)[number];

function getCategoryCount(breakdown: StarRatingBreakdown, f: ReviewFilter): number {
  if (f === "Quality")              return breakdown.quality_mentions;
  if (f === "Appearance")           return breakdown.appearance_mentions;
  if (f === "Seller service")       return breakdown.seller_service_mentions;
  return breakdown.description_accuracy_mentions;
}

function ReviewsSection({ product }: { product: Product }) {
  const breakdown = product.rating_breakdown;
  const reviews   = product.reviews ?? [];

  return (
    <section className="py-8 border-t border-gray-200">
      <h2 className="text-lg font-bold text-gray-900 mb-5">
        Reviews for this item ({fmtCount(product.review_count)})
      </h2>

      {/* Metric circles */}
      <div className="flex items-center gap-6 mb-6 flex-wrap">
        <div className="flex items-baseline gap-1">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#F1641E">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-4xl font-extrabold text-gray-900">{product.rating}</span>
          <span className="text-lg text-gray-400">/5</span>
        </div>
        <p className="text-xs text-gray-400 underline self-end mb-1">item average</p>

        <div className="flex gap-4 flex-wrap">
          {(
            [
              { l: "Item quality",    v: "4.8" },
              { l: "Delivery",        v: "4.6" },
              { l: "Customer service",v: "4.7" },
              { l: "Buyers recommend",v: "92%" },
            ] as const
          ).map((m) => (
            <div key={m.l} className="flex flex-col items-center gap-1.5">
              <div className="w-14 h-14 rounded-full border-[3px] border-[#F1641E] flex items-center justify-center text-sm font-bold text-gray-900">
                {m.v}
              </div>
              <p className="text-xs text-gray-500 text-center max-w-16 leading-tight">{m.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI highlights */}
      {breakdown?.ai_highlights && breakdown.ai_highlights.length > 0 && (
        <div className="mb-5">
          <p className="text-xs text-gray-500 mb-2.5 flex items-center gap-1.5">
            <span>✦</span>
            <strong>Buyer highlights, summarised by AI</strong>
          </p>
          <div className="flex flex-wrap gap-2">
            {breakdown.ai_highlights.map((h, i) => (
              <span key={i} className="px-3.5 py-1.5 rounded-full border border-gray-200 text-xs text-gray-700 bg-gray-50">
                {h}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Filter chips */}
      <div className="flex gap-2.5 flex-wrap mb-5">
        {REVIEW_FILTERS.map((f) => (
          <button key={f} className="px-3.5 py-2 rounded-full border border-gray-200 text-xs text-gray-600 cursor-pointer bg-white hover:border-gray-400 transition-colors">
            {f}{breakdown ? ` (${getCategoryCount(breakdown, f)})` : ""}
          </button>
        ))}
        <span className="flex items-center gap-1 text-xs text-gray-500 ml-1">
          <select aria-label="Sort reviews" className="border-0 bg-transparent text-xs cursor-pointer focus:outline-none">
            <option>Suggested</option>
            <option>Most recent</option>
            <option>Most helpful</option>
          </select>
        </span>
      </div>

      {/* Review list */}
      <div className="flex flex-col gap-6">
        {reviews.map((review, idx) => (
          <div key={review.id} className="border-b border-gray-100 pb-5">
            <div className="flex items-center gap-2.5 mb-2 flex-wrap">
              <StarRating rating={review.rating} size={13} />
              <span className="text-xs px-2 py-0.5 rounded border border-gray-200 text-gray-500">This item</span>
              <div className="flex items-center gap-2">
                {/* Avatar: deterministic colour class, no inline style */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${avatarColor(idx)}`}>
                  {review.username[0]}
                </div>
                <span className="text-sm font-medium text-gray-700">{review.username}</span>
                <span className="text-xs text-gray-400">
                  {new Date(review.created).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── 6. You May Also Like ─────────────────────────────────────────────────────
function YouMayAlsoLike() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-8 border-t border-gray-200">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-gray-900">
          You may also like <span className="font-normal text-sm text-gray-400">Including ads</span>
        </h2>
        <a href="#" className="text-sm font-semibold text-gray-800 no-underline hover:underline">See more</a>
      </div>

      <div className="grid grid-cols-6 gap-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        {YOU_MAY_ALSO_LIKE.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer"
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative rounded-lg overflow-hidden aspect-square bg-gray-100">
              <img
                src={item.image}
                alt={item.title}
                className={`w-full h-full object-cover transition-transform duration-300 ${hoveredId === item.id ? "scale-105" : "scale-100"}`}
              />
              {hoveredId === item.id && (
                <div className="absolute inset-0 flex items-end justify-center pb-2 bg-black/5">
                  <span className="bg-white border border-gray-900 rounded-full px-3 py-1 text-xs font-semibold">
                    Add to basket
                  </span>
                </div>
              )}
            </div>
            <div className="pt-2">
              <p className="text-xs text-gray-700 truncate">{item.title}</p>
              {item.is_ad && <p className="text-xs text-gray-400">Ad by Etsy seller</p>}
              <div className="flex items-baseline gap-1.5 mt-1 flex-wrap">
                <span className="text-sm font-bold text-[#F1641E]">USD {item.sale_price.toFixed(2)}</span>
                <span className="text-xs text-gray-400 line-through">USD {item.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── 7. Explore Related Trends ────────────────────────────────────────────────
function ExploreRelatedTrends() {
  return (
    <section className="py-8 border-t border-gray-200">
      <h2 className="text-lg font-bold text-gray-900 mb-5 text-center">Explore related trends</h2>

      <div className="flex flex-col items-center gap-4">
        {/* Top row – 2 cards */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-3xl">
          {RELATED_TRENDS.slice(0, 2).map((trend, i) => (
            <a key={i} href="#" className="relative rounded-xl overflow-hidden no-underline block group">
              <div className="grid grid-cols-2">
                {trend.images.map((img, j) => (
                  <img key={j} src={img} alt="" className="w-full aspect-square object-cover block" />
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <p className="text-white font-bold text-sm">{trend.name}</p>
                <p className="text-white/75 text-xs">{trend.sub}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom row – 1 centred card */}
        <div className="w-full max-w-sm">
          <a href="#" className="relative rounded-xl overflow-hidden no-underline block group">
            <div className="grid grid-cols-2">
              {RELATED_TRENDS[2].images.map((img, j) => (
                <img key={j} src={img} alt="" className="w-full aspect-square object-cover block" />
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <p className="text-white font-bold text-sm">{RELATED_TRENDS[2].name}</p>
              <p className="text-white/75 text-xs">{RELATED_TRENDS[2].sub}</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── 8. Explore More Related Searches (pill tags) ─────────────────────────────
function ExploreMoreRelatedSearches() {
  return (
    <section className="py-8 border-t border-gray-200">
      <h2 className="text-lg font-bold text-gray-900 mb-5">Explore more related searches</h2>
      <div className="flex flex-wrap gap-2.5">
        {MORE_RELATED_SEARCHES.map((s, i) => (
          <a
            key={i}
            href={`/search?q=${encodeURIComponent(s)}`}
            className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-800 no-underline hover:border-gray-800 hover:bg-gray-50 transition-colors"
          >
            {s}
          </a>
        ))}
      </div>
    </section>
  );
}

// ─── Page root ────────────────────────────────────────────────────────────────
export default function ProductDetailPage({ slug }: { slug?: string }) {
  // In production swap MOCK_PRODUCT with a real API call keyed on `slug`.
  const product = MOCK_PRODUCT;

  // Suppress "unused variable" lint warning for slug in this mock setup.
  void slug;

  return (
    <div className="bg-white min-h-screen">
      {/* ── 1. Trust banner ────────────────────────────────── */}
      <TrustBanner />

      <div className="max-w-screen-xl mx-auto px-5 pb-16">
        {/* Breadcrumb */}
        {product.breadcrumb && (
          <div className="py-4">
            <Breadcrumb items={product.breadcrumb} />
          </div>
        )}

        {/* ── 2. Similar Items ───────────────────────────────── */}
        {(product.similar_items?.length ?? 0) > 0 && (
          <SimilarItems items={product.similar_items!} />
        )}

        {/* ── 3. Main product layout ─────────────────────────── */}
        <div className="mt-8 flex gap-10 flex-col lg:flex-row">
          <div className="flex-1 min-w-0">
            <ImageGallery product={product} />
          </div>
          <div className="w-full lg:w-[420px] lg:flex-shrink-0">
            <ProductPanel product={product} />
          </div>
        </div>

        {/* ── 4. Related Searches ────────────────────────────── */}
        {(product.related_searches?.length ?? 0) > 0 && (
          <RelatedSearchesSection searches={product.related_searches!} />
        )}

        {/* ── 5. Reviews ─────────────────────────────────────── */}
        <ReviewsSection product={product} />

        {/* ── 6. You May Also Like ───────────────────────────── */}
        <YouMayAlsoLike />

        {/* ── 7. Explore Related Trends ──────────────────────── */}
        <ExploreRelatedTrends />

        {/* ── 8. Explore More Related Searches ──────────────── */}
        <ExploreMoreRelatedSearches />

        {/* Listing metadata */}
        <div className="pt-6 border-t border-gray-100 mt-4 flex flex-col gap-3">
          <div className="flex items-center gap-5 flex-wrap">
            <span className="text-xs text-gray-400">Listed on 18 Mar, 2026</span>
            <a href="#" className="text-xs text-gray-600 underline">11227 favourites</a>
          </div>
          {product.breadcrumb && <Breadcrumb items={product.breadcrumb} />}
        </div>

        {/* Footer strip */}
        <div className="mt-12 bg-blue-600 rounded-2xl p-5 flex items-center justify-center gap-3">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <a href="#" className="text-white text-sm font-semibold underline">
            Etsy is powered by 100% renewable electricity.
          </a>
        </div>
      </div>
    </div>
  );
}