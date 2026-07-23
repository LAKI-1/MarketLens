import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard, Globe, Eye, Lightbulb, PenTool,
    BarChart2, MessageSquare, Settings, HelpCircle, User,
    Sparkles,
} from 'lucide-react';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Globe, label: 'Market Hub', path: '/dashboard/market' },
    { icon: Eye, label: 'Competitors', path: '/dashboard/competitors' },
    { icon: Lightbulb, label: 'Growth Roadmap', path: '/dashboard/roadmap' },
    { icon: PenTool, label: 'Marketing Copilot', path: '/dashboard/copilot' },
    { icon: BarChart2, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: MessageSquare, label: 'Business Advisor', path: '/dashboard/advisor' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export default function Sidebar() {
    return (
        <aside className="w-56 bg-white border-r border-brand-border flex flex-col h-screen sticky top-0 shrink-0">
            {/* Logo */}
            <div className="flex items-center px-4 py-4">
                <NavLink to="/dashboard" className="block w-full">
                    <img
                        src="/images/MarketLens.png"
                        alt="MarketLens"
                        className="h-10 w-auto object-contain"
                    />
                </NavLink>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            end={item.path === '/dashboard'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${isActive
                                    ? 'bg-primary-50 text-primary font-semibold'
                                    : 'text-brand-neutral hover:text-ink hover:bg-surface-alt font-normal'
                                }`
                            }
                        >
                            <Icon className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                            {item.label}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Ask Growth AI button */}
            <div className="px-3 pb-4">
                <button className="w-full bg-ink text-white text-sm font-bold py-3 rounded-2xl hover:bg-primary transition-all duration-200 flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Ask Growth AI
                </button>
            </div>

            {/* Bottom links */}
            <div className="px-3 pb-5 space-y-0.5 border-t border-brand-border pt-3">
                <NavLink to="/dashboard/help" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-brand-neutral hover:text-ink hover:bg-surface-alt transition-all">
                    <HelpCircle className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                    Help Center
                </NavLink>
                <NavLink to="/dashboard/account" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-brand-neutral hover:text-ink hover:bg-surface-alt transition-all">
                    <User className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                    Account
                </NavLink>
            </div>
        </aside>
    );
}
