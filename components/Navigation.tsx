'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, ChevronDown } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length);
    };
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-adish-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition">
            <img
              src="/images/branding/logo.png"
              alt="Adish Ventures Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="text-lg sm:text-xl font-serif font-bold text-gray-900">
              Ethnobotanical
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-adish-dark hover:text-adish-gold transition">
              Home
            </Link>
            <Link href="/products" className="text-adish-dark hover:text-adish-gold transition">
              Shop
            </Link>

            {/* About Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setIsAboutOpen(true)}
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              <button className="text-adish-dark hover:text-adish-gold transition flex items-center gap-1">
                About <ChevronDown size={16} />
              </button>

              {isAboutOpen && (
                <div className="absolute left-0 mt-0 w-48 bg-white border-2 border-adish-beige rounded-lg shadow-lg py-2 z-50">
                  <Link href="/about" className="block px-4 py-2 text-adish-dark hover:bg-adish-beige transition">
                    About
                  </Link>
                  <Link href="/blog" className="block px-4 py-2 text-adish-dark hover:bg-adish-beige transition">
                    Blog
                  </Link>
                  <Link href="/faq" className="block px-4 py-2 text-adish-dark hover:bg-adish-beige transition">
                    FAQ
                  </Link>
                  <Link href="/contact" className="block px-4 py-2 text-adish-dark hover:bg-adish-beige transition">
                    Contact
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-900 hover:text-yellow-600 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-adish-dark"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40" onClick={() => setIsOpen(false)} />

            {/* Mobile Menu */}
            <div className="md:hidden fixed top-16 left-0 right-0 bg-white border-b-2 border-adish-beige pb-4 space-y-2 z-50 max-h-[calc(100vh-64px)] overflow-y-auto">
              <Link href="/" className="block px-4 py-2 text-adish-dark hover:bg-adish-beige rounded" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link href="/products" className="block px-4 py-2 text-adish-dark hover:bg-adish-beige rounded" onClick={() => setIsOpen(false)}>
                Shop
              </Link>
              <div className="px-4 py-2">
                <p className="font-bold text-adish-dark mb-2">About</p>
                <div className="ml-4 space-y-1">
                  <Link href="/about" className="block px-4 py-2 text-adish-dark hover:bg-adish-beige rounded text-sm" onClick={() => setIsOpen(false)}>
                    About
                  </Link>
                  <Link href="/blog" className="block px-4 py-2 text-adish-dark hover:bg-adish-beige rounded text-sm" onClick={() => setIsOpen(false)}>
                    Blog
                  </Link>
                  <Link href="/faq" className="block px-4 py-2 text-adish-dark hover:bg-adish-beige rounded text-sm" onClick={() => setIsOpen(false)}>
                    FAQ
                  </Link>
                  <Link href="/contact" className="block px-4 py-2 text-adish-dark hover:bg-adish-beige rounded text-sm" onClick={() => setIsOpen(false)}>
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
