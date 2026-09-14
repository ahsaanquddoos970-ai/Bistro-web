import { useState, useMemo, type ReactNode } from 'react';
import { useApp } from '../context/useApp';
import { MENU_ITEMS } from '../data';
import {
  Search,
  Heart,
  ShoppingCart,
  Star,
  Clock,
  Flame,
  Utensils,
  Pizza,
  Cake,
  GlassWater,
  Sparkles,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type CategoryFilter = 'all' | 'pizza' | 'burgers' | 'pasta' | 'desserts' | 'drinks';

export default function Menu() {
  const { addToCart, toggleFavorite, favorites, searchQuery, setSearchQuery } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default');

  // Categories list with Icons
  const categories: { label: string; value: CategoryFilter; icon: ReactNode }[] = [
    { label: 'All Dishes', value: 'all', icon: <Sparkles className="w-4 h-4" /> },
    { label: 'Gourmet Pizza', value: 'pizza', icon: <Pizza className="w-4 h-4" /> },
    { label: 'Signature Burgers', value: 'burgers', icon: <Flame className="w-4 h-4" /> },
    { label: 'Artisanal Pasta', value: 'pasta', icon: <Utensils className="w-4 h-4" /> },
    { label: 'Sweet Desserts', value: 'desserts', icon: <Cake className="w-4 h-4" /> },
    { label: 'Botanical Drinks', value: 'drinks', icon: <GlassWater className="w-4 h-4" /> },
  ];

  // Filtering and sorting menu items
  const filteredAndSortedItems = useMemo(() => {
    let result = [...MENU_ITEMS];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }

    // Sort items
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section
      id="menu"
      className="py-20 bg-zinc-50 dark:bg-transparent transition-colors duration-300 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500 font-mono">
            Gastronomic Discovery
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
            Explore Our Exquisite Menu
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Every dish is made to order by our master chefs, pairing freshly harvested regional organic produce with decades of culinary refinement.
          </p>
        </div>

        {/* Filter, Search & Sort Bar */}
        <div className="space-y-6 mb-12">
          {/* Search and Sort controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400 dark:text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search favorite dishes, ingredients..."
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white dark:bg-white/5 dark:backdrop-blur-md border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm font-medium"
                id="menu-search-bar"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 focus:outline-none"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end md:self-auto w-full md:w-auto">
              <SlidersHorizontal className="w-4 h-4 text-zinc-500" />
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider font-mono">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'default' | 'price-asc' | 'price-desc' | 'rating')}
                className="px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 dark:backdrop-blur-md border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-100 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all cursor-pointer"
                id="menu-sort-select"
                aria-label="Sort menu items"
              >
                <option value="default">Chef Recommendation</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          </div>

          {/* Categories Pill List */}
          <div className="flex flex-wrap gap-2.5 justify-start md:justify-center overflow-x-auto pb-2 no-scrollbar scroll-smooth">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-linear-to-r from-amber-500 to-rose-500 text-white shadow-md shadow-amber-500/10 scale-102'
                      : 'bg-white dark:bg-white/5 dark:backdrop-blur-md border border-zinc-200/60 dark:border-white/10 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10 hover:text-amber-500 dark:hover:text-amber-400'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Menu Grid with animations */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredAndSortedItems.map((item) => {
              const isFavorite = favorites.includes(item.id);

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white dark:bg-white/5 dark:backdrop-blur-xl rounded-3xl border border-zinc-200/50 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                  id={`menu-item-${item.id}`}
                >
                  {/* Photo area */}
                  <div className="relative aspect-4/3 overflow-hidden bg-zinc-100 dark:bg-neutral-900">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />

                    {/* Badge details */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider font-mono rounded-lg bg-amber-500 text-white shadow-sm flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-white text-white" />
                        <span>{item.rating}</span>
                      </span>
                      <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider font-mono rounded-lg bg-black/60 text-white backdrop-blur-sm flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-white" />
                        <span>{item.prepTime}</span>
                      </span>
                    </div>

                    {/* Wishlist Heart */}
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className="absolute top-4 right-4 p-2 rounded-xl bg-white/90 dark:bg-black/50 dark:backdrop-blur-sm dark:border dark:border-white/10 hover:bg-white dark:hover:bg-black/70 shadow-md text-zinc-600 dark:text-zinc-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors focus:outline-none"
                      aria-label="Toggle wishlist"
                    >
                      <Heart
                        className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-zinc-600 dark:text-zinc-300'}`}
                      />
                    </button>
                  </div>

                  {/* Content area */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 font-mono">
                          {item.category}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-zinc-400 font-mono font-bold">
                          <Flame className="w-3 h-3 text-orange-500" />
                          {item.calories} Kcal
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-200">
                        {item.name}
                      </h3>

                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Price and Cart control */}
                    <div className="flex items-center justify-between pt-6 mt-6 border-t border-zinc-100 dark:border-white/5">
                      <span className="text-xl font-black text-zinc-950 dark:text-white font-mono">
                        ${item.price.toFixed(2)}
                      </span>

                      <button
                        onClick={() => addToCart(item)}
                        className="px-4 py-2 text-xs font-bold rounded-xl text-white bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 shadow-sm shadow-amber-500/10 hover:shadow-lg hover:shadow-amber-500/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                        id={`menu-cart-${item.id}`}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state when no items match filtering */}
        {filteredAndSortedItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white dark:bg-white/5 dark:backdrop-blur-md rounded-3xl border border-dashed border-zinc-200 dark:border-white/10"
          >
            <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500 mx-auto mb-4">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">
              No Culinary Items Found
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
              We couldn't find any dish matching category "{selectedCategory}" and search criteria "{searchQuery}". Try selecting another category or typing another word!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
