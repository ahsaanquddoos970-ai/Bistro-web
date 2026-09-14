import { useApp } from '../context/useApp';
import { MENU_ITEMS } from '../data';
import { Heart, ShoppingCart, Star, Clock, Flame } from 'lucide-react';
import { motion } from 'motion/react';

export default function FeaturedDishes() {
  const { addToCart, toggleFavorite, favorites } = useApp();

  const featuredList = MENU_ITEMS.filter((item) => item.isFeatured);

  return (
    <section className="py-20 bg-white dark:bg-transparent transition-colors duration-300 relative z-10">
      <div className="absolute top-0 left-0 right-0 h-px bg-zinc-200/50 dark:bg-white/5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500 font-mono">
            Hand-Selected Masterpieces
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
            Our Featured Culinary Creations
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            A curated showcase of our most celebrated dishes, balancing classic culinary methodologies with contemporary gastronomic flare.
          </p>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredList.map((dish) => {
            const isFavorite = favorites.includes(dish.id);

            return (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5 }}
                className="group bg-zinc-50 dark:bg-white/5 dark:backdrop-blur-xl rounded-3xl border border-zinc-200/60 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                id={`featured-${dish.id}`}
              >
                {/* Image Section with overlays */}
                <div className="relative aspect-4/3 overflow-hidden bg-zinc-100 dark:bg-neutral-900">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* Badges on top */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider font-mono rounded-lg bg-amber-500 text-white shadow-sm flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white text-white" />
                      <span>{dish.rating}</span>
                    </span>
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider font-mono rounded-lg bg-black/60 text-white backdrop-blur-sm flex items-center gap-1">
                      <Clock className="w-3 h-3 text-white" />
                      <span>{dish.prepTime}</span>
                    </span>
                  </div>

                  {/* Favorite button absolute */}
                  <button
                    onClick={() => toggleFavorite(dish.id)}
                    className="absolute top-4 right-4 p-2 rounded-xl bg-white/90 dark:bg-black/50 dark:backdrop-blur-sm dark:border dark:border-white/10 hover:bg-white dark:hover:bg-black/70 shadow-md text-zinc-600 dark:text-zinc-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors focus:outline-none"
                    aria-label="Add to favorites"
                  >
                    <Heart
                      className={`w-4.5 h-4.5 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-zinc-600 dark:text-zinc-300'}`}
                    />
                  </button>
                </div>

                {/* Info Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 font-mono">
                        {dish.category}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-zinc-400 font-mono font-bold">
                        <Flame className="w-3 h-3 text-orange-500" />
                        {dish.calories} Kcal
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-200">
                      {dish.name}
                    </h3>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  {/* Card bottom: price & add to cart */}
                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-zinc-200/50 dark:border-white/5">
                    <span className="text-2xl font-black text-zinc-950 dark:text-white font-mono">
                      ${dish.price.toFixed(2)}
                    </span>

                    <button
                      onClick={() => addToCart(dish)}
                      className="px-4 py-2 text-xs font-bold rounded-xl text-white bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 shadow-sm shadow-amber-500/10 hover:shadow-lg hover:shadow-amber-500/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                      id={`add-to-cart-${dish.id}`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
