"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface SubCategory {
  id: number;
  name: string;
  slug: string;
  image_url: string;
  description: string;
  order: number;
}

interface BabyItem {
  id: number;
  title: string;
  slug: string;
  price_usd: number;
  original_price: number | null;
  discount_pct: number;
  image_url: string;
  shop_name: string;
  star_rating: number;
  review_count: number;
  is_star_seller: boolean;
  is_ad: boolean;
  has_free_delivery: boolean;
  is_on_sale: boolean;
  is_personalised: boolean;
  badge_label: string;
  low_stock_message: string;
  shop_country: string;
}

type SortKey = "relevance" | "lowest_price" | "highest_price" | "top_reviews" | "most_recent";
interface SortOption { value: SortKey; label: string }

// ─── Static seed data ─────────────────────────────────────────────────────────
const SUBCATEGORIES: SubCategory[] = [
  { id: 1,  name: "Baby Clothes",       slug: "baby-clothes",       order: 1,  description: "Personalised and adorable outfits for newborns and toddlers",          image_url: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&h=400&fit=crop" },
  { id: 2,  name: "Nursery Decor",      slug: "nursery-decor",      order: 2,  description: "Dreamy wall art, mobiles and decorative accents for baby's room",       image_url: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=400&fit=crop" },
  { id: 3,  name: "Baby Toys",          slug: "baby-toys",          order: 3,  description: "Soft toys, rattles and sensory play items to stimulate little minds",    image_url: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop" },
  { id: 4,  name: "Cot Bedding",        slug: "cot-bedding",        order: 4,  description: "Cosy blankets, sheets and quilts for a safe and snug night's sleep",    image_url: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&h=400&fit=crop" },
  { id: 5,  name: "Nursery Furniture",  slug: "nursery-furniture",  order: 5,  description: "Handcrafted cribs, shelving and storage to complete the nursery",       image_url: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=400&fit=crop" },
  { id: 6,  name: "Baby Care",          slug: "baby-care",          order: 6,  description: "Natural bath-time essentials, gift sets and gentle skincare for babies", image_url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop" },
  { id: 7,  name: "Baby Gifts",         slug: "baby-gifts",         order: 7,  description: "Thoughtful hampers, keepsakes and new baby gift sets",                  image_url: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=400&fit=crop" },
  { id: 8,  name: "Baby Accessories",   slug: "baby-accessories",   order: 8,  description: "Bibs, dummies, changing mats and all the little extras",                image_url: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop" },
  { id: 9,  name: "Baby Shower",        slug: "baby-shower",        order: 9,  description: "Decorations, invitations and favours to celebrate the new arrival",     image_url: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=400&h=400&fit=crop" },
  { id: 10, name: "Nappies & Changing", slug: "nappies-changing",   order: 10, description: "Eco-friendly nappies, changing bags and waterproof essentials",         image_url: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop&sig=2" },
  { id: 11, name: "Feeding",            slug: "feeding",            order: 11, description: "Handmade bibs, weaning sets and personalised plates and bowls",         image_url: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=400&fit=crop&sig=2" },
  { id: 12, name: "Baby Keepsakes",     slug: "baby-keepsakes",     order: 12, description: "Fingerprint kits, birth prints and memory boxes to treasure forever",   image_url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop&sig=2" },
];

const ALL_ITEMS: BabyItem[] = [
  { id: 1,  title: "Custom Embroidered New Best Friend Bodysuit — Dog or Cat Portrait",                      slug: "embroidered-bodysuit-dog",      price_usd: 17.48, original_price: 56.39, discount_pct: 69, image_url: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&h=600&fit=crop",          shop_name: "TinyThreadsCo",    star_rating: 5.0, review_count: 839,  is_star_seller: true,  is_ad: true,  has_free_delivery: false, is_on_sale: true,  is_personalised: true,  badge_label: "",              low_stock_message: "",                     shop_country: "United States" },
  { id: 2,  title: "Custom Embroidered Youth Hoodie with Pet Portrait — Any Breed",                          slug: "embroidered-hoodie-pet",        price_usd: 29.25, original_price: 43.65, discount_pct: 33, image_url: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&h=600&fit=crop",          shop_name: "PetPortraitWear",  star_rating: 5.0, review_count: 912,  is_star_seller: true,  is_ad: true,  has_free_delivery: false, is_on_sale: true,  is_personalised: true,  badge_label: "",              low_stock_message: "",                     shop_country: "United Kingdom" },
  { id: 3,  title: "Duo Diner Custom Cover in Dinosaurs — Learning Placemat for Toddlers",                   slug: "dino-placemat-cover",           price_usd: 49.00, original_price: null,  discount_pct: 0,  image_url: "https://images.unsplash.com/photo-1563396983906-b3795482a59a?w=600&h=600&fit=crop",          shop_name: "DinoTableCo",      star_rating: 5.0, review_count: 1430, is_star_seller: true,  is_ad: true,  has_free_delivery: false, is_on_sale: false, is_personalised: true,  badge_label: "",              low_stock_message: "Only 2 left – order soon", shop_country: "United States" },
  { id: 4,  title: "Protected By Dog Siblings Bodysuit — Custom Name Baby Romper",                           slug: "dog-siblings-bodysuit",         price_usd: 11.78, original_price: 14.72, discount_pct: 20, image_url: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&h=600&fit=crop&sig=4",      shop_name: "PawPrintBabies",   star_rating: 5.0, review_count: 1146, is_star_seller: true,  is_ad: true,  has_free_delivery: true,  is_on_sale: true,  is_personalised: true,  badge_label: "FREE delivery", low_stock_message: "",                     shop_country: "United States" },
  { id: 5,  title: "Handmade Floppy Bunny Plush — Personalised Heirloom Soft Toy for Babies",                slug: "floppy-bunny-plush",            price_usd: 22.50, original_price: 30.00, discount_pct: 25, image_url: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=600&fit=crop",          shop_name: "PlushPalsCo",      star_rating: 5.0, review_count: 4290, is_star_seller: true,  is_ad: false, has_free_delivery: true,  is_on_sale: true,  is_personalised: false, badge_label: "FREE delivery", low_stock_message: "",                     shop_country: "Ireland" },
  { id: 6,  title: "August with Rose Sunflower Plush — Handmade Floral Stuffed Animal",                      slug: "sunflower-plush-august",        price_usd: 26.00, original_price: 35.00, discount_pct: 26, image_url: "https://images.unsplash.com/photo-1508766917616-d22f3f1eea14?w=600&h=600&fit=crop",          shop_name: "BloomBuddies",     star_rating: 4.9, review_count: 3120, is_star_seller: true,  is_ad: false, has_free_delivery: true,  is_on_sale: true,  is_personalised: false, badge_label: "",              low_stock_message: "",                     shop_country: "Netherlands" },
  { id: 7,  title: "Flower Crown Kawaii Plush Doll — Handmade Soft Toy for Babies & Toddlers",               slug: "flower-crown-kawaii-doll",      price_usd: 18.99, original_price: 27.99, discount_pct: 32, image_url: "https://images.unsplash.com/photo-1599030822578-ab04cfa5a5a6?w=600&h=600&fit=crop",          shop_name: "KawaiiCraftCo",    star_rating: 4.8, review_count: 876,  is_star_seller: false, is_ad: false, has_free_delivery: false, is_on_sale: true,  is_personalised: false, badge_label: "",              low_stock_message: "",                     shop_country: "Japan" },
  { id: 8,  title: "Polka Dot Nursery Wallpaper — Peel & Stick Removable Dots for Baby Room",                slug: "polka-dot-nursery-wallpaper",   price_usd: 24.99, original_price: 34.99, discount_pct: 28, image_url: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600&h=600&fit=crop",          shop_name: "WallWondersCo",    star_rating: 4.8, review_count: 2340, is_star_seller: true,  is_ad: false, has_free_delivery: true,  is_on_sale: true,  is_personalised: false, badge_label: "",              low_stock_message: "",                     shop_country: "United States" },
  { id: 9,  title: "Personalised LED Name Sign for Nursery Wall — Custom Baby Room Light",                    slug: "personalised-led-name-sign",    price_usd: 38.00, original_price: 55.00, discount_pct: 31, image_url: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=600&h=600&fit=crop",          shop_name: "GlowNursery",      star_rating: 5.0, review_count: 1820, is_star_seller: true,  is_ad: false, has_free_delivery: false, is_on_sale: true,  is_personalised: true,  badge_label: "",              low_stock_message: "",                     shop_country: "United Kingdom" },
  { id: 10, title: "Personalised Knitted Baby Blanket — Name Embroidered Merino Wool Throw",                 slug: "knitted-baby-blanket",          price_usd: 44.00, original_price: 62.00, discount_pct: 29, image_url: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&h=600&fit=crop&sig=5",  shop_name: "KnitNestCo",       star_rating: 5.0, review_count: 3710, is_star_seller: true,  is_ad: false, has_free_delivery: true,  is_on_sale: true,  is_personalised: true,  badge_label: "FREE delivery", low_stock_message: "",                     shop_country: "United Kingdom" },
  { id: 11, title: "Organic Cotton Muslin Swaddle Blanket Set of 3 — Woodland Animal Print",                 slug: "organic-muslin-swaddle-set",    price_usd: 32.00, original_price: 45.00, discount_pct: 29, image_url: "https://images.unsplash.com/photo-1488751045188-3c55bbf9a3fa?w=600&h=600&fit=crop",          shop_name: "PureMuslinCo",     star_rating: 4.9, review_count: 2455, is_star_seller: true,  is_ad: false, has_free_delivery: false, is_on_sale: true,  is_personalised: false, badge_label: "",              low_stock_message: "",                     shop_country: "Turkey" },
  { id: 12, title: "Personalised Wooden Name Crib Mobile — Engraved Animal Shapes",                          slug: "wooden-name-crib-mobile",       price_usd: 55.00, original_price: 75.00, discount_pct: 27, image_url: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&h=600&fit=crop",          shop_name: "WoodenWondersCo",  star_rating: 5.0, review_count: 1980, is_star_seller: true,  is_ad: false, has_free_delivery: false, is_on_sale: true,  is_personalised: true,  badge_label: "",              low_stock_message: "",                     shop_country: "Canada" },
  { id: 13, title: "Boho Macramé Nursery Shelf — Floating Wall Shelf with Storage Basket",                   slug: "boho-macrame-nursery-shelf",    price_usd: 48.00, original_price: 65.00, discount_pct: 26, image_url: "https://images.unsplash.com/photo-1567016376408-0226e1d3d0c6?w=600&h=600&fit=crop",          shop_name: "KnotShelveCo",     star_rating: 4.9, review_count: 1240, is_star_seller: true,  is_ad: false, has_free_delivery: true,  is_on_sale: true,  is_personalised: false, badge_label: "",              low_stock_message: "",                     shop_country: "Portugal" },
  { id: 14, title: "Natural Organic Baby Gift Set — Lavender Bath Wash, Lotion & Balm",                      slug: "organic-baby-gift-set",         price_usd: 36.00, original_price: 50.00, discount_pct: 28, image_url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=600&fit=crop",          shop_name: "PureNatureCare",   star_rating: 5.0, review_count: 2870, is_star_seller: true,  is_ad: false, has_free_delivery: true,  is_on_sale: true,  is_personalised: false, badge_label: "FREE delivery", low_stock_message: "",                     shop_country: "France" },
  { id: 15, title: "Personalised Baby Beach Toy Drawstring Bag — Custom Name Canvas Pouch",                  slug: "personalised-beach-toy-bag",    price_usd: 14.99, original_price: 19.99, discount_pct: 25, image_url: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=600&fit=crop",          shop_name: "BeachBabyShop",    star_rating: 4.9, review_count: 1560, is_star_seller: true,  is_ad: false, has_free_delivery: false, is_on_sale: true,  is_personalised: true,  badge_label: "",              low_stock_message: "",                     shop_country: "Australia" },
  { id: 16, title: "New Baby Gift Hamper — Personalised Keepsake Box with Soft Toy & Outfit",                slug: "new-baby-gift-hamper",          price_usd: 68.00, original_price: 95.00, discount_pct: 28, image_url: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&h=600&fit=crop",          shop_name: "GiftNestCo",       star_rating: 5.0, review_count: 4130, is_star_seller: true,  is_ad: false, has_free_delivery: true,  is_on_sale: true,  is_personalised: true,  badge_label: "FREE delivery", low_stock_message: "",                     shop_country: "United Kingdom" },
];

const SORT_OPTIONS: SortOption[] = [
  { value: "relevance",     label: "Relevance" },
  { value: "lowest_price",  label: "Lowest Price" },
  { value: "highest_price", label: "Highest Price" },
  { value: "top_reviews",   label: "Top Customer Reviews" },
  { value: "most_recent",   label: "Most Recent" },
];

const ITEMS_PER_PAGE = 8;
const INITIAL_CATS   = 6;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function sortItems(items: BabyItem[], sort: SortKey): BabyItem[] {
  const arr = [...items];
  switch (sort) {
    case "lowest_price":  return arr.sort((a, b) => a.price_usd - b.price_usd);
    case "highest_price": return arr.sort((a, b) => b.price_usd - a.price_usd);
    case "top_reviews":   return arr.sort((a, b) => b.star_rating !== a.star_rating ? b.star_rating - a.star_rating : b.review_count - a.review_count);
    case "most_recent":   return arr.sort((a, b) => b.id - a.id);
    default:              return arr.sort((a, b) => b.review_count - a.review_count);
  }
}

function fmtCount(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(0)}k` : n.toLocaleString();
}

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ rating, count }: { rating: number; count: number }) {
  const full  = Math.floor(rating);
  const half  = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex items-center gap-0.5 mt-1">
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f${i}`} width="12" height="12" viewBox="0 0 24 24" fill="#F1641E">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
      {half && (
        <svg width="12" height="12" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="baby-hg">
              <stop offset="50%" stopColor="#F1641E"/>
              <stop offset="50%" stopColor="#ddd"/>
            </linearGradient>
          </defs>
          <path fill="url(#baby-hg)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`e${i}`} width="12" height="12" viewBox="0 0 24 24" fill="#ddd">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
      <span className="text-xs text-gray-500 ml-0.5">({fmtCount(count)})</span>
    </div>
  );
}

// ─── Sub-category card ────────────────────────────────────────────────────────
function SubCategoryCard({ cat }: { cat: SubCategory }) {
  return (
    <a
      href={`/c/baby/${cat.slug}`}
      className="block group text-inherit no-underline"
    >
      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 transition-transform duration-200 group-hover:scale-[1.03] group-hover:shadow-lg">
        <img
          src={cat.image_url}
          alt={cat.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <p className="mt-2 text-[13px] font-medium text-center leading-snug text-gray-800">
        {cat.name}
      </p>
    </a>
  );
}

// ─── Sort Dropdown ────────────────────────────────────────────────────────────
function SortDropdown({ sort, onChange }: { sort: SortKey; onChange: (s: SortKey) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const label = SORT_OPTIONS.find(o => o.value === sort)?.label ?? "Relevance";

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border-[1.5px] border-gray-800 bg-white text-sm font-semibold text-gray-800 cursor-pointer whitespace-nowrap"
      >
        <span className="font-normal text-gray-500">Sort by:</span> {label}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d={open ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}/>
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-[calc(100%+6px)] bg-white border border-gray-200 rounded-xl shadow-xl z-[100] min-w-[210px] overflow-hidden">
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`flex items-center justify-between w-full px-4 py-[11px] text-sm text-gray-800 text-left cursor-pointer border-none ${opt.value === sort ? "bg-orange-50" : "bg-white hover:bg-gray-50"}`}
            >
              {opt.label}
              {opt.value === sort && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F1641E" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ item }: { item: BabyItem }) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <article className="flex flex-col cursor-pointer" role="listitem">
      {/* Image */}
      <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-square group/img">
        <img
          src={item.image_url}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-[1.04]"
          loading="lazy"
        />

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); setWishlisted(v => !v); }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2 right-2 w-[34px] h-[34px] rounded-full bg-white/88 border-none flex items-center justify-center cursor-pointer shadow-sm backdrop-blur-sm"
        >
          <svg width="17" height="17" viewBox="0 0 24 24"
            fill={wishlisted ? "#e05260" : "none"}
            stroke={wishlisted ? "#e05260" : "#555"} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Low stock */}
        {item.low_stock_message && (
          <div className="absolute bottom-2 left-2 bg-red-600/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
            {item.low_stock_message}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="pt-2.5 px-0.5">
        {item.is_ad && <p className="text-[11px] text-gray-400 mb-0.5">Ad by Etsy seller</p>}

        <p className="text-[14px] text-gray-800 leading-snug line-clamp-2 font-normal">
          {item.title}
        </p>

        <StarRating rating={item.star_rating} count={item.review_count} />

        {/* Price row */}
        <div className="flex items-baseline gap-1.5 mt-1.5 flex-wrap">
          <span className="text-[15px] font-bold text-gray-900">
            USD {item.price_usd.toFixed(2)}
          </span>
          {item.original_price && (
            <>
              <span className="text-[13px] text-gray-400 line-through">
                USD {item.original_price.toFixed(2)}
              </span>
              <span className="text-xs text-gray-500">
                ({item.discount_pct}% off)
              </span>
            </>
          )}
        </div>

        {item.has_free_delivery && (
          <span className="inline-block mt-1.5 text-xs font-semibold text-green-700 bg-green-50 rounded px-1.5 py-0.5">
            FREE delivery
          </span>
        )}

        {item.is_personalised && (
          <span className="inline-block mt-1.5 ml-1 text-[11px] font-semibold text-amber-700 bg-amber-50 rounded px-1.5 py-0.5">
            Personalised
          </span>
        )}

        {item.is_star_seller && (
          <div className="flex items-center gap-1 mt-1.5">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-purple-600 rounded px-1.5 py-0.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Star Seller
            </span>
          </div>
        )}
      </div>
    </article>
  );
}

// ─── Filter Chip ──────────────────────────────────────────────────────────────
function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-[13px] font-medium text-gray-700">
      {label}
      <button
        onClick={onRemove}
        className="text-gray-500 hover:text-gray-800 text-base leading-none bg-transparent border-none cursor-pointer"
        aria-label={`Remove ${label} filter`}
      >
        ×
      </button>
    </span>
  );
}

// ─── Filter Drawer ────────────────────────────────────────────────────────────
function FilterDrawer({
  open, onClose,
  freeDelivery, onSale, isPersonalised,
  shopLocation, customLocation, etsyPick,
  onApply,
}: {
  open: boolean; onClose: () => void;
  freeDelivery: boolean; onSale: boolean; isPersonalised: boolean;
  shopLocation: string; customLocation: string; etsyPick: boolean;
  onApply: (f: {
    freeDelivery: boolean; onSale: boolean; isPersonalised: boolean;
    shopLocation: string; customLocation: string; etsyPick: boolean;
  }) => void;
}) {
  const [lFree, setLFree] = useState(freeDelivery);
  const [lSale, setLSale] = useState(onSale);
  const [lPers, setLPers] = useState(isPersonalised);
  const [lLoc,  setLLoc]  = useState(shopLocation);
  const [lCust, setLCust] = useState(customLocation);
  const [lEtsy, setLEtsy] = useState(etsyPick);

  useEffect(() => {
    if (open) {
      setLFree(freeDelivery); setLSale(onSale); setLPers(isPersonalised);
      setLLoc(shopLocation); setLCust(customLocation); setLEtsy(etsyPick);
    }
  }, [open, freeDelivery, onSale, isPersonalised, shopLocation, customLocation, etsyPick]);

  if (!open) return null;

  const PillBtn = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-[13px] font-semibold cursor-pointer transition-colors ${
        active
          ? "bg-gray-900 text-white border-[1.5px] border-gray-900"
          : "bg-white text-gray-600 border-[1.5px] border-gray-200 hover:border-gray-400"
      }`}
    >
      {label}
    </button>
  );

  const RadioOpt = ({ val, cur, set }: { val: string; cur: string; set: (v: string) => void }) => (
    <label className="flex items-center gap-2 cursor-pointer text-[14px] text-gray-700">
      <input type="radio" value={val} checked={cur === val} onChange={() => set(val)} className="accent-gray-900" />
      {val}
    </label>
  );

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/40 z-[200]" />
      <div className="fixed top-0 left-0 bottom-0 w-[360px] bg-white z-[201] overflow-y-auto pb-24 animate-[slideInDrawer_0.25s_ease]">
        <style>{`@keyframes slideInDrawer { from { transform: translateX(-100%); } to { transform: translateX(0); } }`}</style>

        <div className="flex items-center justify-between px-5 py-[18px] border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 m-0">Filters</h2>
          <button onClick={onClose} className="bg-transparent border-none cursor-pointer text-2xl text-gray-500 hover:text-gray-800">×</button>
        </div>

        <div className="p-5 space-y-7">
          {/* Special offers */}
          <div>
            <p className="text-[14px] font-bold text-gray-900 mb-3">Special offers</p>
            <div className="flex flex-wrap gap-2">
              <PillBtn label="FREE delivery" active={lFree} onClick={() => setLFree(v => !v)} />
              <PillBtn label="On sale"       active={lSale} onClick={() => setLSale(v => !v)} />
              <PillBtn label="Personalised"  active={lPers} onClick={() => setLPers(v => !v)} />
            </div>
          </div>

          {/* Shop location */}
          <div>
            <p className="text-[14px] font-bold text-gray-900 mb-3">Shop location</p>
            <div className="flex flex-col gap-2.5">
              {["Anywhere", "Nigeria", "Custom"].map(v => (
                <RadioOpt key={v} val={v} cur={lLoc} set={setLLoc} />
              ))}
            </div>
            {lLoc === "Custom" && (
              <input
                value={lCust}
                onChange={e => setLCust(e.target.value)}
                placeholder="Enter country…"
                className="mt-2.5 w-full px-3 py-2.5 rounded-lg border-[1.5px] border-gray-300 text-[14px] outline-none focus:border-gray-500"
              />
            )}
          </div>

          {/* Etsy's Pick */}
          <div>
            <p className="text-[14px] font-bold text-gray-900 mb-3">Etsy&apos;s best</p>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={lEtsy}
                onChange={() => setLEtsy(v => !v)}
                className="accent-gray-900 w-4 h-4"
              />
              <span className="text-[14px] text-gray-700">Etsy&apos;s Pick</span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="fixed bottom-0 left-0 w-[360px] bg-white border-t border-gray-100 px-5 py-3.5 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full border-[1.5px] border-gray-800 bg-white text-[14px] font-semibold cursor-pointer text-gray-800 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onApply({ freeDelivery: lFree, onSale: lSale, isPersonalised: lPers, shopLocation: lLoc, customLocation: lCust, etsyPick: lEtsy });
              onClose();
            }}
            className="flex-[2] py-3 rounded-full border-none bg-gray-900 text-[14px] font-semibold cursor-pointer text-white hover:bg-gray-700 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BabyPage() {
  const [showAll,      setShowAll]      = useState(false);
  const [sort,         setSort]         = useState<SortKey>("relevance");
  const [filterOpen,   setFilterOpen]   = useState(false);
  const [page,         setPage]         = useState(1);

  const [freeDelivery,   setFreeDelivery]   = useState(false);
  const [onSale,         setOnSale]         = useState(false);
  const [isPersonalised, setIsPersonalised] = useState(false);
  const [shopLocation,   setShopLocation]   = useState("Anywhere");
  const [customLocation, setCustomLocation] = useState("");
  const [etsyPick,       setEtsyPick]       = useState(false);

  const clearAll = useCallback(() => {
    setFreeDelivery(false); setOnSale(false); setIsPersonalised(false);
    setShopLocation("Anywhere"); setCustomLocation(""); setEtsyPick(false);
  }, []);

  const handleApplyFilters = useCallback((f: {
    freeDelivery: boolean; onSale: boolean; isPersonalised: boolean;
    shopLocation: string; customLocation: string; etsyPick: boolean;
  }) => {
    setFreeDelivery(f.freeDelivery); setOnSale(f.onSale); setIsPersonalised(f.isPersonalised);
    setShopLocation(f.shopLocation); setCustomLocation(f.customLocation); setEtsyPick(f.etsyPick);
    setPage(1);
  }, []);

  const visibleCats = showAll ? SUBCATEGORIES : SUBCATEGORIES.slice(0, INITIAL_CATS);
  const hiddenCount = SUBCATEGORIES.length - INITIAL_CATS;

  const filteredItems = ALL_ITEMS.filter(item => {
    if (freeDelivery && !item.has_free_delivery) return false;
    if (onSale && !item.is_on_sale) return false;
    if (isPersonalised && !item.is_personalised) return false;
    if (etsyPick && !item.is_star_seller) return false;
    if (shopLocation === "Custom" && customLocation) {
      if (!item.shop_country.toLowerCase().includes(customLocation.toLowerCase())) return false;
    } else if (shopLocation !== "Anywhere") {
      if (!item.shop_country.toLowerCase().includes(shopLocation.toLowerCase())) return false;
    }
    return true;
  });

  const sortedItems    = sortItems(filteredItems, sort);
  const paginatedItems = sortedItems.slice(0, page * ITEMS_PER_PAGE);
  const hasMore        = paginatedItems.length < sortedItems.length;

  const activeFilterCount = [
    freeDelivery, onSale, isPersonalised, etsyPick, shopLocation !== "Anywhere",
  ].filter(Boolean).length;

  return (
    <main className="max-w-[1280px] mx-auto px-5 pb-16">

      {/* Hero heading */}
      <header className="text-center py-9 pb-7">
        <h1
          className="text-[clamp(28px,4vw,42px)] font-normal text-gray-900 mb-2"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Baby
        </h1>
        <p className="text-[15px] text-gray-500 tracking-[0.01em]">
          Adorable baby clothes, nursery essentials, toys and care products for your little one
        </p>
      </header>

      {/* Sub-category grid */}
      <section aria-label="Browse baby categories">
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {visibleCats.map((cat, i) => (
            <div
              key={cat.id}
              className="animate-[fadeInUp_0.35s_ease_both]"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <SubCategoryCard cat={cat} />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-7">
          <button
            onClick={() => setShowAll(v => !v)}
            aria-expanded={showAll}
            className="flex items-center gap-1.5 px-7 py-3 rounded-full border-[1.5px] border-gray-200 bg-white text-[14px] font-semibold text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            {showAll ? (
              <>Show less <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 15l-6-6-6 6"/></svg></>
            ) : (
              <>Show more ({hiddenCount}) <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg></>
            )}
          </button>
        </div>
      </section>

      {/* Toolbar */}
      <div className="flex items-center justify-between mt-10 mb-5 flex-wrap gap-3">
        <button
          onClick={() => setFilterOpen(true)}
          aria-label="Open filters"
          className="relative flex items-center gap-2 px-[18px] py-[9px] rounded-full border-[1.5px] border-gray-800 bg-white text-[14px] font-semibold text-gray-800 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>
          </svg>
          All Filters
          {activeFilterCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full bg-[#F1641E] text-white text-[11px] font-bold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-[13px] text-gray-500">
            {sortedItems.length.toLocaleString()}+ items
            <span className="text-gray-400 ml-1">with ads</span>
          </span>
          <SortDropdown sort={sort} onChange={s => { setSort(s); setPage(1); }} />
        </div>
      </div>

      {/* Active filter chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {freeDelivery   && <Chip label="FREE delivery" onRemove={() => setFreeDelivery(false)} />}
          {onSale         && <Chip label="On sale"       onRemove={() => setOnSale(false)} />}
          {isPersonalised && <Chip label="Personalised"  onRemove={() => setIsPersonalised(false)} />}
          {shopLocation !== "Anywhere" && (
            <Chip
              label={shopLocation === "Custom" && customLocation ? customLocation : shopLocation}
              onRemove={() => setShopLocation("Anywhere")}
            />
          )}
          {etsyPick && <Chip label="Etsy's Pick" onRemove={() => setEtsyPick(false)} />}
          <button
            onClick={clearAll}
            className="text-[13px] text-[#F1641E] bg-transparent border-none cursor-pointer font-semibold py-1"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Product grid */}
      <section aria-label="Baby products" role="list">
        {sortedItems.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" className="mx-auto mb-4">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <p className="text-[16px] mb-2">No products match your filters</p>
            <button onClick={clearAll} className="text-[#F1641E] bg-transparent border-none cursor-pointer text-[14px] font-semibold">
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {paginatedItems.map((item, i) => (
              <div
                key={item.id}
                className="animate-[fadeInUp_0.35s_ease_both]"
                style={{ animationDelay: `${(i % ITEMS_PER_PAGE) * 0.05}s` }}
              >
                <ProductCard item={item} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Load more */}
      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setPage(p => p + 1)}
            className="px-10 py-3.5 rounded-full border-none bg-gray-900 text-white text-[15px] font-semibold cursor-pointer hover:bg-gray-700 transition-colors"
          >
            Load more
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <FilterDrawer
        open={filterOpen} onClose={() => setFilterOpen(false)}
        freeDelivery={freeDelivery} onSale={onSale} isPersonalised={isPersonalised}
        shopLocation={shopLocation} customLocation={customLocation} etsyPick={etsyPick}
        onApply={handleApplyFilters}
      />
    </main>
  );
}