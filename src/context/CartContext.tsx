// CartContext.tsx - FIXED VERSION

'use client';

import React, {
  createContext, useContext, useState, useEffect, useCallback, useRef,
} from 'react';

// ... keep all your existing types (CartItemPersonalization, CartItem, CartGroup, CartSummary, AddToCartPayload) ...

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
  };
}

// ── localStorage ──────────────────────────────────────────────────────────────
const STORAGE_KEY = 'etsy_cart_v2';
function loadStored(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try { 
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as CartItem[];
    // Ensure all items have valid structure
    return parsed.filter(item => item && item.product_id);
  }
  catch { return []; }
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
  // Get JWT token from localStorage
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

  // ── 3. Background sync with server (runs after initial load) ───────────────
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
          // Local item not on server - keep it
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
            // Refresh to get server IDs
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
  if (!ctx) throw new Error('useCart must be used within <CartProvider>');
  return ctx;
}