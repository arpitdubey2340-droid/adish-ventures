'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
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
              src="/images/logo-new.png"
              alt="Adish Ventures Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="text-xl font-serif font-bold text-gray-900 hidden sm:inline">
              Adish Ventures
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-adish-dark hover:text-adish-gold transition">
              Home
            </Link>
            <Link href="/products" className="text-adish-dark hover:text-adish-gold transition">
              Products
            </Link>
            <Link href="/about" className="text-adish-dark hover:text-adish-gold transition">
              About
            </Link>
            <Link href="/blog" className="text-adish-dark hover:text-adish-gold transition">
              Blog
            </Link>
            <Link href="/faq" className="text-adish-dark hover:text-adish-gold transition">
              FAQ
            </Link>
            <Link href="/contact" className="text-adish-dark hover:text-adish-gold transition">
              Contact
            </Link>
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
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-4 py-2 text-adish-dark hover:bg-adish-beige rounded">
              Home
            </Link>
            <Link href="/products" className="block px-4 py-2 text-adish-dark hover:bg-adish-beige rounded">
              Products
            </Link>
            <Link href="/about" className="block px-4 py-2 text-adish-dark hover:bg-adish-beige rounded">
              About
            </Link>
            <Link href="/blog" className="block px-4 py-2 text-adish-dark hover:bg-adish-beige rounded">
              Blog
            </Link>
            <Link href="/faq" className="block px-4 py-2 text-adish-dark hover:bg-adish-beige rounded">
              FAQ
            </Link>
            <Link href="/contact" className="block px-4 py-2 text-adish-dark hover:bg-adish-beige rounded">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
