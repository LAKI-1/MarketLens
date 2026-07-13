import { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  children: ReactNode;
  error?: string;
  tooltip?: string;
  required?: boolean;
  className?: string;
}

export default function FormField({ label, children, error, tooltip, required, className = '' }: FormFieldProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="flex items-center gap-1.5 text-sm font-medium text-ink">
        {label}
        {required && <span className="text-red-500">*</span>}
        {tooltip && (
          <span className="group relative cursor-help">
            <svg className="w-3.5 h-3.5 text-brand-neutral/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
              <circle cx="12" cy="17" r="0.5" fill="currentColor" />
            </svg>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-ink text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg z-50">
              {tooltip}
            </span>
          </span>
        )}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

/* ───── Reusable Input ───── */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

export function Input({ icon, className = '', ...props }: InputProps) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-neutral/40">
          {icon}
        </span>
      )}
      <input
        {...props}
        className={`w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-sm text-ink placeholder-brand-neutral/50 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 hover:border-brand-neutral/30 ${icon ? 'pl-10' : ''} ${className}`}
      />
    </div>
  );
}

/* ───── Textarea ───── */

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className = '', ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={`w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-sm text-ink placeholder-brand-neutral/50 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 hover:border-brand-neutral/30 resize-none ${className}`}
    />
  );
}
