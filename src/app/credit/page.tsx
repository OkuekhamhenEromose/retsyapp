'use client'

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// FAQ data — exact 4 questions from screenshot + 2 extras
// ─────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: 'What can Etsy gift cards be used on?',
    a: "Once redeemed, you can use your gift card to purchase from any shop that accepts Etsy Payments. To make a purchase with an Etsy Gift Card, it's crucial that you're browsing in the currency of the gift card. So, if your gift card is in USD, your account should be set to browse in USD",
  },
  {
    q: 'How can I confirm that a shop accepts Etsy gift cards?',
    a: 'Click the About tab on the shop\'s page. Scroll down to payment options where it will say "Accepts Etsy gift cards and Etsy credits". Another way to confirm is in your basket! Once you are ready to check out, a gift card icon indicates that this shop will accept your Etsy gift card as payment.',
  },
  {
    q: 'What if my order total is less than the amount of my Etsy gift card?',
    a: "If your order total is less than your existing gift card or Etsy Credit balance, not to worry. The remaining balance will stay in your account's Etsy Credit balance, ready for future purchases. Should your order total exceed your gift card or Etsy Credit, the additional amount must be paid with a credit card through Etsy Payments.",
  },
  {
    q: 'What is the difference between a gift card and Etsy credit?',
    a: 'A gift card is a prepaid card that you can purchase and give to someone to shop on Etsy, while Etsy credit is store credit issued by Etsy, typically from refunds or promotions. Both a gift card and Etsy credit are automatically applied to your account when redeemed and can be used during checkout.',
  },
  {
    q: 'Can I use multiple gift cards on one purchase?',
    a: 'Yes! You can redeem multiple gift cards and the combined balance will be stored in your Etsy Credit balance. At checkout you can apply your full Etsy Credit balance to a single order, or use it across multiple orders over time.',
  },
  {
    q: 'Do Etsy gift cards expire?',
    a: 'Etsy gift cards do not expire, so there is no rush to use them. The balance stays in your Etsy account until you are ready to make a purchase.',
  },
];

