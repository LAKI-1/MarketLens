import { useEffect, useRef, useState } from 'react';
import { Twitter, Linkedin, Github, ArrowRight } from 'lucide-react';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Integrations', 'Changelog', 'Roadmap'],
  Company: ['About', 'Blog', 'Careers', 'Press', 'Contact'],
  Resources: ['Documentation', 'API Reference', 'Community', 'Tutorials', 'Webinars'],
  Legal: ['Privacy', 'Terms', 'Security', 'GDPR', 'Cookies'],
};

export default function Footer() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={ref} className="bg-surface">
      {/* CTA Band */}
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        <div
          className={`relative bg-ink rounded-[2.5rem] p-12 md:p-16 overflow-hidden transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Decorative gradient */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
                Your AI growth<br />co-founder is here.
              </h2>
              <p className="text-white/60 text-base leading-relaxed">
                Join thousands of businesses growing smarter with MarketLens. Register in minutes see your growth roadmap today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="#"
                className="bg-white text-ink text-sm font-bold px-7 py-3.5 rounded-full hover:bg-surface-alt transition-all flex items-center gap-2 whitespace-nowrap"
              >
                Start free <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="bg-white/10 text-white text-sm font-bold px-7 py-3.5 rounded-full hover:bg-white/20 transition-all border border-white/20 whitespace-nowrap"
              >
                Book a demo
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Logo column */}
          <div className="col-span-2">
            <a href="#" className="flex items-center mb-4">
              <img
                src="/images/MarketLens.png"
                alt="MarketLens logo"
                className="h-10 w-auto object-contain"
              />
            </a>
            <p className="text-sm text-brand-neutral leading-relaxed max-w-xs">
              The AI-powered growth operating system for businesses of every size.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white border border-brand-border flex items-center justify-center hover:bg-ink hover:border-ink transition-all group"
                >
                  <Icon className="w-4 h-4 text-brand-neutral group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold tracking-widest uppercase text-ink mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-brand-neutral hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-brand-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-neutral">
            © 2026 Lifinity. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-brand-neutral">Built for 400M+ businesses worldwide</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs text-brand-neutral">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
