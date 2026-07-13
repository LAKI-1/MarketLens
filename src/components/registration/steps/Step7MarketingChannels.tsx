import { useRegistration } from '../RegistrationContext';
import { Search, Compass, Mail, Users, UserCheck, Share2, Layers, CheckCircle2, Tv } from 'lucide-react';

const channels = [
  { id: 'SEO', label: 'Search Engine Optimization (SEO)', desc: 'Organic traffic search rankings', icon: Search, color: 'text-emerald-500 bg-emerald-50 border-emerald-100' },
  { id: 'Google Ads', label: 'Google Search & Display Ads', desc: 'Paid search CPC campaigns', icon: Compass, color: 'text-blue-500 bg-blue-50 border-blue-100' },
  { id: 'Facebook Ads', label: 'Facebook Retargeting & Lead Ads', desc: 'Social feed demographic targeting', icon: Share2, color: 'text-indigo-500 bg-indigo-50 border-indigo-100' },
  { id: 'Instagram Marketing', label: 'Instagram Content & Stories', desc: 'Visual brand storytelling & community', icon: CheckCircle2, color: 'text-pink-500 bg-pink-50 border-pink-100' },
  { id: 'TikTok Marketing', label: 'TikTok Short-form Video', desc: 'Trending creative content & virality', icon: Layers, color: 'text-slate-900 bg-slate-100 border-slate-200' },
  { id: 'Email Marketing', label: 'Email Newsletters & Automations', desc: 'Direct audience engagement & nurture', icon: Mail, color: 'text-orange-500 bg-orange-50 border-orange-100' },
  { id: 'Referral Marketing', label: 'Referral & Word of Mouth', desc: 'Viral loop peer recommendations', icon: Users, color: 'text-purple-500 bg-purple-50 border-purple-100' },
  { id: 'Influencer Marketing', label: 'Influencer Partnerships', desc: 'Creator promotions & sponsorships', icon: UserCheck, color: 'text-rose-500 bg-rose-50 border-rose-100' },
  { id: 'Affiliate Marketing', label: 'Affiliate Networks & Partners', desc: 'Performance-based partner marketing', icon: Users, color: 'text-teal-500 bg-teal-50 border-teal-100' },
  { id: 'Offline Marketing', label: 'Offline / Event / Print Marketing', desc: 'Banners, conferences, print advertising', icon: Tv, color: 'text-amber-500 bg-amber-50 border-amber-100' },
];

export default function Step7MarketingChannels() {
  const { data, toggleMarketingChannel } = useRegistration();
  const selected = data.marketingChannels;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-ink">Marketing Channels</h1>
        <p className="text-brand-neutral mt-2">
          Select the active channels you currently use or intend to deploy soon.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {channels.map(chan => {
          const Icon = chan.icon;
          const isActive = selected.includes(chan.id);

          return (
            <button
              key={chan.id}
              type="button"
              onClick={() => toggleMarketingChannel(chan.id)}
              className={`w-full text-left p-4 rounded-xl border-2 flex gap-4 items-start transition-all duration-200 ${
                isActive
                  ? 'border-primary bg-primary/5 shadow-md shadow-primary/5'
                  : 'border-brand-border bg-white hover:border-brand-neutral/20 hover:shadow-sm'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${chan.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-ink text-sm sm:text-base leading-tight truncate">
                    {chan.id}
                  </h3>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                    isActive ? 'border-primary bg-primary' : 'border-brand-border'
                  }`}>
                    {isActive && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <p className="text-xs text-brand-neutral mt-1 line-clamp-2 leading-relaxed">
                  {chan.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
