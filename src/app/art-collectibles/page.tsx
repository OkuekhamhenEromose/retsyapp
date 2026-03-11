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

interface ArtItem {
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
  is_digital_download: boolean;
  badge_label: string;
  shop_country: string;
}

type SortKey = "relevance" | "lowest_price" | "highest_price" | "top_reviews" | "most_recent";
interface SortOption { value: SortKey; label: string }

// ─── Static seed data ─────────────────────────────────────────────────────────
const SUBCATEGORIES: SubCategory[] = [
  { id: 1,  name: "Prints",                  slug: "prints",                description: "Art prints, posters and wall art for every style",               order: 1,  image_url: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=400&h=400&fit=crop" },
  { id: 2,  name: "Painting",                slug: "painting",              description: "Original oil, watercolour and acrylic paintings",                 order: 2,  image_url: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=400&h=400&fit=crop" },
  { id: 3,  name: "Sculpture",               slug: "sculpture",             description: "Handcrafted sculptures in clay, metal, wood and more",             order: 3,  image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop" },
  { id: 4,  name: "Glass Art",               slug: "glass-art",             description: "Stained glass, fused glass and blown glass pieces",                order: 4,  image_url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop" },
  { id: 5,  name: "Fine Art Ceramics",       slug: "fine-art-ceramics",     description: "Hand-thrown pottery, vessels and sculptural ceramics",             order: 5,  image_url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop" },
  { id: 6,  name: "Collectibles",            slug: "collectibles",          description: "Vintage finds, figurines and rare collectible items",               order: 6,  image_url: "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?w=400&h=400&fit=crop" },
  { id: 7,  name: "Drawing & Illustration",  slug: "drawing-illustration",  description: "Original drawings, illustrations and sketches",                   order: 7,  image_url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=400&fit=crop" },
  { id: 8,  name: "Photography",             slug: "photography",           description: "Fine art photography prints and limited editions",                 order: 8,  image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop" },
  { id: 9,  name: "Fibre Arts",              slug: "fibre-arts",            description: "Macramé, weaving, tapestry and textile art",                      order: 9,  image_url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=400&fit=crop" },
  { id: 10, name: "Dolls & Miniatures",      slug: "dolls-miniatures",      description: "Handmade dolls, plushies and miniature scenes",                   order: 10, image_url: "https://images.unsplash.com/photo-1563396983906-b3795482a59a?w=400&h=400&fit=crop" },
  { id: 11, name: "Mixed Media & Collage",   slug: "mixed-media-collage",   description: "Multi-medium artworks combining paint, paper and more",           order: 11, image_url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop" },
  { id: 12, name: "Artist Trading Cards",    slug: "artist-trading-cards",  description: "Collectible mini artworks in standard card format",               order: 12, image_url: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=400&h=400&fit=crop" },
];

const ALL_ITEMS: ArtItem[] = [
  { id: 1,  title: "Fierce Wolves Face SVG | School Spirit Graphic | Digital Download",                    slug: "fierce-wolves-svg",         price_usd: 3.37,   original_price: 3.75,   discount_pct: 10, image_url: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=600&h=600&fit=crop", shop_name: "DigitalDenDesigns",  star_rating: 5.0, review_count: 2990,  is_star_seller: true,  is_ad: true,  has_free_delivery: false, is_on_sale: true,  is_digital_download: true,  badge_label: "Digital Download", shop_country: "United States" },
  { id: 2,  title: "Tulip 2 — Fine Art Botanical Print, Pastel Flower Wall Art",                           slug: "tulip-botanical-print",      price_usd: 100.00, original_price: null,   discount_pct: 0,  image_url: "https://images.unsplash.com/photo-1490750967868-88df5691b71e?w=600&h=600&fit=crop", shop_name: "BloomPrintCo",       star_rating: 4.8, review_count: 312,   is_star_seller: false, is_ad: true,  has_free_delivery: false, is_on_sale: false, is_digital_download: false, badge_label: "",               shop_country: "United Kingdom" },
  { id: 3,  title: "Add Loved One to Photo — Memorial Portrait, Custom Family Painting",                   slug: "memorial-portrait",          price_usd: 21.90, original_price: 43.80,  discount_pct: 50, image_url: "https://images.unsplash.com/photo-1604480132736-44c188fe4d20?w=600&h=600&fit=crop", shop_name: "PortraitsByAna",     star_rating: 5.0, review_count: 6736,  is_star_seller: true,  is_ad: true,  has_free_delivery: false, is_on_sale: true,  is_digital_download: true,  badge_label: "Digital Download", shop_country: "United States" },
  { id: 4,  title: "Hand-Painted Green Leaves Oil Painting — Tropical Botanical Canvas",                   slug: "green-leaves-oil-painting",  price_usd: 142.50, original_price: 190.00, discount_pct: 25, image_url: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&h=600&fit=crop", shop_name: "LeafStudioArt",      star_rating: 4.5, review_count: 74,    is_star_seller: false, is_ad: true,  has_free_delivery: true,  is_on_sale: true,  is_digital_download: false, badge_label: "FREE delivery",  shop_country: "France" },
  { id: 5,  title: "Animal Crossing Character Button Pins Set — Cute Collectible Fan Art",                 slug: "animal-crossing-pins",       price_usd: 8.50,  original_price: 12.00,  discount_pct: 29, image_url: "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?w=600&h=600&fit=crop",  shop_name: "PinPalaceShop",      star_rating: 5.0, review_count: 4821,  is_star_seller: true,  is_ad: false, has_free_delivery: true,  is_on_sale: true,  is_digital_download: false, badge_label: "",               shop_country: "Canada" },
  { id: 6,  title: "Pokémon Kawaii Sticker Sheet — 48 Holographic Mini Character Stickers",               slug: "pokemon-sticker-sheet",      price_usd: 5.99,  original_price: 7.99,   discount_pct: 25, image_url: "https://images.unsplash.com/photo-1610296669228-602fa827fc1f?w=600&h=600&fit=crop",  shop_name: "KawaiiFanArt",       star_rating: 4.9, review_count: 3150,  is_star_seller: true,  is_ad: false, has_free_delivery: false, is_on_sale: true,  is_digital_download: false, badge_label: "",               shop_country: "Japan" },
  { id: 7,  title: "Friends TV Show Figurine Set — Central Perk Sofa Diorama Collectible",                slug: "friends-figurine-set",       price_usd: 34.00, original_price: 48.00,  discount_pct: 29, image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",  shop_name: "FanFigurines",       star_rating: 4.8, review_count: 1290,  is_star_seller: false, is_ad: false, has_free_delivery: false, is_on_sale: true,  is_digital_download: false, badge_label: "",               shop_country: "United States" },
  { id: 8,  title: "Handmade White Butterfly Paper Sculpture — 3D Wall Art Installation",                  slug: "butterfly-paper-sculpture",  price_usd: 55.00, original_price: 75.00,  discount_pct: 27, image_url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=600&fit=crop",  shop_name: "PaperWingsArt",      star_rating: 4.9, review_count: 823,   is_star_seller: true,  is_ad: false, has_free_delivery: true,  is_on_sale: true,  is_digital_download: false, badge_label: "",               shop_country: "Netherlands" },
  { id: 9,  title: "Sunset Desert Stained Glass Panel — Handcut Lead & Copper Foil Art",                  slug: "desert-stained-glass",       price_usd: 89.00, original_price: 120.00, discount_pct: 26, image_url: "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?w=600&h=600&fit=crop",  shop_name: "GlassGroveCraft",    star_rating: 5.0, review_count: 540,   is_star_seller: true,  is_ad: false, has_free_delivery: false, is_on_sale: true,  is_digital_download: false, badge_label: "",               shop_country: "United States" },
  { id: 10, title: "Handthrown Speckled Cat & Fox Stoneware Mug Pair — Woodland Ceramics",                slug: "cat-fox-stoneware-mug",      price_usd: 48.00, original_price: 65.00,  discount_pct: 26, image_url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=600&fit=crop",  shop_name: "WoodlandKilns",      star_rating: 5.0, review_count: 2104,  is_star_seller: true,  is_ad: false, has_free_delivery: true,  is_on_sale: true,  is_digital_download: false, badge_label: "",               shop_country: "Ireland" },
  { id: 11, title: "Custom Family Portrait — Illustrated Character Style, Digital File",                   slug: "custom-family-portrait",     price_usd: 18.00, original_price: 30.00,  discount_pct: 40, image_url: "https://images.unsplash.com/photo-1453733190371-0a9bedd82893?w=600&h=600&fit=crop",  shop_name: "ToonFamilyArt",      star_rating: 5.0, review_count: 8910,  is_star_seller: true,  is_ad: true,  has_free_delivery: false, is_on_sale: true,  is_digital_download: true,  badge_label: "Digital Download", shop_country: "United Kingdom" },
  { id: 12, title: "Mountain Sunrise Fine Art Photography Print — Misty Alps at Dawn",                     slug: "alps-sunrise-photo-print",   price_usd: 35.00, original_price: 50.00,  discount_pct: 30, image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop",  shop_name: "AlpsLensStudio",     star_rating: 4.8, review_count: 670,   is_star_seller: false, is_ad: false, has_free_delivery: true,  is_on_sale: true,  is_digital_download: false, badge_label: "",               shop_country: "Switzerland" },
  { id: 13, title: "Boho Macramé Wall Hanging with Fringe — Large Woven Tapestry for Living Room",         slug: "boho-macrame-wall-hanging",  price_usd: 62.00, original_price: 85.00,  discount_pct: 27, image_url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=600&fit=crop",  shop_name: "KnotAndWeave",       star_rating: 4.9, review_count: 3300,  is_star_seller: true,  is_ad: false, has_free_delivery: true,  is_on_sale: true,  is_digital_download: false, badge_label: "",               shop_country: "Portugal" },
  { id: 14, title: "Handmade Soft Body Bunny Doll in Vintage Floral Dress — Heirloom Toy",                slug: "bunny-doll-heirloom",        price_usd: 29.00, original_price: 42.00,  discount_pct: 31, image_url: "https://images.unsplash.com/photo-1563396983906-b3795482a59a?w=600&h=600&fit=crop",  shop_name: "HeirloomDolls",      star_rating: 5.0, review_count: 1870,  is_star_seller: true,  is_ad: false, has_free_delivery: false, is_on_sale: true,  is_digital_download: false, badge_label: "",               shop_country: "United Kingdom" },
  { id: 15, title: "Abstract Mixed Media Portrait on Canvas — Layered Collage Original",                   slug: "mixed-media-portrait",       price_usd: 120.00, original_price: 165.00, discount_pct: 27, image_url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop", shop_name: "LayeredSoulArt",     star_rating: 4.9, review_count: 445,   is_star_seller: true,  is_ad: false, has_free_delivery: true,  is_on_sale: true,  is_digital_download: false, badge_label: "",               shop_country: "France" },
  { id: 16, title: "Galaxy & Cosmos Artist Trading Card Set of 10 — Original Mini Paintings",              slug: "galaxy-trading-cards",       price_usd: 22.00, original_price: 30.00,  discount_pct: 27, image_url: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=600&h=600&fit=crop",  shop_name: "CosmicATCShop",      star_rating: 5.0, review_count: 987,   is_star_seller: true,  is_ad: false, has_free_delivery: false, is_on_sale: true,  is_digital_download: false, badge_label: "",               shop_country: "United States" },
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
function sortItems(items: ArtItem[], sort: SortKey): ArtItem[] {
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
    <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 4 }}>
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f${i}`} width="12" height="12" viewBox="0 0 24 24" fill="#F1641E"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      ))}
      {half && (
        <svg width="12" height="12" viewBox="0 0 24 24">
          <defs><linearGradient id="hg2"><stop offset="50%" stopColor="#F1641E"/><stop offset="50%" stopColor="#ddd"/></linearGradient></defs>
          <path fill="url(#hg2)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`e${i}`} width="12" height="12" viewBox="0 0 24 24" fill="#ddd"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      ))}
      <span style={{ fontSize: 12, color: "#666", marginLeft: 2 }}>({fmt(count)})</span>
    </div>
  );
}

// ─── Sub-category card ────────────────────────────────────────────────────────
function SubCategoryCard({ cat }: { cat: SubCategory }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={`/c/art-collectibles/${cat.slug}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        borderRadius: 8,
        overflow: "hidden",
        aspectRatio: "1",
        background: "#f5f5f5",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        transition: "transform 0.2s ease",
        boxShadow: hovered ? "0 4px 20px rgba(0,0,0,0.12)" : "none",
      }}>
        <img
          src={cat.image_url}
          alt={cat.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          loading="lazy"
        />
      </div>
      <p style={{
        marginTop: 8, fontSize: 13, fontWeight: 500,
        color: "#222", textAlign: "center", lineHeight: 1.3,
        fontFamily: "inherit",
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
          display: "flex", alignItems: "center", gap: 6,
          padding: "9px 16px", borderRadius: 999,
          border: "1.5px solid #222", background: "#fff",
          fontSize: 14, fontWeight: 600, cursor: "pointer",
          color: "#222", fontFamily: "inherit",
        }}>
        Sort by: {label}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d={open ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}/>
        </svg>
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", right: 0,
          background: "#fff", border: "1px solid #e8e8e8",
          borderRadius: 10, boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          zIndex: 100, minWidth: 210, overflow: "hidden",
        }}>
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                width: "100%", padding: "11px 16px",
                background: opt.value === sort ? "#fff8f5" : "#fff",
                border: "none", cursor: "pointer",
                fontSize: 14, color: "#222", fontFamily: "inherit",
                textAlign: "left",
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
function ProductCard({ item }: { item: ArtItem }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [imgHovered, setImgHovered] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Image */}
      <div
        style={{ position: "relative", borderRadius: 8, overflow: "hidden", background: "#f5f5f5", aspectRatio: "1", cursor: "pointer" }}
        onMouseEnter={() => setImgHovered(true)}
        onMouseLeave={() => setImgHovered(false)}>
        <img
          src={item.image_url}
          alt={item.title}
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
            position: "absolute", top: 8, right: 8,
            width: 34, height: 34, borderRadius: "50%",
            background: "rgba(255,255,255,0.88)", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
          }}>
          <svg width="17" height="17" viewBox="0 0 24 24"
            fill={wishlisted ? "#e05260" : "none"}
            stroke={wishlisted ? "#e05260" : "#555"} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Digital download badge */}
        {item.is_digital_download && (
          <div style={{
            position: "absolute", bottom: 8, left: 8,
            background: "rgba(0,0,0,0.72)", color: "#fff",
            fontSize: 10, fontWeight: 600, padding: "3px 8px",
            borderRadius: 4, display: "flex", alignItems: "center", gap: 4,
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Digital Download
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

// ─── Filter Drawer ────────────────────────────────────────────────────────────
function FilterDrawer({
  open, onClose,
  freeDelivery, onSale, digitalDownload,
  shopLocation, customLocation,
  itemFormat, etsyPick,
  onApply,
}: {
  open: boolean; onClose: () => void;
  freeDelivery: boolean; onSale: boolean; digitalDownload: boolean;
  shopLocation: string; customLocation: string;
  itemFormat: string; etsyPick: boolean;
  onApply: (f: {
    freeDelivery: boolean; onSale: boolean; digitalDownload: boolean;
    shopLocation: string; customLocation: string;
    itemFormat: string; etsyPick: boolean;
  }) => void;
}) {
  const [lFree, setLFree]   = useState(freeDelivery);
  const [lSale, setLSale]   = useState(onSale);
  const [lDigi, setLDigi]   = useState(digitalDownload);
  const [lLoc,  setLLoc]    = useState(shopLocation);
  const [lCust, setLCust]   = useState(customLocation);
  const [lFmt,  setLFmt]    = useState(itemFormat);
  const [lEtsy, setLEtsy]   = useState(etsyPick);

  useEffect(() => {
    if (open) {
      setLFree(freeDelivery); setLSale(onSale); setLDigi(digitalDownload);
      setLLoc(shopLocation); setLCust(customLocation);
      setLFmt(itemFormat);   setLEtsy(etsyPick);
    }
  }, [open, freeDelivery, onSale, digitalDownload, shopLocation, customLocation, itemFormat, etsyPick]);

  if (!open) return null;

  const pill = (label: string, active: boolean, onClick: () => void) => (
    <button onClick={onClick} style={{
      padding: "7px 16px", borderRadius: 999,
      border: `1.5px solid ${active ? "#222" : "#e0e0e0"}`,
      background: active ? "#222" : "#fff",
      color: active ? "#fff" : "#444",
      fontSize: 13, fontWeight: 600, cursor: "pointer",
      fontFamily: "inherit",
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
        background: "#fff", zIndex: 201, overflowY: "auto",
        padding: "0 0 100px",
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
              {pill("Digital downloads", lDigi, () => setLDigi(v => !v))}
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
                value={lCust}
                onChange={e => setLCust(e.target.value)}
                placeholder="Enter country…"
                style={{ marginTop: 10, width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid #ccc", fontSize: 14, outline: "none", boxSizing: "border-box" }}
              />
            )}
          </div>

          {/* Item format */}
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: "#111" }}>Item format</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["All", "Physical items", "Digital downloads"].map(v => radio(v, lFmt, setLFmt))}
            </div>
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
          padding: "14px 20px", display: "flex", gap: 12,
          boxSizing: "border-box",
        }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "12px", borderRadius: 999,
            border: "1.5px solid #222", background: "#fff",
            fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
          }}>Cancel</button>
          <button
            onClick={() => { onApply({ freeDelivery: lFree, onSale: lSale, digitalDownload: lDigi, shopLocation: lLoc, customLocation: lCust, itemFormat: lFmt, etsyPick: lEtsy }); onClose(); }}
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
export default function ArtCollectiblesPage() {
  const [showAll,        setShowAll]        = useState(false);
  const [sort,           setSort]           = useState<SortKey>("relevance");
  const [filterOpen,     setFilterOpen]     = useState(false);
  const [page,           setPage]           = useState(1);

  // Filters
  const [freeDelivery,     setFreeDelivery]     = useState(false);
  const [onSale,           setOnSale]           = useState(false);
  const [digitalDownload,  setDigitalDownload]  = useState(false);
  const [shopLocation,     setShopLocation]     = useState("Anywhere");
  const [customLocation,   setCustomLocation]   = useState("");
  const [itemFormat,       setItemFormat]       = useState("All");
  const [etsyPick,         setEtsyPick]         = useState(false);

  const clearAll = useCallback(() => {
    setFreeDelivery(false); setOnSale(false); setDigitalDownload(false);
    setShopLocation("Anywhere"); setCustomLocation(""); setItemFormat("All"); setEtsyPick(false);
  }, []);

  const handleApplyFilters = useCallback((f: {
    freeDelivery: boolean; onSale: boolean; digitalDownload: boolean;
    shopLocation: string; customLocation: string;
    itemFormat: string; etsyPick: boolean;
  }) => {
    setFreeDelivery(f.freeDelivery); setOnSale(f.onSale); setDigitalDownload(f.digitalDownload);
    setShopLocation(f.shopLocation); setCustomLocation(f.customLocation);
    setItemFormat(f.itemFormat); setEtsyPick(f.etsyPick);
    setPage(1);
  }, []);

  // Derived state
  const visibleCats  = showAll ? SUBCATEGORIES : SUBCATEGORIES.slice(0, INITIAL_CATS);
  const hiddenCount  = SUBCATEGORIES.length - INITIAL_CATS;

  const filteredItems = ALL_ITEMS.filter(item => {
    if (freeDelivery && !item.has_free_delivery) return false;
    if (onSale && !item.is_on_sale) return false;
    if (digitalDownload && !item.is_digital_download) return false;
    if (etsyPick && !item.is_star_seller) return false;
    if (itemFormat === "Digital downloads" && !item.is_digital_download) return false;
    if (itemFormat === "Physical items" && item.is_digital_download) return false;
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
    freeDelivery, onSale, digitalDownload, etsyPick,
    shopLocation !== "Anywhere",
    itemFormat !== "All",
  ].filter(Boolean).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { background: #f7f7f7; font-family: 'DM Sans', sans-serif; margin: 0; }

        .art-product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 1100px) { .art-product-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px)  { .art-product-grid { grid-template-columns: repeat(2, 1fr); } }

        .art-cat-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
        }
        @media (max-width: 1100px) { .art-cat-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 600px)  { .art-cat-grid { grid-template-columns: repeat(3, 1fr); } }

        .art-show-more-btn:hover { background: #f5f5f5 !important; }
        .art-load-more-btn:hover { background: #111 !important; }

        @keyframes artFadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .art-card-animate { animation: artFadeInUp 0.35s ease both; }
      `}</style>

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 60px" }}>

        {/* ── Hero heading ─────────────────────────────── */}
        <header style={{ textAlign: "center", padding: "36px 0 28px" }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 400, color: "#111", marginBottom: 8 }}>
            Art &amp; Collectibles
          </h1>
          <p style={{ fontSize: 15, color: "#666", letterSpacing: "0.01em" }}>
            Custom artwork, portraits, and totally original paintings and prints to turn your home into a gallery
          </p>
        </header>

        {/* ── Sub-category grid ─────────────────────────── */}
        <section aria-label="Browse art categories">
          <div className="art-cat-grid">
            {visibleCats.map((cat, i) => (
              <div key={cat.id} className="art-card-animate" style={{ animationDelay: `${i * 0.04}s` }}>
                <SubCategoryCard cat={cat} />
              </div>
            ))}
          </div>

          {/* Show more / less */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
            <button
              className="art-show-more-btn"
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
            {freeDelivery && (
              <Chip label="FREE delivery" onRemove={() => setFreeDelivery(false)} />
            )}
            {onSale && (
              <Chip label="On sale" onRemove={() => setOnSale(false)} />
            )}
            {digitalDownload && (
              <Chip label="Digital downloads" onRemove={() => setDigitalDownload(false)} />
            )}
            {shopLocation !== "Anywhere" && (
              <Chip
                label={shopLocation === "Custom" && customLocation ? customLocation : shopLocation}
                onRemove={() => setShopLocation("Anywhere")}
              />
            )}
            {etsyPick && (
              <Chip label="Etsy's Pick" onRemove={() => setEtsyPick(false)} />
            )}
            {itemFormat !== "All" && (
              <Chip label={itemFormat} onRemove={() => setItemFormat("All")} />
            )}
            <button
              onClick={clearAll}
              style={{ fontSize: 13, color: "#F1641E", background: "none", border: "none", cursor: "pointer", fontWeight: 600, padding: "5px 0" }}>
              Clear all
            </button>
          </div>
        )}

        {/* ── Product grid ─────────────────────────────── */}
        <section aria-label="Art products" role="list">
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
            <div className="art-product-grid">
              {paginatedItems.map((item, i) => (
                <div key={item.id} className="art-card-animate" style={{ animationDelay: `${(i % ITEMS_PER_PAGE) * 0.05}s` }}>
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
              className="art-load-more-btn"
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
        freeDelivery={freeDelivery} onSale={onSale} digitalDownload={digitalDownload}
        shopLocation={shopLocation} customLocation={customLocation}
        itemFormat={itemFormat} etsyPick={etsyPick}
        onApply={handleApplyFilters}
      />
    </>
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