import { useState } from 'react';
import { useRegistration } from '../RegistrationContext';
import { Input } from '../ui/FormField';
import { Plus, X, HeartCrack } from 'lucide-react';

const examplePainPoints = [
  'Low website traffic',
  'Poor conversion rates',
  'High churn',
  'Weak branding',
  'Poor retention',
  'Pricing issues',
  'High customer acquisition costs',
];

export default function Step11PainPoints() {
  const { data, togglePainPoint } = useRegistration();
  const { painPoints } = data;
  const [customPoint, setCustomPoint] = useState('');

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPoint.trim()) {
      // Toggle it to add since it's not present
      if (!painPoints.includes(customPoint.trim())) {
        togglePainPoint(customPoint.trim());
      }
      setCustomPoint('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-ink">Pain Points</h1>
        <p className="text-brand-neutral mt-2">
          What are the main bottlenecks slowing your growth today? Select all that apply.
        </p>
      </div>

      {/* Selectable Tag Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-ink flex items-center gap-2">
          <HeartCrack className="w-4 h-4 text-primary" />
          Common Bottlenecks
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {examplePainPoints.map(point => {
            const isSelected = painPoints.includes(point);
            return (
              <button
                key={point}
                type="button"
                onClick={() => togglePainPoint(point)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-primary border-primary text-white shadow-md shadow-primary/10'
                    : 'bg-white border-brand-border text-ink hover:border-brand-neutral/30 hover:shadow-sm'
                }`}
              >
                <span>{point}</span>
                {isSelected && <X className="w-4 h-4" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Pain Point Field */}
      <form onSubmit={handleAddCustom} className="space-y-4 pt-4 border-t border-brand-border/50">
        <h3 className="text-sm font-bold text-ink">Add Custom Pain Point</h3>
        <div className="flex gap-2.5">
          <div className="flex-1">
            <Input
              placeholder="e.g. Inefficient team operations, lack of sales talent"
              value={customPoint}
              onChange={e => setCustomPoint(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-ink hover:bg-primary text-white px-5 py-3 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-1.5 flex-shrink-0"
          >
            <Plus className="w-4.5 h-4.5" />
            Add
          </button>
        </div>
      </form>

      {/* User-selected Active Pain Points List (if custom points were added) */}
      {painPoints.filter(p => !examplePainPoints.includes(p)).length > 0 && (
        <div className="space-y-3 animate-fadeIn">
          <h4 className="text-xs font-bold text-brand-neutral uppercase tracking-wider">Your Custom Pain Points</h4>
          <div className="flex flex-wrap gap-2">
            {painPoints
              .filter(p => !examplePainPoints.includes(p))
              .map(point => (
                <div
                  key={point}
                  className="bg-primary/5 border border-primary/20 text-primary px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>{point}</span>
                  <button
                    type="button"
                    onClick={() => togglePainPoint(point)}
                    className="hover:bg-primary/10 p-0.5 rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
