const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

// ─── Per-operation timeout budgets ───────────────────────────────────────────
// Auth writes can be slow: registration triggers email sending + bcrypt.
// DO NOT share the same AbortController between register and a 10s timeout —
// that is the root cause of the "AbortError: signal is aborted without reason".
const TIMEOUT_MS = {
  auth_write: 30_000, // 30 s — register / login / logout
  read: 12_000, // 12 s — all GET requests
  cart_write: 8_000, //  8 s — cart mutations
};

const CACHE_TTL = {
  HOMEPAGE: 300_000,
  CATEGORIES: 3_600_000,
  PRODUCTS: 600_000,
  DEALS: 300_000,
  GIFT_GUIDES: 1_800_000,
  USER_DATA: 60_000,
};

// ─── Exported types (unchanged from original) ─────────────────────────────────
export interface HomepageData {
  hero_banner: {
    message: string;
    image: string | null;
    search_placeholder?: string;
  };
  featured_interests: Category[];
  discover_section: Category[];
  birthday_gifts: { categories: Category[]; products: Product[] };
  gift_categories: Category[];
  categories: CategoryWithDetails[];
  todays_deals: Product[];
  editors_picks_vintage: Product[];
  top100_gifts: Product[];
  homepage_sections: HomepageSection[];
  featured_products: Product[];
  bestseller_products: Product[];
  new_arrival_products: Product[];
}
export interface Category {
  id: number;
  title: string;
  slug: string;
  image: string;
  icon?: string | null;
  products_count: number;
  parent_id?: number | null;
  category_type?: string;
}
export interface CategoryWithDetails extends Category {
  subcategories: Category[];
  featured_products: Product[];
}
export interface Product {
  id: number;
  title: string;
  slug: string;
  short_description: string | null;
  price: number;
  discount_price?: number | null;
  discount_percentage: number;
  final_price: number;
  main: string;
  rating: number;
  review_count: number;
  is_featured: boolean;
  is_bestseller: boolean;
  is_deal: boolean;
  is_new_arrival: boolean;
  condition: string;
  color?: string | null;
  shop_name?: string | null;
  etsy_pick?: boolean;
  has_video?: boolean;
  freeDelivery?: boolean;
  saleBadge?: string;
}
export interface HomepageSection {
  id: number;
  title: string;
  section_type: string;
  description: string | null;
  image: string | null;
  order: number;
  products: Product[];
}
export interface GiftGuideSection {
  id: number;
  title: string;
  section_type: string;
  description: string | null;
  image: string | null;
  background_image: string | null;
  guide_links?: { title: string; url: string }[];
  featured_products: Product[];
  gift_products: {
    id: number;
    etsy_pick: boolean;
    custom_title: string | null;
    custom_description: string | null;
    shop_name: string | null;
    badge_text: string | null;
    product: Product;
  }[];
}
export interface GiftsPageData {
  best_gift_guides: GiftGuideSection[];
  valentines_gifts: GiftGuideSection[];
  bestselling_gifts: GiftGuideSection[];
  personalized_presents: GiftGuideSection[];
  gift_occasions: Category[];
  gift_interests: Category[];
  gift_popular: Category[];
  top_rated_products: Product[];
  page_title: string;
  page_description: string;
}
export interface BestOfValentineData {
  section: {
    id: number;
    title: string;
    description: string;
    section_type: string;
  };
  categories: Category[];
  products: Product[];
  related_searches: string[];
  filters: {
    price_options: { value: string; label: string }[];
    sort_options: { value: string; label: string }[];
    shipping_options: { value: string; label: string }[];
  };
  current_filters: { price: string; on_sale: boolean; etsy_picks: boolean };
}
export interface HomeFavouritesData {
  section: {
    id: number;
    title: string;
    description: string;
    section_type: string;
  };
  hero_categories: { title: string; image: string; slug: string }[];
  home_categories: Category[];
  small_shops: {
    name: string;
    rating: number;
    reviewCount: string;
    images: string[];
  }[];
  spring_linens_products: Product[];
  reorganizing_products: Product[];
  discover_categories: { title: string; image: string; slug: string }[];
  filters: { price_options: { value: string; label: string }[] };
}
export interface FashionShop {
  id: number;
  name: string;
  slug: string;
  rating: number;
  review_count: number;
  display_name: string;
  description?: string;
  logo?: string;
  cover_image?: string;
  featured_products_preview: Product[];
  order: number;
  is_featured: boolean;
}
export interface FashionPromoCard {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  button_text: string;
  button_url: string;
  order: number;
  is_active: boolean;
}
export interface FashionTrending {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  button_text: string;
  button_url: string;
  is_active: boolean;
}
export interface FashionDiscover {
  id: number;
  title: string;
  image: string;
  url: string;
  order: number;
  is_active: boolean;
}
export interface FashionFindsData {
  hero_title: string;
  hero_description: string;
  hero_categories: Category[];
  shops_we_love: FashionShop[];
  personalised_clothes_products: Product[];
  unique_handbags_products: Product[];
  personalised_jewellery_products: Product[];
  promo_cards: FashionPromoCard[];
  trending: FashionTrending[];
  discover_more: FashionDiscover[];
  filters: { price_options: { value: string; label: string }[] };
}
export interface GiftOccasion {
  id: number;
  label: string;
  date?: string;
  icon: string;
  slug: string;
  order: number;
}
export interface GiftInterest {
  id: number;
  name: string;
  slug: string;
  order: number;
}
export interface GiftPersona {
  id: number;
  name: string;
  persona_type: string;
  title?: string;
  description?: string;
  image?: string;
  icon?: string;
  bg_color: string;
  accent_color?: string;
  slug: string;
  order: number;
}
export interface GiftProduct {
  id: number;
  title: string;
  slug: string;
  short_description?: string;
  price: number;
  discount_price?: number;
  discount_percentage: number;
  final_price: number;
  main: string;
  rating: number;
  review_count: number;
  is_featured: boolean;
  is_bestseller: boolean;
  is_deal: boolean;
  is_new_arrival: boolean;
  condition: string;
  shop_name?: string;
  etsy_pick?: boolean;
  freeDelivery?: boolean;
  has_video?: boolean;
  saleBadge?: string;
}
export interface GiftCollection {
  id: number;
  persona: GiftPersona;
  title: string;
  slug: string;
  description?: string;
  interest_tag?: string;
  products: GiftProduct[];
}
export interface GiftRecipientItem {
  id: number;
  title: string;
  image?: string;
  slug: string;
  order: number;
}
export interface GiftRecipient {
  id: number;
  label: string;
  icon: string;
  slug: string;
  order: number;
  items: GiftRecipientItem[];
}
export interface GiftGridItem {
  id: number;
  title: string;
  image: string;
  size: "small" | "large";
  slug: string;
  order: number;
}
export interface PopularGiftCategory {
  id: number;
  name: string;
  slug: string;
  order: number;
}
export interface GiftFinderData {
  hero_occasions: GiftOccasion[];
  browse_interests: GiftInterest[];
  featured_collections: GiftCollection[];
  recipients: GiftRecipient[];
  gift_personas: GiftPersona[];
  guilty_pleasures: GiftPersona[];
  zodiac_signs: GiftPersona[];
  gift_grid_items: GiftGridItem[];
  popular_gift_categories: PopularGiftCategory[];
}
export interface GiftTeaserFeature {
  id: number;
  icon: string;
  text: string;
  order: number;
}
export interface GiftTeaserBanner {
  id: number;
  title: string;
  badge_text: string;
  description: string;
  features: GiftTeaserFeature[];
  is_active: boolean;
  order: number;
}
export interface GiftCardBanner {
  id: number;
  title: string;
  description: string;
  button_text: string;
  button_url: string;
  gradient_from: string;
  gradient_via: string;
  gradient_to: string;
  is_active: boolean;
  order: number;
}
export interface AboutGiftFinder {
  id: number;
  title: string;
  description: string;
  icon: string;
  button_text_more: string;
  button_text_less: string;
  is_active: boolean;
}
export interface GiftTeaserData {
  teaser_banner: GiftTeaserBanner | null;
  gift_card_banner: GiftCardBanner | null;
  about_section: AboutGiftFinder | null;
  featured_product: Product | null;
}
export interface MarkAsGiftResponse {
  message: string;
  cart_product_id: number;
  error?: string;
}
export interface ApiError {
  message: string;
  status?: number;
  details?: unknown;
}

