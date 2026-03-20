'use client'

import React from 'react';
import { Check } from 'lucide-react';

const QR_CODE_IMAGE =
  'https://d64gsuwffb70l.cloudfront.net/68f63bef939b42951dbcb4e0_1772050340491_415ee535.png';

const QRBanner: React.FC = () => {
  return (
    <div className="w-full mt-0">
      <div
        className="relative overflow-hidden min-h-[244px]"
        style={{
          background:
            'linear-gradient(to right, #dbeafe 0%, #c3d9f8 38%, #4361d8 62%, #2b3fc4 78%, #2533b8 100%)',
        }}
      >
        {/* Inner layout */}
        <div className="max-w-[1400px] mx-auto flex items-stretch min-h-[244px]">

          {/* Left: QR code card */}
          <div className="flex-shrink-0 flex items-center pl-8 sm:pl-14 py-7">
            <div className="relative w-[132px] h-[132px] sm:w-[150px] sm:h-[150px] bg-white rounded-2xl p-2.5 shadow-lg">
              <img
                src={QR_CODE_IMAGE}
                alt="Scan to download the Etsy app"
                className="w-full h-full object-contain"
              />
              {/* Orange Etsy E badge */}
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

          {/* Centre: heading + subtext */}
          <div className="flex-1 flex flex-col justify-center px-8 sm:px-14 py-7">
            <h2
              className="text-[24px] sm:text-[30px] md:text-[34px] font-bold text-gray-900 leading-tight mb-2"
              style={{ fontFamily: "Georgia,'Times New Roman',serif" }}
            >
              Order Updates are waiting!
            </h2>
            <p className="text-[14px] sm:text-[15px] text-gray-700 leading-relaxed">
              Scan to download the Etsy app — track your order,
              <br className="hidden sm:block" />
              chat with sellers and more.
            </p>
          </div>

          {/* Right: phone mockup */}
          <div className="hidden md:flex flex-shrink-0 items-end justify-center relative w-[320px] overflow-hidden">

            {/* Blue ellipse backdrop */}
            <div className="absolute inset-0 pointer-events-none">
              <svg viewBox="0 0 320 244" className="w-full h-full" preserveAspectRatio="none">
                <ellipse cx="220" cy="130" rx="180" ry="230" fill="#1e3ab8" opacity="0.7" />
              </svg>
            </div>

            {/* Phone bezel */}
            <div className="relative z-10 translate-y-7">
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
                {/* Screen */}
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
                        <rect x="14" y="22" width="28" height="20" rx="2"
                          stroke="#1e293b" strokeWidth="1.7" />
                        <path d="M14 29h28" stroke="#1e293b" strokeWidth="1.7" />
                        <path d="M28 22v20" stroke="#F1641E" strokeWidth="1.7" strokeLinecap="round" />
                        <path d="M22 22l6 6 6-6"
                          stroke="#F1641E" strokeWidth="1.7"
                          strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 16l1.2 2.4 2.4 1.2-2.4 1.2L9 23l-1.2-2.4L5.4 19.4l2.4-1.2z"
                          fill="#F1641E" />
                        <path d="M45 12l.8 1.6 1.6.8-1.6.8L45 17l-.8-1.6-1.6-.8 1.6-.8z"
                          fill="#F1641E" opacity="0.8" />
                      </svg>
                    </div>

                    {/* 4 dark check circles */}
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