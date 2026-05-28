'use client';

import { products } from '@/lib/products';
import { ShoppingCart, Check, Star, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import ImageGallery from '@/components/ImageGallery';

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    'cordyceps-powder': 1,
    'performance-tincture': 1,
  });

  // Scroll to first product on page load
  useEffect(() => {
    const firstProductElement = document.getElementById('product-cordyceps-powder');
    if (firstProductElement) {
      setTimeout(() => {
        firstProductElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, []);

  const handleAddToCart = (productId: string, productName: string, price: number) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const qty = quantities[productId] || 1;
    for (let i = 0; i < qty; i++) {
      cart.push({ id: productId, name: productName, price });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    setSelectedProduct(productId);
    setTimeout(() => setSelectedProduct(null), 2000);
  };

  const handleQuantityChange = (productId: string, value: number) => {
    if (value >= 1) {
      setQuantities(prev => ({ ...prev, [productId]: value }));
    }
  };

  // Image galleries for each product
  const productImageGalleries: { [key: string]: string[] } = {
    'cordyceps-powder': [
      '/images/products/powder.avif',
      '/images/products/powder-lifestyle.avif',
      '/images/products/powder-close.avif',
      '/images/products/powder-mixed.avif',
      '/images/products/powder-package.avif',
      '/images/products/powder-spoon.avif',
    ],
    'performance-tincture': [
      '/images/products/tincture-real.avif',
      '/images/products/tincture-lifestyle.avif',
      '/images/products/tincture-spoon.avif',
      '/images/products/tincture-dropper.avif',
      '/images/products/tincture-bottle.avif',
      '/images/products/tincture-back.avif',
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-adish-green to-adish-dark py-12 px-4">
        <div className="max-w-7xl mx-auto">
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
        <div className="max-w-7xl mx-auto">
          {products.map((product, idx) => (
            <div key={product.id} id={`product-${product.id}`}>
              {/* Product Section */}
              <div className="py-12">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Left: Product Image Gallery */}
                  <div>
                    <ImageGallery
                      images={productImageGalleries[product.id]}
                      productName={product.name}
                    />
                  </div>

                  {/* Right: Product Details */}
                  <div className="flex flex-col justify-start">
                    {/* Title & Rating */}
                    <h2 className="text-4xl font-serif font-bold text-adish-dark mb-3">
                      {product.name}
                    </h2>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={18} className="fill-adish-gold text-adish-gold" />
                        ))}
                      </div>
                      <span className="text-gray-600 text-sm font-medium">(1,247 verified reviews)</span>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex items-center gap-2 mb-6 text-sm text-adish-green">
                      <ShieldCheck size={16} className="text-green-600" />
                      <span>100% Pure • Lab Tested • Quality Assured</span>
                    </div>

                    {/* Description */}
                    <p className="text-adish-green text-base mb-6 leading-relaxed font-medium">
                      {product.description}
                    </p>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-2 gap-4 mb-8 bg-adish-beige p-5 rounded-lg border border-adish-gold/20">
                      <div>
                        <p className="text-adish-green text-xs uppercase tracking-wide font-bold mb-1">Absorption</p>
                        <p className="font-bold text-adish-dark">{product.specs.absorptionSpeed}</p>
                      </div>
                      <div>
                        <p className="text-adish-green text-xs uppercase tracking-wide font-bold mb-1">Bioavailability</p>
                        <p className="font-bold text-adish-dark">{product.specs.bioavailability}</p>
                      </div>
                      <div>
                        <p className="text-adish-green text-xs uppercase tracking-wide font-bold mb-1">Dosing</p>
                        <p className="font-bold text-adish-dark">{product.specs.dosePrecision}</p>
                      </div>
                      <div>
                        <p className="text-adish-green text-xs uppercase tracking-wide font-bold mb-1">Shelf Life</p>
                        <p className="font-bold text-adish-dark">{product.specs.shelfLife}</p>
                      </div>
                    </div>

                    {/* Price Section */}
                    <div className="mb-8 pb-8 border-b-2 border-gray-200">
                      <p className="text-adish-green text-xs uppercase tracking-wide font-bold mb-2">Price</p>
                      <div className="flex items-baseline gap-3">
                        <span className="text-5xl font-bold text-adish-gold">₹{product.price}</span>
                        <span className="text-gray-500 text-sm line-through">₹1,200</span>
                      </div>
                      <p className="text-green-600 text-sm font-semibold mt-2">Save ₹200 - Limited Offer</p>
                    </div>

                    {/* Quantity + Add to Cart + Buy Now - All on One Line */}
                    <div className="mb-8 flex items-center gap-3 flex-wrap">
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-adish-green font-semibold whitespace-nowrap">Qty:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) - 1)}
                            className="px-3 py-2 text-adish-green hover:bg-gray-100 font-bold"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={quantities[product.id] || 1}
                            onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 1)}
                            className="w-10 text-center border-0 font-bold text-adish-dark"
                          />
                          <button
                            onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) + 1)}
                            className="px-3 py-2 text-adish-green hover:bg-gray-100 font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(product.id, product.name, product.price)}
                        className="px-6 py-2 rounded-lg font-bold text-white bg-adish-green hover:bg-adish-dark transition-all flex items-center justify-center gap-2 text-sm shadow-md whitespace-nowrap"
                      >
                        {selectedProduct === product.id ? (
                          <>
                            <Check size={16} /> Added!
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={16} /> Add to Cart
                          </>
                        )}
                      </button>

                      {/* Buy Now Button */}
                      <button
                        onClick={() => handleAddToCart(product.id, product.name, product.price)}
                        className="px-6 py-2 rounded-lg font-bold bg-adish-gold text-adish-dark hover:bg-yellow-500 transition-all shadow-md text-sm flex items-center justify-center whitespace-nowrap"
                      >
                        Buy Now
                      </button>
                    </div>

                    {/* Key Benefits */}
                    <div className="bg-white border-l-4 border-adish-gold p-5 rounded-lg">
                      <h3 className="font-bold text-adish-dark mb-4 text-sm uppercase tracking-wide">Key Benefits</h3>
                      <ul className="space-y-3">
                        {product.benefits.slice(0, 4).map((benefit, i) => (
                          <li key={i} className="flex items-start gap-3 text-adish-green text-sm">
                            <span className="text-adish-gold font-bold mt-1">✓</span>
                            <span className="font-medium">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Below Product: Full Width Info */}
                <div className="mt-16 pt-12 border-t-2 border-gray-200">
                  {/* Suggested Use */}
                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="p-6 bg-adish-beige rounded-lg border-l-4 border-adish-gold">
                      <h3 className="font-bold text-adish-dark mb-3 text-lg">📋 Suggested Use</h3>
                      <p className="text-adish-green text-sm leading-relaxed">
                        {idx === 0
                          ? "Mix 1-2 teaspoons daily into your preferred beverage - water, coffee, smoothies, or tea. Best taken with meals for optimal absorption. Start with 1 teaspoon and increase gradually."
                          : "Place 10-20 drops under tongue for 30-60 seconds before swallowing. Best taken on an empty stomach or as directed by a healthcare professional. Adjust dosage based on personal response."
                        }
                      </p>
                    </div>

                    <div className="p-6 bg-white border-2 border-adish-beige rounded-lg">
                      <h3 className="font-bold text-adish-dark mb-3 text-lg">🧪 Specifications</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-adish-green font-semibold">Form:</span>
                          <span className="text-adish-dark font-medium">{idx === 0 ? 'Fine Powder' : 'Liquid Extract'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-adish-green font-semibold">Size:</span>
                          <span className="text-adish-dark font-medium">{idx === 0 ? '50g' : '30 mL (1 FL OZ)'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-adish-green font-semibold">Shelf Life:</span>
                          <span className="text-adish-dark font-medium">{product.specs.shelfLife}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-adish-green font-semibold">Extract:</span>
                          <span className="text-adish-dark font-medium">{product.specs.extraction}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider Between Products */}
              {idx === 0 && (
                <div className="my-12 flex justify-center">
                  <div className="w-32 h-1 bg-gradient-to-r from-transparent via-adish-gold to-transparent rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
