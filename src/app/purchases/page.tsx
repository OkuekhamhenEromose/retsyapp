'use client'

import React, { useState } from 'react';
import QRBanner from '@/components/Qrbanner';
import PurchasesSection from '@/components/PurchasesSection';

// ─────────────────────────────────────────────────────────────
// Etsy Purchases Page
// Route: /purchases  (app/purchases/page.tsx)
//
// Composes:
//   1. QRBanner        – "Order Updates are waiting!" banner
//   2. PurchasesSection – Purchases / Cases tabs with search
//
// The `hasPurchases` flag is toggled here for demo purposes;
// in production, replace with a real auth + API call.
// ─────────────────────────────────────────────────────────────

export default function PurchasesPage() {
  // ── In production: derive this from your auth / API data ──
  const [hasPurchases, setHasPurchases] = useState(false);

  return (
    /*
     * Outer shell: white background, full viewport height,
     * flex-col so footer (if any) is pushed to bottom.
     * bg-[#f7f7f7] matches real Etsy page body colour.
     */
    <div className="min-h-screen bg-[#f7f7f7]">

      {/* ── 1. QR / App-download banner ───────────────────────
           Light-blue → deep-indigo gradient strip with
           QR code on the left and phone mockup on the right.
           The component is self-dismissible.
      ──────────────────────────────────────────────────────── */}
      <QRBanner />

      {/* ── Demo toggle (remove in production) ────────────────
           Lets you switch between the empty state (no purchases)
           and a populated purchases list to see both states.
      ──────────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 mt-5">
        <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl">
          {/* Info icon */}
          <svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            className="shrink-0 text-amber-600"
          >
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 5v3M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-[13px] text-amber-800">Demo mode:</span>
          <button
            onClick={() => setHasPurchases((v) => !v)}
            className="text-[13px] font-semibold text-amber-900 underline underline-offset-2 hover:no-underline transition-all"
          >
            {hasPurchases
              ? 'Switch to empty state (no purchases)'
              : 'Switch to purchases list view'}
          </button>
        </div>
      </div>

      {/* ── 2. Purchases / Cases section ──────────────────────
           • "Purchases" h1 top-left
           • "Purchases | Cases" tab switcher + search top-right
           • Empty state OR purchase cards depending on hasPurchases
      ──────────────────────────────────────────────────────── */}
      <PurchasesSection hasPurchases={hasPurchases} />

    </div>
  );
}