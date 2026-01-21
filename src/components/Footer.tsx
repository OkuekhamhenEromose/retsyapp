import { Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Shop Column */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Gift cards</a></li>
              <li><a href="#" className="hover:underline">Etsy Registry</a></li>
              <li><a href="#" className="hover:underline">Sitemap</a></li>
              <li><a href="#" className="hover:underline">Etsy blog</a></li>
              <li><a href="#" className="hover:underline">Etsy United Kingdom</a></li>
            </ul>
          </div>

          {/* Sell Column */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Sell</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Sell on Etsy</a></li>
              <li><a href="#" className="hover:underline">Teams</a></li>
              <li><a href="#" className="hover:underline">Forums</a></li>
              <li><a href="#" className="hover:underline">Affiliates & Creators</a></li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h4 className="font-semibold text-lg mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Etsy, Inc.</a></li>
              <li><a href="#" className="hover:underline">Policies</a></li>
              <li><a href="#" className="hover:underline">Investors</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Press</a></li>
              <li><a href="#" className="hover:underline">Impact</a></li>
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Help</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Help Centre</a></li>
              <li><a href="#" className="hover:underline">Privacy settings</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm hover:underline">
              <Globe className="h-4 w-4" />
              United Kingdom | English (UK) | £ (GBP)
            </button>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <span>© 2026 Etsy, Inc.</span>
            <a href="#" className="hover:underline">Terms of Use</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Interest-based ads</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;