import { Search, Heart, Gift, ShoppingCart, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Top Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <a href="/" className="etsy-logo text-3xl text-etsy-orange">
            Etsy
          </a>

          {/* Categories Button */}
          <button className="hidden md:flex items-center gap-2 text-sm font-medium hover:underline">
            <Menu className="h-4 w-4" />
            Categories
          </button>

          {/* Search Bar */}
          <div className="flex-1 flex">
            <input
              type="text"
              placeholder="Search for anything"
              className="search-input"
            />
            <button className="search-button -ml-1">
              <Search className="h-5 w-5 text-primary-foreground" />
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block text-sm font-medium hover:underline">
              Sign in
            </button>
            <button className="p-2 hover:bg-secondary rounded-full transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            <button className="hidden md:block p-2 hover:bg-secondary rounded-full transition-colors">
              <Gift className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-full transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="border-t border-border bg-background">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-6 py-2 overflow-x-auto scrollbar-hide">
            <li>
              <a href="#" className="nav-link flex items-center gap-1.5">
                <Gift className="h-4 w-4" />
                Gifts
              </a>
            </li>
            <li>
              <a href="#" className="nav-link whitespace-nowrap">
                Top 100 Galentine's Finds
              </a>
            </li>
            <li>
              <a href="#" className="nav-link whitespace-nowrap">
                Home Favourites
              </a>
            </li>
            <li>
              <a href="#" className="nav-link whitespace-nowrap">
                Fashion Finds
              </a>
            </li>
            <li>
              <a href="#" className="nav-link whitespace-nowrap">
                Registry
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;