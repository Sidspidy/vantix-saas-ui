import { motion } from 'framer-motion'
import {
    ArrowUpRight, ArrowDownRight,
    Download, Calendar,
    Layers, Zap, Shield, Globe
} from 'lucide-react'
import Button from '../components/system/Button'
import Card from '../components/system/Card'
import Badge from '../components/system/Badge'

/* ── MOCK DATA ─────────────────────────────────────────────── */
const STATS = [
    { label: 'Active Sessions', value: '42.8k', trend: '+12.5%', isUp: true },
    { label: 'Neural Latency', value: '14ms', trend: '-2.1ms', isUp: true },
    { label: 'Compute Usage', value: '88.2%', trend: '+4.3%', isUp: false },
    { label: 'Task Throughput', value: '1.2M', trend: '+18.1%', isUp: true },
]

export default function Analytics() {
    return (
        <div className="space-y-6 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold" style={{ color: 'var(--h1)' }}>Neural Analytics</h1>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Real-time telemetry and operational intelligence.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="secondary" iconLeft={Calendar}>Last 30 Days</Button>
                    <Button iconLeft={Download}>Export Report</Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STATS.map((s, i) => (
                    <Card key={s.label} delay={i * 0.1}>
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>{s.label}</span>
                            <div className={`flex items-center gap-1 text-[10px] font-bold ${s.isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                                {s.isUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                                {s.trend}
                            </div>
                        </div>
                        <div className="text-2xl font-bold" style={{ color: 'var(--h2)' }}>{s.value}</div>

                        {/* Sparkline Mock */}
                        <div className="mt-4 h-8 flex items-end gap-1">
                            {[40, 70, 45, 90, 65, 80, 55, 95].map((h, j) => (
                                <motion.div
                                    key={j}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: i * 0.1 + j * 0.05 }}
                                    className={`flex-1 rounded-sm ${s.isUp ? 'bg-accent/40' : 'bg-red-500/40'}`}
                                />
                            ))}
                        </div>
                    </Card>
                ))}
            </div>

            {/* Main Analytics Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Traffic Flow Chart */}
                <Card className="lg:col-span-2 min-h-[400px]" delay={0.4}>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold" style={{ color: 'var(--h1)' }}>Operational Throughput</h3>
                            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Packets processed across all clusters (hourly).</p>
                        </div>
                        <div className="flex gap-2">
                            <Badge variant="info">Cluster A</Badge>
                            <Badge variant="secondary">Cluster B</Badge>
                        </div>
                    </div>

                    {/* SVG Chart */}
                    <div className="relative w-full h-80 mt-4">
                        <svg width="100%" height="100%" viewBox="0 0 400 160" preserveAspectRatio="none"
                            className="overflow-visible">
                            <defs>
                                <linearGradient id="analyticsFillA" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="rgba(var(--accent-rgb), 0.25)" />
                                    <stop offset="100%" stopColor="rgba(var(--accent-rgb), 0)" />
                                </linearGradient>
                                <linearGradient id="analyticsFillB" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="rgba(var(--violet-rgb), 0.15)" />
                                    <stop offset="100%" stopColor="rgba(var(--violet-rgb), 0)" />
                                </linearGradient>
                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            {/* Grid lines */}
                            {[0, 1, 2, 3, 4, 5].map(i => (
                                <line key={i} x1="10" y1={10 + i * 28} x2="390" y2={10 + i * 28}
                                    stroke="var(--border-base)" strokeWidth="0.5" strokeDasharray="4 4" />
                            ))}

                            {/* Area fills */}
                            <motion.path
                                d="M10 140 Q 50 80, 90 110 T 170 30 T 250 95 T 330 20 T 390 65 L 390 150 L 10 150 Z"
                                fill="url(#analyticsFillA)"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />

                            {/* Lines */}
                            {/* Cluster A */}
                            <motion.path
                                d="M10 140 Q 50 80, 90 110 T 170 30 T 250 95 T 330 20 T 390 65"
                                fill="none"
                                stroke="var(--accent)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                filter="url(#glow)"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
                            />

                            {/* Cluster B */}
                            <motion.path
                                d="M10 150 Q 60 120, 110 135 T 200 60 T 290 110 T 360 40 T 390 80"
                                fill="none"
                                stroke="var(--violet)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeDasharray="6 4"
                                opacity={0.6}
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2.2, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                            />

                            {/* Cluster C (Mock) */}
                            <motion.path
                                d="M10 120 C 40 120, 70 50, 100 70 S 160 140, 200 100 S 260 20, 300 50 S 360 110, 390 90"
                                fill="none"
                                stroke="rgba(var(--accent-rgb), 0.3)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2.5, delay: 0.2 }}
                            />

                            {/* Data points for Cluster A */}
                            {[
                                [10, 140], [90, 110], [170, 30], [250, 95], [330, 20], [390, 65]
                            ].map(([cx, cy], j) => (
                                <g key={j}>
                                    <motion.circle
                                        cx={cx} cy={cy} r="6"
                                        fill="var(--accent)"
                                        fillOpacity={0.15}
                                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                                        transition={{ delay: 1.5 + j * 0.1 }}
                                    />
                                    <motion.circle
                                        cx={cx} cy={cy} r="3"
                                        fill="var(--accent)"
                                        stroke="var(--bg-card)"
                                        strokeWidth="2"
                                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                                        transition={{ delay: 1.2 + j * 0.1 }}
                                    />
                                </g>
                            ))}
                        </svg>
                    </div>

                    <div className="flex justify-between mt-6 px-2 text-[10px] uppercase font-bold tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
                        {['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'].map(t => (
                            <span key={t}>{t}</span>
                        ))}
                    </div>
                </Card>

                {/* Regional Allocation */}
                <Card delay={0.5}>
                    <div className="mb-6">
                        <h3 className="text-lg font-bold" style={{ color: 'var(--h1)' }}>Neural Custody</h3>
                        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Distribution of AI resources by region.</p>
                    </div>

                    <div className="space-y-6">
                        {[
                            { name: 'North America', icon: Globe, val: 45, color: 'bg-accent' },
                            { name: 'EU-Brussels', icon: Shield, val: 32, color: 'bg-[#9B8FFF]' },
                            { name: 'Asia-Pacific', icon: Zap, val: 18, color: 'bg-amber-400' },
                            { name: 'Other', icon: Layers, val: 5, color: 'bg-slate-500' },
                        ].map((region) => (
                            <div key={region.name} className="space-y-2">
                                <div className="flex items-center justify-between text-xs font-bold">
                                    <div className="flex items-center gap-2">
                                        <region.icon size={14} className="text-[var(--text-tertiary)]" />
                                        <span style={{ color: 'var(--text-secondary)' }}>{region.name}</span>
                                    </div>
                                    <span style={{ color: 'var(--text-primary)' }}>{region.val}%</span>
                                </div>
                                <div className="h-2 w-full bg-[var(--bg-hover)] rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${region.val}%` }}
                                        className={`h-full ${region.color}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button variant="secondary" className="w-full mt-8" size="sm">Modify Allocation</Button>
                </Card>
            </div>

            {/* Activity Map (Heatmap style) */}
            <Card delay={0.6}>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-bold" style={{ color: 'var(--h1)' }}>System Pulse</h3>
                        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Cluster activation frequency (yearly).</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1.5 opacity-80">
                    {Array.from({ length: 156 }).map((_, i) => {
                        const intensity = Math.random()
                        return (
                            <div
                                key={i}
                                className="w-3.5 h-3.5 rounded-[2px]"
                                style={{
                                    background: intensity > 0.8 ? 'var(--accent)' :
                                        intensity > 0.5 ? 'rgba(var(--accent-rgb), 0.5)' :
                                            intensity > 0.3 ? 'rgba(var(--accent-rgb), 0.2)' :
                                                'var(--bg-hover)'
                                }}
                            />
                        )
                    })}
                </div>
            </Card>
        </div>
    )
}
