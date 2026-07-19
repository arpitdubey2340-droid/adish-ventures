'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Star, ShoppingCart, Check, ChevronRight, Plus, Minus,
  Zap, Shield, Leaf, Droplet, FlaskConical, Heart,
} from 'lucide-react';
import type { Product } from '@/lib/products';
import { addToCart } from '@/lib/cart';
import ImageGallery from '@/components/ImageGallery';
import TrustBadge from '@/components/TrustBadge';
import ProductCard from '@/components/ProductCard';
import StarRating from '@/components/StarRating';
import CertificationsSection from '@/components/CertificationsSection';

const ICONS: Record<string, typeof Zap> = {
  zap: Zap, shield: Shield, leaf: Leaf, droplet: Droplet, flask: FlaskConical, heart: Heart,
};

export default function ProductDetail({ product, related }: { product: Product; related: Product | null }) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const cartLine = { id: product.id, name: product.name, price: product.price, image: product.image };

  const handleAddToCart = () => {
    addToCart(cartLine, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = () => {
    addToCart(cartLine, qty);
    router.push('/checkout');
  };

  // Build accordion sections from whatever data the product has.
  const sections: { title: string; render: () => React.ReactNode }[] = [];
  if (product.fullDescription)
    sections.push({
      title: 'Product Description',
      render: () => <p className="text-adish-green leading-relaxed whitespace-pre-line">{product.fullDescription}</p>,
    });
  if (product.benefits?.length)
    sections.push({
      title: 'Key Benefits',
      render: () => (
        <ul className="space-y-2">
          {product.benefits.map((b, i) => (
            <li key={i} className="flex gap-3 text-adish-green"><Check size={18} className="text-adish-gold shrink-0 mt-0.5" /><span>{b}</span></li>
          ))}
        </ul>
      ),
    });
  if (product.ingredients?.length)
    sections.push({
      title: 'Key Ingredients',
      render: () => (
        <ul className="space-y-2">
          {product.ingredients!.map((b, i) => (
            <li key={i} className="flex gap-3 text-adish-green"><Leaf size={18} className="text-adish-gold shrink-0 mt-0.5" /><span>{b}</span></li>
          ))}
        </ul>
      ),
    });
  if (product.suitedFor)
    sections.push({ title: 'Suited For', render: () => <p className="text-adish-green leading-relaxed">{product.suitedFor}</p> });
  if (product.howToUse?.length)
    sections.push({
      title: 'How to Use',
      render: () => (
        <ol className="space-y-3">
          {product.howToUse!.map((step, i) => (
            <li key={i} className="flex gap-3 text-adish-green">
              <span className="shrink-0 w-6 h-6 rounded-full bg-adish-gold text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
              <span className="mt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      ),
    });
  if (product.faqs?.length)
    sections.push({
      title: 'FAQs',
      render: () => (
        <div className="space-y-4">
          {product.faqs!.map((f, i) => (
            <div key={i}>
              <p className="font-bold text-adish-dark mb-1">{f.question}</p>
              <p className="text-adish-green leading-relaxed">{f.answer}</p>
            </div>
          ))}
        </div>
      ),
    });

  const [openSection, setOpenSection] = useState(0);

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb */}
        <nav className="text-sm text-adish-green mb-6 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-adish-gold">Home</Link>
          <span className="text-gray-400">/</span>
          <Link href="/products" className="hover:text-adish-gold">Shop</Link>
          <span className="text-gray-400">/</span>
          <span className="text-adish-dark font-semibold">{product.name}</span>
        </nav>

        {/* Two-column: sticky gallery + details */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* LEFT — sticky gallery */}
          <div className="lg:sticky lg:top-24 self-start w-full min-w-0">
            <ImageGallery images={product.gallery ?? [product.image]} productName={product.name} />
          </div>

          {/* RIGHT — details */}
          <div className="w-full min-w-0">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-adish-dark mb-3">{product.name}</h1>

            {/* Rating -> reviews (shared StarRating; count hidden when 0) */}
            {product.rating != null && (
              <a href="#reviews" className="inline-flex items-center mb-4 no-underline hover:opacity-80">
                <StarRating rating={product.rating} count={product.reviewCount} size="md" />
              </a>
            )}

            {/* Badges */}
            <div className="flex items-center gap-2 mb-4">
              {product.bestSeller && (
                <span className="bg-adish-dark text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">★ Best Seller</span>
              )}
              {product.claim && (
                <span className="bg-adish-beige text-adish-green px-3 py-1 rounded-full text-xs font-semibold">{product.claim}</span>
              )}
            </div>

            {/* Price block */}
            <div className="flex items-center gap-3 mb-6">
              {discount > 0 && (
                <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">SAVE {discount}%</span>
              )}
              <span className="text-4xl font-bold text-adish-gold">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-gray-500 text-lg line-through">MRP ₹{product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-adish-green leading-relaxed mb-6">{product.description}</p>

            {/* Quantity + actions */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="flex items-center border-2 border-gray-300 rounded-lg">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 text-adish-green hover:bg-gray-100" aria-label="Decrease quantity"><Minus size={16} /></button>
                <span className="w-10 text-center font-bold text-adish-dark">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2 text-adish-green hover:bg-gray-100" aria-label="Increase quantity"><Plus size={16} /></button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-white shadow-md transition-all ${added ? 'bg-green-600' : 'bg-green-700 hover:bg-green-800'}`}
              >
                {added ? <><Check size={18} /> Added</> : <><ShoppingCart size={18} /> Add to Cart</>}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold bg-adish-gold text-adish-dark hover:bg-yellow-500 shadow-md transition-all"
              >
                Buy Now <ChevronRight size={18} />
              </button>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap gap-2 pt-6 border-t-2 border-gray-100">
              {product.freeShipping && <TrustBadge type="shipping" size="sm" />}
              <TrustBadge type="lab-tested" size="sm" />
              <TrustBadge type="pure" size="sm" />
              <TrustBadge type="guarantee" size="sm" />
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div className="mt-16 max-w-4xl">
          <div className="space-y-3">
            {sections.map((s, i) => {
              const open = openSection === i;
              return (
                <div key={s.title} className="border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenSection(open ? -1 : i)}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-bold text-adish-dark text-left">{s.title}</span>
                    <Plus size={20} className={`text-adish-dark transition-transform shrink-0 ${open ? 'rotate-45' : ''}`} />
                  </button>
                  {open && <div className="px-5 py-4 border-t border-gray-200 bg-gray-50">{s.render()}</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Why you need this */}
        {product.highlights?.length ? (
          <div className="mt-16">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-adish-dark mb-8 text-center">Why you need this</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {product.highlights.map((h, i) => {
                const Icon = ICONS[h.icon] ?? Zap;
                return (
                  <div key={i} className="flex flex-col items-center text-center p-6 rounded-lg bg-adish-beige border border-gray-200">
                    <Icon size={32} className="text-adish-gold mb-3" />
                    <span className="font-semibold text-adish-dark text-sm">{h.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* Reviews shell (no fake data) */}
        <div id="reviews" className="mt-16 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-adish-dark mb-8">Customer Reviews</h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Rating breakdown (structure only) */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-sm text-adish-green w-12 shrink-0">{star} star</span>
                  <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-adish-gold" style={{ width: '0%' }} />
                  </div>
                  <span className="text-sm text-gray-500 w-8 text-right">0</span>
                </div>
              ))}
            </div>
            {/* Empty state */}
            <div className="flex flex-col items-center justify-center text-center p-8 rounded-lg border-2 border-dashed border-gray-200">
              <Star size={32} className="text-gray-300 mb-3" />
              <p className="font-semibold text-adish-dark mb-1">No reviews yet</p>
              <p className="text-sm text-adish-green">Be the first to share your experience with this product.</p>
            </div>
          </div>
        </div>

        {/* You might also like */}
        {related && (
          <div className="mt-16">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-adish-dark mb-8">You might also like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl">
              <ProductCard
                id={related.id}
                name={related.name}
                image={related.image}
                price={related.price}
                originalPrice={related.originalPrice}
                rating={related.rating ?? 0}
                reviewCount={related.reviewCount ?? 0}
                inStock={true}
                stockCount={related.stockCount}
                description={related.description}
                claim={related.claim}
                bestSeller={related.bestSeller}
                freeShipping={related.freeShipping}
                href={`/products/${related.id}`}
                onAddToCart={() =>
                  addToCart({ id: related.id, name: related.name, price: related.price, image: related.image })
                }
              />
            </div>
          </div>
        )}
      </div>

      {/* Certifications — full width */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-16">
        <CertificationsSection />
      </div>
    </div>
  );
}
