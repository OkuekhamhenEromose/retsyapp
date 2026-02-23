'use client'

import {
  Search, Heart, Gift, ShoppingCart, Menu, Bell, ChevronDown,
  HelpCircle, ShoppingBag, MessageSquare, CreditCard, Tag,
  BookMarked, LogOut, Settings, User
} from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import CategoriesDropdown from "./CategoriesDropdown";
import SignInModal from "./SignInModal"

export interface AuthUser {
  name: string;
  avatarUrl?: string;
}

function useClickOutside(cb: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) cb();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [cb]);
  return ref;
}

// ─────────────────────────────────────────────────────────────
// Shop-Manager house/hut icon
// Etsy uses a house shape — drawn as inline SVG for accuracy
// ─────────────────────────────────────────────────────────────
const HouseIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* roof */}
    <polyline points="3 10.5 12 3 21 10.5" />
    {/* walls */}
    <path d="M5 10.5V20a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5V10.5" />
    {/* door */}
    <rect x="9.5" y="14.5" width="5" height="6" rx="0.4" />
  </svg>
);

// ─────────────────────────────────────────────────────────────
// Deals dropdown  (bell click)
// ─────────────────────────────────────────────────────────────
const DealsDropdown = ({ onClose }: { onClose: () => void }) => {
  const ref = useClickOutside(onClose);
  return (
    <div
      ref={ref}
      className="absolute right-0 top-[calc(100%+10px)] w-[380px] bg-white rounded-2xl border border-gray-100 z-[300] overflow-hidden"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.13)" }}
    >
      <div className="px-6 py-4 border-b border-gray-100 text-center">
        <h3 className="text-[15px] font-semibold text-gray-900">Deals</h3>
      </div>
      <div className="p-4">
        <div className="flex gap-3 bg-gray-50 rounded-xl p-4">
          <span className="text-[20px] mt-0.5 shrink-0">⭐</span>
          <div>
            <p className="font-semibold text-[13px] text-gray-900 mb-1">Your first update!</p>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              Look here for updates on items and shops you&apos;ve favourited – sales, new products and more.
            </p>
          </div>
        </div>
      </div>
      {/* empty-state space — mirrors real Etsy */}
      <div className="h-52" />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Profile dropdown  (avatar click — logged-in only)
// ─────────────────────────────────────────────────────────────
const ProfileDropdown = ({
  onClose,
  user,
}: {
  onClose: () => void;
  user: AuthUser;
}) => {
  const ref = useClickOutside(onClose);

  const primaryItems: {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    label: string;
    href: string;
  }[] = [
    { icon: ShoppingBag,   label: "Purchases and reviews",    href: "/purchases" },
    { icon: MessageSquare, label: "Messages",                  href: "/messages"  },
    { icon: CreditCard,    label: "Credit balance: USD 0.00",  href: "/credit"    },
    { icon: Tag,           label: "Special offers",            href: "/offers"    },
    { icon: BookMarked,    label: "Etsy Registry",             href: "/registry"  },
    { icon: HouseIcon,     label: "Sell on Etsy",              href: "/sell"      },
  ];

  return (
    <div
      ref={ref}
      className="absolute right-0 top-[calc(100%+10px)] w-[310px] bg-white rounded-2xl border border-gray-100 z-[300] overflow-hidden"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.13)" }}
    >
      {/* ── User header ───────────────────────────── */}
      <div className="flex items-center gap-3 px-5 py-4 bg-blue-50 border-b border-gray-100">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden shrink-0">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <User className="w-5 h-5 text-gray-500" />
          )}
        </div>
        <div>
          <p className="font-semibold text-[13px] text-gray-900 leading-snug">{user.name}</p>
          <Link
            href="/profile"
            className="text-[12px] text-gray-500 hover:underline"
            onClick={onClose}
          >
            View your profile
          </Link>
        </div>
      </div>

      {/* ── Primary items ─────────────────────────── */}
      <div className="py-1">
        {primaryItems.map(({ icon: Icon, label, href }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-3 px-5 py-[11px] hover:bg-gray-50 transition-colors text-[13px] text-gray-700"
            onClick={onClose}
          >
            <Icon size={18} className="text-gray-500 shrink-0" />
            {label}
          </Link>
        ))}
      </div>

      {/* ── Secondary items ───────────────────────── */}
      <div className="border-t border-gray-100 py-1">
        <Link
          href="/help-centre"
          className="flex items-center gap-3 px-5 py-[11px] hover:bg-gray-50 transition-colors text-[13px] text-gray-700"
          onClick={onClose}
        >
          <HelpCircle size={18} className="text-gray-500 shrink-0" />
          Help Centre
        </Link>
        <Link
          href="/account/settings"
          className="flex items-center gap-3 px-5 py-[11px] hover:bg-gray-50 transition-colors text-[13px] text-gray-700"
          onClick={onClose}
        >
          <Settings size={18} className="text-gray-500 shrink-0" />
          Account settings
        </Link>
        <button
          className="flex items-center gap-3 px-5 py-[11px] hover:bg-gray-50 transition-colors text-[13px] text-gray-700 w-full text-left"
          onClick={onClose}
        >
          <LogOut size={18} className="text-gray-500 shrink-0" />
          Sign out
        </button>
      </div>
    </div>
  );
};


