import { useEffect, useState, type MouseEvent } from 'react';
import { GALLERY_ITEMS } from '../data';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Gallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    if (activeIdx !== null) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }

    document.body.style.overflow = '';
    return undefined;
  }, [activeIdx]);

  const openLightbox = (index: number) => {
    setActiveIdx(index);
  };

  const closeLightbox = () => {
    setActiveIdx(null);
  };

  const handlePrev = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (activeIdx === null) return;
    setActiveIdx((prevIdx) => (prevIdx === 0 ? GALLERY_ITEMS.length - 1 : prevIdx! - 1));
  };

  const handleNext = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (activeIdx === null) return;
    setActiveIdx((prevIdx) => (prevIdx === GALLERY_ITEMS.length - 1 ? 0 : prevIdx! + 1));
  };

  return (
    <section
      id="gallery"
      className="py-20 bg-zinc-50 dark:bg-transparent transition-colors duration-300 relative z-10"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-zinc-200/50 dark:bg-white/5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500 font-mono">
            Gastronomic Aesthetics
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
            Visual Plating & Ambiance
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            A window into our culinary laboratory. Discover the textures, colors, and passionate craftsmanship that define the Bistro experience.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative aspect-4/3 rounded-3xl overflow-hidden group border border-zinc-200/50 dark:border-white/10 cursor-pointer shadow-sm hover:shadow-lg bg-zinc-100 dark:bg-neutral-900"
              onClick={() => openLightbox(index)}
              id={`gallery-item-${item.id}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Hover Overlay info */}
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-mono">
                  {item.category}
                </span>
                <h3 className="text-base font-bold text-white mt-1">{item.title}</h3>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 select-none"
            id="gallery-lightbox"
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors focus:outline-none"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 p-3 rounded-full bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors focus:outline-none active:scale-95"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 p-3 rounded-full bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors focus:outline-none active:scale-95"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image display container */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[80vh] flex flex-col items-center bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-850 p-2"
            >
              <img
                src={GALLERY_ITEMS[activeIdx].image}
                alt={GALLERY_ITEMS[activeIdx].title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />

              {/* Lightbox text footer */}
              <div className="w-full pt-4 px-4 pb-2 text-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 font-mono">
                  {GALLERY_ITEMS[activeIdx].category}
                </span>
                <p className="text-sm font-bold text-white mt-1">
                  {GALLERY_ITEMS[activeIdx].title}
                </p>
                <p className="text-[10px] font-mono text-zinc-500 mt-1">
                  Image {activeIdx + 1} of {GALLERY_ITEMS.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
