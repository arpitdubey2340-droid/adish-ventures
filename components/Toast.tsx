'use client';

// Lightweight, dependency-free toast system.
// Usage:
//   import { toast } from '@/components/Toast';
//   toast('Added to cart', 'success');
// Mount <ToastContainer /> once, globally (see app/layout.tsx).

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

let counter = 0;

export function toast(message: string, type: ToastType = 'success') {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('app:toast', { detail: { message, type } }));
}

const config: Record<ToastType, { icon: typeof CheckCircle; ring: string; iconColor: string }> = {
  success: { icon: CheckCircle, ring: 'border-green-500', iconColor: 'text-green-600' },
  error: { icon: XCircle, ring: 'border-red-500', iconColor: 'text-red-600' },
  info: { icon: Info, ring: 'border-adish-gold', iconColor: 'text-adish-gold' },
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const { message, type } = (e as CustomEvent).detail as { message: string; type: ToastType };
      const id = ++counter;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    };
    window.addEventListener('app:toast', handler);
    return () => window.removeEventListener('app:toast', handler);
  }, []);

  const dismiss = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  if (toasts.length === 0) return null;

  return (
    <div className="fixed z-[100] bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0 flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm pointer-events-none">
      {toasts.map((t) => {
        const { icon: Icon, ring, iconColor } = config[t.type];
        return (
          <div
            key={t.id}
            className={`animate-toast-in pointer-events-auto flex items-center gap-3 bg-white border-l-4 ${ring} rounded-lg shadow-lg px-4 py-3`}
          >
            <Icon size={20} className={`${iconColor} shrink-0`} />
            <p className="flex-1 text-sm font-semibold text-adish-dark">{t.message}</p>
            <button
              onClick={() => dismiss(t.id)}
              className="text-gray-400 hover:text-gray-700 transition shrink-0"
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
