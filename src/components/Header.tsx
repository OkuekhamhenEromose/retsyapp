'use client'

import { Search, Heart, ShoppingCart, Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Top Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-6">
          {/* Left side: Logo and Categories */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/" className="etsy-logo text-[28px] text-etsy-orange font-bold tracking-tight">
              Etsy
            </Link>

            {/* Categories Button - Desktop */}
            <button className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline">
              <Menu className="h-4 w-4" />
              Categories
            </button>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search for anything"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2.5 px-4 rounded-l-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-etsy-orange focus:border-etsy-orange text-sm"
                />
                <button className="bg-etsy-orange hover:bg-orange-600 text-white px-6 py-2.5 rounded-r-full flex items-center justify-center transition-colors -ml-px">
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right side: Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline">
              Sign in
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <Heart className="h-5 w-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingCart className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar - Matches screenshot exactly */}
      <nav className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-2.5">
            <ul className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
              <li>
                <Link 
                  href="/gifts" 
                  className="nav-item flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Gifts
                </Link>
              </li>
              <li>
                <Link href="#" className="nav-item text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap">
                  Top 100 Galentine's Finds
                </Link>
              </li>
              <li>
                <Link href="#" className="nav-item text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap">
                  Home Favourites
                </Link>
              </li>
              <li>
                <Link href="#" className="nav-item text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap">
                  Fashion Finds
                </Link>
              </li>
              <li>
                <Link href="#" className="nav-item text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap">
                  Registry
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;