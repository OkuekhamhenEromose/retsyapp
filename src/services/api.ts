const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/estyecomapp";
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

// Cache configuration for different endpoint types
const CACHE_CONFIG = {
  HOMEPAGE: { revalidate: 300 }, // 5 minutes
  CATEGORIES: { revalidate: 3600 }, // 1 hour
  PRODUCTS: { revalidate: 600 }, // 10 minutes
  DEALS: { revalidate: 300 }, // 5 minutes
  GIFT_GUIDES: { revalidate: 1800 }, // 30 minutes
  USER_DATA: { revalidate: 60 }, // 1 minute
};

// Export all interfaces (keep your existing interfaces)
export interface HomepageData {
  hero_banner: {
    message: string;
    image: string | null;
    search_placeholder?: string;
  };
  featured_interests: Category[];
  discover_section: Category[];
  birthday_gifts: {
    categories: Category[];
    products: Product[];
  };
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
  guide_links?: Array<{ title: string; url: string }>;
  featured_products: Product[];
  gift_products: Array<{
    id: number;
    etsy_pick: boolean;
    custom_title: string | null;
    custom_description: string | null;
    shop_name: string | null;
    badge_text: string | null;
    product: Product;
  }>;
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
    price_options: Array<{ value: string; label: string }>;
    sort_options: Array<{ value: string; label: string }>;
    shipping_options: Array<{ value: string; label: string }>;
  };
  current_filters: {
    price: string;
    on_sale: boolean;
    etsy_picks: boolean;
  };
}

export interface HomeFavouritesData {
  section: {
    id: number;
    title: string;
    description: string;
    section_type: string;
  };
  hero_categories: Array<{
    title: string;
    image: string;
    slug: string;
  }>;
  home_categories: Category[];
  small_shops: Array<{
    name: string;
    rating: number;
    reviewCount: string;
    images: string[];
  }>;
  spring_linens_products: Product[];
  reorganizing_products: Product[];
  discover_categories: Array<{
    title: string;
    image: string;
    slug: string;
  }>;
  filters: {
    price_options: Array<{ value: string; label: string }>;
  };
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
  filters: {
    price_options: Array<{ value: string; label: string }>;
  };
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

export interface GiftCollection {
  id: number;
  persona: GiftPersona;
  title: string;
  slug: string;
  description?: string;
  interest_tag?: string;
  products: GiftProduct[];
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
  details?: any;
}

// ========== CACHE UTILITY ==========
class ApiCache {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes in milliseconds

  set(key: string, data: any, ttl: number = this.defaultTTL) {
    this.cache.set(key, {
      data,
      timestamp: Date.now() + ttl,
    });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() > item.timestamp) {
      this.cache.delete(key);
      return null;
    }
    return item.data;
  }

  clear() {
    this.cache.clear();
  }

  clearPattern(pattern: string) {
    const regex = new RegExp(pattern.replace("*", ".*"));
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
      }
    }
  }
}

const apiCache = new ApiCache();

