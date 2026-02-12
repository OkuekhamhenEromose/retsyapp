import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegistryHero from "@/components/registry/RegistryHero";
import RegistryTypes from "@/components/registry/RegistryTypes";
import ReasonsToLove from "@/components/registry/ReasonsToLove";
import RegistryFAQ from "@/components/registry/RegistryFAQ";

export const metadata = {
  title: "Etsy Registry - Create Wedding, Baby & Gift Registries",
  description: "Create a registry for any occasion on Etsy. Find personalized gifts, custom creations, and unique items from independent sellers.",
};

const RegistryPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <RegistryHero />
        <RegistryTypes />
        <ReasonsToLove />
        <RegistryFAQ />
      </main>
      <Footer />
    </div>
  );
};

export default RegistryPage;