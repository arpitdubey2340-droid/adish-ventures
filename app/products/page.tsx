'use client';

import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { addToCart } from '@/lib/cart';

export default function ProductsListing() {
  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* Header */}
      <section className="bg-gray-100 py-16 w-full" style={{ borderBottom: '2px solid rgba(201, 168, 76, 0.5)' }}>
        <div className="max-w-7xl mx-auto px-4 w-full">
          <h1 className="text-5xl sm:text-6xl font-serif font-bold text-adish-dark mb-4">Our Products</h1>
          <p className="text-xl sm:text-2xl text-adish-dark max-w-3xl font-serif font-light leading-relaxed">
            Premium Cordyceps Militaris supplements engineered for performance, vitality, and wellness
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 px-4 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.image}
                price={product.price}
                originalPrice={product.originalPrice}
                rating={product.rating ?? 0}
                reviewCount={product.reviewCount ?? 0}
                inStock={true}
                stockCount={product.stockCount}
                description={product.description}
                claim={product.claim}
                bestSeller={product.bestSeller}
                freeShipping={product.freeShipping}
                href={`/products/${product.id}`}
                onAddToCart={() =>
                  addToCart({ id: product.id, name: product.name, price: product.price, image: product.image })
                }
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
