import { useRegistration } from '../RegistrationContext';
import FormField, { Input } from '../ui/FormField';
import SelectDropdown from '../ui/SelectDropdown';
import { User, Briefcase } from 'lucide-react';

const ageRanges = [
  { label: 'Under 18', value: 'under-18' },
  { label: '18 - 24', value: '18-24' },
  { label: '25 - 34', value: '25-34' },
  { label: '35 - 54', value: '35-54' },
  { label: '55+', value: '55+' },
];

const incomeLevels = [
  { label: 'Low (< $30k)', value: 'low' },
  { label: 'Middle ($30k - $100k)', value: 'middle' },
  { label: 'High ($100k+)', value: 'high' },
  { label: 'Ultra High Net Worth ($1M+)', value: 'uhnw' },
];

export default function Step10CustomerPersona() {
  const { data, updateCustomerPersona } = useRegistration();
  const { customerPersona } = data;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-ink">Customer Persona</h1>
        <p className="text-brand-neutral mt-2">
          Tell us who buys your products to frame user acquisition models.
        </p>
      </div>

      {/* Segment Selector Toggle */}
      <div className="grid grid-cols-2 bg-brand-muted/80 p-1.5 rounded-xl">
        <button
          type="button"
          onClick={() => updateCustomerPersona({ type: 'B2B' })}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            customerPersona.type === 'B2B'
              ? 'bg-white text-ink shadow-sm'
              : 'text-brand-neutral hover:text-ink'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          B2B (Business-to-Business)
        </button>
        <button
          type="button"
          onClick={() => updateCustomerPersona({ type: 'B2C' })}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            customerPersona.type === 'B2C'
              ? 'bg-white text-ink shadow-sm'
              : 'text-brand-neutral hover:text-ink'
          }`}
        >
          <User className="w-4 h-4" />
          B2C (Business-to-Consumer)
        </button>
      </div>

      {/* Conditional Forms */}
      <div className="space-y-5 animate-fadeIn">
        {customerPersona.type === 'B2B' ? (
          <div className="space-y-4">
            <FormField label="Target Industry">
              <Input
                placeholder="e.g. Healthcare, Software, Real Estate"
                value={customerPersona.targetIndustry}
                onChange={e => updateCustomerPersona({ targetIndustry: e.target.value })}
              />
            </FormField>
            <FormField label="Target Company Size">
              <Input
                placeholder="e.g. Mid-size (100-500 employees), Fortune 500"
                value={customerPersona.companySize}
                onChange={e => updateCustomerPersona({ companySize: e.target.value })}
              />
            </FormField>
            <FormField label="Decision Maker Role">
              <Input
                placeholder="e.g. CTO, VP of Marketing, Procurement Manager"
                value={customerPersona.decisionMakerRole}
                onChange={e => updateCustomerPersona({ decisionMakerRole: e.target.value })}
              />
            </FormField>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Age Range">
                <SelectDropdown
                  value={customerPersona.ageRange}
                  onChange={v => updateCustomerPersona({ ageRange: v })}
                  options={ageRanges}
                  placeholder="Select age range..."
                />
              </FormField>
              <FormField label="Income Level">
                <SelectDropdown
                  value={customerPersona.incomeLevel}
                  onChange={v => updateCustomerPersona({ incomeLevel: v })}
                  options={incomeLevels}
                  placeholder="Select income..."
                />
              </FormField>
            </div>
            <FormField label="Target Location(s)">
              <Input
                placeholder="e.g. North America, Urban Areas, Germany"
                value={customerPersona.location}
                onChange={e => updateCustomerPersona({ location: e.target.value })}
              />
            </FormField>
            <FormField label="Interests / Demographics">
              <Input
                placeholder="e.g. Technology, Eco-friendly Products, Fitness"
                value={customerPersona.interests}
                onChange={e => updateCustomerPersona({ interests: e.target.value })}
              />
            </FormField>
          </div>
        )}
      </div>
    </div>
  );
}
