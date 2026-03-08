import { useThemeStore } from '../store/themeStore'
import { TrendingUp, Users, CheckCircle, Activity, Zap, AlertTriangle, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import Card from '../components/system/Card'
import Badge from '../components/system/Badge'

const KPI_CARDS = [
    { label: 'Total Revenue', value: '$284,500', delta: '+12.4%', up: true, icon: TrendingUp },
    { label: 'Active Users', value: '1,847', delta: '+5.3%', up: true, icon: Users },
    { label: 'Tasks Completed', value: '932', delta: '-2.1%', up: false, icon: CheckCircle },
    { label: 'System Health', value: '99.7%', delta: '+0.2%', up: true, icon: Activity },
]

const AI_INSIGHTS = [
    { priority: 'high', icon: AlertTriangle, text: 'Revenue drop detected in Segment A — 12% below forecast.' },
    { priority: 'medium', icon: Clock, text: '3 tasks overdue for 48h in Marketing pipeline.' },
    { priority: 'low', icon: Zap, text: 'User churn risk rising — recommend engagement campaign.' },
]

const PRIORITY_VARIANTS: Record<string, 'danger' | 'warning' | 'info'> = {
    high: 'danger',
    medium: 'warning',
    low: 'info',
}

/* Performance Overview data */
const PERF_DATA = [
    { month: 'Jan', a: 35, b: 20 },
    { month: 'Feb', a: 50, b: 35 },
    { month: 'Mar', a: 42, b: 30 },
    { month: 'Apr', a: 68, b: 48 },
    { month: 'May', a: 55, b: 40 },
    { month: 'Jun', a: 78, b: 55 },
    { month: 'Jul', a: 85, b: 65 },
]

/* Team Activity data */
const TEAM_DATA = [
    { name: 'Engineering', progress: 82, tasks: 145, color: 'accent' },
    { name: 'Marketing', progress: 64, tasks: 89, color: 'violet' },
    { name: 'Design', progress: 91, tasks: 67, color: 'accent' },
    { name: 'Operations', progress: 73, tasks: 112, color: 'violet' },
    { name: 'Sales', progress: 56, tasks: 78, color: 'accent' },
]

export default function Dashboard() {
    const { theme } = useThemeStore()

    // Build SVG path from performance data
    const maxVal = 90
    const perfPathA = PERF_DATA.map((d, i) => {
        const x = (i / (PERF_DATA.length - 1)) * 380 + 10
        const y = 140 - (d.a / maxVal) * 120
        return `${i === 0 ? 'M' : 'L'}${x} ${y}`
    }).join(' ')
    const perfPathB = PERF_DATA.map((d, i) => {
        const x = (i / (PERF_DATA.length - 1)) * 380 + 10
        const y = 140 - (d.b / maxVal) * 120
        return `${i === 0 ? 'M' : 'L'}${x} ${y}`
    }).join(' ')
    const areaPathA = perfPathA + ` L390 150 L10 150 Z`

    return (
        <div className="space-y-6 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold" style={{ color: 'var(--h1)' }}>
                    Command Overview
                </h1>
                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                    Welcome back — here's your operational summary for today.
                </p>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {KPI_CARDS.map((card, i) => (
                    <Card
                        key={`${card.label}-${theme}`}
                        className="p-5"
                        glow
                        delay={i * 0.08}
                    >
                        <div className="flex items-start justify-between">
                            <div className="w-9 h-9 flex items-center justify-center"
                                style={{
                                    borderRadius: 'var(--radius-md)',
                                    background: i % 2 === 0 ? 'rgba(var(--accent-rgb), 0.12)' : 'rgba(var(--violet-rgb), 0.12)',
                                }}>
                                <card.icon size={18} style={{ color: i % 2 === 0 ? 'var(--accent)' : 'var(--violet)' }} />
                            </div>
                            <Badge variant={card.up ? 'success' : 'danger'} size="sm">
                                {card.delta}
                            </Badge>
                        </div>
                        <p className="mt-4 text-2xl font-bold" style={{ color: 'var(--h1)' }}>
                            {card.value}
                        </p>
                        <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                            {card.label}
                        </p>
                    </Card>
                ))}
            </div>

            {/* AI Insights */}
            <Card padding="md">
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-gradient font-bold text-sm">✦ AI Insights</span>
                    <Badge variant="primary" size="xs">
                        {AI_INSIGHTS.length} alerts
                    </Badge>
                </div>
                <div className="space-y-3">
                    {AI_INSIGHTS.map((insight) => (
                        <Card
                            key={`${insight.text}-${theme}`}
                            padding="sm"
                            hoverEffect={false}
                            className="flex items-start gap-3 border-l-4"
                            style={{
                                background: 'var(--bg-hover)',
                                borderLeftColor: `var(--${PRIORITY_VARIANTS[insight.priority]})`
                            }}
                        >
                            <insight.icon size={15} style={{ color: `var(--${PRIORITY_VARIANTS[insight.priority]})`, flexShrink: 0, marginTop: 1 }} />
                            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{insight.text}</p>
                        </Card>
                    ))}
                </div>
            </Card>

            {/* Charts — Performance Overview & Team Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Performance Overview — Line Chart */}
                <Card>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <p className="text-sm font-bold" style={{ color: 'var(--h2)' }}>Performance Overview</p>
                            <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>Revenue vs Expenses (monthly)</p>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider">
                            <span className="flex items-center gap-1.5" style={{ color: 'var(--accent)' }}>
                                <span className="w-3 h-0.5 rounded-full" style={{ background: 'var(--accent)' }} />
                                Revenue
                            </span>
                            <span className="flex items-center gap-1.5" style={{ color: 'var(--violet)' }}>
                                <span className="w-3 h-0.5 rounded-full" style={{ background: 'var(--violet)' }} />
                                Expenses
                            </span>
                        </div>
                    </div>
                    <div className="relative w-full" style={{ height: 180 }}>
                        <svg width="100%" height="100%" viewBox="0 0 400 160" preserveAspectRatio="none"
                            className="overflow-visible">
                            <defs>
                                <linearGradient id="perfFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="rgba(var(--accent-rgb), 0.20)" />
                                    <stop offset="100%" stopColor="rgba(var(--accent-rgb), 0)" />
                                </linearGradient>
                            </defs>
                            {/* Grid lines */}
                            {[0, 1, 2, 3, 4].map(i => (
                                <line key={i} x1="10" y1={20 + i * 30} x2="390" y2={20 + i * 30}
                                    stroke="var(--border-base)" strokeWidth="0.5" strokeDasharray="4 4" />
                            ))}
                            {/* Area fill */}
                            <motion.path d={areaPathA} fill="url(#perfFill)"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.5 }} />
                            {/* Revenue line */}
                            <motion.path d={perfPathA} fill="none" stroke="var(--accent)" strokeWidth="2.5"
                                strokeLinecap="round" strokeLinejoin="round"
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, ease: 'easeInOut' }} />
                            {/* Expenses line */}
                            <motion.path d={perfPathB} fill="none" stroke="var(--violet)" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 4"
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                transition={{ duration: 2, delay: 0.3, ease: 'easeInOut' }} />
                            {/* Data dots for revenue */}
                            {PERF_DATA.map((d, i) => {
                                const x = (i / (PERF_DATA.length - 1)) * 380 + 10
                                const y = 140 - (d.a / maxVal) * 120
                                return (
                                    <motion.circle key={`dot-${i}`} cx={x} cy={y} r="3.5"
                                        fill="var(--accent)" stroke="var(--bg-card)" strokeWidth="2"
                                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                                        transition={{ delay: 0.8 + i * 0.1 }} />
                                )
                            })}
                        </svg>
                        {/* X-axis labels */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 -mb-5">
                            {PERF_DATA.map(d => (
                                <span key={d.month} className="text-[9px] font-bold uppercase"
                                    style={{ color: 'var(--text-tertiary)' }}>{d.month}</span>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Team Activity — Horizontal Bars */}
                <Card>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <p className="text-sm font-bold" style={{ color: 'var(--h2)' }}>Team Activity</p>
                            <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>Sprint completion by department</p>
                        </div>
                        <Badge variant="primary" size="xs">This Sprint</Badge>
                    </div>
                    <div className="space-y-4">
                        {TEAM_DATA.map((team, i) => (
                            <div key={team.name} className="space-y-1.5">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{team.name}</span>
                                    <div className="flex items-center gap-3">
                                        <span style={{ color: 'var(--text-tertiary)' }}>{team.tasks} tasks</span>
                                        <span className="font-bold" style={{ color: team.color === 'accent' ? 'var(--accent)' : 'var(--violet)' }}>
                                            {team.progress}%
                                        </span>
                                    </div>
                                </div>
                                <div className="h-2 w-full overflow-hidden" style={{ borderRadius: 'var(--radius-full)', background: 'var(--bg-hover)' }}>
                                    <motion.div
                                        className="h-full"
                                        style={{
                                            borderRadius: 'var(--radius-full)',
                                            background: team.color === 'accent'
                                                ? 'linear-gradient(90deg, var(--accent), rgba(var(--accent-rgb), 0.7))'
                                                : 'linear-gradient(90deg, var(--violet), rgba(var(--violet-rgb), 0.7))',
                                        }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${team.progress}%` }}
                                        transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    )
}
