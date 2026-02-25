'use client'

import React, { useState } from 'react';
import {
  Search, Star, Package, MessageSquare,
  ChevronRight, HelpCircle, X, RotateCcw,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// CDN images (same source used in the real app)
// ─────────────────────────────────────────────────────────────
const IMGS = {
  jewellery: 'https://d64gsuwffb70l.cloudfront.net/68f63c8447a5b428d4ad3d6f_1772050479662_b0e55795.jpg',
  homeLiving:'https://d64gsuwffb70l.cloudfront.net/68f63c8447a5b428d4ad3d6f_1772050509294_60c462a7.jpg',
  kids:      'https://d64gsuwffb70l.cloudfront.net/68f63c8447a5b428d4ad3d6f_1772050529485_1e80e8e1.jpg',
  art:       'https://d64gsuwffb70l.cloudfront.net/68f63c8447a5b428d4ad3d6f_1772050551425_636ca7a8.jpg',
  men:       'https://d64gsuwffb70l.cloudfront.net/68f63c8447a5b428d4ad3d6f_1772050570747_f2c46c66.jpg',
};

// Exactly the 5 categories shown in screenshot 2
// (4 in row-1, 1 alone in row-2 at col-1)
const BROWSE_CATEGORIES = [
  { name: 'Jewellery',    image: IMGS.jewellery  },
  { name: 'Home & Living',image: IMGS.homeLiving },
  { name: 'Kids',         image: IMGS.kids       },
  { name: 'Art',          image: IMGS.art        },
  { name: 'Men',          image: IMGS.men        },
];

// ─────────────────────────────────────────────────────────────
// Mock purchase data (rendered when hasPurchases = true)
// ─────────────────────────────────────────────────────────────
const MOCK_PURCHASES = [
  {
    id: 1,
    shopName: 'VintageFindsShop',
    orderId: '2847391023',
    date: 'Feb 15, 2026',
    status: 'Delivered' as const,
    total: 34.99,
    items: [{ name: 'Handmade Silver Bracelet',  price: 34.99, image: IMGS.jewellery,  reviewed: false, rating: 0 }],
  },
  {
    id: 2,
    shopName: 'ModernHomeDecor',
    orderId: '2847391024',
    date: 'Feb 10, 2026',
    status: 'Delivered' as const,
    total: 89.00,
    items: [{ name: 'Minimalist Table Lamp',      price: 89.00, image: IMGS.homeLiving, reviewed: true,  rating: 5 }],
  },
  {
    id: 3,
    shopName: 'KidsPlayWorld',
    orderId: '2847391025',
    date: 'Jan 28, 2026',
    status: 'Delivered' as const,
    total: 24.50,
    items: [{ name: 'Animal Costume Mask Set',    price: 24.50, image: IMGS.kids,       reviewed: false, rating: 0 }],
  },
];

// ─────────────────────────────────────────────────────────────
// Review modal
// ─────────────────────────────────────────────────────────────
interface ReviewModalProps {
  itemName: string;
  itemImage: string;
  onClose: () => void;
  onSubmit: (itemName: string, rating: number, text: string) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  itemName, itemImage, onClose, onSubmit,
}) => {
  const [rating,    setRating]    = useState(0);
  const [hovered,   setHovered]   = useState(0);
  const [text,      setText]      = useState('');
  const [submitted, setSubmitted] = useState(false);

  const labels = ['', 'Disappointed', 'Not great', "It's okay", 'Liked it', 'Loved it!'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return;
    setSubmitted(true);
    setTimeout(() => { onSubmit(itemName, rating, text); onClose(); }, 1300);
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative w-full max-w-[460px] bg-white rounded-2xl shadow-2xl p-7 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
        >
          <X size={16} />
        </button>

        {submitted ? (
          <div className="py-10 text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star size={26} fill="#16a34a" stroke="#16a34a" />
            </div>
            <p className="font-semibold text-gray-900 text-lg">Review submitted!</p>
            <p className="text-sm text-gray-500 mt-1">Thank you for your feedback.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3 className="text-[19px] font-semibold text-gray-900 mb-1">Write a Review</h3>
            <p className="text-[13px] text-gray-500 mb-5">Your feedback helps other buyers.</p>

            {/* Item preview */}
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-3 mb-5">
              <img src={itemImage} alt={itemName}
                className="w-12 h-12 rounded-lg object-cover shrink-0 border border-gray-200" />
              <p className="text-[13px] font-medium text-gray-800 leading-snug line-clamp-2">
                {itemName}
              </p>
            </div>

            {/* Stars */}
            <div className="mb-4">
              <label className="block text-[13px] font-medium text-gray-700 mb-2">
                Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-1">
                {[1,2,3,4,5].map((s) => (
                  <button key={s} type="button"
                    onMouseEnter={() => setHovered(s)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setRating(s)}
                    className="transition-transform hover:scale-110 p-0.5"
                  >
                    <Star
                      size={28}
                      fill={(hovered || rating) >= s ? '#F1641E' : 'none'}
                      stroke={(hovered || rating) >= s ? '#F1641E' : '#d1d5db'}
                      strokeWidth={1.5}
                    />
                  </button>
                ))}
              </div>
              {(hovered || rating) > 0 && (
                <p className="text-[12px] text-gray-400 mt-1">{labels[hovered || rating]}</p>
              )}
            </div>

            {/* Text */}
            <div className="mb-5">
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                Your review{' '}
                <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                maxLength={3000}
                placeholder="What did you love? What could be improved?"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F1641E]/20 focus:border-[#F1641E] resize-none transition"
              />
              <p className="text-right text-[11px] text-gray-400 mt-0.5">{text.length}/3000</p>
            </div>

            <div className="flex gap-2.5">
              <button type="button" onClick={onClose}
                className="flex-1 py-2.5 rounded-full border border-gray-300 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={!rating}
                className="flex-1 py-2.5 rounded-full bg-[#F1641E] hover:bg-[#d4571a] text-white text-[13px] font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                Submit review
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Empty state – exact layout from screenshot 2
//
// White card, centred heading, then:
//   ROW 1 → 4 equal columns: Jewellery | Home & Living | Kids | Art
//   ROW 2 → Men in col-1, cols 2-4 are empty
// ─────────────────────────────────────────────────────────────
const EmptyState: React.FC = () => (
  <div className="border border-gray-200 rounded-2xl bg-white px-8 py-10 mx-auto"
    style={{ maxWidth: 920 }}
  >
    {/* Heading */}
    <p className="text-center text-[17px] sm:text-[19px] font-semibold text-gray-900 mb-8 tracking-tight">
      No Purchases? No Problem!&nbsp; Browse Etsy for awesome items.
    </p>

    {/* Row 1 – 4 columns */}
    <div className="grid grid-cols-4 gap-4 mb-0">
      {BROWSE_CATEGORIES.slice(0, 4).map((cat) => (
        <button
          key={cat.name}
          className="group flex flex-col items-center gap-2 text-left"
        >
          {/* Square image tile – no border-radius, matching screenshot */}
          <div className="w-full aspect-square overflow-hidden">
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
            />
          </div>
          <span className="text-[14px] text-gray-900 font-normal self-start">
            {cat.name}
          </span>
        </button>
      ))}
    </div>

    {/* Row 2 – Men in col-1 only */}
    <div className="grid grid-cols-4 gap-4 mt-4">
      <button className="group flex flex-col items-center gap-2 text-left">
        <div className="w-full aspect-square overflow-hidden">
          <img
            src={BROWSE_CATEGORIES[4].image}
            alt={BROWSE_CATEGORIES[4].name}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          />
        </div>
        <span className="text-[14px] text-gray-900 font-normal self-start">
          {BROWSE_CATEGORIES[4].name}
        </span>
      </button>
      {/* Slots 2–4 intentionally empty to match screenshot */}
      <div /><div /><div />
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// Purchase card (used when hasPurchases = true)
// ─────────────────────────────────────────────────────────────
type PurchaseStatus = 'Delivered' | 'In Transit' | 'Processing';

interface PurchaseItem {
  name: string;
  price: number;
  image: string;
  reviewed: boolean;
  rating: number;
}
interface Purchase {
  id: number;
  shopName: string;
  orderId: string;
  date: string;
  status: PurchaseStatus;
  total: number;
  items: PurchaseItem[];
}

const STATUS_STYLES: Record<PurchaseStatus, string> = {
  Delivered:   'bg-green-100 text-green-700',
  'In Transit':'bg-blue-100  text-blue-700',
  Processing:  'bg-yellow-100 text-yellow-700',
};

const PurchaseCard: React.FC<{
  purchase: Purchase;
  submittedReviews: Record<string, boolean>;
  onReview: (name: string, image: string) => void;
}> = ({ purchase, submittedReviews, onReview }) => (
  <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">

    {/* Card header */}
    <div className="flex items-center justify-between bg-gray-50 px-5 py-3 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#F1641E] flex items-center justify-center text-white font-bold text-xs shrink-0">
          {purchase.shopName[0]}
        </div>
        <span className="text-[13px] font-semibold text-gray-900">{purchase.shopName}</span>
        <span className="hidden sm:inline text-[12px] text-gray-400">
          Order #{purchase.orderId} · {purchase.date}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[purchase.status]}`}>
          {purchase.status}
        </span>
        <span className="text-[13px] font-semibold text-gray-800">
          USD {purchase.total.toFixed(2)}
        </span>
      </div>
    </div>

    {/* Items */}
    {purchase.items.map((item, idx) => {
      const isReviewed = item.reviewed || !!submittedReviews[item.name];
      return (
        <div key={idx} className="flex items-center gap-5 px-5 py-4 border-b border-gray-100 last:border-b-0">
          <img
            src={item.image} alt={item.name}
            className="w-[72px] h-[72px] object-cover rounded-lg border border-gray-200 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-medium text-gray-900 leading-snug">{item.name}</p>
            <p className="text-[13px] text-gray-500 mt-0.5">USD {item.price.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {isReviewed ? (
              <div className="flex items-center gap-1 text-[12px] text-gray-500">
                <div className="flex">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={13}
                      fill={s <= (item.rating || 5) ? '#F1641E' : 'none'}
                      stroke={s <= (item.rating || 5) ? '#F1641E' : '#d1d5db'}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <span className="ml-0.5">Reviewed</span>
              </div>
            ) : (
              <button
                onClick={() => onReview(item.name, item.image)}
                className="px-4 py-2 text-[12px] font-medium text-gray-900 border border-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-colors whitespace-nowrap"
              >
                Write a review
              </button>
            )}
            <button className="px-4 py-2 text-[12px] font-medium text-white bg-gray-900 rounded-full hover:bg-gray-700 transition-colors whitespace-nowrap">
              Buy again
            </button>
          </div>
        </div>
      );
    })}

    {/* Footer actions */}
    <div className="flex items-center gap-4 px-5 py-2.5 bg-gray-50/60 border-t border-gray-100">
      <button className="flex items-center gap-1 text-[12px] text-gray-500 hover:text-gray-800 transition-colors">
        <Package size={12} className="shrink-0" /> Track order
      </button>
      <span className="text-gray-200">|</span>
      <button className="flex items-center gap-1 text-[12px] text-gray-500 hover:text-gray-800 transition-colors">
        <MessageSquare size={12} className="shrink-0" /> Contact shop
      </button>
      <span className="text-gray-200">|</span>
      <button className="flex items-center gap-1 text-[12px] text-gray-500 hover:text-gray-800 transition-colors">
        <RotateCcw size={12} className="shrink-0" /> Return
      </button>
      <span className="text-gray-200">|</span>
      <button className="flex items-center gap-1 text-[12px] text-gray-500 hover:text-gray-800 transition-colors">
        <HelpCircle size={12} className="shrink-0" /> Get help
      </button>
      <span className="ml-auto">
        <button className="flex items-center gap-0.5 text-[12px] font-medium text-[#F1641E] hover:underline">
          Order details <ChevronRight size={13} />
        </button>
      </span>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// PurchasesSection – main exported component
// ─────────────────────────────────────────────────────────────
interface PurchasesSectionProps {
  hasPurchases?: boolean;
}

const PurchasesSection: React.FC<PurchasesSectionProps> = ({
  hasPurchases = false,
}) => {
  const [activeTab, setActiveTab]           = useState<'purchases' | 'cases'>('purchases');
  const [searchQuery, setSearchQuery]       = useState('');
  const [reviewTarget, setReviewTarget]     = useState<{ name: string; image: string } | null>(null);
  const [submittedReviews, setSubmittedReviews] = useState<Record<string, boolean>>({});

  const filteredPurchases = MOCK_PURCHASES.filter((p) =>
    p.items.some((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    p.shopName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 mt-10 mb-20">

        {/* ── Header row ──────────────────────────────────────
            Left:  "Purchases" h1 in Georgia serif
            Right: tab switcher + square search input
            Matches screenshot 1 & 2 header exactly.
        ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">

          {/* h1 */}
          <h1
            className="text-[30px] sm:text-[34px] font-light text-gray-900 leading-none"
            style={{ fontFamily: "Georgia,'Times New Roman',serif" }}
          >
            Purchases
          </h1>

          {/* Tabs + Search */}
          <div className="flex items-center gap-6 sm:gap-8">

            {/* Tabs */}
            <div className="flex items-center gap-5">
              {(['purchases', 'cases'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-[14px] pb-0.5 transition-colors capitalize ${
                    activeTab === tab
                      ? 'text-gray-900 font-semibold border-b-2 border-gray-900'
                      : 'text-gray-500 font-medium hover:text-gray-800'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Search – square corners matching screenshot */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your purchases"
                className="h-[42px] w-52 sm:w-[260px] pl-4 pr-11 border border-gray-300 text-[13px] text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:border-gray-700 transition-colors"
                style={{ borderRadius: 2 }}
              />
              {/* Magnifier button on the right side, no own border */}
              <button
                aria-label="Search"
                className="absolute right-0 top-0 h-[42px] w-[42px] flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Search size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* Thin rule under the header row */}
        <div className="border-t border-gray-200 mb-7" />

        {/* ── Tab content ────────────────────────────────────── */}
        {activeTab === 'purchases' ? (
          <>
            {!hasPurchases ? (
              /* Empty state – centred white card */
              <EmptyState />
            ) : filteredPurchases.length === 0 ? (
              /* No search results */
              <div className="bg-white border border-gray-200 rounded-xl px-8 py-14 text-center">
                <Search size={36} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-600 font-medium">
                  No results for &ldquo;{searchQuery}&rdquo;
                </p>
                <p className="text-[13px] text-gray-400 mt-1">Try a different search term.</p>
              </div>
            ) : (
              /* Purchase cards list */
              <div className="flex flex-col gap-5">
                {filteredPurchases.map((p) => (
                  <PurchaseCard
                    key={p.id}
                    purchase={p}
                    submittedReviews={submittedReviews}
                    onReview={(name, image) => setReviewTarget({ name, image })}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          /* Cases tab – empty state */
          <div className="bg-white border border-gray-200 rounded-xl px-8 py-16 text-center">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle size={26} className="text-gray-400" />
            </div>
            <h3 className="text-[16px] font-semibold text-gray-800 mb-2">No open cases</h3>
            <p className="text-[13px] text-gray-500 max-w-xs mx-auto mb-5">
              If you have an issue with an order, open a case and we&apos;ll help resolve it.
            </p>
            <button className="inline-flex items-center gap-1 text-[13px] font-medium text-[#F1641E] hover:underline">
              Learn more about cases <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Review modal */}
      {reviewTarget && (
        <ReviewModal
          itemName={reviewTarget.name}
          itemImage={reviewTarget.image}
          onClose={() => setReviewTarget(null)}
          onSubmit={(name) => {
            setSubmittedReviews((prev) => ({ ...prev, [name]: true }));
            setReviewTarget(null);
          }}
        />
      )}
    </>
  );
};

export default PurchasesSection;