import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Bell, CheckCircle2, AlertTriangle,
    MessageSquare, Shield, Clock,
    MoreVertical, Trash2, Settings
} from 'lucide-react'
import Button from '../components/system/Button'
import Card from '../components/system/Card'

/* ── MOCK NOTIFICATIONS ────────────────────────────────────── */
const MOCK_NOTIFS = [
    {
        id: '1', type: 'system', title: 'Neural Cluster Optimizing',
        desc: 'Cluster A-7 throughput increased by 14.2% after local recalibration.',
        time: '2m ago', isUnread: true, priority: 'info'
    },
    {
        id: '2', type: 'security', title: 'Unauthorized Protocol Blocked',
        desc: 'Security node 4 prevents credential override from proxy region 3.',
        time: '15m ago', isUnread: true, priority: 'danger'
    },
    {
        id: '3', type: 'team', title: 'Protocol Update',
        desc: 'Alex Thompson modified "Aether Engine Core" security parameters.',
        time: '1h ago', isUnread: false, priority: 'warning'
    },
    {
        id: '4', type: 'system', title: 'Weekly Insight Ready',
        desc: 'Operational summary for Period 24 is processed and available.',
        time: '4h ago', isUnread: false, priority: 'success'
    },
]

const PRIORITY_VARIANTS: Record<string, any> = {
    info: 'info',
    danger: 'danger',
    warning: 'warning',
    success: 'success',
}

export default function Notifications() {
    const [notifs, setNotifs] = useState(MOCK_NOTIFS)

    const markAllRead = () => {
        setNotifs(prev => prev.map(n => ({ ...n, isUnread: false })))
    }

    const clearAll = () => {
        setNotifs([])
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold" style={{ color: 'var(--h1)' }}>Notification Hub</h1>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Tactical feedback and system alerts.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" iconLeft={CheckCircle2} onClick={markAllRead}>Mark all read</Button>
                    <Button variant="ghost" size="sm" iconLeft={Trash2} onClick={clearAll} className="text-red-500 hover:bg-red-500/10">Clear all</Button>
                    <Button variant="secondary" size="icon"><Settings size={18} /></Button>
                </div>
            </div>

            {/* Content Area */}
            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {notifs.length > 0 ? (
                        notifs.map((n, i) => (
                            <motion.div
                                key={n.id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Card padding="sm" hoverEffect={false} className={`relative border-l-4 ${n.isUnread ? 'bg-accent/5' : ''}`}
                                    style={{ borderLeftColor: `var(--${PRIORITY_VARIANTS[n.priority]})` }}>
                                    <div className="flex items-start gap-4">
                                        <div className={`p-2 rounded-xl mt-1 ${n.isUnread ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'bg-[var(--bg-secondary)] text-[var(--text-tertiary)]'}`}>
                                            {n.type === 'system' && <Shield size={18} />}
                                            {n.type === 'security' && <AlertTriangle size={18} />}
                                            {n.type === 'team' && <MessageSquare size={18} />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{n.title}</h4>
                                                <span className="text-[10px] uppercase font-bold tracking-widest" style={{ color: 'var(--text-tertiary)' }}>{n.time}</span>
                                            </div>
                                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{n.desc}</p>
                                            <div className="flex items-center gap-3 mt-4">
                                                <Button size="sm" variant="accent-subtle" className="text-[10px] h-7 px-3">View Details</Button>
                                                <Button size="sm" variant="ghost" className="text-[10px] h-7 px-3">Ignore</Button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            {n.isUnread && <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />}
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-[var(--text-tertiary)]"><MoreVertical size={14} /></Button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))
                    ) : (
                        <Card className="py-16 text-center">
                            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                                <Bell size={32} className="text-accent opacity-40" />
                            </div>
                            <h2 className="text-xl font-bold mb-2">Interface Silent</h2>
                            <p className="text-sm text-[var(--text-secondary)] mb-8">
                                No active tactical notifications. You are up to date with all operational protocols.
                            </p>
                        </Card>
                    )}
                </AnimatePresence>
            </div>

            {/* Recommendation Strip */}
            <Card variant="glass" className="border-accent/20" glow>
                <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shadow-lg shadow-accent/20">
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-sm tracking-tight" style={{ color: 'var(--text-primary)' }}>Historical Telemetry Request</p>
                            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Generate operational report for Period 23 based on neural logs.</p>
                        </div>
                    </div>
                    <Button variant="accent-subtle" size="sm">Initiate Report</Button>
                </div>
            </Card>
        </div>
    )
}
