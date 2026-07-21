import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, CheckCircle2, Target, Zap, Users, AlertCircle, ChevronRight, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Dashboard/Sidebar';
import Topbar from '../components/Dashboard/Topbar';

interface BusinessProfile {
    id: string;
    business_name: string;
    industry: string;
    health_score: number;
    cac: number;
    ltv: number;
    churn_rate: number;
}

/* ── Radar chart ── */
const radarAxes = ['Branding', 'SEO', 'Retention', 'Social', 'Content', 'Conversion'];
const youValues = [65, 40, 55, 72, 38, 48];
const competitorValues = [80, 65, 70, 55, 60, 75];

function RadarChart() {
    const size = 220;
    const center = size / 2;
    const maxRadius = 80;
    const numAxes = radarAxes.length;
    const getPoint = (value: number, axisIndex: number) => {
        const angle = (Math.PI * 2 * axisIndex) / numAxes - Math.PI / 2;
        const r = (value / 100) * maxRadius;
        return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
    };
    const youPath = youValues.map((v, i) => { const p = getPoint(v, i); return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`; }).join(' ') + ' Z';
    const compPath = competitorValues.map((v, i) => { const p = getPoint(v, i); return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`; }).join(' ') + ' Z';
    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {[0.25, 0.5, 0.75, 1].map((r) => (
                <circle key={r} cx={center} cy={center} r={maxRadius * r} fill="none" stroke="#E4E5EC" strokeWidth="1" />
            ))}
            {radarAxes.map((_, i) => { const p = getPoint(100, i); return <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="#E4E5EC" strokeWidth="1" />; })}
            <path d={compPath} fill="rgba(56,189,248,0.08)" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 3" />
            <path d={youPath} fill="rgba(79,70,229,0.12)" stroke="#4F46E5" strokeWidth="2" />
            {radarAxes.map((label, i) => {
                const p = getPoint(108, i);
                return <text key={label} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 9, fill: '#64748B', fontWeight: 500 }}>{label}</text>;
            })}
        </svg>
    );
}

/* ── Health Score Gauge ── */
function HealthGauge({ score }: { score: number }) {
    const [animated, setAnimated] = useState(0);
    useEffect(() => { const t = setTimeout(() => setAnimated(score), 300); return () => clearTimeout(t); }, [score]);
    const circumference = 2 * Math.PI * 56;
    const offset = circumference - (animated / 100) * circumference;
    return (
        <div className="relative flex items-center justify-center">
            <svg className="w-40 h-40 -rotate-90" viewBox="0 0 128 128">
                <circle cx="64" cy="64" r="56" fill="none" stroke="#EEEEFF" strokeWidth="10" />
                <circle cx="64" cy="64" r="56" fill="none" stroke="#4F46E5" strokeWidth="10" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: 'stroke-dashoffset 1.5s ease' }} />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="text-5xl font-black text-ink leading-none">{Math.round(animated)}</span>
                <span className="text-sm text-brand-neutral font-medium mt-0.5">/ 100</span>
            </div>
        </div>
    );
}

