import { type MouseEvent } from 'react';
import { Send, Globe2, MessageCircle, PlayCircle, ChefHat, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
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
    <footer className="bg-[#0A0A0A]/80 dark:bg-black/40 backdrop-blur-md text-zinc-400 pt-16 pb-8 border-t border-zinc-200 dark:border-white/5 relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* COLUMN 1: BRAND LOGO & SOC_LINKS */}
          <div className="space-y-5">
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, '#home')}
              className="flex items-center gap-2 group focus:outline-none"
              id="footer-logo"
            >
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-md">
                <ChefHat className="w-5.5 h-5.5" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white block leading-none">
                  BISTRO<span className="text-amber-500 font-extrabold">.</span>
                </span>
           
              </div>
            </a>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Elevating the craft of sourdough, flame grilling, and custom pasta. Every plate tells an exquisite story.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-white flex items-center justify-center text-zinc-400 transition-colors"
                aria-label="Instagram"
              >
                <Send className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-white flex items-center justify-center text-zinc-400 transition-colors"
                aria-label="Facebook"
              >
                <Globe2 className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-white flex items-center justify-center text-zinc-400 transition-colors"
                aria-label="Twitter"
              >
                <MessageCircle className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-white flex items-center justify-center text-zinc-400 transition-colors"
                aria-label="Youtube"
              >
                <PlayCircle className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* COLUMN 2: QUICK NAVIGATION LINKS */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Sitemap Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleLinkClick(e, '#home')}
                  className="hover:text-amber-500 transition-colors"
                >
                  Home Showcase
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  onClick={(e) => handleLinkClick(e, '#menu')}
                  className="hover:text-amber-500 transition-colors"
                >
                  Explore Sourdough & Menu
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleLinkClick(e, '#about')}
                  className="hover:text-amber-500 transition-colors"
                >
                  Heritage & Head Chef
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  onClick={(e) => handleLinkClick(e, '#gallery')}
                  className="hover:text-amber-500 transition-colors"
                >
                  Dining Gallery & Plates
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                  className="hover:text-amber-500 transition-colors"
                >
                  Table Reservations
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: MENU LINKS QUICK SHORTCUT */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Culinary Selections
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="#menu"
                  onClick={(e) => handleLinkClick(e, '#menu')}
                  className="hover:text-amber-500 transition-colors"
                >
                  Neapolitan Woodfired Pizza
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  onClick={(e) => handleLinkClick(e, '#menu')}
                  className="hover:text-amber-500 transition-colors"
                >
                  Flame-Grilled Angus Burgers
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  onClick={(e) => handleLinkClick(e, '#menu')}
                  className="hover:text-amber-500 transition-colors"
                >
                  Artisanal Slow-Cooked Pasta
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  onClick={(e) => handleLinkClick(e, '#menu')}
                  className="hover:text-amber-500 transition-colors"
                >
                  Molten Cacao & Sweet Desserts
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  onClick={(e) => handleLinkClick(e, '#menu')}
                  className="hover:text-amber-500 transition-colors"
                >
                  Botanical Sparkling Mocktails
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: NEWSLETTER & NEWS SIGNUP */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              The Epicure Letter
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Subscribe to unlock private tasting invites, menu releases, and seasonal reservations before they open to the public.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2 bg-zinc-800 dark:bg-white/5 rounded-xl p-1.5 border border-zinc-750 dark:border-white/10"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="w-full pl-3 bg-transparent border-none text-xs text-white placeholder-zinc-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-linear-to-r from-amber-500 to-rose-500 hover:opacity-90 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider font-mono cursor-pointer transition-opacity"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* FOOTER BOTTOM: COPYRIGHT */}
        <div className="pt-8 border-t border-zinc-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            © {currentYear} Bistro Restaurant LLC. All rights reserved. Designed with meticulous precision.
          </p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Gastronomy Enthusiasts.
          </p>
        </div>
      </div>
    </footer>
  );
}
