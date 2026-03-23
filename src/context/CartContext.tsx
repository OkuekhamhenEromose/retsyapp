'use client';

import React, {
  createContext, useContext, useState, useEffect, useCallback,
} from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface CartItemPersonalization {
  field_name: string;
  value: string;
}

export interface CartItem {
  client_id:           string;   // stable React key (local uuid)
  id:                  number | null; // server id (null until synced)
  product_id:          number;
  product_name:        string;
  product_slug:        string;
  product_image:       string;
  quantity:            number;
  price_per_unit:      number;
  original_price:      number | null;
  discount_percentage: number;
  subtotal:            number;
  total_savings:       number;
  variant_id:          number | null;
  variant_color:       string;
  variant_design:      string;
  variant_color_code:  string;
  seller_id:           number;
  seller_name:         string;
  seller_rating:       number;
  seller_review_count: number;
  personalizations:    CartItemPersonalization[];
  added_at:            string;
  sale_ends_in?:       { hours: number; minutes: number; seconds: number } | null;
}

export interface CartGroup {
  seller_id:          number;
  seller_name:        string;
  seller_rating:      number;
  seller_review_count: number;
  items:              CartItem[];
  subtotal:           number;
  shipping_cost:      number;
  estimated_delivery: { min: number; max: number; display: string };
  is_gift:            boolean;
}

export interface CartSummary {
  groups:            CartGroup[];
  total_items:       number;
  subtotal:          number;
  total_discount:    number;
  total_shipping:    number;
  grand_total:       number;
  applied_discounts: { code: string; amount: number; description: string }[];
}

export interface AddToCartPayload {
  product_id:          number;
  product_name:        string;
  product_slug:        string;
  product_image:       string;
  price_per_unit:      number;
  original_price?:     number | null;
  discount_percentage?: number;
  quantity?:           number;
  variant_id?:         number | null;
  variant_color?:      string;
  variant_design?:     string;
  variant_color_code?: string;
  seller_id?:          number;
  seller_name?:        string;
  seller_rating?:      number;
  seller_review_count?: number;
  personalizations?:   CartItemPersonalization[];
}

