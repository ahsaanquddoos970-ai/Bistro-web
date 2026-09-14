import { type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, Clock, Utensils } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (e: MouseEvent<HTMLButtonElement>, selector: string) => {
    e.preventDefault();
    const element = document.querySelector(selector);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-zinc-50 dark:bg-transparent transition-colors duration-300 z-10"
    >
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-rose-500/10 dark:bg-rose-500/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-left"
          >
           
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1] uppercase">
              Savor the{' '}
              <span className="bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent font-black block sm:inline">
                Extraordinary
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
              Experience hand-crafted sourdough pizzas, prime flame-grilled burgers, and artisanal pasta slow-simmered to absolute perfection using organic, locally-sourced ingredients.
            </p>

            {/* Quick value props */}
            <div className="grid grid-cols-3 gap-4 py-2 border-y border-zinc-200/50 dark:border-zinc-800/50 max-w-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-amber-500">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-900 dark:text-white">Fine Dining</p>
                  <p className="text-[10px] text-zinc-500">Premium Taste</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-amber-500">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-900 dark:text-white">Fast Delivery</p>
                  <p className="text-[10px] text-zinc-500">Hot & Fresh</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-amber-500">
                  <Star className="w-4 h-4 text-rose-500 fill-rose-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-900 dark:text-white">4.9 Stars</p>
                  <p className="text-[10px] text-zinc-500">Trust Score</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={(e) => scrollToSection(e, '#menu')}
                className="px-8 py-4 rounded-full text-white font-bold uppercase tracking-wider bg-linear-to-r from-amber-500 to-orange-600 hover:opacity-95 shadow-lg shadow-orange-900/20 active:scale-98 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                id="hero-order-btn"
              >
                <span>Order Online Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={(e) => scrollToSection(e, '#menu')}
                className="px-8 py-4 rounded-full font-bold uppercase tracking-wider border border-zinc-300 dark:border-white/20 text-zinc-800 dark:text-white dark:bg-white/10 dark:backdrop-blur-md hover:bg-zinc-100 dark:hover:bg-white/20 transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                id="hero-menu-btn"
              >
                View Culinary Menu
              </button>
            </div>
          </motion.div>

          {/* RIGHT VISUAL DISPLAY */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Visual Frame */}
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-linear-to-tr from-amber-500/10 to-rose-500/10 p-1.5 shadow-2xl dark:shadow-zinc-900/50">
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-zinc-200 dark:border-zinc-800 animate-[spin_100s_linear_infinite]" />

              {/* Glowing Bezel */}
              <div className="w-full h-full rounded-full bg-white dark:bg-zinc-900 overflow-hidden relative shadow-inner flex items-center justify-center p-3">
                <motion.img
                  src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80"
                  alt="Specialty Gourmet Woodfired Pizza"
                  className="w-[90%] h-[90%] object-cover rounded-full shadow-lg"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Absolute Badge */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-2 sm:-left-2 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 shadow-xl flex items-center gap-3 backdrop-blur-sm bg-white/90 dark:bg-zinc-900/90">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 font-extrabold text-sm">
                  🔥
                </div>
                <div>
                  <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest leading-none font-mono">Chef Special</p>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white mt-1">Sourdough Truffle Pizza</p>
                  <p className="text-xs font-mono font-bold text-zinc-500 mt-0.5">$21.00</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
