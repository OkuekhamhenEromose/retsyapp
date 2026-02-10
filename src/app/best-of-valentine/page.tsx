'use client'

import { useEffect, useState } from 'react';
import ValentinesCategoryPicks from "@/components/valentines/ValentinesCategoryPicks";
import ValentinesFilters from "@/components/valentines/ValentinesFilters";
import ValentinesProductGrid from "@/components/valentines/ValentinesProductGrid";
import ValentinesRelatedSearches from "@/components/valentines/ValentinesRelatedSearches";
import { apiService, BestOfValentineData } from '@/services/api';

const BestOfValentines = () => {
  const [data, setData] = useState<BestOfValentineData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [filters, setFilters] = useState({
    price: 'any',
    on_sale: false,
    etsy_picks: false,
    sort: 'relevance'
  });

  useEffect(() => {
    fetchValentineData();
  }, [filters]);

  const fetchValentineData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const valentineData = await apiService.getBestOfValentineData(filters);
      setData(valentineData);
      
    } catch (err: any) {
      console.error('Error fetching Valentine data:', err);
      setError('Failed to load Valentine\'s Day products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-etsy-orange"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-600">Failed to load data. Please try again.</p>
          <button 
            onClick={fetchValentineData}
            className="mt-4 px-6 py-2 bg-etsy-orange text-white rounded-full hover:bg-orange-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-serif mb-2">{data.section.title}</h1>
          <p className="text-muted-foreground text-lg">{data.section.description}</p>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-700">{error}</p>
          </div>
        )}
        
        {/* Category Picks */}
        <ValentinesCategoryPicks categories={data.categories} />
        
        {/* Filters */}
        <ValentinesFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
          filterOptions={data.filters}
        />
        
        {/* Product Grid */}
        <ValentinesProductGrid products={data.products} />
        
        {/* Related Searches */}
        <ValentinesRelatedSearches searches={data.related_searches} />
      </main>
      
    </div>
  );
};

export default BestOfValentines;