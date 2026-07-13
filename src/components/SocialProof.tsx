import { useEffect, useRef, useState } from 'react';
import { TrendingUp, AlertCircle, Target, DollarSign, BarChart2, Share2 } from 'lucide-react';

const stats = [
  { value: '400M+', label: 'Global SMBs', sub: 'addressable market' },
  { value: '9/10', label: 'Startup Potential', sub: 'product score' },
  { value: '$24M', label: 'ARR Potential', sub: 'at 0.01% market share' },
  { value: '6-in-1', label: 'Experts Replaced', sub: 'by one platform' },
];

const problems = [
  { icon: Target, text: 'Which customers to target' },
  { icon: BarChart2, text: 'Which competitors are winning' },
  { icon: DollarSign, text: 'Whether pricing is correct' },
  { icon: TrendingUp, text: 'What growth strategy to follow' },
  { icon: Share2, text: 'Which marketing channels work' },
  { icon: AlertCircle, text: 'What to post on social media' },
];

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function SocialProof() {
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
    <section ref={ref} className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-4xl md:text-5xl font-black text-ink mb-1">{s.value}</div>
              <div className="text-sm font-semibold text-ink">{s.label}</div>
              <div className="text-xs text-brand-neutral mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Problem / Solution split */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Problem side */}
          <div className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <span className="text-xs font-bold tracking-widest uppercase text-red-500 mb-4 block">The Problem</span>
            <h2 className="text-4xl md:text-5xl font-black text-ink leading-tight mb-6">
              Most businesses fail<br />not the product —<br />
              <span className="text-brand-neutral/50">the growth.</span>
            </h2>
            <p className="text-brand-neutral text-base leading-relaxed mb-8">
              Millions of small businesses register every year but struggle because they lack
              the expertise in marketing, analytics, branding, and growth strategy.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {problems.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  <Icon className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="text-sm text-brand-neutral">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Solution side */}
          <div className={`transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <span className="text-xs font-bold tracking-widest uppercase text-primary mb-4 block">The Solution</span>
            <h2 className="text-4xl md:text-5xl font-black text-ink leading-tight mb-6">
              Your AI<br />growth<br />
              <span className="text-primary">co-founder.</span>
            </h2>
            <p className="text-brand-neutral text-base leading-relaxed mb-8">
              Instead of hiring a marketing consultant, SEO expert, analyst, product manager,
              growth hacker, and market researcher — MarketLens provides all of them in one platform.
            </p>
            <div className="space-y-3">
              {[
                { role: 'Marketing Consultant', replaced: true },
                { role: 'SEO Expert', replaced: true },
                { role: 'Business Analyst', replaced: true },
                { role: 'Growth Hacker', replaced: true },
                { role: 'Market Researcher', replaced: true },
                { role: 'Product Manager', replaced: true },
              ].map((item) => (
                <div key={item.role} className="flex items-center gap-3 bg-primary-50 border border-primary-100 rounded-xl px-4 py-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <span className="text-white text-[10px] font-bold">✓</span>
                  </div>
                  <span className="text-sm text-brand-neutral line-through">{item.role}</span>
                  <span className="ml-auto text-xs font-bold text-primary bg-primary-100 px-2 py-0.5 rounded-full">Included</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
