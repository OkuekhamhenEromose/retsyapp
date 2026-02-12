'use client';

import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RegistryHero = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleFindRegistry = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/registry/find?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          {/* Decorative element */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[#D5E8D4] flex items-center justify-center">
              <span className="text-3xl">🎁</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 text-gray-900">
            Etsy Registry
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Make every milestone (big and small) meaningful with extra-special gifts from independent creators.
          </p>
          
          {/* Find a registry search */}
          <form onSubmit={handleFindRegistry} className="max-w-md mx-auto mb-8">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find a registry by name or email"
                className="w-full px-6 py-4 pr-36 border-2 border-gray-200 rounded-full focus:border-etsy-orange focus:outline-none transition-colors text-base"
              />
              <button
                type="submit"
                className="absolute right-2 px-6 py-2.5 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                Find
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
          
          <p className="text-sm text-gray-500">
            Looking to create a registry? <button className="text-etsy-orange hover:underline font-medium">Get started →</button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegistryHero;