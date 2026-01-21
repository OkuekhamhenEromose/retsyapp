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
import Footer from "../components/Footer";
import { apiService } from '@/services/api';
import type { HomepageData } from '@/services/api'; // Use absolute path

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
      const data = await apiService.getHomepageData();
      setHomepageData(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching homepage data:', err);
      setError('Failed to load homepage data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Etsy...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchHomepageData}
            className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroBanner bannerData={homepageData?.hero_banner} />
        <FeaturedInterests interests={homepageData?.featured_interests} />
        <DiscoverSection categories={homepageData?.discover_section} />
        <BirthdayGifts data={homepageData?.birthday_gifts} />
        <GiftCategories categories={homepageData?.gift_categories} />
        <Categories categories={homepageData?.categories} />
        <TodaysDeals products={homepageData?.todays_deals} />
        <EditorsPicksVintage products={homepageData?.editors_picks_vintage} />
        <WhatIsEtsy />
      </main>
      
      <Footer />
    </div>
  );
}