// CartContext.tsx - COMPLETELY UPDATED with cart ID tracking

'use client';

import React, {
  createContext, useContext, useState, useEffect, useCallback, useRef,
} from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface CartItemPersonalization {
  field_name: string;
  value: string;
}

export interface CartItem {
  client_id:           string;
  id:                  number | null;
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
  groups:             CartGroup[];
  total_items:        number;
  subtotal:           number;
  total_discount:     number;
  total_shipping:     number;
  grand_total:        number;
  applied_discounts:  { code: string; amount: number; description: string }[];
  cart_id?:           number | null;  // Add cart_id
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
  removeItem:     (clientId: string)   => Promise<void>;
  updateQuantity: (clientId: string, qty: number) => Promise<void>;
  refreshCart:    ()                   => Promise<void>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function buildSummary(items: CartItem[], cartId?: number | null): CartSummary {
  const bySellerMap = new Map<number, CartGroup>();
  for (const item of items) {
    const sid = item.seller_id ?? 0;
    if (!bySellerMap.has(sid)) {
      bySellerMap.set(sid, {
        seller_id:           sid,
        seller_name:         item.seller_name  || 'Shop',
        seller_rating:       item.seller_rating       ?? 0,
        seller_review_count: item.seller_review_count ?? 0,
        items:               [],
        subtotal:            0,
        shipping_cost:       4.87,
        estimated_delivery:  { min: 1, max: 13, display: 'Get it by 01–13 Apr' },
        is_gift:             false,
      });
    }
    const g = bySellerMap.get(sid)!;
    g.items.push(item);
    g.subtotal += item.price_per_unit * item.quantity;
  }
  const groups         = Array.from(bySellerMap.values());
  const fullPrice      = items.reduce((s, i) => s + (i.original_price ?? i.price_per_unit) * i.quantity, 0);
  const salePrice      = items.reduce((s, i) => s + i.price_per_unit * i.quantity, 0);
  const total_discount = fullPrice - salePrice;
  const total_shipping = groups.reduce((s, g) => s + g.shipping_cost, 0);
  return {
    groups,
    total_items:      items.reduce((s, i) => s + i.quantity, 0),
    subtotal:         fullPrice,
    total_discount,
    total_shipping,
    grand_total:      salePrice + total_shipping,
    applied_discounts: [],
    cart_id:          cartId,  // Add cart_id to summary
  };
}

// ── localStorage helpers ──────────────────────────────────────────────────────────────
const STORAGE_KEY = 'etsy_cart_v2';
const CART_ID_KEY = 'etsy_cart_id';

function loadStored(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch (e) {
    console.error('[CartContext] Failed to load stored items', e);
  }
  return [];
}

function loadCartId(): number | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(CART_ID_KEY);
    if (stored) {
      const id = parseInt(stored, 10);
      return isNaN(id) ? null : id;
    }
  } catch { }
  return null;
}

function persistCartId(cartId: number | null) {
  if (typeof window === 'undefined') return;
  if (cartId) {
    localStorage.setItem(CART_ID_KEY, String(cartId));
  } else {
    localStorage.removeItem(CART_ID_KEY);
  }
}

function persist(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  try { 
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    console.log('[CartContext] Persisted', items.length, 'items to localStorage');
  }
  catch { /* storage full */ }
}

// ── CSRF ──────────────────────────────────────────────────────────────────────
function getCsrf(): string {
  if (typeof document === 'undefined') return '';
  const m = document.cookie.match(/(?:^|;\s*)csrftoken=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : '';
}

// ── Fetch wrapper with JWT token ─────────────────────────────────────────────
async function apiFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const csrf = getCsrf();
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(csrf ? { 'X-CSRFToken': csrf } : {}),
    ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}),
    ...(options.headers ?? {}),
  };
  
  return fetch(url, {
    ...options,
    credentials: 'include',
    headers,
  });
}

