'use client';

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/auth/AuthModal";

// Use placeholder images if assets aren't available
const registryWedding = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop";
const registryBaby = "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=600&fit=crop";
const registryGift = "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800&h=600&fit=crop";

const registryTypes = [
  {
    image: registryWedding,
    title: "Wedding Registry",
    description: "Start your new life together with personalised pieces, well-crafted housewares, and more from independent sellers.",
    icon: "💍",
    color: "bg-rose-50",
    link: "/registry/create?type=wedding"
  },
  {
    image: registryBaby,
    title: "Baby Registry",
    description: "Welcome your little one with custom baby blankets, hand-knitted booties, personalised nursery decor, and cuddly creations.",
    icon: "👶",
    color: "bg-blue-50",
    link: "/registry/create?type=baby"
  },
  {
    image: registryGift,
    title: "Gift Registry",
    description: "Celebrate birthdays, anniversaries, housewarmings, or any occasion with a wishlist of incredible finds for every budget.",
    icon: "🎉",
    color: "bg-purple-50",
    link: "/registry/create?type=gift"
  },
];

const RegistryTypes = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleGetStarted = (link: string) => {
    if (isAuthenticated) {
      window.location.href = link;
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-4 text-gray-900">
              Create the perfect registry
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from three registry types, each tailored to your special moment
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {registryTypes.map((type, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={type.image}
                    alt={type.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className={`absolute top-4 left-4 w-12 h-12 rounded-full ${type.color} flex items-center justify-center text-2xl shadow-md`}>
                    {type.icon}
                  </div>
                </div>
                
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-serif mb-3 text-gray-900">
                    {type.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {type.description}
                  </p>
                  <button
                    onClick={() => handleGetStarted(type.link)}
                    className="px-8 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2 group/btn"
                  >
                    Get started
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="signin"
      />
    </>
  );
};

export default RegistryTypes;