// ========== API SERVICE ==========
export const apiService = {
  async login(username: string, password: string): Promise<any> {
    const response = await this.fetchWithRetry(`${API_BASE_URL}/users/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include", // Important for cookies
    });

    return response.json();
  },

  async register(userData: any): Promise<any> {
    const response = await this.fetchWithRetry(
      `${API_BASE_URL}/users/register/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include",
      },
    );

    return response.json();
  },

  async logout(): Promise<any> {
    const response = await this.fetchWithRetry(
      `${API_BASE_URL}/users/logout/`,
      {
        method: "POST",
        credentials: "include",
      },
    );

    return response.json();
  },

  async getDashboard(): Promise<any> {
    return this.fetchData("/users/dashboard/", {
      cacheKey: "dashboard",
      cacheTTL: 60000, // 1 minute
    });
  },

  async updateProfile(profileData: any): Promise<any> {
    const response = await this.fetchWithRetry(
      `${API_BASE_URL}/users/update/`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
        credentials: "include",
      },
    );

    return response.json();
  },

  // Helper method for fetch with timeout and retry
  async fetchWithRetry(
    url: string,
    options: RequestInit = {},
    retries = 2,
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    for (let i = 0; i <= retries; i++) {
      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            "Accept-Encoding": "gzip, deflate", // Support compression
            ...options.headers,
          },
        });
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        clearTimeout(timeoutId);
        if (i === retries) throw error;
        // Exponential backoff
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, i) * 1000),
        );
      }
    }
    throw new Error("Max retries exceeded");
  },

  // Generic fetch method with caching and error handling
  async fetchData<T>(
    endpoint: string,
    options: {
      useCache?: boolean;
      cacheKey?: string;
      cacheTTL?: number;
      params?: Record<string, string>;
      method?: string;
      body?: any;
      headers?: Record<string, string>;
    } = {},
  ): Promise<T> {
    const {
      useCache = true,
      cacheKey,
      cacheTTL,
      params,
      method = "GET",
      body,
      headers,
    } = options;

    // Build URL with query params
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    const url = `${API_BASE_URL}${endpoint}${queryString}`;

    // Check cache if enabled
    if (useCache && cacheKey && method === "GET") {
      const cached = apiCache.get(cacheKey);
      if (cached) {
        console.log(`[Cache HIT] ${cacheKey}`);
        return cached as T;
      }
    }

    // If mock data is enabled, return mock data
    if (USE_MOCK_DATA) {
      console.log(`[Mock Data] ${endpoint}`);
      return this.getMockData(endpoint) as Promise<T>;
    }

    try {
      console.log(`[API Request] ${method} ${url}`);
      const fetchOptions: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip, deflate",
          ...headers,
        },
        credentials: "include", // Important for cookies
      };

      if (body) {
        fetchOptions.body =
          typeof body === "string" ? body : JSON.stringify(body);
      }
      const response = await this.fetchWithRetry(url, fetchOptions);

      if (!response.ok) {
        const errorText = await response.text();
        throw {
          message: `API error: ${response.status}`,
          status: response.status,
          details: errorText,
        };
      }

      const data = await response.json();

      // Cache the response if caching is enabled
      if (useCache && cacheKey && method === "GET") {
        apiCache.set(cacheKey, data, cacheTTL);
        console.log(`[Cache SET] ${cacheKey}`);
      }

      return data as T;
    } catch (error) {
      console.error(`[API Error] ${endpoint}:`, error);
      throw error;
    }
  },

  // Mock data fallback
  getMockData(endpoint: string): any {
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

  // ========== HOMEPAGE ==========
  async getHomepageData(): Promise<HomepageData> {
    return this.fetchData<HomepageData>("/homepage/", {
      cacheKey: "homepage",
      cacheTTL: CACHE_CONFIG.HOMEPAGE.revalidate * 1000,
    });
  },

  // ========== CATEGORIES ==========
  async getCategories(params?: { [key: string]: string }): Promise<Category[]> {
    const cacheKey = params
      ? `categories:${JSON.stringify(params)}`
      : "categories";
    return this.fetchData<Category[]>("/categories/", {
      cacheKey,
      cacheTTL: CACHE_CONFIG.CATEGORIES.revalidate * 1000,
      params,
    });
  },

  async getCategoryProducts(
    slug: string,
    params?: { [key: string]: string },
  ): Promise<any> {
    const cacheKey = `category:${slug}:products:${JSON.stringify(params || {})}`;
    return this.fetchData<any>(`/category/${slug}/products/`, {
      cacheKey,
      cacheTTL: CACHE_CONFIG.PRODUCTS.revalidate * 1000,
      params,
    });
  },

  // ========== PRODUCTS ==========
  async getProducts(params?: { [key: string]: string }): Promise<{
    count: number;
    next: string | null;
    previous: string | null;
    results: Product[];
  }> {
    const cacheKey = params ? `products:${JSON.stringify(params)}` : "products";
    return this.fetchData("/products/", {
      cacheKey,
      cacheTTL: CACHE_CONFIG.PRODUCTS.revalidate * 1000,
      params,
    });
  },

  async getProduct(slug: string): Promise<Product | null> {
    return this.fetchData<Product>(`/product/${slug}/`, {
      cacheKey: `product:${slug}`,
      cacheTTL: CACHE_CONFIG.PRODUCTS.revalidate * 1000,
    });
  },

  // ========== DEALS ==========
  async getTop100Gifts(
    random: boolean = true,
    count: number = 20,
  ): Promise<any> {
    return this.fetchData("/top-100-gifts/", {
      cacheKey: `top100:${random}:${count}`,
      cacheTTL: CACHE_CONFIG.DEALS.revalidate * 1000,
      params: { random: String(random), count: String(count) },
    });
  },

  // ========== NAVIGATION ==========
  async getNavigation(): Promise<any> {
    return this.fetchData("/navigation/", {
      cacheKey: "navigation",
      cacheTTL: CACHE_CONFIG.CATEGORIES.revalidate * 1000,
    });
  },

  // ========== GIFTS PAGE ==========
  async getGiftsPageData(): Promise<GiftsPageData> {
    return this.fetchData<GiftsPageData>("/gifts-page/", {
      cacheKey: "gifts-page",
      cacheTTL: CACHE_CONFIG.GIFT_GUIDES.revalidate * 1000,
    });
  },

  async getGiftGuideSection(sectionType: string): Promise<{
    section: GiftGuideSection;
    products: Product[];
  }> {
    return this.fetchData(`/gifts-section/${sectionType}/`, {
      cacheKey: `gift-section:${sectionType}`,
      cacheTTL: CACHE_CONFIG.GIFT_GUIDES.revalidate * 1000,
    });
  },

  async getGiftCategoryProducts(
    categorySlug: string,
    params?: { [key: string]: string },
  ): Promise<any> {
    const cacheKey = `gift-category:${categorySlug}:${JSON.stringify(params || {})}`;
    return this.fetchData(`/gift-category/${categorySlug}/products/`, {
      cacheKey,
      cacheTTL: CACHE_CONFIG.PRODUCTS.revalidate * 1000,
      params,
    });
  },

  // ========== BEST OF VALENTINE ==========
  async getBestOfValentineData(params?: {
    price?: string;
    on_sale?: boolean;
    etsy_picks?: boolean;
    sort?: string;
  }): Promise<BestOfValentineData> {
    const cacheKey = `valentine:${JSON.stringify(params || {})}`;
    return this.fetchData<BestOfValentineData>("/best-of-valentine/", {
      cacheKey,
      cacheTTL: CACHE_CONFIG.GIFT_GUIDES.revalidate * 1000,
      params: params as Record<string, string>,
    });
  },

  // ========== HOME FAVOURITES ==========
  async getHomeFavouritesData(): Promise<HomeFavouritesData> {
    return this.fetchData<HomeFavouritesData>("/home-favourites/", {
      cacheKey: "home-favourites",
      cacheTTL: CACHE_CONFIG.GIFT_GUIDES.revalidate * 1000,
    });
  },

  // ========== FASHION FINDS ==========
  async getFashionFindsData(): Promise<FashionFindsData> {
    return this.fetchData<FashionFindsData>("/fashion-finds/", {
      cacheKey: "fashion-finds",
      cacheTTL: CACHE_CONFIG.GIFT_GUIDES.revalidate * 1000,
    });
  },
  // ========== GIFT FINDER ==========
  async getGiftFinderData(): Promise<GiftFinderData> {
    return this.fetchData<GiftFinderData>("/gift-finder/", {
      cacheKey: "gift-finder",
      cacheTTL: CACHE_CONFIG.GIFT_GUIDES.revalidate * 1000,
    });
  },

  async getCollectionsByInterest(interest: string): Promise<GiftCollection[]> {
    interface CollectionsResponse {
      results?: GiftCollection[];
      data?: GiftCollection[];
      collections?: GiftCollection[];
    }

    try {
      const response = await this.fetchData<
        GiftCollection[] | CollectionsResponse
      >(`/gift-finder/collections/?interest=${encodeURIComponent(interest)}`, {
        cacheKey: `collections:${interest}`,
        cacheTTL: CACHE_CONFIG.GIFT_GUIDES.revalidate * 1000,
      });

      // Handle different response formats
      if (Array.isArray(response)) {
        return response;
      } else if (response && typeof response === "object") {
        // Check for common API response patterns
        if (Array.isArray((response as any).results)) {
          return (response as any).results;
        } else if (Array.isArray((response as any).data)) {
          return (response as any).data;
        } else if (Array.isArray((response as any).collections)) {
          return (response as any).collections;
        }
      }

      console.warn("Unexpected collections response format:", response);
      return [];
    } catch (error) {
      console.error("Error fetching collections:", error);
      return [];
    }
  },

  async getPopularGiftsByCategory(category: string): Promise<GiftProduct[]> {
    interface PopularGiftsResponse {
      results?: GiftProduct[];
      products?: GiftProduct[];
      data?: GiftProduct[];
    }

    try {
      const response = await this.fetchData<
        GiftProduct[] | PopularGiftsResponse
      >(
        `/gift-finder/popular-gifts/?category=${encodeURIComponent(category)}`,
        {
          cacheKey: `popular-gifts:${category}`,
          cacheTTL: CACHE_CONFIG.PRODUCTS.revalidate * 1000,
        },
      );

      // Handle different response formats
      if (Array.isArray(response)) {
        return response;
      } else if (response && typeof response === "object") {
        // Check for common API response patterns
        if (Array.isArray((response as any).results)) {
          return (response as any).results;
        } else if (Array.isArray((response as any).products)) {
          return (response as any).products;
        } else if (Array.isArray((response as any).data)) {
          return (response as any).data;
        }
      }

      console.warn("Unexpected popular gifts response format:", response);
      return [];
    } catch (error) {
      console.error("Error fetching popular gifts:", error);
      return [];
    }
  },

  // ========== GIFT TEASER ==========
  async getGiftTeaserData(): Promise<GiftTeaserData> {
    return this.fetchData<GiftTeaserData>("/gift-teaser/", {
      cacheKey: "gift-teaser",
      cacheTTL: CACHE_CONFIG.GIFT_GUIDES.revalidate * 1000,
    });
  },

  // ========== CART OPERATIONS (no cache) ==========
  async addToCart(
    slug: string,
    quantity: number = 1,
    sizeId?: number,
  ): Promise<any> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return { message: "Item added to cart", cart_item_id: Date.now() };
    }

    try {
      const response = await this.fetchWithRetry(
        `${API_BASE_URL}/add-to-cart/${slug}/`,
        {
          method: "POST",
          body: JSON.stringify({ quantity, size_id: sizeId }),
        },
      );
      const data = await response.json();

      // Invalidate cart cache
      apiCache.clearPattern("cart:*");

      return data;
    } catch (error) {
      console.error("Add to cart error:", error);
      throw error;
    }
  },

  async getCart(): Promise<any> {
    if (USE_MOCK_DATA) {
      return {
        items: [],
        total: 0,
        message: "Cart functionality not implemented yet",
      };
    }

    return this.fetchData("/my-cart/", {
      cacheKey: "cart",
      cacheTTL: 60 * 1000, // 1 minute cache for cart
    });
  },

  async updateCartItem(
    itemId: number,
    action: "inc" | "dcr" | "rmv",
  ): Promise<any> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return { message: "Cart updated" };
    }

    try {
      const response = await this.fetchWithRetry(
        `${API_BASE_URL}/manage-cart/${itemId}/`,
        {
          method: "POST",
          body: JSON.stringify({ action }),
        },
      );
      const data = await response.json();

      // Invalidate cart cache
      apiCache.clearPattern("cart:*");

      return data;
    } catch (error) {
      console.error("Update cart error:", error);
      throw error;
    }
  },

  // ========== WISHLIST OPERATIONS ==========
  async getWishlist(): Promise<any> {
    if (USE_MOCK_DATA) {
      return {
        products: [],
        message: "Wishlist functionality not implemented yet",
      };
    }

    return this.fetchData("/wishlist/", {
      cacheKey: "wishlist",
      cacheTTL: 60 * 1000, // 1 minute cache
    });
  },

  async addToWishlist(productId: number): Promise<any> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return { message: "Product added to wishlist" };
    }

    try {
      const response = await this.fetchWithRetry(`${API_BASE_URL}/wishlist/`, {
        method: "POST",
        body: JSON.stringify({ product_id: productId }),
      });
      const data = await response.json();

      // Invalidate wishlist cache
      apiCache.clearPattern("wishlist:*");

      return data;
    } catch (error) {
      console.error("Add to wishlist error:", error);
      throw error;
    }
  },

  async removeFromWishlist(productId: number): Promise<any> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return { message: "Product removed from wishlist" };
    }

    try {
      const response = await this.fetchWithRetry(`${API_BASE_URL}/wishlist/`, {
        method: "DELETE",
        body: JSON.stringify({ product_id: productId }),
      });
      const data = await response.json();

      // Invalidate wishlist cache
      apiCache.clearPattern("wishlist:*");

      return data;
    } catch (error) {
      console.error("Remove from wishlist error:", error);
      throw error;
    }
  },

  // ========== GIFT TEASER OPERATIONS ==========
  async markAsGift(cartProductId: number): Promise<MarkAsGiftResponse> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return {
        message: "Item marked as gift",
        cart_product_id: cartProductId,
      };
    }

    try {
      const response = await this.fetchWithRetry(
        `${API_BASE_URL}/gift-teaser/mark-as-gift/`,
        {
          method: "POST",
          body: JSON.stringify({ cart_product_id: cartProductId }),
        },
      );
      return response.json();
    } catch (error: any) {
      return {
        message: "",
        error: error.message,
        cart_product_id: cartProductId,
      };
    }
  },

  async unmarkAsGift(cartProductId: number): Promise<MarkAsGiftResponse> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return {
        message: "Item unmarked as gift",
        cart_product_id: cartProductId,
      };
    }

    try {
      const response = await this.fetchWithRetry(
        `${API_BASE_URL}/gift-teaser/mark-as-gift/`,
        {
          method: "DELETE",
          body: JSON.stringify({ cart_product_id: cartProductId }),
        },
      );
      return response.json();
    } catch (error: any) {
      return {
        message: "",
        error: error.message,
        cart_product_id: cartProductId,
      };
    }
  },

  // ========== MOCK DATA METHODS (keep your existing ones) ==========
  async getMockHomepageData(): Promise<HomepageData> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    // ... (keep your existing mock data implementation)
    return {
      hero_banner: {
        message: "Make this your best Valentine's Day yet",
        image: null,
        search_placeholder: "Search for anything",
      },
      featured_interests: [
        {
          id: 1,
          title: "Linen Spotlight",
          slug: "linen-spotlight",
          image:
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=500&fit=crop",
          products_count: 156,
          icon: undefined,
        },
        // ... rest of mock data
      ],
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
    await new Promise((resolve) => setTimeout(resolve, 300));
    // ... (keep your existing mock implementation)
    return {
      page_title: "Etsy's Best Gift Guides",
      page_description:
        "Discover curated picks for every person and moment, straight from extraordinary small shops.",
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
    await new Promise((resolve) => setTimeout(resolve, 300));
    // ... (keep your existing mock implementation)
    return {
      section: {
        id: 1,
        title: "Best of Valentine's Day",
        description: "Picks you'll love",
        section_type: "best_of_valentine",
      },
      categories: [],
      products: [],
      related_searches: [],
      filters: {
        price_options: [],
        sort_options: [],
        shipping_options: [],
      },
      current_filters: {
        price: "any",
        on_sale: false,
        etsy_picks: false,
      },
    };
  },

  async getMockHomeFavouritesData(): Promise<HomeFavouritesData> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    // ... (keep your existing mock implementation)
    return {
      section: {
        id: 1,
        title: "Etsy's Guide to Home",
        description:
          "Discover original wall art, comfy bedding, unique lighting, and more from small shops.",
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
    await new Promise((resolve) => setTimeout(resolve, 300));
    // ... (keep your existing mock implementation)
    return {
      hero_title: "Etsy's Guide to Fashion",
      hero_description:
        "From custom clothing to timeless jewellery, everything you need to upgrade your wardrobe.",
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
      hero_occasions: [
        {
          id: 1,
          label: "Valentine's Day",
          date: "14 Feb",
          icon: "Heart",
          slug: "valentines-day",
          order: 1,
        },
        {
          id: 2,
          label: "Birthday",
          icon: "Cake",
          slug: "birthday",
          order: 2,
        },
        {
          id: 3,
          label: "Anniversary",
          icon: "CircleDot",
          slug: "anniversary",
          order: 3,
        },
      ],
      browse_interests: [
        { id: 1, name: "Jewellery", slug: "jewellery", order: 1 },
        { id: 2, name: "Home Decor", slug: "home-decor", order: 2 },
        { id: 3, name: "Art", slug: "art", order: 3 },
      ],
      featured_collections: [
        {
          id: 1,
          persona: {
            id: 1,
            name: "The Jewellery Lover",
            persona_type: "collection",
            bg_color: "bg-purple-50",
            accent_color: "bg-purple-600",
            slug: "jewellery-lover",
            order: 1,
          },
          title: "Resin Statement Necklaces",
          slug: "resin-statement-necklaces",
          interest_tag: "Jewellery",
          products: [
            {
              id: 101,
              title: "Resin Flower Necklace",
              slug: "resin-flower-necklace",
              price: 45.0,
              final_price: 45.0,
              main: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
              rating: 4.8,
              review_count: 120,
              is_featured: true,
              is_bestseller: false,
              is_deal: false,
              is_new_arrival: true,
              condition: "handmade",
              discount_percentage: 0,
            },
          ],
        },
      ],
      recipients: [
        {
          id: 1,
          label: "For your Partner",
          icon: "Heart",
          slug: "for-your-partner",
          order: 1,
          items: [
            {
              id: 1,
              title: "Gemstone Rings",
              slug: "gemstone-rings",
              order: 1,
            },
          ],
        },
      ],
      gift_personas: [
        {
          id: 1,
          name: "Gadget Obsessed",
          persona_type: "interest",
          bg_color: "bg-sky-200",
          accent_color: "bg-orange-500",
          slug: "gadget-obsessed",
          order: 1,
        },
      ],
      guilty_pleasures: [
        {
          id: 11,
          name: "Chocoholic",
          persona_type: "guilty_pleasure",
          bg_color: "bg-yellow-400",
          slug: "chocoholic",
          order: 1,
        },
      ],
      zodiac_signs: [
        {
          id: 16,
          name: "Aquarius",
          persona_type: "zodiac_sign",
          bg_color: "bg-green-500",
          slug: "aquarius",
          order: 1,
        },
      ],
      gift_grid_items: [
        {
          id: 1,
          title: "Date Night Ideas",
          image:
            "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop",
          size: "small",
          slug: "date-night-ideas",
          order: 1,
        },
      ],
      popular_gift_categories: [
        { id: 1, name: "Jewellery", slug: "jewellery", order: 1 },
        { id: 2, name: "Clothing", slug: "clothing", order: 2 },
      ],
    };
  },

  getMockGiftTeaserData(): GiftTeaserData {
    return {
      teaser_banner: {
        id: 1,
        title: "Make any gift extra-special with a gift teaser – it's *FREE!",
        badge_text: "✨ New",
        description: "",
        features: [
          {
            id: 1,
            icon: "ShoppingCart",
            text: "Mark as a gift to send a gift teaser! *It's free with purchase",
            order: 1,
          },
          {
            id: 2,
            icon: "Gift",
            text: "Send a special note, tracking info, and even a sneak peek",
            order: 2,
          },
          {
            id: 3,
            icon: "Send",
            text: "Share it instantly... even on the way to the party!",
            order: 3,
          },
        ],
        is_active: true,
        order: 1,
      },
      gift_card_banner: {
        id: 1,
        title: "Shop Etsy gift cards",
        description:
          "Get them something one-of-a-kind in minutes, no guesswork needed.",
        button_text: "Pick a design",
        button_url: "/gift-cards",
        gradient_from: "from-yellow-300",
        gradient_via: "via-orange-400",
        gradient_to: "to-green-500",
        is_active: true,
        order: 1,
      },
      about_section: {
        id: 1,
        title:
          "If you need gift ideas for anybody – and we mean ANYBODY – in your life, you've come to the right place.",
        description:
          "By answering a few simple questions, this fun gift finder will suggest the perfect presents based on the occasion, the person's interests, and more. Etsy takes the stress out of finding special gifts. From anniversary gifts to birthday gifts, and even gifts for the people who have everything, use Etsy to take the guesswork out of giving.",
        icon: "Gift",
        button_text_more: "More",
        button_text_less: "Less",
        is_active: true,
      },
      featured_product: {
        id: 1,
        title: "Personalised Leather Coin Purse",
        slug: "personalised-leather-coin-purse",
        short_description: "Handmade personalised leather coin purse",
        price: 29.99,
        discount_price: null,
        discount_percentage: 0,
        final_price: 29.99,
        main: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
        rating: 4.8,
        review_count: 1250,
        is_featured: true,
        is_bestseller: true,
        is_deal: false,
        is_new_arrival: false,
        condition: "handmade",
        color: "Brown",
        shop_name: "LeatherCrafts",
        etsy_pick: true,
        freeDelivery: false,
        has_video: false,
      },
    };
  },
};

// Export cache utilities for manual invalidation if needed
export const cacheUtils = {
  clearAll: () => apiCache.clear(),
  clearPattern: (pattern: string) => apiCache.clearPattern(pattern),
};
