'use client';

import Link from 'next/link';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');

      // Group items and count quantities
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

    setCartItems(cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));

    // Update localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [];
    const itemToAdd = cartItems.find(item => item.id === itemId);

    if (itemToAdd) {
      for (let i = 0; i < newQuantity; i++) {
        updatedCart.push({
          id: itemToAdd.id,
          name: itemToAdd.name,
          price: itemToAdd.price,
        });
      }
    }

    // Keep other items
    cartItems.forEach(item => {
      if (item.id !== itemId) {
        for (let i = 0; i < item.quantity; i++) {
          updatedCart.push({
            id: item.id,
            name: item.name,
            price: item.price,
          });
        }
      }
    });

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));
  };

  const removeItem = (itemId: string) => {
    const newItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(newItems);

    // Update localStorage
    const updatedCart: Array<{ id: string; name: string; price: number }> = [];
    newItems.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        updatedCart.push({
          id: item.id,
          name: item.name,
          price: item.price,
        });
      }
    });

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section style={{ background: 'linear-gradient(135deg, #3a6b4a 0%, #2d5a45 100%)' }} className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-serif font-bold text-white mb-4">
            Shopping Cart
          </h1>
          <p className="text-xl text-yellow-50 max-w-2xl">
            Review your items and proceed to checkout
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
                Discover our premium cordyceps products and start your journey to sustained vitality.
              </p>
              <Link
                href="/products"
                className="inline-block bg-green-700 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-800 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b-2 border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900">
                      Items in Cart ({totalItems})
                    </h3>
                  </div>

                  <div className="space-y-0 divide-y-2 divide-gray-200">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-6 hover:bg-gray-50 transition">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-gray-900">{item.name}</h4>
                            <p className="text-lg text-yellow-600 font-bold">₹{item.price}</p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 transition"
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
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/products"
                  className="inline-block mt-6 text-green-700 hover:text-green-800 font-bold transition"
                >
                  ← Continue Shopping
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 sticky top-20">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h3>

                  <div className="space-y-4 mb-6 pb-6 border-b-2 border-yellow-200">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Items:</span>
                      <span className="font-bold text-gray-900">{totalItems}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Subtotal:</span>
                      <span className="font-bold text-gray-900">₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Shipping:</span>
                      <span className="font-bold text-gray-900">Free</span>
                    </div>
                  </div>

                  <div className="flex justify-between mb-6">
                    <span className="text-xl font-bold text-gray-900">Total:</span>
                    <span className="text-3xl font-bold text-yellow-600">₹{totalPrice}</span>
                  </div>

                  <button className="w-full bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-green-800 transition-colors mb-4">
                    Proceed to Checkout
                  </button>

                  <button className="w-full border-2 border-green-700 text-green-700 py-3 rounded-lg font-bold hover:bg-green-50 transition-colors">
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