interface CartContextValue {
  cart:           CartSummary;
  loading:        boolean;
  addToCart:      (p: AddToCartPayload) => Promise<{ success: boolean; error?: string }>;
  removeItem:     (clientId: string)    => Promise<void>;
  updateQuantity: (clientId: string, qty: number) => Promise<void>;
  refreshCart:    ()                    => Promise<void>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function buildSummary(items: CartItem[]): CartSummary {
  const bySellerMap = new Map<number, CartGroup>();

  for (const item of items) {
    const sid = item.seller_id ?? 0;
    if (!bySellerMap.has(sid)) {
      bySellerMap.set(sid, {
        seller_id:           sid,
        seller_name:         item.seller_name || 'Shop',
        seller_rating:       item.seller_rating ?? 0,
        seller_review_count: item.seller_review_count ?? 0,
        items:               [],
        subtotal:            0,
        shipping_cost:       4.87,
        estimated_delivery:  { min: 1, max: 13, display: 'Get it by 01-13 Apr' },
        is_gift:             false,
      });
    }
    const g = bySellerMap.get(sid)!;
    g.items.push(item);
    g.subtotal += item.price_per_unit * item.quantity;
  }

  const groups        = Array.from(bySellerMap.values());
  const fullPrice     = items.reduce((s, i) => s + (i.original_price ?? i.price_per_unit) * i.quantity, 0);
  const salePrice     = items.reduce((s, i) => s + i.price_per_unit * i.quantity, 0);
  const total_discount = fullPrice - salePrice;
  const total_shipping = groups.reduce((s, g) => s + g.shipping_cost, 0);

  return {
    groups,
    total_items:       items.reduce((s, i) => s + i.quantity, 0),
    subtotal:          fullPrice,
    total_discount,
    total_shipping,
    grand_total:       salePrice + total_shipping,
    applied_discounts: [],
  };
}

const STORAGE_KEY = 'etsy_cart_v2';

function loadStored(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as CartItem[]; } catch { return []; }
}
function persist(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch { /* noop */ }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items,   setItems]   = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api';

  // Hydrate from localStorage once
  useEffect(() => {
    const stored = loadStored();
    if (stored.length) setItems(stored);
  }, []);

  // Persist on every change
  useEffect(() => { persist(items); }, [items]);

  // ── refreshCart ─────────────────────────────────────────────────────────────
  const refreshCart = useCallback(async () => {
    try {
      const res = await fetch(`${API}/cart/enhanced/`, { credentials: 'include' });
      if (!res.ok) return;
      const data = await res.json();
      const serverItems: CartItem[] = [];
      for (const g of (data.groups ?? [])) {
        for (const si of (g.items ?? [])) {
          serverItems.push({
            client_id:           si.id?.toString() ?? uid(),
            id:                  si.id ?? null,
            product_id:          si.product ?? 0,
            product_name:        si.product_name ?? '',
            product_slug:        si.product_slug ?? '',
            product_image:       si.product_image ?? '',
            quantity:            si.quantity ?? 1,
            price_per_unit:      parseFloat(si.price_per_unit) || 0,
            original_price:      si.original_price ? parseFloat(si.original_price) : null,
            discount_percentage: si.discount_percentage ?? 0,
            subtotal:            parseFloat(si.subtotal) || 0,
            total_savings:       parseFloat(si.total_savings) || 0,
            variant_id:          si.variant ?? null,
            variant_color:       si.variant_color ?? '',
            variant_design:      si.variant_design ?? '',
            variant_color_code:  si.variant_color_code ?? '',
            seller_id:           g.seller_id ?? 0,
            seller_name:         g.seller_name ?? '',
            seller_rating:       g.seller_rating ?? 0,
            seller_review_count: g.seller_review_count ?? 0,
            personalizations:    si.personalizations ?? [],
            added_at:            si.added_at ?? new Date().toISOString(),
            sale_ends_in:        (si.discount_percentage > 0)
              ? { hours: 20, minutes: 11, seconds: 15 } : null,
          });
        }
      }
      setItems(serverItems);
    } catch { /* keep local state */ }
  }, [API]);

  // ── addToCart ───────────────────────────────────────────────────────────────
  const addToCart = useCallback(async (
    p: AddToCartPayload,
  ): Promise<{ success: boolean; error?: string }> => {
    const {
      product_id, product_name, product_slug, product_image,
      price_per_unit, original_price = null, discount_percentage = 0,
      quantity = 1, variant_id = null, variant_color = '', variant_design = '',
      variant_color_code = '', seller_id = 0, seller_name = 'Shop',
      seller_rating = 0, seller_review_count = 0, personalizations = [],
    } = p;

    const clientId = uid();

    const newItem: CartItem = {
      client_id: clientId, id: null,
      product_id, product_name, product_slug, product_image,
      quantity, price_per_unit,
      original_price: original_price ?? null,
      discount_percentage,
      subtotal:     price_per_unit * quantity,
      total_savings: original_price ? (original_price - price_per_unit) * quantity : 0,
      variant_id, variant_color, variant_design, variant_color_code,
      seller_id, seller_name, seller_rating, seller_review_count,
      personalizations,
      added_at:  new Date().toISOString(),
      sale_ends_in: discount_percentage > 0
        ? { hours: 20, minutes: 11, seconds: 15 } : null,
    };

    // ── Optimistic: item appears in basket immediately ─────────────────────
    setItems(prev => {
      const existIdx = prev.findIndex(
        i => i.product_slug === product_slug && i.variant_id === variant_id,
      );
      if (existIdx >= 0) {
        return prev.map((item, idx) =>
          idx === existIdx
            ? { ...item, quantity: item.quantity + quantity,
                subtotal: item.price_per_unit * (item.quantity + quantity) }
            : item,
        );
      }
      return [...prev, newItem];
    });

    // ── Background sync ────────────────────────────────────────────────────
    try {
      const res = await fetch(`${API}/cart/add-enhanced/${product_slug}/`, {
        method:      'POST',
        headers:     { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          quantity,
          variant_id:      variant_id ?? undefined,
          personalizations,
        }),
      });

      if (!res.ok && res.status >= 400) {
        const errData = await res.json().catch(() => ({}));
        setItems(prev => prev.filter(i => i.client_id !== clientId));
        return { success: false, error: errData.error ?? 'Failed to add item' };
      }

      await refreshCart(); // sync server ids + pricing
      return { success: true };
    } catch {
      // Network down → keep optimistic item
      return { success: true };
    }
  }, [API, refreshCart]);

  // ── removeItem ──────────────────────────────────────────────────────────────
  const removeItem = useCallback(async (clientId: string) => {
    const item = items.find(i => i.client_id === clientId);
    setItems(prev => prev.filter(i => i.client_id !== clientId));
    if (item?.id) {
      try {
        await fetch(`${API}/cart/item/${item.id}/`, {
          method: 'PATCH', headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ action: 'remove' }),
        });
      } catch { /* noop */ }
    }
  }, [API, items]);

  // ── updateQuantity ──────────────────────────────────────────────────────────
  const updateQuantity = useCallback(async (clientId: string, qty: number) => {
    if (qty < 1) { removeItem(clientId); return; }
    setItems(prev =>
      prev.map(i => i.client_id === clientId
        ? { ...i, quantity: qty, subtotal: i.price_per_unit * qty }
        : i,
      ),
    );
    const item = items.find(i => i.client_id === clientId);
    if (item?.id) {
      try {
        await fetch(`${API}/cart/item/${item.id}/`, {
          method: 'PATCH', headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ action: 'update', quantity: qty }),
        });
      } catch { /* noop */ }
    }
  }, [API, items, removeItem]);

  const cart = buildSummary(items);

  return (
    <CartContext.Provider
      value={{ cart, loading, addToCart, removeItem, updateQuantity, refreshCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}