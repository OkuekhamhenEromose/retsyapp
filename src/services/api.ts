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
};
