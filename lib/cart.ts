// Shared cart helper — single source of truth for cart operations.
// Replaces the scattered localStorage calls that previously lived in
// homepage, products, cart and checkout pages.
//
// Storage format: a flat array of CartLine (one entry per unit), kept
// backward-compatible with the earlier `{ id, name, price }` shape.

export interface CartLine {
  id: string;
  name: string;
  price: number;
  image?: string;
}

export interface CartGroup extends CartLine {
  quantity: number;
}

const CART_KEY = 'cart';

export function getCart(): CartLine[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveCart(cart: CartLine[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  // Notify same-window listeners (Navigation count badge, cart/checkout pages).
  window.dispatchEvent(new Event('storage'));
}

export function addToCart(item: CartLine, quantity: number = 1) {
  const cart = getCart();
  for (let i = 0; i < quantity; i++) {
    cart.push({ id: item.id, name: item.name, price: item.price, image: item.image });
  }
  saveCart(cart);
  // Signal the MiniCart drawer to slide in.
  window.dispatchEvent(new CustomEvent('cart:add', { detail: { item, quantity } }));
  return cart;
}

export function removeFromCart(id: string) {
  const cart = getCart().filter((line) => line.id !== id);
  saveCart(cart);
  return cart;
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event('storage'));
}

// Grouped view (one row per product, with quantity) for mini-cart & summaries.
export function getGroupedCart(): CartGroup[] {
  const grouped: { [id: string]: CartGroup } = {};
  for (const line of getCart()) {
    if (grouped[line.id]) {
      grouped[line.id].quantity += 1;
    } else {
      grouped[line.id] = { ...line, quantity: 1 };
    }
  }
  return Object.values(grouped);
}

export function getCartTotal(): number {
  return getCart().reduce((sum, line) => sum + line.price, 0);
}

export function getCartCount(): number {
  return getCart().length;
}
