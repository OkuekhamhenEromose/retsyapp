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
  { value: "relevance",    label: "Relevance" },
  { value: "lowest_price", label: "Lowest Price" },
  { value: "highest_price",label: "Highest Price" },
  { value: "top_reviews",  label: "Top Customer Reviews" },
  { value: "most_recent",  label: "Most Recent" },
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

function fmt(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(0)}k` : n.toLocaleString();
}

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ rating, count }: { rating: number; count: number }) {
  const full  = Math.floor(rating);
  const half  = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2, marginTop: 4 }}>
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f${i}`} width="12" height="12" viewBox="0 0 24 24" fill="#F1641E"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      ))}
      {half && (
        <svg width="12" height="12" viewBox="0 0 24 24">
          <defs><linearGradient id="hg3"><stop offset="50%" stopColor="#F1641E"/><stop offset="50%" stopColor="#ddd"/></linearGradient></defs>
          <path fill="url(#hg3)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`e${i}`} width="12" height="12" viewBox="0 0 24 24" fill="#ddd"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      ))}
      <span style={{ fontSize: 12, color: "#666", marginLeft: 3 }}>({fmt(count)})</span>
    </div>
  );
}

// ─── Sub-category card ────────────────────────────────────────────────────────
function SubCategoryCard({ cat }: { cat: SubCategory }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={`/c/baby/${cat.slug}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        borderRadius: 8, overflow: "hidden", aspectRatio: "1",
        background: "#f5f5f5",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        transition: "transform 0.2s ease",
        boxShadow: hovered ? "0 4px 20px rgba(0,0,0,0.12)" : "none",
      }}>
        <img
          src={cat.image_url} alt={cat.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          loading="lazy"
        />
      </div>
      <p style={{
        marginTop: 8, fontSize: 13, fontWeight: 500, color: "#222",
        textAlign: "center", lineHeight: 1.3, fontFamily: "inherit",
      }}>{cat.name}</p>
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
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display: "flex", alignItems: "center", gap: 6, padding: "9px 16px",
          borderRadius: 999, border: "1.5px solid #222", background: "#fff",
          fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#222",
          fontFamily: "inherit",
        }}>
        Sort by: {label}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d={open ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}/>
        </svg>
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", right: 0,
          background: "#fff", border: "1px solid #e8e8e8", borderRadius: 10,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)", zIndex: 100, minWidth: 210, overflow: "hidden",
        }}>
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                width: "100%", padding: "11px 16px",
                background: opt.value === sort ? "#fff8f5" : "#fff",
                border: "none", cursor: "pointer", fontSize: 14,
                color: "#222", fontFamily: "inherit", textAlign: "left",
              }}>
              {opt.label}
              {opt.value === sort && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F1641E" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
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
  const [imgHovered, setImgHovered] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Image */}
      <div
        style={{ position: "relative", borderRadius: 8, overflow: "hidden", background: "#f5f5f5", aspectRatio: "1", cursor: "pointer" }}
        onMouseEnter={() => setImgHovered(true)}
        onMouseLeave={() => setImgHovered(false)}>
        <img
          src={item.image_url} alt={item.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transform: imgHovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
          loading="lazy"
        />

        {/* Wishlist button */}
        <button
          onClick={(e) => { e.preventDefault(); setWishlisted(v => !v); }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          style={{
            position: "absolute", top: 8, right: 8, width: 34, height: 34,
            borderRadius: "50%", background: "rgba(255,255,255,0.88)", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
          }}>
          <svg width="17" height="17" viewBox="0 0 24 24"
            fill={wishlisted ? "#e05260" : "none"}
            stroke={wishlisted ? "#e05260" : "#555"} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Low stock badge */}
        {item.low_stock_message && (
          <div style={{
            position: "absolute", bottom: 8, left: 8,
            background: "rgba(220,53,69,0.9)", color: "#fff",
            fontSize: 10, fontWeight: 600, padding: "3px 8px",
            borderRadius: 4,
          }}>
            {item.low_stock_message}
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "10px 2px 0" }}>
        {/* Ad label */}
        {item.is_ad && (
          <p style={{ fontSize: 11, color: "#888", margin: "0 0 3px" }}>Ad by Etsy seller</p>
        )}

        {/* Title */}
        <p style={{
          fontSize: 14, color: "#222", margin: 0, lineHeight: 1.4,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
          overflow: "hidden", fontWeight: 400,
        }}>{item.title}</p>

        {/* Stars */}
        <StarRating rating={item.star_rating} count={item.review_count} />

        {/* Price row */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#222" }}>
            USD {item.price_usd.toFixed(2)}
          </span>
          {item.original_price && (
            <>
              <span style={{ fontSize: 13, color: "#888", textDecoration: "line-through" }}>
                USD {item.original_price.toFixed(2)}
              </span>
              <span style={{ fontSize: 12, color: "#555", fontWeight: 500 }}>
                ({item.discount_pct}% off)
              </span>
            </>
          )}
        </div>

        {/* Free delivery chip */}
        {item.has_free_delivery && (
          <span style={{
            display: "inline-block", marginTop: 5,
            fontSize: 12, fontWeight: 600, color: "#2e7d32",
            background: "#e8f5e9", borderRadius: 4, padding: "2px 7px",
          }}>FREE delivery</span>
        )}

        {/* Personalised badge */}
        {item.is_personalised && (
          <span style={{
            display: "inline-block", marginTop: 5, marginLeft: item.has_free_delivery ? 4 : 0,
            fontSize: 11, fontWeight: 600, color: "#c77700",
            background: "#fff8e1", borderRadius: 4, padding: "2px 7px",
          }}>Personalised</span>
        )}

        {/* Star Seller badge */}
        {item.is_star_seller && (
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 5 }}>
            <span style={{
              fontSize: 11, fontWeight: 700, color: "#fff",
              background: "#7B5BF7", borderRadius: 4, padding: "2px 7px",
              display: "flex", alignItems: "center", gap: 3,
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              Star Seller
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Chip ─────────────────────────────────────────────────────────────────────
function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span style={{
      display: "flex", alignItems: "center", gap: 6,
      padding: "5px 12px", borderRadius: 999,
      background: "#f0f0f0", fontSize: 13, fontWeight: 500,
    }}>
      {label}
      <button onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", lineHeight: 1, color: "#555", fontSize: 16 }}>×</button>
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

  const pill = (label: string, active: boolean, onClick: () => void) => (
    <button onClick={onClick} style={{
      padding: "7px 16px", borderRadius: 999,
      border: `1.5px solid ${active ? "#222" : "#e0e0e0"}`,
      background: active ? "#222" : "#fff",
      color: active ? "#fff" : "#444",
      fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
    }}>{label}</button>
  );

  const radio = (val: string, cur: string, set: (v: string) => void) => (
    <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: "#333" }}>
      <input type="radio" value={val} checked={cur === val} onChange={() => set(val)} style={{ accentColor: "#222" }} />
      {val}
    </label>
  );

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200 }} />
      <div style={{
        position: "fixed", top: 0, left: 0, bottom: 0, width: 360,
        background: "#fff", zIndex: 201, overflowY: "auto", padding: "0 0 100px",
        animation: "slideInDrawer 0.25s ease",
      }}>
        <style>{`@keyframes slideInDrawer { from { transform: translateX(-100%); } to { transform: translateX(0); } }`}</style>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", borderBottom: "1px solid #eee" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Filters</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#555" }}>×</button>
        </div>

        <div style={{ padding: "20px" }}>
          {/* Special offers */}
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: "#111" }}>Special offers</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {pill("FREE delivery", lFree, () => setLFree(v => !v))}
              {pill("On sale",       lSale, () => setLSale(v => !v))}
              {pill("Personalised",  lPers, () => setLPers(v => !v))}
            </div>
          </div>

          {/* Shop location */}
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: "#111" }}>Shop location</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["Anywhere", "Nigeria", "Custom"].map(v => radio(v, lLoc, setLLoc))}
            </div>
            {lLoc === "Custom" && (
              <input
                value={lCust} onChange={e => setLCust(e.target.value)}
                placeholder="Enter country…"
                style={{ marginTop: 10, width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid #ccc", fontSize: 14, outline: "none", boxSizing: "border-box" }}
              />
            )}
          </div>

          {/* Etsy's Pick */}
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: "#111" }}>Etsy's best</p>
            <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <input type="checkbox" checked={lEtsy} onChange={() => setLEtsy(v => !v)} style={{ accentColor: "#222", width: 16, height: 16 }} />
              <span style={{ fontSize: 14, color: "#333" }}>Etsy's Pick</span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          position: "fixed", bottom: 0, left: 0, width: 360,
          background: "#fff", borderTop: "1px solid #eee",
          padding: "14px 20px", display: "flex", gap: 12, boxSizing: "border-box",
        }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "12px", borderRadius: 999,
            border: "1.5px solid #222", background: "#fff",
            fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
          }}>Cancel</button>
          <button
            onClick={() => { onApply({ freeDelivery: lFree, onSale: lSale, isPersonalised: lPers, shopLocation: lLoc, customLocation: lCust, etsyPick: lEtsy }); onClose(); }}
            style={{
              flex: 2, padding: "12px", borderRadius: 999,
              border: "none", background: "#222",
              fontSize: 14, fontWeight: 600, cursor: "pointer",
              color: "#fff", fontFamily: "inherit",
            }}>Apply</button>
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

  // Filters
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

  const visibleCats  = showAll ? SUBCATEGORIES : SUBCATEGORIES.slice(0, INITIAL_CATS);
  const hiddenCount  = SUBCATEGORIES.length - INITIAL_CATS;

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
    freeDelivery, onSale, isPersonalised, etsyPick,
    shopLocation !== "Anywhere",
  ].filter(Boolean).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { background: #f7f7f7; font-family: 'DM Sans', sans-serif; margin: 0; }

        .baby-product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 1100px) { .baby-product-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px)  { .baby-product-grid { grid-template-columns: repeat(2, 1fr); } }

        .baby-cat-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
        }
        @media (max-width: 1100px) { .baby-cat-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 600px)  { .baby-cat-grid { grid-template-columns: repeat(3, 1fr); } }

        .baby-show-more-btn:hover { background: #f5f5f5 !important; }
        .baby-load-more-btn:hover { background: #111 !important; }

        @keyframes babyFadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .baby-card-animate { animation: babyFadeInUp 0.35s ease both; }
      `}</style>

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 60px" }}>

        {/* ── Hero heading ─────────────────────────────── */}
        <header style={{ textAlign: "center", padding: "36px 0 28px" }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px,4vw,42px)", fontWeight: 400,
            color: "#111", marginBottom: 8,
          }}>
            Baby
          </h1>
          <p style={{ fontSize: 15, color: "#666", letterSpacing: "0.01em" }}>
            Adorable baby clothes, nursery essentials, toys and care products for your little one
          </p>
        </header>

        {/* ── Sub-category grid ─────────────────────────── */}
        <section aria-label="Browse baby categories">
          <div className="baby-cat-grid">
            {visibleCats.map((cat, i) => (
              <div key={cat.id} className="baby-card-animate" style={{ animationDelay: `${i * 0.04}s` }}>
                <SubCategoryCard cat={cat} />
              </div>
            ))}
          </div>

          {/* Show more / less */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
            <button
              className="baby-show-more-btn"
              onClick={() => setShowAll(v => !v)}
              aria-expanded={showAll}
              style={{
                padding: "11px 28px", borderRadius: 999,
                border: "1.5px solid #ddd", background: "#fff",
                fontSize: 14, fontWeight: 600, cursor: "pointer",
                color: "#333", display: "flex", alignItems: "center", gap: 6,
                transition: "background 0.15s ease", fontFamily: "inherit",
              }}>
              {showAll ? (
                <>Show less <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 15l-6-6-6 6"/></svg></>
              ) : (
                <>Show more ({hiddenCount}) <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg></>
              )}
            </button>
          </div>
        </section>

        {/* ── Toolbar ──────────────────────────────────── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginTop: 40, marginBottom: 20, flexWrap: "wrap", gap: 12,
        }}>
          {/* All Filters pill */}
          <button
            onClick={() => setFilterOpen(true)}
            aria-label="Open filters"
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "9px 18px", borderRadius: 999,
              border: "1.5px solid #222", background: "#fff",
              fontSize: 14, fontWeight: 600, cursor: "pointer",
              color: "#222", fontFamily: "inherit", position: "relative",
            }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>
            </svg>
            All Filters
            {activeFilterCount > 0 && (
              <span style={{
                position: "absolute", top: -6, right: -6, width: 18, height: 18,
                borderRadius: "50%", background: "#F1641E", color: "#fff",
                fontSize: 11, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{activeFilterCount}</span>
            )}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, color: "#666" }}>
              {sortedItems.length.toLocaleString()}+ items
              <span style={{ color: "#999", marginLeft: 4 }}>with ads</span>
              <span style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 16, height: 16, borderRadius: "50%", border: "1px solid #aaa",
                fontSize: 10, color: "#888", marginLeft: 4, cursor: "pointer",
              }}>?</span>
            </span>
            <SortDropdown sort={sort} onChange={s => { setSort(s); setPage(1); }} />
          </div>
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
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
              style={{ fontSize: 13, color: "#F1641E", background: "none", border: "none", cursor: "pointer", fontWeight: 600, padding: "5px 0" }}>
              Clear all
            </button>
          </div>
        )}

        {/* ── Product grid ─────────────────────────────── */}
        <section aria-label="Baby products" role="list">
          {sortedItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#888" }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" style={{ display: "block", margin: "0 auto 16px" }}>
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <p style={{ fontSize: 16, marginBottom: 8 }}>No products match your filters</p>
              <button onClick={clearAll} style={{ color: "#F1641E", background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="baby-product-grid">
              {paginatedItems.map((item, i) => (
                <div key={item.id} className="baby-card-animate" style={{ animationDelay: `${(i % ITEMS_PER_PAGE) * 0.05}s` }}>
                  <ProductCard item={item} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Load more */}
        {hasMore && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
            <button
              className="baby-load-more-btn"
              onClick={() => setPage(p => p + 1)}
              style={{
                padding: "13px 40px", borderRadius: 999, border: "none",
                background: "#222", color: "#fff", fontSize: 15, fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit", transition: "background 0.15s ease",
              }}>
              Load more
            </button>
          </div>
        )}
      </main>

      <FilterDrawer
        open={filterOpen} onClose={() => setFilterOpen(false)}
        freeDelivery={freeDelivery} onSale={onSale} isPersonalised={isPersonalised}
        shopLocation={shopLocation} customLocation={customLocation} etsyPick={etsyPick}
        onApply={handleApplyFilters}
      />
    </>
  );
}