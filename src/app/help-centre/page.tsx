'use client'

import { Search, ArrowRight, ShoppingCart, CreditCard, Package, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const featuredArticles = [
  { category: "Order Issues", title: "How to Get Help with An Order", href: "#" },
  { category: "Purchasing", title: "How to Purchase an Item On Etsy", href: "#" },
  { category: "Purchasing", title: "How to Contact a Shop", href: "#" },
  { category: "Orders & Returns", title: "What's the Status of My Order?", href: "#" },
  { category: "Searching for Items", title: "How to Search for Items and Shops on Etsy", href: "#" },
  { category: "Orders & Returns", title: "How Do I Change My Delivery Address?", href: "#" },
  { category: "Buying Safely", title: "Tips for Buying Safely on Etsy", href: "#" },
  { category: "Purchasing", title: "How to Buy an Etsy Gift Card", href: "#" },
  { category: "Taxes & Customs Fees", title: "Will I Have to Pay for Tax, Customs, or Tariffs on My Order?", href: "#" },
];

const shopCategories = [
  {
    icon: ShoppingCart,
    title: "Buying on Etsy",
    links: ["Purchasing", "Searching for Items", "Buying Safely"],
  },
  {
    icon: CreditCard,
    title: "Basket & Payment",
    links: ["Using Gift Cards & Coupons", "Taxes & Customs Fees", "Checkout", "Payment Options"],
  },
  {
    icon: Package,
    title: "Your Orders",
    links: ["Orders & Returns", "Order Issues"],
  },
  {
    icon: User,
    title: "Your Etsy Account",
    links: ["Signing In", "Settings & Preferences", "Regional Settings", "Contacting Etsy", "Account Privacy"],
  },
];

const HelpCentrePage = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"shopping" | "selling">("shopping");

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#1a2744", minHeight: 320 }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute top-0 right-16 w-56 h-48 rounded-full opacity-90"
          style={{ background: "#F1641E", filter: "blur(0px)", borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%" }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-52"
          style={{ background: "#F1641E", borderRadius: "0 60% 0 0", opacity: 0.9 }}
        />
        <div
          className="absolute bottom-0 right-0 w-48 h-40"
          style={{ background: "#1a3a6e", borderRadius: "40% 0 0 0", opacity: 0.8 }}
        />

        {/* Header bar inside hero */}
        <div className="relative z-10 flex items-center justify-between px-8 py-5">
          <div className="flex items-center gap-2">
            <span
              className="text-white font-bold text-xl"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Etsy
            </span>
            <span className="text-white text-xl font-light">Help Centre</span>
          </div>
          <button className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <User className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 pb-16 pt-8">
          <h1
            className="text-white text-3xl md:text-4xl font-medium mb-8 text-center"
            style={{ fontFamily: "Georgia, serif" }}
          >
            How can we help?
          </h1>
          <div className="w-full max-w-xl relative">
            <input
              type="text"
              placeholder="Type your question"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full py-4 pl-6 pr-14 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Help with order banner ──────────────────────────── */}
      <section className="bg-blue-50 py-8 px-4 text-center">
        <p className="text-gray-700 mb-4 text-sm md:text-base">
          Having problems with an order? Reach out to the seller with a help request.
        </p>
        <button className="px-6 py-3 border-2 border-gray-800 rounded-full text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors">
          Get help with an order
        </button>
      </section>

      {/* ── Tabs ───────────────────────────────────────────────── */}
      <div className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 flex gap-8">
          {(["shopping", "selling"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 text-sm font-medium capitalize border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "shopping" ? "Shopping on Etsy" : "Selling with Etsy"}
            </button>
          ))}
        </div>
      </div>

      {/* ── Featured articles ──────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2
          className="text-3xl text-center text-gray-900 mb-10"
          style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}
        >
          Featured articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8">
          {featuredArticles.map((article) => (
            <Link key={article.title} href={article.href} className="group block">
              <p className="text-xs text-gray-500 mb-1">{article.category}</p>
              <p className="text-sm font-semibold text-gray-900 group-hover:underline leading-snug">
                {article.title}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4">
        <hr className="border-gray-200" />
      </div>

      {/* ── Shop on Etsy ──────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2
          className="text-3xl text-center text-gray-900 mb-10"
          style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}
        >
          Shop on Etsy
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {shopCategories.map(({ icon: Icon, title, links }) => (
            <div key={title}>
              <div className="flex items-start gap-4 mb-3">
                <Icon className="w-12 h-12 shrink-0 text-gray-900" strokeWidth={1.2} />
                <h3 className="font-semibold text-base text-gray-900 pt-1">{title}</h3>
              </div>
              <ul className="space-y-2 pl-0">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-gray-700 hover:underline block">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA section ────────────────────────────────────────── */}
      <section className="py-16 px-4 text-center" style={{ backgroundColor: "#fdf0e0" }}>
        <h2
          className="text-3xl md:text-4xl text-gray-900 mb-8"
          style={{ fontFamily: "Georgia, serif", fontWeight: 400 }}
        >
          Didn&apos;t find what you needed? Try these.
        </h2>
        <div className="flex flex-col items-center gap-4 max-w-sm mx-auto mb-10">
          <button className="w-full py-4 bg-gray-900 text-white rounded-full font-semibold text-sm hover:bg-gray-700 transition-colors">
            Help with an order
          </button>
          <button className="w-full py-4 border-2 border-gray-900 rounded-full font-semibold text-sm hover:bg-gray-50 transition-colors text-gray-900 bg-transparent">
            Contact Etsy Support
          </button>
        </div>

        {/* Three links row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-left">
          {[
            {
              title: "Read our Policies",
              desc: "Get the ins and outs of buying and selling on Etsy",
            },
            {
              title: "Check out the Etsy Journal",
              desc: "Explore ideas and inspiration for creative living",
            },
            {
              title: "See how you're protected",
              desc: "Find out more about safety and security in our marketplace",
            },
          ].map(({ title, desc }) => (
            <div key={title}>
              <Link href="#" className="flex items-center gap-1 font-semibold text-sm text-gray-900 hover:underline mb-1">
                {title} <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 py-5 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[#F1641E] font-bold text-lg" style={{ fontFamily: "Georgia, serif" }}>
              Etsy
            </span>
            <span className="text-sm text-gray-600">Keep Commerce Human</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>© 2025 Etsy, Inc.</span>
            <Link href="#" className="hover:underline">Terms of Use</Link>
            <Link href="#" className="hover:underline">Privacy</Link>
            <Link href="#" className="hover:underline">Interest-based ads</Link>
            <span>English (GB) ▾</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HelpCentrePage;