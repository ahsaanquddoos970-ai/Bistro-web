import { useEffect, useState } from 'react';
import { RESTAURANT_STATS } from '../data';
import { Award, ShieldCheck, Heart, ChefHat } from 'lucide-react';
import { motion } from 'motion/react';

// Elegant micro animated counter component
function AnimatedCounter({
  target,
  duration = 1500,
  prefix = '',
  suffix = '',
}: {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const rate = Math.min(progress / duration, 1);

      // Ease out quad formula
      const easedRate = rate * (2 - rate);
      const current = easedRate * target;

      // Handle float display for ratings
      if (target % 1 !== 0) {
        setCount(parseFloat(current.toFixed(1)));
      } else {
        setCount(Math.floor(current));
      }

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="py-20 bg-white dark:bg-transparent text-zinc-800 dark:text-zinc-100 transition-colors duration-300 relative z-10"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-zinc-200/50 dark:bg-white/5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* LEFT: TEXT STORY */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-500 font-mono">
                The Heritage Story
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
                Crafting Culinary Memories Since 2014
              </h2>
            </div>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Founded on the pillars of absolute gastronomical precision, Bistro was born from a desire to bring pure, authentic Mediterranean artisan flavors to modern gourmands. Our journey started in a cozy brick building with a single woodfire oven, and a profound commitment to hand-stretched sourdough.
            </p>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Today, our culinary philosophy remains uncompromised. We collaborate exclusively with organic agricultural growers, harvesting heritage tomatoes, hand-pressed virgin oils, and premium farm cheeses. We believe dining is not just a routine, but a sacred gathering of senses.
            </p>

            {/* Core Values List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Michelin Standards</h4>
                <p className="text-xs text-zinc-500">Every plate is examined for perfection before staging.</p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">100% Organic</h4>
                <p className="text-xs text-zinc-500">Strictly pesticide-free, biodynamic ingredients.</p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Locally Sourced</h4>
                <p className="text-xs text-zinc-500">Direct farm-to-table logistics supports our community.</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: CHEF CARD & STATS */}
          <div className="lg:col-span-5 space-y-12">
            {/* CHEF PROFILE CARD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-zinc-50 dark:bg-white/5 dark:backdrop-blur-xl rounded-3xl p-6 border border-zinc-200/50 dark:border-white/10 relative overflow-hidden flex flex-col sm:flex-row items-center gap-6"
              id="chef-profile-card"
            >
              {/* Chef Photo Frame */}
              <div className="relative w-32 h-32 rounded-2xl overflow-hidden shrink-0 border border-zinc-200 dark:border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80"
                  alt="Executive Chef Jean-Pierre Dubois"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Chef Quote / Info */}
              <div className="space-y-2 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-amber-500 font-mono text-[10px] font-bold uppercase tracking-widest">
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>Executive Head Chef</span>
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Jean-Pierre Dubois</h3>
                <p className="text-xs text-zinc-500 italic leading-relaxed">
                  "Cooking is an act of total devotion and absolute discipline. We don't just feed the body; we nourish the creative soul."
                </p>
              </div>
            </motion.div>

            {/* STATS COUNT GRID */}
            <div className="grid grid-cols-2 gap-6">
              {RESTAURANT_STATS.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-zinc-50 dark:bg-white/5 dark:backdrop-blur-md p-5 rounded-2xl border border-zinc-200/40 dark:border-white/5 text-center"
                >
                  <p className="text-3xl font-black text-amber-500 font-mono leading-none">
                    <AnimatedCounter
                      target={stat.number}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </p>
                  <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 mt-2">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
