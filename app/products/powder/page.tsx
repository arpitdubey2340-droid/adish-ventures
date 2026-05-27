'use client';

import { Star, Zap, Clock, Leaf } from 'lucide-react';

export default function PowderPage() {
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ id: 'cordyceps-powder', name: 'Cordyceps Potency Powder', price: 1000 });
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
            Cordyceps Potency Powder
          </h1>
          <p className="text-yellow-50 text-lg">Complete biochemical intelligence in traditional form</p>
        </div>
      </section>

      {/* Product Images - Vertical Stack */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            {/* Image 1: Product Shot */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
              <img
                src="/images/products/powder-product.jpg"
                alt="Cordyceps Potency Powder"
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
                <span className="text-gray-600 text-sm">(892 reviews)</span>
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
                  <span className="text-gray-900 font-semibold">20-45 Minutes</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">Gradual sustained release</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm font-semibold mb-1">BIOAVAILABILITY</p>
                <div className="flex items-center gap-2">
                  <Leaf size={20} className="text-green-700" />
                  <span className="text-gray-900 font-semibold">Moderate</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">Balanced absorption profile</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm font-semibold mb-1">SHELF LIFE</p>
                <div className="flex items-center gap-2">
                  <Zap size={20} className="text-yellow-600" />
                  <span className="text-gray-900 font-semibold">6-12 Months</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">Long-term storage friendly</p>
              </div>
            </div>

            {/* Dosing */}
            <div className="bg-white border-2 border-yellow-200 rounded-lg p-6">
              <p className="text-gray-500 text-sm font-semibold mb-3">SUGGESTED USE</p>
              <p className="text-gray-900 font-semibold mb-2">1-2 teaspoons daily</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Mix into your preferred beverage - water, coffee, smoothies, or tea. Best taken with meals for optimal absorption. As directed by a healthcare professional.
              </p>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="bg-white border-2 border-yellow-200 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">About This Product</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A powder formulation delivering "the complete biochemical intelligence of Cordyceps Militaris" in traditional consumption form.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This versatile powder integrates seamlessly into daily routines - mix into beverages, blend into food, or consume directly. Perfect for those seeking sustained energy, cognitive support, and long-term storage stability.
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
                <h3 className="font-bold text-gray-900 mb-2">Mannitol & Cordycepic Acid</h3>
                <p className="text-gray-600 text-sm">Supports metabolic function and energy pathways</p>
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
                  <p className="font-bold text-gray-900">Enhanced Stamina</p>
                  <p className="text-gray-600 text-sm">Sustained energy for daily activities and athletic pursuits</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-700 font-bold text-lg mt-1">✓</span>
                <div>
                  <p className="font-bold text-gray-900">Cognitive Clarity</p>
                  <p className="text-gray-600 text-sm">Mental focus and reduced oxidative stress in the brain</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-700 font-bold text-lg mt-1">✓</span>
                <div>
                  <p className="font-bold text-gray-900">Immune Optimization</p>
                  <p className="text-gray-600 text-sm">Bidirectional immune regulation and systemic vitality</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-700 font-bold text-lg mt-1">✓</span>
                <div>
                  <p className="font-bold text-gray-900">Respiratory Support</p>
                  <p className="text-gray-600 text-sm">Enhanced oxygen utilization and respiratory function</p>
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
                  <td className="px-6 py-3 text-gray-700">Cordyceps Potency Powder</td>
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
                  <td className="px-6 py-3 font-bold text-gray-900">Form</td>
                  <td className="px-6 py-3 text-gray-700">Fine Powder</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-3 font-bold text-gray-900">Absorption Time</td>
                  <td className="px-6 py-3 text-gray-700">20-45 Minutes</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 font-bold text-gray-900">Shelf Life</td>
                  <td className="px-6 py-3 text-gray-700">6-12 Months</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-3 font-bold text-gray-900">Storage</td>
                  <td className="px-6 py-3 text-gray-700">Store in a cool, dry place. Keep out of reach of children.</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 font-bold text-gray-900">Size</td>
                  <td className="px-6 py-3 text-gray-700">50g</td>
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
