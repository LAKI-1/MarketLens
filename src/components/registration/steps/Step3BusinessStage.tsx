import { useRegistration } from '../RegistrationContext';
import { Lightbulb, Rocket, TrendingUp, Building, Zap, Target, Crown } from 'lucide-react';

const stages = [
  {
    value: 'Idea Stage',
    icon: Lightbulb,
    title: 'Idea Stage',
    description: 'You have a concept but haven\'t built anything yet',
    recommendation: 'Validate market demand before investing resources',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  {
    value: 'MVP',
    icon: Zap,
    title: 'MVP',
    description: 'You have a minimum viable product in development or launched',
    recommendation: 'Focus on early user feedback and product-market fit',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    value: 'Pre-Revenue',
    icon: Target,
    title: 'Pre-Revenue',
    description: 'Product is live but not yet generating consistent revenue',
    recommendation: 'Identify monetization strategies and first paying customers',
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
  },
  {
    value: 'Early Revenue',
    icon: TrendingUp,
    title: 'Early Revenue',
    description: 'Generating initial revenue with a growing customer base',
    recommendation: 'Optimize conversion funnels and reduce customer acquisition cost',
    color: 'from-emerald-500 to-green-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  {
    value: 'Growth',
    icon: Rocket,
    title: 'Growth',
    description: 'Rapidly scaling revenue and team size',
    recommendation: 'Scale operations while maintaining unit economics',
    color: 'from-primary to-indigo-500',
    bgColor: 'bg-primary-50',
    borderColor: 'border-primary-200',
  },
  {
    value: 'Scaling',
    icon: Building,
    title: 'Scaling',
    description: 'Expanding into new markets, products, or geographies',
    recommendation: 'Optimize customer acquisition costs and expand channels',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
  },
  {
    value: 'Mature',
    icon: Crown,
    title: 'Mature Business',
    description: 'Established market position with stable operations',
    recommendation: 'Defend market share and explore adjacent opportunities',
    color: 'from-slate-600 to-slate-800',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
  },
];

export default function Step3BusinessStage() {
  const { data, updateBusinessBasics } = useRegistration();
  const selected = data.businessBasics.businessStage;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-ink">Business Stage</h1>
        <p className="text-brand-neutral mt-2">
          Your stage dramatically changes our AI recommendations. Select the one that best describes where you are today.
        </p>
      </div>

      {/* Stage Cards */}
      <div className="space-y-3">
        {stages.map(stage => {
          const Icon = stage.icon;
          const isSelected = selected === stage.value;

          return (
            <button
              key={stage.value}
              type="button"
              onClick={() => updateBusinessBasics({ businessStage: stage.value })}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 group ${
                isSelected
                  ? `${stage.borderColor} ${stage.bgColor} shadow-md`
                  : 'border-brand-border bg-white hover:border-brand-neutral/20 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${stage.color} text-white shadow-sm`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold ${isSelected ? 'text-ink' : 'text-ink'}`}>{stage.title}</h3>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      isSelected ? 'border-primary bg-primary' : 'border-brand-border'
                    }`}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-brand-neutral mt-0.5">{stage.description}</p>
                  {isSelected && (
                    <div className="mt-3 px-3 py-2 bg-white/80 rounded-lg border border-brand-border/50">
                      <p className="text-xs font-medium text-primary">
                        💡 AI Focus: {stage.recommendation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
