import { useEffect, useRef, useState } from 'react';
import { Check, X } from 'lucide-react';

const competitors = [
  { name: 'HubSpot', focus: 'CRM + Marketing' },
  { name: 'Salesforce', focus: 'Enterprise CRM' },
  { name: 'Semrush', focus: 'SEO intelligence' },
  { name: 'Similarweb', focus: 'Market intelligence' },
  { name: 'ActiveCampaign', focus: 'Marketing automation' },
  { name: 'MarketLens', focus: 'AI Growth OS', isUs: true },
];

const capabilities = [
  'Market Intelligence',
  'Competitor Tracking',
  'Growth Roadmap',
  'Marketing Copilot',
  'Customer Segmentation',
  'AI Business Advisor',
  'Digital Twin Simulation',
  'Investor Readiness Score',
];

const matrix: Record<string, boolean[]> = {
  HubSpot:         [false, false, false, true,  true,  false, false, false],
  Salesforce:      [false, false, false, false, true,  false, false, false],
  Semrush:         [true,  true,  false, false, false, false, false, false],
  Similarweb:      [true,  true,  false, false, false, false, false, false],
  ActiveCampaign:  [false, false, false, true,  true,  false, false, false],
  MarketLens:      [true,  true,  true,  true,  true,  true,  true,  true],
};

export default function ComparisonSection() {
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
    <section ref={ref} className="bg-surface py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-primary mb-4 block">Competitive Landscape</span>
          <h2 className="text-4xl md:text-5xl font-black text-ink mb-4">
            Not a CRM. Not SEO.<br />
            <span className="text-primary">An AI Growth OS.</span>
          </h2>
          <p className="text-brand-neutral text-base max-w-xl mx-auto">
            Competitors solve one piece of the puzzle. MarketLens is the only end-to-end growth operating system.
          </p>
        </div>

        <div
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="overflow-x-auto rounded-3xl border border-brand-border bg-white shadow-sm">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-brand-border">
                  <th className="text-left text-xs font-bold text-brand-neutral uppercase tracking-wider px-6 py-4 w-44">Capability</th>
                  {competitors.map((c) => (
                    <th
                      key={c.name}
                      className={`text-center px-4 py-4 ${c.isUs ? 'bg-ink text-white rounded-t-2xl' : ''}`}
                    >
                      <div className={`text-sm font-black ${c.isUs ? 'text-white' : 'text-ink'}`}>{c.name}</div>
                      <div className={`text-[10px] font-medium mt-0.5 ${c.isUs ? 'text-tertiary' : 'text-brand-neutral'}`}>{c.focus}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {capabilities.map((cap, ci) => (
                  <tr key={cap} className={`border-b border-brand-border/50 ${ci % 2 === 0 ? '' : 'bg-surface-alt/50'}`}>
                    <td className="px-6 py-3.5 text-sm font-medium text-ink">{cap}</td>
                    {competitors.map((comp) => {
                      const has = matrix[comp.name][ci];
                      return (
                        <td
                          key={comp.name}
                          className={`text-center px-4 py-3.5 ${comp.isUs ? 'bg-ink' : ''}`}
                        >
                          {has ? (
                            <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${comp.isUs ? 'bg-primary' : 'bg-secondary-100'}`}>
                              <Check className={`w-3.5 h-3.5 ${comp.isUs ? 'text-white' : 'text-secondary-600'}`} strokeWidth={3} />
                            </div>
                          ) : (
                            <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-muted">
                              <X className="w-3.5 h-3.5 text-brand-neutral/40" strokeWidth={3} />
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Benchmark cards */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {[
              { metric: 'Website Traffic', you: '20K', avg: '50K', diff: '-60%', bad: true },
              { metric: 'Conversion Rate', you: '1.8%', avg: '2.6%', diff: '-31%', bad: true },
              { metric: 'Instagram Growth', you: '5%', avg: '12%', diff: '-58%', bad: true },
            ].map((item) => (
              <div key={item.metric} className="bg-white border border-brand-border rounded-3xl p-5">
                <p className="text-xs font-bold text-brand-neutral uppercase tracking-wider mb-3">{item.metric}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-black text-ink">{item.you}</div>
                    <div className="text-xs text-brand-neutral mt-0.5">Your average</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-brand-neutral">{item.avg}</div>
                    <div className="text-xs text-brand-neutral mt-0.5">Competitor avg</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-brand-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '38%' }} />
                  </div>
                  <span className="text-xs font-bold text-red-500">{item.diff}</span>
                </div>
                <p className="text-xs text-primary font-semibold mt-2">MarketLens can close this gap →</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
