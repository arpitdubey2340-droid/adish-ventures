'use client';

import { products } from '@/lib/products';
import { ShoppingCart, Check, Star } from 'lucide-react';
import { useState } from 'react';

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleAddToCart = (productId: string, productName: string, price: number) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ id: productId, name: productName, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    setSelectedProduct(productId);
    setTimeout(() => setSelectedProduct(null), 2000);
  };

  const productImages = [
    '/images/products/powder.avif',
    '/images/products/tincture-real.avif'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-adish-green to-adish-dark py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-serif font-bold text-white mb-4">
            Our Products
          </h1>
          <p className="text-xl text-adish-beige max-w-2xl">
            Premium Cordyceps Militaris supplements engineered for performance, vitality, and wellness
          </p>
        </div>
      </section>

      {/* Products - Stacked Vertically */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {products.map((product, idx) => (
            <div key={product.id}>
              {/* Product Section */}
              <div className="py-12">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                  {/* Left: Product Image */}
                  <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg h-96 flex items-center justify-center">
                    <img
                      src={productImages[idx]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Right: Product Details */}
                  <div className="flex flex-col justify-start">
                    {/* Title & Rating */}
                    <h2 className="text-4xl font-serif font-bold text-adish-dark mb-2">
                      {product.name}
                    </h2>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className="fill-adish-gold text-adish-gold" />
                        ))}
                      </div>
                      <span className="text-gray-600 text-sm">(1,200+ reviews)</span>
                    </div>

                    {/* Description */}
                    <p className="text-adish-green text-lg mb-6 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-2 gap-4 mb-8 bg-adish-beige p-4 rounded-lg">
                      <div>
                        <p className="text-adish-green text-xs uppercase tracking-wide font-semibold mb-1">Absorption</p>
                        <p className="font-bold text-adish-dark">{product.specs.absorptionSpeed}</p>
                      </div>
                      <div>
                        <p className="text-adish-green text-xs uppercase tracking-wide font-semibold mb-1">Bioavailability</p>
                        <p className="font-bold text-adish-dark">{product.specs.bioavailability}</p>
                      </div>
                      <div>
                        <p className="text-adish-green text-xs uppercase tracking-wide font-semibold mb-1">Dosing</p>
                        <p className="font-bold text-adish-dark">{product.specs.dosePrecision}</p>
                      </div>
                      <div>
                        <p className="text-adish-green text-xs uppercase tracking-wide font-semibold mb-1">Shelf Life</p>
                        <p className="font-bold text-adish-dark">{product.specs.shelfLife}</p>
                      </div>
                    </div>

                    {/* Price & Buttons */}
                    <div className="mb-8">
                      <p className="text-adish-green text-sm uppercase tracking-wide font-semibold mb-2">Price</p>
                      <p className="text-5xl font-bold text-adish-gold mb-4">₹{product.price}</p>
                      <button
                        onClick={() => handleAddToCart(product.id, product.name, product.price)}
                        className={`w-full py-4 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 ${
                          selectedProduct === product.id
                            ? 'bg-green-600 text-white'
                            : 'bg-adish-green text-white hover:bg-adish-dark'
                        }`}
                      >
                        {selectedProduct === product.id ? (
                          <>
                            <Check size={20} /> Added to Cart!
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={20} /> Add to Cart
                          </>
                        )}
                      </button>
                    </div>

                    {/* Key Benefits */}
                    <div>
                      <h3 className="font-bold text-adish-dark mb-3">Key Benefits</h3>
                      <ul className="space-y-2">
                        {product.benefits.slice(0, 4).map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2 text-adish-green text-sm">
                            <span className="text-adish-gold mt-1">✓</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Suggested Use */}
                <div className="mt-8 p-6 bg-adish-beige rounded-lg border-l-4 border-adish-gold">
                  <h3 className="font-bold text-adish-dark mb-2">Suggested Use</h3>
                  <p className="text-adish-green text-sm">
                    {idx === 0
                      ? "Mix 1-2 teaspoons daily into your preferred beverage - water, coffee, smoothies, or tea. Best taken with meals for optimal absorption."
                      : "Place 10-20 drops under tongue for 30-60 seconds before swallowing. Best taken on an empty stomach or as directed by a healthcare professional."
                    }
                  </p>
                </div>
              </div>

              {/* Divider */}
              {idx === 0 && (
                <div className="my-12 border-t-2 border-adish-beige relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4">
                    <span className="text-adish-green font-semibold text-sm">━━━━━</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