/* ── LTV to CAC bar chart ── */
const ltcBars = [0.28, 0.38, 0.36, 0.48, 0.56, 0.65, 0.72, 0.82, 0.78, 0.88];
function LTVCACChart({ ratio }: { ratio: string }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { const t = setTimeout(() => setMounted(true), 400); return () => clearTimeout(t); }, []);
    return (
        <div className="bg-white rounded-2xl border border-brand-border p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-ink">LTV to CAC Ratio</h3>
                <span className="text-xs font-bold text-secondary-600 bg-secondary-50 border border-secondary-100 px-3 py-1 rounded-full">{ratio}x Health Ratio</span>
            </div>
            <div className="flex items-end gap-1.5 h-24">
                {ltcBars.map((h, i) => {
                    const intensity = i / (ltcBars.length - 1);
                    const r = Math.round(79 + (79 - 79) * intensity);
                    const g = Math.round(70 + (70 - 70) * intensity);
                    const b = Math.round(229);
                    const opacity = 0.18 + intensity * 0.82;
                    return (
                        <div
                            key={i}
                            className="flex-1 rounded-t-md transition-all duration-700"
                            style={{
                                height: mounted ? `${h * 100}%` : '4%',
                                background: `rgba(${r},${g},${b},${opacity})`,
                                transitionDelay: `${i * 60}ms`,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

/* ── Metric card ── */
interface MetricCardProps {
    label: string;
    value: string;
    trendText: string;
    trendPositive: boolean;
    barColor: string;
}
function MetricCard({ label, value, trendText, trendPositive, barColor }: MetricCardProps) {
    return (
        <div className="bg-white rounded-2xl border border-brand-border p-5">
            <p className="text-[11px] font-bold tracking-widest uppercase text-brand-neutral mb-1">{label}</p>
            <p className="text-3xl font-black text-ink my-2">{value}</p>
            <div className="mt-3">
                <p className={`text-xs font-semibold ${trendPositive ? 'text-secondary-600' : trendText.startsWith('-') ? 'text-tertiary-500' : 'text-red-500'}`}>
                    {trendText}
                </p>
                <div className="h-1 rounded-full mt-1.5 w-16" style={{ background: barColor }} />
            </div>
        </div>
    );
}

/* ── Diagnosis score card ── */
interface DiagnosisCardProps {
    label: string;
    value: number;
    status: string;
}
const statusStyles: Record<string, { badge: string; bar: string }> = {
    STABLE: { badge: 'text-green-700 bg-green-50 border-green-200', bar: '#15803d' },
    STRONG: { badge: 'text-green-700 bg-green-50 border-green-200', bar: '#15803d' },
    CRITICAL: { badge: 'text-red-600 bg-red-50 border-red-200', bar: '#dc2626' },
    'AT RISK': { badge: 'text-orange-600 bg-orange-50 border-orange-200', bar: '#dc2626' },
    NEUTRAL: { badge: 'text-blue-600 bg-blue-50 border-blue-200', bar: '#4F46E5' },
};
function DiagnosisCard({ label, value, status }: DiagnosisCardProps) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { const t = setTimeout(() => setMounted(true), 500); return () => clearTimeout(t); }, []);
    const s = statusStyles[status] ?? statusStyles.NEUTRAL;
    return (
        <div className="bg-white rounded-2xl border border-brand-border p-5">
            <p className="text-xs text-brand-neutral mb-2">{label}</p>
            <div className="flex items-center justify-between mb-4">
                <span className="text-4xl font-black text-ink">{value}</span>
                <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md border ${s.badge}`}>{status}</span>
            </div>
            <div className="h-1 bg-brand-muted rounded-full overflow-hidden w-full">
                <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: mounted ? `${value}%` : '0%', background: s.bar }}
                />
            </div>
        </div>
    );
}

/* ── AI recommendations ── */
const recommendations = [
    { priority: 'High', icon: Target, title: 'Publish 3 blog posts targeting "AI resume builder"', impact: '+$1.2k projected', category: 'SEO' },
    { priority: 'High', icon: Zap, title: 'Launch retargeting campaign for cart abandoners', impact: '+8% conversion', category: 'Marketing' },
    { priority: 'Medium', icon: Users, title: 'Set up email sequence for at-risk customers', impact: '-15% churn', category: 'Retention' },
    { priority: 'Medium', icon: AlertCircle, title: 'Update meta tags on /pricing page', impact: '+12% CTR', category: 'SEO' },
];

/* ── Competitors ── */
const competitors = [
    { name: 'Competitor A', traffic: '50K', conversion: '2.6%', social: '12%', status: 'up' },
    { name: 'Competitor B', traffic: '38K', conversion: '2.1%', social: '8%', status: 'up' },
    { name: 'Competitor C', traffic: '22K', conversion: '1.5%', social: '4%', status: 'down' },
    { name: 'You', traffic: '20K', conversion: '1.8%', social: '5%', status: 'up', isYou: true },
];

/* ════════════════════════════════════════════
   Dashboard page
   ════════════════════════════════════════════ */
export default function Dashboard() {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<BusinessProfile | null>(null);
    const [loading, setLoading] = useState(true);

    // Redirect to sign-in if not authenticated
    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/signin', { replace: true });
        }
    }, [authLoading, user, navigate]);

    useEffect(() => {
        if (!user) return;
        (async () => {
            const { data } = await supabase.from('businesses').select('*').eq('owner_id', user.id).maybeSingle();
            if (data) {
                setProfile(data as BusinessProfile);
            }
            setLoading(false);
        })();
    }, [user]);

    if (authLoading || loading) {
        return (
            <div className="flex h-screen bg-surface-bg">
                <Sidebar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    const score = profile?.health_score ?? 58;
    const cac = profile?.cac ?? 142.5;
    const ltv = profile?.ltv ?? 1240;
    const churn = profile?.churn_rate ?? 2.4;
    const ratio = (ltv / cac).toFixed(1);

    return (
        <div className="flex min-h-screen bg-[#F5F5FA]">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <Topbar />

                <main className="flex-1 p-6 space-y-6 overflow-y-auto">

                    {/* ── Section header ── */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-black text-ink">Executive Overview</h2>
                            <p className="text-sm text-brand-neutral mt-1">Real-time health telemetry for your business ecosystem.</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <button className="bg-ink text-white text-xs font-semibold px-4 py-2 rounded-full">Current QTR</button>
                            <button className="bg-white border border-brand-border text-xs font-semibold text-brand-neutral px-4 py-2 rounded-full hover:bg-surface-alt transition-colors">Last 30 Days</button>
                        </div>
                    </div>

                    {/* ── Row 1: Health Score card + Metric cards + LTV:CAC chart ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                        {/* Business Health Score – left big card */}
                        <div className="lg:col-span-2 bg-white rounded-2xl border border-brand-border p-6 flex flex-col items-center justify-between">
                            <h3 className="text-base font-bold text-ink self-start">Business Health Score</h3>
                            <HealthGauge score={score} />
                            <div className="w-full mt-2 space-y-1">
                                <p className="text-sm font-semibold text-secondary-600 text-center">+4.2% from last month</p>
                                <p className="text-sm text-brand-neutral italic text-center leading-snug">
                                    "SEO and Acquisition are creating a drag on your current performance."
                                </p>
                            </div>
                        </div>

                        {/* Right column: 3 metric cards + LTV:CAC */}
                        <div className="lg:col-span-3 flex flex-col gap-4">
                            {/* 3 metric cards */}
                            <div className="grid grid-cols-3 gap-4">
                                <MetricCard
                                    label="CAC"
                                    value={`$${cac.toFixed(2)}`}
                                    trendText={`+12% Target: <$120`}
                                    trendPositive={false}
                                    barColor="#dc2626"
                                />
                                <MetricCard
                                    label="LTV"
                                    value={`$${ltv.toLocaleString()}`}
                                    trendText="+8.4% Vs. Prev. QTR"
                                    trendPositive={true}
                                    barColor="#15803d"
                                />
                                <MetricCard
                                    label="Churn Rate"
                                    value={`${churn.toFixed(1)}%`}
                                    trendText="-0.5% Trend: Improving"
                                    trendPositive={false}
                                    barColor="#4F46E5"
                                />
                            </div>

                            {/* LTV to CAC bar chart */}
                            <LTVCACChart ratio={ratio} />
                        </div>
                    </div>

                    {/* ── Row 2: Business Diagnosis Scores ── */}
                    <div>
                        <h3 className="text-lg font-black text-ink mb-3">Business Diagnosis Scores</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <DiagnosisCard label="Branding" value={65} status="STABLE" />
                            <DiagnosisCard label="SEO" value={40} status="CRITICAL" />
                            <DiagnosisCard label="Positioning" value={72} status="STRONG" />
                            <DiagnosisCard label="Acquisition" value={45} status="AT RISK" />
                            <DiagnosisCard label="Retention" value={55} status="NEUTRAL" />
                            <DiagnosisCard label="Pricing" value={68} status="STABLE" />
                        </div>
                    </div>

                    {/* ── Row 3: Performance vs Competitors radar + AI Recommendations ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Radar chart */}
                        <div className="bg-white rounded-2xl border border-brand-border p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-bold text-ink">Performance vs Competitors</h3>
                                <div className="flex items-center gap-4 text-xs">
                                    <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-full bg-primary" /> You</span>
                                    <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-full border-2 border-tertiary bg-tertiary/20" /> Competitor avg</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <RadarChart />
                            </div>
                        </div>

                        {/* AI Growth Recommendations */}
                        <div className="bg-white rounded-2xl border border-brand-border p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-xl bg-primary-50 flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 text-primary" />
                                </div>
                                <h3 className="text-base font-bold text-ink">AI Growth Recommendations</h3>
                                <span className="ml-auto text-xs text-brand-neutral">Ranked by impact</span>
                            </div>
                            <div className="space-y-2.5">
                                {recommendations.map((rec, i) => {
                                    const Icon = rec.icon;
                                    return (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-brand-border hover:border-primary/30 hover:bg-primary-50/40 transition-all cursor-pointer group">
                                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${rec.priority === 'High' ? 'bg-primary-50' : 'bg-surface-alt'}`}>
                                                <Icon className={`w-4 h-4 ${rec.priority === 'High' ? 'text-primary' : 'text-brand-neutral'}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-ink leading-tight">{rec.title}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${rec.priority === 'High' ? 'bg-primary text-white' : 'bg-surface-alt text-brand-neutral'}`}>{rec.priority}</span>
                                                    <span className="text-xs text-brand-neutral">{rec.category}</span>
                                                </div>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <p className="text-sm font-bold text-secondary-600 whitespace-nowrap">{rec.impact}</p>
                                                <ChevronRight className="w-4 h-4 text-brand-neutral group-hover:text-primary transition-colors ml-auto mt-1" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* ── Row 4: Competitor Benchmarking ── */}
                    <div className="bg-white rounded-2xl border border-brand-border p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-bold text-ink">Competitor Benchmarking</h3>
                            <button className="text-xs font-semibold text-primary hover:text-primary-700 transition-colors">View all →</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-brand-border">
                                        <th className="text-left text-xs font-bold text-brand-neutral uppercase tracking-wider pb-3">Name</th>
                                        <th className="text-right text-xs font-bold text-brand-neutral uppercase tracking-wider pb-3">Traffic</th>
                                        <th className="text-right text-xs font-bold text-brand-neutral uppercase tracking-wider pb-3">Conv. Rate</th>
                                        <th className="text-right text-xs font-bold text-brand-neutral uppercase tracking-wider pb-3">Social Growth</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {competitors.map((c) => (
                                        <tr key={c.name} className={`border-b border-brand-border/50 ${c.isYou ? 'bg-primary-50' : ''}`}>
                                            <td className="py-3 text-sm font-semibold text-ink">{c.isYou && <span className="text-primary mr-1">●</span>}{c.name}</td>
                                            <td className="py-3 text-sm text-right text-brand-neutral">{c.traffic}</td>
                                            <td className="py-3 text-sm text-right text-brand-neutral">{c.conversion}</td>
                                            <td className="py-3 text-right">
                                                <span className={`inline-flex items-center gap-1 text-sm font-medium ${c.status === 'up' ? 'text-secondary-600' : 'text-red-500'}`}>
                                                    {c.status === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                                                    {c.social}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}
