'use client';

import React from 'react';

interface Offer {
  name: string;
  items: string;
  originalPrice: number;
  discountPercent: number;
  finalPrice: number;
  savings: number;
  badge: string;
}

const offers: Offer[] = [
  {
    name: 'Dual Tincture',
    items: '2 × Performance Tincture (30ml each)',
    originalPrice: 2000,
    discountPercent: 20,
    finalPrice: 1600,
    savings: 400,
    badge: '20% OFF'
  },
  {
    name: 'Starter Pack',
    items: '1 × Tincture + 1 × Powder',
    originalPrice: 1800,
    discountPercent: 25,
    finalPrice: 1350,
    savings: 450,
    badge: 'BEST DEAL 25% OFF'
  },
  {
    name: 'Double Powder',
    items: '2 × Cordyceps Powder (30g each)',
    originalPrice: 1600,
    discountPercent: 20,
    finalPrice: 1280,
    savings: 320,
    badge: '20% OFF'
  }
];

export default function OffersSection() {
  return (
    <div className="py-8 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-adish-dark mb-2">
            🎁 Limited Time Offers
          </h2>
          <p className="text-sm text-adish-green">
            Bundle & Save More • Exclusive Deals
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {offers.map((offer, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
              style={{
                boxShadow: '0 2px 8px rgba(201, 168, 76, 0.06)'
              }}
            >
              {/* Badge */}
              <div className={`inline-block ${offer.discountPercent === 25 ? 'bg-red-500' : 'bg-adish-gold'} text-white text-xs font-bold px-3 py-1 rounded-full mb-3`}>
                🔥 {offer.badge}
              </div>

              {/* Offer Name */}
              <h3 className="text-lg font-bold text-adish-dark mb-2">
                {offer.name}
              </h3>

              {/* Items */}
              <p className="text-xs text-adish-green mb-4 leading-relaxed">
                {offer.items}
              </p>

              {/* Pricing */}
              <div className="mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-bold text-adish-gold">₹{offer.finalPrice}</span>
                  <span className="text-sm text-gray-500 line-through">₹{offer.originalPrice}</span>
                </div>
                <p className="text-xs text-green-600 font-semibold">
                  Save ₹{offer.savings}
                </p>
              </div>

              {/* CTA Button */}
              <button className={`w-full py-2.5 rounded-lg font-bold text-white transition-all text-sm ${
                offer.discountPercent === 25
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-adish-gold hover:bg-yellow-600'
              }`}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="bg-gradient-to-r from-adish-beige to-white rounded-lg p-4 text-center border border-adish-gold border-opacity-30">
          <p className="text-xs text-adish-dark font-semibold">
            ⏰ <span className="text-red-500">Limited Time Offer</span> • Free Shipping on All Bundles • Money Back Guarantee
          </p>
        </div>
      </div>
    </div>
  );
}
