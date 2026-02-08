import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeFavouritesHero from "@/components/home-favourites/HomeFavouritesHero";
import HomeFavouritesCategories from "@/components/home-favourites/HomeFavouritesCategories";
import DiscoverSmallShops from "@/components/home-favourites/DiscoverSmallShops";
import HomeProductSection from "@/components/home-favourites/HomeProductSection";
import DiscoverMore from "@/components/home-favourites/DiscoverMore";

// Import images - use public folder or static imports
import ceramicMug from "@/public/images/ceramic-mug.jpg";
import crochetBlanket from "@/public/images/crochet-blanket.jpg";
import linenSpotlight from "@/public/images/linen-spotlight.jpg";
import vintageRack from "@/public/images/vintage-rack.jpg";
import watchBox from "@/public/images/watch-box.jpg";
import macrame from "@/public/images/macrame.jpg";
import photoPillow from "@/public/images/photo-pillow.jpg";
import necklaces from "@/public/images/necklaces.jpg";

const springLinensProducts = [
  {
    image: crochetBlanket,
    title: "Linen Shower Curtain Livingroom Curtai...",
    rating: 4.8,
    reviewCount: "6.9k",
    shopName: "LinenByMN",
    price: 39.00,
    originalPrice: 60.00,
    discount: "35% off",
  },
  {
    image: linenSpotlight,
    title: "Large linen waffle bath towel. Organic n...",
    rating: 4.9,
    reviewCount: "2.1k",
    shopName: "ThingStories",
    price: 41.37,
    originalPrice: 68.94,
    discount: "40% off",
    freeDelivery: true,
  },
  {
    image: photoPillow,
    title: "Linen bedding set. King or Queen size d...",
    rating: 4.9,
    reviewCount: "13.4k",
    shopName: "WonderLinen",
    price: 194.25,
    originalPrice: 388.50,
    discount: "50% off",
    freeDelivery: true,
  },
  {
    image: ceramicMug,
    title: "Washed Linen Duvet Cover Natural * Qu...",
    rating: 4.9,
    reviewCount: "13.5k",
    shopName: "LinenMeStore",
    price: 127.02,
    freeDelivery: true,
  },
  {
    image: vintageRack,
    title: "Vintage Wooden Coat Rack Wall Mount...",
    rating: 4.8,
    reviewCount: "2.3k",
    shopName: "VintageHome",
    price: 45.00,
  },
  {
    image: macrame,
    title: "Natural Linen Table Runner Farmhouse...",
    rating: 4.9,
    reviewCount: "1.2k",
    shopName: "LinenLove",
    price: 28.50,
    freeDelivery: true,
  },
  {
    image: necklaces,
    title: "Organic Cotton Bed Sheets Set Queen...",
    rating: 4.7,
    reviewCount: "856",
    shopName: "OrganicBedding",
    price: 89.99,
    originalPrice: 119.99,
    discount: "25% off",
  },
  {
    image: watchBox,
    title: "Linen Throw Blanket Soft Waffle Weav...",
    rating: 4.9,
    reviewCount: "3.4k",
    shopName: "CozyLinens",
    price: 52.00,
  },
];

const reorganisingProducts = [
  {
    image: watchBox,
    title: "Spice Labels | Custom Handmade Vinta...",
    rating: 5.0,
    reviewCount: "100",
    shopName: "OliveLaneInteriors",
    price: 4.50,
  },
  {
    image: ceramicMug,
    title: "Drawer Organizer for clothing, washable...",
    rating: 4.9,
    reviewCount: "2.2k",
    shopName: "WarmGreyCompany",
    price: 14.30,
  },
  {
    image: vintageRack,
    title: "Wooden Cable Holder Mahogany Walnut...",
    rating: 4.9,
    reviewCount: "8.2k",
    shopName: "Hardwoodcase",
    price: 24.64,
    originalPrice: 28.99,
    discount: "15% off",
  },
  {
    image: macrame,
    title: "Leather Loop Hooks household storage ...",
    rating: 4.9,
    reviewCount: "8.7k",
    shopName: "Keyaiira",
    price: 15.99,
  },
  {
    image: photoPillow,
    title: "Wooden Desk Organizer Office Supplie...",
    rating: 4.8,
    reviewCount: "1.5k",
    shopName: "WoodCraft",
    price: 32.00,
  },
  {
    image: crochetBlanket,
    title: "Fabric Storage Baskets Set of 3 Organ...",
    rating: 4.7,
    reviewCount: "2.8k",
    shopName: "HomeOrganize",
    price: 24.99,
    freeDelivery: true,
  },
  {
    image: necklaces,
    title: "Wall Mounted Key Holder with Shelf Ma...",
    rating: 4.9,
    reviewCount: "945",
    shopName: "ModernWood",
    price: 38.50,
  },
  {
    image: linenSpotlight,
    title: "Closet Dividers Wooden Custom Labels...",
    rating: 4.8,
    reviewCount: "672",
    shopName: "TidyHome",
    price: 12.99,
  },
];

export default function HomeFavourites() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HomeFavouritesHero />
        <HomeFavouritesCategories />
        <DiscoverSmallShops />
        <HomeProductSection 
          title="Spring-ready linens" 
          products={springLinensProducts} 
        />
        <HomeProductSection 
          title="Unique finds for reorganising" 
          products={reorganisingProducts} 
        />
        <DiscoverMore />
      </main>
      
      <Footer />
    </div>
  );
}