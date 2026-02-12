'use client';

import { useEffect, useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GiftFinderHero from "@/components/gift-finder/GiftFinderHero";
import GiftGrid from "@/components/gift-finder/GiftGrid";
import BrowseByInterest from "@/components/gift-finder/BrowseByInterest";
import RelatedGiftIdeas from "@/components/gift-finder/RelatedGiftIdeas";
import ExtraordinaryFinds from "@/components/gift-finder/ExtraordinaryFinds";
import GetInspired from "@/components/gift-finder/GetInspired";
import DiscoverPopularGifts from "@/components/gift-finder/DiscoverPopularGifts";
import InspireInnerGifter from "@/components/gift-finder/InspireInnerGifter";
import GiftTeaserAndCards from "@/components/gift-finder/GiftTeaserAndCards";
import { giftFinderService, GiftFinderData } from '@/services/giftFinder';

const GiftFinder = () => {
  const [data, setData] = useState<GiftFinderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const giftFinderData = await giftFinderService.getGiftFinderData();
        setData(giftFinderData);
      } catch (err) {
        console.error('Error fetching gift finder data:', err);
        setError('Failed to load gift finder data');
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
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-etsy-orange mx-auto mb-4"></div>
            <p className="text-gray-600">Loading gift ideas...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error || 'Failed to load gift finder data'}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-etsy-orange text-white rounded-full text-sm font-medium hover:bg-orange-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <GiftFinderHero occasions={data.hero_occasions} />
        <GiftGrid giftItems={data.gift_grid_items} />
        <BrowseByInterest 
          interests={data.browse_interests.map(i => i.name)} 
          initialCollections={data.featured_collections}
        />
        <RelatedGiftIdeas personas={data.gift_personas.slice(0, 5)} />
        <ExtraordinaryFinds recipients={data.recipients} />
        <GetInspired personas={data.gift_personas} />
        <DiscoverPopularGifts categories={data.popular_gift_categories} />
        <InspireInnerGifter 
          guiltyPleasures={data.guilty_pleasures} 
          zodiacSigns={data.zodiac_signs} 
        />
        <GiftTeaserAndCards />
      </main>
      <Footer />
    </div>
  );
};

export default GiftFinder;