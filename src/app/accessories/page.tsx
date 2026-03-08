"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Types (mirror Django models) ────────────────────────────────────────────
interface SubCategory {
  id: number;
  name: string;
  slug: string;
  image_url: string;
  description: string;
  order: number;
}

interface AccessoryItem {
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
  badge_label: string;
  shop_country: string;
}

type SortKey = "relevance" | "lowest_price" | "highest_price" | "top_reviews" | "most_recent";

interface SortOption { value: SortKey; label: string }

// ─── Static seed data (mirrors populate_accessories.py) ──────────────────────
const SUBCATEGORIES: SubCategory[] = [
  { id: 1, name: "Hair Accessories", slug: "hair-accessories", order: 1, description: "Headbands, clips, scrunchies and more", image_url: "https://images.unsplash.com/photo-1616598271627-421debb58794?w=400&h=400&fit=crop" },
  { id: 2, name: "Patches & Appliques", slug: "patches-appliques", order: 2, description: "Iron-on and sew-on patches for clothes", image_url: "https://images.unsplash.com/photo-1589810264340-0ce2b6b96a7e?w=400&h=400&fit=crop" },
  { id: 3, name: "Scarves & Wraps", slug: "scarves-wraps", order: 3, description: "Silk, wool and cotton scarves", image_url: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=400&fit=crop" },
  { id: 4, name: "Hats & Head Coverings", slug: "hats-head-coverings", order: 4, description: "Beanies, caps, turbans and more", image_url: "https://images.unsplash.com/photo-1533055640609-24b498dfd74c?w=400&h=400&fit=crop" },
  { id: 5, name: "Pins & Clips", slug: "pins-clips", order: 5, description: "Enamel pins, brooches and clips", image_url: "https://images.unsplash.com/photo-1583394293214-0d8b4948f5d0?w=400&h=400&fit=crop" },
  { id: 6, name: "Keychains & Lanyards", slug: "keychains-lanyards", order: 6, description: "Custom keyrings and badge holders", image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop" },
  { id: 7, name: "Belts & Braces", slug: "belts-braces", order: 7, description: "Leather belts, suspenders and more", image_url: "https://images.unsplash.com/photo-1624627314873-3fc96a1ec877?w=400&h=400&fit=crop" },
  { id: 8, name: "Suit & Tie", slug: "suit-tie", order: 8, description: "Ties, cufflinks, pocket squares", image_url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop" },
  { id: 9, name: "Sunglasses & Eyewear", slug: "sunglasses-eyewear", order: 9, description: "Fashion frames and reading glasses", image_url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop" },
  { id: 10, name: "Bouquets & Corsages", slug: "bouquets-corsages", order: 10, description: "Dried and fresh floral accessories", image_url: "https://images.unsplash.com/photo-1490750967868-88df5691b71e?w=400&h=400&fit=crop" },
  { id: 11, name: "Costume Accessories", slug: "costume-accessories", order: 11, description: "Props, masks and dress-up extras", image_url: "https://images.unsplash.com/photo-1605291286356-50a6fb5f2b7c?w=400&h=400&fit=crop" },
  { id: 12, name: "Aprons", slug: "aprons", order: 12, description: "Kitchen and craft aprons", image_url: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=400&fit=crop" },
];

const ALL_ITEMS: AccessoryItem[] = [
  { id: 1, title: "Custom Embroidered Pet Photo Dad Hat", slug: "custom-pet-dad-hat", price_usd: 8.00, original_price: 19.99, discount_pct: 60, image_url: "https://images.unsplash.com/photo-1533055640609-24b498dfd74c?w=600&h=600&fit=crop", shop_name: "ODPAWS", star_rating: 5.0, review_count: 70299, is_star_seller: false, is_ad: true, has_free_delivery: false, is_on_sale: true, badge_label: "SHIPS FROM USA", shop_country: "United States" },
  { id: 2, title: "Mens Personalized Embroidered Pocket Square", slug: "mens-pocket-square", price_usd: 9.90, original_price: 19.80, discount_pct: 50, image_url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=600&fit=crop", shop_name: "PatchPerfect", star_rating: 5.0, review_count: 74, is_star_seller: true, is_ad: true, has_free_delivery: false, is_on_sale: true, badge_label: "", shop_country: "United States" },
  { id: 3, title: "Personalised Photo Keyring | Custom Picture with Gift Box", slug: "photo-keyring-gift", price_usd: 6.83, original_price: 9.11, discount_pct: 25, image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop", shop_name: "KeyMemories", star_rating: 5.0, review_count: 149, is_star_seller: false, is_ad: true, has_free_delivery: false, is_on_sale: true, badge_label: "", shop_country: "United Kingdom" },
  { id: 4, title: "US 250th Anniversary Distressed Baseball Cap 1776–2026", slug: "anniversary-baseball-cap", price_usd: 15.79, original_price: 31.58, discount_pct: 50, image_url: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=600&fit=crop", shop_name: "PatriotGear", star_rating: 4.5, review_count: 5, is_star_seller: false, is_ad: true, has_free_delivery: false, is_on_sale: true, badge_label: "", shop_country: "United States" },
  { id: 5, title: "Embroidered Sleeping Fox Umbrella — Woodland Art Piece", slug: "sleeping-fox-umbrella", price_usd: 42.99, original_price: null, discount_pct: 0, image_url: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&h=600&fit=crop", shop_name: "FoxWoodCraft", star_rating: 4.5, review_count: 1074, is_star_seller: true, is_ad: true, has_free_delivery: false, is_on_sale: false, badge_label: "", shop_country: "Japan" },
  { id: 6, title: "CUSTOM Embroidered Patch - Up To 11\" - Iron On or Sew On", slug: "custom-embroidered-patch", price_usd: 1.98, original_price: 4.40, discount_pct: 55, image_url: "https://images.unsplash.com/photo-1589810264340-0ce2b6b96a7e?w=600&h=600&fit=crop", shop_name: "EmbroideryKing", star_rating: 5.0, review_count: 21401, is_star_seller: true, is_ad: true, has_free_delivery: false, is_on_sale: true, badge_label: "", shop_country: "United States" },
  { id: 7, title: "Handmade Vintage Velvet Scrunchie Set — Jewel Tone Hair Ties", slug: "velvet-scrunchie-set", price_usd: 12.50, original_price: 20.00, discount_pct: 38, image_url: "https://images.unsplash.com/photo-1616598271627-421debb58794?w=600&h=600&fit=crop", shop_name: "VelvetBloom", star_rating: 4.8, review_count: 3412, is_star_seller: true, is_ad: false, has_free_delivery: true, is_on_sale: true, badge_label: "", shop_country: "United Kingdom" },
  { id: 8, title: "Full-Grain Leather Dress Belt — Handstitched Cognac & Tan", slug: "leather-dress-belt", price_usd: 38.00, original_price: 55.00, discount_pct: 31, image_url: "https://images.unsplash.com/photo-1624627314873-3fc96a1ec877?w=600&h=600&fit=crop", shop_name: "HideCraft", star_rating: 4.8, review_count: 789, is_star_seller: true, is_ad: false, has_free_delivery: false, is_on_sale: true, badge_label: "", shop_country: "Italy" },
  { id: 9, title: "Handmade Acetate Cat-Eye Sunglasses — UV400 Vintage Retro", slug: "cat-eye-sunglasses", price_usd: 28.50, original_price: 50.00, discount_pct: 43, image_url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=600&fit=crop", shop_name: "FramedByHand", star_rating: 4.7, review_count: 930, is_star_seller: false, is_ad: false, has_free_delivery: false, is_on_sale: true, badge_label: "", shop_country: "Portugal" },
  { id: 10, title: "Dried Flower Wedding Wrist Corsage — Bohemian Bridal Floral", slug: "dried-flower-corsage", price_usd: 22.00, original_price: 35.00, discount_pct: 37, image_url: "https://images.unsplash.com/photo-1490750967868-88df5691b71e?w=600&h=600&fit=crop", shop_name: "PetalAtelier", star_rating: 5.0, review_count: 612, is_star_seller: true, is_ad: false, has_free_delivery: true, is_on_sale: true, badge_label: "", shop_country: "France" },
  { id: 11, title: "Custom Enamel Pin — Personalised Pet Portrait Hard Lapel Pin", slug: "custom-enamel-pin", price_usd: 11.00, original_price: 15.00, discount_pct: 27, image_url: "https://images.unsplash.com/photo-1583394293214-0d8b4948f5d0?w=600&h=600&fit=crop", shop_name: "PinForge", star_rating: 4.9, review_count: 2300, is_star_seller: true, is_ad: false, has_free_delivery: false, is_on_sale: true, badge_label: "", shop_country: "Canada" },
  { id: 12, title: "Personalized Wedding Tie — Custom Embroidered Initials Gift", slug: "wedding-tie", price_usd: 22.00, original_price: 35.00, discount_pct: 37, image_url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=600&fit=crop", shop_name: "TheTieAtelier", star_rating: 5.0, review_count: 450, is_star_seller: true, is_ad: false, has_free_delivery: false, is_on_sale: true, badge_label: "", shop_country: "France" },
  { id: 13, title: "100% Cashmere Plaid Wrap Scarf — Oversized Scottish Tartan", slug: "cashmere-tartan-wrap", price_usd: 34.00, original_price: 58.00, discount_pct: 41, image_url: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=600&h=600&fit=crop", shop_name: "CashmereGlen", star_rating: 4.9, review_count: 5670, is_star_seller: true, is_ad: false, has_free_delivery: true, is_on_sale: true, badge_label: "", shop_country: "United Kingdom" },
  { id: 14, title: "Steampunk Masquerade Mask — Halloween Costume Accessory Set", slug: "masquerade-mask", price_usd: 18.99, original_price: 28.00, discount_pct: 32, image_url: "https://images.unsplash.com/photo-1605291286356-50a6fb5f2b7c?w=600&h=600&fit=crop", shop_name: "MaskSmiths", star_rating: 4.6, review_count: 887, is_star_seller: false, is_ad: false, has_free_delivery: false, is_on_sale: true, badge_label: "", shop_country: "United States" },
  { id: 15, title: "Personalised Linen Chef Apron — Custom Embroidered Name Gift", slug: "linen-chef-apron", price_usd: 29.95, original_price: 45.00, discount_pct: 33, image_url: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&h=600&fit=crop", shop_name: "KitchenStitch", star_rating: 4.9, review_count: 1203, is_star_seller: true, is_ad: false, has_free_delivery: true, is_on_sale: true, badge_label: "", shop_country: "Ireland" },
  { id: 16, title: "Handmade Rattan Claw Clip — Boho Natural Fibre Large Clamp", slug: "rattan-claw-clip", price_usd: 9.95, original_price: 14.00, discount_pct: 29, image_url: "https://images.unsplash.com/photo-1627552527750-38c8218c9503?w=600&h=600&fit=crop", shop_name: "BohoRoots", star_rating: 4.9, review_count: 1850, is_star_seller: true, is_ad: false, has_free_delivery: false, is_on_sale: true, badge_label: "", shop_country: "France" },
];

const SORT_OPTIONS: SortOption[] = [
  { value: "relevance", label: "Relevance" },
  { value: "lowest_price", label: "Lowest Price" },
  { value: "highest_price", label: "Highest Price" },
  { value: "top_reviews", label: "Top Customer Reviews" },
  { value: "most_recent", label: "Most Recent" },
];

// ─── Helper: sort items ───────────────────────────────────────────────────────
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

// ─── Helper: star rendering ──────────────────────────────────────────────────
function StarRating({ rating, count }: { rating: number; count: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 4 }}>
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f${i}`} width="12" height="12" viewBox="0 0 24 24" fill="#F1641E"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      ))}
      {half && (
        <svg width="12" height="12" viewBox="0 0 24 24"><defs><linearGradient id="hg"><stop offset="50%" stopColor="#F1641E"/><stop offset="50%" stopColor="#ddd"/></linearGradient></defs><path fill="url(#hg)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`e${i}`} width="12" height="12" viewBox="0 0 24 24" fill="#ddd"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      ))}
      <span style={{ fontSize: 12, color: "#666", marginLeft: 2 }}>
        ({count >= 1000 ? `${(count / 1000).toFixed(0)}k` : count.toLocaleString()})
      </span>
    </div>
  );
}

// ─── Filter Drawer ────────────────────────────────────────────────────────────
function FilterDrawer({
  open, onClose,
  freeDelivery, onSale,
  shopLocation, customLocation,
  itemFormat, etsyPick,
  onApply,
}: {
  open: boolean; onClose: () => void;
  freeDelivery: boolean; onSale: boolean;
  shopLocation: string; customLocation: string;
  itemFormat: string; etsyPick: boolean;
  onApply: (filters: {
    freeDelivery: boolean; onSale: boolean;
    shopLocation: string; customLocation: string;
    itemFormat: string; etsyPick: boolean;
  }) => void;
}) {
  const [localFree, setLocalFree] = useState(freeDelivery);
  const [localSale, setLocalSale] = useState(onSale);
  const [localLoc, setLocalLoc] = useState(shopLocation);
  const [localCustom, setLocalCustom] = useState(customLocation);
  const [localFormat, setLocalFormat] = useState(itemFormat);
  const [localEtsy, setLocalEtsy] = useState(etsyPick);

  useEffect(() => {
    if (open) {
      setLocalFree(freeDelivery); setLocalSale(onSale);
      setLocalLoc(shopLocation); setLocalCustom(customLocation);
      setLocalFormat(itemFormat); setLocalEtsy(etsyPick);
    }
  }, [open, freeDelivery, onSale, shopLocation, customLocation, itemFormat, etsyPick]);

  if (!open) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex" }}>
      {/* backdrop */}
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)" }} />
      {/* panel */}
      <div style={{
        position: "relative", zIndex: 1, background: "#fff", width: 340, maxWidth: "90vw",
        height: "100vh", overflowY: "auto", padding: "28px 24px 100px", boxShadow: "4px 0 24px rgba(0,0,0,0.15)"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 400, margin: 0 }}>Filters</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Filter by category */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 10, color: "#222" }}>Filter by category</p>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            border: "1.5px solid #222", borderRadius: 999, padding: "10px 16px", cursor: "pointer"
          }}>
            <span style={{ fontSize: 14, fontWeight: 500 }}>Accessories</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid #e8e8e8", marginBottom: 24 }} />

        {/* Special offers */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "#222" }}>Special offers</p>
          {[
            { label: "FREE delivery", checked: localFree, set: setLocalFree },
            { label: "On sale", checked: localSale, set: setLocalSale },
          ].map(({ label, checked, set }) => (
            <label key={label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, cursor: "pointer" }}>
              <div onClick={() => set(!checked)} style={{
                width: 18, height: 18, border: `2px solid ${checked ? "#222" : "#aaa"}`,
                borderRadius: 3, background: checked ? "#222" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
              }}>
                {checked && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>}
              </div>
              <span style={{ fontSize: 14, color: "#333" }}>{label}</span>
            </label>
          ))}
        </div>

        <hr style={{ border: "none", borderTop: "1px solid #e8e8e8", marginBottom: 24 }} />

        {/* Shop Location */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "#222" }}>Shop Location</p>
          {["Anywhere", "Nigeria", "Custom"].map(loc => (
            <label key={loc} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, cursor: "pointer" }}>
              <div onClick={() => setLocalLoc(loc)} style={{
                width: 18, height: 18, borderRadius: "50%", border: `2px solid ${localLoc === loc ? "#222" : "#aaa"}`,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
              }}>
                {localLoc === loc && <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#222" }} />}
              </div>
              <span style={{ fontSize: 14, color: "#333" }}>{loc}</span>
            </label>
          ))}
          {localLoc === "Custom" && (
            <input
              value={localCustom}
              onChange={e => setLocalCustom(e.target.value)}
              placeholder="Enter location"
              style={{
                width: "100%", marginTop: 6, padding: "9px 14px",
                border: "1.5px solid #ddd", borderRadius: 6, fontSize: 14,
                outline: "none", boxSizing: "border-box"
              }}
            />
          )}
        </div>

        <hr style={{ border: "none", borderTop: "1px solid #e8e8e8", marginBottom: 24 }} />

        {/* Item format */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "#222" }}>Item format</p>
          {["All", "Physical items", "Digital downloads"].map(fmt => (
            <label key={fmt} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, cursor: "pointer" }}>
              <div onClick={() => setLocalFormat(fmt)} style={{
                width: 18, height: 18, borderRadius: "50%", border: `2px solid ${localFormat === fmt ? "#222" : "#aaa"}`,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
              }}>
                {localFormat === fmt && <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#222" }} />}
              </div>
              <span style={{ fontSize: 14, color: "#333" }}>{fmt}</span>
            </label>
          ))}
        </div>

        <hr style={{ border: "none", borderTop: "1px solid #e8e8e8", marginBottom: 24 }} />

        {/* Etsy's best */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "#222" }}>Etsy's best</p>
          <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <div onClick={() => setLocalEtsy(!localEtsy)} style={{
              width: 18, height: 18, border: `2px solid ${localEtsy ? "#222" : "#aaa"}`,
              borderRadius: 3, background: localEtsy ? "#222" : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
            }}>
              {localEtsy && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>}
            </div>
            <span style={{ fontSize: 14, color: "#333" }}>Etsy's Pick</span>
          </label>
        </div>

        {/* Footer buttons */}
        <div style={{
          position: "fixed", bottom: 0, left: 0, width: 340, maxWidth: "90vw",
          padding: "16px 24px", background: "#fff", borderTop: "1px solid #e8e8e8",
          display: "flex", gap: 12
        }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "13px 0", borderRadius: 999, border: "1.5px solid #222",
            background: "transparent", fontSize: 15, fontWeight: 600, cursor: "pointer", color: "#222"
          }}>Cancel</button>
          <button onClick={() => { onApply({ freeDelivery: localFree, onSale: localSale, shopLocation: localLoc, customLocation: localCustom, itemFormat: localFormat, etsyPick: localEtsy }); onClose(); }} style={{
            flex: 1, padding: "13px 0", borderRadius: 999, border: "none",
            background: "#222", color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer"
          }}>Apply</button>
        </div>
      </div>
    </div>
  );
}

// ─── Sort Dropdown ────────────────────────────────────────────────────────────
function SortDropdown({ sort, onChange }: { sort: SortKey; onChange: (s: SortKey) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const current = SORT_OPTIONS.find(o => o.value === sort)!;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(v => !v)} style={{
        display: "flex", alignItems: "center", gap: 6, padding: "9px 16px",
        border: "1.5px solid #222", borderRadius: 999, background: "#fff",
        fontSize: 14, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap"
      }}>
        <span style={{ color: "#666" }}>Sort by: </span>
        <span style={{ fontWeight: 700, color: "#222" }}>{current.label}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      {open && (
        <div style={{
          position: "absolute", right: 0, top: "calc(100% + 6px)", zIndex: 200,
          background: "#fff", border: "1.5px solid #e0e0e0", borderRadius: 10,
          boxShadow: "0 8px 32px rgba(0,0,0,0.14)", minWidth: 220, overflow: "hidden"
        }}>
          {SORT_OPTIONS.map(opt => (
            <button key={opt.value} onClick={() => { onChange(opt.value); setOpen(false); }} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              width: "100%", padding: "13px 18px", border: "none",
              background: opt.value === sort ? "#f7f7f7" : "#fff",
              fontSize: 14, cursor: "pointer", textAlign: "left",
              color: "#222", fontFamily: "inherit",
              borderBottom: "1px solid #f0f0f0"
            }}>
              {opt.label}
              {opt.value === sort && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ item }: { item: AccessoryItem }) {
  const [wishlist, setWishlist] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <article style={{ cursor: "pointer", position: "relative" }} role="listitem">
      {/* Image */}
      <div style={{
        position: "relative", overflow: "hidden", borderRadius: 4,
        background: "#f0f0f0", paddingBottom: "100%",
        transition: "transform 0.2s ease"
      }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.01)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>

        <img
          src={item.image_url}
          alt={item.title}
          onLoad={() => setImgLoaded(true)}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", borderRadius: 4,
            opacity: imgLoaded ? 1 : 0, transition: "opacity 0.3s ease"
          }}
        />

        {/* Shop badge top-left */}
        {item.badge_label && (
          <div style={{
            position: "absolute", top: 8, left: 8,
            background: "rgba(255,255,255,0.92)", borderRadius: 4,
            padding: "3px 7px", fontSize: 10, fontWeight: 700,
            color: "#333", letterSpacing: "0.04em", backdropFilter: "blur(4px)"
          }}>{item.badge_label}</div>
        )}
        {item.shop_name === "ODPAWS" && !item.badge_label && (
          <div style={{
            position: "absolute", top: 8, left: 8, background: "rgba(255,255,255,0.92)",
            borderRadius: 4, padding: "3px 7px", fontSize: 10, fontWeight: 700, color: "#333"
          }}>ODPAWS</div>
        )}

        {/* Wishlist heart */}
        <button
          onClick={e => { e.stopPropagation(); setWishlist(v => !v); }}
          aria-label={wishlist ? "Remove from wishlist" : "Add to wishlist"}
          style={{
            position: "absolute", top: 8, right: 8, width: 32, height: 32,
            borderRadius: "50%", background: "rgba(255,255,255,0.9)",
            border: "none", cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center",
            boxShadow: "0 1px 4px rgba(0,0,0,0.15)"
          }}>
          <svg width="16" height="16" viewBox="0 0 24 24"
            fill={wishlist ? "#F1641E" : "none"} stroke={wishlist ? "#F1641E" : "#555"} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      {/* Info */}
      <div style={{ paddingTop: 8 }}>
        <p style={{
          fontSize: 13, color: "#333", lineHeight: 1.4,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
          overflow: "hidden", marginBottom: 4, minHeight: 36
        }}>{item.title}</p>

        <StarRating rating={item.star_rating} count={item.review_count} />

        {/* Star Seller badge */}
        {item.is_star_seller && (
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 4 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#7B5BF7"><circle cx="12" cy="12" r="10"/><path d="M12 2l2.09 6.26H20L15 12.14l1.91 5.86L12 14.77 7.09 18l1.91-5.86L4 8.26h5.91z" fill="#fff"/></svg>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#5631b4" }}>Star Seller</span>
          </div>
        )}

        {/* Price */}
        <div style={{ marginTop: 5, display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#222" }}>
            USD {item.price_usd.toFixed(2)}
          </span>
          {item.original_price && (
            <>
              <span style={{ fontSize: 12, color: "#888", textDecoration: "line-through" }}>
                USD {item.original_price.toFixed(2)}
              </span>
              <span style={{ fontSize: 12, color: "#555" }}>
                ({item.discount_pct}% off)
              </span>
            </>
          )}
        </div>

        {/* Ad label */}
        {item.is_ad && (
          <p style={{ fontSize: 11, color: "#888", marginTop: 3 }}>Ad by Etsy seller</p>
        )}

        {/* Free delivery */}
        {item.has_free_delivery && (
          <p style={{ fontSize: 12, color: "#3a8a3a", fontWeight: 600, marginTop: 2 }}>FREE delivery</p>
        )}
      </div>
    </article>
  );
}

// ─── Sub-category card ────────────────────────────────────────────────────────
function SubCategoryCard({ cat }: { cat: SubCategory }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={`/accessories/${cat.slug}`}
      aria-label={cat.name}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div style={{
          width: "100%", paddingBottom: "100%", position: "relative",
          borderRadius: 6, overflow: "hidden", background: "#f0f0f0",
          transform: hovered ? "scale(1.02)" : "scale(1)",
          transition: "transform 0.2s ease", boxShadow: hovered ? "0 4px 16px rgba(0,0,0,0.13)" : "none"
        }}>
          <img src={cat.image_url} alt={cat.name} style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover"
          }} />
        </div>
        <p style={{
          marginTop: 10, fontSize: 13, fontWeight: 500, textAlign: "center",
          lineHeight: 1.3, color: "#222", maxWidth: "95%"
        }}>{cat.name}</p>
      </div>
    </a>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AccessoriesPage() {
  // State
  const [showAll, setShowAll] = useState(false);
  const [sort, setSort] = useState<SortKey>("relevance");
  const [filterOpen, setFilterOpen] = useState(false);
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [shopLocation, setShopLocation] = useState("Anywhere");
  const [customLocation, setCustomLocation] = useState("");
  const [itemFormat, setItemFormat] = useState("All");
  const [etsyPick, setEtsyPick] = useState(false);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  // First 6 always visible, rest toggleable
  const INITIAL_SHOW = 6;
  const visibleCats = showAll ? SUBCATEGORIES : SUBCATEGORIES.slice(0, INITIAL_SHOW);
  const hiddenCount = SUBCATEGORIES.length - INITIAL_SHOW;

  // Filter + sort products
  const filteredItems = ALL_ITEMS.filter(item => {
    if (freeDelivery && !item.has_free_delivery) return false;
    if (onSale && !item.is_on_sale) return false;
    if (shopLocation !== "Anywhere" && shopLocation !== "Custom") {
      if (!item.shop_country.toLowerCase().includes(shopLocation.toLowerCase())) return false;
    }
    if (etsyPick && !item.is_star_seller) return false;
    if (itemFormat === "Digital downloads") return false;
    return true;
  });

  const sortedItems = sortItems(filteredItems, sort);
  const paginatedItems = sortedItems.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = paginatedItems.length < sortedItems.length;

  const activeFilterCount = [freeDelivery, onSale, shopLocation !== "Anywhere", etsyPick, itemFormat !== "All"].filter(Boolean).length;

  const handleApplyFilters = useCallback((f: { freeDelivery: boolean; onSale: boolean; shopLocation: string; customLocation: string; itemFormat: string; etsyPick: boolean }) => {
    setFreeDelivery(f.freeDelivery);
    setOnSale(f.onSale);
    setShopLocation(f.shopLocation);
    setCustomLocation(f.customLocation);
    setItemFormat(f.itemFormat);
    setEtsyPick(f.etsyPick);
    setPage(1);
  }, []);

  // Reset page when sort changes
  useEffect(() => { setPage(1); }, [sort]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }
        html { scroll-behavior: smooth; }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px 16px;
        }
        @media (max-width: 1100px) { .product-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px)  { .product-grid { grid-template-columns: repeat(2, 1fr); } }

        .cat-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
        }
        @media (max-width: 1100px) { .cat-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 600px)  { .cat-grid { grid-template-columns: repeat(3, 1fr); } }

        .show-more-btn:hover { background: #f5f5f5 !important; }
        .load-more-btn:hover { background: #111 !important; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card-animate { animation: fadeInUp 0.35s ease both; }
      `}</style>

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 60px" }}>

        {/* ── Hero heading ───────────────────────────────────── */}
        <header style={{ textAlign: "center", padding: "36px 0 28px" }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 400, color: "#111", marginBottom: 8 }}>
            Accessories
          </h1>
          <p style={{ fontSize: 15, color: "#666", letterSpacing: "0.01em" }}>
            Scarves, hats and hair accessories that tie it all together
          </p>
        </header>

        {/* ── Sub-category grid ──────────────────────────────── */}
        <section aria-label="Browse accessory categories">
          <div className="cat-grid">
            {visibleCats.map((cat, i) => (
              <div key={cat.id} className="card-animate" style={{ animationDelay: `${i * 0.04}s` }}>
                <SubCategoryCard cat={cat} />
              </div>
            ))}
          </div>

          {/* Show more / Show less */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
            <button
              className="show-more-btn"
              onClick={() => setShowAll(v => !v)}
              aria-expanded={showAll}
              style={{
                padding: "11px 28px", borderRadius: 999,
                border: "1.5px solid #ddd", background: "#fff",
                fontSize: 14, fontWeight: 600, cursor: "pointer",
                color: "#333", display: "flex", alignItems: "center", gap: 6,
                transition: "background 0.15s ease", fontFamily: "inherit"
              }}>
              {showAll ? (
                <>Show less <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 15l-6-6-6 6"/></svg></>
              ) : (
                <>Show more ({hiddenCount}) <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg></>
              )}
            </button>
          </div>
        </section>

        {/* ── Toolbar ────────────────────────────────────────── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginTop: 40, marginBottom: 20, flexWrap: "wrap", gap: 12
        }}>
          {/* Left: filters button */}
          <button
            onClick={() => setFilterOpen(true)}
            aria-label="Open filters"
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "9px 18px", borderRadius: 999,
              border: "1.5px solid #222", background: "#fff",
              fontSize: 14, fontWeight: 600, cursor: "pointer",
              color: "#222", fontFamily: "inherit", position: "relative"
            }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>
            </svg>
            All Filters
            {activeFilterCount > 0 && (
              <span style={{
                position: "absolute", top: -6, right: -6, width: 18, height: 18,
                borderRadius: "50%", background: "#F1641E", color: "#fff",
                fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center"
              }}>{activeFilterCount}</span>
            )}
          </button>

          {/* Right: item count + sort */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, color: "#666" }}>
              {sortedItems.length.toLocaleString()}+ items
              <span style={{ color: "#999", marginLeft: 4 }}>with ads</span>
              <span style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 16, height: 16, borderRadius: "50%", border: "1px solid #aaa",
                fontSize: 10, color: "#888", marginLeft: 4, cursor: "pointer"
              }}>?</span>
            </span>
            <SortDropdown sort={sort} onChange={(s) => { setSort(s); setPage(1); }} />
          </div>
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {freeDelivery && (
              <span style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 999, background: "#f0f0f0", fontSize: 13, fontWeight: 500 }}>
                FREE delivery
                <button onClick={() => setFreeDelivery(false)} style={{ background: "none", border: "none", cursor: "pointer", lineHeight: 1, color: "#555", fontSize: 16 }}>×</button>
              </span>
            )}
            {onSale && (
              <span style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 999, background: "#f0f0f0", fontSize: 13, fontWeight: 500 }}>
                On sale
                <button onClick={() => setOnSale(false)} style={{ background: "none", border: "none", cursor: "pointer", lineHeight: 1, color: "#555", fontSize: 16 }}>×</button>
              </span>
            )}
            {shopLocation !== "Anywhere" && (
              <span style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 999, background: "#f0f0f0", fontSize: 13, fontWeight: 500 }}>
                {shopLocation === "Custom" && customLocation ? customLocation : shopLocation}
                <button onClick={() => setShopLocation("Anywhere")} style={{ background: "none", border: "none", cursor: "pointer", lineHeight: 1, color: "#555", fontSize: 16 }}>×</button>
              </span>
            )}
            {etsyPick && (
              <span style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 999, background: "#f0f0f0", fontSize: 13, fontWeight: 500 }}>
                Etsy's Pick
                <button onClick={() => setEtsyPick(false)} style={{ background: "none", border: "none", cursor: "pointer", lineHeight: 1, color: "#555", fontSize: 16 }}>×</button>
              </span>
            )}
            {itemFormat !== "All" && (
              <span style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 999, background: "#f0f0f0", fontSize: 13, fontWeight: 500 }}>
                {itemFormat}
                <button onClick={() => setItemFormat("All")} style={{ background: "none", border: "none", cursor: "pointer", lineHeight: 1, color: "#555", fontSize: 16 }}>×</button>
              </span>
            )}
            <button onClick={() => { setFreeDelivery(false); setOnSale(false); setShopLocation("Anywhere"); setEtsyPick(false); setItemFormat("All"); }} style={{ fontSize: 13, color: "#F1641E", background: "none", border: "none", cursor: "pointer", fontWeight: 600, padding: "5px 0" }}>
              Clear all
            </button>
          </div>
        )}

        {/* ── Product grid ───────────────────────────────────── */}
        <section aria-label="Accessory products" role="list">
          {sortedItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#888" }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" style={{ display: "block", margin: "0 auto 16px" }}>
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <p style={{ fontSize: 16, marginBottom: 8 }}>No products match your filters</p>
              <button onClick={() => { setFreeDelivery(false); setOnSale(false); setShopLocation("Anywhere"); setEtsyPick(false); setItemFormat("All"); }} style={{ color: "#F1641E", background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {paginatedItems.map((item, i) => (
                <div key={item.id} className="card-animate" style={{ animationDelay: `${(i % ITEMS_PER_PAGE) * 0.05}s` }}>
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
              className="load-more-btn"
              onClick={() => setPage(p => p + 1)}
              style={{
                padding: "13px 40px", borderRadius: 999, border: "none",
                background: "#222", color: "#fff", fontSize: 15, fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit", transition: "background 0.15s ease"
              }}>
              Load more
            </button>
          </div>
        )}
      </main>

      {/* Filter drawer */}
      <FilterDrawer
        open={filterOpen} onClose={() => setFilterOpen(false)}
        freeDelivery={freeDelivery} onSale={onSale}
        shopLocation={shopLocation} customLocation={customLocation}
        itemFormat={itemFormat} etsyPick={etsyPick}
        onApply={handleApplyFilters}
      />
    </>
  );
}