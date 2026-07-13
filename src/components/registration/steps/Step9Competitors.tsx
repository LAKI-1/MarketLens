import { useRegistration } from '../RegistrationContext';
import FormField, { Input } from '../ui/FormField';
import { Plus, Trash2, ShieldAlert } from 'lucide-react';

export default function Step9Competitors() {
  const { data, addCompetitor, updateCompetitor, removeCompetitor } = useRegistration();
  const { competitors } = data;

  const validateUrl = (url: string) => {
    if (!url) return true;
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">Competitor Discovery</h1>
          <p className="text-brand-neutral mt-2">
            Enter key rivals below. MarketLens AI tracks SEO, social share, and traffic benchmarks automatically.
          </p>
        </div>
        <button
          type="button"
          onClick={addCompetitor}
          className="flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-primary-700 transition-colors shadow-sm self-start sm:self-center flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Competitor
        </button>
      </div>

      {/* Competitors Listing */}
      <div className="space-y-4">
        {competitors.map((comp, idx) => (
          <div
            key={comp.id}
            className="flex flex-col md:flex-row gap-4 items-end md:items-center bg-white border border-brand-border rounded-xl p-4 shadow-sm hover:border-brand-neutral/20 transition-all duration-200"
          >
            <div className="flex-shrink-0 font-bold text-xs bg-brand-muted text-ink/70 px-2.5 py-1 rounded-full">
              Comp {idx + 1}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 w-full">
              <FormField label="Competitor Name">
                <Input
                  placeholder="e.g. Acme Inc"
                  value={comp.name}
                  onChange={e => updateCompetitor(comp.id, { name: e.target.value })}
                />
              </FormField>

              <FormField
                label="Competitor Website"
                error={!validateUrl(comp.website) ? 'Please enter a valid URL' : undefined}
              >
                <Input
                  placeholder="e.g. www.acme.com"
                  value={comp.website}
                  onChange={e => updateCompetitor(comp.id, { website: e.target.value })}
                />
              </FormField>
            </div>

            {competitors.length > 1 && (
              <button
                type="button"
                onClick={() => removeCompetitor(comp.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2.5 rounded-xl transition-colors self-end md:self-center"
                title="Remove competitor"
              >
                <Trash2 className="w-4.5 h-4.5" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Alert Callout */}
      <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-4 flex gap-3.5 items-start">
        <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-ink">MarketLens Automated Intel Tracking</h4>
          <p className="text-xs text-brand-neutral leading-relaxed">
            By registering competitor URLs, our platform initiates localized crawls on public registries, SEO indexes, and social signals. No login authorization or scrapers are ever deployed under your credentials.
          </p>
        </div>
      </div>
    </div>
  );
}
