'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Leaf, Target, Activity, Star, Truck, RotateCcw } from 'lucide-react';
import Button from '@/components/Button';
import OffersBelt from '@/components/OffersBelt';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';
import { addToCart } from '@/lib/cart';

// Homepage "OUR FORMULAS" cards: lifestyle image override + homeBullets (lib/products.ts).
const homeCards = [
  { id: 'cordyceps-powder', image: '/images/products/powder-lifestyle.avif', icon: 'arrow' as const },
  { id: 'performance-tincture', image: '/images/products/tincture-lifestyle.avif', icon: 'star' as const },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-adish-cream py-20 sm:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Trust line — stars only, no fabricated review count */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} style={{ fill: '#C8A854', stroke: 'none' }} />
              ))}
            </span>
            <span className="text-sm font-semibold text-adish-dark">Trusted by early customers</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-adish-dark mb-4 tracking-tight">
            Cordyceps, done right.
          </h1>
          <p className="text-lg sm:text-xl text-adish-green mb-10">
            Sustained energy and endurance — without the crash.
          </p>

          {/* Benefit icons */}
          <div className="flex items-center justify-center gap-10 sm:gap-16 mb-10">
            {[
              { Icon: Zap, label: 'Energy' },
              { Icon: Activity, label: 'Endurance' },
              { Icon: Leaf, label: 'Natural' },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon size={28} className="text-adish-gold" />
                <span className="text-sm font-semibold text-adish-dark">{label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link href="/products" className="btn-primary inline-flex items-center gap-2 shadow-lg">
            Shop now <ArrowRight size={20} />
          </Link>

          {/* Trust lines */}
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-adish-green">
            <span className="flex items-center gap-1.5"><Truck size={16} /> Free shipping</span>
            <span className="flex items-center gap-1.5"><RotateCcw size={16} /> Easy returns</span>
          </div>
        </div>
      </section>

      {/* Floating Offers Belt - Outside Section */}
      <div className="mt-16">
        <OffersBelt />
      </div>

      {/* OUR FORMULAS — product section */}
      <section className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-bold tracking-[0.2em] text-adish-gold uppercase mb-8">
            Our Formulas
          </p>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {homeCards.map((card) => {
              const p = products.find((x) => x.id === card.id);
              if (!p) return null;
              return (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  image={p.image}
                  imageOverride={card.image}
                  price={p.price}
                  originalPrice={p.originalPrice}
                  rating={p.rating ?? 0}
                  reviewCount={p.reviewCount ?? 0}
                  inStock={true}
                  description={p.description}
                  bullets={p.homeBullets}
                  bulletIcon={card.icon}
                  ctaLabel="Shop now"
                  onAddToCart={() =>
                    addToCart({ id: p.id, name: p.name, price: p.price, image: p.image })
                  }
                />
              );
            })}
          </div>

          {/* FSSAI disclaimer */}
          <p className="text-[11px] leading-relaxed text-center text-gray-400 mt-8 max-w-3xl mx-auto">
            These statements have not been evaluated by FSSAI. This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
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
