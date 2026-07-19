'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ShoppingCart } from 'lucide-react';
import Button from '@/components/Button';
import Link from 'next/link';
import { toast } from '@/components/Toast';
import { clearCart } from '@/lib/cart';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

type CheckoutStep = 1 | 2 | 3;

export default function Checkout() {
  const router = useRouter();
  const [step, setStep] = useState<CheckoutStep>(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [shippingForm, setShippingForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  });

  const [billingForm, setBillingForm] = useState<FormData>({ ...shippingForm });

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    const groupedCart = cartData.reduce((acc: { [key: string]: CartItem }, item: any) => {
      if (acc[item.id]) {
        acc[item.id].quantity += 1;
      } else {
        acc[item.id] = { ...item, quantity: 1 };
      }
      return acc;
    }, {});
    setCart(Object.values(groupedCart));
    setLoading(false);
  }, []);

  const validateShippingForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!shippingForm.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!shippingForm.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!shippingForm.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required';
    if (!shippingForm.phone.match(/^\d{10}$/)) newErrors.phone = 'Phone must be 10 digits';
    if (!shippingForm.address.trim()) newErrors.address = 'Address is required';
    if (!shippingForm.city.trim()) newErrors.city = 'City is required';
    if (!shippingForm.state) newErrors.state = 'State is required';
    if (!shippingForm.postalCode.match(/^\d{6}$/)) newErrors.postalCode = 'Postal code must be 6 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToStep2 = () => {
    if (validateShippingForm()) {
      if (sameAsShipping) {
        setBillingForm(shippingForm);
      }
      setStep(2);
      window.scrollTo(0, 0);
    }
  };

  const validateBillingForm = () => {
    const b = billingForm;
    const ok =
      !!b.firstName.trim() &&
      !!b.lastName.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
      /^\d{10}$/.test(b.phone) &&
      !!b.address.trim() &&
      !!b.city.trim() &&
      !!b.state &&
      /^\d{6}$/.test(b.postalCode);
    setErrors((prev) => ({
      ...prev,
      billing: ok ? '' : 'Please complete all billing fields with valid details.',
    }));
    return ok;
  };

  const handleContinueToStep3 = () => {
    if (!sameAsShipping && !validateBillingForm()) {
      window.scrollTo(0, 0);
      return;
    }
    setStep(3);
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = () => {
    // TODO: Wire real payment (Razorpay is in package.json, not yet integrated).
    // For now, complete the order flow: clear the cart and return home so the
    // cart isn't left full after "placing" an order.
    console.log({
      shipping: shippingForm,
      billing: sameAsShipping ? shippingForm : billingForm,
      shippingMethod,
      paymentMethod,
      cart,
      total,
    });
    clearCart();
    setCart([]);
    toast("Order placed! We'll be in touch. (Online payment coming soon.)", 'success');
    router.push('/');
  };

  const applyPromoCode = () => {
    if (promoCode === 'SAVE10') {
      setDiscount(subtotal * 0.1);
      toast('Promo code applied — 10% off!', 'success');
    } else if (promoCode === 'SAVE20') {
      setDiscount(subtotal * 0.2);
      toast('Promo code applied — 20% off!', 'success');
    } else {
      toast('Invalid promo code', 'error');
      setDiscount(0);
    }
  };

  // Free shipping is a site-wide promise (hero/trust badges), so the cart's
  // "Free" and checkout always agree.
  const shippingCosts = {
    standard: 0,
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = shippingCosts[shippingMethod as keyof typeof shippingCosts];
  const tax = (subtotal - discount) * 0.18; // 18% GST
  const total = subtotal + shipping + tax - discount;

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-adish-dark mb-4">Your cart is empty</h1>
          <p className="text-adish-green mb-8">Please add items before checking out</p>
          <Link href="/products">
            <Button variant="primary">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    s <= step
                      ? 'bg-adish-gold text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      s < step ? 'bg-adish-gold' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between text-sm sm:text-base font-semibold">
            <span className={step === 1 ? 'text-adish-dark' : 'text-gray-600'}>Shipping</span>
            <span className={step === 2 ? 'text-adish-dark' : 'text-gray-600'}>Billing</span>
            <span className={step === 3 ? 'text-adish-dark' : 'text-gray-600'}>Review & Pay</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Form (2/3 width on desktop) */}
          <div className="lg:col-span-2">
            {/* STEP 1: SHIPPING */}
            {step === 1 && (
              <div className="bg-white">
                <h2 className="text-2xl font-bold text-adish-dark mb-6">Shipping Address</h2>

                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-adish-dark mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={shippingForm.firstName}
                        onChange={(e) => setShippingForm({ ...shippingForm, firstName: e.target.value })}
                        onBlur={() => validateShippingForm()}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-adish-gold focus:outline-none transition"
                        placeholder="John"
                      />
                      {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-adish-dark mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={shippingForm.lastName}
                        onChange={(e) => setShippingForm({ ...shippingForm, lastName: e.target.value })}
                        onBlur={() => validateShippingForm()}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-adish-gold focus:outline-none transition"
                        placeholder="Doe"
                      />
                      {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-adish-dark mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={shippingForm.email}
                      onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                      onBlur={() => validateShippingForm()}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-adish-gold focus:outline-none transition"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-adish-dark mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={shippingForm.phone}
                      onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                      onBlur={() => validateShippingForm()}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-adish-gold focus:outline-none transition"
                      placeholder="9876543210"
                    />
                    {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-adish-dark mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      value={shippingForm.address}
                      onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                      onBlur={() => validateShippingForm()}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-adish-gold focus:outline-none transition"
                      placeholder="123 Main St"
                    />
                    {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-adish-dark mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        value={shippingForm.city}
                        onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                        onBlur={() => validateShippingForm()}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-adish-gold focus:outline-none transition"
                        placeholder="Mumbai"
                      />
                      {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-adish-dark mb-2">
                        State *
                      </label>
                      <select
                        value={shippingForm.state}
                        onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                        onBlur={() => validateShippingForm()}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-adish-gold focus:outline-none transition"
                      >
                        <option value="">Select State</option>
                        <option value="MH">Maharashtra</option>
                        <option value="DL">Delhi</option>
                        <option value="BG">Bengal</option>
                        <option value="KA">Karnataka</option>
                      </select>
                      {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-adish-dark mb-2">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        value={shippingForm.postalCode}
                        onChange={(e) => setShippingForm({ ...shippingForm, postalCode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                        onBlur={() => validateShippingForm()}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-adish-gold focus:outline-none transition"
                        placeholder="400001"
                      />
                      {errors.postalCode && <p className="text-red-600 text-sm mt-1">{errors.postalCode}</p>}
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleContinueToStep2}
                    className="mt-6"
                  >
                    Continue to Billing <ChevronRight size={20} />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: BILLING */}
            {step === 2 && (
              <div className="bg-white">
                <h2 className="text-2xl font-bold text-adish-dark mb-6">Billing Address</h2>

                <div className="mb-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sameAsShipping}
                      onChange={(e) => setSameAsShipping(e.target.checked)}
                      className="w-5 h-5 rounded border-2 border-adish-gold cursor-pointer"
                    />
                    <span className="font-semibold text-adish-dark">Same as shipping address</span>
                  </label>
                </div>

                {!sameAsShipping && (
                  <div className="space-y-4 p-6 bg-adish-beige rounded-lg">
                    {/* Billing form fields */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={billingForm.firstName}
                        onChange={(e) => setBillingForm({ ...billingForm, firstName: e.target.value })}
                        placeholder="First Name *"
                        className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-adish-gold focus:outline-none transition"
                      />
                      <input
                        type="text"
                        value={billingForm.lastName}
                        onChange={(e) => setBillingForm({ ...billingForm, lastName: e.target.value })}
                        placeholder="Last Name *"
                        className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-adish-gold focus:outline-none transition"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input
                        type="email"
                        value={billingForm.email}
                        onChange={(e) => setBillingForm({ ...billingForm, email: e.target.value })}
                        placeholder="Email *"
                        className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-adish-gold focus:outline-none transition"
                      />
                      <input
                        type="tel"
                        value={billingForm.phone}
                        onChange={(e) => setBillingForm({ ...billingForm, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                        placeholder="Phone *"
                        className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-adish-gold focus:outline-none transition"
                      />
                    </div>
                    <input
                      type="text"
                      value={billingForm.address}
                      onChange={(e) => setBillingForm({ ...billingForm, address: e.target.value })}
                      placeholder="Street Address *"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-adish-gold focus:outline-none transition"
                    />
                    <div className="grid sm:grid-cols-3 gap-4">
                      <input
                        type="text"
                        value={billingForm.city}
                        onChange={(e) => setBillingForm({ ...billingForm, city: e.target.value })}
                        placeholder="City *"
                        className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-adish-gold focus:outline-none transition"
                      />
                      <select
                        value={billingForm.state}
                        onChange={(e) => setBillingForm({ ...billingForm, state: e.target.value })}
                        className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-adish-gold focus:outline-none transition"
                      >
                        <option value="">Select State *</option>
                        <option value="MH">Maharashtra</option>
                        <option value="DL">Delhi</option>
                        <option value="BG">Bengal</option>
                        <option value="KA">Karnataka</option>
                      </select>
                      <input
                        type="text"
                        value={billingForm.postalCode}
                        onChange={(e) => setBillingForm({ ...billingForm, postalCode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                        placeholder="Postal Code *"
                        className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-adish-gold focus:outline-none transition"
                      />
                    </div>
                    {errors.billing && <p className="text-red-600 text-sm">{errors.billing}</p>}
                  </div>
                )}

                <div className="flex gap-4 mt-6">
                  <Button
                    variant="secondary"
                    size="lg"
                    fullWidth
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleContinueToStep3}
                  >
                    Continue to Review <ChevronRight size={20} />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: REVIEW & PAYMENT */}
            {step === 3 && (
              <div className="bg-white">
                <h2 className="text-2xl font-bold text-adish-dark mb-6">Review Order</h2>

                {/* Shipping Method */}
                <div className="mb-8 pb-8 border-b-2 border-gray-200">
                  <h3 className="font-bold text-adish-dark mb-4">Shipping Method</h3>
                  <div className="space-y-3">
                    {[
                      { id: 'standard', label: 'Standard (5-7 days)', cost: 0 },
                    ].map((method) => (
                      <label key={method.id} className="flex items-center gap-3 cursor-pointer p-3 hover:bg-adish-beige rounded-lg transition">
                        <input
                          type="radio"
                          name="shipping"
                          value={method.id}
                          checked={shippingMethod === method.id}
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="w-5 h-5 cursor-pointer"
                        />
                        <span className="flex-1 font-semibold text-adish-dark">{method.label}</span>
                        <span className="font-bold text-adish-gold">
                          {method.cost === 0 ? 'Free' : `₹${method.cost}`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-8 pb-8 border-b-2 border-gray-200">
                  <h3 className="font-bold text-adish-dark mb-4">Payment Method</h3>
                  <div className="space-y-3">
                    {[
                      { id: 'card', label: '💳 Credit/Debit Card' },
                      { id: 'upi', label: '📱 UPI' },
                      { id: 'netbanking', label: '🏦 Net Banking' },
                      { id: 'cod', label: '📦 Cash on Delivery' },
                    ].map((method) => (
                      <label key={method.id} className="flex items-center gap-3 cursor-pointer p-3 hover:bg-adish-beige rounded-lg transition">
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-5 h-5 cursor-pointer"
                        />
                        <span className="font-semibold text-adish-dark">{method.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-8 pb-8 border-b-2 border-gray-200">
                  <h3 className="font-bold text-adish-dark mb-4">Promo Code (Optional)</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Enter promo code"
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-adish-gold focus:outline-none transition"
                    />
                    <Button variant="secondary" onClick={applyPromoCode}>
                      Apply
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Try: SAVE10 or SAVE20</p>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-4">
                  <Button
                    variant="secondary"
                    size="lg"
                    fullWidth
                    onClick={() => setStep(2)}
                  >
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handlePlaceOrder}
                  >
                    Place Order (Payment Gateway Coming Soon)
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Order Summary (Sticky) */}
          <div className="lg:col-span-1">
            <div className="bg-adish-beige p-6 rounded-lg sticky top-4 max-h-screen overflow-y-auto">
              <h3 className="font-bold text-adish-dark text-lg mb-4">Order Summary</h3>

              {/* Items */}
              <div className="space-y-4 mb-6 pb-6 border-b-2 border-adish-gold/30">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 text-sm">
                    <div className="w-12 h-12 rounded-lg bg-white overflow-hidden shrink-0 flex items-center justify-center border border-adish-gold/20">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <ShoppingCart size={18} className="text-gray-400" />
                      )}
                    </div>
                    <span className="flex-1 text-adish-green">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-bold text-adish-dark shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 text-sm mb-6 pb-6 border-b-2 border-adish-gold/30">
                <div className="flex justify-between">
                  <span className="text-adish-green">Subtotal</span>
                  <span className="font-bold text-adish-dark">₹{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-bold">-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-adish-green">Shipping</span>
                  <span className="font-bold text-adish-dark">
                    {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-adish-green">Tax (18%)</span>
                  <span className="font-bold text-adish-dark">₹{Math.round(tax).toLocaleString()}</span>
                </div>
              </div>

              {/* Total */}
              <div className="bg-white p-4 rounded-lg border-2 border-adish-gold mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-adish-dark">Total</span>
                  <span className="text-2xl font-bold text-adish-gold">
                    ₹{Math.round(total).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="space-y-2 text-sm text-adish-green">
                <div className="flex items-center gap-2">
                  <span>🔒</span> Secure checkout (SSL encrypted)
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span> 30-day money-back guarantee
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span> Lab tested products
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
