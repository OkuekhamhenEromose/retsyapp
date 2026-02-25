'use client'

import React, { useState } from 'react';
import { Check } from 'lucide-react';

// Real QR code image served from the project CDN
const QR_CODE_IMAGE =
  'https://d64gsuwffb70l.cloudfront.net/68f63bef939b42951dbcb4e0_1772050340491_415ee535.png';

// ─────────────────────────────────────────────────────────────
// QRBanner
//
// Matches screenshot 1 exactly:
//   • Full-width light-blue → deep royal-blue gradient strip
//   • No border-radius on outer container edges (flush to viewport)
//   • QR code card (white rounded square) left-aligned
//   • Orange Etsy "E" badge centred over the QR image
//   • Bold heading + subtext in the centre
//   • Phone mockup bleeding off the bottom-right, dark check circles
// ─────────────────────────────────────────────────────────────
const QRBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    /* Outer wrapper – full page width, no horizontal padding so the
       banner bleeds edge-to-edge just like the real Etsy page */
    <div className="w-full mt-0">
      <div
        className="relative overflow-hidden"
        style={{
          /* Exact colour stops reverse-engineered from screenshot */
          background:
            'linear-gradient(to right, #dbeafe 0%, #c3d9f8 38%, #4361d8 62%, #2b3fc4 78%, #2533b8 100%)',
          minHeight: 244,
        }}
      >
        {/* ── Dismiss × ──────────────────────────────────────── */}
        {/* <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss banner"
          className="absolute top-3 right-4 z-20 w-7 h-7 bg-white/60 hover:bg-white/90 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M1 1L9 9M9 1L1 9"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button> */}

        {/* ── Inner layout: QR | Text | Phone ─────────────────── */}
        <div className="max-w-[1400px] mx-auto flex items-stretch min-h-[244px]">

          {/* ── Left: QR code card ──────────────────────────── */}
          <div className="flex-shrink-0 flex items-center pl-8 sm:pl-14 py-7">
            {/*
              White card: rounded-2xl, soft shadow.
              Size matches the screenshot ~140 × 140 px rendered.
            */}
            <div className="relative w-[132px] h-[132px] sm:w-[150px] sm:h-[150px] bg-white rounded-2xl p-2.5 shadow-lg">
              <img
                src={QR_CODE_IMAGE}
                alt="Scan to download the Etsy app"
                className="w-full h-full object-contain"
              />
              {/* Orange Etsy E centred over QR */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-9 h-9 sm:w-[42px] sm:h-[42px] bg-[#F1641E] rounded-xl flex items-center justify-center shadow-md">
                  <span
                    className="text-white font-bold text-[17px] sm:text-[19px] leading-none select-none"
                    style={{ fontFamily: "Georgia,'Times New Roman',serif" }}
                  >
                    E
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Centre: heading + subtext ────────────────────── */}
          <div className="flex-1 flex flex-col justify-center px-8 sm:px-14 py-7">
            <h2
              className="text-[24px] sm:text-[30px] md:text-[34px] font-bold text-gray-900 leading-tight mb-2"
              style={{ fontFamily: "Georgia,'Times New Roman',serif" }}
            >
              Order Updates are waiting!
            </h2>
            <p className="text-[14px] sm:text-[15px] text-gray-700 leading-relaxed">
              Scan to download the Etsy app-track your order,
              <br className="hidden sm:block" />
              chat with sellers and more.
            </p>
          </div>

          {/* ── Right: phone mockup ──────────────────────────── */}
          {/*
            Hidden on small screens; on md+ it sits flush with the
            right edge and bleeds off the bottom like the screenshot.
            The deep-blue semi-ellipse sits behind the phone.
          */}
          <div className="hidden md:flex flex-shrink-0 items-end justify-center relative w-[320px] overflow-hidden">

            {/* Blue ellipse backdrop – matches the dark blob in screenshot */}
            <div className="absolute inset-0 pointer-events-none">
              <svg viewBox="0 0 320 244" className="w-full h-full" preserveAspectRatio="none">
                <ellipse cx="220" cy="130" rx="180" ry="230" fill="#1e3ab8" opacity="0.7" />
              </svg>
            </div>

            {/* Phone bezel + screen */}
            <div className="relative z-10 translate-y-7">
              {/* Dark outer bezel */}
              <div
                className="shadow-2xl"
                style={{
                  width: 174,
                  height: 228,
                  borderRadius: 30,
                  backgroundColor: '#111827',
                  padding: 3,
                }}
              >
                {/* White inner screen */}
                <div
                  className="w-full h-full bg-white flex flex-col items-center justify-start overflow-hidden relative"
                  style={{ borderRadius: 27 }}
                >
                  {/* Notch */}
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 bg-gray-900"
                    style={{ width: 58, height: 16, borderRadius: '0 0 14px 14px' }}
                  />

                  {/* Screen content */}
                  <div className="flex flex-col items-center mt-9 gap-4">
                    {/* Delivery illustration */}
                    <div className="w-[56px] h-[56px]">
                      <svg viewBox="0 0 56 56" width="56" height="56" fill="none">
                        <circle cx="28" cy="28" r="24" fill="#f0f4ff" />
                        {/* Package body */}
                        <rect x="14" y="22" width="28" height="20" rx="2"
                          stroke="#1e293b" strokeWidth="1.7" />
                        {/* Lid crease */}
                        <path d="M14 29h28" stroke="#1e293b" strokeWidth="1.7" />
                        {/* Centre ribbon vertical */}
                        <path d="M28 22v20" stroke="#F1641E" strokeWidth="1.7" strokeLinecap="round" />
                        {/* Ribbon bow */}
                        <path d="M22 22l6 6 6-6"
                          stroke="#F1641E" strokeWidth="1.7"
                          strokeLinecap="round" strokeLinejoin="round" />
                        {/* Sparkle left */}
                        <path d="M9 16l1.2 2.4 2.4 1.2-2.4 1.2L9 23l-1.2-2.4L5.4 19.4l2.4-1.2z"
                          fill="#F1641E" />
                        {/* Sparkle right (small) */}
                        <path d="M45 12l.8 1.6 1.6.8-1.6.8L45 17l-.8-1.6-1.6-.8 1.6-.8z"
                          fill="#F1641E" opacity="0.8" />
                      </svg>
                    </div>

                    {/* 4 dark check circles – matches screenshot exactly */}
                    <div className="flex items-center gap-[9px]">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-[28px] h-[28px] rounded-full bg-gray-900 flex items-center justify-center"
                        >
                          <Check size={13} strokeWidth={3} className="text-white" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default QRBanner;