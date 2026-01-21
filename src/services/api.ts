const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

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
  icon?: string;
  products_count: number;
}

export interface CategoryWithDetails extends Category {
  subcategories: Category[];
  featured_products: Product[];
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  short_description: string;
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
  color?: string;
}

export interface HomepageSection {
  id: number;
  title: string;
  section_type: string;
  description: string;
  image: string;
  order: number;
  products: Product[];
}

export const apiService = {
  // Get complete homepage data
  async getHomepageData(): Promise<HomepageData> {
    try {
      const response = await fetch(`${API_BASE_URL}/estyecomapp/homepage/`, {
        // Add cache control
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', {
          status: response.status,
          statusText: response.statusText,
          url: response.url,
          error: errorText
        });
        
        // Try to parse error as JSON
        try {
          const errorJson = JSON.parse(errorText);
          throw new Error(`API Error ${response.status}: ${errorJson.error || errorJson.message || 'Unknown error'}`);
        } catch {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      }
      
      return await response.json();
    } catch (error) {
      console.error('Fetch failed:', error);
      // Return a minimal fallback structure to prevent frontend crash
      return {
        hero_banner: {
          message: 'Find something you love',
          image: null,
          search_placeholder: 'Search for anything'
        },
        featured_interests: [],
        discover_section: [],
        birthday_gifts: {
          categories: [],
          products: []
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
    }
  },

  // Get specific component data
  async getComponentData(component: string): Promise<any> {
    const response = await fetch(
      `${API_BASE_URL}/homepage/component/?component=${component}`
    );
    if (!response.ok) throw new Error(`Failed to fetch ${component} data`);
    return response.json();
  },

  // Get products for homepage section
  async getSectionProducts(sectionType: string): Promise<{
    section: HomepageSection;
    products: Product[];
  }> {
    const response = await fetch(
      `${API_BASE_URL}/homepage/section/${sectionType}/`
    );
    if (!response.ok) throw new Error(`Failed to fetch ${sectionType} data`);
    return response.json();
  },

  // Navigation
  async getNavigation(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/navigation/`);
    if (!response.ok) throw new Error('Failed to fetch navigation');
    return response.json();
  },

  // Categories
  async getCategories(params?: { [key: string]: string }): Promise<Category[]> {
    const query = params ? new URLSearchParams(params).toString() : '';
    const response = await fetch(`${API_BASE_URL}/categories/${query ? `?${query}` : ''}`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },

  // Category detail with products
  async getCategoryProducts(slug: string, params?: { [key: string]: string }): Promise<any> {
    const query = params ? new URLSearchParams(params).toString() : '';
    const response = await fetch(
      `${API_BASE_URL}/category/${slug}/products/${query ? `?${query}` : ''}`
    );
    if (!response.ok) throw new Error(`Failed to fetch category ${slug}`);
    return response.json();
  },

  // Products
  async getProducts(params?: { [key: string]: string }): Promise<{
    count: number;
    next: string | null;
    previous: string | null;
    results: Product[];
  }> {
    const query = params ? new URLSearchParams(params).toString() : '';
    const response = await fetch(`${API_BASE_URL}/products/${query ? `?${query}` : ''}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  // Product detail
  async getProduct(slug: string): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/product/${slug}/`);
    if (!response.ok) throw new Error(`Failed to fetch product ${slug}`);
    return response.json();
  },

  // Top 100 gifts
  async getTop100Gifts(random: boolean = true, count: number = 20): Promise<any> {
    const response = await fetch(
      `${API_BASE_URL}/top-100-gifts/?random=${random}&count=${count}`
    );
    if (!response.ok) throw new Error('Failed to fetch top 100 gifts');
    return response.json();
  },

  // Cart operations
  async addToCart(slug: string, quantity: number = 1, sizeId?: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/add-to-cart/${slug}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity, size_id: sizeId }),
    });
    if (!response.ok) throw new Error('Failed to add to cart');
    return response.json();
  },

  async getCart(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/my-cart/`);
    if (!response.ok) throw new Error('Failed to fetch cart');
    return response.json();
  },

  async updateCartItem(itemId: number, action: 'inc' | 'dcr' | 'rmv'): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/manage-cart/${itemId}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action }),
    });
    if (!response.ok) throw new Error('Failed to update cart');
    return response.json();
  },

  // Wishlist
  async getWishlist(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/wishlist/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch wishlist');
    return response.json();
  },

  async addToWishlist(productId: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/wishlist/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ product_id: productId }),
    });
    if (!response.ok) throw new Error('Failed to add to wishlist');
    return response.json();
  },

  async removeFromWishlist(productId: number): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/wishlist/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ product_id: productId }),
    });
    if (!response.ok) throw new Error('Failed to remove from wishlist');
    return response.json();
  },
};