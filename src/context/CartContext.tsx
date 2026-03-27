'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';

// ─── Public types ──────────────────────────────────────────────────────────────

export interface CartItemPersonalization {
  field_name: string;
  value:      string;
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
  seller_id:           number;
  seller_name:         string;
  seller_rating:       number;
  seller_review_count: number;
  items:               CartItem[];
  subtotal:            number;
  shipping_cost:       number;
  estimated_delivery:  { min: number; max: number; display: string };
  is_gift:             boolean;
}

export interface CartSummary {
  groups:            CartGroup[];
  total_items:       number;
  subtotal:          number;
  total_discount:    number;
  total_shipping:    number;
  grand_total:       number;
  applied_discounts: Array<{ code: string; amount: number; description: string }>;
  cart_id:           number | null;
}

export interface AddToCartPayload {
  product_id:           number;
  product_name:         string;
  product_slug:         string;
  product_image:        string;
  price_per_unit:       number;
  original_price?:      number | null;
  discount_percentage?: number;
  quantity?:            number;
  variant_id?:          number | null;
  variant_color?:       string;
  variant_design?:      string;
  variant_color_code?:  string;
  seller_id?:           number;
  seller_name?:         string;
  seller_rating?:       number;
  seller_review_count?: number;
  personalizations?:    CartItemPersonalization[];
}

interface CartContextValue {
  cart:           CartSummary;
  loading:        boolean;
  addToCart:      (payload: AddToCartPayload) => Promise<{ success: boolean; error?: string }>;
  removeItem:     (clientId: string) => Promise<void>;
  updateQuantity: (clientId: string, qty: number) => Promise<void>;
  refreshCart:    () => Promise<void>;
}

// ─── Internal helpers ──────────────────────────────────────────────────────────

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function buildSummary(items: CartItem[], cartId: number | null): CartSummary {
  const groupMap = new Map<number, CartGroup>();

  for (const item of items) {
    const sid = item.seller_id ?? 0;
    if (!groupMap.has(sid)) {
      groupMap.set(sid, {
        seller_id:           sid,
        seller_name:         item.seller_name || 'Shop',
        seller_rating:       item.seller_rating ?? 0,
        seller_review_count: item.seller_review_count ?? 0,
        items:               [],
        subtotal:            0,
        shipping_cost:       4.87,
        estimated_delivery:  { min: 1, max: 13, display: 'Get it by 01–13 Apr' },
        is_gift:             false,
      });
    }
    const group = groupMap.get(sid)!;
    group.items.push(item);
    group.subtotal += item.price_per_unit * item.quantity;
  }

  const groups        = Array.from(groupMap.values());
  const fullPrice     = items.reduce((s, i) => s + (i.original_price ?? i.price_per_unit) * i.quantity, 0);
  const salePrice     = items.reduce((s, i) => s + i.price_per_unit * i.quantity, 0);
  const totalDiscount = fullPrice - salePrice;
  const totalShipping = groups.reduce((s, g) => s + g.shipping_cost, 0);

  return {
    groups,
    total_items:       items.reduce((s, i) => s + i.quantity, 0),
    subtotal:          fullPrice,
    total_discount:    totalDiscount,
    total_shipping:    totalShipping,
    grand_total:       salePrice + totalShipping,
    applied_discounts: [],
    cart_id:           cartId,
  };
}

// ─── Storage ───────────────────────────────────────────────────────────────────

const STORAGE_KEY   = 'etsy_cart_v2';
const CART_ID_KEY   = 'etsy_cart_id';

function loadStoredItems(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadStoredCartId(): number | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CART_ID_KEY);
    if (!raw) return null;
    const n = parseInt(raw, 10);
    return isNaN(n) ? null : n;
  } catch {
    return null;
  }
}

function persistItems(items: CartItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // quota exceeded — ignore
  }
}

function persistCartId(id: number | null): void {
  if (typeof window === 'undefined') return;
  if (id != null) {
    localStorage.setItem(CART_ID_KEY, String(id));
  } else {
    localStorage.removeItem(CART_ID_KEY);
  }
}

// ─── Network helpers ───────────────────────────────────────────────────────────

function getCsrfToken(): string {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(/(?:^|;\s*)csrftoken=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : '';
}

function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  const token  = localStorage.getItem('access_token');
  const expiry = localStorage.getItem('token_expiry');
  if (token && expiry && Date.now() < parseInt(expiry, 10)) return token;
  return null;
}

