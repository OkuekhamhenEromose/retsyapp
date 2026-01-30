'use client'

import BestGiftGuides from "@/components/gifts/BestGiftGuides";
import GiftProductSection from "@/components/gifts/GiftProductSection";

const Gifts = () => {
  return (
    <>
      <BestGiftGuides />
      
      <GiftProductSection 
        sectionType="valentines_gifts"
        defaultTitle="Valentine's Day gifts"
      />
      
      <GiftProductSection 
        sectionType="bestselling_gifts"
        defaultTitle="Best-selling gifts they'll love"
      />
      
      <GiftProductSection 
        sectionType="personalized_presents"
        defaultTitle="Presents you can personalise"
      />
    </>
  );
};

export default Gifts;