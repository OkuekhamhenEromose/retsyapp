'use client'

import {
  Search, Heart, Gift, ShoppingCart, Menu, Bell, ChevronDown,
  HelpCircle, ShoppingBag, MessageSquare, CreditCard, Tag,
  BookMarked, LogOut, Settings, User
} from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import CategoriesDropdown from "./CategoriesDropdown";
import SignInModal from "./SignInModal";
import { authService } from "@/services/auth";
import type { User as AuthUser } from "@/services/auth";

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

const HouseIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 10.5 12 3 21 10.5" />
    <path d="M5 10.5V20a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5V10.5" />
    <rect x="9.5" y="14.5" width="5" height="6" rx="0.4" />
  </svg>
);

const DealsDropdown = ({ onClose }: { onClose: () => void }) => {
  const ref = useClickOutside(onClose);
  return (
    <div ref={ref}
      className="absolute right-0 top-[calc(100%+10px)] w-[380px] bg-white rounded-2xl border border-gray-100 z-[300] overflow-hidden"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.13)" }}>
      <div className="px-6 py-4 border-b border-gray-100 text-center">
        <h3 className="text-[15px] font-semibold text-gray-900">Deals</h3>
      </div>
      <div className="p-4">
        <div className="flex gap-3 bg-gray-50 rounded-xl p-4">
          <span className="text-[20px] mt-0.5 shrink-0">⭐</span>
          <div>
            <p className="font-semibold text-[13px] text-gray-900 mb-1">Your first update!</p>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              Look here for updates on items and shops you have favourited – sales, new products and more.
            </p>
          </div>
        </div>
      </div>
      <div className="h-52" />
    </div>
  );
};

const ProfileDropdown = ({
  onClose, user, onSignOut,
}: { onClose: () => void; user: AuthUser; onSignOut: () => void; }) => {
  const ref = useClickOutside(onClose);
  const primaryItems: { icon: any; label: string; href: string; }[] = [
    { icon: ShoppingBag,   label: "Purchases and reviews",    href: "/purchases" },
    { icon: MessageSquare, label: "Messages",                  href: "/messages"  },
    { icon: CreditCard,    label: "Credit balance: USD 0.00",  href: "/credit"    },
    { icon: Tag,           label: "Special offers",            href: "/offers"    },
    { icon: BookMarked,    label: "Etsy Registry",             href: "/registry"  },
    { icon: HouseIcon,     label: "Sell on Etsy",              href: "/sell"      },
  ];
  return (
    <div ref={ref}
      className="absolute right-0 top-[calc(100%+10px)] w-[310px] bg-white rounded-2xl border border-gray-100 z-[300] overflow-hidden"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.13)" }}>
      <div className="flex items-center gap-3 px-5 py-4 bg-blue-50 border-b border-gray-100">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden shrink-0">
          {user.profile_pix
            ? <img src={user.profile_pix} alt={user.fullname} className="w-full h-full object-cover" />
            : <User className="w-5 h-5 text-gray-500" />}
        </div>
        <div>
          <p className="font-semibold text-[13px] text-gray-900">{user.fullname || user.username}</p>
          <Link href="/profile" className="text-[12px] text-gray-500 hover:underline" onClick={onClose}>
            View your profile
          </Link>
        </div>
      </div>
      <div className="py-1">
        {primaryItems.map(({ icon: Icon, label, href }) => (
          <Link key={label} href={href} onClick={onClose}
            className="flex items-center gap-3 px-5 py-[11px] hover:bg-gray-50 transition-colors text-[13px] text-gray-700">
            <Icon size={18} className="text-gray-500 shrink-0" />
            {label}
          </Link>
        ))}
      </div>
      <div className="border-t border-gray-100 py-1">
        <Link href="/help-centre" onClick={onClose}
          className="flex items-center gap-3 px-5 py-[11px] hover:bg-gray-50 transition-colors text-[13px] text-gray-700">
          <HelpCircle size={18} className="text-gray-500 shrink-0" />
          Help Centre
        </Link>
        <Link href="/account/settings" onClick={onClose}
          className="flex items-center gap-3 px-5 py-[11px] hover:bg-gray-50 transition-colors text-[13px] text-gray-700">
          <Settings size={18} className="text-gray-500 shrink-0" />
          Account settings
        </Link>
        <button onClick={() => { onClose(); onSignOut(); }}
          className="flex items-center gap-3 px-5 py-[11px] hover:bg-gray-50 transition-colors text-[13px] text-gray-700 w-full text-left">
          <LogOut size={18} className="text-gray-500 shrink-0" />
          Sign out
        </button>
      </div>
    </div>
  );
};

