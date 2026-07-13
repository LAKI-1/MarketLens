import { createContext, useContext, useState, ReactNode } from 'react';

/* ───────────────────── Types ───────────────────── */

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface BusinessBasics {
  businessName: string;
  tagline: string;
  industry: string;
  businessStage: string;
  businessModel: string;
  country: string;
  currency: string;
}

export interface CompanyProfile {
  companySize: string;
  foundedYear: string;
  employeeCount: string;
  annualRevenue: string;
  customerCount: string;
  websiteVisitors: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  pricingModel: string;
  price: string;
  frequency: string;
}

export interface OnlinePresence {
  websiteUrl: string;
  mobileAppUrl: string;
  blogUrl: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  x: string;
  youtube: string;
}

export interface Competitor {
  id: string;
  name: string;
  website: string;
}

export interface CustomerPersona {
  type: 'B2B' | 'B2C';
  // B2B
  targetIndustry: string;
  companySize: string;
  decisionMakerRole: string;
  // B2C
  ageRange: string;
  incomeLevel: string;
  location: string;
  interests: string;
}

export interface EnterpriseFields {
  registrationNumber: string;
  taxNumber: string;
  vatNumber: string;
  businessAddress: string;
  branchLocations: string;
  legalEntityType: string;
}

export interface RegistrationData {
  personalInfo: PersonalInfo;
  businessBasics: BusinessBasics;
  companyProfile: CompanyProfile;
  products: Product[];
  onlinePresence: OnlinePresence;
  marketingChannels: string[];
  primaryGoal: string;
  secondaryGoals: string[];
  competitors: Competitor[];
  customerPersona: CustomerPersona;
  painPoints: string[];
  enterpriseFields: EnterpriseFields;
  ownerId?: string;
}

interface RegistrationContextType {
  data: RegistrationData;
  currentStep: number;
  totalSteps: number;
  setCurrentStep: (step: number) => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateBusinessBasics: (info: Partial<BusinessBasics>) => void;
  updateCompanyProfile: (info: Partial<CompanyProfile>) => void;
  addProduct: () => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  removeProduct: (id: string) => void;
  updateOnlinePresence: (info: Partial<OnlinePresence>) => void;
  toggleMarketingChannel: (channel: string) => void;
  setPrimaryGoal: (goal: string) => void;
  toggleSecondaryGoal: (goal: string) => void;
  addCompetitor: () => void;
  updateCompetitor: (id: string, updates: Partial<Competitor>) => void;
  removeCompetitor: (id: string) => void;
  updateCustomerPersona: (info: Partial<CustomerPersona>) => void;
  togglePainPoint: (point: string) => void;
  updateEnterpriseFields: (info: Partial<EnterpriseFields>) => void;
  setOwnerId: (id: string) => void;
}

/* ───────────────────── Initial Data ───────────────────── */