// ─── Context ──────────────────────────────────────────────────────────────────
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [serverEnabled, setServerEnabled] = useState(true);
  // Initialize cartId from localStorage
  const [cartId, setCartId] = useState<number | null>(() => loadCartId());  
  const initialLoadDone = useRef(false);

  const API = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api').replace(/\/$/, '');

  // ── 1. Load from localStorage on mount (immediate, no server wait) ────────
  useEffect(() => {
    const stored = loadStored();
    console.log('[CartContext] Loaded from localStorage:', stored.length, 'items');
    if (stored.length) {
      setItems(stored);
    }
    setLoading(false);
    initialLoadDone.current = true;
  }, []);

  // ── 2. Persist to localStorage whenever items change ───────────────────────
  useEffect(() => {
    if (initialLoadDone.current) {
      persist(items);
    }
  }, [items]);

  // ── 3. Save cartId to localStorage whenever it changes ─────────────────────
  useEffect(() => {
    persistCartId(cartId);
  }, [cartId]);

  // ── 4. Background sync with server (runs after initial load) ───────────────
  const syncWithServer = useCallback(async () => {
    if (!serverEnabled) return;
    
    try {
      console.log('[CartContext] Syncing with server...');
      const res = await apiFetch(`${API}/cart/enhanced/`);
      
      if (res.status === 404) {
        console.warn('[CartContext] /cart/enhanced/ not found (404) - server may not have cart endpoints');
        setServerEnabled(false);
        return;
      }
      
      if (res.status === 401 || res.status === 403) {
        console.log('[CartContext] Server requires auth, using local-only mode');
        setServerEnabled(false);
        return;
      }
      
      if (!res.ok) {
        console.warn('[CartContext] Server sync failed:', res.status);
        return;
      }
      
      const data = await res.json();
      console.log('[CartContext] Server response:', data);
      
      // Store cart ID from server
      if (data.id) {
        console.log('[CartContext] Setting cart ID from server:', data.id);
        setCartId(data.id);
      }
      
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
            sale_ends_in: si.discount_percentage > 0
              ? { hours: 20, minutes: 11, seconds: 15 } : null,
          });
        }
      }
      
      // Merge: server items take precedence, but keep local items that aren't on server
      const mergedItems = [...serverItems];
      for (const localItem of items) {
        const exists = mergedItems.some(
          si => si.product_slug === localItem.product_slug && 
                si.variant_id === localItem.variant_id
        );
        if (!exists && localItem.id === null) {
          mergedItems.push(localItem);
        }
      }
      
      if (mergedItems.length !== items.length) {
        console.log('[CartContext] Synced with server, updated items:', mergedItems.length);
        setItems(mergedItems);
      }
    } catch (err) {
      console.warn('[CartContext] Server sync network error:', err);
    }
  }, [API, serverEnabled, items]);

  // ── Run sync after initial load ────────────────────────────────────────────
  useEffect(() => {
    if (initialLoadDone.current) {
      syncWithServer();
    }
  }, [syncWithServer]);

  // ── refreshCart - public method to force sync ──────────────────────────────
  const refreshCart = useCallback(async () => {
    setLoading(true);
    try {
      await syncWithServer();
    } finally {
      setLoading(false);
    }
  }, [syncWithServer]);

  // ── addToCart (optimistic) ─────────────────────────────────────────────────
  const addToCart = useCallback(async (
    p: AddToCartPayload,
  ): Promise<{ success: boolean; error?: string }> => {
    const {
      product_id, product_name, product_slug, product_image,
      price_per_unit,
      original_price = null,
      discount_percentage = 0,
      quantity = 1,
      variant_id = null,
      variant_color = '',
      variant_design = '',
      variant_color_code = '',
      seller_id = 0,
      seller_name = 'Shop',
      seller_rating = 0,
      seller_review_count = 0,
      personalizations = [],
    } = p;

    const clientId = uid();

    const newItem: CartItem = {
      client_id: clientId, id: null,
      product_id, product_name, product_slug, product_image,
      quantity, price_per_unit,
      original_price: original_price ?? null,
      discount_percentage,
      subtotal: price_per_unit * quantity,
      total_savings: original_price ? (original_price - price_per_unit) * quantity : 0,
      variant_id, variant_color, variant_design, variant_color_code,
      seller_id, seller_name, seller_rating, seller_review_count,
      personalizations,
      added_at: new Date().toISOString(),
      sale_ends_in: discount_percentage > 0
        ? { hours: 20, minutes: 11, seconds: 15 } : null,
    };

    // Optimistic update
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

    // Background sync to server
    if (serverEnabled) {
      void (async () => {
        try {
          console.log('[CartContext] Sending to server:', product_slug);
          const res = await apiFetch(`${API}/cart/add-enhanced/${product_slug}/`, {
            method: 'POST',
            body: JSON.stringify({ quantity, variant_id: variant_id ?? undefined, personalizations }),
          });
          
          console.log('[CartContext] Server response status:', res.status);
          
          if (res.ok) {
            const data = await res.json();
            // Store cart ID from add response
            if (data.cart?.id) {
              console.log('[CartContext] Setting cart ID from add response:', data.cart.id);
              setCartId(data.cart.id);
            }
            await syncWithServer();
          } else if (res.status === 404) {
            console.warn('[CartContext] Cart endpoint not found, disabling server sync');
            setServerEnabled(false);
          } else if (res.status === 401) {
            console.log('[CartContext] Auth required, staying in local mode');
            setServerEnabled(false);
          }
        } catch (err) {
          console.warn('[CartContext] Network error:', err);
        }
      })();
    }
    
    return { success: true };
  }, [API, serverEnabled, syncWithServer]);

  // ── removeItem ─────────────────────────────────────────────────────────────
  const removeItem = useCallback(async (clientId: string) => {
    const item = items.find(i => i.client_id === clientId);
    setItems(prev => prev.filter(i => i.client_id !== clientId));
    
    if (item?.id && serverEnabled) {
      try {
        await apiFetch(`${API}/cart/item/${item.id}/`, {
          method: 'PATCH',
          body: JSON.stringify({ action: 'remove' }),
        });
      } catch { /* noop */ }
    }
  }, [API, items, serverEnabled]);

  // ── updateQuantity ─────────────────────────────────────────────────────────
  const updateQuantity = useCallback(async (clientId: string, qty: number) => {
    if (qty < 1) { removeItem(clientId); return; }
    
    setItems(prev =>
      prev.map(i =>
        i.client_id === clientId
          ? { ...i, quantity: qty, subtotal: i.price_per_unit * qty }
          : i,
      ),
    );
    
    const item = items.find(i => i.client_id === clientId);
    if (item?.id && serverEnabled) {
      try {
        await apiFetch(`${API}/cart/item/${item.id}/`, {
          method: 'PATCH',
          body: JSON.stringify({ action: 'update', quantity: qty }),
        });
      } catch { /* noop */ }
    }
  }, [API, items, removeItem, serverEnabled]);

  // Build cart summary with cart_id
  const cart = buildSummary(items, cartId);

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
  if (!ctx) throw new Error('useCart must be used within <CartProvider>');
  return ctx;
}