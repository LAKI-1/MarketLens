import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
  searchable?: boolean;
}

export default function SelectDropdown({ value, onChange, options, placeholder = 'Select...', className = '', searchable = false }: SelectDropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    if (open && searchable && searchRef.current) {
      searchRef.current.focus();
    }
  }, [open, searchable]);

  const selectedLabel = options.find(o => o.value === value)?.label;
  const filtered = searchable && search
    ? options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => { setOpen(!open); setSearch(''); }}
        className={`w-full flex items-center justify-between bg-white border rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 hover:border-brand-neutral/30 ${
          open ? 'ring-2 ring-primary/20 border-primary' : 'border-brand-border'
        } ${selectedLabel ? 'text-ink' : 'text-brand-neutral/50'}`}
      >
        <span className="truncate">{selectedLabel || placeholder}</span>
        <ChevronDown className={`w-4 h-4 text-brand-neutral/50 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-1.5 w-full bg-white border border-brand-border rounded-xl shadow-lg shadow-ink/5 overflow-hidden animate-dropdown">
          {searchable && (
            <div className="p-2 border-b border-brand-border/50">
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full px-3 py-2 text-sm bg-surface rounded-lg outline-none border border-brand-border/50 focus:border-primary/30"
              />
            </div>
          )}
          <div className="max-h-60 overflow-y-auto py-1 reg-scrollbar">
            {filtered.length === 0 && (
              <div className="px-4 py-3 text-sm text-brand-neutral/50 text-center">No results</div>
            )}
            {filtered.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-100 ${
                  opt.value === value
                    ? 'bg-primary/5 text-primary font-medium'
                    : 'text-ink hover:bg-surface'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