interface HeaderProps {
  user?: AuthUser | null;
}

const Header = ({ user = null }: HeaderProps) => {
  const isLoggedIn = !!user;

  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dealsOpen,   setDealsOpen]   = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);


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
          <div className="relative">
            <button
              className="hidden md:flex items-center gap-2 text-sm font-medium text-foreground hover:underline"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
            >
              <Menu className="h-4 w-4" />
              Categories
            </button>
            <CategoriesDropdown open={categoriesOpen} onClose={() => setCategoriesOpen(false)} />
          </div>

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
            {isLoggedIn && (
              <>
                {/* 🔔 Bell / Deals */}
                <div className="relative">
                  <button
                    aria-label="Deals"
                    onClick={() => {
                      setDealsOpen((v) => !v);
                      setProfileOpen(false);
                    }}
                    className={`flex items-center gap-0.5 px-2 py-2 rounded-full transition-colors ${
                      dealsOpen
                        ? "bg-blue-50 ring-2 ring-blue-400"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <Bell className="h-6 w-6 text-gray-700" />
                    <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
                  </button>
                  {dealsOpen && (
                    <DealsDropdown onClose={() => setDealsOpen(false)} />
                  )}
                </div>

                {/* 🏠 Shop Manager */}
                <Link
                  href="/shop-manager"
                  aria-label="Shop Manager"
                  className="hidden md:flex p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700"
                >
                  <HouseIcon size={24} />
                </Link>

                {/* 👤 Profile avatar + chevron */}
                <div className="relative">
                  <button
                    aria-label="Account"
                    onClick={() => {
                      setProfileOpen((v) => !v);
                      setDealsOpen(false);
                    }}
                    className={`flex items-center gap-0.5 p-1.5 rounded-full transition-colors ${
                      profileOpen
                        ? "bg-blue-50 ring-2 ring-blue-400"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="w-[30px] h-[30px] rounded-full bg-gray-300 flex items-center justify-center overflow-hidden ring-1 ring-gray-300">
                      {user?.avatarUrl ? (
                        <img
                          src={user.avatarUrl}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                    <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
                  </button>
                  {profileOpen && user && (
                    <ProfileDropdown
                      user={user}
                      onClose={() => setProfileOpen(false)}
                    />
                  )}
                </div>
              </>
            )}
            <button
              className="hidden md:block px-3 py-2 text-sm font-medium text-foreground hover:underline"
              onClick={() => setSignInOpen(true)}
            >
              Sign in
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart className="h-6 w-6 text-foreground" />
            </button>
            <Link href="/gift-finder" className="hidden md:flex p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Gift className="h-6 w-6 text-foreground" />
            </Link>
            <Link href="/basket" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingCart className="h-6 w-6 text-foreground" />
            </Link>
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
              <Link href="/best-of-valentine" className="text-sm font-medium text-foreground hover:underline whitespace-nowrap">
                Best of Valentine's Day
              </Link>
            </li>
            <li>
              <Link href="/home-favourites" className="text-sm font-medium text-foreground hover:underline whitespace-nowrap">
                Home Favourites
              </Link>
            </li>
            <li>
              <Link href="/fashion-finds" className="text-sm font-medium text-foreground hover:underline whitespace-nowrap">
                Fashion Finds
              </Link>
            </li>
            <li>
              <Link href="/registry" className="text-sm font-medium text-foreground hover:underline whitespace-nowrap">
                Registry
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <SignInModal open={signInOpen} onOpenChange={setSignInOpen} />
    </header>
  );
};

export default Header;