// pages/fashion-finds.tsx
"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FashionGuideHero from "@/components/fashion/FashionGuideHero";
import FashionShopsWeLove from "@/components/fashion/FashionShopsWeLove";
import FashionProductSection from "@/components/fashion/FashionProductSection";
import FashionPromoCards from "@/components/fashion/FashionPromoCards";
import FashionTrendingNow from "@/components/fashion/FashionTrendingNow";
import FashionDiscoverMore from "@/components/fashion/FashionDiscoverMore";
import { apiService, FashionFindsData } from "@/services/api";
// import LoadingSpinner from "@/components/ui/LoadingSpinner";

const FashionFinds = () => {
  const [data, setData] = useState<FashionFindsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fashionData = await apiService.getFashionFindsData();
        setData(fashionData);
        setError(null);
      } catch (err) {
        console.error("Error fetching fashion finds data:", err);
        setError("Failed to load fashion finds data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <LoadingSpinner size="lg" />
//       </div>
//     );
//   }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-10 text-center">
          <h1 className="text-2xl font-serif text-red-600 mb-4">Error</h1>
          <p className="text-muted-foreground">{error || "Failed to load data"}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-foreground text-background rounded-full hover:bg-secondary transition-colors"
          >
            Retry
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <FashionGuideHero 
          title={data.hero_title}
          description={data.hero_description}
          categories={data.hero_categories}
        />
        <FashionShopsWeLove shops={data.shops_we_love} />
        <FashionProductSection 
          title="Personalise all your clothes" 
          products={data.personalised_clothes_products}
          filters={data.filters}
        />
        <FashionPromoCards cards={data.promo_cards} />
        <FashionProductSection 
          title="Accessorise with unique handbags" 
          products={data.unique_handbags_products}
          filters={data.filters}
        />
        <FashionTrendingNow trending={data.trending[0]} />
        <FashionProductSection 
          title="Explore personalised jewellery" 
          products={data.personalised_jewellery_products}
          filters={data.filters}
        />
        <FashionDiscoverMore discoverItems={data.discover_more} />
      </main>
      <Footer />
    </div>
  );
};

export default FashionFinds;