async function cartFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const csrf  = getCsrfToken();
  const token = getAccessToken();
  return fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(csrf  ? { 'X-CSRFToken':   csrf                } : {}),
      ...(token ? { 'Authorization': `Bearer ${token}`  } : {}),
      ...(options.headers as Record<string, string> ?? {}),
    },
  });
}

// ─── Context ───────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const API = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api').replace(/\/$/, '');

  const [items,         setItems]         = useState<CartItem[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [cartId,        setCartId]        = useState<number | null>(null);
  const [serverEnabled, setServerEnabled] = useState(true);

  // Tracks whether the initial localStorage load has completed.
  // The persist effect checks this so it never overwrites stored data
  // with an empty array on the very first render.
  const hasLoadedRef = useRef(false);

  // ── 1. Load from localStorage once on mount ────────────────────────────────
  useEffect(() => {
    const storedItems  = loadStoredItems();
    const storedCartId = loadStoredCartId();

    hasLoadedRef.current = true;

    if (storedItems.length > 0) {
      setItems(storedItems);
    }
    if (storedCartId != null) {
      setCartId(storedCartId);
    }

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── 2. Persist items to localStorage whenever they change (after load) ─────
  useEffect(() => {
    // Guard: do not persist before the initial load has completed,
    // otherwise we'd overwrite saved data with an empty array.
    if (!hasLoadedRef.current) return;
    persistItems(items);
  }, [items]);

  // ── 3. Persist cartId whenever it changes ─────────────────────────────────
  useEffect(() => {
    persistCartId(cartId);
  }, [cartId]);

  // ── 4. Sync cart state from the server ────────────────────────────────────
  const syncWithServer = useCallback(async (): Promise<void> => {
    if (!serverEnabled) return;

    try {
      const res = await cartFetch(`${API}/cart/enhanced/`);

      if (res.status === 401 || res.status === 403 || res.status === 404) {
        setServerEnabled(false);
        return;
      }
      if (!res.ok) return;

      const data = await res.json();

      // Extract and save the real server cart ID
      const serverCartId: number | null =
        data.id       > 0 ? data.id       :
        data.cart_id  > 0 ? data.cart_id  :
        null;

      if (serverCartId != null) {
        setCartId(serverCartId);
        persistCartId(serverCartId);
      }

      // Parse server cart items
      const serverItems: CartItem[] = [];
      if (Array.isArray(data.groups)) {
        for (const group of data.groups) {
          for (const si of (group.items ?? [])) {
            serverItems.push({
              client_id:           String(si.id ?? uid()),
              id:                  si.id ?? null,
              product_id:          si.product ?? 0,
              product_name:        si.product_name  ?? '',
              product_slug:        si.product_slug  ?? '',
              product_image:       si.product_image ?? si.image_url ?? '',
              quantity:            si.quantity       ?? 1,
              price_per_unit:      parseFloat(si.price_per_unit) || 0,
              original_price:      si.original_price ? parseFloat(si.original_price) : null,
              discount_percentage: si.discount_percentage ?? 0,
              subtotal:            parseFloat(si.subtotal)      || 0,
              total_savings:       parseFloat(si.total_savings) || 0,
              variant_id:          si.variant        ?? null,
              variant_color:       si.variant_color  ?? '',
              variant_design:      si.variant_design ?? '',
              variant_color_code:  si.variant_color_code ?? '',
              seller_id:           group.seller_id           ?? 0,
              seller_name:         group.seller_name          ?? '',
              seller_rating:       group.seller_rating        ?? 0,
              seller_review_count: group.seller_review_count  ?? 0,
              personalizations:    si.personalizations         ?? [],
              added_at:            si.added_at ?? new Date().toISOString(),
              sale_ends_in:
                si.discount_percentage > 0
                  ? { hours: 20, minutes: 11, seconds: 15 }
                  : null,
            });
          }
        }
      }

      if (serverItems.length > 0) {
        setItems(serverItems);
      }
    } catch {
      // Network error — continue in local-only mode
    }
  }, [API, serverEnabled]);

  // ── 5. Trigger a server sync after the initial load ───────────────────────
  useEffect(() => {
    if (hasLoadedRef.current) {
      syncWithServer();
    }
    // We intentionally only want this to run once after the first load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // eslint-disable-line

  // ── refreshCart ────────────────────────────────────────────────────────────
  const refreshCart = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      await syncWithServer();
    } finally {
      setLoading(false);
    }
  }, [syncWithServer]);

  // ── addToCart ──────────────────────────────────────────────────────────────
  const addToCart = useCallback(
    async (payload: AddToCartPayload): Promise<{ success: boolean; error?: string }> => {
      const {
        product_id,
        product_name,
        product_slug,
        product_image,
        price_per_unit,
        original_price      = null,
        discount_percentage = 0,
        quantity            = 1,
        variant_id          = null,
        variant_color       = '',
        variant_design      = '',
        variant_color_code  = '',
        seller_id           = 0,
        seller_name         = 'Shop',
        seller_rating       = 0,
        seller_review_count = 0,
        personalizations    = [],
      } = payload;

      const newItem: CartItem = {
        client_id:           uid(),
        id:                  null,
        product_id,
        product_name,
        product_slug,
        product_image,
        quantity,
        price_per_unit,
        original_price:      original_price ?? null,
        discount_percentage,
        subtotal:            price_per_unit * quantity,
        total_savings:       original_price ? (original_price - price_per_unit) * quantity : 0,
        variant_id,
        variant_color,
        variant_design,
        variant_color_code,
        seller_id,
        seller_name,
        seller_rating,
        seller_review_count,
        personalizations,
        added_at:            new Date().toISOString(),
        sale_ends_in:
          discount_percentage > 0
            ? { hours: 20, minutes: 11, seconds: 15 }
            : null,
      };

      // Optimistic local update
      setItems(prev => {
        const existing = prev.findIndex(
          i => i.product_slug === product_slug && i.variant_id === variant_id
        );
        if (existing >= 0) {
          return prev.map((item, idx) =>
            idx === existing
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  subtotal: item.price_per_unit * (item.quantity + quantity),
                }
              : item
          );
        }
        return [...prev, newItem];
      });

      // Background server sync — use a regular async function, not a void IIFE,
      // to keep Turbopack's static analysis happy.
      if (serverEnabled) {
        const syncToServer = async () => {
          try {
            const res = await cartFetch(`${API}/cart/add-enhanced/${product_slug}/`, {
              method: 'POST',
              body:   JSON.stringify({
                quantity,
                variant_id:       variant_id ?? undefined,
                personalizations,
              }),
            });

            if (res.ok) {
              const data = await res.json();
              const cid: number | null =
                data.cart?.id > 0 ? data.cart.id :
                data.id       > 0 ? data.id       :
                null;
              if (cid != null) {
                setCartId(cid);
                persistCartId(cid);
              }
              await syncWithServer();
            } else if (res.status === 404) {
              // Product not in DB (mock data) — item stays in localStorage only
              console.warn(`[CartContext] /cart/add-enhanced/${product_slug}/ returned 404 — stored locally`);
            } else if (res.status === 401 || res.status === 403) {
              setServerEnabled(false);
            }
          } catch {
            // Network error — item is already saved locally
          }
        };

        // Fire-and-forget without void IIFE
        syncToServer();
      }

      return { success: true };
    },
    [API, serverEnabled, syncWithServer]
  );

  // ── removeItem ─────────────────────────────────────────────────────────────
  const removeItem = useCallback(
    async (clientId: string): Promise<void> => {
      const item = items.find(i => i.client_id === clientId);
      setItems(prev => prev.filter(i => i.client_id !== clientId));

      if (item?.id != null && serverEnabled) {
        try {
          await cartFetch(`${API}/cart/item/${item.id}/`, {
            method: 'PATCH',
            body:   JSON.stringify({ action: 'remove' }),
          });
        } catch {
          // noop
        }
      }
    },
    [API, items, serverEnabled]
  );

  // ── updateQuantity ─────────────────────────────────────────────────────────
  const updateQuantity = useCallback(
    async (clientId: string, qty: number): Promise<void> => {
      if (qty < 1) {
        await removeItem(clientId);
        return;
      }

      setItems(prev =>
        prev.map(i =>
          i.client_id === clientId
            ? { ...i, quantity: qty, subtotal: i.price_per_unit * qty }
            : i
        )
      );

      const item = items.find(i => i.client_id === clientId);
      if (item?.id != null && serverEnabled) {
        try {
          await cartFetch(`${API}/cart/item/${item.id}/`, {
            method: 'PATCH',
            body:   JSON.stringify({ action: 'update', quantity: qty }),
          });
        } catch {
          // noop
        }
      }
    },
    [API, items, removeItem, serverEnabled]
  );

  // ── Build derived cart summary ─────────────────────────────────────────────
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
  if (!ctx) {
    throw new Error('useCart must be used within a <CartProvider>');
  }
  return ctx;
}