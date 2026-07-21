import { ReactNode } from 'react';
import { useRegistration } from './RegistrationContext';
import ProgressRail from './ui/ProgressRail';
import StepSidebar from './ui/StepSidebar';
import { HelpCircle, ChevronLeft, ArrowRight, ShieldCheck, Sparkles, Building, Rocket, Share2, Target, HeartCrack } from 'lucide-react';

interface RegistrationLayoutProps {
  children: ReactNode;
  onBack: () => void;
  onContinue: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export default function RegistrationLayout({
  children,
  onBack,
  onContinue,
  isFirstStep,
  isLastStep,
}: RegistrationLayoutProps) {
  const { currentStep, totalSteps } = useRegistration();

  const handleHelpClick = () => {
    alert("MarketLens Calibration Help:\nFill out each section with accurate details. The more precise the data, the more accurate the AI Growth Assessment recommendations will be.");
  };

  // Content configuration for the right sidebar per step
  const getSidebarContent = (step: number) => {
    switch (step) {
      case 1:
        return {
          title: 'Why create an account?',
          imageSrc: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80',
          imageLabel: 'Secure Gateway',
          imageSubLabel: 'Setting up your credentials.',
          items: [
            {
              icon: <ShieldCheck className="w-4 h-4" />,
              title: 'Enterprise Security',
              description: 'We use industry-grade hashing protocols to secure all login records and credentials.',
            },
            {
              icon: <Sparkles className="w-4 h-4" />,
              title: 'AI Tailoring Initialized',
              description: 'Your profile starts mapping intelligence tags straight from the first input field.',
            },
          ],
        };
      case 2:
        return {
          title: 'Why this matters?',
          imageSrc: 'https://www.stellarcontent.com/wp-content/uploads/content-calibration-phase-featured-image-min.jpg',
          imageLabel: 'Calibration Phase',
          imageSubLabel: 'Setting your strategic foundation.',
          items: [
            {
              icon: <Rocket className="w-4 h-4" />,
              title: 'Model Precision',
              description: 'The AI adjusts its growth algorithms based on your business model (e.g., B2B vs B2C) to ensure relevant advice.',
            },
            {
              icon: <Sparkles className="w-4 h-4" />,
              title: 'Peer Benchmarking',
              description: 'Your industry selection unlocks specific competitor sets and market-average performance KPIs.',
            },
            {
              icon: <GlobeIcon className="w-4 h-4" />,
              title: 'Global Context',
              description: 'Regional data helps us adjust for local economic trends, tax structures, and currency fluctuations.',
            },
          ],
        };
      case 3:
        return {
          title: 'Understanding Stages',
          imageSrc: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
          imageLabel: 'Strategic Phase Alignment',
          imageSubLabel: 'Tailoring growth models.',
          items: [
            {
              icon: <Rocket className="w-4 h-4" />,
              title: 'Dynamic Recommendations',
              description: 'An Idea Stage business gets guidance on validation, whereas a Scaling Stage business receives acquisition optimization strategies.',
            },
          ],
        };
      case 4:
        return {
          title: 'Why audit company metrics?',
          imageSrc: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
          imageLabel: 'Operational Diagnostics',
          imageSubLabel: 'Scale and scope calibration.',
          items: [
            {
              icon: <Building className="w-4 h-4" />,
              title: 'Cohort Placement',
              description: 'We position your metrics within cohorts of similar founded years, annual revenues, and employee counts.',
            },
            {
              icon: <ShieldCheck className="w-4 h-4" />,
              title: 'B2B Regulatory Onboarding',
              description: 'Optional enterprise details like tax/VAT numbers secure legal status verification early.',
            },
          ],
        };
      case 5:
        return {
          title: 'Product Mapping',
          imageSrc: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
          imageLabel: 'Value Proposition',
          imageSubLabel: 'Defining your core assets.',
          items: [
            {
              icon: <Sparkles className="w-4 h-4" />,
              title: 'Core Architecture Analysis',
              description: 'Pricing models (Freemium, Subscription) indicate customer lifetime value targets and optimization paths.',
            },
          ],
        };
      case 6:
        return {
          title: 'Digital Footprint Scanning',
          imageSrc: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&auto=format&fit=crop&q=80',
          imageLabel: 'Brand Footprint',
          imageSubLabel: 'Connecting your channels.',
          items: [
            {
              icon: <Share2 className="w-4 h-4" />,
              title: 'SEO & Content Crawls',
              description: 'MarketLens audits your public site content structure and social posts to index brand sentiment.',
            },
          ],
        };
      case 7:
        return {
          title: 'Marketing Distribution',
          imageSrc: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80',
          imageLabel: 'Traffic Optimization',
          imageSubLabel: 'Where you meet your users.',
          items: [
            {
              icon: <Share2 className="w-4 h-4" />,
              title: 'Multi-Channel Strategy',
              description: 'We compare active marketing channels (SEO, Ads) with high-performing strategies in your industry.',
            },
          ],
        };
      case 8:
        return {
          title: 'Strategic Priorities',
          imageSrc: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop&q=80',
          imageLabel: 'Objective Setup',
          imageSubLabel: 'Directing the AI compass.',
          items: [
            {
              icon: <Target className="w-4 h-4" />,
              title: 'Target Calibration',
              description: 'AI dashboards adjust priority panels, highlighting checklists aligned directly with your primary goal.',
            },
          ],
        };
      case 9:
        return {
          title: 'Competitor Tracking',
          imageSrc: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=600&auto=format&fit=crop&q=80',
          imageLabel: 'Competitive Intelligence',
          imageSubLabel: 'Real-time market insights.',
          items: [
            {
              icon: <Sparkles className="w-4 h-4" />,
              title: 'Rivalry Indexing',
              description: 'We analyze competitor sites for organic rankings, traffic volumes, and performance gaps.',
            },
          ],
        };
      case 10:
        return {
          title: 'Persona Profiling',
          imageSrc: 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=600&auto=format&fit=crop&q=80',
          imageLabel: 'User Personas',
          imageSubLabel: 'Empathizing with customers.',
          items: [
            {
              icon: <Target className="w-4 h-4" />,
              title: 'Behavioral Insights',
              description: 'Knowing age, income, roles, or location maps acquisition channels that target the highest-affinity users.',
            },
          ],
        };
      case 11:
        return {
          title: 'Diagnosing Bottlenecks',
          imageSrc: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&auto=format&fit=crop&q=80',
          imageLabel: 'Pain Diagnostics',
          imageSubLabel: 'Overcoming friction.',
          items: [
            {
              icon: <HeartCrack className="w-4 h-4" />,
              title: 'Immediate AI Focus',
              description: 'Selected pain points are placed at the top of your dashboard checklist, with corresponding playbooks loaded instantly.',
            },
          ],
        };
      case 12:
        return {
          title: 'Calibration Success',
          imageSrc: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80',
          imageLabel: 'All Set!',
          imageSubLabel: 'AI Assessment compiled.',
          items: [
            {
              icon: <Sparkles className="w-4 h-4" />,
              title: 'Ready for Launch',
              description: 'Press the Dashboard button to explore your customized Growth OS checklists, benchmarks, and analytics.',
            },
          ],
        };
      default:
        return {};
    }
  };

  const sidebarData = getSidebarContent(currentStep);

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-brand-border h-16 px-4 md:px-8 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <img src="/images/MarketLens.png" alt="MarketLens" className="h-9 w-auto object-contain" />
          <span className="bg-primary/5 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Growth OS
          </span>
        </div>

        <div className="flex items-center gap-5">
          {/* Step Count Progress Indicator */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-ink uppercase tracking-wide">
              Step {currentStep} of {totalSteps}
            </span>
            <div className="w-20 md:w-28 h-2 bg-brand-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 rounded-full"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleHelpClick}
            className="text-brand-neutral hover:text-ink transition-colors"
            title="Get Help"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto p-4 md:p-8 gap-8 items-start justify-center">
        {/* Left Vertical Progress Rail */}
        <ProgressRail currentStep={currentStep} totalSteps={totalSteps} />

        {/* Central Card Form Panel */}
        <div className="flex-1 max-w-3xl bg-white border border-brand-border rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/50 flex flex-col min-h-[550px] relative">
          {/* Form Children Content */}
          <div className="flex-1 mb-8 animate-stepIn">
            {children}
          </div>

          {/* Navigation Buttons Row */}
          <div className="flex items-center justify-between pt-6 border-t border-brand-border/50 bg-white z-10">
            {!isFirstStep ? (
              <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-2 text-sm font-bold text-brand-neutral hover:text-ink px-4 py-3 rounded-xl transition-colors hover:bg-surface"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={onContinue}
              className="flex items-center gap-2 bg-primary text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-primary-700 transition-all duration-200 shadow-md shadow-primary/10 hover:shadow-primary/20"
            >
              <span>{isLastStep ? 'Complete Setup' : 'Continue'}</span>
              {!isLastStep && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Right Sidebar panel */}
        <StepSidebar
          imageSrc={sidebarData.imageSrc}
          imageLabel={sidebarData.imageLabel}
          imageSubLabel={sidebarData.imageSubLabel}
          title={sidebarData.title}
          items={sidebarData.items}
        />
      </div>
    </div>
  );
}

// Inline fallback for Globe Icon to prevent import issue
function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
