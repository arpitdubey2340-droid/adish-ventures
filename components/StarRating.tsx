'use client';

import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number; // 0-5
  count?: number; // number of reviews
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export default function StarRating({ rating, count, size = 'md', onClick }: StarRatingProps) {
  const iconSize = {
    sm: 12,
    md: 16,
    lg: 20,
  };

  const textSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div
      className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition"
      onClick={onClick}
    >
      {/* Stars */}
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={iconSize[size]}
            className={star <= rating ? 'fill-adish-gold text-adish-gold' : 'text-gray-300'}
          />
        ))}
      </div>

      {/* Rating and Count */}
      <span className={`${textSize[size]} font-semibold text-adish-dark`}>
        {rating.toFixed(1)}
      </span>

      {count ? (
        <span className={`${textSize[size]} text-gray-600`}>
          ({count.toLocaleString()} reviews)
        </span>
      ) : null}
    </div>
  );
}
