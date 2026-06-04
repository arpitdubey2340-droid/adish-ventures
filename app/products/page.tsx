'use client';

import { products } from '@/lib/products';
import { ShoppingCart, Check, Star, ShieldCheck, ChevronDown, Zap, Shield, Heart, Leaf, Droplet, FlaskConical } from 'lucide-react';
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
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* Header */}
      <section className="bg-gradient-to-r from-adish-green to-adish-dark py-12 px-4 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-5xl font-serif font-bold text-white mb-4">
            Our Products
          </h1>
          <p className="text-xl text-adish-beige max-w-2xl">
            Premium Cordyceps Militaris supplements engineered for performance, vitality, and wellness
          </p>
        </div>
      </section>

      {/* Products - Stacked Vertically */}
      <section className="py-16 px-4 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto w-full">
          {products.map((product, idx) => (
            <div key={product.id} id={`product-${product.id}`} className="w-full overflow-x-hidden">
              {/* Product Section */}
              <div className="py-12 w-full overflow-x-hidden">
                <div className="grid lg:grid-cols-2 gap-4 lg:gap-12 items-start w-full max-w-full overflow-x-hidden">
                  {/* Left: Product Image Gallery */}
                  <div className="w-full overflow-x-hidden min-w-0">
                    <ImageGallery
                      images={productImageGalleries[product.id]}
                      productName={product.name}
                    />
                  </div>

                  {/* Right: Product Details */}
                  <div className="flex flex-col justify-start px-0 sm:px-2 w-full overflow-x-hidden min-w-0">
                    {/* Title & Rating */}
                    <h2 className="text-4xl font-serif font-bold text-adish-dark mb-3">
                      {product.name}
                    </h2>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => {
                          if (i < 4) {
                            return <Star key={i} size={20} className="fill-adish-gold text-adish-gold" />;
                          } else {
                            return (
                              <div key={i} className="relative">
                                <Star size={20} className="fill-gray-300 text-gray-300" />
                                <div className="absolute top-0 left-0 overflow-hidden w-1/2">
                                  <Star size={20} className="fill-adish-gold text-adish-gold" />
                                </div>
                              </div>
                            );
                          }
                        })}
                      </div>
                      <span className="text-adish-dark font-bold text-sm">4.5</span>
                      <span className="text-gray-600 text-sm font-medium">(1,247 verified reviews)</span>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex items-center gap-2 mb-6 text-sm text-adish-green">
                      <ShieldCheck size={16} className="text-green-600" />
                      <span>
                        {product.id === 'cordyceps-powder'
                          ? '100% Pure Fruiting Body Extract • Lab Tested • 30% Beta Glucan • Quality Assured'
                          : '100% Pure Fruiting Body Extract • Lab Tested • Quality Assured'
                        }
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-adish-green text-base mb-6 leading-relaxed font-medium">
                      {product.description}
                    </p>

                    {/* Bio Section */}
                    <div className="mb-6 p-4 bg-white border-l-4 border-adish-gold rounded-lg">
                      <p className="text-adish-green text-sm leading-relaxed font-medium">
                        {product.id === 'cordyceps-powder'
                          ? 'Ethnobotanical Cordyceps Potency Powder | Cordyceps Mushroom Powder Extract | 30 gms | 100 % Fruiting Body Extract | Herbal Supplement | For Energy & Endurance Support'
                          : 'Ethnobotanical Endurance | Cordyceps Mushroom Liquid Extract | 30 ml | 100 % Fruiting Body 1:10 Dual Extract | Alcohol Free Tincture | Herbal Supplement | For Energy & Endurance Support'
                        }
                      </p>
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
                    <div className="mb-8 flex flex-wrap items-center gap-2 sm:gap-3 w-full">
                      {/* Quantity Selector */}
                      <span className="text-adish-green font-semibold">Qty:</span>
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

                      {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(product.id, product.name, product.price)}
                        className={`px-6 py-2 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2 text-sm shadow-md ${
                          selectedProduct === product.id
                            ? 'bg-green-600'
                            : 'bg-green-700 hover:bg-green-800'
                        }`}
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
                        className="px-6 py-2 rounded-lg font-bold bg-adish-gold text-adish-dark hover:bg-yellow-500 transition-all shadow-md text-sm flex items-center justify-center"
                      >
                        Buy Now
                      </button>
                    </div>

                    {/* About This Product Section */}
                    <ExpandableAboutSection product={product} />

                  </div>
                </div>

                {/* Below Product: Usage Guide Section */}
                <div className="mt-16 pt-12 pb-12 px-6 sm:px-8 rounded-lg bg-adish-beige border-t-2 border-gray-200 -mx-6 sm:-mx-8">
                  {/* Usage Guide */}
                  <div className="mb-12 max-w-7xl mx-auto">
                    <h2 className="text-4xl font-serif font-bold text-adish-dark mb-12 text-center">Usage Guide</h2>

                    {/* Two Column Layout: Image + Content */}
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                      {/* Left: Product Image */}
                      <div className="order-2 lg:order-1">
                        <div className="relative w-full h-64 lg:h-80 rounded-lg overflow-hidden shadow-lg">
                          <img
                            src={
                              product.id === 'cordyceps-powder'
                                ? '/images/products/powder-usage.png'
                                : '/images/products/tincture-usage.png'
                            }
                            alt={`${product.name} Usage`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Right: Usage Information */}
                      <div className="order-1 lg:order-2">
                        {/* How to Use */}
                        <div className="mb-8">
                          <h3 className="text-2xl font-bold text-adish-dark mb-3">How to use</h3>
                          <p className="text-adish-green text-base leading-relaxed font-medium">
                            {idx === 0
                              ? "Mix 1-2 teaspoons daily into your preferred beverage - water, coffee, smoothies, or tea. Best taken with meals for optimal absorption. Start with 1 teaspoon and increase gradually."
                              : "Place 10-20 drops under tongue for 30-60 seconds before swallowing. Best taken on an empty stomach or as directed by a healthcare professional. Adjust dosage based on personal response."
                            }
                          </p>
                        </div>

                        {/* When to Use */}
                        <div className="mb-8">
                          <h3 className="text-2xl font-bold text-adish-dark mb-3">When to use</h3>
                          <p className="text-adish-green text-base leading-relaxed font-medium">
                            {idx === 0
                              ? "Start your day with it to boost energy and focus. Or take during afternoon energy dips. Consistent daily use maximizes the adaptogenic benefits of Cordyceps."
                              : "Start your morning for sustained energy throughout the day. Or use 30 minutes before physical activity for enhanced performance. Perfect for professionals needing sustained focus."
                            }
                          </p>
                        </div>

                        {/* Expected Results */}
                        <div>
                          <h3 className="text-2xl font-bold text-adish-dark mb-3">Expected results</h3>
                          <p className="text-adish-green text-base leading-relaxed font-medium">
                            {idx === 0
                              ? "Most users notice improved energy levels within 3-5 days. Enhanced stamina and reduced fatigue within 2-3 weeks. Optimal benefits develop with consistent daily use over 30 days."
                              : "Rapid energy surge within 5-10 minutes. Enhanced focus and mental clarity within 15-20 minutes. Improved physical endurance and recovery within 1-2 weeks of regular use."
                            }
                          </p>
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

function ExpandableAboutSection({ product }: { product: any }) {
  const tinctureItems = [
    {
      title: 'ENERGY & DAILY PERFORMANCE',
      content: 'Cordyceps mushroom is commonly used in herbal and mushroom supplement routines to support steady energy and an active lifestyle throughout the day'
    },
    {
      title: 'ADAPTOGENIC BALANCE',
      content: 'Cordyceps, an adaptogenic mushroom, helps the body adapt to occasional stress and maintain balance, supporting overall vitality as part of a consistent daily routine'
    },
    {
      title: 'FRUITING BODY EXTRACT FOR MAXIMUM POTENCY',
      content: 'Made from fruiting bodies, not mycelium, using organic mushrooms and careful extraction to preserve key compounds that support natural energy and vitality'
    },
    {
      title: 'ALCOHOL-FREE, CLEAN FORMULA',
      content: 'Made with vegetable glycerine for a smoother taste & gentler daily use. Free from fillers, artificial additives, gluten, and GMOs for a pure Cordyceps mushroom supplement'
    },
    {
      title: 'LIQUID FORM FOR FAST ABSORPTION',
      content: 'Liquid may absorb faster than capsules or mushroom powders, helping your body access beneficial compounds more efficiently. Take 1-2 ml directly or add to pre or post workout shakes'
    }
  ];

  const powderItems = [
    {
      title: 'ENERGY & DAILY PERFORMANCE',
      content: 'Cordyceps mushroom is commonly used in herbal and mushroom supplement routines to support steady energy and an active lifestyle throughout the day'
    },
    {
      title: 'ADAPTOGENIC BALANCE',
      content: 'Cordyceps, an adaptogenic mushroom, helps the body adapt to occasional stress and maintain balance, supporting overall vitality as part of a consistent daily routine'
    },
    {
      title: 'FRUITING BODY EXTRACT FOR MAXIMUM POTENCY',
      content: 'Made from fruiting bodies, not mycelium, using organic mushrooms and careful extraction to preserve key compounds that support natural energy and vitality'
    },
    {
      title: 'FLEXIBLE FORM',
      content: 'Our fine powder form allows you to mix with your preferred beverage or incorporate into smoothies, providing flexibility in consumption'
    },
    {
      title: 'LAB TESTED & CERTIFIED',
      content: 'Every batch is independently lab tested for purity and potency, produced in ISO, FDA & HACCP certified facilities'
    }
  ];

  const items = product.id === 'performance-tincture' ? tinctureItems : powderItems;

  return (
    <div className="mt-8 pt-8 pb-8 w-full">
      <h2 className="text-2xl font-bold text-adish-dark mb-4">About this item</h2>
      <ul className="list-disc list-outside pl-5 space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="text-adish-dark text-sm leading-relaxed">
            <span className="font-bold">{item.title}:</span> {item.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
