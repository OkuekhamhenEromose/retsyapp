import { Globe, Instagram, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer>
      {/* Renewable Energy Banner */}
      <div className="bg-[hsl(230,70%,50%)] py-4 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-[hsl(230,65%,45%)]"
          style={{
            clipPath: 'polygon(0 0, 100% 30%, 100% 100%, 0 70%)'
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center gap-2 text-background">
            <Globe className="h-5 w-5" />
            <a href="#" className="underline decoration-dotted underline-offset-4 hover:decoration-solid">
              Etsy is powered by 100% renewable electricity.
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-[hsl(230,70%,35%)] text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Logo & App Download */}
            <div className="lg:col-span-1 flex flex-col items-center lg:items-start">
              <div className="w-24 h-24 bg-etsy-orange rounded-2xl flex items-center justify-center mb-6">
                <span className="text-background text-3xl font-serif font-bold">Etsy</span>
              </div>
              <button className="px-6 py-3 bg-[hsl(230,30%,25%)] text-background rounded-full text-sm font-medium hover:bg-[hsl(230,30%,30%)] transition-colors">
                Download the Etsy App
              </button>
            </div>

            {/* Shop Column */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Shop</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:underline opacity-90">Gift cards</a></li>
                <li><a href="#" className="hover:underline opacity-90">Etsy Registry</a></li>
                <li><a href="#" className="hover:underline opacity-90">Sitemap</a></li>
                <li><a href="#" className="hover:underline opacity-90">Etsy blog</a></li>
                <li><a href="#" className="hover:underline opacity-90">Etsy United Kingdom</a></li>
                <li><a href="#" className="hover:underline opacity-90">Etsy Germany</a></li>
                <li><a href="#" className="hover:underline opacity-90">Etsy Canada</a></li>
              </ul>
            </div>

            {/* Sell Column */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Sell</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:underline opacity-90">Sell on Etsy</a></li>
                <li><a href="#" className="hover:underline opacity-90">Teams</a></li>
                <li><a href="#" className="hover:underline opacity-90">Forums</a></li>
                <li><a href="#" className="hover:underline opacity-90">Affiliates & Creators</a></li>
              </ul>
            </div>

            {/* About Column */}
            <div>
              <h4 className="font-semibold text-lg mb-4">About</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:underline opacity-90">Etsy, Inc.</a></li>
                <li><a href="#" className="hover:underline opacity-90">Policies</a></li>
                <li><a href="#" className="hover:underline opacity-90">Investors</a></li>
                <li><a href="#" className="hover:underline opacity-90">Careers</a></li>
                <li><a href="#" className="hover:underline opacity-90">Press</a></li>
                <li><a href="#" className="hover:underline opacity-90">Impact</a></li>
                <li><a href="#" className="hover:underline opacity-90">Legal imprint</a></li>
              </ul>
            </div>

            {/* Help Column */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Help</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:underline opacity-90">Help Centre</a></li>
                <li><a href="#" className="hover:underline opacity-90">Privacy settings</a></li>
              </ul>
              
              {/* Social Icons */}
              <div className="flex items-center gap-4 mt-6">
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                  </svg>
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[hsl(230,20%,15%)] text-background py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Globe className="h-4 w-4" />
              <span>Nigeria</span>
              <span className="opacity-60">|</span>
              <span>English (UK)</span>
              <span className="opacity-60">|</span>
              <span>$ (USD)</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <span>© 2026 Etsy, Inc.</span>
              <a href="#" className="hover:underline underline-offset-2">Terms of Use</a>
              <a href="#" className="hover:underline underline-offset-2">Privacy</a>
              <a href="#" className="hover:underline underline-offset-2">Interest-based ads</a>
              <a href="#" className="hover:underline underline-offset-2">Local Shops</a>
              <a href="#" className="hover:underline underline-offset-2">Regions</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
