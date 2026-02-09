'use client'

import { useEffect, useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeFavouritesHero from "@/components/home-favourites/HomeFavouritesHero";
import HomeFavouritesCategories from "@/components/home-favourites/HomeFavouritesCategories";
import DiscoverSmallShops from "@/components/home-favourites/DiscoverSmallShops";
import HomeProductSection from "@/components/home-favourites/HomeProductSection";
import DiscoverMore from "@/components/home-favourites/DiscoverMore";
import { apiService, type HomeFavouritesData } from '@/services/api';

export default function HomeFavouritesPage() {
  const [data, setData] = useState<HomeFavouritesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHomeFavouritesData();
  }, []);

  const fetchHomeFavouritesData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching Home Favourites data...');
      const homeFavouritesData = await apiService.getHomeFavouritesData();
      console.log('Home Favourites data loaded:', homeFavouritesData);
      
      setData(homeFavouritesData);
      
    } catch (err: any) {
      console.error('Error fetching Home Favourites data:', err);
      setError('We encountered an issue loading the page. Showing demo data instead.');
      
      // Fallback to mock data
      try {
        const mockData = await apiService.getMockHomeFavouritesData();
        setData(mockData);
      } catch (mockError) {
        console.error('Failed to load mock data:', mockError);
        setError('Failed to load any data. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-etsy-orange mx-auto"></div>
            <p className="mt-4 text-gray-600 text-sm">Loading Home Favourites...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md p-6">
            <div className="text-etsy-orange text-4xl mb-4">⚠️</div>
            <p className="text-gray-700 mb-4">
              {error || 'Failed to load Home Favourites data'}
            </p>
            <button 
              onClick={fetchHomeFavouritesData}
              className="px-6 py-2.5 bg-etsy-orange text-white rounded-full hover:bg-orange-600 transition-colors text-sm font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Transform data for components
  const heroCategories = data.hero_categories.map(cat => ({
    image: cat.image,
    label: cat.title
  }));

  const homeCategories = data.home_categories.map(cat => ({
    image: cat.image,
    label: cat.title
  }));

  const discoverCategories = data.discover_categories.map(cat => ({
    image: cat.image,
    label: cat.title
  }));

  // Transform products for HomeProductSection
  const springLinensProducts = data.spring_linens_products.map(product => ({
    image: product.main,
    title: product.title,
    rating: product.rating,
    reviewCount: product.review_count.toLocaleString() + (product.review_count > 1000 ? 'k' : ''),
    shopName: product.shop_name || 'Unknown Shop',
    price: product.price,
    originalPrice: product.discount_price ? product.price : undefined,
    discount: product.discount_price ? `${product.discount_percentage}% off` : undefined,
    freeDelivery: product.freeDelivery || false,
    isEtsyPick: product.etsy_pick || false,
  }));

  const reorganizingProducts = data.reorganizing_products.map(product => ({
    image: product.main,
    title: product.title,
    rating: product.rating,
    reviewCount: product.review_count.toLocaleString() + (product.review_count > 1000 ? 'k' : ''),
    shopName: product.shop_name || 'Unknown Shop',
    price: product.price,
    originalPrice: product.discount_price ? product.price : undefined,
    discount: product.discount_price ? `${product.discount_percentage}% off` : undefined,
    freeDelivery: product.freeDelivery || false,
    isEtsyPick: product.etsy_pick || false,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="animate-fade-in">
        {error && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="container mx-auto">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-yellow-400">⚠️</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">{error}</p>
                </div>
                <button 
                  onClick={fetchHomeFavouritesData}
                  className="ml-auto text-sm font-medium text-yellow-700 hover:text-yellow-600"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}
        
        <HomeFavouritesHero 
          title={data.section.title}
          description={data.section.description}
          categories={heroCategories}
        />
        
        <HomeFavouritesCategories categories={homeCategories} />
        
        <DiscoverSmallShops shops={data.small_shops} />
        
        <HomeProductSection 
          title="Spring-ready linens" 
          products={springLinensProducts}
          priceOptions={data.filters.price_options}
        />
        
        <HomeProductSection 
          title="Unique finds for reorganising" 
          products={reorganizingProducts}
          priceOptions={data.filters.price_options}
        />
        
        <DiscoverMore categories={discoverCategories} />
      </main>
      
      <Footer />
    </div>
  );
}