const initialData: RegistrationData = {
  personalInfo: { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' },
  businessBasics: { businessName: '', tagline: '', industry: '', businessStage: '', businessModel: '', country: 'United States', currency: 'USD ($)' },
  companyProfile: { companySize: '', foundedYear: '', employeeCount: '', annualRevenue: '', customerCount: '', websiteVisitors: '' },
  products: [{ id: crypto.randomUUID(), name: '', category: '', description: '', pricingModel: '', price: '', frequency: '' }],
  onlinePresence: { websiteUrl: '', mobileAppUrl: '', blogUrl: '', linkedin: '', facebook: '', instagram: '', tiktok: '', x: '', youtube: '' },
  marketingChannels: [],
  primaryGoal: '',
  secondaryGoals: [],
  competitors: [{ id: crypto.randomUUID(), name: '', website: '' }],
  customerPersona: { type: 'B2C', targetIndustry: '', companySize: '', decisionMakerRole: '', ageRange: '', incomeLevel: '', location: '', interests: '' },
  painPoints: [],
  enterpriseFields: { registrationNumber: '', taxNumber: '', vatNumber: '', businessAddress: '', branchLocations: '', legalEntityType: '' },
};

/* ───────────────────── Context ───────────────────── */

const RegistrationContext = createContext<RegistrationContextType | null>(null);

export function useRegistration() {
  const ctx = useContext(RegistrationContext);
  if (!ctx) throw new Error('useRegistration must be used within RegistrationProvider');
  return ctx;
}

/* ───────────────────── Provider ───────────────────── */

export function RegistrationProvider({ children, initialEmail, initialOwnerId }: { children: ReactNode; initialEmail?: string; initialOwnerId?: string }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<RegistrationData>(() => {
    const baseData = initialEmail
      ? { ...initialData, personalInfo: { ...initialData.personalInfo, email: initialEmail } }
      : initialData;

    if (initialOwnerId) {
      return { ...baseData, ownerId: initialOwnerId };
    }

    return baseData;
  });

  const totalSteps = 12;

  const updatePersonalInfo = (info: Partial<PersonalInfo>) =>
    setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, ...info } }));

  const updateBusinessBasics = (info: Partial<BusinessBasics>) =>
    setData(prev => ({ ...prev, businessBasics: { ...prev.businessBasics, ...info } }));

  const updateCompanyProfile = (info: Partial<CompanyProfile>) =>
    setData(prev => ({ ...prev, companyProfile: { ...prev.companyProfile, ...info } }));

  const addProduct = () =>
    setData(prev => ({ ...prev, products: [...prev.products, { id: crypto.randomUUID(), name: '', category: '', description: '', pricingModel: '', price: '', frequency: '' }] }));

  const updateProduct = (id: string, updates: Partial<Product>) =>
    setData(prev => ({ ...prev, products: prev.products.map(p => p.id === id ? { ...p, ...updates } : p) }));

  const removeProduct = (id: string) =>
    setData(prev => ({ ...prev, products: prev.products.filter(p => p.id !== id) }));

  const updateOnlinePresence = (info: Partial<OnlinePresence>) =>
    setData(prev => ({ ...prev, onlinePresence: { ...prev.onlinePresence, ...info } }));

  const toggleMarketingChannel = (channel: string) =>
    setData(prev => ({
      ...prev,
      marketingChannels: prev.marketingChannels.includes(channel)
        ? prev.marketingChannels.filter(c => c !== channel)
        : [...prev.marketingChannels, channel],
    }));

  const setPrimaryGoal = (goal: string) =>
    setData(prev => ({ ...prev, primaryGoal: goal }));

  const toggleSecondaryGoal = (goal: string) =>
    setData(prev => ({
      ...prev,
      secondaryGoals: prev.secondaryGoals.includes(goal)
        ? prev.secondaryGoals.filter(g => g !== goal)
        : [...prev.secondaryGoals, goal],
    }));

  const addCompetitor = () =>
    setData(prev => ({ ...prev, competitors: [...prev.competitors, { id: crypto.randomUUID(), name: '', website: '' }] }));

  const updateCompetitor = (id: string, updates: Partial<Competitor>) =>
    setData(prev => ({ ...prev, competitors: prev.competitors.map(c => c.id === id ? { ...c, ...updates } : c) }));

  const removeCompetitor = (id: string) =>
    setData(prev => ({ ...prev, competitors: prev.competitors.filter(c => c.id !== id) }));

  const updateCustomerPersona = (info: Partial<CustomerPersona>) =>
    setData(prev => ({ ...prev, customerPersona: { ...prev.customerPersona, ...info } }));

  const togglePainPoint = (point: string) =>
    setData(prev => ({
      ...prev,
      painPoints: prev.painPoints.includes(point)
        ? prev.painPoints.filter(p => p !== point)
        : [...prev.painPoints, point],
    }));

  const updateEnterpriseFields = (info: Partial<EnterpriseFields>) =>
    setData(prev => ({ ...prev, enterpriseFields: { ...prev.enterpriseFields, ...info } }));

  const setOwnerId = (id: string) =>
    setData(prev => ({ ...prev, ownerId: id }));

  return (
    <RegistrationContext.Provider value={{
      data, currentStep, totalSteps, setCurrentStep,
      updatePersonalInfo, updateBusinessBasics, updateCompanyProfile,
      addProduct, updateProduct, removeProduct,
      updateOnlinePresence, toggleMarketingChannel,
      setPrimaryGoal, toggleSecondaryGoal,
      addCompetitor, updateCompetitor, removeCompetitor,
      updateCustomerPersona, togglePainPoint, updateEnterpriseFields,
      setOwnerId,
    }}>
      {children}
    </RegistrationContext.Provider>
  );
}
