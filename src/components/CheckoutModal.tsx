import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useApp } from '../context/useApp';
import { X, CheckCircle2, AlertCircle, Truck, ClipboardCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutForm {
  name: string;
  phone: string;
  address: string;
  notes: string;
  paymentMethod: 'card' | 'cash' | 'apple-pay';
}

interface CheckoutErrors {
  name?: string;
  phone?: string;
  address?: string;
}

export default function CheckoutModal() {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
  } = useApp();

  const [formData, setFormData] = useState<CheckoutForm>({
    name: '',
    phone: '',
    address: '',
    notes: '',
    paymentMethod: 'card',
  });

  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const subtotal = cart.reduce<number>((sum: number, cartItem: { item: { price: number }; quantity: number }) => sum + cartItem.item.price * cartItem.quantity, 0);
  const deliveryFee = subtotal > 40 ? 0 : 4.99;
  const total = subtotal + deliveryFee;

  const validate = (): boolean => {
    const newErrors: CheckoutErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\+?[0-9\s\-()]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please provide a valid phone number.';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Delivery address is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CheckoutErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleMethodSelect = (method: 'card' | 'cash' | 'apple-pay') => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate order dispatching
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Generate randomized order number
      const num = 'BST-' + Math.floor(Math.random() * 900000 + 100000);
      setOrderNumber(num);
    }, 1500);
  };

  const handleCloseSuccess = () => {
    setIsSuccess(false);
    clearCart();
    setIsCheckoutOpen(false);
    setFormData({ name: '', phone: '', address: '', notes: '', paymentMethod: 'card' });
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => !isSubmitting && setIsCheckoutOpen(false)}
            className="absolute inset-0 bg-black"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative bg-white dark:bg-[#0A0A0A]/95 dark:backdrop-blur-xl rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-zinc-100 dark:border-white/10 z-10 max-h-[90vh] flex flex-col"
            id="checkout-modal"
          >
            {/* Header */}
            <div className="p-6 border-b border-zinc-100 dark:border-white/10 flex items-center justify-between">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                {isSuccess ? 'Order Confirmation' : 'Secure Checkout'}
              </h3>
              {!isSubmitting && !isSuccess && (
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors focus:outline-none"
                  aria-label="Close checkout"
                >
                  <X className="w-5.5 h-5.5" />
                </button>
              )}
            </div>

            {/* Scrollable Container */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  /* SUCCESS RECEIPT */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 text-center space-y-6"
                    id="checkout-success-receipt"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 inline-block px-3 py-1 rounded-full">
                        Kitchen Dispatch Successful
                      </p>
                      <h4 className="text-2xl font-black text-zinc-900 dark:text-white">
                        Your Feast is En Route!
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
                        Order <span className="font-bold text-zinc-800 dark:text-zinc-100 font-mono">{orderNumber}</span> is officially queued. Chef Jean-Pierre is currently crafting your selection with absolute precision.
                      </p>
                    </div>

                    {/* Simulating Dispatch Route */}
                    <div className="border border-zinc-100 dark:border-white/5 bg-zinc-50 dark:bg-white/5 rounded-2xl p-4 text-left space-y-3.5 max-w-md mx-auto">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-zinc-500">Destination:</span>
                        <span className="text-zinc-800 dark:text-zinc-200 truncate font-medium max-w-[240px]">{formData.address}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-zinc-500">Recipient:</span>
                        <span className="text-zinc-800 dark:text-zinc-200 font-medium">{formData.name}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-zinc-500">Amount Charged:</span>
                        <span className="font-bold text-amber-500 font-mono">${total.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-zinc-200/50 dark:border-white/5 pt-2 flex items-center gap-2 text-[10px] text-zinc-500">
                        <Truck className="w-4 h-4 text-amber-500" />
                        <span>Estimated hot delivery: 25 - 40 mins.</span>
                      </div>
                    </div>

                    <button
                      onClick={handleCloseSuccess}
                      className="px-8 py-3.5 bg-linear-to-r from-amber-500 to-rose-500 text-white font-bold rounded-xl shadow-lg shadow-amber-500/15 hover:opacity-95 transition-opacity active:scale-98 cursor-pointer inline-block"
                    >
                      Awesome, Return to Bistro
                    </button>
                  </motion.div>
                ) : (
                  /* REGULAR CHECKOUT FORM */
                  <form onSubmit={handleFormSubmit} className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8" id="checkout-main-form">
                    {/* LEFT FORM FIELDS */}
                    <div className="md:col-span-7 space-y-5">
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider font-mono pb-2 border-b border-zinc-100 dark:border-white/10">
                        Delivery Logistics
                      </h4>

                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-mono">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Liam Sterling"
                          className={`w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-white/5 dark:backdrop-blur-md border text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all ${
                            errors.name ? 'border-rose-500 focus:border-rose-500' : 'border-zinc-200 dark:border-white/10 focus:border-amber-500'
                          }`}
                        />
                        {errors.name && (
                          <p className="text-[10px] text-rose-500 font-semibold flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-mono">
                          Contact Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. +1 (310) 555-0192"
                          className={`w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-white/5 dark:backdrop-blur-md border text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all ${
                            errors.phone ? 'border-rose-500 focus:border-rose-500' : 'border-zinc-200 dark:border-white/10 focus:border-amber-500'
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-[10px] text-rose-500 font-semibold flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* Delivery Address */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-mono">
                          Delivery Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="e.g. 100 Ocean Ave, Apt 2B"
                          className={`w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-white/5 dark:backdrop-blur-md border text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all ${
                            errors.address ? 'border-rose-500 focus:border-rose-500' : 'border-zinc-200 dark:border-white/10 focus:border-amber-500'
                          }`}
                        />
                        {errors.address && (
                          <p className="text-[10px] text-rose-500 font-semibold flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.address}
                          </p>
                        )}
                      </div>

                      {/* Delivery Notes */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-mono">
                          Courier Notes (Optional)
                        </label>
                        <textarea
                          name="notes"
                          rows={2}
                          value={formData.notes}
                          onChange={handleInputChange}
                          placeholder="e.g. Ring doorbell, leave on table..."
                          className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-white/5 dark:backdrop-blur-md border border-zinc-200 dark:border-white/10 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none"
                        />
                      </div>

                      {/* Payment Toggle */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-mono block">
                          Settlement Method
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          <button
                            type="button"
                            onClick={() => handleMethodSelect('card')}
                            className={`px-3 py-3 rounded-xl text-center border font-bold text-xs transition-all cursor-pointer ${
                              formData.paymentMethod === 'card'
                                ? 'bg-amber-500/10 border-amber-500 text-amber-500'
                                : 'bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400'
                            }`}
                          >
                            Credit Card
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMethodSelect('cash')}
                            className={`px-3 py-3 rounded-xl text-center border font-bold text-xs transition-all cursor-pointer ${
                              formData.paymentMethod === 'cash'
                                ? 'bg-amber-500/10 border-amber-500 text-amber-500'
                                : 'bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400'
                            }`}
                          >
                            Cash on Delivery
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMethodSelect('apple-pay')}
                            className={`px-3 py-3 rounded-xl text-center border font-bold text-xs transition-all cursor-pointer ${
                              formData.paymentMethod === 'apple-pay'
                                ? 'bg-amber-500/10 border-amber-500 text-amber-500'
                                : 'bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400'
                            }`}
                          >
                            Apple Pay
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT ORDER SUMMARY */}
                    <div className="md:col-span-5 bg-zinc-50 dark:bg-white/5 dark:backdrop-blur-md rounded-2xl p-5 border border-zinc-200/50 dark:border-white/10 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-zinc-950 dark:text-white uppercase tracking-wider font-mono pb-2 border-b border-zinc-200/50 dark:border-white/10">
                          Items Summary
                        </h4>

                        <div className="mt-4 space-y-3 max-h-[160px] overflow-y-auto no-scrollbar">
                          {cart.map((cartItem: { item: { id: string; name: string; price: number }; quantity: number }) => (
                            <div key={cartItem.item.id} className="flex items-center justify-between gap-2 text-xs">
                              <span className="text-zinc-500 font-mono">
                                {cartItem.quantity}x
                              </span>
                              <span className="text-zinc-800 dark:text-zinc-200 font-semibold truncate flex-1">
                                {cartItem.item.name}
                              </span>
                              <span className="font-semibold text-zinc-900 dark:text-white font-mono">
                                ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Totals */}
                      <div className="border-t border-zinc-200/50 dark:border-white/5 pt-4 mt-4 space-y-2.5 text-xs">
                        <div className="flex justify-between text-zinc-500">
                          <span>Subtotal</span>
                          <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">
                            ${subtotal.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-zinc-500">
                          <span>Delivery Logistics</span>
                          <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">
                            {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                          </span>
                        </div>
                        <div className="flex justify-between text-base font-black text-zinc-900 dark:text-white pt-2 border-t border-zinc-200/30 dark:border-white/5">
                          <span>Grand Total</span>
                          <span className="font-mono text-amber-500">
                            ${total.toFixed(2)}
                          </span>
                        </div>

                        {/* Dispatch Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full mt-4 py-3.5 rounded-xl text-white font-bold bg-linear-to-r from-amber-500 to-rose-500 hover:opacity-95 disabled:opacity-50 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-500/10"
                        >
                          {isSubmitting ? (
                            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          ) : (
                            <>
                              <ClipboardCheck className="w-4.5 h-4.5" />
                              <span>Dispatch Order</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
