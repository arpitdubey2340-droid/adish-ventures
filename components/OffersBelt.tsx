'use client';

import React from 'react';
import { addToCart } from '@/lib/cart';

interface OfferItem {
  id: string;
  name: string;
  price: number;
  type: 'tincture' | 'powder';
  quantity: number;
  icon: string;
}

export default function OffersBelt() {
  const offers: OfferItem[] = [
    { id: 'tincture-2pack', name: 'Tincture 2-Pack', price: 1800, type: 'tincture', quantity: 2, icon: '🍾' },
    { id: 'tincture-3pack', name: 'Tincture 3-Pack', price: 2499, type: 'tincture', quantity: 3, icon: '🍾' },
    { id: 'powder-2pack', name: 'Powder 2-Pack', price: 3500, type: 'powder', quantity: 2, icon: '📦' },
    { id: 'powder-3pack', name: 'Powder 3-Pack', price: 5000, type: 'powder', quantity: 3, icon: '📦' },
  ];

  const handleAddToCart = (e: React.MouseEvent, offer: OfferItem) => {
    e.stopPropagation();
    // Add the bundle as a single cart line at the exact advertised price.
    // Uses the shared helper so it groups, carries an image, updates the nav
    // badge, and opens the mini-cart — like every other add-to-cart on the site.
    const image =
      offer.type === 'tincture'
        ? '/images/products/tincture-real.avif'
        : '/images/products/powder.avif';
    addToCart({ id: offer.id, name: offer.name, price: offer.price, image });
  };

  return (
    <>
      <style>{`
        @keyframes scrollWithPause {
          0% { transform: translateX(100%); }
          40% { transform: translateX(-100%); }
          100% { transform: translateX(-100%); }
        }
        .belt-scroll {
          animation: scrollWithPause 55s linear infinite;
        }
        .offer-item {
          cursor: pointer;
          transition: all 0.3s ease;
          pointer-events: auto;
          z-index: 10;
        }
        .offer-item:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }
        .belt-scroll {
          pointer-events: auto !important;
        }
      `}</style>

      <div className="relative z-20 h-16 overflow-hidden w-full flex items-center"
        style={{
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          paddingLeft: 'calc(50vw - 50%)',
          paddingRight: 'calc(50vw - 50%)',
          background: 'linear-gradient(135deg, rgba(201, 168, 76, 0.3) 0%, rgba(201, 168, 76, 0.27) 50%, rgba(201, 168, 76, 0.3) 100%)',
          boxShadow: '0 12px 32px rgba(201, 168, 76, 0.12), 0 6px 16px rgba(0, 0, 0, 0.08), inset 0 1px 3px rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(20px) brightness(1.15)',
          border: '1px solid rgba(201, 168, 76, 0.15)'
        }}
      >

        {/* Scrolling Content */}
        <div className="belt-scroll flex items-center whitespace-nowrap h-full">
          {/* Message Set 1 */}
          <div className="flex items-center gap-16 px-16">
            <div className="flex items-center gap-3 px-4 py-2 bg-red-500 rounded-full whitespace-nowrap">
              <span className="text-lg font-bold text-white">🎉 GRAB DEAL</span>
            </div>
            {offers.map((offer, index) => (
              <React.Fragment key={`set1-${offer.id}`}>
                <div
                  className="offer-item flex items-center gap-3 min-w-fit"
                  onClick={(e) => handleAddToCart(e, offer)}
                >
                  <span className="text-2xl">{offer.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-adish-green tracking-wide">{offer.name}</p>
                    <p className="text-lg font-bold text-adish-gold">₹{offer.price.toLocaleString()}</p>
                  </div>
                </div>
                {index < offers.length - 1 && (
                  <div className="h-8 w-1 bg-gradient-to-b from-transparent via-adish-gold to-transparent opacity-50"></div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Message Set 2 (Duplicate for continuous scroll) */}
          <div className="flex items-center gap-16 px-16">
            <div className="flex items-center gap-3 px-4 py-2 bg-red-500 rounded-full whitespace-nowrap">
              <span className="text-lg font-bold text-white">🎉 GRAB DEAL</span>
            </div>
            {offers.map((offer, index) => (
              <React.Fragment key={`set2-${offer.id}`}>
                <div
                  className="offer-item flex items-center gap-3 min-w-fit"
                  onClick={(e) => handleAddToCart(e, offer)}
                >
                  <span className="text-2xl">{offer.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-adish-green tracking-wide">{offer.name}</p>
                    <p className="text-lg font-bold text-adish-gold">₹{offer.price.toLocaleString()}</p>
                  </div>
                </div>
                {index < offers.length - 1 && (
                  <div className="h-8 w-1 bg-gradient-to-b from-transparent via-adish-gold to-transparent opacity-50"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
