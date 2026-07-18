'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Leaf, Target } from 'lucide-react';
import Button from '@/components/Button';
import OffersBelt from '@/components/OffersBelt';
import { addToCart } from '@/lib/cart';

export default function Home() {
  const handleAddToCart = (productId: string, productName: string, price: number, image: string) => {
    // Shared helper handles storage + cart badge + mini-cart drawer.
    addToCart({ id: productId, name: productName, price, image });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full Width Video Background */}
      <section className="relative h-screen overflow-hidden flex items-center">
        {/* Full Width Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Text Content - Overlaid */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-8 pt-16">
          <div className="max-w-2xl">
            <div className="mb-6">
              <span className="inline-block bg-white text-adish-dark px-6 py-3 rounded-full text-sm font-bold shadow-xl">
                REDEFINING BOTANICAL VITALITY
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight" style={{
              color: '#FFFFFF',
              textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 4px 16px rgba(0,0,0,0.6)',
              letterSpacing: '-0.02em'
            }}>
              Discover the Power of Nature's Most Potent Adaptogen
            </h1>
            <p className="text-lg md:text-xl text-yellow-50 mb-8 leading-relaxed max-w-xl" style={{
              textShadow: '0 1px 4px rgba(0,0,0,0.8)'
            }}>
              Explore the profound benefits of Cordyceps Militaris—engineered for performance, vitality, and wellness. 2,000 years of Himalayan wisdom meets modern science.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" className="btn-primary flex items-center justify-center gap-2 shadow-lg w-fit">
                Shop Now <ArrowRight size={20} />
              </Link>
              <Link href="#benefits" className="btn-secondary flex items-center justify-center gap-2 w-fit">
                Learn More
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Floating Offers Belt - Outside Section */}
      <div className="mt-16">
        <OffersBelt />
      </div>

      {/* Product Showcase with Real Images */}
      <section className="py-20 px-4 bg-yellow-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Two Formats. One Philosophy.
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Choose your optimal delivery system for sustained botanical vitality
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Powder */}
            <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all">
              <Link href="/products" className="h-64 bg-gray-100 overflow-hidden block cursor-pointer">
                <img
                  src="/images/products/powder.avif"
                  alt="Cordyceps Potency Powder"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <div className="p-8">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                  Cordyceps Potency Powder
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <span className="text-yellow-600 text-lg font-bold">→</span>
                    <div>
                      <p className="font-bold text-gray-800">20-45 mins Absorption</p>
                      <p className="text-sm text-gray-600">Gradual sustained release</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-yellow-600 text-lg font-bold">→</span>
                    <div>
                      <p className="font-bold text-gray-800">6-12 Months Shelf Life</p>
                      <p className="text-sm text-gray-600">Long-term storage friendly</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-yellow-600 text-lg font-bold">→</span>
                    <div>
                      <p className="font-bold text-gray-800">Moderate Bioavailability</p>
                      <p className="text-sm text-gray-600">Balanced absorption profile</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-6 border-t gap-4">
                  <span className="text-3xl font-bold text-gray-900">₹1,000</span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAddToCart('cordyceps-powder', 'Cordyceps Potency Powder', 1000, '/images/products/powder.avif')}
                      className="bg-green-700 text-white px-4 py-3 rounded-lg font-bold hover:bg-green-800 transition text-sm"
                    >
                      Add to Cart
                    </button>
                    <Link href="/products" className="bg-yellow-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-yellow-700 transition text-sm">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Tincture */}
            <div style={{ background: 'linear-gradient(135deg, #e8dcc8 0%, #f5f1e8 100%)' }} className="border-2 border-yellow-600 rounded-lg overflow-hidden hover:shadow-lg transition-all">
              <Link href="/products" className="h-64 bg-gray-100 overflow-hidden block cursor-pointer">
                <img
                  src="/images/products/tincture-real.avif"
                  alt="Cordyceps Endurance Tincture"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <div className="p-8">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                  Cordyceps Endurance Tincture
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <span className="text-yellow-600 text-lg font-bold">★</span>
                    <div>
                      <p className="font-bold text-gray-800">2-5 mins Absorption</p>
                      <p className="text-sm text-gray-600">Rapid sublingual delivery</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-yellow-600 text-lg font-bold">★</span>
                    <div>
                      <p className="font-bold text-gray-800">3-5 Years Shelf Life</p>
                      <p className="text-sm text-gray-600">Alcohol-preserved potency</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-yellow-600 text-lg font-bold">★</span>
                    <div>
                      <p className="font-bold text-gray-800">High Bioavailability</p>
                      <p className="text-sm text-gray-600">Full-spectrum dual-extract</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-yellow-600 border-opacity-30 gap-4">
                  <span className="text-3xl font-bold text-gray-900">₹1,000</span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAddToCart('performance-tincture', 'Cordyceps Endurance Tincture', 1000, '/images/products/tincture-real.avif')}
                      className="bg-green-700 text-white px-4 py-3 rounded-lg font-bold hover:bg-green-800 transition text-sm"
                    >
                      Add to Cart
                    </button>
                    <Link href="/products" className="bg-yellow-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-yellow-700 transition text-sm">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" style={{ background: 'linear-gradient(135deg, #e8dcc8 0%, #f5f1e8 100%)' }} className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-gray-900 text-center mb-16">
            The Intelligence of Nature
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border-l-4 border-yellow-600 shadow-md">
              <Zap className="w-12 h-12 text-yellow-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Sustained Energy</h3>
              <p className="text-gray-700">
                ATP synthesis at the mitochondrial level. Energy without the caffeine crash—perfect for performance athletes and busy professionals.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border-l-4 border-green-700 shadow-md">
              <Leaf className="w-12 h-12 text-green-700 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Cognitive Clarity</h3>
              <p className="text-gray-700">
                Reduces cerebral oxidative stress and eliminates brain fog. Sustains cognitive endurance for deep work and learning.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border-l-4 border-blue-600 shadow-md">
              <Target className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Systemic Vitality</h3>
              <p className="text-gray-700">
                Bidirectional immune regulation, metabolic balance, and respiratory optimization. Holistic biological vitality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Cordyceps Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-12 text-center">
            Why Cordyceps Militaris?
          </h2>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">2,000 Years of Himalayan Wisdom</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Cordyceps Militaris has been used in traditional Himalayan and Eastern medicine for two millennia. Himalayan herders discovered that this rare fungus delivered something extraordinary—sustained energy, clarity, and vitality without the crashes associated with synthetic stimulants.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Today, modern science validates what traditional practitioners knew: Cordyceps is one of nature's most potent adaptogens, working at the mitochondrial level to optimize biological function.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Bioactive Compounds</h3>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="text-yellow-600 font-bold text-xl">•</span>
                  <div>
                    <p className="font-bold text-gray-900">Cordycepin</p>
                    <p className="text-gray-700">Drives ATP energy production at the mitochondrial level</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-yellow-600 font-bold text-xl">•</span>
                  <div>
                    <p className="font-bold text-gray-900">Beta-D-Glucans</p>
                    <p className="text-gray-700">Immunomodulatory polysaccharides for immune optimization</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-yellow-600 font-bold text-xl">•</span>
                  <div>
                    <p className="font-bold text-gray-900">Adenosine</p>
                    <p className="text-gray-700">Supports respiratory function and oxygen utilization</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-yellow-600 font-bold text-xl">•</span>
                  <div>
                    <p className="font-bold text-gray-900">Ergosterol</p>
                    <p className="text-gray-700">Vitamin D2 precursor with powerful antioxidant properties</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Not Just Another Supplement</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              In a market saturated with wellness trends and superficial health claims, Adish Ventures stands apart. We're not promising quick fixes or miracle cures. We're offering a rigorously engineered performance tool backed by 2,000 years of traditional knowledge and modern scientific validation.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mt-4">
              Every product is optimized for measurable biological outcomes—whether that's sustained energy for athletes, cognitive endurance for knowledge workers, or systemic vitality for anyone seeking optimal health.
            </p>
          </div>
        </div>
      </section>

      {/* Wheel of Vitality - Multi-System Optimization */}
      <section className="py-0 px-0 bg-white">
        <img
          src="/images/sections/wheel-vitality.png"
          alt="Multi-System Vitality Optimization Wheel"
          className="w-full h-auto object-cover"
        />
      </section>

      {/* CTA SECTION - Ready to Elevate Your Performance */}
      <section className="py-12 sm:py-16 px-4 bg-gradient-to-r from-adish-gold to-yellow-500 w-full overflow-x-hidden">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-adish-dark mb-6">
            Ready to Elevate Your Performance?
          </h2>
          <p className="text-adish-dark text-lg mb-8">
            Join thousands of athletes experiencing enhanced energy and endurance. 30-day money-back guarantee.
          </p>
          <Link href="/products" className="inline-block">
            <Button variant="primary" size="lg" className="bg-adish-dark text-white hover:bg-adish-green">
              <ArrowRight size={20} />
              Shop Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