// ─── Client-side in-memory cache ─────────────────────────────────────────────
class ApiCache {
  private cache = new Map<string, { data: unknown; expiresAt: number }>();
  set(key: string, data: unknown, ttl: number) {
    this.cache.set(key, { data, expiresAt: Date.now() + ttl });
  }
  get(key: string): unknown | null {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    return item.data;
  }
  clear() {
    this.cache.clear();
  }
  clearPattern(pattern: string) {
    const re = new RegExp(pattern.replace("*", ".*"));
    for (const key of this.cache.keys()) {
      if (re.test(key)) this.cache.delete(key);
    }
  }
}
const apiCache = new ApiCache();

// ─── Primitive fetch helpers ──────────────────────────────────────────────────

function csrfToken(): string {
  if (typeof document === "undefined") return "";
  const m = document.cookie.match(/(?:^|;\s*)csrftoken=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : "";
}

/** Single fetch attempt with a hard timeout. */
function timedFetch(
  url: string,
  init: RequestInit,
  ms: number,
): Promise<Response> {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), ms);
  return fetch(url, { ...init, signal: ctrl.signal }).finally(() =>
    clearTimeout(id),
  );
}

/** Read fetch: up to 2 tries with back-off. */
async function readFetch(url: string, init: RequestInit): Promise<Response> {
  let last: unknown;
  for (let i = 0; i < 2; i++) {
    try {
      return await timedFetch(url, init, TIMEOUT_MS.read);
    } catch (e) {
      last = e;
      if (i === 0) await new Promise((r) => setTimeout(r, 700));
    }
  }
  throw last;
}

