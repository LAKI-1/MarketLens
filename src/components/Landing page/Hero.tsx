import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Users, Activity, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const floatingBadges = [
  { icon: TrendingUp, label: '+18% MRR', color: 'bg-secondary', textColor: 'text-white', position: 'top-[28%] left-[8%]', delay: '0s' },
  { icon: Activity, label: 'Health 82', color: 'bg-tertiary', textColor: 'text-white', position: 'top-[22%] right-[8%]', delay: '0.4s' },
  { icon: Zap, label: '3 rivals ↑', color: 'bg-ink', textColor: 'text-white', position: 'bottom-[32%] left-[10%]', delay: '0.8s' },
  { icon: Users, label: '+2.4k users', color: 'bg-secondary', textColor: 'text-white', position: 'bottom-[22%] right-[6%]', delay: '1.2s' },
];

const healthMetrics = [
  { label: 'Branding', value: 65, color: '#4F46E5' },
  { label: 'SEO', value: 40, color: '#4F46E5' },
  { label: 'Retention', value: 55, color: '#4F46E5' },
];

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [barWidths, setBarWidths] = useState([0, 0, 0]);
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
      setBarWidths([65, 40, 55]);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-surface-bg flex flex-col">
      {/* Background city image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-city.jpg"
          alt="City background"
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(1.05) contrast(0.95)' }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-white/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-white/40" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center flex-1 pt-24 pb-24 px-4">

        {/* Eyebrow */}
        {/* <div
          className={`transition-all duration-700 delay-100 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <span className="inline-flex items-center gap-2 bg-white/90 border border-brand-border text-brand-neutral text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm mb-6 tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            AI-Powered Growth Operating System
          </span>
        </div> */}

        {/* Headline */}
        <div
          className={`text-center transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="text-brand-neutral text-lg md:text-xl font-medium mb-2 tracking-wide">Discover your next</p>
          <h1 className="text-6xl md:text-8xl lg:text-8xl font-black text-ink leading-none tracking-tight">
            GROWTH<br />ENGINE
          </h1>
        </div>

        {/* Mobile mockup with floating badges */}
        <div className="relative w-full max-w-5xl flex items-center justify-center mt-6">

          {/* Floating badges */}
          {floatingBadges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <div
                key={i}
                className={`absolute ${badge.position} hidden md:flex items-center gap-2 ${badge.color} ${badge.textColor} text-xs font-bold px-4 py-2 rounded-full shadow-lg`}
                style={{
                  animation: `floatBadge 3s ease-in-out infinite`,
                  animationDelay: badge.delay,
                  opacity: loaded ? 1 : 0,
                  transition: `opacity 0.6s ease ${badge.delay}`,
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                {badge.label}
              </div>
            );
          })}

          {/* Phone mockup */}
          <div
            className={`relative transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}
            style={{ filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.18))' }}
          >
            <div className="w-64 md:w-72 bg-white rounded-[2.5rem] border-4 border-ink overflow-hidden">
              {/* Phone top bar */}
              <div className="bg-white h-10 relative flex items-center px-5">
                <div className="absolute left-1/2 -translate-x-1/2 w-20 h-4 bg-ink-deep rounded-full" />
                  <div className="flex items-center gap-2 ml-auto">
                    {/* Right content */}
                  </div>
                </div>

              {/* Phone content */}
              <div className="bg-white p-5">
                {/* Health score */}
                <div className="mb-4">
                  <p className="text-brand-neutral/60 text-[10px] font-bold tracking-widest uppercase mb-1">Health Score</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-ink">58</span>
                    <span className="text-secondary text-sm font-bold">+6 this week</span>
                  </div>
                </div>

                {/* Metrics bars */}
                <div className="space-y-3 mb-5">
                  {healthMetrics.map((m, i) => (
                    <div key={m.label}>
                      <div className="flex justify-between mb-1">
                        <span className="text-brand-neutral text-xs">{m.label}</span>
                        <span className="text-ink text-xs font-semibold">{m.value}</span>
                      </div>
                      <div className="h-1.5 bg-brand-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${barWidths[i]}%`,
                            background: m.color,
                            transitionDelay: `${0.8 + i * 0.2}s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Today's win */}
                <div className="bg-ink rounded-2xl px-4 py-3">
                  <p className="text-white/60 text-[9px] font-bold tracking-widest uppercase mb-1">Today's Win</p>
                  <p className="text-white text-xs font-semibold leading-tight">
                    Publish 3 posts → +$1.2k projected
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Email CTA */}
        <div
          className={`mt-10 transition-all duration-700 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <input
              type="email"
              placeholder="you@company.com"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              className="w-72 sm:w-64 bg-white/90 backdrop-blur-sm border border-brand-border rounded-full px-5 py-3 text-sm text-ink placeholder-brand-neutral/60 outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm transition-all"
            />
            <button
              onClick={() => navigate('/register', { state: { email: emailValue } })}
              className="bg-ink text-white text-sm font-bold px-7 py-3 rounded-full hover:bg-primary transition-all duration-200 shadow-lg hover:shadow-primary/30 flex items-center gap-2 whitespace-nowrap"
            >
              Start free <span>→</span>
            </button>
          </div>
          <p className="text-center text-brand-neutral/60 text-xs mt-3">No credit card required · Free plan forever</p>
        </div>
      </div>
    </section>
  );
}
