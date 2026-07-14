import { useRegistration } from './RegistrationContext';
import RegistrationLayout from './RegistrationLayout';
import './registration.css';
import Step1AccountCreation from './steps/Step1AccountCreation';
import Step2BusinessBasics from './steps/Step2BusinessBasics';
import Step3BusinessStage from './steps/Step3BusinessStage';
import Step4CompanyProfile from './steps/Step4CompanyProfile';
import Step5Products from './steps/Step5Products';
import Step6OnlinePresence from './steps/Step6OnlinePresence';
import Step7MarketingChannels from './steps/Step7MarketingChannels';
import Step8GrowthGoals from './steps/Step8GrowthGoals';
import Step9Competitors from './steps/Step9Competitors';
import Step10CustomerPersona from './steps/Step10CustomerPersona';
import Step11PainPoints from './steps/Step11PainPoints';
import Step12GrowthAssessment from './steps/Step12GrowthAssessment';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Loader2 } from 'lucide-react';

export default function RegistrationFlow() {
  const { currentStep, setCurrentStep, data, totalSteps, setOwnerId } = useRegistration();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleCredential = async (credential: string) => {
    setError(null);
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: credential,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      if (authData?.user) {
        setOwnerId(authData.user.id);
        // Skip step 1 since Google already created the account — go to step 2
        setCurrentStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err: any) {
      setError(err.message || 'Google sign-up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const validateStep = (step: number): boolean => {
    setError(null);
    switch (step) {
      case 1: {
        const { firstName, lastName, email, password, confirmPassword } = data.personalInfo;
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
          setError('Please fill in all required fields.');
          return false;
        }
        if (password !== confirmPassword) {
          setError('Passwords do not match.');
          return false;
        }
        if (password.length < 8) {
          setError('Password must be at least 8 characters.');
          return false;
        }
        return true;
      }
      case 2: {
        const { businessName, industry, businessStage, businessModel } = data.businessBasics;
        if (!businessName) {
          setError('Please enter your business name.');
          return false;
        }
        if (!industry) {
          setError('Please select an industry.');
          return false;
        }
        if (!businessStage) {
          setError('Please select a business stage.');
          return false;
        }
        if (!businessModel) {
          setError('Please select a business model.');
          return false;
        }
        return true;
      }
      case 3: {
        if (!data.businessBasics.businessStage) {
          setError('Please choose your business stage.');
          return false;
        }
        return true;
      }
      case 5: {
        const invalidProd = data.products.some(p => !p.name);
        if (invalidProd) {
          setError('Please enter a name for all added products.');
          return false;
        }
        return true;
      }
      case 8: {
        if (!data.primaryGoal) {
          setError('Please select a primary growth goal.');
          return false;
        }
        return true;
      }
      default:
        return true;
    }
  };

  const handleContinue = async () => {
    if (loading) return;
    if (!validateStep(currentStep)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setError(null);

    // STEP 1: Supabase Authentication Onboarding
    if (currentStep === 1) {
      if (!data.ownerId) {
        setLoading(true);
        try {
          const { data: userData } = await supabase.auth.getUser();
          const existingOwnerId = userData?.user?.id;

          if (existingOwnerId) {
            setOwnerId(existingOwnerId);
          } else {
            const { email, password, firstName, lastName } = data.personalInfo;
            const { data: authData, error: authError } = await supabase.auth.signUp({
              email,
              password,
              options: {
                data: {
                  first_name: firstName,
                  last_name: lastName,
                },
              },
            });

            if (authError) {
              const message = authError.message.includes('rate limit')
                ? 'Too many sign-up requests. Please wait a few minutes and try again.'
                : authError.message;
              setError(message);
              window.scrollTo({ top: 0, behavior: 'smooth' });
              return;
            }

            if (authData?.user) {
              setOwnerId(authData.user.id);
            }
          }
        } catch (err: any) {
          setError(err.message || 'Sign up registration failed.');
          return;
        } finally {
          setLoading(false);
        }
      }
    }

    // STEP 12: Database save & commit flow
    if (currentStep === totalSteps) {
      setLoading(true);
      try {
        let userId = data.ownerId;
        if (!userId) {
          const { data: userData } = await supabase.auth.getUser();
          userId = userData?.user?.id;
        }

        if (!userId) {
          setError('User session expired. Please reload and register again.');
          return;
        }

        // 1. Insert Business
        const { data: busData, error: busError } = await supabase
          .from('businesses')
          .insert({
            owner_id: userId,
            business_name: data.businessBasics.businessName,
            tagline: data.businessBasics.tagline,
            industry: data.businessBasics.industry,
            business_stage: data.businessBasics.businessStage,
            business_model: data.businessBasics.businessModel,
            country: data.businessBasics.country,
            currency: data.businessBasics.currency,
            company_size: data.companyProfile.companySize || null,
            founded_year: data.companyProfile.foundedYear ? parseInt(data.companyProfile.foundedYear, 10) : null,
            employee_count: data.companyProfile.employeeCount ? parseInt(data.companyProfile.employeeCount, 10) : null,
            annual_revenue: data.companyProfile.annualRevenue || null,
            customer_count: data.companyProfile.customerCount ? parseInt(data.companyProfile.customerCount, 10) : null,
            website_visitors: data.companyProfile.websiteVisitors ? parseInt(data.companyProfile.websiteVisitors, 10) : null,
          })
          .select()
          .single();

        if (busError) {
          setError(`Business insert failed: ${busError.message}`);
          return;
        }

        const businessId = busData.id;

        // 2. Insert Products
        const productsToInsert = data.products
          .filter(p => p.name)
          .map(p => ({
            business_id: businessId,
            name: p.name,
            description: p.description,
            price: p.price ? parseFloat(p.price) : null,
            pricing_model: p.pricingModel || null,
            category: p.category || null,
          }));

        if (productsToInsert.length > 0) {
          const { error: prodError } = await supabase
            .from('products')
            .insert(productsToInsert);
          if (prodError) {
            setError(`Products insert failed: ${prodError.message}`);
            return;
          }
        }

        // 3. Insert Competitors
        const competitorsToInsert = data.competitors
          .filter(c => c.name && c.website)
          .map(c => ({
            business_id: businessId,
            competitor_name: c.name,
            website: c.website,
          }));

        if (competitorsToInsert.length > 0) {
          const { error: compError } = await supabase
            .from('competitors')
            .insert(competitorsToInsert);
          if (compError) {
            setError(`Competitors insert failed: ${compError.message}`);
            return;
          }
        }

        // 4. Insert Growth Goals
        const goalsToInsert = [];
        if (data.primaryGoal) {
          goalsToInsert.push({
            business_id: businessId,
            goal: data.primaryGoal,
            priority: 'primary',
          });
        }
        data.secondaryGoals.forEach(g => {
          goalsToInsert.push({
            business_id: businessId,
            goal: g,
            priority: 'secondary',
          });
        });

        if (goalsToInsert.length > 0) {
          const { error: goalError } = await supabase
            .from('growth_goals')
            .insert(goalsToInsert);
          if (goalError) {
            setError(`Growth goals insert failed: ${goalError.message}`);
            return;
          }
        }

        // 5. Insert Marketing Channels
        const channelsToInsert = data.marketingChannels.map(c => ({
          business_id: businessId,
          channel_name: c,
          is_active: true,
          monthly_budget: null,
        }));

        if (channelsToInsert.length > 0) {
          const { error: chanError } = await supabase
            .from('marketing_channels')
            .insert(channelsToInsert);
          if (chanError) {
            setError(`Marketing channels insert failed: ${chanError.message}`);
            return;
          }
        }

        alert('Congratulations! Your onboarding is complete and saved to Supabase.');
        navigate('/');
      } catch (err: any) {
        setError(err.message || 'An error occurred while saving onboarding metrics.');
      } finally {
        setLoading(false);
      }
    } else {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (loading) return;
    setError(null);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1: return <Step1AccountCreation onGoogleCredential={handleGoogleCredential} />;
      case 2: return <Step2BusinessBasics />;
      case 3: return <Step3BusinessStage />;
      case 4: return <Step4CompanyProfile />;
      case 5: return <Step5Products />;
      case 6: return <Step6OnlinePresence />;
      case 7: return <Step7MarketingChannels />;
      case 8: return <Step8GrowthGoals />;
      case 9: return <Step9Competitors />;
      case 10: return <Step10CustomerPersona />;
      case 11: return <Step11PainPoints />;
      case 12: return <Step12GrowthAssessment />;
      default: return null;
    }
  };

  return (
    <RegistrationLayout
      onBack={handleBack}
      onContinue={handleContinue}
      isFirstStep={currentStep === 1}
      isLastStep={currentStep === totalSteps}
    >
      {loading && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center z-50 rounded-3xl">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <span className="text-sm font-semibold text-ink">Syncing...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-semibold rounded-xl flex items-center gap-2.5 animate-shake">
          <svg className="w-5 h-5 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}
      {renderStepComponent()}
    </RegistrationLayout>
  );
}
