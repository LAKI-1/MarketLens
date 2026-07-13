import { useEffect, useRef, useState } from 'react';
import { Check, Sparkles } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Get started with basic growth insights.',
    features: [
      'Business listing',
      'Basic analytics',
      'Limited AI recommendations',
      '1 competitor tracking',
      'Community support',
    ],
    cta: 'Start free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    description: 'For growing businesses ready to scale.',
    features: [
      'Everything in Free',
      'Marketing recommendations',
      'Competitor tracking (10)',
      'Growth roadmap',
      'Growth analytics',
      'Email support',
    ],
    cta: 'Start 14-day trial',
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '$99',
    period: 'per month',
    description: 'Full AI power for scaling businesses.',
    features: [
      'Everything in Pro',
      'AI marketing generation',
      'Advanced analytics',
      'Customer segmentation',
      'Competitor tracking (50)',
      'AI Business Advisor',
      'Priority support',
    ],
    cta: 'Start 14-day trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'For multi-branch and franchise operations.',
    features: [
      'Everything in Growth',
      'Unlimited competitors',
      'Digital Twin simulation',
      'Custom integrations',
      'Dedicated manager',
      'SLA guarantee',
    ],
    cta: 'Contact sales',
    highlighted: false,
  },
];

export default function Pricing() {
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
    <section id="pricing" ref={ref} className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-primary mb-4 block">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-black text-ink mb-4">
            Simple pricing.<br />Serious growth.
          </h2>
          <p className="text-brand-neutral text-base max-w-xl mx-auto">
            Start free. Upgrade when you're ready. Cancel anytime. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-6 transition-all duration-500 ${
                plan.highlighted
                  ? 'bg-ink text-white shadow-2xl scale-105 lg:scale-110'
                  : 'bg-white border border-brand-border hover:border-primary/30 hover:shadow-lg'
              } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              <h3 className={`text-lg font-black mb-1 ${plan.highlighted ? 'text-white' : 'text-ink'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-5 ${plan.highlighted ? 'text-white/60' : 'text-brand-neutral'}`}>
                {plan.description}
              </p>

              <div className="mb-6">
                <span className={`text-4xl font-black ${plan.highlighted ? 'text-white' : 'text-ink'}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ml-2 ${plan.highlighted ? 'text-white/60' : 'text-brand-neutral'}`}>
                  {plan.period}
                </span>
              </div>

              <button
                className={`w-full text-sm font-bold py-3 rounded-full transition-all duration-200 ${
                  plan.highlighted
                    ? 'bg-primary text-white hover:bg-primary-700 shadow-lg'
                    : 'bg-ink text-white hover:bg-primary'
                }`}
              >
                {plan.cta}
              </button>

              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                      plan.highlighted ? 'bg-primary' : 'bg-secondary-100'
                    }`}>
                      <Check className={`w-2.5 h-2.5 ${plan.highlighted ? 'text-white' : 'text-secondary-600'}`} strokeWidth={3} />
                    </div>
                    <span className={`text-sm ${plan.highlighted ? 'text-white/80' : 'text-brand-neutral'}`}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