const Header = () => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(authService.getUser());

  useEffect(() => {
    const unsub = authService.subscribe(() => setCurrentUser(authService.getUser()));
    return unsub;
  }, []);

  const isLoggedIn = !!currentUser;
  const [searchQuery,    setSearchQuery]    = useState("");
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [signInOpen,     setSignInOpen]     = useState(false);
  const [dealsOpen,      setDealsOpen]      = useState(false);
  const [profileOpen,    setProfileOpen]    = useState(false);

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); };
  const handleSignOut = async () => { await authService.logout(); };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          <Link href="/" className="shrink-0 font-bold leading-none text-[#F1641E]"
            style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: 32 }}>
            Etsy
          </Link>
          <div className="relative">
            <button onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap shrink-0">
              <Menu className="h-[18px] w-[18px]" />
              Categories
            </button>
            <CategoriesDropdown open={categoriesOpen} onClose={() => setCategoriesOpen(false)} />
          </div>
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for"
                className="w-full h-11 pl-4 pr-12 border-2 border-gray-300 rounded-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-800 transition-colors bg-white"
              />
              <button
                type="submit"
                className="absolute right-0 h-11 w-12 flex items-center justify-center bg-[#F1641E] rounded-full hover:bg-[#d95518] transition-colors"
              >
                <Search size={18} className="text-white" />
              </button>
            </div>
          </form>
          <div className="flex items-center gap-1 shrink-0">
            {!isLoggedIn && (
              <button onClick={() => setSignInOpen(true)}
                className="hidden md:block px-3 py-2 text-sm font-medium text-gray-700 hover:underline underline-offset-2 whitespace-nowrap">
                Sign in
              </button>
            )}
            <button aria-label="Favourites" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart className="h-6 w-6 text-gray-700" />
            </button>
            <Link href="/gift-finder" aria-label="Gift finder"
              className="hidden md:flex p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Gift className="h-6 w-6 text-gray-700" />
            </Link>
            {isLoggedIn && (
              <>
                <div className="relative">
                  <button aria-label="Deals"
                    onClick={() => { setDealsOpen((v) => !v); setProfileOpen(false); }}
                    className={`flex items-center gap-0.5 px-2 py-2 rounded-full transition-colors ${dealsOpen ? "bg-blue-50 ring-2 ring-blue-400" : "hover:bg-gray-100"}`}>
                    <Bell className="h-6 w-6 text-gray-700" />
                    <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
                  </button>
                  {dealsOpen && <DealsDropdown onClose={() => setDealsOpen(false)} />}
                </div>
                <Link href="/shop-manager" aria-label="Shop Manager"
                  className="hidden md:flex p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700">
                  <HouseIcon size={24} />
                </Link>
                <div className="relative">
                  <button aria-label="Account"
                    onClick={() => { setProfileOpen((v) => !v); setDealsOpen(false); }}
                    className={`flex items-center gap-0.5 p-1.5 rounded-full transition-colors ${profileOpen ? "bg-blue-50 ring-2 ring-blue-400" : "hover:bg-gray-100"}`}>
                    <div className="w-[30px] h-[30px] rounded-full bg-gray-300 flex items-center justify-center overflow-hidden ring-1 ring-gray-300">
                      {currentUser?.profile_pix
                        ? <img src={currentUser.profile_pix} alt={currentUser.fullname} className="w-full h-full object-cover" />
                        : <User className="w-4 h-4 text-gray-500" />}
                    </div>
                    <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
                  </button>
                  {profileOpen && currentUser && (
                    <ProfileDropdown user={currentUser} onClose={() => setProfileOpen(false)} onSignOut={handleSignOut} />
                  )}
                </div>
              </>
            )}
            <Link href="/basket" aria-label="Cart"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
            </Link>
          </div>
        </div>
      </div>
      <nav className="border-t border-gray-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-4">
          <ul className="flex items-center justify-center gap-7 py-2.5 overflow-x-auto scrollbar-hide">
            {[
              { href: "/gifts",           label: "Gifts",           icon: true  },
              { href: "/best-of-easter",  label: "Best of Easter",  icon: false },
              { href: "/home-favourites", label: "Home Favourites", icon: false },
              { href: "/fashion-finds",   label: "Fashion Finds",   icon: false },
              { href: "/registry",        label: "Registry",        icon: false },
            ].map(({ href, label, icon }) => (
              <li key={href}>
                <Link href={href}
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline underline-offset-2 whitespace-nowrap">
                  {icon && <Gift className="h-4 w-4" />}
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <SignInModal open={signInOpen} onOpenChange={setSignInOpen}
        onAuthSuccess={() => setCurrentUser(authService.getUser())} />
    </header>
  );
};

export default Header;