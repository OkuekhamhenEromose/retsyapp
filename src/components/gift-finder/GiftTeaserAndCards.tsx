'use client';

import { ShoppingCart, Gift, Send, ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { apiService, GiftTeaserData } from "@/services/api"; // Import directly from api.ts

const GiftTeaserAndCards = () => {
  const [expanded, setExpanded] = useState(false);
  const [data, setData] = useState<GiftTeaserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGiftChecked, setIsGiftChecked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cartProductId, setCartProductId] = useState<number | null>(null);
  
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const teaserData = await apiService.getGiftTeaserData();
        setData(teaserData);
        
        // Fetch cart to check if any item is already marked as gift
        if (isAuthenticated) {
          const cartData = await apiService.getCart();
          if (cartData && cartData.items && cartData.items.length > 0) {
            setCartProductId(cartData.items[0].id);
            
            // Check if this item is already marked as gift
            const savedGiftState = localStorage.getItem(`gift_${cartData.items[0].id}`);
            if (savedGiftState) {
              setIsGiftChecked(JSON.parse(savedGiftState));
            }
          }
        }
      } catch (err) {
        console.error('Error fetching gift teaser data:', err);
        setError('Failed to load gift teaser data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  const handleMarkAsGift = async () => {
    if (!isAuthenticated) {
      alert('Please sign in to mark items as gifts');
      return;
    }

    if (!cartProductId) {
      alert('No items in cart to mark as gift');
      return;
    }

    setIsProcessing(true);
    try {
      if (!isGiftChecked) {
        const result = await apiService.markAsGift(cartProductId);
        if (result.error) {
          alert(result.error);
        } else {
          setIsGiftChecked(true);
          localStorage.setItem(`gift_${cartProductId}`, JSON.stringify(true));
        }
      } else {
        const result = await apiService.unmarkAsGift(cartProductId);
        if (result.error) {
          alert(result.error);
        } else {
          setIsGiftChecked(false);
          localStorage.setItem(`gift_${cartProductId}`, JSON.stringify(false));
        }
      }
    } catch (error: any) {
      alert(error.message || 'Failed to update gift status');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      alert('Please sign in to checkout');
      return;
    }
    
    if (!cartProductId) {
      alert('Your cart is empty');
      return;
    }

    window.location.href = '/checkout';
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-etsy-orange" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-600 mb-4">{error || 'Failed to load gift teaser data'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-etsy-orange text-white rounded-full text-sm font-medium hover:bg-orange-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  const { teaser_banner, gift_card_banner, about_section, featured_product } = data;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Gift Teaser Banner */}
        {teaser_banner && (
          <div className="rounded-2xl overflow-hidden border border-gray-200 mb-16 shadow-sm hover:shadow-md transition-shadow">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
                <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-xs font-medium mb-4 w-fit text-gray-700">
                  {teaser_banner.badge_text}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                  {teaser_banner.title}
                </h3>
                <ul className="space-y-4">
                  {teaser_banner.features.map((feature) => {
                    const IconComponent = 
                      feature.icon === 'ShoppingCart' ? ShoppingCart :
                      feature.icon === 'Gift' ? Gift :
                      feature.icon === 'Send' ? Send : Gift;
                    
                    return (
                      <li key={feature.id} className="flex items-start gap-3">
                        <IconComponent className="h-5 w-5 mt-0.5 text-gray-700 shrink-0" />
                        <span className="text-sm text-gray-600">{feature.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="bg-purple-100 p-8 flex items-center justify-center min-h-[280px]">
                <div className="bg-white rounded-xl p-6 shadow-lg max-w-xs w-full text-center">
                  {featured_product ? (
                    <>
                      <div className="relative w-20 h-20 mx-auto mb-4">
                        <Image
                          src={featured_product.main}
                          alt={featured_product.title}
                          fill
                          className="object-cover rounded-lg"
                          sizes="80px"
                        />
                      </div>
                      <p className="font-medium mb-4 text-gray-900">{featured_product.title}</p>
                    </>
                  ) : (
                    <p className="font-medium mb-4 text-gray-900">Personalised Leather Coin Purse</p>
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-700">Mark order as a gift</span>
                    <button
                      onClick={handleMarkAsGift}
                      disabled={isProcessing}
                      className={`w-6 h-6 border-2 rounded transition-colors flex items-center justify-center ${
                        isGiftChecked 
                          ? 'bg-etsy-orange border-etsy-orange' 
                          : 'border-gray-300 hover:border-etsy-orange'
                      }`}
                    >
                      {isGiftChecked && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <button
                    onClick={handleProceedToCheckout}
                    disabled={isProcessing}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-full text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Proceed to checkout'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gift Cards Banner */}
        {gift_card_banner && (
          <div className="rounded-2xl overflow-hidden border border-gray-200 mb-16 shadow-sm hover:shadow-md transition-shadow">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className={`bg-gradient-to-br ${gift_card_banner.gradient_from} ${gift_card_banner.gradient_via} ${gift_card_banner.gradient_to} p-8 min-h-[200px] flex items-center justify-center`}>
                <span className="text-4xl font-bold text-white font-serif italic">Etsy</span>
              </div>
              <div className="p-8 flex flex-col justify-center bg-white">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{gift_card_banner.title}</h3>
                <p className="text-gray-600 mb-4">{gift_card_banner.description}</p>
                <Link 
                  href={gift_card_banner.button_url} 
                  className="flex items-center gap-1 font-medium hover:underline w-fit text-gray-700"
                >
                  {gift_card_banner.button_text} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* About Section */}
        {about_section && (
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start gap-6 text-left">
              <div className="w-20 h-20 rounded-full bg-gray-100 shrink-0 flex items-center justify-center mx-auto sm:mx-0">
                <Gift className="h-10 w-10 text-gray-700" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="font-bold text-gray-900 mb-3 text-lg">
                  {about_section.title}
                </p>
                {expanded && (
                  <p className="text-gray-600 text-sm leading-relaxed animate-fade-in">
                    {about_section.description}
                  </p>
                )}
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="mt-3 px-6 py-2 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors text-gray-700"
                >
                  {expanded ? about_section.button_text_less : about_section.button_text_more}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GiftTeaserAndCards;