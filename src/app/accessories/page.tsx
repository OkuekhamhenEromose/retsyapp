"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface SubCategory { id: number; name: string; slug: string; image_url: string; description: string; order: number }
interface AccessoryItem { id: number; title: string; slug: string; price_usd: number; original_price: number | null; discount_pct: number; image_url: string; shop_name: string; star_rating: number; review_count: number; is_star_seller: boolean; is_ad: boolean; has_free_delivery: boolean; is_on_sale: boolean; badge_label: string; shop_country: string }
type SortKey = "relevance" | "lowest_price" | "highest_price" | "top_reviews" | "most_recent";
interface SortOption { value: SortKey; label: string }

const SUBCATEGORIES: SubCategory[] = [
  { id: 1,  name: "Hair Accessories",    slug: "hair-accessories",    order: 1,  description: "Headbands, clips, scrunchies and more",       image_url: "https://images.unsplash.com/photo-1616598271627-421debb58794?w=400&h=400&fit=crop" },
  { id: 2,  name: "Patches & Appliques", slug: "patches-appliques",   order: 2,  description: "Iron-on and sew-on patches for clothes",      image_url: "https://images.unsplash.com/photo-1589810264340-0ce2b6b96a7e?w=400&h=400&fit=crop" },
  { id: 3,  name: "Scarves & Wraps",     slug: "scarves-wraps",       order: 3,  description: "Silk, wool and cotton scarves",               image_url: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=400&fit=crop" },
  { id: 4,  name: "Hats & Head Coverings",slug:"hats-head-coverings", order: 4,  description: "Beanies, caps, turbans and more",             image_url: "https://images.unsplash.com/photo-1533055640609-24b498dfd74c?w=400&h=400&fit=crop" },
  { id: 5,  name: "Pins & Clips",        slug: "pins-clips",          order: 5,  description: "Enamel pins, brooches and clips",             image_url: "https://images.unsplash.com/photo-1583394293214-0d8b4948f5d0?w=400&h=400&fit=crop" },
  { id: 6,  name: "Keychains & Lanyards",slug: "keychains-lanyards",  order: 6,  description: "Custom keyrings and badge holders",           image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop" },
  { id: 7,  name: "Belts & Braces",      slug: "belts-braces",        order: 7,  description: "Leather belts, suspenders and more",          image_url: "https://images.unsplash.com/photo-1624627314873-3fc96a1ec877?w=400&h=400&fit=crop" },
  { id: 8,  name: "Suit & Tie",          slug: "suit-tie",            order: 8,  description: "Ties, cufflinks, pocket squares",             image_url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop" },
  { id: 9,  name: "Sunglasses & Eyewear",slug: "sunglasses-eyewear",  order: 9,  description: "Fashion frames and reading glasses",          image_url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop" },
  { id: 10, name: "Bouquets & Corsages", slug: "bouquets-corsages",   order: 10, description: "Dried and fresh floral accessories",          image_url: "https://images.unsplash.com/photo-1490750967868-88df5691b71e?w=400&h=400&fit=crop" },
  { id: 11, name: "Costume Accessories", slug: "costume-accessories", order: 11, description: "Props, masks and dress-up extras",            image_url: "https://images.unsplash.com/photo-1605291286356-50a6fb5f2b7c?w=400&h=400&fit=crop" },
  { id: 12, name: "Aprons",              slug: "aprons",              order: 12, description: "Kitchen and craft aprons",                    image_url: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=400&fit=crop" },
];

const ALL_ITEMS: AccessoryItem[] = [
  { id: 1,  title: "Custom Embroidered Pet Photo Dad Hat",                           slug: "custom-pet-dad-hat",     price_usd: 8.00,  original_price: 19.99, discount_pct: 60, image_url: "https://images.unsplash.com/photo-1533055640609-24b498dfd74c?w=600&h=600&fit=crop",  shop_name: "ODPAWS",          star_rating: 5.0, review_count: 70299, is_star_seller: false, is_ad: true,  has_free_delivery: false, is_on_sale: true,  badge_label: "SHIPS FROM USA", shop_country: "United States" },
  { id: 2,  title: "Mens Personalized Embroidered Pocket Square",                   slug: "mens-pocket-square",     price_usd: 9.90,  original_price: 19.80, discount_pct: 50, image_url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=600&fit=crop",  shop_name: "PatchPerfect",    star_rating: 5.0, review_count: 74,    is_star_seller: true,  is_ad: true,  has_free_delivery: false, is_on_sale: true,  badge_label: "",               shop_country: "United States" },
  { id: 3,  title: "Personalised Photo Keyring | Custom Picture with Gift Box",     slug: "photo-keyring-gift",     price_usd: 6.83,  original_price: 9.11,  discount_pct: 25, image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",  shop_name: "KeyMemories",     star_rating: 5.0, review_count: 149,   is_star_seller: false, is_ad: true,  has_free_delivery: false, is_on_sale: true,  badge_label: "",               shop_country: "United Kingdom" },
  { id: 4,  title: "US 250th Anniversary Distressed Baseball Cap 1776–2026",        slug: "anniversary-cap",        price_usd: 15.79, original_price: 31.58, discount_pct: 50, image_url: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=600&fit=crop",  shop_name: "PatriotGear",     star_rating: 4.5, review_count: 5,     is_star_seller: false, is_ad: true,  has_free_delivery: false, is_on_sale: true,  badge_label: "",               shop_country: "United States" },
  { id: 5,  title: "Embroidered Sleeping Fox Umbrella — Woodland Art Piece",        slug: "fox-umbrella",           price_usd: 42.99, original_price: null,  discount_pct: 0,  image_url: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&h=600&fit=crop",  shop_name: "FoxWoodCraft",    star_rating: 4.5, review_count: 1074,  is_star_seller: true,  is_ad: true,  has_free_delivery: false, is_on_sale: false, badge_label: "",               shop_country: "Japan" },
  { id: 6,  title: "CUSTOM Embroidered Patch - Up To 11\" - Iron On or Sew On",    slug: "custom-patch",           price_usd: 1.98,  original_price: 4.40,  discount_pct: 55, image_url: "https://images.unsplash.com/photo-1589810264340-0ce2b6b96a7e?w=600&h=600&fit=crop",  shop_name: "EmbroideryKing",  star_rating: 5.0, review_count: 21401, is_star_seller: true,  is_ad: true,  has_free_delivery: false, is_on_sale: true,  badge_label: "",               shop_country: "United States" },
  { id: 7,  title: "Handmade Vintage Velvet Scrunchie Set — Jewel Tone Hair Ties",  slug: "velvet-scrunchie",       price_usd: 12.50, original_price: 20.00, discount_pct: 38, image_url: "https://images.unsplash.com/photo-1616598271627-421debb58794?w=600&h=600&fit=crop",  shop_name: "VelvetBloom",     star_rating: 4.8, review_count: 3412,  is_star_seller: true,  is_ad: false, has_free_delivery: true,  is_on_sale: true,  badge_label: "",               shop_country: "United Kingdom" },
  { id: 8,  title: "Full-Grain Leather Dress Belt — Handstitched Cognac & Tan",    slug: "leather-belt",           price_usd: 38.00, original_price: 55.00, discount_pct: 31, image_url: "https://images.unsplash.com/photo-1624627314873-3fc96a1ec877?w=600&h=600&fit=crop",  shop_name: "HideCraft",       star_rating: 4.8, review_count: 789,   is_star_seller: true,  is_ad: false, has_free_delivery: false, is_on_sale: true,  badge_label: "",               shop_country: "Italy" },
  { id: 9,  title: "Handmade Acetate Cat-Eye Sunglasses — UV400 Vintage Retro",    slug: "cat-eye-sunglasses",     price_usd: 28.50, original_price: 50.00, discount_pct: 43, image_url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=600&fit=crop",  shop_name: "FramedByHand",    star_rating: 4.7, review_count: 930,   is_star_seller: false, is_ad: false, has_free_delivery: false, is_on_sale: true,  badge_label: "",               shop_country: "Portugal" },
  { id: 10, title: "Dried Flower Wedding Wrist Corsage — Bohemian Bridal Floral",  slug: "dried-corsage",          price_usd: 22.00, original_price: 35.00, discount_pct: 37, image_url: "https://images.unsplash.com/photo-1490750967868-88df5691b71e?w=600&h=600&fit=crop",  shop_name: "PetalAtelier",    star_rating: 5.0, review_count: 612,   is_star_seller: true,  is_ad: false, has_free_delivery: true,  is_on_sale: true,  badge_label: "",               shop_country: "France" },
  { id: 11, title: "Custom Enamel Pin — Personalised Pet Portrait Hard Lapel Pin", slug: "enamel-pin",             price_usd: 11.00, original_price: 15.00, discount_pct: 27, image_url: "https://images.unsplash.com/photo-1583394293214-0d8b4948f5d0?w=600&h=600&fit=crop",  shop_name: "PinForge",        star_rating: 4.9, review_count: 2300,  is_star_seller: true,  is_ad: false, has_free_delivery: false, is_on_sale: true,  badge_label: "",               shop_country: "Canada" },
  { id: 12, title: "Personalized Wedding Tie — Custom Embroidered Initials Gift",  slug: "wedding-tie",            price_usd: 22.00, original_price: 35.00, discount_pct: 37, image_url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=600&fit=crop",  shop_name: "TheTieAtelier",   star_rating: 5.0, review_count: 450,   is_star_seller: true,  is_ad: false, has_free_delivery: false, is_on_sale: true,  badge_label: "",               shop_country: "France" },
  { id: 13, title: "100% Cashmere Plaid Wrap Scarf — Oversized Scottish Tartan",   slug: "cashmere-wrap",          price_usd: 34.00, original_price: 58.00, discount_pct: 41, image_url: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=600&h=600&fit=crop",  shop_name: "CashmereGlen",    star_rating: 4.9, review_count: 5670,  is_star_seller: true,  is_ad: false, has_free_delivery: true,  is_on_sale: true,  badge_label: "",               shop_country: "United Kingdom" },
  { id: 14, title: "Steampunk Masquerade Mask — Halloween Costume Accessory Set",  slug: "masquerade-mask",        price_usd: 18.99, original_price: 28.00, discount_pct: 32, image_url: "https://images.unsplash.com/photo-1605291286356-50a6fb5f2b7c?w=600&h=600&fit=crop",  shop_name: "MaskSmiths",      star_rating: 4.6, review_count: 887,   is_star_seller: false, is_ad: false, has_free_delivery: false, is_on_sale: true,  badge_label: "",               shop_country: "United States" },
  { id: 15, title: "Personalised Linen Chef Apron — Custom Embroidered Name Gift", slug: "linen-apron",            price_usd: 29.95, original_price: 45.00, discount_pct: 33, image_url: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=600&fit=crop",  shop_name: "KitchenStitch",   star_rating: 4.9, review_count: 1203,  is_star_seller: true,  is_ad: false, has_free_delivery: true,  is_on_sale: true,  badge_label: "",               shop_country: "Ireland" },
  { id: 16, title: "Handmade Rattan Claw Clip — Boho Natural Fibre Large Clamp",   slug: "rattan-claw-clip",       price_usd: 9.95,  original_price: 14.00, discount_pct: 29, image_url: "https://images.unsplash.com/photo-1627552527750-38c8218c9503?w=600&h=600&fit=crop",  shop_name: "BohoRoots",       star_rating: 4.9, review_count: 1850,  is_star_seller: true,  is_ad: false, has_free_delivery: false, is_on_sale: true,  badge_label: "",               shop_country: "France" },
];

const SORT_OPTIONS: SortOption[] = [
  { value: "relevance",     label: "Relevance" },
  { value: "lowest_price",  label: "Lowest Price" },
  { value: "highest_price", label: "Highest Price" },
  { value: "top_reviews",   label: "Top Customer Reviews" },
  { value: "most_recent",   label: "Most Recent" },
];
const ITEMS_PER_PAGE = 8;
const INITIAL_SHOW   = 6;

function sortItems(items: AccessoryItem[], sort: SortKey): AccessoryItem[] {
  const arr = [...items];
  switch (sort) {
    case "lowest_price":  return arr.sort((a, b) => a.price_usd - b.price_usd);
    case "highest_price": return arr.sort((a, b) => b.price_usd - a.price_usd);
    case "top_reviews":   return arr.sort((a, b) => b.star_rating !== a.star_rating ? b.star_rating - a.star_rating : b.review_count - a.review_count);
    case "most_recent":   return arr.sort((a, b) => b.id - a.id);
    default:              return arr.sort((a, b) => b.review_count - a.review_count);
  }
}
function fmtCount(n: number) { return n >= 1000 ? `${(n / 1000).toFixed(0)}k` : n.toLocaleString(); }

// ── Star Rating ───────────────────────────────────────────────────────────────
function StarRating({ rating, count }: { rating: number; count: number }) {
  const full  = Math.floor(rating);
  const half  = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex items-center gap-0.5 mt-1">
      {Array.from({ length: full  }).map((_, i) => <svg key={`f${i}`} width="12" height="12" viewBox="0 0 24 24" fill="#F1641E"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
      {half && <svg width="12" height="12" viewBox="0 0 24 24"><defs><linearGradient id="hg-acc"><stop offset="50%" stopColor="#F1641E"/><stop offset="50%" stopColor="#ddd"/></linearGradient></defs><path fill="url(#hg-acc)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>}
      {Array.from({ length: empty }).map((_, i) => <svg key={`e${i}`} width="12" height="12" viewBox="0 0 24 24" fill="#ddd"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
      <span className="text-xs text-gray-500 ml-0.5">({fmtCount(count)})</span>
    </div>
  );
}

// ── Sub-category card ─────────────────────────────────────────────────────────
function SubCategoryCard({ cat }: { cat: SubCategory }) {
  return (
    <a href={`/accessories/${cat.slug}`} aria-label={cat.name} className="block group text-inherit no-underline">
      <div className="aspect-square rounded-md overflow-hidden bg-gray-100 transition-transform duration-200 group-hover:scale-[1.03] group-hover:shadow-lg">
        <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <p className="mt-2.5 text-[13px] font-medium text-center leading-snug text-gray-800">{cat.name}</p>
    </a>
  );
}

// ── Sort Dropdown ─────────────────────────────────────────────────────────────
function SortDropdown({ sort, onChange }: { sort: SortKey; onChange: (s: SortKey) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const label = SORT_OPTIONS.find(o => o.value === sort)?.label ?? "Relevance";
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(v => !v)} className="flex items-center gap-1.5 px-4 py-2 rounded-full border-[1.5px] border-gray-800 bg-white text-sm font-semibold text-gray-800 cursor-pointer whitespace-nowrap">
        <span className="text-gray-500 font-normal">Sort by:</span> {label}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d={open ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}/></svg>
      </button>
      {open && (
        <div className="absolute right-0 top-[calc(100%+6px)] bg-white border border-gray-200 rounded-xl shadow-xl z-[100] min-w-[210px] overflow-hidden">
          {SORT_OPTIONS.map(opt => (
            <button key={opt.value} onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`flex items-center justify-between w-full px-4 py-[11px] border-none text-sm text-gray-800 text-left cursor-pointer ${opt.value === sort ? 'bg-orange-50' : 'bg-white hover:bg-gray-50'}`}>
              {opt.label}
              {opt.value === sort && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F1641E" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ item }: { item: AccessoryItem }) {
  const [wishlist, setWishlist] = useState(false);
  return (
    <article className="cursor-pointer" role="listitem">
      <div className="relative overflow-hidden rounded-[4px] bg-gray-100 aspect-square group/img">
        <img src={item.image_url} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-[1.01]" loading="lazy" />
        {item.badge_label && (
          <div className="absolute top-2 left-2 bg-white/90 rounded px-1.5 py-0.5 text-[10px] font-bold text-gray-700 tracking-wide backdrop-blur-sm">{item.badge_label}</div>
        )}
        <button onClick={e => { e.stopPropagation(); setWishlist(v => !v); }} aria-label={wishlist ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 border-none flex items-center justify-center cursor-pointer shadow-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlist ? "#F1641E" : "none"} stroke={wishlist ? "#F1641E" : "#555"} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div className="pt-2">
        <p className="text-[13px] text-gray-700 leading-snug line-clamp-2 mb-1 min-h-[36px]">{item.title}</p>
        <StarRating rating={item.star_rating} count={item.review_count} />
        {item.is_star_seller && (
          <div className="flex items-center gap-1 mt-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#7B5BF7"><circle cx="12" cy="12" r="10"/><path d="M12 2l2.09 6.26H20L15 12.14l1.91 5.86L12 14.77 7.09 18l1.91-5.86L4 8.26h5.91z" fill="#fff"/></svg>
            <span className="text-xs font-semibold text-purple-700">Star Seller</span>
          </div>
        )}
        <div className="flex items-baseline gap-1.5 mt-1.5 flex-wrap">
          <span className="text-[15px] font-bold text-gray-900">USD {item.price_usd.toFixed(2)}</span>
          {item.original_price && <>
            <span className="text-xs text-gray-400 line-through">USD {item.original_price.toFixed(2)}</span>
            <span className="text-xs text-gray-500">({item.discount_pct}% off)</span>
          </>}
        </div>
        {item.is_ad && <p className="text-[11px] text-gray-400 mt-0.5">Ad by Etsy seller</p>}
        {item.has_free_delivery && <p className="text-xs text-green-700 font-semibold mt-0.5">FREE delivery</p>}
      </div>
    </article>
  );
}

// ── Filter Drawer ─────────────────────────────────────────────────────────────
function FilterDrawer({ open, onClose, freeDelivery, onSale, shopLocation, customLocation, itemFormat, etsyPick, onApply }: {
  open: boolean; onClose: () => void; freeDelivery: boolean; onSale: boolean;
  shopLocation: string; customLocation: string; itemFormat: string; etsyPick: boolean;
  onApply: (f: { freeDelivery: boolean; onSale: boolean; shopLocation: string; customLocation: string; itemFormat: string; etsyPick: boolean }) => void;
}) {
  const [lFree, setLFree] = useState(freeDelivery);
  const [lSale, setLSale] = useState(onSale);
  const [lLoc,  setLLoc]  = useState(shopLocation);
  const [lCust, setLCust] = useState(customLocation);
  const [lFmt,  setLFmt]  = useState(itemFormat);
  const [lEtsy, setLEtsy] = useState(etsyPick);
  useEffect(() => { if (open) { setLFree(freeDelivery); setLSale(onSale); setLLoc(shopLocation); setLCust(customLocation); setLFmt(itemFormat); setLEtsy(etsyPick); } }, [open, freeDelivery, onSale, shopLocation, customLocation, itemFormat, etsyPick]);
  if (!open) return null;

  const CheckBox = ({ checked, onToggle }: { checked: boolean; onToggle: () => void }) => (
    <div onClick={onToggle} className={`w-[18px] h-[18px] border-2 rounded-sm flex items-center justify-center flex-shrink-0 cursor-pointer transition-colors ${checked ? 'border-gray-900 bg-gray-900' : 'border-gray-400 bg-transparent'}`}>
      {checked && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>}
    </div>
  );
  const Radio = ({ val, cur, set }: { val: string; cur: string; set: (v: string) => void }) => (
    <label className="flex items-center gap-2.5 cursor-pointer text-sm text-gray-700">
      <div onClick={() => set(val)} className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0 cursor-pointer ${cur === val ? 'border-gray-900' : 'border-gray-400'}`}>
        {cur === val && <div className="w-[9px] h-[9px] rounded-full bg-gray-900" />}
      </div>
      {val}
    </label>
  );

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/30 z-[200]" />
      <div className="fixed top-0 left-0 bottom-0 w-[340px] max-w-[90vw] bg-white z-[201] overflow-y-auto pb-24 shadow-[4px_0_24px_rgba(0,0,0,0.15)] animate-[slideInDrawer_0.25s_ease]">
        <style>{`@keyframes slideInDrawer{from{transform:translateX(-100%)}to{transform:translateX(0)}}`}</style>
        <div className="flex items-center justify-between p-5 mb-6">
          <h2 className="text-[26px] font-serif font-normal m-0">Filters</h2>
          <button onClick={onClose} className="bg-none border-none cursor-pointer p-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="px-6 space-y-6">
          {/* Special offers */}
          <div>
            <p className="text-sm font-semibold mb-3 text-gray-900">Special offers</p>
            <div className="space-y-2.5">
              {[{ label: "FREE delivery", checked: lFree, toggle: () => setLFree(v => !v) }, { label: "On sale", checked: lSale, toggle: () => setLSale(v => !v) }].map(({ label, checked, toggle }) => (
                <label key={label} className="flex items-center gap-2.5 cursor-pointer"><CheckBox checked={checked} onToggle={toggle} /><span className="text-sm text-gray-700">{label}</span></label>
              ))}
            </div>
          </div>
          <hr className="border-gray-200" />
          {/* Shop Location */}
          <div>
            <p className="text-sm font-semibold mb-3 text-gray-900">Shop Location</p>
            <div className="space-y-2.5">
              {["Anywhere","Nigeria","Custom"].map(loc => <Radio key={loc} val={loc} cur={lLoc} set={setLLoc} />)}
            </div>
            {lLoc === "Custom" && <input value={lCust} onChange={e => setLCust(e.target.value)} placeholder="Enter location" className="w-full mt-2 px-3.5 py-2 border-[1.5px] border-gray-300 rounded-md text-sm outline-none box-border" />}
          </div>
          <hr className="border-gray-200" />
          {/* Item format */}
          <div>
            <p className="text-sm font-semibold mb-3 text-gray-900">Item format</p>
            <div className="space-y-2.5">
              {["All","Physical items","Digital downloads"].map(fmt => <Radio key={fmt} val={fmt} cur={lFmt} set={setLFmt} />)}
            </div>
          </div>
          <hr className="border-gray-200" />
          {/* Etsy's best */}
          <div>
            <p className="text-sm font-semibold mb-3 text-gray-900">Etsy's best</p>
            <label className="flex items-center gap-2.5 cursor-pointer"><CheckBox checked={lEtsy} onToggle={() => setLEtsy(v => !v)} /><span className="text-sm text-gray-700">Etsy's Pick</span></label>
          </div>
        </div>
        {/* Footer */}
        <div className="fixed bottom-0 left-0 w-[340px] max-w-[90vw] px-6 py-4 bg-white border-t border-gray-200 flex gap-3 box-border">
          <button onClick={onClose} className="flex-1 py-3 rounded-full border-[1.5px] border-gray-900 bg-transparent text-sm font-semibold cursor-pointer text-gray-900">Cancel</button>
          <button onClick={() => { onApply({ freeDelivery: lFree, onSale: lSale, shopLocation: lLoc, customLocation: lCust, itemFormat: lFmt, etsyPick: lEtsy }); onClose(); }} className="flex-1 py-3 rounded-full border-none bg-gray-900 text-white text-sm font-semibold cursor-pointer">Apply</button>
        </div>
      </div>
    </>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AccessoriesPage() {
  const [showAll,        setShowAll]        = useState(false);
  const [sort,           setSort]           = useState<SortKey>("relevance");
  const [filterOpen,     setFilterOpen]     = useState(false);
  const [freeDelivery,   setFreeDelivery]   = useState(false);
  const [onSale,         setOnSale]         = useState(false);
  const [shopLocation,   setShopLocation]   = useState("Anywhere");
  const [customLocation, setCustomLocation] = useState("");
  const [itemFormat,     setItemFormat]     = useState("All");
  const [etsyPick,       setEtsyPick]       = useState(false);
  const [page,           setPage]           = useState(1);

  const visibleCats = showAll ? SUBCATEGORIES : SUBCATEGORIES.slice(0, INITIAL_SHOW);
  const hiddenCount = SUBCATEGORIES.length - INITIAL_SHOW;

  const filteredItems = ALL_ITEMS.filter(item => {
    if (freeDelivery && !item.has_free_delivery) return false;
    if (onSale && !item.is_on_sale) return false;
    if (shopLocation !== "Anywhere" && shopLocation !== "Custom" && !item.shop_country.toLowerCase().includes(shopLocation.toLowerCase())) return false;
    if (etsyPick && !item.is_star_seller) return false;
    if (itemFormat === "Digital downloads") return false;
    return true;
  });

  const sortedItems    = sortItems(filteredItems, sort);
  const paginatedItems = sortedItems.slice(0, page * ITEMS_PER_PAGE);
  const hasMore        = paginatedItems.length < sortedItems.length;
  const activeFilterCount = [freeDelivery, onSale, shopLocation !== "Anywhere", etsyPick, itemFormat !== "All"].filter(Boolean).length;

  const handleApplyFilters = useCallback((f: { freeDelivery: boolean; onSale: boolean; shopLocation: string; customLocation: string; itemFormat: string; etsyPick: boolean }) => {
    setFreeDelivery(f.freeDelivery); setOnSale(f.onSale); setShopLocation(f.shopLocation);
    setCustomLocation(f.customLocation); setItemFormat(f.itemFormat); setEtsyPick(f.etsyPick); setPage(1);
  }, []);

  const clearAll = useCallback(() => {
    setFreeDelivery(false); setOnSale(false); setShopLocation("Anywhere");
    setCustomLocation(""); setItemFormat("All"); setEtsyPick(false);
  }, []);

  useEffect(() => { setPage(1); }, [sort]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap');
        .acc-product-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px 16px}
        @media(max-width:1100px){.acc-product-grid{grid-template-columns:repeat(3,1fr)}}
        @media(max-width:768px){.acc-product-grid{grid-template-columns:repeat(2,1fr)}}
        .acc-cat-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:16px}
        @media(max-width:1100px){.acc-cat-grid{grid-template-columns:repeat(4,1fr)}}
        @media(max-width:600px){.acc-cat-grid{grid-template-columns:repeat(3,1fr)}}
        @keyframes accFadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .acc-card-animate{animation:accFadeInUp 0.35s ease both}
      `}</style>

      <main className="max-w-[1280px] mx-auto px-5 pb-16">
        {/* Hero */}
        <header className="text-center py-9 pb-7">
          <h1 className="font-[Playfair_Display,serif] text-[clamp(28px,4vw,42px)] font-normal text-gray-900 mb-2">Accessories</h1>
          <p className="text-[15px] text-gray-500 tracking-[0.01em]">Scarves, hats and hair accessories that tie it all together</p>
        </header>

        {/* Sub-category grid */}
        <section aria-label="Browse accessory categories">
          <div className="acc-cat-grid">
            {visibleCats.map((cat, i) => (
              <div key={cat.id} className="acc-card-animate" style={{ animationDelay: `${i * 0.04}s` }}>
                <SubCategoryCard cat={cat} />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-7">
            <button onClick={() => setShowAll(v => !v)} aria-expanded={showAll}
              className="flex items-center gap-1.5 px-7 py-[11px] rounded-full border-[1.5px] border-gray-300 bg-white text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors">
              {showAll ? <>Show less <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 15l-6-6-6 6"/></svg></> : <>Show more ({hiddenCount}) <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg></>}
            </button>
          </div>
        </section>

        {/* Toolbar */}
        <div className="flex items-center justify-between mt-10 mb-5 flex-wrap gap-3">
          <button onClick={() => setFilterOpen(true)} aria-label="Open filters" className="relative flex items-center gap-2 px-[18px] py-[9px] rounded-full border-[1.5px] border-gray-900 bg-white text-sm font-semibold text-gray-900 cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/></svg>
            All Filters
            {activeFilterCount > 0 && <span className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full bg-[#F1641E] text-white text-[11px] font-bold flex items-center justify-center">{activeFilterCount}</span>}
          </button>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-[13px] text-gray-500">
              {sortedItems.length.toLocaleString()}+ items <span className="text-gray-400">with ads</span>
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-gray-400 text-[10px] text-gray-500 ml-1 cursor-pointer">?</span>
            </span>
            <SortDropdown sort={sort} onChange={s => { setSort(s); setPage(1); }} />
          </div>
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {freeDelivery   && <Chip label="FREE delivery" onRemove={() => setFreeDelivery(false)} />}
            {onSale         && <Chip label="On sale"       onRemove={() => setOnSale(false)} />}
            {shopLocation !== "Anywhere" && <Chip label={shopLocation === "Custom" && customLocation ? customLocation : shopLocation} onRemove={() => setShopLocation("Anywhere")} />}
            {etsyPick       && <Chip label="Etsy's Pick"  onRemove={() => setEtsyPick(false)} />}
            {itemFormat !== "All" && <Chip label={itemFormat} onRemove={() => setItemFormat("All")} />}
            <button onClick={clearAll} className="text-[13px] text-[#F1641E] bg-none border-none cursor-pointer font-semibold py-1">Clear all</button>
          </div>
        )}

        {/* Product grid */}
        <section aria-label="Accessory products" role="list">
          {sortedItems.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" className="block mx-auto mb-4"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <p className="text-base mb-2">No products match your filters</p>
              <button onClick={clearAll} className="text-[#F1641E] bg-none border-none cursor-pointer text-sm font-semibold">Clear all filters</button>
            </div>
          ) : (
            <div className="acc-product-grid">
              {paginatedItems.map((item, i) => (
                <div key={item.id} className="acc-card-animate" style={{ animationDelay: `${(i % ITEMS_PER_PAGE) * 0.05}s` }}>
                  <ProductCard item={item} />
                </div>
              ))}
            </div>
          )}
        </section>

        {hasMore && (
          <div className="flex justify-center mt-10">
            <button onClick={() => setPage(p => p + 1)} className="px-10 py-3.5 rounded-full border-none bg-gray-900 text-white text-[15px] font-semibold cursor-pointer hover:bg-gray-700 transition-colors">Load more</button>
          </div>
        )}
      </main>

      <FilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} freeDelivery={freeDelivery} onSale={onSale} shopLocation={shopLocation} customLocation={customLocation} itemFormat={itemFormat} etsyPick={etsyPick} onApply={handleApplyFilters} />
    </>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-[13px] font-medium">
      {label}
      <button onClick={onRemove} className="bg-none border-none cursor-pointer leading-none text-gray-500 text-base">×</button>
    </span>
  );
}