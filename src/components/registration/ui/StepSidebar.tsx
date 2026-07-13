import { ReactNode } from 'react';
import { ShieldCheck } from 'lucide-react';

interface StepSidebarProps {
  imageSrc?: string;
  imageLabel?: string;
  imageSubLabel?: string;
  title?: string;
  items?: { icon: ReactNode; title: string; description: string }[];
  privacyNote?: boolean;
  children?: ReactNode;
}

export default function StepSidebar({
  imageSrc,
  imageLabel,
  imageSubLabel,
  title,
  items,
  privacyNote = true,
  children,
}: StepSidebarProps) {
  return (
    <div className="hidden xl:flex flex-col gap-6 w-80 flex-shrink-0">
      {/* Header image card */}
      {imageSrc && (
        <div className="relative rounded-2xl overflow-hidden h-44 shadow-lg">
          <img src={imageSrc} alt={imageLabel || ''} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            {imageLabel && <h3 className="text-white font-bold text-lg leading-tight">{imageLabel}</h3>}
            {imageSubLabel && <p className="text-white/70 text-sm mt-0.5">{imageSubLabel}</p>}
          </div>
        </div>
      )}

      {/* Why this matters */}
      {title && (
        <div>
          <h3 className="text-lg font-bold text-ink mb-4">{title}</h3>
          {items && (
            <div className="space-y-4">
              {items.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-ink">{item.title}</h4>
                    <p className="text-xs text-brand-neutral leading-relaxed mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Custom children */}
      {children}

      {/* Privacy note */}
      {privacyNote && (
        <div className="bg-primary/5 border border-primary/10 rounded-xl px-4 py-3.5 mt-auto">
          <div className="flex items-center gap-2 mb-1.5">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-primary uppercase tracking-wide">Data Privacy</span>
          </div>
          <p className="text-xs text-brand-neutral leading-relaxed">
            Your data is encrypted and used only to power your personalized growth roadmap. We never share raw business data.
          </p>
        </div>
      )}
    </div>
  );
}
