'use client'

import { useEffect, useState } from 'react';
import Header from "../components/Header";
import HeroBanner from "../components/HeroBanner";
import FeaturedInterests from "../components/FeaturedInterests";
import DiscoverSection from "../components/DiscoverSection";
import BirthdayGifts from "../components/BirthdayGifts";
import GiftCategories from "../components/GiftCategories";
import Categories from "../components/Categories";
import TodaysDeals from "../components/TodaysDeals";
import EditorsPicksVintage from "../components/EditorsPicksVintage";
import WhatIsEtsy from "../components/WhatIsEtsy";
import Subscribe from '@/components/Subscribe';
import Footer from "../components/Footer";
import { apiService } from '@/services/api';
import type { HomepageData } from '@/services/api';

export default function Home() {
  const [homepageData, setHomepageData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHomepageData();
  }, []);

  const fetchHomepageData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Starting to fetch homepage data...');
      
      // Clear any previous state
      setHomepageData(null);
      
      const data = await apiService.getHomepageData();
      console.log('Homepage data loaded:', data);
      
      setHomepageData(data);
      
    } catch (err: any) {
      console.error('Error in fetchHomepageData:', err?.message || err);
      setError('We encountered an issue loading the page. Showing demo data instead.');
      
      // Even on error, try to get mock data
      try {
        const mockData = await apiService.getMockHomepageData();
        setHomepageData(mockData);
      } catch (mockError) {
        console.error('Failed to load mock data:', mockError);
        setError('Failed to load any data. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && !homepageData) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-etsy-orange mx-auto"></div>
            <p className="mt-4 text-gray-600 text-sm">Loading Etsy...</p>
          </div>
        </div>
      </div>
    );
  }

  // If we have no data at all (even after loading), show error
  if (!homepageData) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md p-6">
            <div className="text-etsy-orange text-4xl mb-4">⚠️</div>
            <p className="text-gray-700 mb-4">
              {error || 'Failed to load homepage data'}
            </p>
            <button 
              onClick={fetchHomepageData}
              className="px-6 py-2.5 bg-etsy-orange text-white rounded-full hover:bg-orange-600 transition-colors text-sm font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
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
                  onClick={fetchHomepageData}
                  className="ml-auto text-sm font-medium text-yellow-700 hover:text-yellow-600"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}
        
        <HeroBanner bannerData={homepageData.hero_banner} />
        <FeaturedInterests interests={homepageData.featured_interests} />
        <DiscoverSection categories={homepageData.discover_section} />
        <BirthdayGifts data={homepageData.birthday_gifts} />
        <GiftCategories categories={homepageData.gift_categories} />
        <Categories categories={homepageData.categories} />
        <TodaysDeals products={homepageData.todays_deals} />
        <EditorsPicksVintage products={homepageData.editors_picks_vintage} />
        <WhatIsEtsy />
        <Subscribe />
      </main>
      
      <Footer />
    </div>
  );
}