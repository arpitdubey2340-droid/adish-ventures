'use client';

import { products } from '@/lib/products';
import { ShoppingCart, Check, Star, ShieldCheck, ChevronDown, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import ImageGallery from '@/components/ImageGallery';
import CertificationsSection from '@/components/CertificationsSection';
import { addToCart } from '@/lib/cart';

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

  const handleAddToCart = (productId: string, productName: string, price: number, image: string) => {
    const qty = quantities[productId] || 1;
    // Shared helper handles storage + cart badge + mini-cart drawer.
    addToCart({ id: productId, name: productName, price, image }, qty);
    // Keep the in-card "Added!" checkmark animation.
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
      <section className="bg-gray-100 py-16 w-full" style={{borderBottom: '2px solid rgba(201, 168, 76, 0.5)'}}>
        <div className="max-w-7xl mx-auto px-4 w-full">
          <h1 className="text-6xl font-serif font-bold text-adish-dark mb-4">
            Our Products
          </h1>
          <p className="text-3xl text-adish-dark max-w-3xl font-serif font-light leading-relaxed tracking-wide">
            Premium Cordyceps Militaris supplements engineered for performance, vitality, and wellness
          </p>
        </div>
      </section>

      {/* Products - Stacked Vertically */}
      <section className="py-8 px-4 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto w-full">
          {products.map((product, idx) => (
            <div key={product.id} id={`product-${product.id}`} className="w-full overflow-x-hidden">
              {/* Product Section */}
              <div className="py-8 w-full overflow-x-hidden">
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
                            return <Star key={i} size={22} style={{fill: '#c9a84c', stroke: '#c9a84c', strokeWidth: 0}} />;
                          } else {
                            return (
                              <div key={i} className="relative">
                                <Star size={22} style={{fill: '#e5e7eb', stroke: '#e5e7eb', strokeWidth: 0}} />
                                <div className="absolute top-0 left-0 overflow-hidden w-1/2">
                                  <Star size={22} style={{fill: '#c9a84c', stroke: '#c9a84c', strokeWidth: 0}} />
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
                        onClick={() => handleAddToCart(product.id, product.name, product.price, product.image)}
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
                        onClick={() => handleAddToCart(product.id, product.name, product.price, product.image)}
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
                <div className="my-16 border-t-2 border-adish-gold opacity-60"></div>
              )}
            </div>
          ))}

          {/* Certifications Section - At the End of Page */}
          <CertificationsSection />
        </div>
      </section>
    </div>
  );
}

function ExpandableAboutSection({ product }: { product: any }) {
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({ 0: true });

  const tinctureItems = [
    {
      title: 'ENERGY & DAILY PERFORMANCE',
      content: 'Cordyceps militaris has been studied for its ability to enhance ATP (adenosine triphosphate) production at the cellular level, supporting oxygen utilisation and endurance — making it a popular choice among athletes and those seeking sustained energy without stimulants.'
    },
    {
      title: 'ADAPTOGENIC BALANCE',
      content: 'Cordyceps militaris works as a true adaptogen by helping to modulate cortisol levels and support adrenal function, enabling the body to respond more efficiently to physical and mental stress while promoting hormonal balance and resilience.'
    },
    {
      title: 'LIBIDO & SEXUAL VITALITY SUPPORT',
      content: 'Cordyceps militaris has a long history of traditional use for reproductive health and is supported by emerging research suggesting it may help promote healthy testosterone levels, improve sexual function, and support libido in both men and women — likely through its influence on adrenal and hormonal pathways alongside its energy-enhancing properties.'
    },
    {
      title: 'FRUITING BODY EXTRACT FOR MAXIMUM POTENCY',
      content: 'Our extract is derived exclusively from Cordyceps militaris fruiting bodies — the natural source of Cordycepin (3\'-deoxyadenosine), a bioactive compound unique to this species and linked to immune modulation, cellular health, and vitality support.'
    },
    {
      title: 'LIQUID FORM FOR FAST ABSORPTION',
      content: 'Liquid Cordyceps militaris extract absorbs faster than capsules or powders, allowing key compounds like Cordycepin and Adenosine to enter the bloodstream more readily — ideal for pre- or post-workout use or as part of your morning routine.'
    },
    {
      title: 'ULTRASONICALLY EXTRACTED & LAB TESTED',
      content: 'Advanced ultrasonic extraction maximises the release of Cordyceps militaris-specific actives including Beta-glucans, Cordycepin, and Adenosine. Every batch is independently lab tested for purity and potency, produced in ISO, FDA & HACCP certified facilities.'
    }
  ];

  const powderItems = [
    {
      title: 'ENERGY & DAILY PERFORMANCE',
      content: 'Cordyceps militaris has been studied for its ability to enhance ATP (adenosine triphosphate) production at the cellular level, supporting oxygen utilisation and endurance — making it a popular choice among athletes and those seeking sustained energy without stimulants.'
    },
    {
      title: 'ADAPTOGENIC BALANCE',
      content: 'Cordyceps militaris works as a true adaptogen by helping to modulate cortisol levels and support adrenal function, enabling the body to respond more efficiently to physical and mental stress while promoting hormonal balance and resilience.'
    },
    {
      title: 'LIBIDO & SEXUAL VITALITY SUPPORT',
      content: 'Cordyceps militaris has a long history of traditional use for reproductive health and is supported by emerging research suggesting it may help promote healthy testosterone levels, improve sexual function, and support libido in both men and women — likely through its influence on adrenal and hormonal pathways alongside its energy-enhancing properties.'
    },
    {
      title: 'FRUITING BODY EXTRACT FOR MAXIMUM POTENCY',
      content: 'Our extract is derived exclusively from Cordyceps militaris fruiting bodies — the natural source of Cordycepin (3\'-deoxyadenosine), a bioactive compound unique to this species and linked to immune modulation, cellular health, and vitality support.'
    },
    {
      title: 'ULTRASONICALLY EXTRACTED & LAB TESTED',
      content: 'Advanced ultrasonic extraction maximises the release of Cordyceps militaris-specific actives including Beta-glucans, Cordycepin, and Adenosine. Every batch is independently lab tested for purity and potency, produced in ISO, FDA & HACCP certified facilities.'
    }
  ];

  const items = product.id === 'performance-tincture' ? tinctureItems : powderItems;

  const toggleExpanded = (idx: number) => {
    setExpanded(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="mt-8 pt-8 pb-8 w-full">
      <h2 className="text-2xl font-bold text-adish-dark mb-6">About this item</h2>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleExpanded(idx)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-bold text-adish-dark text-base">{item.title}</h3>
              <Plus
                size={20}
                className={`text-adish-dark transition-transform ${expanded[idx] ? 'rotate-45' : ''}`}
              />
            </button>
            {expanded[idx] && (
              <div className="px-4 py-3 border-t border-gray-300 bg-gray-50">
                <p className="text-adish-dark text-sm leading-relaxed">{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
