'use client';

// Slide-in mini-cart drawer. Opens automatically whenever addToCart()
// runs anywhere (via the 'cart:add' event dispatched by lib/cart.ts).
// Shows product thumbnails + running total, auto-closes after 3s
// (paused while the pointer is over the drawer).

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { X, ShoppingCart } from 'lucide-react';
import { getGroupedCart, getCartTotal, type CartGroup } from '@/lib/cart';

export default function MiniCart() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<CartGroup[]>([]);
  const [total, setTotal] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const refresh = () => {
    setItems(getGroupedCart());
    setTotal(getCartTotal());
  };

  const startAutoClose = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setOpen(false), 3000);
  };

  useEffect(() => {
    const onAdd = () => {
      refresh();
      setOpen(true);
      startAutoClose();
    };
    const onStorage = () => refresh();

    window.addEventListener('cart:add', onAdd);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('cart:add', onAdd);
      window.removeEventListener('storage', onStorage);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[90] bg-black/30 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[95] h-full w-full sm:w-96 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        onMouseEnter={() => {
          if (timerRef.current) clearTimeout(timerRef.current);
        }}
        onMouseLeave={startAutoClose}
        role="dialog"
        aria-label="Cart preview"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b-2 border-adish-beige">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} className="text-adish-gold" />
            <h3 className="text-lg font-bold text-adish-dark">
              Cart {totalCount > 0 && `(${totalCount})`}
            </h3>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-gray-700 transition"
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="text-adish-green text-sm text-center mt-8">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <ShoppingCart size={20} className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-adish-dark truncate">{item.name}</p>
                    <p className="text-xs text-adish-green">
                      Qty {item.quantity} × ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-adish-dark shrink-0">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t-2 border-adish-beige px-5 py-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-adish-green font-semibold">Subtotal</span>
              <span className="text-xl font-bold text-adish-gold">₹{total.toLocaleString()}</span>
            </div>
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="block w-full text-center bg-green-700 text-white font-bold py-3 rounded-lg hover:bg-green-800 transition"
            >
              View Cart
            </Link>
            <Link
              href="/checkout"
              onClick={() => setOpen(false)}
              className="block w-full text-center bg-adish-gold text-adish-dark font-bold py-3 rounded-lg hover:bg-yellow-500 transition"
            >
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
