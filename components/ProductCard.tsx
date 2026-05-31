'use client';

import React, { useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import Button from './Button';
import StarRating from './StarRating';
import TrustBadge from './TrustBadge';

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount?: number;
  description: string;
  onAddToCart: () => void;
  onBuyNow?: () => void;
  variant?: 'grid' | 'featured'; // featured for homepage, grid for product listing
}

export default function ProductCard({
  id,
  name,
  image,
  price,
  originalPrice,
  rating,
  reviewCount,
  inStock,
  stockCount,
  description,
  onAddToCart,
  onBuyNow,
  variant = 'grid',
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await onAddToCart();
    setIsAdding(false);
  };

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  if (variant === 'featured') {
    // Featured product (homepage)
    return (
      <div className="bg-white border-2 border-adish-beige rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
        {/* Image */}
        <div className="relative h-64 sm:h-96 bg-gray-100 overflow-hidden group">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discount > 0 && (
            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-lg font-bold text-sm">
              Save {discount}%
            </div>
          )}
          {!inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-2xl font-bold text-adish-dark mb-2">{name}</h3>

          {/* Rating */}
          <div className="mb-3">
            <StarRating rating={rating} count={reviewCount} size="sm" />
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <TrustBadge type="lab-tested" size="sm" />
            <TrustBadge type="pure" size="sm" />
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-adish-green mb-4 line-clamp-2">{description}</p>

          {/* Price */}
          <div className="mb-4">
            <p className="text-2xl sm:text-3xl font-bold text-adish-gold">₹{price.toLocaleString()}</p>
            {originalPrice && (
              <p className="text-sm text-gray-500 line-through">₹{originalPrice.toLocaleString()}</p>
            )}
          </div>

          {/* Stock Status */}
          {inStock && stockCount && (
            <p className="text-xs sm:text-sm text-green-600 font-semibold mb-4">
              ✓ {stockCount} in stock
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleAddToCart}
              loading={isAdding}
              disabled={!inStock}
            >
              <ShoppingCart size={18} />
              Add to Cart
            </Button>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="p-3 rounded-lg border-2 border-adish-beige hover:bg-adish-beige transition"
            >
              <Heart size={20} fill={isWishlisted ? '#C8A854' : 'none'} color={isWishlisted ? '#C8A854' : '#999'} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid product card (listing view)
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gray-100 overflow-hidden group">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded font-bold text-xs">
            -{discount}%
          </div>
        )}
      </div>

      <div className="p-3 sm:p-4">
        <h3 className="text-sm sm:text-base font-bold text-adish-dark mb-1 line-clamp-1">{name}</h3>

        <div className="mb-2">
          <StarRating rating={rating} count={reviewCount} size="sm" />
        </div>

        <p className="text-xs text-adish-green mb-3 line-clamp-2">{description}</p>

        <div className="mb-3">
          <p className="text-lg sm:text-xl font-bold text-adish-gold">₹{price.toLocaleString()}</p>
        </div>

        <Button
          variant="primary"
          size="sm"
          fullWidth
          onClick={handleAddToCart}
          loading={isAdding}
          disabled={!inStock}
        >
          <ShoppingCart size={16} />
          Add
        </Button>
      </div>
    </div>
  );
}
