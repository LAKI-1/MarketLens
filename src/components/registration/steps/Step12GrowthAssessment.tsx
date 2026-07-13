import { useEffect, useState } from 'react';
import { useRegistration } from '../RegistrationContext';
import { Brain, Gauge, CheckCircle2 } from 'lucide-react';

interface MetricScore {
  label: string;
  score: number;
  color: string;
  bgColor: string;
}

export default function Step12GrowthAssessment() {
  const { data } = useRegistration();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [scores, setScores] = useState<MetricScore[]>([]);
  const [totalScore, setTotalScore] = useState(0);

  // Generate dynamic, logical mock assessment results based on form input values
  useEffect(() => {
    // 1. Calculate loading simulation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return prev + 4;
      });
    }, 80);

    // 2. Base metrics calculations
    const websiteMultiplier = data.companyProfile.websiteVisitors ? Math.min(Number(data.companyProfile.websiteVisitors) / 10000, 1) : 0.2;
    const customerMultiplier = data.companyProfile.customerCount ? Math.min(Number(data.companyProfile.customerCount) / 1000, 1) : 0.2;
    const channelCount = data.marketingChannels.length;
    const competitorCount = data.competitors.filter(c => c.name && c.website).length;

    // Brand Strength: Based on tagline presence, website presence, and social profiles
    const taglineScore = data.businessBasics.tagline ? 20 : 0;
    const socialCount = Object.values(data.onlinePresence).filter(v => v !== '').length;
    const brandBase = 45 + taglineScore + Math.min(socialCount * 5, 30) + (data.onlinePresence.websiteUrl ? 10 : 0);
    const brandStrength = Math.min(Math.max(Math.round(brandBase), 35), 98);

    // SEO Strength: Website visitors + blog presence + SEO marketing channel choice
    const hasBlog = data.onlinePresence.blogUrl ? 15 : 0;
    const usesSeo = data.marketingChannels.includes('SEO') ? 20 : 0;
    const seoBase = 30 + Math.round(websiteMultiplier * 30) + hasBlog + usesSeo;
    const seoStrength = Math.min(Math.max(seoBase, 25), 95);

    // Customer Acquisition: Based on channel coverage & product profile
    const acquisitionBase = 40 + Math.min(channelCount * 8, 40) + Math.round(customerMultiplier * 20);
    const customerAcquisition = Math.min(Math.max(acquisitionBase, 30), 96);

    // Retention: Based on business model & recurring products
    const model = data.businessBasics.businessModel;
    const hasRecur = data.products.some(p => p.pricingModel === 'Subscription' || p.frequency === 'Monthly' || p.frequency === 'Annual');
    const retentionBase = 50 + (model === 'Subscription' || model === 'SaaS' ? 15 : 0) + (hasRecur ? 20 : 0) - (data.painPoints.includes('High churn') ? 15 : 0);
    const retention = Math.min(Math.max(retentionBase, 40), 98);

    // Pricing Strategy: Category + description length + price structure
    const validPrices = data.products.filter(p => p.price && p.pricingModel).length;
    const pricingBase = 55 + (validPrices * 10) - (data.painPoints.includes('Pricing issues') ? 15 : 0);
    const pricingStrategy = Math.min(Math.max(pricingBase, 45), 95);

    // Competitive Position: Based on competitor analysis input
    const compBase = 50 + Math.min(competitorCount * 12, 35) + (data.primaryGoal === 'Increase Revenue' ? 10 : 0);
    const competitivePosition = Math.min(Math.max(compBase, 40), 97);

    // Final calculations
    const finalScores: MetricScore[] = [
      { label: 'Brand Strength', score: brandStrength, color: 'bg-indigo-600', bgColor: 'bg-indigo-50 border-indigo-100' },
      { label: 'SEO Strength', score: seoStrength, color: 'bg-emerald-500', bgColor: 'bg-emerald-50 border-emerald-100' },
      { label: 'Customer Acquisition', score: customerAcquisition, color: 'bg-blue-500', bgColor: 'bg-blue-50 border-blue-100' },
      { label: 'Retention', score: retention, color: 'bg-violet-500', bgColor: 'bg-violet-50 border-violet-100' },
      { label: 'Pricing Strategy', score: pricingStrategy, color: 'bg-pink-500', bgColor: 'bg-pink-50 border-pink-100' },
      { label: 'Competitive Position', score: competitivePosition, color: 'bg-amber-500', bgColor: 'bg-amber-50 border-amber-100' },
    ];

    const overallScore = Math.round(
      finalScores.reduce((acc, curr) => acc + curr.score, 0) / finalScores.length
    );

    setScores(finalScores);
    setTotalScore(overallScore);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="space-y-8 flex flex-col justify-center min-h-[450px]">
      {loading ? (
        <div className="flex flex-col items-center justify-center space-y-6 py-12 animate-pulse text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary relative">
            <Brain className="w-8 h-8 animate-spin" />
            <div className="absolute inset-0 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-ink">Analyzing Market Context...</h2>
            <p className="text-sm text-brand-neutral max-w-sm">
              Our growth engine is compiling data models, scanning online footprints, and generating localized competitor scores.
            </p>
          </div>
          <div className="w-64 h-2 bg-brand-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-bold text-primary">{progress}% Complete</span>
        </div>
      ) : (
        <div className="space-y-8 animate-fadeIn">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-ink">AI Growth Assessment Complete</h1>
            <p className="text-brand-neutral max-w-lg mx-auto">
              MarketLens has calibrated your business metrics. Your growth indicators have been mapped successfully.
            </p>
          </div>

          {/* Big Score Card */}
          <div className="bg-gradient-to-br from-primary to-indigo-700 text-white rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/5 rounded-full pointer-events-none" />
            
            <div className="space-y-3 relative z-10 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Gauge className="w-3.5 h-3.5" />
                Growth Score
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">MarketLens Calibration</h2>
              <p className="text-white/80 text-sm max-w-md">
                Based on your business model, scale, and targets, you are performing in the top 35% of your industry peer cohort.
              </p>
            </div>

            <div className="flex-shrink-0 flex items-center justify-center w-36 h-36 rounded-full bg-white/10 ring-8 ring-white/5 relative">
              <div className="text-center">
                <span className="text-5xl font-black">{totalScore}</span>
                <span className="text-white/60 text-xs block font-bold mt-0.5">/ 100</span>
              </div>
            </div>
          </div>

          {/* Breakdown Scores */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-ink flex items-center gap-2">
              <CheckCircle2 className="w-4.5 h-4.5 text-primary" />
              Core Indicator Scores
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {scores.map(s => (
                <div
                  key={s.label}
                  className={`border rounded-2xl p-4 flex flex-col gap-2 shadow-sm ${s.bgColor}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-ink">{s.label}</span>
                    <span className="text-sm font-bold text-ink">{s.score}/100</span>
                  </div>
                  <div className="h-2 bg-brand-border/60 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${s.color} transition-all duration-1000`}
                      style={{ width: `${s.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
