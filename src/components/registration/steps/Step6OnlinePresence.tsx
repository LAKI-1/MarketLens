import FormField, { Input } from '../ui/FormField';
import { useRegistration } from '../RegistrationContext';
import { Globe, Smartphone, Newspaper, Linkedin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Step6OnlinePresence() {
  const { data, updateOnlinePresence } = useRegistration();
  const { onlinePresence } = data;

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
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-ink">Online Presence</h1>
        <p className="text-brand-neutral mt-2">
          Share your websites and social channels to enable AI-powered digital footprint tracking.
        </p>
      </div>

      {/* Website Info */}
      <div className="space-y-5">
        <h2 className="text-base font-semibold text-ink flex items-center gap-2">
          <span className="w-1.5 h-4 bg-primary rounded-full" />
          Websites & Apps
        </h2>
        <div className="space-y-4">
          <FormField
            label="Website URL"
            error={!validateUrl(onlinePresence.websiteUrl) ? 'Please enter a valid URL' : undefined}
          >
            <Input
              icon={<Globe className="w-4 h-4" />}
              placeholder="e.g. www.mycompany.com"
              value={onlinePresence.websiteUrl}
              onChange={e => updateOnlinePresence({ websiteUrl: e.target.value })}
            />
          </FormField>

          <FormField
            label="Mobile App URL"
            error={!validateUrl(onlinePresence.mobileAppUrl) ? 'Please enter a valid URL' : undefined}
          >
            <Input
              icon={<Smartphone className="w-4 h-4" />}
              placeholder="e.g. apps.apple.com/app/mycompany"
              value={onlinePresence.mobileAppUrl}
              onChange={e => updateOnlinePresence({ mobileAppUrl: e.target.value })}
            />
          </FormField>

          <FormField
            label="Blog URL"
            error={!validateUrl(onlinePresence.blogUrl) ? 'Please enter a valid URL' : undefined}
          >
            <Input
              icon={<Newspaper className="w-4 h-4" />}
              placeholder="e.g. mycompany.com/blog"
              value={onlinePresence.blogUrl}
              onChange={e => updateOnlinePresence({ blogUrl: e.target.value })}
            />
          </FormField>
        </div>
      </div>

      {/* Social Media */}
      <div className="space-y-5">
        <h2 className="text-base font-semibold text-ink flex items-center gap-2">
          <span className="w-1.5 h-4 bg-primary rounded-full" />
          Social Profiles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="LinkedIn Profile">
            <Input
              icon={<Linkedin className="w-4 h-4" />}
              placeholder="linkedin.com/company/handle"
              value={onlinePresence.linkedin}
              onChange={e => updateOnlinePresence({ linkedin: e.target.value })}
            />
          </FormField>

          <FormField label="Facebook Page">
            <Input
              icon={<Facebook className="w-4 h-4" />}
              placeholder="facebook.com/handle"
              value={onlinePresence.facebook}
              onChange={e => updateOnlinePresence({ facebook: e.target.value })}
            />
          </FormField>

          <FormField label="Instagram Handle">
            <Input
              icon={<Instagram className="w-4 h-4" />}
              placeholder="instagram.com/handle"
              value={onlinePresence.instagram}
              onChange={e => updateOnlinePresence({ instagram: e.target.value })}
            />
          </FormField>

          <FormField label="TikTok Profile">
            <Input
              icon={
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.95-1.72-.1-.09-.17-.18-.26-.28v6.74c-.05 3.32-2.12 6.42-5.32 7.37-3.17.95-6.84-.2-8.59-3.03-1.88-3.03-1.07-7.29 1.73-9.39 2.1-1.58 5.12-1.8 7.42-.64v4.19c-1.42-.81-3.26-.64-4.5.38-1.25 1.02-1.59 2.87-.82 4.3.77 1.44 2.45 2.21 4.06 1.89 1.56-.31 2.69-1.72 2.73-3.3V.02z" />
                </svg>
              }
              placeholder="tiktok.com/@handle"
              value={onlinePresence.tiktok}
              onChange={e => updateOnlinePresence({ tiktok: e.target.value })}
            />
          </FormField>

          <FormField label="X (formerly Twitter)">
            <Input
              icon={<Twitter className="w-4 h-4" />}
              placeholder="x.com/handle"
              value={onlinePresence.x}
              onChange={e => updateOnlinePresence({ x: e.target.value })}
            />
          </FormField>

          <FormField label="YouTube Channel">
            <Input
              icon={<Youtube className="w-4 h-4" />}
              placeholder="youtube.com/@handle"
              value={onlinePresence.youtube}
              onChange={e => updateOnlinePresence({ youtube: e.target.value })}
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}
