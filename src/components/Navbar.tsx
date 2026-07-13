import { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-brand-border' : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:bg-primary-700 transition-colors duration-200">
            <Search className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-lg text-ink">
            Market<span className="text-primary">Lens</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Product', 'Features', 'Pricing', 'Company'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-brand-neutral hover:text-ink font-medium transition-colors duration-150"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="text-sm text-brand-neutral hover:text-ink font-medium transition-colors duration-150 px-4 py-2">
            Sign in
          </a>
          <a
            href="#"
            className="text-sm font-semibold bg-primary text-white px-5 py-2.5 rounded-full hover:bg-primary-700 transition-all duration-200 flex items-center gap-1.5"
          >
            Get started <span className="text-xs">→</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-brand-muted transition-colors"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-brand-border px-6 py-4 space-y-3">
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
