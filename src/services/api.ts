const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/estyecomapp";
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

// Export all interfaces
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
  icon?: string | null; // Allow null
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
  discount_price?: number | null; // Allow null
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
  color?: string | null; // Allow null
  // Optional fields present in some API/mock payloads
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

export const apiService = {
  // Get complete homepage data with improved error handling
  async getHomepageData(): Promise<HomepageData> {
    // If mock data is enabled, return mock data immediately
    if (USE_MOCK_DATA) {
      console.log("Using mock data (NEXT_PUBLIC_USE_MOCK_DATA=true)");
      return await this.getMockHomepageData();
    }

    try {
      console.log(
        "Fetching homepage data from:",
        `${API_BASE_URL}/estyecomapp/homepage/`,
      );

      const response = await fetch(`${API_BASE_URL}/estyecomapp/homepage/`, {
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status, response.statusText);

      if (!response.ok) {
        let errorText = "No error message available";
        try {
          errorText = await response.text();
          // Try to parse as JSON
          try {
            const errorJson = JSON.parse(errorText);
            errorText = JSON.stringify(errorJson);
          } catch {
            // Keep as text if not JSON
          }
        } catch {
          // Ignore error reading response
        }

        console.error("API Error Response:", {
          status: response.status,
          statusText: response.statusText,
          url: response.url,
          error: errorText || "Empty response",
        });

        // Fall back to mock data if API fails
        console.log("API request failed, falling back to mock data");
        return await this.getMockHomepageData();
      }

      const data = await response.json();
      console.log("API response received successfully");
      return data;
    } catch (error: any) {
      console.error(
        "Fetch failed completely:",
        error?.message || "Unknown error",
      );
      console.log("Network error, returning mock data");
      return await this.getMockHomepageData();
    }
  },

  // Mock homepage data for development
  async getMockHomepageData(): Promise<HomepageData> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

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
          icon: undefined, // Use undefined instead of null
        },
        {
          id: 2,
          title: "Tactile Glass",
          slug: "tactile-glass",
          image:
            "https://images.unsplash.com/photo-1548625320-cf6858a7c538?w=400&h=500&fit=crop",
          products_count: 89,
          icon: undefined,
        },
        {
          id: 3,
          title: "Handcrafted Home",
          slug: "handcrafted-home",
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=500&fit=crop",
          products_count: 234,
          icon: undefined,
        },
        {
          id: 4,
          title: "Macrame Essentials",
          slug: "macrame-essentials",
          image:
            "https://images.unsplash.com/photo-1567016376408-0226e1d3d0c6?w=400&h=500&fit=crop",
          products_count: 112,
          icon: undefined,
        },
      ],
      discover_section: [
        {
          id: 1,
          title: "Valentine's Day Cards",
          slug: "valentines-cards",
          image:
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop",
          products_count: 245,
          icon: undefined,
        },
        {
          id: 2,
          title: "Top 100 Aquarius Gifts",
          slug: "aquarius-gifts",
          image:
            "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&h=400&fit=crop",
          products_count: 100,
          icon: undefined,
        },
        {
          id: 3,
          title: "New Arrivals",
          slug: "new-arrivals",
          image:
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
          products_count: 567,
          icon: undefined,
        },
        {
          id: 4,
          title: "Best of Game Day",
          slug: "game-day",
          image:
            "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=400&h=400&fit=crop",
          products_count: 189,
          icon: undefined,
        },
        {
          id: 5,
          title: "Best of Valentine's Day",
          slug: "valentines-best",
          image:
            "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
          products_count: 342,
          icon: undefined,
        },
      ],
      birthday_gifts: {
        categories: [
          {
            id: 1,
            title: "Aquarius Gifts",
            slug: "aquarius-birthday-gifts",
            image:
              "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop",
            products_count: 150,
            icon: undefined,
          },
        ],
        products: [
          {
            id: 1,
            title: "Sweets Charcuterie Boxes",
            slug: "sweets-charcuterie-boxes",
            price: 69.99,
            discount_price: 49.98,
            discount_percentage: 29,
            final_price: 49.98,
            main: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop",
            rating: 4.8,
            review_count: 156,
            is_featured: true,
            is_bestseller: true,
            is_deal: true,
            is_new_arrival: false,
            condition: "new",
            short_description:
              "Handcrafted sweet charcuterie boxes perfect for birthdays",
            color: "Mixed",
          },
          {
            id: 2,
            title: "Cake Pops",
            slug: "cake-pops",
            price: 28.0,
            discount_price: undefined, // Use undefined instead of null
            discount_percentage: 0,
            final_price: 28.0,
            main: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=400&fit=crop",
            rating: 4.9,
            review_count: 234,
            is_featured: true,
            is_bestseller: false,
            is_deal: false,
            is_new_arrival: true,
            condition: "new",
            short_description:
              "Delicious handmade cake pops for birthday celebrations",
            color: "Assorted",
          },
          {
            id: 3,
            title: "Custom Birthday Crowns",
            slug: "custom-birthday-crowns",
            price: 65.0,
            discount_price: 32.5,
            discount_percentage: 50,
            final_price: 32.5,
            main: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop",
            rating: 4.7,
            review_count: 89,
            is_featured: true,
            is_bestseller: false,
            is_deal: true,
            is_new_arrival: false,
            condition: "new",
            short_description:
              "Personalized birthday crowns for the special day",
            color: "Gold",
          },
        ],
      },
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

  // Get specific component data
  async getComponentData(component: string): Promise<any> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/homepage/component/?component=${component}`,
      );
      if (!response.ok) {
        console.error(`Failed to fetch ${component} data:`, response.status);
        return null;
      }
      return response.json();
    } catch {
      console.error(`Network error fetching ${component} data`);
      return null;
    }
  },

  // Get products for homepage section
  async getSectionProducts(sectionType: string): Promise<{
    section: HomepageSection;
    products: Product[];
  }> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/homepage/section/${sectionType}/`,
      );
      if (!response.ok) {
        console.error(`Failed to fetch ${sectionType} data:`, response.status);
        return { section: {} as HomepageSection, products: [] };
      }
      return response.json();
    } catch {
      console.error(`Network error fetching ${sectionType} data`);
      return { section: {} as HomepageSection, products: [] };
    }
  },

  // Navigation
  async getNavigation(): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/navigation/`);
      if (!response.ok) {
        console.error("Failed to fetch navigation:", response.status);
        return null;
      }
      return response.json();
    } catch {
      console.error("Network error fetching navigation");
      return null;
    }
  },

  // Categories
  async getCategories(params?: { [key: string]: string }): Promise<Category[]> {
    try {
      const query = params ? new URLSearchParams(params).toString() : "";
      const response = await fetch(
        `${API_BASE_URL}/categories/${query ? `?${query}` : ""}`,
      );
      if (!response.ok) {
        console.error("Failed to fetch categories:", response.status);
        return [];
      }
      return response.json();
    } catch {
      console.error("Network error fetching categories");
      return [];
    }
  },

  // Category detail with products
  async getCategoryProducts(
    slug: string,
    params?: { [key: string]: string },
  ): Promise<any> {
    try {
      const query = params ? new URLSearchParams(params).toString() : "";
      const response = await fetch(
        `${API_BASE_URL}/category/${slug}/products/${query ? `?${query}` : ""}`,
      );
      if (!response.ok) {
        console.error(`Failed to fetch category ${slug}:`, response.status);
        return { category: null, products: [] };
      }
      return response.json();
    } catch {
      console.error(`Network error fetching category ${slug}`);
      return { category: null, products: [] };
    }
  },

  // Products
  async getProducts(params?: { [key: string]: string }): Promise<{
    count: number;
    next: string | null;
    previous: string | null;
    results: Product[];
  }> {
    try {
      const query = params ? new URLSearchParams(params).toString() : "";
      const response = await fetch(
        `${API_BASE_URL}/products/${query ? `?${query}` : ""}`,
      );
      if (!response.ok) {
        console.error("Failed to fetch products:", response.status);
        return { count: 0, next: null, previous: null, results: [] };
      }
      return response.json();
    } catch {
      console.error("Network error fetching products");
      return { count: 0, next: null, previous: null, results: [] };
    }
  },

  // Product detail
  async getProduct(slug: string): Promise<Product | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/product/${slug}/`);
      if (!response.ok) {
        console.error(`Failed to fetch product ${slug}:`, response.status);
        return null;
      }
      return response.json();
    } catch {
      console.error(`Network error fetching product ${slug}`);
      return null;
    }
  },

  // Top 100 gifts
  async getTop100Gifts(
    random: boolean = true,
    count: number = 20,
  ): Promise<any> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/top-100-gifts/?random=${random}&count=${count}`,
      );
      if (!response.ok) {
        console.error("Failed to fetch top 100 gifts:", response.status);
        return { title: "Top 100 Gifts", products: [] };
      }
      return response.json();
    } catch {
      console.error("Network error fetching top 100 gifts");
      return { title: "Top 100 Gifts", products: [] };
    }
  },

  // Cart operations - simplified for now
  async addToCart(
    slug: string,
    quantity: number = 1,
    sizeId?: number,
  ): Promise<any> {
    return { message: "Cart functionality not implemented yet" };
  },

  async getCart(): Promise<any> {
    return {
      items: [],
      total: 0,
      message: "Cart functionality not implemented yet",
    };
  },

  async updateCartItem(
    itemId: number,
    action: "inc" | "dcr" | "rmv",
  ): Promise<any> {
    return { message: "Cart functionality not implemented yet" };
  },

  // Wishlist
  async getWishlist(): Promise<any> {
    return {
      products: [],
      message: "Wishlist functionality not implemented yet",
    };
  },

  async addToWishlist(productId: number): Promise<any> {
    return { message: "Wishlist functionality not implemented yet" };
  },

  async removeFromWishlist(productId: number): Promise<any> {
    return { message: "Wishlist functionality not implemented yet" };
  },
  async getGiftsPageData(): Promise<GiftsPageData> {
    try {
      const response = await fetch(`${API_BASE_URL}/gifts-page/`, {
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch gifts page data:", response.status);
        return this.getMockGiftsPageData();
      }

      return response.json();
    } catch {
      console.error("Network error fetching gifts page data");
      return this.getMockGiftsPageData();
    }
  },

  async getMockGiftsPageData(): Promise<GiftsPageData> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      page_title: "Etsy's Best Gift Guides",
      page_description:
        "Discover curated picks for every person and moment, straight from extraordinary small shops.",

      best_gift_guides: [
        {
          id: 1,
          title: "Etsy's Best Gift Guides",
          section_type: "best_gift_guides",
          description:
            "Discover curated picks for every person and moment, straight from extraordinary small shops.",
          image: null,
          background_image: null,
          guide_links: [
            { title: "Best of Valentine's Day", url: "/gifts/valentines-day" },
            { title: "Top 100 Galentine's Picks", url: "/gifts/galentines" },
            { title: "Birthday Gifts", url: "/gifts/birthday" },
            { title: "Top 100 Aquarius Gifts", url: "/gifts/aquarius" },
            { title: "Milestone Birthdays", url: "/gifts/milestone" },
            { title: "Anniversary Gifts", url: "/gifts/anniversary" },
            { title: "Engagement Gifts", url: "/gifts/engagement" },
            { title: "Personalised Gifts", url: "/gifts/personalized" },
            { title: "Gifts for Him", url: "/gifts/him" },
            { title: "Gifts for Her", url: "/gifts/her" },
            { title: "Gifts for Kids", url: "/gifts/kids" },
            { title: "Gifts for Pets", url: "/gifts/pets" },
          ],
          featured_products: [],
          gift_products: [],
        },
      ],

      valentines_gifts: [
        {
          id: 2,
          title: "Valentine's Day Gifts",
          section_type: "valentines_gifts",
          description: "Find the perfect Valentine's Day gift",
          image: null,
          background_image: null,
          featured_products: [],
          gift_products: [
            {
              id: 1,
              etsy_pick: true,
              custom_title: "Boys Personalized Valentine's Day Buckle",
              custom_description: null,
              shop_name: "SewSweetDesignsForU",
              badge_text: null,
              product: {
                id: 101,
                title: "Boys Personalized Valentine's Day Buckle",
                slug: "boys-personalized-valentines-buckle",
                price: 38.0,
                discount_price: undefined,
                discount_percentage: 0,
                final_price: 38.0,
                main: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
                rating: 4.9,
                review_count: 2100,
                is_featured: true,
                is_bestseller: true,
                is_deal: false,
                is_new_arrival: false,
                condition: "new",
                short_description: "Personalized Valentine's Day gift for boys",
                color: "Red",
              },
            },
          ],
        },
      ],

      bestselling_gifts: [
        {
          id: 3,
          title: "Best-selling gifts they'll love",
          section_type: "bestselling_gifts",
          description: "Top picks based on customer reviews and sales",
          image: null,
          background_image: null,
          featured_products: [],
          gift_products: [
            {
              id: 2,
              etsy_pick: true,
              custom_title: "Embroidery Sketch Portrait Hoodies",
              custom_description: "Custom embroidery portrait hoodies",
              shop_name: null,
              badge_text: "Etsy's Pick",
              product: {
                id: 102,
                title: "Embroidery Sketch Portrait Hoodies",
                slug: "embroidery-sketch-portrait-hoodies",
                price: 47.37,
                discount_price: undefined,
                discount_percentage: 0,
                final_price: 47.37,
                main: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
                rating: 4.8,
                review_count: 2300,
                is_featured: true,
                is_bestseller: true,
                is_deal: false,
                is_new_arrival: false,
                condition: "handmade",
                short_description: "Custom embroidery portrait on hoodies",
                color: "Black",
              },
            },
          ],
        },
      ],

      personalized_presents: [
        {
          id: 4,
          title: "Presents you can personalise",
          section_type: "personalized_presents",
          description: "Customizable gifts for that personal touch",
          image: null,
          background_image: null,
          featured_products: [],
          gift_products: [
            {
              id: 3,
              etsy_pick: true,
              custom_title: "Personalised Bunny, Handmade Bunny Plush",
              custom_description: "Handmade personalized bunny plush toy",
              shop_name: "TheBunnyHat",
              badge_text: "25% off",
              product: {
                id: 103,
                title: "Personalised Bunny Plush",
                slug: "personalised-bunny-plush",
                price: 25.83,
                discount_price: 19.37,
                discount_percentage: 25,
                final_price: 19.37,
                main: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
                rating: 4.9,
                review_count: 137,
                is_featured: true,
                is_bestseller: false,
                is_deal: true,
                is_new_arrival: false,
                condition: "handmade",
                short_description: "Handmade personalized bunny plush toy",
                color: "White",
              },
            },
          ],
        },
      ],

      gift_occasions: [],
      gift_interests: [],
      gift_popular: [],
      top_rated_products: [],
    };
  },

  async getGiftGuideSection(sectionType: string): Promise<{
    section: GiftGuideSection;
    products: Product[];
  }> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/gifts-section/${sectionType}/`,
      );
      if (!response.ok) {
        console.error(`Failed to fetch ${sectionType} data:`, response.status);
        return { section: {} as GiftGuideSection, products: [] };
      }
      return response.json();
    } catch {
      console.error(`Network error fetching ${sectionType} data`);
      return { section: {} as GiftGuideSection, products: [] };
    }
  },

  async getGiftCategoryProducts(
    categorySlug: string,
    params?: { [key: string]: string },
  ): Promise<any> {
    try {
      const query = params ? new URLSearchParams(params).toString() : "";
      const response = await fetch(
        `${API_BASE_URL}/gift-category/${categorySlug}/products/${query ? `?${query}` : ""}`,
      );
      if (!response.ok) {
        console.error(
          `Failed to fetch gift category ${categorySlug}:`,
          response.status,
        );
        return { category: null, products: [] };
      }
      return response.json();
    } catch {
      console.error(`Network error fetching gift category ${categorySlug}`);
      return { category: null, products: [] };
    }
  },
  async getBestOfValentineData(params?: {
    price?: string;
    on_sale?: boolean;
    etsy_picks?: boolean;
    sort?: string;
  }): Promise<BestOfValentineData> {
    try {
      const query = params ? new URLSearchParams(params as any).toString() : "";
      const response = await fetch(
        `${API_BASE_URL}/best-of-valentine/${query ? `?${query}` : ""}`,
        {
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        console.error(
          "Failed to fetch Best of Valentine data:",
          response.status,
        );
        return this.getMockBestOfValentineData();
      }

      return response.json();
    } catch {
      console.error("Network error fetching Best of Valentine data");
      return this.getMockBestOfValentineData();
    }
  },

  async getMockBestOfValentineData(): Promise<BestOfValentineData> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      section: {
        id: 1,
        title: "Best of Valentine's Day",
        description: "Picks you'll love",
        section_type: "best_of_valentine",
      },
      categories: [
        {
          id: 1,
          title: "Valentine's Day Cards",
          slug: "valentines-day-cards",
          image:
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop",
          products_count: 245,
          icon: undefined,
        },
        {
          id: 2,
          title: "Valentine's Day Party Finds",
          slug: "valentines-day-party-finds",
          image:
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop",
          products_count: 156,
          icon: undefined,
        },
        {
          id: 3,
          title: "Top 100: Galentine's Picks",
          slug: "galentines-picks",
          image:
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop",
          products_count: 100,
          icon: undefined,
        },
        {
          id: 4,
          title: "Kid's Valentine Day Ideas",
          slug: "kids-valentine-ideas",
          image:
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop",
          products_count: 189,
          icon: undefined,
        },
        {
          id: 5,
          title: "Personalised Jewellery",
          slug: "personalised-jewellery",
          image:
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop",
          products_count: 342,
          icon: undefined,
        },
      ],
      products: [
        {
          id: 1,
          title: "Detailed Half-length Portrait,...",
          slug: "detailed-half-length-portrait",
          short_description: "Custom half-length portrait",
          price: 43.17,
          discount_price: undefined,
          discount_percentage: 0,
          final_price: 43.17,
          main: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop",
          rating: 5.0,
          review_count: 271,
          is_featured: true,
          is_bestseller: false,
          is_deal: false,
          is_new_arrival: false,
          condition: "handmade",
          shop_name: "IwaKowalska",
          etsy_pick: true,
          freeDelivery: true,
          has_video: false,
        },
        {
          id: 2,
          title: "Sylvie Heart Charm Hoops",
          slug: "sylvie-heart-charm-hoops",
          short_description: "Heart charm hoop earrings",
          price: 34.33,
          discount_price: undefined,
          discount_percentage: 0,
          final_price: 34.33,
          main: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=500&fit=crop",
          rating: 5.0,
          review_count: 3500,
          is_featured: true,
          is_bestseller: true,
          is_deal: false,
          is_new_arrival: false,
          condition: "handmade",
          shop_name: "Kateslittlestore",
          etsy_pick: false,
          freeDelivery: false,
          has_video: false,
        },
        {
          id: 3,
          title: "Amethyst gold birthstone bracelet",
          slug: "amethyst-gold-birthstone-bracelet",
          short_description: "Amethyst birthstone gold bracelet",
          price: 70.09,
          discount_price: undefined,
          discount_percentage: 0,
          final_price: 70.09,
          main: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=500&fit=crop",
          rating: 4.9,
          review_count: 833,
          is_featured: false,
          is_bestseller: true,
          is_deal: false,
          is_new_arrival: true,
          condition: "handmade",
          shop_name: "Claudetteworters",
          etsy_pick: true,
          freeDelivery: false,
          has_video: false,
        },
        {
          id: 4,
          title: "Personalised Groomsmen Bracelet",
          slug: "personalised-groomsmen-bracelet",
          short_description: "Personalized groomsmen bracelet",
          price: 17.81,
          discount_price: 12.46,
          discount_percentage: 30,
          final_price: 12.46,
          main: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=500&fit=crop",
          rating: 4.9,
          review_count: 14100,
          is_featured: true,
          is_bestseller: true,
          is_deal: true,
          is_new_arrival: false,
          condition: "handmade",
          shop_name: "CustomYourMoment",
          etsy_pick: false,
          freeDelivery: true,
          has_video: true,
        },
        // Add more products as needed...
      ],
      related_searches: [
        "custom embroidered sage green bows",
        "ceramic pot mug",
        "lucky is to have you",
        "valentines day cards",
        "classroom",
        "family portrait",
        "love lounge",
      ],
      filters: {
        price_options: [
          { value: "any", label: "Any price" },
          { value: "under25", label: "Under $25" },
          { value: "25to50", label: "$25 to $50" },
          { value: "50to100", label: "$50 to $100" },
          { value: "over100", label: "Over $100" },
        ],
        sort_options: [
          { value: "relevance", label: "Relevance" },
          { value: "low_to_high", label: "Price: Low to High" },
          { value: "high_to_low", label: "Price: High to Low" },
          { value: "top_rated", label: "Top Rated" },
        ],
        shipping_options: [
          { value: "anywhere", label: "Anywhere" },
          { value: "US", label: "United States" },
          { value: "AU", label: "Australia" },
          { value: "CA", label: "Canada" },
          { value: "FR", label: "France" },
        ],
      },
      current_filters: {
        price: "any",
        on_sale: false,
        etsy_picks: false,
      },
    };
  },

  async getHomeFavouritesData(): Promise<HomeFavouritesData> {
    try {
      const response = await fetch(`${API_BASE_URL}/home-favourites/`, {
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch home favourites data:", response.status);
        return this.getMockHomeFavouritesData();
      }

      return response.json();
    } catch {
      console.error("Network error fetching home favourites data");
      return this.getMockHomeFavouritesData();
    }
  },

  async getMockHomeFavouritesData(): Promise<HomeFavouritesData> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      section: {
        id: 1,
        title: "Etsy's Guide to Home",
        description:
          "Discover original wall art, comfy bedding, unique lighting, and more from small shops.",
        section_type: "home_favourites",
      },
      hero_categories: [
        {
          title: "Home Decor",
          image:
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
          slug: "home-decor",
        },
        {
          title: "Kitchen & Dining",
          image:
            "https://images.unsplash.com/photo-1548625320-cf6858a7c538?w=400&h=400&fit=crop",
          slug: "kitchen-dining",
        },
        {
          title: "Furniture",
          image:
            "https://images.unsplash.com/photo-1567016376408-0226e1d3d0c6?w=400&h=400&fit=crop",
          slug: "furniture",
        },
        {
          title: "Vintage Rugs",
          image:
            "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400&h=400&fit=crop",
          slug: "vintage-rugs",
        },
        {
          title: "Lighting",
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
          slug: "lighting",
        },
        {
          title: "Bedding",
          image:
            "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop",
          slug: "bedding",
        },
      ],
      home_categories: [
        {
          id: 1,
          title: "Artisanal Dinnerware",
          slug: "artisanal-dinnerware",
          image:
            "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=400&fit=crop",
          products_count: 156,
          category_type: "home_favourites",
        },
        {
          id: 2,
          title: "Outdoor Furniture & Decor",
          slug: "outdoor-furniture-decor",
          image:
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
          products_count: 89,
          category_type: "home_favourites",
        },
        {
          id: 3,
          title: "Garden Decor & Supplies",
          slug: "garden-decor-supplies",
          image:
            "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
          products_count: 234,
          category_type: "home_favourites",
        },
        {
          id: 4,
          title: "Personalised Home Decor",
          slug: "personalised-home-decor",
          image:
            "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&h=400&fit=crop",
          products_count: 112,
          category_type: "home_favourites",
        },
        {
          id: 5,
          title: "Candles & Home Fragrance",
          slug: "candles-home-fragrance",
          image:
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
          products_count: 245,
          category_type: "home_favourites",
        },
        {
          id: 6,
          title: "Vintage Home Decor",
          slug: "vintage-home-decor",
          image:
            "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=400&h=400&fit=crop",
          products_count: 189,
          category_type: "home_favourites",
        },
      ],
      small_shops: [
        {
          name: "OliveLaneInteriors",
          rating: 5,
          reviewCount: "100",
          images: [
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1548625320-cf6858a7c538?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1567016376408-0226e1d3d0c6?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
          ],
        },
        {
          name: "BrooxFurniture",
          rating: 5,
          reviewCount: "116",
          images: [
            "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1548625320-cf6858a7c538?w=400&h=400&fit=crop",
          ],
        },
        {
          name: "ForestlandLinen",
          rating: 5,
          reviewCount: "4,977",
          images: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1567016376408-0226e1d3d0c6?w=400&h=400&fit=crop",
          ],
        },
        {
          name: "MDTMobilier",
          rating: 3,
          reviewCount: "70",
          images: [
            "https://images.unsplash.com/photo-1548625320-cf6858a7c538?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
            "https://images.unsplash.com/photo-1548625320-cf6858a7c538?w=400&h=400&fit=crop",
          ],
        },
      ],
      spring_linens_products: [
        {
          id: 1,
          title: "Linen Shower Curtain Livingroom Curtai...",
          slug: "linen-shower-curtain",
          short_description: "Linen shower curtain",
          price: 39.0,
          discount_price: undefined,
          discount_percentage: 0,
          final_price: 39.0,
          main: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=500&fit=crop",
          rating: 4.8,
          review_count: 6900,
          is_featured: true,
          is_bestseller: true,
          is_deal: false,
          is_new_arrival: false,
          condition: "new",
          shop_name: "LinenByMN",
          etsy_pick: true,
          freeDelivery: false,
          has_video: false,
        },
        // Add more products...
      ],
      reorganizing_products: [
        {
          id: 101,
          title: "Spice Labels | Custom Handmade Vinta...",
          slug: "spice-labels",
          short_description: "Custom spice labels",
          price: 4.5,
          discount_price: undefined,
          discount_percentage: 0,
          final_price: 4.5,
          main: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=500&fit=crop",
          rating: 5.0,
          review_count: 100,
          is_featured: true,
          is_bestseller: false,
          is_deal: false,
          is_new_arrival: true,
          condition: "handmade",
          shop_name: "OliveLaneInteriors",
          etsy_pick: true,
          freeDelivery: false,
          has_video: false,
        },
        // Add more products...
      ],
      discover_categories: [
        {
          title: "Special Starts on Etsy",
          image:
            "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
          slug: "special-starts",
        },
        {
          title: "Global Seller Spotlight",
          image:
            "https://images.unsplash.com/photo-1567016376408-0226e1d3d0c6?w=400&h=400&fit=crop",
          slug: "global-seller",
        },
        {
          title: "Vintage Home Decor",
          image:
            "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400&h=400&fit=crop",
          slug: "vintage-home-decor",
        },
        {
          title: "Explore Unique Wall Art",
          image:
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
          slug: "unique-wall-art",
        },
      ],
      filters: {
        price_options: [
          { value: "any", label: "Any price" },
          { value: "under25", label: "Under USD 25" },
          { value: "25to50", label: "USD 25 to USD 50" },
          { value: "50to100", label: "USD 50 to USD 100" },
          { value: "over100", label: "Over USD 100" },
          { value: "custom", label: "Custom" },
        ],
      },
    };
  },
  // Add to the apiService object in api.ts
  async getFashionFindsData(): Promise<FashionFindsData> {
    try {
      const response = await fetch(`${API_BASE_URL}/fashion-finds/`, {
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch fashion finds data:", response.status);
        return this.getMockFashionFindsData();
      }

      return response.json();
    } catch {
      console.error("Network error fetching fashion finds data");
      return this.getMockFashionFindsData();
    }
  },

  async getMockFashionFindsData(): Promise<FashionFindsData> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Mock data that matches the UI
    return {
      hero_title: "Etsy's Guide to Fashion",
      hero_description:
        "From custom clothing to timeless jewellery, everything you need to upgrade your wardrobe.",

      hero_categories: [
        {
          id: 1,
          title: "Women's Clothing",
          slug: "womens-clothing",
          image:
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop",
          products_count: 1245,
          icon: undefined,
          category_type: "fashion_finds",
        },
        {
          id: 2,
          title: "Men's Clothing",
          slug: "mens-clothing",
          image:
            "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=400&h=400&fit=crop",
          products_count: 845,
          icon: undefined,
          category_type: "fashion_finds",
        },
        {
          id: 3,
          title: "Kids & Baby Clothing",
          slug: "kids-baby-clothing",
          image:
            "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop",
          products_count: 567,
          icon: undefined,
          category_type: "fashion_finds",
        },
        {
          id: 4,
          title: "Free Delivery: Cosy Knits",
          slug: "cosy-knits",
          image:
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
          products_count: 234,
          icon: undefined,
          category_type: "fashion_finds",
        },
        {
          id: 5,
          title: "Personalised Tees & Sweatshirts",
          slug: "personalised-tees-sweatshirts",
          image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
          products_count: 892,
          icon: undefined,
          category_type: "fashion_finds",
        },
        {
          id: 6,
          title: "Jackets & Coats",
          slug: "jackets-coats",
          image:
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
          products_count: 456,
          icon: undefined,
          category_type: "fashion_finds",
        },
        {
          id: 7,
          title: "Hats & Beanies",
          slug: "hats-beanies",
          image:
            "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=400&fit=crop",
          products_count: 189,
          icon: undefined,
          category_type: "fashion_finds",
        },
        {
          id: 8,
          title: "Handbags",
          slug: "handbags",
          image:
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
          products_count: 723,
          icon: undefined,
          category_type: "fashion_finds",
        },
        {
          id: 9,
          title: "Bag Charms & Keyrings",
          slug: "bag-charms-keyrings",
          image:
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
          products_count: 312,
          icon: undefined,
          category_type: "fashion_finds",
        },
        {
          id: 10,
          title: "Hair Accessories",
          slug: "hair-accessories",
          image:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
          products_count: 478,
          icon: undefined,
          category_type: "fashion_finds",
        },
        {
          id: 11,
          title: "Lounge & Sleepwear",
          slug: "lounge-sleepwear",
          image:
            "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
          products_count: 265,
          icon: undefined,
          category_type: "fashion_finds",
        },
        {
          id: 12,
          title: "Travel Must-Haves",
          slug: "travel-must-haves",
          image:
            "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=400&fit=crop",
          products_count: 189,
          icon: undefined,
          category_type: "fashion_finds",
        },
      ],

      shops_we_love: [
        {
          id: 1,
          name: "SbriStudio",
          slug: "sbristudio",
          rating: 5,
          review_count: 2841,
          display_name: "Sbristudio",
          description: "Handmade fashion items",
          logo: "/media/shops/sbristudio.jpg",
          cover_image: "/media/shops/sbristudio-cover.jpg",
          featured_products_preview: [],
          order: 0,
          is_featured: true,
        },
        {
          id: 2,
          name: "Plexida",
          slug: "plexida",
          rating: 5,
          review_count: 2092,
          display_name: "Plexida",
          description: "Unique fashion accessories",
          logo: "/media/shops/plexida.jpg",
          cover_image: "/media/shops/plexida-cover.jpg",
          featured_products_preview: [],
          order: 1,
          is_featured: true,
        },
        {
          id: 3,
          name: "GemBlue",
          slug: "gemblue",
          rating: 5,
          review_count: 2473,
          display_name: "GemBlue",
          description: "Jewellery and accessories",
          logo: "/media/shops/gemblue.jpg",
          cover_image: "/media/shops/gemblue-cover.jpg",
          featured_products_preview: [],
          order: 2,
          is_featured: true,
        },
        {
          id: 4,
          name: "LetterParty",
          slug: "letterparty",
          rating: 5,
          review_count: 273,
          display_name: "LetterParty",
          description: "Personalised fashion items",
          logo: "/media/shops/letterparty.jpg",
          cover_image: "/media/shops/letterparty-cover.jpg",
          featured_products_preview: [],
          order: 3,
          is_featured: true,
        },
      ],

      personalised_clothes_products: [
        {
          id: 1,
          title: "Custom Embroidered Portrait from Photo",
          slug: "custom-embroidered-portrait",
          short_description: "Custom embroidery portrait from your photo",
          price: 15.48,
          discount_price: 25.8,
          discount_percentage: 40,
          final_price: 15.48,
          main: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop",
          rating: 4.7,
          review_count: 3200,
          is_featured: true,
          is_bestseller: true,
          is_deal: true,
          is_new_arrival: false,
          condition: "handmade",
          color: "White",
          shop_name: "TypeCityCo",
          etsy_pick: true,
          freeDelivery: false,
          has_video: false,
        },
        // Add more products as needed...
      ],

      unique_handbags_products: [
        {
          id: 101,
          title: "Black Handwoven Leather Purse - Adjustable",
          slug: "black-handwoven-leather-purse",
          short_description: "Handwoven leather purse with adjustable strap",
          price: 75.0,
          discount_price: undefined,
          discount_percentage: 0,
          final_price: 75.0,
          main: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop",
          rating: 4.8,
          review_count: 892,
          is_featured: true,
          is_bestseller: false,
          is_deal: false,
          is_new_arrival: false,
          condition: "handmade",
          color: "Black",
          shop_name: "LeatherCraftCo",
          etsy_pick: true,
          freeDelivery: true,
          has_video: false,
        },
        // Add more products as needed...
      ],

      personalised_jewellery_products: [
        {
          id: 201,
          title: "Personalized gold plated secret locket necklace",
          slug: "personalized-gold-locket",
          short_description: "Gold plated secret locket necklace",
          price: 221.56,
          discount_price: undefined,
          discount_percentage: 0,
          final_price: 221.56,
          main: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=500&fit=crop",
          rating: 4.9,
          review_count: 186,
          is_featured: true,
          is_bestseller: true,
          is_deal: false,
          is_new_arrival: false,
          condition: "handmade",
          color: "Gold",
          shop_name: "Isabellebshop",
          etsy_pick: true,
          freeDelivery: true,
          has_video: false,
        },
        // Add more products as needed...
      ],

      promo_cards: [
        {
          id: 1,
          title: "Elevate your everyday jewellery",
          subtitle: "Discover unique pieces",
          description: "Find jewellery that complements your style",
          image:
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=400&fit=crop",
          button_text: "Shop now",
          button_url: "/jewellery",
          order: 0,
          is_active: true,
        },
        {
          id: 2,
          title: "The Charm Shop",
          subtitle: "Personalised charms",
          description: "Create your own charm collection",
          image:
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=400&fit=crop",
          button_text: "Shop now",
          button_url: "/charms",
          order: 1,
          is_active: true,
        },
      ],

      trending: [
        {
          id: 1,
          title: "Trending now: Burgundy hues",
          subtitle: "Winter collection",
          description:
            "Jump into one of our favourite colours for winter. The deep shade will bring a moody vibe to any outfit as we move into chillier temperatures.",
          image:
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=600&fit=crop",
          button_text: "Try it out",
          button_url: "/trending/burgundy",
          is_active: true,
        },
      ],

      discover_more: [
        {
          id: 1,
          title: "Special Starts on Etsy",
          image:
            "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
          url: "/special-starts",
          order: 0,
          is_active: true,
        },
        {
          id: 2,
          title: "The Linen Shop",
          image:
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
          url: "/linen-shop",
          order: 1,
          is_active: true,
        },
        {
          id: 3,
          title: "The Personalisation Shop",
          image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
          url: "/personalisation-shop",
          order: 2,
          is_active: true,
        },
        {
          id: 4,
          title: "Etsy's Guide to Vintage",
          image:
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
          url: "/vintage-guide",
          order: 3,
          is_active: true,
        },
      ],

      filters: {
        price_options: [
          { value: "any", label: "Any price" },
          { value: "under25", label: "Under USD 25" },
          { value: "25to50", label: "USD 25 to USD 50" },
          { value: "50to100", label: "USD 50 to USD 100" },
          { value: "over100", label: "Over USD 100" },
          { value: "custom", label: "Custom" },
        ],
      },
    };
  },
  async getGiftFinderData(): Promise<GiftFinderData> {
    if (USE_MOCK_DATA) {
      return this.getMockGiftFinderData();
    }

    try {
      const response = await fetch(`${API_BASE_URL}/gift-finder/`, {
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch gift finder data:", response.status);
        return this.getMockGiftFinderData();
      }

      return response.json();
    } catch (error) {
      console.error("Network error fetching gift finder data:", error);
      return this.getMockGiftFinderData();
    }
  },

  // Get collections by interest
  async getCollectionsByInterest(interest: string): Promise<GiftCollection[]> {
    if (USE_MOCK_DATA) {
      return this.getMockCollectionsByInterest(interest);
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/gift-finder/collections/?interest=${encodeURIComponent(interest)}`,
      );
      if (!response.ok) return [];
      return response.json();
    } catch {
      return [];
    }
  },

  // Get popular gifts by category
  async getPopularGiftsByCategory(category: string): Promise<GiftProduct[]> {
    if (USE_MOCK_DATA) {
      return this.getMockPopularGiftsByCategory(category);
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/gift-finder/popular-gifts/?category=${encodeURIComponent(category)}`,
      );
      if (!response.ok) return [];
      return response.json();
    } catch {
      return [];
    }
  },

  // Mock data for development
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
          label: "Easter",
          date: "05 Apr",
          icon: "Egg",
          slug: "easter",
          order: 2,
        },
        {
          id: 3,
          label: "Lunar New Year",
          date: "17 Feb",
          icon: "Moon",
          slug: "lunar-new-year",
          order: 3,
        },
        {
          id: 4,
          label: "Eid",
          date: "20 Mar",
          icon: "Star",
          slug: "eid",
          order: 4,
        },
        { id: 5, label: "Wedding", icon: "Cake", slug: "wedding", order: 5 },
        { id: 6, label: "Birthday", icon: "Cake", slug: "birthday", order: 6 },
        {
          id: 7,
          label: "Anniversary",
          icon: "CircleDot",
          slug: "anniversary",
          order: 7,
        },
        {
          id: 8,
          label: "Thank You",
          icon: "Mail",
          slug: "thank-you",
          order: 8,
        },
        {
          id: 9,
          label: "Sympathy",
          icon: "Flower",
          slug: "sympathy",
          order: 9,
        },
        {
          id: 10,
          label: "Get Well",
          icon: "SmilePlus",
          slug: "get-well",
          order: 10,
        },
        {
          id: 11,
          label: "Engagement",
          icon: "Gift",
          slug: "engagement",
          order: 11,
        },
      ],

      browse_interests: [
        { id: 1, name: "Jewellery", slug: "jewellery", order: 1 },
        {
          id: 2,
          name: "Beer, Wine & Cocktails",
          slug: "beer-wine-cocktails",
          order: 2,
        },
        { id: 3, name: "Crafting", slug: "crafting", order: 3 },
        { id: 4, name: "Nature", slug: "nature", order: 4 },
        { id: 5, name: "Useful Gifts", slug: "useful-gifts", order: 5 },
        { id: 6, name: "Music", slug: "music", order: 6 },
        { id: 7, name: "Collectibles", slug: "collectibles", order: 7 },
        { id: 8, name: "Films", slug: "films", order: 8 },
        { id: 9, name: "Science", slug: "science", order: 9 },
        { id: 10, name: "Family", slug: "family", order: 10 },
        { id: 11, name: "Pets", slug: "pets", order: 11 },
        { id: 12, name: "Health & Fitness", slug: "health-fitness", order: 12 },
        { id: 13, name: "Tech", slug: "tech", order: 13 },
        { id: 14, name: "Astrology", slug: "astrology", order: 14 },
        { id: 15, name: "Cooking & Baking", slug: "cooking-baking", order: 15 },
        { id: 16, name: "Reading", slug: "reading", order: 16 },
        { id: 17, name: "Sports", slug: "sports", order: 17 },
      ],

      featured_collections: [
        {
          id: 1,
          persona: {
            id: 1,
            name: "The Vegetarian",
            persona_type: "collection",
            bg_color: "bg-green-50",
            accent_color: "bg-green-600",
            slug: "the-vegetarian",
            order: 1,
          },
          title: "Vegetable Earrings",
          slug: "vegetable-earrings",
          interest_tag: "Jewellery",
          products: [
            {
              id: 101,
              title: "Cute Veg Dangle Earrings",
              slug: "cute-veg-dangle-earrings",
              price: 5.35,
              discount_price: 7.13,
              discount_percentage: 25,
              final_price: 5.35,
              main: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
              rating: 4.5,
              review_count: 13800,
              is_featured: false,
              is_bestseller: false,
              is_deal: true,
              is_new_arrival: false,
              condition: "new",
              shop_name: "VegJewellery",
              freeDelivery: false,
            },
            {
              id: 102,
              title: "Bok choy glass earrings",
              slug: "bok-choy-glass-earrings",
              price: 19.9,
              final_price: 19.9,
              main: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=400&fit=crop",
              rating: 4.5,
              review_count: 424,
              is_featured: false,
              is_bestseller: false,
              is_deal: false,
              is_new_arrival: false,
              condition: "new",
              discount_percentage: 0,
              freeDelivery: false,
            },
            {
              id: 103,
              title: "veggie stud earrings",
              slug: "veggie-stud-earrings",
              price: 9.0,
              discount_price: 12.0,
              discount_percentage: 25,
              final_price: 9.0,
              main: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&h=400&fit=crop",
              rating: 5.0,
              review_count: 5500,
              is_featured: false,
              is_bestseller: true,
              is_deal: true,
              is_new_arrival: false,
              condition: "new",
              freeDelivery: false,
            },
            {
              id: 104,
              title: "Miniature Vegetable Green",
              slug: "miniature-vegetable-green",
              price: 15.09,
              final_price: 15.09,
              main: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
              rating: 4.5,
              review_count: 2000,
              is_featured: false,
              is_bestseller: false,
              is_deal: false,
              is_new_arrival: false,
              condition: "new",
              discount_percentage: 0,
              freeDelivery: false,
            },
            {
              id: 105,
              title: "Bok Choy Dangle Earrings",
              slug: "bok-choy-dangle-earrings",
              price: 37.0,
              final_price: 37.0,
              main: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop",
              rating: 4.5,
              review_count: 2100,
              is_featured: false,
              is_bestseller: false,
              is_deal: false,
              is_new_arrival: false,
              condition: "new",
              discount_percentage: 0,
              freeDelivery: false,
            },
            {
              id: 106,
              title: "Broccoli Stud Earrings",
              slug: "broccoli-stud-earrings",
              price: 21.18,
              final_price: 21.18,
              main: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
              rating: 5.0,
              review_count: 2600,
              is_featured: true,
              is_bestseller: false,
              is_deal: false,
              is_new_arrival: true,
              condition: "handmade",
              discount_percentage: 0,
              freeDelivery: true,
            },
          ],
        },
        {
          id: 2,
          persona: {
            id: 2,
            name: "The Jewellery Lover",
            persona_type: "collection",
            bg_color: "bg-purple-50",
            accent_color: "bg-purple-600",
            slug: "the-jewellery-lover",
            order: 2,
          },
          title: "Resin Statement Necklaces",
          slug: "resin-statement-necklaces",
          interest_tag: "Jewellery",
          products: [
            {
              id: 201,
              title: "Labradorite Necklace",
              slug: "labradorite-necklace",
              price: 24.99,
              discount_price: 83.3,
              discount_percentage: 70,
              final_price: 24.99,
              main: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
              rating: 4.5,
              review_count: 41200,
              is_featured: true,
              is_bestseller: true,
              is_deal: true,
              is_new_arrival: false,
              condition: "handmade",
              shop_name: "GemCrafts",
              freeDelivery: true,
              etsy_pick: true,
            },
            {
              id: 202,
              title: "Handmade Ceramic Heron",
              slug: "handmade-ceramic-heron",
              price: 33.59,
              final_price: 33.59,
              main: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
              rating: 5.0,
              review_count: 3300,
              is_featured: false,
              is_bestseller: true,
              is_deal: false,
              is_new_arrival: true,
              condition: "handmade",
              discount_percentage: 0,
              freeDelivery: false,
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
            {
              id: 2,
              title: "Self Care Gift Boxes",
              slug: "self-care-gift-boxes",
              order: 2,
            },
            {
              id: 3,
              title: "Handmade Candles",
              slug: "handmade-candles",
              order: 3,
            },
            {
              id: 4,
              title: "Birthstone Jewellery",
              slug: "birthstone-jewellery",
              order: 4,
            },
            {
              id: 5,
              title: "Handmade Leather Bracelets",
              slug: "handmade-leather-bracelets",
              order: 5,
            },
            { id: 6, title: "Date Ideas", slug: "date-ideas", order: 6 },
          ],
        },
        {
          id: 2,
          label: "For your Parent",
          icon: "Users",
          slug: "for-your-parent",
          order: 2,
          items: [
            {
              id: 7,
              title: "Desk Organisers and Trays",
              slug: "desk-organisers-trays",
              order: 1,
            },
            {
              id: 8,
              title: "Monogram Washbags",
              slug: "monogram-washbags",
              order: 2,
            },
            {
              id: 9,
              title: "Handmade Leather Keyrings",
              slug: "handmade-leather-keyrings",
              order: 3,
            },
            {
              id: 10,
              title: "Handmade Bath Products",
              slug: "handmade-bath-products",
              order: 4,
            },
            {
              id: 11,
              title: "Birthstone Rings",
              slug: "birthstone-rings",
              order: 5,
            },
            { id: 12, title: "Spa Gift Sets", slug: "spa-gift-sets", order: 6 },
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
        {
          id: 2,
          name: "Adventurer",
          persona_type: "interest",
          bg_color: "bg-sky-200",
          accent_color: "bg-orange-500",
          slug: "adventurer",
          order: 2,
        },
        {
          id: 3,
          name: "K-pop Stan",
          persona_type: "interest",
          bg_color: "bg-green-500",
          accent_color: "bg-yellow-400",
          slug: "k-pop-stan",
          order: 3,
        },
        {
          id: 4,
          name: "Music Lover",
          persona_type: "interest",
          bg_color: "bg-blue-600",
          accent_color: "bg-blue-300",
          slug: "music-lover",
          order: 4,
        },
        {
          id: 5,
          name: "Science Buff",
          persona_type: "interest",
          bg_color: "bg-orange-400",
          accent_color: "bg-sky-200",
          slug: "science-buff",
          order: 5,
        },
        {
          id: 6,
          name: "Fisherman",
          persona_type: "interest",
          bg_color: "bg-orange-400",
          accent_color: "bg-sky-200",
          slug: "fisherman",
          order: 6,
        },
        {
          id: 7,
          name: "Renaissance Faire Fan",
          persona_type: "interest",
          bg_color: "bg-yellow-400",
          accent_color: "bg-purple-300",
          slug: "renaissance-faire-fan",
          order: 7,
        },
        {
          id: 8,
          name: "Crafter",
          persona_type: "interest",
          bg_color: "bg-green-800",
          accent_color: "bg-yellow-400",
          slug: "crafter",
          order: 8,
        },
        {
          id: 9,
          name: "Girlfriend",
          persona_type: "interest",
          bg_color: "bg-yellow-300",
          accent_color: "bg-green-400",
          slug: "girlfriend",
          order: 9,
        },
        {
          id: 10,
          name: "Coffee Connoisseur",
          persona_type: "interest",
          bg_color: "bg-green-500",
          accent_color: "bg-green-300",
          slug: "coffee-connoisseur",
          order: 10,
        },
      ],

      guilty_pleasures: [
        {
          id: 11,
          name: "Alien Obsessed",
          persona_type: "guilty_pleasure",
          bg_color: "bg-yellow-400",
          slug: "alien-obsessed",
          order: 1,
        },
        {
          id: 12,
          name: "Pasta Lover",
          persona_type: "guilty_pleasure",
          bg_color: "bg-yellow-400",
          slug: "pasta-lover",
          order: 2,
        },
        {
          id: 13,
          name: "Karaoke Crooner",
          persona_type: "guilty_pleasure",
          bg_color: "bg-green-800",
          slug: "karaoke-crooner",
          order: 3,
        },
        {
          id: 14,
          name: "Chocoholic",
          persona_type: "guilty_pleasure",
          bg_color: "bg-green-500",
          slug: "chocoholic",
          order: 4,
        },
        {
          id: 15,
          name: "Anime Fan",
          persona_type: "guilty_pleasure",
          bg_color: "bg-green-500",
          slug: "anime-fan",
          order: 5,
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
        {
          id: 17,
          name: "Astrology Expert",
          persona_type: "zodiac_sign",
          bg_color: "bg-yellow-300",
          slug: "astrology-expert",
          order: 2,
        },
        {
          id: 18,
          name: "Scorpio",
          persona_type: "zodiac_sign",
          bg_color: "bg-orange-500",
          slug: "scorpio",
          order: 3,
        },
        {
          id: 19,
          name: "Taurus",
          persona_type: "zodiac_sign",
          bg_color: "bg-sky-200",
          slug: "taurus",
          order: 4,
        },
        {
          id: 20,
          name: "Gemini",
          persona_type: "zodiac_sign",
          bg_color: "bg-orange-400",
          slug: "gemini",
          order: 5,
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
        {
          id: 2,
          title: '"Reasons I Love You" Gifts',
          image:
            "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=400&h=400&fit=crop",
          size: "large",
          slug: "reasons-i-love-you",
          order: 2,
        },
        {
          id: 3,
          title: "Forever Flowers",
          image:
            "https://images.unsplash.com/photo-1532153955177-f59af40d6472?w=400&h=400&fit=crop",
          size: "small",
          slug: "forever-flowers",
          order: 3,
        },
        {
          id: 4,
          title: "Valentine's Day Cards",
          image:
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop",
          size: "small",
          slug: "valentines-cards",
          order: 4,
        },
        {
          id: 5,
          title: "Pocket Hugs",
          image:
            "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop",
          size: "small",
          slug: "pocket-hugs",
          order: 5,
        },
        {
          id: 6,
          title: "Where We Met Gifts",
          image:
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop",
          size: "large",
          slug: "where-we-met",
          order: 6,
        },
        {
          id: 7,
          title: "Artisanal Chocolate Boxes",
          image:
            "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop",
          size: "small",
          slug: "chocolate-boxes",
          order: 7,
        },
        {
          id: 8,
          title: "Pressed Flower Gifts",
          image:
            "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=400&h=400&fit=crop",
          size: "small",
          slug: "pressed-flower",
          order: 8,
        },
      ],

      popular_gift_categories: [
        { id: 1, name: "Jewellery", slug: "jewellery", order: 1 },
        { id: 2, name: "Clothing", slug: "clothing", order: 2 },
        { id: 3, name: "Home Decor", slug: "home-decor", order: 3 },
        { id: 4, name: "Accessories", slug: "accessories", order: 4 },
        { id: 5, name: "Pet Gifts", slug: "pet-gifts", order: 5 },
      ],
    };
  },

  getMockCollectionsByInterest(interest: string): GiftCollection[] {
    return this.getMockGiftFinderData().featured_collections;
  },

  getMockPopularGiftsByCategory(category: string): GiftProduct[] {
    const products = [
      {
        id: 301,
        title: "Gold Chain Necklace",
        slug: "gold-chain-necklace",
        price: 58.0,
        final_price: 58.0,
        main: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=500&fit=crop",
        rating: 4.8,
        review_count: 1200,
        is_featured: true,
        is_bestseller: true,
        is_deal: false,
        is_new_arrival: false,
        condition: "new",
        discount_percentage: 0,
        freeDelivery: false,
      },
      {
        id: 302,
        title: "Ceramic Coffee Mug",
        slug: "ceramic-coffee-mug",
        price: 45.0,
        final_price: 45.0,
        main: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=500&fit=crop",
        rating: 4.6,
        review_count: 890,
        is_featured: false,
        is_bestseller: true,
        is_deal: false,
        is_new_arrival: true,
        condition: "handmade",
        discount_percentage: 0,
        freeDelivery: false,
      },
      {
        id: 303,
        title: "Leather Watch Box",
        slug: "leather-watch-box",
        price: 38.0,
        final_price: 38.0,
        main: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=500&fit=crop",
        rating: 4.7,
        review_count: 560,
        is_featured: false,
        is_bestseller: false,
        is_deal: false,
        is_new_arrival: false,
        condition: "new",
        discount_percentage: 0,
        freeDelivery: false,
      },
      {
        id: 304,
        title: "Crochet Blanket",
        slug: "crochet-blanket",
        price: 45.0,
        final_price: 45.0,
        main: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=500&fit=crop",
        rating: 4.9,
        review_count: 2100,
        is_featured: true,
        is_bestseller: true,
        is_deal: false,
        is_new_arrival: false,
        condition: "handmade",
        discount_percentage: 0,
        freeDelivery: true,
      },
      {
        id: 305,
        title: "Valentine's Day Card",
        slug: "valentines-day-card",
        price: 27.3,
        discount_price: 39.0,
        discount_percentage: 30,
        final_price: 27.3,
        main: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=500&fit=crop",
        rating: 4.8,
        review_count: 3400,
        is_featured: false,
        is_bestseller: true,
        is_deal: true,
        is_new_arrival: false,
        condition: "new",
        freeDelivery: false,
      },
      {
        id: 306,
        title: "Photo Pillow",
        slug: "photo-pillow",
        price: 50.0,
        final_price: 50.0,
        main: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=500&fit=crop",
        rating: 4.5,
        review_count: 780,
        is_featured: false,
        is_bestseller: false,
        is_deal: false,
        is_new_arrival: true,
        condition: "handmade",
        discount_percentage: 0,
        freeDelivery: false,
      },
      {
        id: 307,
        title: "Vintage Stickers Pack",
        slug: "vintage-stickers",
        price: 205.53,
        final_price: 205.53,
        main: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&h=500&fit=crop",
        rating: 4.9,
        review_count: 150,
        is_featured: true,
        is_bestseller: false,
        is_deal: false,
        is_new_arrival: true,
        condition: "vintage",
        discount_percentage: 0,
        freeDelivery: false,
      },
      {
        id: 308,
        title: "Macrame Wall Hanging",
        slug: "macrame-wall-hanging",
        price: 56.0,
        final_price: 56.0,
        main: "https://images.unsplash.com/photo-1567016376408-0226e1d3d0c6?w=400&h=500&fit=crop",
        rating: 4.7,
        review_count: 430,
        is_featured: false,
        is_bestseller: true,
        is_deal: false,
        is_new_arrival: false,
        condition: "handmade",
        discount_percentage: 0,
        freeDelivery: false,
      },
    ];
    return products;
  },
};
