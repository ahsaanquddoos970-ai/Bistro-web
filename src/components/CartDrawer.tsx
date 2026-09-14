import { useApp } from '../context/useApp';
import { X, ShoppingBag, Trash2, Plus, Minus, CreditCard, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    setIsCheckoutOpen,
  } = useApp();

  const subtotal = cart.reduce<number>((sum: number, cartItem: { item: { price: number }; quantity: number }) => sum + cartItem.item.price * cartItem.quantity, 0);
  const deliveryFee = subtotal > 40 ? 0 : 4.99;
  const total = subtotal + (subtotal > 0 ? deliveryFee : 0);

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-black"
          />

          {/* Drawer Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-[#0A0A0A]/95 dark:backdrop-blur-xl shadow-2xl z-50 border-l border-zinc-100 dark:border-white/10 flex flex-col justify-between"
            id="shopping-cart-drawer"
          >
            {/* Header */}
            <div className="p-6 border-b border-zinc-100 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white leading-none">Your Order</h3>
                  <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mt-1">
                    {cart.length} distinct items
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors focus:outline-none"
                aria-label="Close cart"
                id="close-cart-btn"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-zinc-50 dark:bg-white/5 flex items-center justify-center text-zinc-400 dark:text-zinc-600 border border-zinc-200/50 dark:border-white/5">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-zinc-900 dark:text-white">Your cart is empty</p>
                    <p className="text-xs text-zinc-500 max-w-xs mx-auto mt-1">
                      Browse our Neapolitan woodfire pizza or prime custom burgers and add something delicious to your platter!
                    </p>
                  </div>
                </div>
              ) : (
                cart.map((cartItem: { item: { id: string; name: string; image: string; price: number }; quantity: number }) => (
                  <motion.div
                    key={cartItem.item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-4 bg-zinc-50 dark:bg-white/5 dark:backdrop-blur-md p-3.5 rounded-xl border border-zinc-200/50 dark:border-white/5"
                  >
                    {/* Item Photo */}
                    <img
                      src={cartItem.item.image}
                      alt={cartItem.item.name}
                      className="w-16 h-16 rounded-lg object-cover shrink-0 border border-zinc-200 dark:border-white/5"
                      referrerPolicy="no-referrer"
                    />

                    {/* Meta info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                        {cartItem.item.name}
                      </h4>
                      <p className="text-xs font-semibold text-amber-500 font-mono mt-0.5">
                        ${cartItem.item.price.toFixed(2)}
                      </p>

                      {/* Quantity Modifier */}
                      <div className="flex items-center gap-2.5 mt-2">
                        <button
                          onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                          className="w-6 h-6 rounded bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-amber-500 transition-colors focus:outline-none"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold font-mono text-zinc-800 dark:text-zinc-200 w-5 text-center">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                          className="w-6 h-6 rounded bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-amber-500 transition-colors focus:outline-none"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Trash remove */}
                    <button
                      onClick={() => removeFromCart(cartItem.item.id)}
                      className="p-2 rounded-lg text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors focus:outline-none self-start"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout Trigger */}
            {cart.length > 0 && (
              <div className="p-6 bg-zinc-50 dark:bg-white/5 dark:backdrop-blur-md border-t border-zinc-100 dark:border-white/10 space-y-4">
                <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <div className="flex justify-between items-center">
                    <span>Subtotal</span>
                    <span className="font-mono font-bold text-zinc-900 dark:text-white">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Delivery Fee</span>
                    <span className="font-mono font-bold text-zinc-900 dark:text-white">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-500 uppercase tracking-widest text-[10px] font-bold">
                          FREE
                        </span>
                      ) : (
                        `$${deliveryFee.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-[10px] text-zinc-500">
                      Add <span className="font-bold text-amber-500">${(40 - subtotal).toFixed(2)}</span> more to unlock <span className="font-bold text-emerald-500">FREE DELIVERY</span>!
                    </p>
                  )}
                  <div className="flex justify-between items-center pt-2 border-t border-zinc-200/50 dark:border-white/5 text-base font-bold text-zinc-900 dark:text-white">
                    <span>Total Amount</span>
                    <span className="font-mono font-black text-amber-500">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-4 bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 hover:opacity-95 active:scale-99 transition-all cursor-pointer"
                  id="cart-checkout-btn"
                >
                  <CreditCard className="w-4.5 h-4.5" />
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
