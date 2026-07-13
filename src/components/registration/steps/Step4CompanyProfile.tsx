import { useState } from 'react';
import FormField, { Input } from '../ui/FormField';
import SelectDropdown from '../ui/SelectDropdown';
import { useRegistration } from '../RegistrationContext';
import { Building, ChevronDown, ChevronUp } from 'lucide-react';

const companySizes = [
  { label: 'Startup (1-10)', value: '1-10' },
  { label: 'Small Business (11-50)', value: '11-50' },
  { label: 'Mid-Market (51-250)', value: '51-250' },
  { label: 'Enterprise (250+)', value: '250+' },
];

const revenueRanges = [
  { label: 'Pre-revenue', value: 'Pre-revenue' },
  { label: 'Less than $100k', value: 'under-100k' },
  { label: '$100k - $500k', value: '100k-500k' },
  { label: '$500k - $2M', value: '500k-2M' },
  { label: '$2M - $10M', value: '2M-10M' },
  { label: '$10M+', value: '10M+' },
];

const legalEntityTypes = [
  { label: 'Sole Proprietorship', value: 'sole-proprietorship' },
  { label: 'Partnership', value: 'partnership' },
  { label: 'LLC (Limited Liability Company)', value: 'llc' },
  { label: 'C-Corporation', value: 'c-corp' },
  { label: 'S-Corporation', value: 's-corp' },
  { label: 'Non-Profit', value: 'non-profit' },
];

export default function Step4CompanyProfile() {
  const { data, updateCompanyProfile, updateEnterpriseFields } = useRegistration();
  const { companyProfile, enterpriseFields } = data;
  const [showEnterprise, setShowEnterprise] = useState(false);

  const handleNumericChange = (field: keyof typeof companyProfile, val: string) => {
    // Only allow numbers
    if (val === '' || /^[0-9]+$/.test(val)) {
      updateCompanyProfile({ [field]: val });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-ink">Company Profile</h1>
        <p className="text-brand-neutral mt-2">
          Detail your operational metrics to establish industry benchmarks.
        </p>
      </div>

      {/* Core Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Company Size">
          <SelectDropdown
            value={companyProfile.companySize}
            onChange={v => updateCompanyProfile({ companySize: v })}
            options={companySizes}
            placeholder="Select company size..."
          />
        </FormField>

        <FormField label="Founded Year">
          <Input
            type="text"
            placeholder="e.g. 2022"
            maxLength={4}
            value={companyProfile.foundedYear}
            onChange={e => handleNumericChange('foundedYear', e.target.value)}
          />
        </FormField>

        <FormField label="Number of Employees">
          <Input
            type="text"
            placeholder="e.g. 25"
            value={companyProfile.employeeCount}
            onChange={e => handleNumericChange('employeeCount', e.target.value)}
          />
        </FormField>

        <FormField label="Annual Revenue Range">
          <SelectDropdown
            value={companyProfile.annualRevenue}
            onChange={v => updateCompanyProfile({ annualRevenue: v })}
            options={revenueRanges}
            placeholder="Select revenue range..."
          />
        </FormField>

        <FormField label="Number of Customers">
          <Input
            type="text"
            placeholder="e.g. 150"
            value={companyProfile.customerCount}
            onChange={e => handleNumericChange('customerCount', e.target.value)}
          />
        </FormField>

        <FormField label="Monthly Website Visitors">
          <Input
            type="text"
            placeholder="e.g. 5000"
            value={companyProfile.websiteVisitors}
            onChange={e => handleNumericChange('websiteVisitors', e.target.value)}
          />
        </FormField>
      </div>

      {/* Enterprise Registration Section (Accordion) */}
      <div className="border border-brand-border rounded-xl overflow-hidden bg-surface">
        <button
          type="button"
          onClick={() => setShowEnterprise(!showEnterprise)}
          className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-surface transition-colors border-b border-brand-border/50 text-left"
        >
          <div className="flex items-center gap-2.5">
            <Building className="w-5 h-5 text-primary" />
            <div>
              <span className="text-sm font-semibold text-ink block">Compliance & Enterprise Fields</span>
              <span className="text-xs text-brand-neutral mt-0.5 block">Registration, Tax, VAT details for B2B compliance</span>
            </div>
          </div>
          {showEnterprise ? (
            <ChevronUp className="w-4 h-4 text-brand-neutral" />
          ) : (
            <ChevronDown className="w-4 h-4 text-brand-neutral" />
          )}
        </button>

        {showEnterprise && (
          <div className="p-5 space-y-4 bg-white/50 border-t border-brand-border/30">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Registration Number">
                <Input
                  placeholder="e.g. Reg-12345"
                  value={enterpriseFields.registrationNumber}
                  onChange={e => updateEnterpriseFields({ registrationNumber: e.target.value })}
                />
              </FormField>
              <FormField label="Tax Number">
                <Input
                  placeholder="e.g. Tax-98765"
                  value={enterpriseFields.taxNumber}
                  onChange={e => updateEnterpriseFields({ taxNumber: e.target.value })}
                />
              </FormField>
              <FormField label="VAT Number">
                <Input
                  placeholder="e.g. VAT-US5555"
                  value={enterpriseFields.vatNumber}
                  onChange={e => updateEnterpriseFields({ vatNumber: e.target.value })}
                />
              </FormField>
              <FormField label="Legal Entity Type">
                <SelectDropdown
                  value={enterpriseFields.legalEntityType}
                  onChange={v => updateEnterpriseFields({ legalEntityType: v })}
                  options={legalEntityTypes}
                  placeholder="Select entity type..."
                />
              </FormField>
            </div>
            <FormField label="Business Address">
              <Input
                placeholder="123 Growth Ave, Suite 100, San Francisco, CA"
                value={enterpriseFields.businessAddress}
                onChange={e => updateEnterpriseFields({ businessAddress: e.target.value })}
              />
            </FormField>
            <FormField label="Branch Locations">
              <Input
                placeholder="e.g. London, Tokyo (comma separated)"
                value={enterpriseFields.branchLocations}
                onChange={e => updateEnterpriseFields({ branchLocations: e.target.value })}
              />
            </FormField>
          </div>
        )}
      </div>
    </div>
  );
}
