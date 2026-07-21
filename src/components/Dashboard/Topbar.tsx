import { Search, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Topbar() {
    const { user } = useAuth();
    const firstName = user?.user_metadata?.full_name?.split(' ')[0] ?? 'there';

    return (
        <header className="bg-white border-b border-brand-border px-6 py-3.5 flex items-center justify-between sticky top-0 z-20">
            <div>
                <h1 className="text-xl font-black text-ink">Executive Overview</h1>
                <p className="text-xs text-brand-neutral mt-0.5">Welcome back, {firstName}</p>
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 bg-surface-alt rounded-xl px-3.5 py-2.5 text-sm text-brand-neutral w-56">
                    <Search className="w-4 h-4" />
                    <span className="text-xs">Search anything...</span>
                </div>

                <button className="relative w-10 h-10 rounded-xl bg-surface-alt flex items-center justify-center hover:bg-brand-muted transition-colors">
                    <Bell className="w-4 h-4 text-brand-neutral" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
                </button>

                <button className="flex items-center gap-2 bg-surface-alt rounded-xl pl-1.5 pr-3 py-1.5 hover:bg-brand-muted transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-xs font-bold text-white">
                        {(user?.email ?? 'U')[0].toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-ink hidden md:block">{firstName}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-brand-neutral" />
                </button>
            </div>
        </header>
    );
}
