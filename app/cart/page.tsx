'use client';

import Link from 'next/link';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useState, useEffect } from 'react';
import Button from '@/components/Button';
import ProductCard from '@/components/ProductCard';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function CartImproved() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showMiniCart, setShowMiniCart] = useState(false);

  useEffect(() => {
    const loadCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const grouped: { [key: string]: CartItem } = {};
      cart.forEach((item: Omit<CartItem, 'quantity'>) => {
        if (grouped[item.id]) {
          grouped[item.id].quantity += 1;
        } else {
          grouped[item.id] = { ...item, quantity: 1 };
        }
      });
      setCartItems(Object.values(grouped));
      setIsLoading(false);
    };
    loadCart();
  }, []);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }
    const updatedItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    // Update localStorage
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    let quantityChange = newQuantity - (cartItems.find(item => item.id === itemId)?.quantity || 0);
    if (quantityChange > 0) {
      const itemToAdd = currentCart.find((item: any) => item.id === itemId);
      for (let i = 0; i < quantityChange; i++) {
        currentCart.push(itemToAdd);
      }
    } else {
      quantityChange = Math.abs(quantityChange);
      for (let i = 0; i < quantityChange; i++) {
        const index = currentCart.findIndex((item: any) => item.id === itemId);
        if (index > -1) {
          currentCart.splice(index, 1);
        }
      }
    }
    localStorage.setItem('cart', JSON.stringify(currentCart));
  };

  const removeItem = (itemId: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    // Update localStorage
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const newCart = currentCart.filter((item: any) => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCartItems([]);
      localStorage.removeItem('cart');
    }
  };

  const applyPromoCode = () => {
    if (promoCode === 'SAVE10') {
      setDiscount(subtotal * 0.1);
    } else if (promoCode === 'SAVE20') {
      setDiscount(subtotal * 0.2);
    } else {
      alert('Invalid promo code');
      setDiscount(0);
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = (subtotal - discount) * 0.18;
  const total = subtotal + tax - discount;

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-gradient-to-r from-adish-green to-adish-dark py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
              Shopping Cart
            </h1>
            <p className="text-xl text-adish-beige">Your cart is currently empty</p>
          </div>
        </section>

        {/* Empty Cart Content */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
              Discover our premium Cordyceps Militaris supplements and start your wellness
              journey. Both power-packed formats backed by science.
            </p>
            <Link href="/products">
              <Button variant="primary" size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const recommendedProducts = [
    {
      id: 'cordyceps-powder',
      name: 'Cordyceps Potency Powder',
      image: '/images/products/powder.avif',
      price: 1000,
      rating: 4.9,
      reviewCount: 147,
      inStock: true,
      description: 'Premium powder for daily rituals',
    },
    {
      id: 'cordyceps-tincture',
      name: 'Cordyceps Endurance Tincture',
      image: '/images/products/tincture-real.avif',
      price: 1500,
      rating: 4.8,
      reviewCount: 100,
      inStock: true,
      description: 'Rapid absorption liquid extract',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-adish-green to-adish-dark py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
            Shopping Cart
          </h1>
          <p className="text-xl text-adish-beige">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items (2/3 width) */}
            <div className="lg:col-span-2">
              <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b-2 border-gray-200 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">
                    Items in Cart ({totalItems})
                  </h3>
                  <button
                    onClick={clearCart}
                    className="text-sm font-bold text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded transition"
                  >
                    🗑️ Clear Cart
                  </button>
                </div>

                <div className="space-y-0 divide-y-2 divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 hover:bg-gray-50 transition">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">{item.name}</h4>
                          <p className="text-lg text-adish-gold font-bold">
                            ₹{item.price.toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 transition p-2"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <span className="text-gray-700 font-medium">Quantity:</span>
                        <div className="flex items-center border-2 border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 text-gray-600 hover:text-gray-900 transition"
                          >
                            <Minus size={18} />
                          </button>
                          <span className="px-6 py-2 font-bold text-lg text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-gray-600 hover:text-gray-900 transition"
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                        <span className="ml-auto text-2xl font-bold text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/products" className="inline-block mt-6 text-adish-gold hover:text-adish-dark font-bold transition">
                ← Continue Shopping
              </Link>

              {/* Recommended Products */}
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-adish-dark mb-6">
                  You might also like
                </h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {recommendedProducts
                    .filter((p) => !cartItems.find((c) => c.id === p.id))
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        {...product}
                        onAddToCart={() => {
                          const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                          cart.push({ id: product.id, name: product.name, price: product.price });
                          localStorage.setItem('cart', JSON.stringify(cart));
                          window.dispatchEvent(new Event('storage'));
                        }}
                      />
                    ))}
                </div>
              </div>
            </div>

            {/* Order Summary (1/3 width) */}
            <div className="lg:col-span-1">
              <div className="bg-adish-beige border-2 border-adish-gold rounded-lg p-6 sticky top-20 max-h-screen overflow-y-auto">
                <h3 className="text-2xl font-bold text-adish-dark mb-6">Order Summary</h3>

                {/* Promo Code */}
                <div className="mb-6 pb-6 border-b-2 border-adish-gold/30">
                  <label className="block text-sm font-semibold text-adish-dark mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-adish-gold focus:outline-none"
                    />
                    <Button variant="secondary" size="sm" onClick={applyPromoCode}>
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Try: SAVE10 or SAVE20</p>
                </div>

                {/* Totals */}
                <div className="space-y-4 mb-6 pb-6 border-b-2 border-adish-gold/30">
                  <div className="flex justify-between">
                    <span className="text-adish-green">Subtotal:</span>
                    <span className="font-bold text-adish-dark">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span className="font-bold">-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-adish-green">Shipping:</span>
                    <span className="font-bold text-adish-dark">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-adish-green">Tax (18%):</span>
                    <span className="font-bold text-adish-dark">
                      ₹{Math.round(tax).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between mb-6">
                  <span className="text-xl font-bold text-adish-dark">Total:</span>
                  <span className="text-3xl font-bold text-adish-gold">
                    ₹{Math.round(total).toLocaleString()}
                  </span>
                </div>

                {/* CTA Buttons */}
                <Link href="/checkout" className="block mb-4">
                  <Button variant="primary" size="lg" fullWidth>
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link href="/products" className="block">
                  <Button variant="secondary" size="lg" fullWidth>
                    Continue Shopping
                  </Button>
                </Link>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t-2 border-adish-gold/30 space-y-2 text-sm text-adish-green">
                  <div className="flex items-center gap-2">
                    <span>🔒</span> Secure checkout
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✓</span> 30-day money back
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✓</span> Free shipping
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✓</span> Lab tested
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