// ─────────────────────────────────────────────────────────────
// AccordionItem
//
// Screenshot details:
//   • Closed: question text (~15px normal weight) + chevron-down right
//   • Open  : question text bold + chevron-up right + answer below
//   • Divider: thin border-b between items only (no border on last)
//   • Chevron is the standard Etsy small caret (ChevronDown/Up 18px)
// ─────────────────────────────────────────────────────────────
interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  question, answer, isOpen, onToggle, isLast,
}) => (
  <div className={isLast ? '' : 'border-b border-gray-200'}>
    {/* Trigger row */}
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      className="w-full flex items-center justify-between gap-6 py-[18px] text-left group cursor-pointer"
    >
      <span
        className={`text-[15px] leading-snug transition-colors ${
          isOpen
            ? 'font-semibold text-gray-900'
            : 'font-normal text-gray-800 group-hover:text-gray-900'
        }`}
      >
        {question}
      </span>
      <span className="shrink-0 text-gray-600 group-hover:text-gray-900 transition-colors">
        {isOpen
          ? <ChevronUp  size={18} strokeWidth={1.8} />
          : <ChevronDown size={18} strokeWidth={1.8} />}
      </span>
    </button>

    {/* Answer panel */}
    {isOpen && (
      <div className="pb-6">
        <p className="text-[15px] text-gray-700 leading-[1.65]">
          {answer}
        </p>
      </div>
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────
// CreditBalancePage
// ─────────────────────────────────────────────────────────────
export default function CreditBalancePage() {
  const [code,      setCode]      = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState('');
  const [openIdx,   setOpenIdx]   = useState<number | null>(null);
  const balance = 0.00;

  const handleRedeem = () => {
    if (!code.trim()) {
      setError('Please enter a gift card code.');
      return;
    }
    setError('');
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setCode(''); }, 3500);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ════════════════════════════════════════════════════
          SECTION 1 — Hero / balance
          ════════════════════════════════════════════════════
          White bg, centred column, max-w 760px.
          Heading: large Georgia serif, ~46px, light weight.
          "Send a gift card": underlined text link centred below heading.
          "Total balance" row: label left, "USD 0.00" right, bottom divider.
      ════════════════════════════════════════════════════ */}
      <section className="w-full bg-white">
        <div className="max-w-[760px] mx-auto px-6 pt-12 pb-8 text-center">

          {/* Heading */}
          <h1
            className="text-[40px] sm:text-[46px] font-light text-gray-900 leading-tight mb-3"
            style={{ fontFamily: "Georgia,'Times New Roman',serif" }}
          >
            Your gift cards &amp; Etsy credit
          </h1>

          {/* "Send a gift card" link — underlined, centred */}
          <a
            href="#send"
            className="text-[14px] text-gray-800 underline underline-offset-2 hover:text-black transition-colors"
          >
            Send a gift card
          </a>

          {/* Total balance row */}
          <div className="flex items-center justify-between mt-10 pb-5 border-b border-gray-200">
            <span
              className="text-[16px] font-medium text-gray-900"
              style={{ fontFamily: 'inherit' }}
            >
              Total balance
            </span>
            {/* "USD 0.00" — large, tracking-wide, matches screenshot */}
            <span
              className="text-[22px] font-normal text-gray-900"
              style={{ letterSpacing: '0.01em' }}
            >
              USD {balance.toFixed(2)}
            </span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 2 — Redeem your gift card
          ════════════════════════════════════════════════════
          Light-blue bg (#d4eaf8), full-width strip.
          Narrow centred column (max-w 700px).

          "Redeem your gift card" label: 16px medium.
          Input + button: pill shape, joined together.
            - Input: white bg, rounded-l-full, no right border,
              placeholder "Enter your code", 15px.
            - Button: near-black (#1a1a1a) rounded-r-full "Redeem".
          "Etsy Gift Cards Policy." link below in blue-ish.
      ════════════════════════════════════════════════════ */}
      <section className="w-full py-14" style={{ backgroundColor: '#d4eaf8' }}>
        <div className="max-w-[700px] mx-auto px-6">

          {/* Label */}
          <p className="text-[16px] font-medium text-gray-900 mb-3">
            Redeem your gift card
          </p>

          {/* Pill input + button */}
          <div
            className="flex items-stretch overflow-hidden"
            style={{ height: 56, borderRadius: 9999 }}
          >
            {/* Input */}
            <input
              type="text"
              value={code}
              onChange={e => { setCode(e.target.value); setError(''); setSubmitted(false); }}
              onKeyDown={e => e.key === 'Enter' && handleRedeem()}
              placeholder="Enter your code"
              className="flex-1 border border-gray-300 border-r-0 pl-6 pr-3 text-[15px] text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:border-gray-400 transition-colors"
              style={{ borderRadius: '9999px 0 0 9999px' }}
            />
            {/* Button */}
            <button
              onClick={handleRedeem}
              className="px-7 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80 whitespace-nowrap select-none"
              style={{
                backgroundColor: '#1a1a1a',
                borderRadius: '0 9999px 9999px 0',
                minWidth: 108,
              }}
            >
              Redeem
            </button>
          </div>

          {/* Feedback */}
          {error && (
            <p className="mt-2 text-[13px] text-red-600">{error}</p>
          )}
          {submitted && (
            <p className="mt-2 text-[13px] font-medium text-green-700">
              ✓ Gift card redeemed successfully!
            </p>
          )}

          {/* "Etsy Gift Cards Policy." — blue link + period */}
          <p className="mt-3 text-[13px] text-gray-700">
            <a
              href="#policy"
              className="text-blue-700 hover:underline underline-offset-1 transition-colors"
            >
              Etsy Gift Cards Policy
            </a>
            .
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 3 — Frequently asked questions
          ════════════════════════════════════════════════════
          White bg, full-width, generous vertical padding.
          Two-column layout (lg breakpoint):

          LEFT (~38%):
            "Frequently asked questions" — large Georgia serif
            (~40px, light weight, multi-line, italic-ish).
            "Find even more answers in our Help Centre" — small
            text with underlined "Help Centre" link.

          RIGHT (~62%):
            Accordion list, each item separated by thin border-b.
            Closed: question text + chevron-down.
            Open  : question bold + chevron-up + answer paragraph.
            Screenshot shows ALL items open simultaneously in img 1.
      ════════════════════════════════════════════════════ */}
      <section className="w-full bg-white pt-16 pb-20">
        <div className="max-w-[1140px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">

            {/* ── Left column: heading + sub-link ──────────── */}
            <div className="lg:w-[36%] shrink-0">
              <h2
                className="text-[34px] sm:text-[40px] font-light text-gray-900 leading-[1.15] mb-4"
                style={{ fontFamily: "Georgia,'Times New Roman',serif" }}
              >
                Frequently asked questions
              </h2>
              <p className="text-[14px] text-gray-700 leading-relaxed">
                Find even more answers in our{' '}
                <a
                  href="/help"
                  className="underline underline-offset-2 text-gray-900 hover:text-[#F1641E] transition-colors"
                >
                  Help Centre
                </a>
              </p>
            </div>

            {/* ── Right column: accordion ───────────────────── */}
            <div className="flex-1 min-w-0">
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem
                  key={i}
                  question={item.q}
                  answer={item.a}
                  isOpen={openIdx === i}
                  onToggle={() => setOpenIdx(prev => prev === i ? null : i)}
                  isLast={i === FAQ_ITEMS.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}