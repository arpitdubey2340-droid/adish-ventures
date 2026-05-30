'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));
  const thumbnailScroll = useRef<HTMLDivElement>(null);

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
    if (!loadedImages.has(index)) {
      setLoadedImages(prev => new Set([...prev, index]));
    }
  };

  const handlePrev = () => {
    const newIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    handleThumbnailClick(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    handleThumbnailClick(newIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeIndex, images.length]);

  // Auto-scroll thumbnail carousel
  useEffect(() => {
    if (thumbnailScroll.current) {
      const activeThumb = thumbnailScroll.current.querySelector('[data-active="true"]');
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeIndex]);

  return (
    <div className="flex flex-col gap-4 w-full overflow-x-hidden">
      {/* Main Image */}
      <div className="relative w-full max-w-full bg-gray-100 rounded-lg overflow-hidden shadow-lg aspect-square flex items-center justify-center group">
        <img
          key={activeIndex}
          src={images[activeIndex]}
          alt={`${productName} - Image ${activeIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
          loading="eager"
        />

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
          {activeIndex + 1} / {images.length}
        </div>

        {/* Navigation Arrows (Desktop) */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10 hidden md:flex"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10 hidden md:flex"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Thumbnail Carousel */}
      {images.length > 1 && (
        <div className="relative w-full max-w-full overflow-hidden">
          <div
            ref={thumbnailScroll}
            className="flex gap-2 overflow-x-auto pb-2 scroll-smooth w-full max-w-full"
            style={{ scrollBehavior: 'smooth', scrollbarGutter: 'stable', WebkitOverflowScrolling: 'touch' }}
          >
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                data-active={index === activeIndex}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === activeIndex
                    ? 'border-adish-gold shadow-lg scale-105'
                    : 'border-gray-300 hover:border-adish-gold opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>

          {/* Mobile Navigation Buttons (Thumbnail Carousel) */}
          <div className="md:hidden absolute inset-y-0 left-0 flex items-center pl-1">
            <button
              onClick={handlePrev}
              className="bg-adish-green text-white p-1 rounded-full flex-shrink-0"
              aria-label="Previous"
            >
              <ChevronLeft size={14} />
            </button>
          </div>
          <div className="md:hidden absolute inset-y-0 right-0 flex items-center pr-1">
            <button
              onClick={handleNext}
              className="bg-adish-green text-white p-1 rounded-full flex-shrink-0"
              aria-label="Next"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Image Info Text */}
      <p className="text-xs text-gray-500 text-center">
        Click thumbnails or use arrow keys to navigate
      </p>
    </div>
  );
}
