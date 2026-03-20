"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface SubCategory { id: number; name: string; slug: string; image_url: string; description: string; order: number }
interface ArtItem { id: number; title: string; slug: string; price_usd: number; original_price: number | null; discount_pct: number; image_url: string; shop_name: string; star_rating: number; review_count: number; is_star_seller: boolean; is_ad: boolean; has_free_delivery: boolean; is_on_sale: boolean; is_digital_download: boolean; badge_label: string; shop_country: string }
type SortKey = "relevance" | "lowest_price" | "highest_price" | "top_reviews" | "most_recent";
interface SortOption { value: SortKey; label: string }

const SUBCATEGORIES: SubCategory[] = [
  { id: 1,  name: "Prints",                 slug: "prints",                description: "Art prints, posters and wall art",               order: 1,  image_url: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=400&h=400&fit=crop" },
  { id: 2,  name: "Painting",               slug: "painting",              description: "Original oil, watercolour and acrylic paintings", order: 2,  image_url: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=400&h=400&fit=crop" },
  { id: 3,  name: "Sculpture",              slug: "sculpture",             description: "Handcrafted sculptures",                         order: 3,  image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop" },
  { id: 4,  name: "Glass Art",              slug: "glass-art",             description: "Stained, fused and blown glass",                 order: 4,  image_url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop" },
  { id: 5,  name: "Fine Art Ceramics",      slug: "fine-art-ceramics",     description: "Hand-thrown pottery and ceramics",               order: 5,  image_url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop" },
  { id: 6,  name: "Collectibles",           slug: "collectibles",          description: "Vintage finds and rare collectibles",            order: 6,  image_url: "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?w=400&h=400&fit=crop" },
  { id: 7,  name: "Drawing & Illustration", slug: "drawing-illustration",  description: "Original drawings and illustrations",            order: 7,  image_url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=400&fit=crop" },
  { id: 8,  name: "Photography",            slug: "photography",           description: "Fine art photography prints",                   order: 8,  image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop" },
  { id: 9,  name: "Fibre Arts",             slug: "fibre-arts",            description: "Macramé, weaving and textile art",               order: 9,  image_url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=400&fit=crop" },
  { id: 10, name: "Dolls & Miniatures",     slug: "dolls-miniatures",      description: "Handmade dolls and miniatures",                 order: 10, image_url: "https://images.unsplash.com/photo-1563396983906-b3795482a59a?w=400&h=400&fit=crop" },
  { id: 11, name: "Mixed Media & Collage",  slug: "mixed-media-collage",   description: "Multi-medium artworks",                         order: 11, image_url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop" },
  { id: 12, name: "Artist Trading Cards",   slug: "artist-trading-cards",  description: "Collectible mini artworks",                     order: 12, image_url: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=400&h=400&fit=crop" },
];

const ALL_ITEMS: ArtItem[] = [
  { id: 1,  title: "Fierce Wolves Face SVG | School Spirit Graphic | Digital Download",              slug: "fierce-wolves-svg",        price_usd: 3.37,   original_price: 3.75,   discount_pct: 10, image_url: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=600&h=600&fit=crop",  shop_name: "DigitalDenDesigns",  star_rating: 5.0, review_count: 2990,  is_star_seller: true,  is_ad: true,  has_free_delivery: false, is_on_sale: true,  is_digital_download: true,  badge_label: "Digital Download", shop_country: "United States" },
  { id: 2,  title: "Tulip 2 — Fine Art Botanical Print, Pastel Flower Wall Art",                    slug: "tulip-botanical-print",    price_usd: 100.00, original_price: null,   discount_pct: 0,  image_url: "https://images.unsplash.com/photo-1490750967868-88df5691b71e?w=600&h=600&fit=crop",  shop_name: "BloomPrintCo",       star_rating: 4.8, review_count: 312,   is_star_seller: false, is_ad: true,  has_free_delivery: false, is_on_sale: false, is_digital_download: false, badge_label: "",               shop_country: "United Kingdom" },
  { id: 3,  title: "Add Loved One to Photo — Memorial Portrait, Custom Family Painting",            slug: "memorial-portrait",        price_usd: 21.90,  original_price: 43.80,  discount_pct: 50, image_url: "https://images.unsplash.com/photo-1604480132736-44c188fe4d20?w=600&h=600&fit=crop",  shop_name: "PortraitsByAna",     star_rating: 5.0, review_count: 6736,  is_star_seller: true,  is_ad: true,  has_free_delivery: false, is_on_sale: true,  is_digital_download: true,  badge_label: "Digital Download", shop_country: "United States" },
  { id: 4,  title: "Hand-Painted Green Leaves Oil Painting — Tropical Botanical Canvas",            slug: "green-leaves-oil",         price_usd: 142.50, original_price: 190.00, discount_pct: 25, image_url: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&h=600&fit=crop",  shop_name: "LeafStudioArt",      star_rating: 4.5, review_count: 74,    is_star_seller: false, is_ad: true,  has_free_delivery: true,  is_on_sale: true,  is_digital_download: false, badge_label: "FREE delivery",  shop_country: "France" },
  { id: 5,  title: "Animal Crossing Character Button Pins Set — Cute Collectible Fan Art",          slug: "animal-crossing-pins",     price_usd: 8.50,   original_price: 12.00,  discount_pct: 29, image_url: "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?w=600&h=600&fit=crop",  shop_name: "PinPalaceShop",      star_rating: 5.0, review_count: 4821,  is_star_seller: true,  is_ad: false, has_free_delivery: true,  is_on_sale: true,  is_digital_download: false, badge_label: "",               shop_country: "Canada" },
  { id: 6,  title: "Pokémon Kawaii Sticker Sheet — 48 Holographic Mini Character Stickers",        slug: "pokemon-stickers",         price_usd: 5.99,   original_price: 7.99,   discount_pct: 25, image_url: "https://images.unsplash.com/photo-1610296669228-602fa827fc1f?w=600&h=600&fit=crop",  shop_name: "KawaiiFanArt",       star_rating: 4.9, review_count: 3150,  is_star_seller: true,  is_ad: false, has_free_delivery: false, is_on_sale: true,  is_digital_download: false, badge_label: "",               shop_country: "Japan" },
  { id: 7,  title: "Friends TV Show Figurine Set — Central Perk Sofa Diorama Collectible",         slug: "friends-figurine",         price_usd: 34.00,  original_price: 48.00,  discount_pct: 29, image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",  shop_name: "FanFigurines",       star_rating: 4.8, review_count: 1290,  is_star_seller: false, is_ad: false, has_free_delivery: false, is_on_sale: true,  is_digital_download: false, badge_label: "",               shop_country: "United States" },
  { id: 8,  title: "Handmade White Butterfly Paper Sculpture — 3D Wall Art Installation",          slug: "butterfly-sculpture",      price_usd: 55.00,  original_price: 75.00,  discount_pct: 27, image_url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=600&fit=crop",  shop_name: "PaperWingsArt",      star_rating: 4.9, review_count: 823,   is_star_seller: true,  is_ad: false, has_free_delivery: true,  is_on_sale: true,  is_digital_download: false, badge_label: "",               shop_country: "Netherlands" },
  { id: 9,  title: "Sunset Desert Stained Glass Panel — Handcut Lead & Copper Foil Art",           slug: "desert-glass",             price_usd: 89.00,  original_price: 120.00, discount_pct: 26, image_url: "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?w=600&h=600&fit=crop",  shop_name: "GlassGroveCraft",    star_rating: 5.0, review_count: 540,   is_star_seller: true,  is_ad: false, has_free_delivery: false, is_on_sale: true,  is_digital_download: false, badge_label: "",               shop_country: "United States" },
  { id: 10, title: "Handthrown Speckled Cat & Fox Stoneware Mug Pair — Woodland Ceramics",         slug: "cat-fox-mug",              price_usd: 48.00,  original_price: 65.00,  discount_pct: 26, image_url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=600&fit=crop",  shop_name: "WoodlandKilns",      star_rating: 5.0, review_count: 2104,  is_star_seller: true,  is_ad: false, has_free_delivery: true,  is_on_sale: true,  is_digital_download: false, badge_label: "",               shop_country: "Ireland" },
  { id: 11, title: "Custom Family Portrait — Illustrated Character Style, Digital File",            slug: "custom-family-portrait",   price_usd: 18.00,  original_price: 30.00,  discount_pct: 40, image_url: "https://images.unsplash.com/photo-1453733190371-0a9bedd82893?w=600&h=600&fit=crop",  shop_name: "ToonFamilyArt",      star_rating: 5.0, review_count: 8910,  is_star_seller: true,  is_ad: true,  has_free_delivery: false, is_on_sale: true,  is_digital_download: true,  badge_label: "Digital Download", shop_country: "United Kingdom" },
  { id: 12, title: "Mountain Sunrise Fine Art Photography Print — Misty Alps at Dawn",              slug: "alps-sunrise",             price_usd: 35.00,  original_price: 50.00,  discount_pct: 30, image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop",  shop_name: "AlpsLensStudio",     star_rating: 4.8, review_count: 670,   is_star_seller: false, is_ad: false, has_free_delivery: true,  is_on_sale: true,  is_digital_download: false, badge_label: "",               shop_country: "Switzerland" },
  { id: 13, title: "Boho Macramé Wall Hanging with Fringe — Large Woven Tapestry",                  slug: "boho-macrame",             price_usd: 62.00,  original_price: 85.00,  discount_pct: 27, image_url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=600&fit=crop",  shop_name: "KnotAndWeave",       star_rating: 4.9, review_count: 3300,  is_star_seller: true,  is_ad: false, has_free_delivery: true,  is_on_sale: true,  is_digital_download: false, badge_label: "",               shop_country: "Portugal" },
  { id: 14, title: "Handmade Soft Body Bunny Doll in Vintage Floral Dress — Heirloom Toy",         slug: "bunny-doll",               price_usd: 29.00,  original_price: 42.00,  discount_pct: 31, image_url: "https://images.unsplash.com/photo-1563396983906-b3795482a59a?w=600&h=600&fit=crop",  shop_name: "HeirloomDolls",      star_rating: 5.0, review_count: 1870,  is_star_seller: true,  is_ad: false, has_free_delivery: false, is_on_sale: true,  is_digital_download: false, badge_label: "",               shop_country: "United Kingdom" },
  { id: 15, title: "Abstract Mixed Media Portrait on Canvas — Layered Collage Original",            slug: "mixed-media-portrait",     price_usd: 120.00, original_price: 165.00, discount_pct: 27, image_url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop",  shop_name: "LayeredSoulArt",     star_rating: 4.9, review_count: 445,   is_star_seller: true,  is_ad: false, has_free_delivery: true,  is_on_sale: true,  is_digital_download: false, badge_label: "",               shop_country: "France" },
  { id: 16, title: "Galaxy & Cosmos Artist Trading Card Set of 10 — Original Mini Paintings",       slug: "galaxy-trading-cards",     price_usd: 22.00,  original_price: 30.00,  discount_pct: 27, image_url: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=600&h=600&fit=crop",  shop_name: "CosmicATCShop",      star_rating: 5.0, review_count: 987,   is_star_seller: true,  is_ad: false, has_free_delivery: false, is_on_sale: true,  is_digital_download: false, badge_label: "",               shop_country: "United States" },
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
function fmt(n: number) { return n >= 1000 ? `${(n / 1000).toFixed(0)}k` : n.toLocaleString(); }

function StarRating({ rating, count }: { rating: number; count: number }) {
  const full  = Math.floor(rating);
  const half  = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="flex items-center gap-0.5 mt-1">
      {Array.from({ length: full  }).map((_, i) => <svg key={`f${i}`} width="12" height="12" viewBox="0 0 24 24" fill="#F1641E"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
      {half && <svg width="12" height="12" viewBox="0 0 24 24"><defs><linearGradient id="hg-art"><stop offset="50%" stopColor="#F1641E"/><stop offset="50%" stopColor="#ddd"/></linearGradient></defs><path fill="url(#hg-art)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>}
      {Array.from({ length: empty }).map((_, i) => <svg key={`e${i}`} width="12" height="12" viewBox="0 0 24 24" fill="#ddd"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
      <span className="text-xs text-gray-500 ml-0.5">({fmt(count)})</span>
    </div>
  );
}

function SubCategoryCard({ cat }: { cat: SubCategory }) {
  return (
    <a href={`/c/art-collectibles/${cat.slug}`} className="block group text-inherit no-underline">
      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 transition-transform duration-200 group-hover:scale-[1.03] group-hover:shadow-lg">
        <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <p className="mt-2 text-[13px] font-medium text-center text-gray-800 leading-snug">{cat.name}</p>
    </a>
  );
}

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
      <button onClick={() => setOpen(v => !v)} className="flex items-center gap-1.5 px-4 py-[9px] rounded-full border-[1.5px] border-gray-900 bg-white text-sm font-semibold text-gray-900 cursor-pointer whitespace-nowrap">
        <span className="font-normal text-gray-500">Sort by:</span> {label}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d={open ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}/></svg>
      </button>
      {open && (
        <div className="absolute right-0 top-[calc(100%+6px)] bg-white border border-gray-200 rounded-xl shadow-xl z-[100] min-w-[210px] overflow-hidden">
          {SORT_OPTIONS.map(opt => (
            <button key={opt.value} onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`flex items-center justify-between w-full px-4 py-[11px] border-none text-sm text-gray-900 text-left cursor-pointer ${opt.value === sort ? 'bg-orange-50' : 'bg-white hover:bg-gray-50'}`}>
              {opt.label}
              {opt.value === sort && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F1641E" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductCard({ item }: { item: ArtItem }) {
  const [wishlisted, setWishlisted] = useState(false);
  return (
    <div className="flex flex-col">
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer group/img">
        <img src={item.image_url} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-[1.04]" loading="lazy" />
        <button onClick={(e) => { e.preventDefault(); setWishlisted(v => !v); }} aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2 right-2 w-[34px] h-[34px] rounded-full bg-white/88 border-none flex items-center justify-center cursor-pointer shadow-sm">
          <svg width="17" height="17" viewBox="0 0 24 24" fill={wishlisted ? "#e05260" : "none"} stroke={wishlisted ? "#e05260" : "#555"} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        {item.is_digital_download && (
          <div className="absolute bottom-2 left-2 bg-black/72 text-white text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Digital Download
          </div>
        )}
      </div>
      <div className="pt-2.5">
        {item.is_ad && <p className="text-[11px] text-gray-400 mb-0.5">Ad by Etsy seller</p>}
        <p className="text-sm text-gray-800 leading-snug line-clamp-2 font-normal">{item.title}</p>
        <StarRating rating={item.star_rating} count={item.review_count} />
        <div className="flex items-baseline gap-1.5 mt-1.5 flex-wrap">
          <span className="text-[15px] font-bold text-gray-900">USD {item.price_usd.toFixed(2)}</span>
          {item.original_price && <>
            <span className="text-[13px] text-gray-400 line-through">USD {item.original_price.toFixed(2)}</span>
            <span className="text-xs text-gray-500">({item.discount_pct}% off)</span>
          </>}
        </div>
        {item.has_free_delivery && <span className="inline-block mt-1 text-xs font-semibold text-green-700 bg-green-50 rounded px-1.5 py-0.5">FREE delivery</span>}
        {item.is_star_seller && (
          <div className="flex items-center gap-1 mt-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span className="text-[11px] font-bold text-white bg-purple-600 rounded px-1.5 py-0.5">Star Seller</span>
          </div>
        )}
      </div>
    </div>
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

function FilterDrawer({ open, onClose, freeDelivery, onSale, digitalDownload, shopLocation, customLocation, itemFormat, etsyPick, onApply }: {
  open: boolean; onClose: () => void; freeDelivery: boolean; onSale: boolean; digitalDownload: boolean;
  shopLocation: string; customLocation: string; itemFormat: string; etsyPick: boolean;
  onApply: (f: { freeDelivery: boolean; onSale: boolean; digitalDownload: boolean; shopLocation: string; customLocation: string; itemFormat: string; etsyPick: boolean }) => void;
}) {
  const [lFree, setLFree] = useState(freeDelivery);
  const [lSale, setLSale] = useState(onSale);
  const [lDigi, setLDigi] = useState(digitalDownload);
  const [lLoc,  setLLoc]  = useState(shopLocation);
  const [lCust, setLCust] = useState(customLocation);
  const [lFmt,  setLFmt]  = useState(itemFormat);
  const [lEtsy, setLEtsy] = useState(etsyPick);
  useEffect(() => { if (open) { setLFree(freeDelivery); setLSale(onSale); setLDigi(digitalDownload); setLLoc(shopLocation); setLCust(customLocation); setLFmt(itemFormat); setLEtsy(etsyPick); } }, [open, freeDelivery, onSale, digitalDownload, shopLocation, customLocation, itemFormat, etsyPick]);
  if (!open) return null;

  const pill = (label: string, active: boolean, toggle: () => void) => (
    <button onClick={toggle} className={`px-4 py-[7px] rounded-full border-[1.5px] text-[13px] font-semibold cursor-pointer transition-colors ${active ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-600'}`}>{label}</button>
  );
  const Radio = ({ val, cur, set }: { val: string; cur: string; set: (v: string) => void }) => (
    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
      <input type="radio" value={val} checked={cur === val} onChange={() => set(val)} className="accent-gray-900" />{val}
    </label>
  );

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/40 z-[200]" />
      <div className="fixed top-0 left-0 bottom-0 w-[360px] bg-white z-[201] overflow-y-auto pb-24 animate-[slideInDrawer_0.25s_ease]">
        <style>{`@keyframes slideInDrawer{from{transform:translateX(-100%)}to{transform:translateX(0)}}`}</style>
        <div className="flex items-center justify-between px-5 py-[18px] border-b border-gray-100">
          <h2 className="text-lg font-bold m-0">Filters</h2>
          <button onClick={onClose} className="bg-none border-none cursor-pointer text-2xl text-gray-500">×</button>
        </div>
        <div className="p-5 space-y-7">
          <div>
            <p className="text-sm font-bold mb-3 text-gray-900">Special offers</p>
            <div className="flex flex-wrap gap-2">
              {pill("FREE delivery",       lFree, () => setLFree(v => !v))}
              {pill("On sale",             lSale, () => setLSale(v => !v))}
              {pill("Digital downloads",   lDigi, () => setLDigi(v => !v))}
            </div>
          </div>
          <div>
            <p className="text-sm font-bold mb-3 text-gray-900">Shop location</p>
            <div className="space-y-2.5">
              {["Anywhere","Nigeria","Custom"].map(v => <Radio key={v} val={v} cur={lLoc} set={setLLoc} />)}
            </div>
            {lLoc === "Custom" && <input value={lCust} onChange={e => setLCust(e.target.value)} placeholder="Enter country…" className="mt-2.5 w-full px-3 py-2 rounded-lg border-[1.5px] border-gray-300 text-sm outline-none box-border" />}
          </div>
          <div>
            <p className="text-sm font-bold mb-3 text-gray-900">Item format</p>
            <div className="space-y-2.5">
              {["All","Physical items","Digital downloads"].map(v => <Radio key={v} val={v} cur={lFmt} set={setLFmt} />)}
            </div>
          </div>
          <div>
            <p className="text-sm font-bold mb-3 text-gray-900">Etsy's best</p>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={lEtsy} onChange={() => setLEtsy(v => !v)} className="accent-gray-900 w-4 h-4" />
              <span className="text-sm text-gray-700">Etsy's Pick</span>
            </label>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 w-[360px] bg-white border-t border-gray-100 px-5 py-3.5 flex gap-3 box-border">
          <button onClick={onClose} className="flex-1 py-3 rounded-full border-[1.5px] border-gray-900 bg-white text-sm font-semibold cursor-pointer">Cancel</button>
          <button onClick={() => { onApply({ freeDelivery: lFree, onSale: lSale, digitalDownload: lDigi, shopLocation: lLoc, customLocation: lCust, itemFormat: lFmt, etsyPick: lEtsy }); onClose(); }} className="flex-[2] py-3 rounded-full border-none bg-gray-900 text-white text-sm font-semibold cursor-pointer">Apply</button>
        </div>
      </div>
    </>
  );
}

export default function ArtCollectiblesPage() {
  const [showAll,          setShowAll]          = useState(false);
  const [sort,             setSort]             = useState<SortKey>("relevance");
  const [filterOpen,       setFilterOpen]       = useState(false);
  const [page,             setPage]             = useState(1);
  const [freeDelivery,     setFreeDelivery]     = useState(false);
  const [onSale,           setOnSale]           = useState(false);
  const [digitalDownload,  setDigitalDownload]  = useState(false);
  const [shopLocation,     setShopLocation]     = useState("Anywhere");
  const [customLocation,   setCustomLocation]   = useState("");
  const [itemFormat,       setItemFormat]       = useState("All");
  const [etsyPick,         setEtsyPick]         = useState(false);

  const clearAll = useCallback(() => { setFreeDelivery(false); setOnSale(false); setDigitalDownload(false); setShopLocation("Anywhere"); setCustomLocation(""); setItemFormat("All"); setEtsyPick(false); }, []);
  const handleApplyFilters = useCallback((f: { freeDelivery: boolean; onSale: boolean; digitalDownload: boolean; shopLocation: string; customLocation: string; itemFormat: string; etsyPick: boolean }) => {
    setFreeDelivery(f.freeDelivery); setOnSale(f.onSale); setDigitalDownload(f.digitalDownload); setShopLocation(f.shopLocation); setCustomLocation(f.customLocation); setItemFormat(f.itemFormat); setEtsyPick(f.etsyPick); setPage(1);
  }, []);

  const visibleCats = showAll ? SUBCATEGORIES : SUBCATEGORIES.slice(0, INITIAL_CATS);
  const filteredItems = ALL_ITEMS.filter(item => {
    if (freeDelivery && !item.has_free_delivery) return false;
    if (onSale && !item.is_on_sale) return false;
    if (digitalDownload && !item.is_digital_download) return false;
    if (etsyPick && !item.is_star_seller) return false;
    if (itemFormat === "Digital downloads" && !item.is_digital_download) return false;
    if (itemFormat === "Physical items" && item.is_digital_download) return false;
    if (shopLocation === "Custom" && customLocation) { if (!item.shop_country.toLowerCase().includes(customLocation.toLowerCase())) return false; }
    else if (shopLocation !== "Anywhere") { if (!item.shop_country.toLowerCase().includes(shopLocation.toLowerCase())) return false; }
    return true;
  });
  const sortedItems    = sortItems(filteredItems, sort);
  const paginatedItems = sortedItems.slice(0, page * ITEMS_PER_PAGE);
  const hasMore        = paginatedItems.length < sortedItems.length;
  const activeFilterCount = [freeDelivery, onSale, digitalDownload, etsyPick, shopLocation !== "Anywhere", itemFormat !== "All"].filter(Boolean).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=DM+Sans:wght@400;500;600;700&display=swap');
        .art-product-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
        @media(max-width:1100px){.art-product-grid{grid-template-columns:repeat(3,1fr)}}
        @media(max-width:768px){.art-product-grid{grid-template-columns:repeat(2,1fr)}}
        .art-cat-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:16px}
        @media(max-width:1100px){.art-cat-grid{grid-template-columns:repeat(4,1fr)}}
        @media(max-width:600px){.art-cat-grid{grid-template-columns:repeat(3,1fr)}}
        @keyframes artFadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .art-card-animate{animation:artFadeInUp 0.35s ease both}
      `}</style>

      <main className="max-w-[1280px] mx-auto px-5 pb-16">
        <header className="text-center py-9 pb-7">
          <h1 className="font-[Playfair_Display,serif] text-[clamp(28px,4vw,42px)] font-normal text-gray-900 mb-2">Art &amp; Collectibles</h1>
          <p className="text-[15px] text-gray-500">Custom artwork, portraits, and original paintings and prints</p>
        </header>

        <section aria-label="Browse art categories">
          <div className="art-cat-grid">
            {visibleCats.map((cat, i) => (
              <div key={cat.id} className="art-card-animate" style={{ animationDelay: `${i * 0.04}s` }}>
                <SubCategoryCard cat={cat} />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-7">
            <button onClick={() => setShowAll(v => !v)} aria-expanded={showAll}
              className="flex items-center gap-1.5 px-7 py-[11px] rounded-full border-[1.5px] border-gray-300 bg-white text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors">
              {showAll ? <>Show less <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 15l-6-6-6 6"/></svg></> : <>Show more ({SUBCATEGORIES.length - INITIAL_CATS}) <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg></>}
            </button>
          </div>
        </section>

        <div className="flex items-center justify-between mt-10 mb-5 flex-wrap gap-3">
          <button onClick={() => setFilterOpen(true)} aria-label="Open filters" className="relative flex items-center gap-2 px-[18px] py-[9px] rounded-full border-[1.5px] border-gray-900 bg-white text-sm font-semibold text-gray-900 cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/></svg>
            All Filters
            {activeFilterCount > 0 && <span className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full bg-[#F1641E] text-white text-[11px] font-bold flex items-center justify-center">{activeFilterCount}</span>}
          </button>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-[13px] text-gray-500">{sortedItems.length.toLocaleString()}+ items <span className="text-gray-400">with ads</span></span>
            <SortDropdown sort={sort} onChange={s => { setSort(s); setPage(1); }} />
          </div>
        </div>

        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {freeDelivery    && <Chip label="FREE delivery"     onRemove={() => setFreeDelivery(false)} />}
            {onSale          && <Chip label="On sale"           onRemove={() => setOnSale(false)} />}
            {digitalDownload && <Chip label="Digital downloads" onRemove={() => setDigitalDownload(false)} />}
            {shopLocation !== "Anywhere" && <Chip label={shopLocation === "Custom" && customLocation ? customLocation : shopLocation} onRemove={() => setShopLocation("Anywhere")} />}
            {etsyPick        && <Chip label="Etsy's Pick"       onRemove={() => setEtsyPick(false)} />}
            {itemFormat !== "All" && <Chip label={itemFormat}   onRemove={() => setItemFormat("All")} />}
            <button onClick={clearAll} className="text-[13px] text-[#F1641E] bg-none border-none cursor-pointer font-semibold py-1">Clear all</button>
          </div>
        )}

        <section aria-label="Art products" role="list">
          {sortedItems.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" className="block mx-auto mb-4"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <p className="text-base mb-2">No products match your filters</p>
              <button onClick={clearAll} className="text-[#F1641E] bg-none border-none cursor-pointer text-sm font-semibold">Clear all filters</button>
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

        {hasMore && (
          <div className="flex justify-center mt-10">
            <button onClick={() => setPage(p => p + 1)} className="px-10 py-3.5 rounded-full border-none bg-gray-900 text-white text-[15px] font-semibold cursor-pointer hover:bg-gray-700 transition-colors">Load more</button>
          </div>
        )}
      </main>

      <FilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} freeDelivery={freeDelivery} onSale={onSale} digitalDownload={digitalDownload} shopLocation={shopLocation} customLocation={customLocation} itemFormat={itemFormat} etsyPick={etsyPick} onApply={handleApplyFilters} />
    </>
  );
}