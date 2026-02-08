'use client'

import { Search, Heart, Gift, ShoppingCart, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="etsy-logo text-[28px] text-etsy-orange font-bold tracking-tight">
            Etsy
          </Link>

          {/* Categories Button */}
          <button className="hidden md:flex items-center gap-2 text-sm font-medium text-foreground hover:underline">
            <Menu className="h-4 w-4" />
            Categories
          </button>

          {/* Search Bar */}
          <div className="flex-1 flex items-center">
            <form onSubmit={handleSearch} className="flex-1 relative flex">
              <input
                type="text"
                placeholder="Search for anything"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 px-4 rounded-l-full border-2 border-r-0 border-gray-300 focus:outline-none focus:border-gray-400 text-sm"
              />
              <button 
                type="submit"
                className="bg-etsy-orange hover:bg-orange-600 text-white px-5 rounded-r-full flex items-center justify-center transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            <button className="hidden md:block px-3 py-2 text-sm font-medium text-foreground hover:underline">
              Sign in
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart className="h-6 w-6 text-foreground" />
            </button>
            <button className="hidden md:flex p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Gift className="h-6 w-6 text-foreground" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingCart className="h-6 w-6 text-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center gap-8 py-3 overflow-x-auto scrollbar-hide">
            <li>
              <Link href="/gifts" className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:underline whitespace-nowrap">
                <Gift className="h-4 w-4" />
                Gifts
              </Link>
            </li>
            <li>
              <Link href="/best-of-valentines" className="text-sm font-medium text-foreground hover:underline whitespace-nowrap">
                Best of Valentine's Day
              </Link>
            </li>
            <li>
              <Link href="/home-favourites" className="text-sm font-medium text-foreground hover:underline whitespace-nowrap">
                Home Favourites
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm font-medium text-foreground hover:underline whitespace-nowrap">
                Fashion Finds
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm font-medium text-foreground hover:underline whitespace-nowrap">
                Registry
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;