// ─── Core service ─────────────────────────────────────────────────────────────
export const apiService = {
  // ── Auth (long timeout, single attempt) ────────────────────────────────────
  async login(username: string, password: string): Promise<unknown> {
    const r = await timedFetch(
      `${API_BASE_URL}/users/login/`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken(),
        },
        body: JSON.stringify({ username, password }),
      },
      TIMEOUT_MS.auth_write,
    );
    return r.json();
  },

  async register(userData: unknown): Promise<unknown> {
    // *** KEY FIX: 30s timeout, NO retry — this is an idempotent write that
    //     may be slow because Django sends an email synchronously. ***
    const r = await timedFetch(
      `${API_BASE_URL}/users/register/`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken(),
        },
        body: JSON.stringify(userData),
      },
      TIMEOUT_MS.auth_write,
    );
    return r.json();
  },

  async logout(): Promise<unknown> {
    const r = await timedFetch(
      `${API_BASE_URL}/users/logout/`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken(),
        },
      },
      TIMEOUT_MS.auth_write,
    );
    return r.json();
  },

  async getDashboard(): Promise<unknown> {
    return this.fetchData("/users/dashboard/", {
      cacheKey: "dashboard",
      cacheTTL: CACHE_TTL.USER_DATA,
    });
  },

  async updateProfile(data: unknown): Promise<unknown> {
    const r = await timedFetch(
      `${API_BASE_URL}/users/update/`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken(),
        },
        body: JSON.stringify(data),
      },
      TIMEOUT_MS.auth_write,
    );
    return r.json();
  },

  // Keep for backwards compatibility with callers that use fetchWithRetry directly
  async fetchWithRetry(
    url: string,
    options: RequestInit = {},
    retries = 1,
  ): Promise<Response> {
    const isWrite = options.method && options.method !== "GET";
    const ms = isWrite ? TIMEOUT_MS.auth_write : TIMEOUT_MS.read;
    const attempts = isWrite ? 1 : retries + 1;
    let last: unknown;
    for (let i = 0; i < attempts; i++) {
      try {
        return await timedFetch(
          url,
          {
            ...options,
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": csrfToken(),
              ...(options.headers ?? {}),
            },
          },
          ms,
        );
      } catch (e) {
        last = e;
        if (i < attempts - 1) await new Promise((r) => setTimeout(r, 700));
      }
    }
    throw last;
  },

  // ── Generic cached GET / write ─────────────────────────────────────────────
  async fetchData<T>(
    endpoint: string,
    options: {
      useCache?: boolean;
      cacheKey?: string;
      cacheTTL?: number;
      params?: Record<string, string>;
      method?: string;
      body?: unknown;
      headers?: Record<string, string>;
    } = {},
  ): Promise<T> {
    const {
      useCache = true,
      cacheKey,
      cacheTTL = CACHE_TTL.PRODUCTS,
      params,
      method = "GET",
      body,
      headers,
    } = options;

    const qs = params ? `?${new URLSearchParams(params).toString()}` : "";
    const url = `${API_BASE_URL}${endpoint}${qs}`;

    if (useCache && cacheKey && method === "GET") {
      const cached = apiCache.get(cacheKey);
      if (cached) {
        console.log(`[Cache HIT] ${cacheKey}`);
        return cached as T;
      }
    }

    if (USE_MOCK_DATA) return this.getMockData(endpoint) as Promise<T>;

    try {
      console.log(`[API Request] ${method} ${url}`);
      const isWrite = method !== "GET";
      const init: RequestInit = {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken(),
          ...(headers ?? {}),
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      };

      const res = isWrite
        ? await timedFetch(url, init, TIMEOUT_MS.auth_write)
        : await readFetch(url, init);

      if (!res.ok) {
        const text = await res.text();
        throw {
          message: `API error: ${res.status}`,
          status: res.status,
          details: text,
        };
      }

      const data = await res.json();
      if (useCache && cacheKey && method === "GET") {
        apiCache.set(cacheKey, data, cacheTTL);
        console.log(`[Cache SET] ${cacheKey}`);
      }
      return data as T;
    } catch (err) {
      console.error(`[API Error] ${endpoint}:`, err);
      throw err;
    }
  },

  getMockData(endpoint: string): unknown {
    if (endpoint.includes("homepage")) return this.getMockHomepageData();
    if (endpoint.includes("gifts-page")) return this.getMockGiftsPageData();
    if (endpoint.includes("best-of-valentine"))
      return this.getMockBestOfValentineData();
    if (endpoint.includes("home-favourites"))
      return this.getMockHomeFavouritesData();
    if (endpoint.includes("fashion-finds"))
      return this.getMockFashionFindsData();
    if (endpoint.includes("gift-finder")) return this.getMockGiftFinderData();
    if (endpoint.includes("gift-teaser")) return this.getMockGiftTeaserData();
    throw new Error(`No mock data for ${endpoint}`);
  },

  // ── Domain methods (unchanged) ─────────────────────────────────────────────
  async getHomepageData(): Promise<HomepageData> {
    return this.fetchData("/homepage/", {
      cacheKey: "homepage",
      cacheTTL: CACHE_TTL.HOMEPAGE,
    });
  },
  async getCategories(p?: Record<string, string>): Promise<Category[]> {
    return this.fetchData("/categories/", {
      cacheKey: p ? `categories:${JSON.stringify(p)}` : "categories",
      cacheTTL: CACHE_TTL.CATEGORIES,
      params: p,
    });
  },
  async getCategoryProducts(
    s: string,
    p?: Record<string, string>,
  ): Promise<unknown> {
    return this.fetchData(`/category/${s}/products/`, {
      cacheKey: `category:${s}:products:${JSON.stringify(p || {})}`,
      cacheTTL: CACHE_TTL.PRODUCTS,
      params: p,
    });
  },
  async getProducts(
    p?: Record<string, string>,
  ): Promise<{
    count: number;
    next: string | null;
    previous: string | null;
    results: Product[];
  }> {
    return this.fetchData("/products/", {
      cacheKey: p ? `products:${JSON.stringify(p)}` : "products",
      cacheTTL: CACHE_TTL.PRODUCTS,
      params: p,
    });
  },
  async getProduct(s: string): Promise<Product | null> {
    return this.fetchData(`/product/${s}/`, {
      cacheKey: `product:${s}`,
      cacheTTL: CACHE_TTL.PRODUCTS,
    });
  },
  async getTop100Gifts(r = true, c = 20): Promise<unknown> {
    return this.fetchData("/top-100-gifts/", {
      cacheKey: `top100:${r}:${c}`,
      cacheTTL: CACHE_TTL.DEALS,
      params: { random: String(r), count: String(c) },
    });
  },
  async getNavigation(): Promise<unknown> {
    return this.fetchData("/navigation/", {
      cacheKey: "navigation",
      cacheTTL: CACHE_TTL.CATEGORIES,
    });
  },
  async getGiftsPageData(): Promise<GiftsPageData> {
    return this.fetchData("/gifts-page/", {
      cacheKey: "gifts-page",
      cacheTTL: CACHE_TTL.GIFT_GUIDES,
    });
  },
  async getGiftGuideSection(t: string): Promise<unknown> {
    return this.fetchData(`/gifts-section/${t}/`, {
      cacheKey: `gift-section:${t}`,
      cacheTTL: CACHE_TTL.GIFT_GUIDES,
    });
  },
  async getGiftCategoryProducts(
    s: string,
    p?: Record<string, string>,
  ): Promise<unknown> {
    return this.fetchData(`/gift-category/${s}/products/`, {
      cacheKey: `gift-category:${s}:${JSON.stringify(p || {})}`,
      cacheTTL: CACHE_TTL.PRODUCTS,
      params: p,
    });
  },
  async getBestOfValentineData(
    p?: Record<string, string>,
  ): Promise<BestOfValentineData> {
    return this.fetchData("/best-of-valentine/", {
      cacheKey: `valentine:${JSON.stringify(p || {})}`,
      cacheTTL: CACHE_TTL.GIFT_GUIDES,
      params: p,
    });
  },
  async getHomeFavouritesData(): Promise<HomeFavouritesData> {
    return this.fetchData("/home-favourites/", {
      cacheKey: "home-favourites",
      cacheTTL: CACHE_TTL.GIFT_GUIDES,
    });
  },
  async getFashionFindsData(): Promise<FashionFindsData> {
    return this.fetchData("/fashion-finds/", {
      cacheKey: "fashion-finds",
      cacheTTL: CACHE_TTL.GIFT_GUIDES,
    });
  },
  async getGiftFinderData(): Promise<GiftFinderData> {
    return this.fetchData("/gift-finder/", {
      cacheKey: "gift-finder",
      cacheTTL: CACHE_TTL.GIFT_GUIDES,
    });
  },
  async getGiftTeaserData(): Promise<GiftTeaserData> {
    return this.fetchData("/gift-teaser/", {
      cacheKey: "gift-teaser",
      cacheTTL: CACHE_TTL.GIFT_GUIDES,
    });
  },

  async getCollectionsByInterest(interest: string): Promise<GiftCollection[]> {
    try {
      const r = await this.fetchData<
        GiftCollection[] | { results?: GiftCollection[] }
      >(`/gift-finder/collections/?interest=${encodeURIComponent(interest)}`, {
        cacheKey: `collections:${interest}`,
        cacheTTL: CACHE_TTL.GIFT_GUIDES,
      });
      return Array.isArray(r)
        ? r
        : Array.isArray((r as any).results)
          ? (r as any).results
          : [];
    } catch {
      return [];
    }
  },
  async getPopularGiftsByCategory(cat: string): Promise<GiftProduct[]> {
    try {
      const r = await this.fetchData<
        GiftProduct[] | { results?: GiftProduct[] }
      >(`/gift-finder/popular-gifts/?category=${encodeURIComponent(cat)}`, {
        cacheKey: `popular-gifts:${cat}`,
        cacheTTL: CACHE_TTL.PRODUCTS,
      });
      return Array.isArray(r)
        ? r
        : Array.isArray((r as any).results)
          ? (r as any).results
          : [];
    } catch {
      return [];
    }
  },

  // ── Cart ───────────────────────────────────────────────────────────────────
  async addToCart(
    slug: string,
    quantity = 1,
    sizeId?: number,
  ): Promise<unknown> {
    if (USE_MOCK_DATA)
      return { message: "Item added to cart", cart_item_id: Date.now() };
    const r = await timedFetch(
      `${API_BASE_URL}/add-to-cart/${slug}/`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken(),
        },
        body: JSON.stringify({ quantity, size_id: sizeId }),
      },
      TIMEOUT_MS.cart_write,
    );
    apiCache.clearPattern("cart:*");
    return r.json();
  },
  async getCart(): Promise<unknown> {
    if (USE_MOCK_DATA) return { items: [], total: 0 };
    return this.fetchData("/my-cart/", { cacheKey: "cart", cacheTTL: 60_000 });
  },
  async updateCartItem(
    itemId: number,
    action: "inc" | "dcr" | "rmv",
  ): Promise<unknown> {
    if (USE_MOCK_DATA) return { message: "Cart updated" };
    const r = await timedFetch(
      `${API_BASE_URL}/manage-cart/${itemId}/`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken(),
        },
        body: JSON.stringify({ action }),
      },
      TIMEOUT_MS.cart_write,
    );
    apiCache.clearPattern("cart:*");
    return r.json();
  },
  async getWishlist(): Promise<unknown> {
    if (USE_MOCK_DATA) return { products: [] };
    return this.fetchData("/wishlist/", {
      cacheKey: "wishlist",
      cacheTTL: 60_000,
    });
  },
  async addToWishlist(productId: number): Promise<unknown> {
    const r = await this.fetchWithRetry(`${API_BASE_URL}/wishlist/`, {
      method: "POST",
      body: JSON.stringify({ product_id: productId }),
    });
    apiCache.clearPattern("wishlist:*");
    return r.json();
  },
  async removeFromWishlist(productId: number): Promise<unknown> {
    const r = await this.fetchWithRetry(`${API_BASE_URL}/wishlist/`, {
      method: "DELETE",
      body: JSON.stringify({ product_id: productId }),
    });
    apiCache.clearPattern("wishlist:*");
    return r.json();
  },
  async markAsGift(id: number): Promise<MarkAsGiftResponse> {
    if (USE_MOCK_DATA)
      return { message: "Item marked as gift", cart_product_id: id };
    try {
      const r = await this.fetchWithRetry(
        `${API_BASE_URL}/gift-teaser/mark-as-gift/`,
        { method: "POST", body: JSON.stringify({ cart_product_id: id }) },
      );
      return r.json();
    } catch (e: any) {
      return { message: "", error: e.message, cart_product_id: id };
    }
  },
  async unmarkAsGift(id: number): Promise<MarkAsGiftResponse> {
    if (USE_MOCK_DATA)
      return { message: "Item unmarked as gift", cart_product_id: id };
    try {
      const r = await this.fetchWithRetry(
        `${API_BASE_URL}/gift-teaser/mark-as-gift/`,
        { method: "DELETE", body: JSON.stringify({ cart_product_id: id }) },
      );
      return r.json();
    } catch (e: any) {
      return { message: "", error: e.message, cart_product_id: id };
    }
  },

  // ── Minimal mock stubs ─────────────────────────────────────────────────────
  async getMockHomepageData(): Promise<HomepageData> {
    return {
      hero_banner: {
        message: "Find something you love",
        image: null,
        search_placeholder: "Search for anything",
      },
      featured_interests: [],
      discover_section: [],
      birthday_gifts: { categories: [], products: [] },
      gift_categories: [],
      categories: [],
      todays_deals: [],
      editors_picks_vintage: [],
      top100_gifts: [],
      homepage_sections: [],
      featured_products: [],
      bestseller_products: [],
      new_arrival_products: [],
    };
  },
  async getMockGiftsPageData(): Promise<GiftsPageData> {
    return {
      page_title: "",
      page_description: "",
      best_gift_guides: [],
      valentines_gifts: [],
      bestselling_gifts: [],
      personalized_presents: [],
      gift_occasions: [],
      gift_interests: [],
      gift_popular: [],
      top_rated_products: [],
    };
  },
  async getMockBestOfValentineData(): Promise<BestOfValentineData> {
    return {
      section: {
        id: 1,
        title: "",
        description: "",
        section_type: "best_of_valentine",
      },
      categories: [],
      products: [],
      related_searches: [],
      filters: { price_options: [], sort_options: [], shipping_options: [] },
      current_filters: { price: "any", on_sale: false, etsy_picks: false },
    };
  },
  async getMockHomeFavouritesData(): Promise<HomeFavouritesData> {
    return {
      section: {
        id: 1,
        title: "",
        description: "",
        section_type: "home_favourites",
      },
      hero_categories: [],
      home_categories: [],
      small_shops: [],
      spring_linens_products: [],
      reorganizing_products: [],
      discover_categories: [],
      filters: { price_options: [] },
    };
  },
  async getMockFashionFindsData(): Promise<FashionFindsData> {
    return {
      hero_title: "",
      hero_description: "",
      hero_categories: [],
      shops_we_love: [],
      personalised_clothes_products: [],
      unique_handbags_products: [],
      personalised_jewellery_products: [],
      promo_cards: [],
      trending: [],
      discover_more: [],
      filters: { price_options: [] },
    };
  },
  getMockGiftFinderData(): GiftFinderData {
    return {
      hero_occasions: [],
      browse_interests: [],
      featured_collections: [],
      recipients: [],
      gift_personas: [],
      guilty_pleasures: [],
      zodiac_signs: [],
      gift_grid_items: [],
      popular_gift_categories: [],
    };
  },
  getMockGiftTeaserData(): GiftTeaserData {
    return {
      teaser_banner: null,
      gift_card_banner: null,
      about_section: null,
      featured_product: null,
    };
  },
};

export const cacheUtils = {
  clearAll: () => apiCache.clear(),
  clearPattern: (p: string) => apiCache.clearPattern(p),
};
