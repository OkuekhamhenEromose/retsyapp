'use client'

import { useEffect, useState } from "react";
import { apiService, GiftGuideSection } from "@/services/api";
import { Link } from "react-router-dom";

const BestGiftGuides = () => {
  const [sectionData, setSectionData] = useState<GiftGuideSection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.getGiftsPageData();
        const bestGuides = data.best_gift_guides[0];
        setSectionData(bestGuides);
      } catch (error) {
        console.error("Error fetching best gift guides:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#232347] py-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">Loading gift guides...</div>
        </div>
      </section>
    );
  }

  if (!sectionData) {
    return null;
  }

  // Use default guide links if API doesn't provide them
  const guideLinks = sectionData.guide_links || [
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
  ];

  // Mock images for each guide (in a real app, these would come from the API)
  const guideImages = [
    "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1548625320-cf6858a7c538?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1567016376408-0226e1d3d0c6?w=400&h=400&fit=crop",
  ];

  return (
    <section className="bg-[#232347] py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-3">
          {sectionData.title || "Etsy's Best Gift Guides"}
        </h2>
        <p className="text-white/90 text-center mb-10 text-lg">
          {sectionData.description || "Discover curated picks for every person and moment, straight from extraordinary small shops."}
        </p>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {guideLinks.map((guide, index) => (
            <Link 
              key={index} 
              to={guide.url} 
              className="group flex flex-col items-center"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden mb-3 ring-4 ring-transparent group-hover:ring-white/30 transition-all">
                <img
                  src={guideImages[index % guideImages.length]}
                  alt={guide.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-white text-sm text-center font-medium group-hover:underline">
                {guide.title} →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestGiftGuides;