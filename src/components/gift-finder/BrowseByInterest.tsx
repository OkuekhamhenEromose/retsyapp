"use client";

import { useState, useEffect } from "react";
import { Heart, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GiftCollection, GiftProduct } from "@/services/api";
import { apiService } from "@/services/api";

interface BrowseByInterestProps {
  interests: string[];
  initialCollections: GiftCollection[];
}

const BrowseByInterest = ({
  interests,
  initialCollections,
}: BrowseByInterestProps) => {
  const [selectedInterest, setSelectedInterest] = useState("Jewellery");
  const [collections, setCollections] = useState<GiftCollection[]>([]);
  const [loading, setLoading] = useState(false);

  // Ensure initialCollections is an array
  useEffect(() => {
    setCollections(Array.isArray(initialCollections) ? initialCollections : []);
  }, [initialCollections]);

  useEffect(() => {
    const fetchCollections = async () => {
      if (selectedInterest) {
        setLoading(true);
        try {
          const data =
            await apiService.getCollectionsByInterest(selectedInterest);

          // data is already guaranteed to be GiftCollection[] from the API
          if (Array.isArray(data)) {
            setCollections(data);
          } else {
            console.error("Expected array but got:", data);
            setCollections([]);
          }
        } catch (error) {
          console.error("Error fetching collections:", error);
          setCollections([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCollections();
  }, [selectedInterest]);

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  const formatReviewCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-8 text-gray-900">
          Browse by interest for the best gifts!
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {Array.isArray(interests) &&
            interests.map((interest) => (
              <button
                key={interest}
                onClick={() => setSelectedInterest(interest)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  selectedInterest === interest
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {interest}
              </button>
            ))}
          <button className="px-5 py-2.5 rounded-full text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 border border-gray-200">
            + More
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-etsy-orange"></div>
          </div>
        ) : Array.isArray(collections) && collections.length > 0 ? (
          collections.map((collection) => (
            <div key={collection.id} className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full ${collection.persona?.bg_color || "bg-gray-200"} flex items-center justify-center`}
                  >
                    <span className="text-xl">
                      {collection.persona?.icon || "🎁"}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      {collection.persona?.name || "Collection"}
                    </p>
                    <h3 className="font-bold text-gray-900">
                      {collection.title || "Untitled"}
                    </h3>
                  </div>
                </div>
                <Link
                  href={`/gift-collections/${collection.slug || collection.id}`}
                  className="flex items-center gap-1 text-sm font-medium hover:underline text-gray-700"
                >
                  Browse all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {Array.isArray(collection.products) &&
                  collection.products.map((product: GiftProduct) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      className="group"
                    >
                      <div className="aspect-square rounded-lg overflow-hidden bg-white mb-2 relative border border-gray-200">
                        <div className="relative w-full h-full">
                          <Image
                            src={product.main}
                            alt={product.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 33vw, 16vw"
                          />
                        </div>
                        <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100">
                          <Heart className="h-4 w-4 text-gray-700" />
                        </button>
                        {product.etsy_pick && (
                          <span className="absolute top-2 left-2 bg-etsy-orange text-white text-xs px-2 py-1 rounded-full">
                            Etsy's Pick
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium truncate text-gray-900">
                        {product.title}
                      </p>
                      <div className="flex items-center gap-1 text-xs">
                        <span className="text-yellow-500">
                          {"★".repeat(Math.floor(product.rating))}
                        </span>
                        <span className="text-gray-600">
                          ({formatReviewCount(product.review_count)})
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`text-sm font-medium ${product.discount_price ? "text-green-700" : "text-gray-900"}`}
                        >
                          USD {formatPrice(product.final_price)}
                        </span>
                        {product.discount_price && (
                          <span className="text-xs text-gray-500 line-through">
                            USD {formatPrice(product.price)}
                          </span>
                        )}
                        {product.discount_percentage > 0 && (
                          <span className="text-xs text-green-600">
                            ({product.discount_percentage}% off)
                          </span>
                        )}
                      </div>
                      {product.freeDelivery && (
                        <p className="text-xs text-gray-600">Free delivery</p>
                      )}
                    </Link>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No collections found for this interest.
          </div>
        )}

        <div className="text-center">
          <button className="px-8 py-4 border-2 border-gray-900 rounded-full text-base font-medium hover:bg-gray-100 transition-colors">
            Show more ideas
          </button>
        </div>
      </div>
    </section>
  );
};

export default BrowseByInterest;
