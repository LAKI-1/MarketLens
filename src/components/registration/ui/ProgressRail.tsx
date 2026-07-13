import { Check } from 'lucide-react';

interface ProgressRailProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = [
  'Account',
  'Business',
  'Stage',
  'Company',
  'Products',
  'Presence',
  'Channels',
  'Goals',
  'Competitors',
  'Persona',
  'Pain Points',
  'Assessment',
];

export default function ProgressRail({ currentStep, totalSteps }: ProgressRailProps) {
  return (
    <div className="hidden lg:flex flex-col items-center py-8 px-3 select-none">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;
        const isLast = step === totalSteps;

        return (
          <div key={step} className="flex flex-col items-center">
            {/* Dot */}
            <div className="relative group">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/30 ring-4 ring-primary/10'
                    : 'bg-brand-muted text-brand-neutral/40 border border-brand-border/50'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : step}
              </div>
              {/* Tooltip */}
              <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-ink text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg z-50">
                {stepLabels[i]}
              </span>
            </div>

            {/* Connector line */}
            {!isLast && (
              <div className="w-0.5 h-6 my-0.5">
                <div
                  className={`w-full h-full rounded-full transition-colors duration-300 ${
                    isCompleted ? 'bg-primary' : 'bg-brand-border'
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
