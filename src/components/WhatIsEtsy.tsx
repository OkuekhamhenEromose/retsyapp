'use client'

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const WhatIsEtsy = () => {
  return (
    <section className="bg-amber-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-3">
            What is Etsy?
          </h2>
          <Link 
            href="/about" 
            className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors group"
          >
            Read our wonderfully weird story
            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Column 1 */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-medium text-gray-900">
              A community doing good
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              Etsy is a global online marketplace, where people come together to make, sell, buy and collect unique items. We're also a community pushing for positive change for small businesses, people, and the planet.{" "}
              <Link 
                href="/impact" 
                className="text-green-600 hover:text-green-700 underline underline-offset-2"
              >
                Here are some of the ways we're making a positive impact, together.
              </Link>
            </p>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-medium text-gray-900">
              Support independent creators
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              There's no Etsy warehouse – just millions of people selling the things they love. We make the whole process easy, helping you connect directly with makers to find something extraordinary.
            </p>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-medium text-gray-900">
              Peace of mind
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              Your privacy is the highest priority of our dedicated team. And if you ever need assistance, we are always ready to step in for support.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-amber-200 mb-12"></div>

        {/* Help Center CTA */}
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900 mb-6">
            Have a question? Well, we've got some answers.
          </p>
          <Link 
            href="/help"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-full font-medium hover:bg-gray-900 hover:text-white transition-all duration-300 group"
          >
            <span>Go to Help Centre</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhatIsEtsy;