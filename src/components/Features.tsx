import { useEffect, useRef, useState } from 'react';
import {
  Building2, Globe, Eye, Lightbulb, PenTool, LineChart,
  Users, BarChart2, MessageSquare, TrendingUp
} from 'lucide-react';

const features = [
  {
    icon: Building2,
    tag: '6.1',
    title: 'Business Registration Portal',
    description: 'Showcase your products, team, services, reviews, and pricing. Acts as your business directory, startup listing, and company profile.',
    highlight: 'Directory + Profile',
    color: 'primary',
  },
  {
    icon: Globe,
    tag: '6.2',
    title: 'Market Intelligence',
    description: 'Get market size, growth rates, emerging trends, and demand forecasting. Know before your competitors do.',
    highlight: '+22% AI resume growth',
    color: 'secondary',
  },
  {
    icon: Eye,
    tag: '6.3',
    title: 'Competitor Intelligence',
    description: 'Track competitor pricing changes, new products, website updates, marketing campaigns, and social media growth in real time.',
    highlight: 'Live tracking',
    color: 'tertiary',
  },
  {
    icon: Lightbulb,
    tag: '6.4',
    title: 'Growth Recommendation Engine',
    description: 'AI-suggested SEO improvements, marketing campaigns, product improvements, and pricing changes ranked by revenue impact.',
    highlight: 'AI-ranked priorities',
    color: 'primary',
  },
  {
    icon: PenTool,
    tag: '6.5',
    title: 'Marketing Copilot',
    description: 'Generate Instagram posts, blog articles, product descriptions, email campaigns, and ad copies in seconds.',
    highlight: '5 content types',
    color: 'secondary',
  },
  {
    icon: LineChart,
    tag: '6.6',
    title: 'Product Growth Analytics',
    description: 'Track CAC, LTV, conversion rate, churn rate, and retention rate — all in one unified dashboard.',
    highlight: 'CAC · LTV · Churn',
    color: 'tertiary',
  },
  {
    icon: Users,
    tag: '6.7',
    title: 'Customer Segmentation',
    description: 'Identify high-value customers, at-risk customers, and loyal advocates. Make every marketing dollar count.',
    highlight: '3 segment types',
    color: 'primary',
  },
  {
    icon: BarChart2,
    tag: '6.8',
    title: 'Competitor Benchmarking',
    description: 'Compare your traffic, conversion rate, and social growth side-by-side against industry averages and top competitors.',
    highlight: 'vs. competitor avg',
    color: 'secondary',
  },
  {
    icon: MessageSquare,
    tag: '6.9',
    title: 'AI Business Advisor',
    description: 'Ask anything: "Why are sales dropping?", "Which market should I enter?", "Which product to discontinue?" — get data-backed answers.',
    highlight: 'Chat interface',
    color: 'tertiary',
  },
  {
    icon: TrendingUp,
    tag: '6.10',
    title: 'Investor Readiness Score',
    description: 'Measure growth, revenue, product-market fit, and retention. Get a fundraising readiness report for your next round.',
    highlight: 'PMF · Revenue · Growth',
    color: 'primary',
  },
];

const colorMap: Record<string, { iconBg: string; iconColor: string; tagColor: string; highlightBg: string; highlightText: string }> = {
  primary:   { iconBg: 'bg-primary-50',   iconColor: 'text-primary-600',   tagColor: 'text-primary-400',   highlightBg: 'bg-primary-50',   highlightText: 'text-primary-700' },
  secondary: { iconBg: 'bg-secondary-50',  iconColor: 'text-secondary-600', tagColor: 'text-secondary-600', highlightBg: 'bg-secondary-50',  highlightText: 'text-secondary-600' },
  tertiary:  { iconBg: 'bg-tertiary-50',   iconColor: 'text-tertiary-500',  tagColor: 'text-tertiary-500',  highlightBg: 'bg-tertiary-50',   highlightText: 'text-tertiary-500' },
};

export default function Features() {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(features.length).fill(false));
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemRefs.current.map((el, i) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <section id="features" className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-primary mb-4 block">Platform Features</span>
          <h2 className="text-4xl md:text-5xl font-black text-ink mb-4">
            Everything you need<br />to dominate your market.
          </h2>
          <p className="text-brand-neutral text-base max-w-xl mx-auto">
            Ten powerful modules working together as your complete AI growth operating system.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            const c = colorMap[f.color];
            return (
              <div
                key={f.tag}
                ref={(el) => { itemRefs.current[i] = el; }}
                className={`group bg-white border border-brand-border rounded-3xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-500 cursor-default ${
                  visibleItems[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-2xl ${c.iconBg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${c.iconColor}`} />
                  </div>
                  <span className={`text-xs font-bold ${c.tagColor}`}>{f.tag}</span>
                </div>
                <h3 className="text-base font-black text-ink mb-2 leading-tight">{f.title}</h3>
                <p className="text-brand-neutral text-sm leading-relaxed mb-4">{f.description}</p>
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${c.highlightBg} ${c.highlightText}`}>
                  {f.highlight}
                </span>
              </div>
            );
          })}

          {/* Digital Twin spotlight card */}
          <div
            ref={(el) => { itemRefs.current[10] = el; }}
            className={`md:col-span-2 lg:col-span-3 bg-ink rounded-3xl p-8 transition-all duration-500 ${
              visibleItems[10] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '240ms' }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <span className="text-xs font-bold tracking-widest uppercase text-tertiary mb-3 block">Unique Feature</span>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3">AI Growth Digital Twin</h3>
                <p className="text-white/60 text-sm leading-relaxed max-w-xl">
                  Create a digital model of your business and simulate strategic decisions before committing.
                  Forecast revenue impact, customer growth, and risk level for any scenario.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 md:w-72 shrink-0">
                {[
                  'Price increase by 10%',
                  'Launch in new country',
                  'Run TikTok campaign',
                  'Hire 5 employees',
                ].map((scenario) => (
                  <div key={scenario} className="bg-white/10 rounded-2xl px-4 py-3 border border-white/10 hover:bg-white/15 transition-colors cursor-default">
                    <span className="text-white text-xs font-semibold leading-tight block">{scenario}</span>
                    <span className="text-tertiary text-[10px] mt-1 block">Simulate →</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
