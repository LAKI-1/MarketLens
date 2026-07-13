import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="fixed top-4 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-7xl -translate-x-1/2 transition-all duration-300">
      <div
        className={`mx-auto flex h-16 items-center justify-between rounded-full border px-3 md:px-4 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35)] border-brand-border'
            : 'bg-white/80 backdrop-blur-md shadow-[0_10px_30px_-20px_rgba(15,23,42,0.25)] border-brand-border/80'
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 rounded-full px-1.5 py-1.5 transition-transform duration-200 hover:scale-[1.02]">
          <img
            src="/images/MarketLens.png"
            alt="MarketLens logo"
            className="h-10 w-auto object-contain"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-14 rounded-full bg-white/70 px-2 py-1.5">
          {['Product', 'Features', 'Pricing', 'Company'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="rounded-full px-3 py-2 text-sm text-brand-neutral hover:text-ink font-medium transition-all duration-150 hover:bg-brand-muted"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="text-sm text-brand-neutral hover:text-ink font-medium transition-colors duration-150 px-4 py-2 rounded-full hover:bg-brand-muted">
            Sign in
          </a>
          <a
            href="#"
            className="text-sm font-semibold bg-primary text-white px-5 py-2.5 rounded-full hover:bg-primary-700 transition-all duration-200 flex items-center gap-1.5 shadow-sm"
          >
            Get started <span className="text-xs">→</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-full hover:bg-brand-muted transition-colors"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 rounded-2xl bg-white border border-brand-border px-6 py-4 space-y-3 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35)]">
          {['Product', 'Features', 'Pricing', 'Company'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-ink font-medium py-2 hover:text-primary transition-colors"
            >
              {item}
            </a>
          ))}
          <div className="pt-3 border-t border-brand-border flex flex-col gap-2">
            <a href="#" className="text-sm text-brand-neutral font-medium py-2">Sign in</a>
            <a href="#" className="text-sm font-semibold bg-primary text-white px-5 py-2.5 rounded-full text-center">
              Get started →
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
