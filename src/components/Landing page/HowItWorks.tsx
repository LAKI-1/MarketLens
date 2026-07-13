import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Register your business',
    description: 'Tell us your industry, catalog, competitors, and channels. Takes 3 minutes.',
  },
  {
    number: '02',
    title: 'Get an AI diagnosis',
    description: 'A category-by-category health score with concrete gaps to close — in under 90 seconds.',
  },
  {
    number: '03',
    title: 'Ship growth, daily',
    description: 'Your AI growth agent posts, pings, and prioritizes — you decide what goes live.',
  },
];

export default function HowItWorks() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="product" className="bg-surface py-24 px-4">
      <div className="max-w-6xl mx-auto" ref={sectionRef}>
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-ink leading-tight">
            From signup to your first win<br /> same day.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`relative bg-white rounded-2xl p-8 border border-brand-border shadow-sm transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span
                className="block text-[64px] font-black leading-none mb-6"
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '2px #4F46E5',
                  opacity: 0.35,
                }}
              >
                {step.number}
              </span>

              <h3 className="text-lg font-bold text-ink mb-3">{step.title}</h3>
              <p className="text-brand-neutral text-sm leading-relaxed">{step.description}</p>

              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-white border border-brand-border rounded-full items-center justify-center shadow-sm">
                  <ArrowRight className="w-3 h-3 text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
