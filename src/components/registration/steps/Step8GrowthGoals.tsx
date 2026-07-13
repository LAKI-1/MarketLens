import { useRegistration } from '../RegistrationContext';

const goals = [
  { id: 'Increase Revenue', title: 'Increase Revenue', desc: 'Focus on monetization, upselling, and gross margin optimization.' },
  { id: 'Acquire Customers', title: 'Acquire Customers', desc: 'Scale conversion channels and customer acquisition loops.' },
  { id: 'Improve Retention', title: 'Improve Retention', desc: 'Minimize churn, increase lifetime value, and build loyalty.' },
  { id: 'Improve Branding', title: 'Improve Branding', desc: 'Enhance public relations, design aesthetic, and brand sentiment.' },
  { id: 'Launch New Product', title: 'Launch New Product', desc: 'R&D testing, market validation, and roll-out coordination.' },
  { id: 'Expand Internationally', title: 'Expand Internationally', desc: 'Localization, regional regulatory compliance, and distribution.' },
  { id: 'Reduce Churn', title: 'Reduce Churn', desc: 'Nurture relationships, improve customer success, and product engagement.' },
];

export default function Step8GrowthGoals() {
  const { data, setPrimaryGoal, toggleSecondaryGoal } = useRegistration();
  const { primaryGoal, secondaryGoals } = data;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-ink">Growth Goals</h1>
        <p className="text-brand-neutral mt-2">
          Tell us about your strategic focus areas. We prioritize recommendations aligned with your primary goal.
        </p>
      </div>

      {/* Primary Goal Section */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-ink flex items-center gap-2">
          <span className="w-1.5 h-4 bg-primary rounded-full" />
          Select Primary Goal (Choose One)
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {goals.map(goal => {
            const isSelected = primaryGoal === goal.id;
            return (
              <button
                key={goal.id}
                type="button"
                onClick={() => setPrimaryGoal(goal.id)}
                className={`w-full text-left p-4 rounded-xl border-2 flex items-center justify-between transition-all duration-200 ${
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-md shadow-primary/5'
                    : 'border-brand-border bg-white hover:border-brand-neutral/20'
                }`}
              >
                <div className="min-w-0 pr-4">
                  <span className="font-semibold text-ink text-sm sm:text-base block">{goal.title}</span>
                  <span className="text-xs text-brand-neutral mt-0.5 block truncate sm:whitespace-normal">
                    {goal.desc}
                  </span>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  isSelected ? 'border-primary bg-primary' : 'border-brand-border'
                }`}>
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Goals Section */}
      {primaryGoal && (
        <div className="space-y-4 pt-4 border-t border-brand-border/50 animate-fadeIn">
          <h2 className="text-base font-semibold text-ink flex items-center gap-2">
            <span className="w-1.5 h-4 bg-primary rounded-full" />
            Select Secondary Goals (Optional - Multiple selection)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {goals
              .filter(g => g.id !== primaryGoal)
              .map(goal => {
                const isSelected = secondaryGoals.includes(goal.id);
                return (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => toggleSecondaryGoal(goal.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 flex items-start gap-3 transition-all duration-200 ${
                      isSelected
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-brand-border bg-white hover:border-brand-neutral/20'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      isSelected ? 'border-primary bg-primary' : 'border-brand-border'
                    }`}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <span className="font-semibold text-ink text-sm block leading-tight">{goal.title}</span>
                      <span className="text-xs text-brand-neutral mt-1 block leading-relaxed">{goal.desc}</span>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
