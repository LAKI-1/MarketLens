import { Building2, Globe } from 'lucide-react';
import FormField, { Input } from '../ui/FormField';
import SelectDropdown from '../ui/SelectDropdown';
import { useRegistration } from '../RegistrationContext';

const industries = [
  'SaaS', 'E-commerce', 'Retail', 'Restaurant', 'Healthcare',
  'Education', 'Finance', 'Manufacturing', 'Consulting', 'Agency', 'Logistics',
].map(v => ({ label: v, value: v }));

const stages = [
  'Idea Stage', 'MVP', 'Pre-Revenue', 'Early Revenue', 'Growth', 'Scaling', 'Mature',
].map(v => ({ label: v, value: v }));

const models = [
  'B2B', 'B2C', 'B2B2C', 'D2C', 'Marketplace', 'SaaS', 'Subscription', 'Franchise',
].map(v => ({ label: v, value: v }));

const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
  'France', 'India', 'Japan', 'Brazil', 'Singapore', 'Netherlands',
  'Sweden', 'South Korea', 'UAE', 'Sri Lanka',
].map(v => ({ label: v, value: v }));

const currencies = [
  { label: 'USD ($)', value: 'USD ($)' },
  { label: 'EUR (€)', value: 'EUR (€)' },
  { label: 'GBP (£)', value: 'GBP (£)' },
  { label: 'CAD (C$)', value: 'CAD (C$)' },
  { label: 'AUD (A$)', value: 'AUD (A$)' },
  { label: 'JPY (¥)', value: 'JPY (¥)' },
  { label: 'INR (₹)', value: 'INR (₹)' },
  { label: 'LKR (Rs)', value: 'LKR (Rs)' },
];

export default function Step2BusinessBasics() {
  const { data, updateBusinessBasics } = useRegistration();
  const { businessBasics } = data;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-ink">Business Basics</h1>
        <p className="text-brand-neutral mt-2">Tell us about your core operations to help our AI understand your market context.</p>
      </div>

      {/* Identity Section */}
      <div className="space-y-5">
        <div className="flex items-center gap-2 text-primary">
          <Building2 className="w-5 h-5" />
          <h2 className="text-base font-semibold">Identity</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Business Name">
            <Input
              placeholder="e.g. Acme Growth Lab"
              value={businessBasics.businessName}
              onChange={e => updateBusinessBasics({ businessName: e.target.value })}
            />
          </FormField>
          <FormField label="Company Tagline">
            <Input
              placeholder="e.g. Accelerating Tomorrow"
              value={businessBasics.tagline}
              onChange={e => updateBusinessBasics({ tagline: e.target.value })}
            />
          </FormField>
        </div>
      </div>

      {/* Classification Section */}
      <div className="space-y-5">
        <div className="flex items-center gap-2 text-primary">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
          </svg>
          <h2 className="text-base font-semibold">Classification</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Industry" tooltip="Your primary business category">
            <SelectDropdown
              value={businessBasics.industry}
              onChange={v => updateBusinessBasics({ industry: v })}
              options={industries}
              placeholder="Select industry..."
              searchable
            />
          </FormField>
          <FormField label="Business Stage" tooltip="Current growth phase">
            <SelectDropdown
              value={businessBasics.businessStage}
              onChange={v => updateBusinessBasics({ businessStage: v })}
              options={stages}
              placeholder="Select stage..."
            />
          </FormField>
        </div>
        <FormField label="Business Model">
          <SelectDropdown
            value={businessBasics.businessModel}
            onChange={v => updateBusinessBasics({ businessModel: v })}
            options={models}
            placeholder="Select model..."
          />
        </FormField>
      </div>

      {/* Localization Section */}
      <div className="space-y-5">
        <div className="flex items-center gap-2 text-primary">
          <Globe className="w-5 h-5" />
          <h2 className="text-base font-semibold">Localization</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Primary Country">
            <SelectDropdown
              value={businessBasics.country}
              onChange={v => updateBusinessBasics({ country: v })}
              options={countries}
              placeholder="Select country..."
              searchable
            />
          </FormField>
          <FormField label="Reporting Currency">
            <SelectDropdown
              value={businessBasics.currency}
              onChange={v => updateBusinessBasics({ currency: v })}
              options={currencies}
              placeholder="Select currency..."
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}
