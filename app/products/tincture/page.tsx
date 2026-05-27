'use client';

import { Star, Droplet, Clock, Zap } from 'lucide-react';

export default function TincturePage() {
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ id: 'performance-tincture', name: 'Cordyceps Endurance Tincture', price: 1000 });
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    alert('✅ Added to cart!');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #3a6b4a 0%, #2d5a45 100%)' }} className="py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-serif font-bold text-white mb-2">
            Cordyceps Endurance Tincture
          </h1>
          <p className="text-yellow-50 text-lg">Rapid-absorption dual-extract for peak performance</p>
        </div>
      </section>

      {/* Product Images - Vertical Stack */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            {/* Image 1: Front & Back */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
              <img
                src="/images/products/tincture-front-back.jpg"
                alt="Cordyceps Endurance Tincture - Front & Back"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Image 2: Multi-View */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
              <img
                src="/images/products/tincture-multiview.jpg"
                alt="Cordyceps Endurance Tincture - Multiple Views"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="py-12 px-4 bg-yellow-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Basic Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">(1,247 reviews)</span>
              </div>

              <div className="mb-6">
                <p className="text-gray-500 text-sm mb-2">Price</p>
                <p className="text-4xl font-bold text-gray-900">₹1,000</p>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-green-800 transition mb-3"
              >
                Add to Cart
              </button>
              <button className="w-full bg-yellow-600 text-white py-3 rounded-lg font-bold hover:bg-yellow-700 transition">
                Buy Now
              </button>
            </div>

            {/* Key Specs */}
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm font-semibold mb-1">ABSORPTION</p>
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-green-700" />
                  <span className="text-gray-900 font-semibold">2-5 Minutes</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">Rapid sublingual delivery</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm font-semibold mb-1">BIOAVAILABILITY</p>
                <div className="flex items-center gap-2">
                  <Zap size={20} className="text-yellow-600" />
                  <span className="text-gray-900 font-semibold">High</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">Bypasses digestion</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm font-semibold mb-1">SHELF LIFE</p>
                <div className="flex items-center gap-2">
                  <Droplet size={20} className="text-blue-600" />
                  <span className="text-gray-900 font-semibold">3-5 Years</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">Alcohol-preserved potency</p>
              </div>
            </div>

            {/* Dosing */}
            <div className="bg-white border-2 border-yellow-200 rounded-lg p-6">
              <p className="text-gray-500 text-sm font-semibold mb-3">SUGGESTED USE</p>
              <p className="text-gray-900 font-semibold mb-2">10-20 drops daily</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Place under tongue for 30-60 seconds before swallowing. Best taken on an empty stomach or as directed by a healthcare professional.
              </p>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="bg-white border-2 border-yellow-200 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">About This Product</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A "sublingual dual-extract for rapid, sustained performance enhancement" using both water and alcohol extraction methods.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This tincture harnesses the complete biochemical profile of Cordyceps Militaris through dual-extraction technology, capturing both water-soluble polysaccharides and fat-soluble active compounds for maximum potency and rapid absorption.
            </p>
          </div>

          {/* Key Compounds */}
          <div className="bg-white border-2 border-green-200 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Key Compounds</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Cordycepin (3'-deoxyadenosine)</h3>
                <p className="text-gray-600 text-sm">Drives ATP energy production at the mitochondrial level</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Beta-D-Glucans</h3>
                <p className="text-gray-600 text-sm">Immunomodulatory polysaccharides for immune optimization</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Adenosine</h3>
                <p className="text-gray-600 text-sm">Supports respiratory function and oxygen utilization</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Ergosterol</h3>
                <p className="text-gray-600 text-sm">Vitamin D2 precursor with powerful antioxidant properties</p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white border-2 border-blue-200 rounded-lg p-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Key Benefits</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-green-700 font-bold text-lg mt-1">✓</span>
                <div>
                  <p className="font-bold text-gray-900">Rapid Absorption</p>
                  <p className="text-gray-600 text-sm">2-5 minute sublingual delivery for immediate effect</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-700 font-bold text-lg mt-1">✓</span>
                <div>
                  <p className="font-bold text-gray-900">Stamina Support</p>
                  <p className="text-gray-600 text-sm">Enhanced endurance and athletic performance</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-700 font-bold text-lg mt-1">✓</span>
                <div>
                  <p className="font-bold text-gray-900">Cognitive Clarity</p>
                  <p className="text-gray-600 text-sm">Mental focus and reduced brain fog</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-700 font-bold text-lg mt-1">✓</span>
                <div>
                  <p className="font-bold text-gray-900">Performance Optimization</p>
                  <p className="text-gray-600 text-sm">Hormonal balance and post-exercise recovery</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Specifications Table */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Specifications</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody className="divide-y-2 divide-gray-200">
                <tr className="bg-gray-50">
                  <td className="px-6 py-3 font-bold text-gray-900">Product Name</td>
                  <td className="px-6 py-3 text-gray-700">Cordyceps Endurance Tincture</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 font-bold text-gray-900">Botanical Name</td>
                  <td className="px-6 py-3 text-gray-700">Cordyceps militaris</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-3 font-bold text-gray-900">Part Used</td>
                  <td className="px-6 py-3 text-gray-700">100% Fruiting Body</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 font-bold text-gray-900">Extraction Method</td>
                  <td className="px-6 py-3 text-gray-700">Dual 1:5 Extract (Water & Alcohol)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-3 font-bold text-gray-900">Extract Ratio</td>
                  <td className="px-6 py-3 text-gray-700">1:5</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 font-bold text-gray-900">Shelf Life</td>
                  <td className="px-6 py-3 text-gray-700">3-5 Years</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-3 font-bold text-gray-900">Storage</td>
                  <td className="px-6 py-3 text-gray-700">Store in a cool, dark place. Keep out of reach of children.</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 font-bold text-gray-900">Size</td>
                  <td className="px-6 py-3 text-gray-700">30 mL (1 FL OZ)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-3 font-bold text-gray-900">Certifications</td>
                  <td className="px-6 py-3 text-gray-700">Lab Tested • Third-party Tested • Quality Assured</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
