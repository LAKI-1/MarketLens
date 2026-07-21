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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleClick);
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open && searchable && searchRef.current) {
      searchRef.current.focus();
    }
    if (open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      if (spaceBelow < 220) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [open, searchable]);

  const selectedOption = options.find(o => o.value === value || o.label === value);
  const selectedLabel = selectedOption?.label || (value ? value : undefined);

  const filtered = searchable && search
    ? options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()) || o.value.toLowerCase().includes(search.toLowerCase()))
    : options;

  return (
    <div ref={ref} className={`relative ${open ? 'z-50' : 'z-10'} ${className}`}>
      <button
        type="button"
        onClick={() => { setOpen(!open); setSearch(''); }}
        className={`w-full flex items-center justify-between bg-white border rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 hover:border-brand-neutral/30 ${
          open ? 'ring-2 ring-primary/20 border-primary' : 'border-brand-border'
        } ${selectedLabel ? 'text-ink font-medium' : 'text-brand-neutral/50'}`}
      >
        <span className="truncate">{selectedLabel || placeholder}</span>
        <ChevronDown className={`w-4 h-4 text-brand-neutral/50 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-1.5 w-full bg-white border border-brand-border rounded-xl shadow-xl shadow-ink/10 overflow-hidden animate-dropdown">
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
              <div className="px-4 py-3 text-sm text-brand-neutral/50 text-center">No results found</div>
            )}
            {filtered.map(opt => {
              const isSelected = opt.value === value || opt.label === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-100 ${
                    isSelected
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-ink hover:bg-surface'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
