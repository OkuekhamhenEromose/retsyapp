import { useEffect, useState } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import FeaturedInterests from './components/FeaturedInterests';
import DiscoverSection from './components/DiscoverSection';
import BirthdayGifts from './components/BirthdayGifts';
import GiftCategories from './components/GiftCategories';
import Categories from './components/Categories';
import TodaysDeals from './components/TodaysDeals';
import EditorsPicksVintage from './components/EditorsPicksVintage';
import WhatIsEtsy from './components/WhatIsEtsy';
import Footer from './components/Footer';
import { apiService, HomepageData } from './services/api';
import './App.css';

function App() {
  const [data, setData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const homepageData = await apiService.getHomepageData();
        setData(homepageData);
      } catch (err) {
        console.error('Failed to fetch homepage data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load page data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-red-500">Error: {error || 'Failed to load page data'}</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroBanner bannerData={data.hero_banner} />
        <FeaturedInterests interests={data.featured_interests} />
        <DiscoverSection categories={data.discover_section} />
        <BirthdayGifts data={data.birthday_gifts} />
        <GiftCategories categories={data.gift_categories} />
        <Categories categories={data.categories.slice(0, 6)} />
        <TodaysDeals products={data.todays_deals} />
        <EditorsPicksVintage products={data.editors_picks_vintage} />
        <WhatIsEtsy />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
