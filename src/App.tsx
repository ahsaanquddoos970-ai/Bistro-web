import { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedDishes from './components/FeaturedDishes';
import Menu from './components/Menu';
import About from './components/About';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import { ChefHat, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function RestaurantAppContent() {
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Igniting woodfire hearth...');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll height for scroll-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cycle simulation cooking steps during load
  useEffect(() => {
    const texts = [
      'Igniting woodfire hearth...',
      'Stretching organic sourdough crusts...',
      'Searing prime Angus cutlets...',
      'Slow-simmering wild truffle cream...',
      'Shaking signature mocktails...',
      'Plating culinary masterpieces...'
    ];
    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % texts.length;
      setLoadingText(texts[step]);
    }, 450);

    const loadTimer = setTimeout(() => {
      setLoading(false);
      clearInterval(interval);
    }, 2400);

    return () => {
      clearInterval(interval);
      clearTimeout(loadTimer);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* 1. STUNNING PRE-LOAD SCREEN */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-100 bg-zinc-950 flex flex-col items-center justify-center select-none"
            id="app-preloader"
          >
            <div className="space-y-6 text-center">
              {/* Spinning Logo Hat */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 rounded-2xl bg-linear-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white mx-auto shadow-xl shadow-amber-500/10"
              >
                <ChefHat className="w-9 h-9" />
              </motion.div>

              <div className="space-y-1">
                <span className="text-2xl font-black tracking-widest text-white block">
                  BISTRO<span className="text-amber-500">.</span>
                </span>
                <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-500 block">
                  HAUTE CUISINE
                </span>
              </div>

              {/* Progress bar animation */}
              <div className="w-48 h-1 bg-zinc-900 rounded-full overflow-hidden mx-auto">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1/2 h-full bg-linear-to-r from-amber-500 to-rose-500"
                />
              </div>

              {/* Cycling cook texts */}
              <p className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest animate-pulse">
                {loadingText}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. CORE LAYOUT FRAME */}
      <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-[#0A0A0A] text-zinc-900 dark:text-white transition-colors duration-300 relative overflow-x-hidden">
        {/* Glow Effects */}
        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden z-0 hidden dark:block">
          <div className="absolute top-[-10%] left-[-10%] w-150 h-150 bg-orange-600 rounded-full blur-[140px]" />
          <div className="absolute top-[35%] right-[-10%] w-175 h-175 bg-amber-900/60 rounded-full blur-[160px]" />
          <div className="absolute bottom-[20%] left-[-15%] w-150 h-150 bg-orange-900/40 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-200 h-200 bg-amber-950/60 rounded-full blur-[180px]" />
        </div>
        <Navbar />

        {/* Content sections wrapper with simple staggered entries */}
        <main className="flex-1">
          <Hero />
          <FeaturedDishes />
          <Menu />
          <About />
          <Gallery />
          <Contact />
        </main>

        <Footer />

        {/* Floating Shopping Cart Sidebar Drawer */}
        <CartDrawer />

        {/* Floating Checkout Modal Overlay */}
        <CheckoutModal />

        {/* Floating Scroll-to-Top Toggle Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleScrollTop}
              className="fixed bottom-6 right-6 z-40 p-3 bg-linear-to-tr from-amber-500 to-rose-500 text-white rounded-full shadow-lg hover:shadow-amber-500/20 active:scale-95 cursor-pointer transition-shadow focus:outline-none"
              aria-label="Scroll back to top"
              id="scroll-to-top-btn"
            >
              <ChevronUp className="w-5.5 h-5.5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <RestaurantAppContent />
    </AppProvider>
  );
}
