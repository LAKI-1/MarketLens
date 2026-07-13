import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import FormField, { Input } from '../ui/FormField';
import SocialAuthButton from '../ui/SocialAuthButton';
import { useRegistration } from '../RegistrationContext';

export default function Step1AccountCreation() {
  const { data, updatePersonalInfo } = useRegistration();
  const { personalInfo } = data;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-ink">Create your account</h1>
        <p className="text-brand-neutral mt-2">Join thousands of businesses growing with MarketLens AI</p>
      </div>

      {/* Social Auth */}
      <div className="space-y-3">
        <SocialAuthButton provider="google" />
        <SocialAuthButton provider="microsoft" />
        <SocialAuthButton provider="linkedin" />
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-brand-border" />
        <span className="text-xs text-brand-neutral font-medium uppercase tracking-wide">or continue with email</span>
        <div className="flex-1 h-px bg-brand-border" />
      </div>

      {/* Form */}
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="First Name" required>
            <Input
              icon={<User className="w-4 h-4" />}
              placeholder="John"
              value={personalInfo.firstName}
              onChange={e => updatePersonalInfo({ firstName: e.target.value })}
            />
          </FormField>
          <FormField label="Last Name" required>
            <Input
              icon={<User className="w-4 h-4" />}
              placeholder="Doe"
              value={personalInfo.lastName}
              onChange={e => updatePersonalInfo({ lastName: e.target.value })}
            />
          </FormField>
        </div>

        <FormField label="Work Email" required>
          <Input
            icon={<Mail className="w-4 h-4" />}
            type="email"
            placeholder="john@company.com"
            value={personalInfo.email}
            onChange={e => updatePersonalInfo({ email: e.target.value })}
          />
        </FormField>

        <FormField label="Password" required>
          <div className="relative">
            <Input
              icon={<Lock className="w-4 h-4" />}
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              value={personalInfo.password}
              onChange={e => updatePersonalInfo({ password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-neutral/40 hover:text-brand-neutral transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {/* Password strength */}
          {personalInfo.password && (
            <div className="mt-2 space-y-1.5">
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map(i => {
                  const strength = getPasswordStrength(personalInfo.password);
                  return (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        i <= strength
                          ? strength <= 1 ? 'bg-red-400' : strength <= 2 ? 'bg-orange-400' : strength <= 3 ? 'bg-yellow-400' : 'bg-emerald-400'
                          : 'bg-brand-border'
                      }`}
                    />
                  );
                })}
              </div>
              <p className={`text-xs ${
                getPasswordStrength(personalInfo.password) <= 1 ? 'text-red-500' :
                getPasswordStrength(personalInfo.password) <= 2 ? 'text-orange-500' :
                getPasswordStrength(personalInfo.password) <= 3 ? 'text-yellow-600' : 'text-emerald-600'
              }`}>
                {getPasswordLabel(getPasswordStrength(personalInfo.password))}
              </p>
            </div>
          )}
        </FormField>

        <FormField label="Confirm Password" required>
          <div className="relative">
            <Input
              icon={<Lock className="w-4 h-4" />}
              type={showConfirm ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={personalInfo.confirmPassword}
              onChange={e => updatePersonalInfo({ confirmPassword: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-neutral/40 hover:text-brand-neutral transition-colors"
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </FormField>
      </div>

      {/* Terms */}
      <p className="text-xs text-brand-neutral text-center leading-relaxed">
        By creating an account, you agree to our{' '}
        <a href="#" className="text-primary hover:underline font-medium">Terms of Service</a>{' '}
        and{' '}
        <a href="#" className="text-primary hover:underline font-medium">Privacy Policy</a>
      </p>
    </div>
  );
}

function getPasswordStrength(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  return score;
}

function getPasswordLabel(strength: number): string {
  switch (strength) {
    case 0: case 1: return 'Weak — add uppercase, numbers & symbols';
    case 2: return 'Fair — keep going';
    case 3: return 'Good — almost there';
    case 4: return 'Strong password';
    default: return '';
  }
}
