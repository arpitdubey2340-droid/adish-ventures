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
                <div className="grid lg:grid-cols-2 gap-4 lg:gap-12 items-start w-full max-w-full">
                  {/* Left: Product Image Gallery */}
                  <div>
                    <ImageGallery
                      images={productImageGalleries[product.id]}
                      productName={product.name}
                    />
                  </div>

                  {/* Right: Product Details */}
                  <div className="flex flex-col justify-start px-0 sm:px-2">
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

                  </div>
                </div>

                {/* About This Product Section - Expandable */}
                <ExpandableAboutSection product={product} />

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
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const tinctureItems = [
    {
      id: 'energy',
      icon: <Zap size={20} className="text-adish-gold" />,
      title: 'Energy & Daily Performance',
      content: 'Cordyceps militaris has been studied for its ability to enhance ATP (adenosine triphosphate) production at the cellular level, supporting oxygen utilisation and endurance — making it a popular choice among athletes.'
    },
    {
      id: 'adaptogen',
      icon: <Shield size={20} className="text-adish-gold" />,
      title: 'Adaptogenic Balance',
      content: 'Cordyceps militaris works as a true adaptogen by helping to modulate cortisol levels and support adrenal function, enabling the body to respond more efficiently to physical and mental stress.'
    },
    {
      id: 'libido',
      icon: <Heart size={20} className="text-adish-gold" />,
      title: 'Libido & Sexual Vitality',
      content: 'Cordyceps militaris has a long history of traditional use for reproductive health and is supported by emerging research suggesting it may help promote healthy testosterone levels and improve sexual function.'
    },
    {
      id: 'fruiting',
      icon: <Leaf size={20} className="text-adish-gold" />,
      title: 'Fruiting Body Extract',
      content: 'Our extract is derived exclusively from Cordyceps militaris fruiting bodies — the natural source of Cordycepin, a bioactive compound unique to this species and linked to immune modulation and cellular health.'
    },
    {
      id: 'absorption',
      icon: <Droplet size={20} className="text-adish-gold" />,
      title: 'Fast Absorption',
      content: 'Liquid Cordyceps militaris extract absorbs faster than capsules or powders, allowing key compounds like Cordycepin and Adenosine to enter the bloodstream more readily.'
    },
    {
      id: 'tested',
      icon: <FlaskConical size={20} className="text-adish-gold" />,
      title: 'Lab Tested & Certified',
      content: 'Advanced ultrasonic extraction maximises Cordyceps-specific actives. Every batch is independently lab tested for purity and potency, produced in ISO, FDA & HACCP certified facilities.'
    }
  ];

  const powderItems = [
    {
      id: 'fruiting',
      icon: <Leaf size={20} className="text-adish-gold" />,
      title: 'Pure Fruiting Body',
      content: 'Our Cordyceps Potency Powder is derived exclusively from Cordyceps militaris fruiting bodies — the natural source of Cordycepin, a bioactive compound linked to cellular energy production.'
    },
    {
      id: 'cellular',
      icon: <Zap size={20} className="text-adish-gold" />,
      title: 'Cellular Energy',
      content: 'Cordyceps militaris supports ATP production at the mitochondrial level, enhancing oxygen utilisation and endurance.'
    },
    {
      id: 'adaptogen',
      icon: <Shield size={20} className="text-adish-gold" />,
      title: 'Adaptogenic Resilience',
      content: 'As a true adaptogen, Cordyceps militaris helps modulate stress response and support adrenal function, enabling efficient recovery from stress.'
    },
    {
      id: 'form',
      icon: <Droplet size={20} className="text-adish-gold" />,
      title: 'Flexible Form',
      content: 'Our fine powder form allows you to mix with your preferred beverage or incorporate into smoothies, providing flexibility in consumption.'
    },
    {
      id: 'tested',
      icon: <FlaskConical size={20} className="text-adish-gold" />,
      title: 'Lab Tested & Certified',
      content: 'Every batch is independently lab tested for purity and potency, produced in ISO, FDA & HACCP certified facilities.'
    }
  ];

  const items = product.id === 'performance-tincture' ? tinctureItems : powderItems;

  return (
    <div className="mt-16 pt-12 border-t-2 border-gray-200">
      <h2 className="text-4xl font-serif font-bold text-adish-dark mb-8">About this Product</h2>
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="border border-adish-beige rounded-lg hover:border-adish-gold transition-colors">
            <button
              onClick={() => toggleExpand(item.id)}
              className="w-full px-5 py-4 flex items-center justify-between hover:bg-adish-beige/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-lg font-bold text-adish-dark">{item.title}</span>
              </div>
              <ChevronDown
                size={20}
                className={`text-adish-gold transition-transform ${expanded[item.id] ? 'rotate-180' : ''}`}
              />
            </button>
            {expanded[item.id] && (
              <div className="px-5 py-4 border-t border-adish-beige/50 bg-white/50">
                <p className="text-adish-green text-sm leading-relaxed font-medium">
                  {item.content}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
