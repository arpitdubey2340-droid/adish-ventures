'use client';

import { products } from '@/lib/products';
import Link from 'next/link';
import { ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleAddToCart = (productId: string, productName: string, price: number) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ id: productId, name: productName, price });
    localStorage.setItem('cart', JSON.stringify(cart));

    // Trigger storage event for cart update
    window.dispatchEvent(new Event('storage'));

    setSelectedProduct(productId);
    setTimeout(() => setSelectedProduct(null), 2000);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden w-full">
      {/* Header */}
      <section className="bg-gradient-to-r from-adish-green to-adish-dark py-8 sm:py-12 px-4 overflow-x-hidden w-full">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-4">
            Our Products
          </h1>
          <p className="text-base sm:text-xl text-adish-beige max-w-2xl">
            Premium Cordyceps Militaris supplements engineered for performance, vitality, and wellness
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 sm:py-20 px-4 overflow-x-hidden w-full">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-12">
            {products.map((product, idx) => {
              // Use your product images
              const heroImages = [
                '/images/products/powder.avif', // Cordyceps Potency Powder
                '/images/products/tincture-real.avif' // Cordyceps Endurance Tincture
              ];
              return (
              <div key={product.id} className="border-2 border-adish-beige rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                {/* Image */}
                <div className="h-48 sm:h-96 bg-gray-100 overflow-hidden">
                  <img
                    src={heroImages[idx] || product.image}
                    alt={product.imageAlt || product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-8">
                  <h2 className="text-xl sm:text-3xl font-serif font-bold text-adish-dark mb-2">
                    {product.name}
                  </h2>
                  <p className="text-adish-green text-sm sm:text-lg mb-6">{product.description}</p>

                  {/* Specs */}
                  <div className="bg-adish-beige p-4 sm:p-6 rounded-lg mb-6">
                    <h3 className="font-bold text-adish-dark mb-4 text-sm sm:text-base">Specifications</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                      <div>
                        <p className="text-adish-green text-xs uppercase tracking-wide">Absorption</p>
                        <p className="font-bold text-adish-dark">{product.specs.absorptionSpeed}</p>
                      </div>
                      <div>
                        <p className="text-adish-green text-xs uppercase tracking-wide">Bioavailability</p>
                        <p className="font-bold text-adish-dark">{product.specs.bioavailability}</p>
                      </div>
                      <div>
                        <p className="text-adish-green text-xs uppercase tracking-wide">Dosing</p>
                        <p className="font-bold text-adish-dark">{product.specs.dosePrecision}</p>
                      </div>
                      <div>
                        <p className="text-adish-green text-xs uppercase tracking-wide">Shelf Life</p>
                        <p className="font-bold text-adish-dark">{product.specs.shelfLife}</p>
                      </div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mb-6">
                    <h3 className="font-bold text-adish-dark mb-3 text-sm sm:text-base">Key Benefits</h3>
                    <ul className="space-y-2">
                      {product.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-adish-green">
                          <span className="text-adish-gold mt-1">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Full Description */}
                  <div className="mb-8 p-3 sm:p-4 bg-white border border-adish-beige rounded-lg">
                    <p className="text-adish-green text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                      {product.fullDescription}
                    </p>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <p className="text-adish-green text-xs sm:text-sm uppercase tracking-wide">Price</p>
                      <p className="text-3xl sm:text-4xl font-bold text-adish-gold">₹{product.price}</p>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product.id, product.name, product.price)}
                      className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 text-sm sm:text-base ${
                        selectedProduct === product.id
                          ? 'bg-green-600 text-white'
                          : 'bg-adish-green text-white hover:bg-adish-dark'
                      }`}
                    >
                      {selectedProduct === product.id ? (
                        <>
                          <Check size={20} /> Added!
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={20} /> Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
            })}
          </div>

          {/* Detailed Comparison */}
          <div className="mt-12 sm:mt-20 mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-adish-dark mb-8 sm:mb-12 text-center">
              Choose Your Optimal Format
            </h2>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
              <div className="bg-white border-2 border-adish-beige rounded-lg p-4 sm:p-8">
                <h3 className="text-lg sm:text-2xl font-bold text-adish-dark mb-4 sm:mb-6">Cordyceps Potency Powder</h3>

                <div className="mb-4 sm:mb-6">
                  <h4 className="font-bold text-adish-dark mb-3 text-sm sm:text-base">Best For:</h4>
                  <ul className="space-y-2">
                    <li className="flex gap-2 text-xs sm:text-sm">
                      <span className="text-adish-gold">→</span>
                      <span className="text-adish-green">Daily wellness rituals and routines</span>
                    </li>
                    <li className="flex gap-2 text-xs sm:text-sm">
                      <span className="text-adish-gold">→</span>
                      <span className="text-adish-green">Blending into smoothies, teas, or beverages</span>
                    </li>
                    <li className="flex gap-2 text-xs sm:text-sm">
                      <span className="text-adish-gold">→</span>
                      <span className="text-adish-green">Sustained, gradual energy release</span>
                    </li>
                    <li className="flex gap-2 text-xs sm:text-sm">
                      <span className="text-adish-gold">→</span>
                      <span className="text-adish-green">Long-term storage and affordability</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-adish-dark mb-3 text-sm sm:text-base">Consumption Method:</h4>
                  <p className="text-adish-green text-xs sm:text-sm">Mix 1-2 tsp daily into your favorite beverage. Traditional preparation method honors centuries of use.</p>
                </div>
              </div>

              <div className="bg-white border-2 border-adish-beige rounded-lg p-4 sm:p-8">
                <h3 className="text-lg sm:text-2xl font-bold text-adish-dark mb-4 sm:mb-6">Cordyceps Endurance Tincture</h3>

                <div className="mb-4 sm:mb-6">
                  <h4 className="font-bold text-adish-dark mb-3 text-sm sm:text-base">Best For:</h4>
                  <ul className="space-y-2">
                    <li className="flex gap-2 text-xs sm:text-sm">
                      <span className="text-adish-gold">★</span>
                      <span className="text-adish-green">Athletes and performance optimization</span>
                    </li>
                    <li className="flex gap-2 text-xs sm:text-sm">
                      <span className="text-adish-gold">★</span>
                      <span className="text-adish-green">Rapid absorption when you need it most</span>
                    </li>
                    <li className="flex gap-2 text-xs sm:text-sm">
                      <span className="text-adish-gold">★</span>
                      <span className="text-adish-green">Precise drop-by-drop dosing control</span>
                    </li>
                    <li className="flex gap-2 text-xs sm:text-sm">
                      <span className="text-adish-gold">★</span>
                      <span className="text-adish-green">Longest shelf life (3-5 years)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-adish-dark mb-3 text-sm sm:text-base">Consumption Method:</h4>
                  <p className="text-adish-green text-xs sm:text-sm">Place 10-20 drops under tongue daily. Sublingual delivery bypasses digestion for rapid, full bioavailability.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bundle Offer */}
          <div className="mt-12 sm:mt-20 bg-gradient-to-r from-adish-gold to-adish-light-gold p-6 sm:p-12 rounded-lg">
            <div className="max-w-3xl">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-adish-dark mb-4">
                Bundle & Save
              </h3>
              <p className="text-adish-dark mb-6 text-sm sm:text-lg">
                Get both Powder and Tincture for ₹1,800 (Save ₹200)
              </p>
              <button className="bg-adish-dark text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-adish-green transition-colors text-sm sm:text-base">
                Buy Bundle
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Adish */}
      <section className="py-12 sm:py-20 px-4 bg-adish-beige overflow-x-hidden w-full">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-adish-dark text-center mb-8 sm:mb-12">
            Why Choose Adish Ventures?
          </h2>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
            <div className="bg-white p-4 sm:p-8 rounded-lg">
              <div className="text-3xl sm:text-4xl font-bold text-adish-gold mb-4">🌿</div>
              <h3 className="text-base sm:text-xl font-bold text-adish-dark mb-3">Pure Science</h3>
              <p className="text-adish-green text-xs sm:text-sm">
                Dual-extract methodology honoring both traditional wisdom and modern biochemistry. No fillers, no compromises.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-8 rounded-lg">
              <div className="text-3xl sm:text-4xl font-bold text-adish-gold mb-4">⚡</div>
              <h3 className="text-base sm:text-xl font-bold text-adish-dark mb-3">Performance First</h3>
              <p className="text-adish-green text-xs sm:text-sm">
                Engineered for measurable biological outcomes. From ATP synthesis to immune optimization—real results.
              </p>
            </div>
            <div className="bg-white p-4 sm:p-8 rounded-lg">
              <div className="text-3xl sm:text-4xl font-bold text-adish-gold mb-4">🎯</div>
              <h3 className="text-base sm:text-xl font-bold text-adish-dark mb-3">Hyper-Targeted</h3>
              <p className="text-adish-green text-xs sm:text-sm">
                Not another general wellness brand. We specialize in Cordyceps Militaris—one ingredient, infinite intelligence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
