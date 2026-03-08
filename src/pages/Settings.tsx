import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    User, Shield, Bell,
    Monitor, Globe, Sparkles, Plus,
    Cloud, HardDrive, Key, Zap,
    Save, RefreshCw, LogOut,
    CheckCircle2, CreditCard, AlertTriangle
} from 'lucide-react'
import Button from '../components/system/Button'
import Card from '../components/system/Card'
import Badge from '../components/system/Badge'

/* ── CONFIG SECTIONS ────────────────────────────────────────── */
const SECTIONS = [
    { id: 'profile', label: 'Identity & Profile', icon: User, desc: 'Manage operational identity and credentials.' },
    { id: 'security', label: 'Security Protocols', icon: Shield, desc: 'Encryption nodes, MFA, and access custody.' },
    { id: 'notifs', label: 'Tactical Feedback', icon: Bell, desc: 'Notification thresholds and alert routing.' },
    { id: 'appearance', label: 'Interface Interface', icon: Monitor, desc: 'Visual rendering, theme, and neural flow.' },
    { id: 'billing', label: 'Institutional Billing', icon: CreditCard, desc: 'Subscription tier and transaction history.' },
    { id: 'api', label: 'API Connectors', icon: Key, desc: 'Integrations and tactical webhook triggers.' },
]

export default function Settings() {
    const [activeSection, setActiveSection] = useState('profile')
    const [isLoading, setIsLoading] = useState(false)
    const [isSaved, setIsSaved] = useState(false)

    const handleSave = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setIsSaved(true)
            setTimeout(() => setIsSaved(false), 3000)
        }, 1200)
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold" style={{ color: 'var(--h1)' }}>System Settings</h1>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Override operational parameters and system logic.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="ghost" iconLeft={LogOut} className="text-red-500 hover:bg-red-500/10">Terminate Session</Button>
                    <Button
                        iconLeft={isSaved ? CheckCircle2 : Save}
                        isLoading={isLoading}
                        onClick={handleSave}
                        variant={isSaved ? 'ghost' : 'primary'}
                    >
                        {isSaved ? 'Protocols Updated' : 'Push Changes'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-4">
                {/* Navigation Sidebar (Local) */}
                <div className="space-y-1">
                    {SECTIONS.map((sec) => (
                        <button
                            key={sec.id}
                            onClick={() => setActiveSection(sec.id)}
                            className={`
                                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left
                                ${activeSection === sec.id
                                    ? 'shadow-lg shadow-accent/20'
                                    : 'hover:bg-[var(--bg-hover)] text-[var(--text-secondary)]'
                                }
                            `}
                            style={{
                                background: activeSection === sec.id ? 'var(--accent)' : 'transparent',
                                color: activeSection === sec.id ? '#fff' : 'inherit'
                            }}
                        >
                            <sec.icon size={18} className={activeSection === sec.id ? 'text-white' : 'text-accent'} />
                            <span className="font-bold text-sm tracking-tight">{sec.label}</span>
                        </button>
                    ))}
                </div>

                {/* Main Content Pane */}
                <div className="lg:col-span-3">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Card padding="lg">
                                {/* Dynamic Content based on section */}
                                <div className="mb-8 pb-6 border-b" style={{ borderColor: 'var(--border-base)' }}>
                                    <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                                        {SECTIONS.find(s => s.id === activeSection)?.label}
                                    </h3>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                        {SECTIONS.find(s => s.id === activeSection)?.desc}
                                    </p>
                                </div>

                                {activeSection === 'profile' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-6">
                                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent to-[#9B8FFF] flex items-center justify-center text-white text-3xl font-black shadow-2xl relative group overflow-hidden">
                                                AT
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                                                    <RefreshCw size={24} />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Alex Thompson</p>
                                                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Tactical Lead — Unit 04</p>
                                                <Badge variant="ghost" size="xs">Identity Verified</Badge>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-wider pl-1" style={{ color: 'var(--text-tertiary)' }}>Deployment Name</label>
                                                <input type="text" defaultValue="Alex Thompson" className="w-full h-11 px-4 rounded-btn border bg-[var(--bg-secondary)]" style={{ borderColor: 'var(--border-base)', color: 'var(--text-primary)', outline: 'none' }} />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-wider pl-1" style={{ color: 'var(--text-tertiary)' }}>Operational Email</label>
                                                <input type="email" defaultValue="alex@vantix.ai" className="w-full h-11 px-4 rounded-btn border bg-[var(--bg-secondary)]" style={{ borderColor: 'var(--border-base)', color: 'var(--text-primary)', outline: 'none' }} />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-wider pl-1" style={{ color: 'var(--text-tertiary)' }}>Institutional Role (Static)</label>
                                            <div className="p-3 rounded-btn border flex items-center gap-3" style={{ borderColor: 'var(--border-base)', background: 'var(--bg-secondary)' }}>
                                                <Shield size={16} className="text-accent" />
                                                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Full Administrative Control Protocol</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeSection === 'security' && (
                                    <div className="space-y-6">
                                        <Card padding="sm" className="bg-red-500/5 border-red-500/20" hoverEffect={false} style={{ borderRadius: 'var(--radius-xl)' }}>
                                            <div className="flex items-start gap-3">
                                                <AlertTriangle size={18} className="text-red-500 mt-0.5" />
                                                <div>
                                                    <h4 className="font-bold text-sm text-red-500 mb-1">MFA Override Detected</h4>
                                                    <p className="text-xs text-[var(--text-secondary)]">Multi-factor encryption is required for Unit 04 tactical operations.</p>
                                                    <a href="#" className="text-xs font-bold text-red-500 underline mt-2 inline-block">Initialize MFA Node</a>
                                                </div>
                                            </div>
                                        </Card>

                                        <div className="space-y-4">
                                            {[
                                                { id: 1, label: 'Neural Key Rotation', desc: 'Auto-rotate encryption keys every 48h.', icon: Key, active: true },
                                                { id: 2, label: 'Regional Lock', desc: 'Secure login restricted to Unit Headquarters.', icon: Globe, active: false },
                                                { id: 3, label: 'Hardware Custody', desc: 'Require YubiKey for sensitive operations.', icon: HardDrive, active: false },
                                            ].map((item) => (
                                                <div key={item.id} className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-base)] bg-[var(--bg-secondary)]/50">
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-2 rounded-lg bg-[var(--bg-hover)] text-accent"><item.icon size={18} /></div>
                                                        <div>
                                                            <h4 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{item.label}</h4>
                                                            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{item.desc}</p>
                                                        </div>
                                                    </div>
                                                    <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${item.active ? 'bg-accent' : 'bg-slate-700'}`}>
                                                        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${item.active ? 'right-1' : 'left-1'}`} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeSection === 'notifs' && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 gap-4">
                                            {[
                                                { label: 'Neural Activity Alerts', desc: 'Real-time feedback on AI computations.', active: true },
                                                { label: 'Network Latency Warning', desc: 'Trigger alert when system latency exceeds 50ms.', active: true },
                                                { label: 'Project Status Updates', desc: 'Batch notifications for task completions.', active: false },
                                                { label: 'Billing & Quota Alerts', desc: 'Notify when account reaches 80% usage.', active: true }
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-base)] bg-[var(--bg-secondary)]/50">
                                                    <div>
                                                        <h4 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{item.label}</h4>
                                                        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{item.desc}</p>
                                                    </div>
                                                    <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${item.active ? 'bg-accent' : 'bg-slate-700'}`}>
                                                        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${item.active ? 'right-1' : 'left-1'}`} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeSection === 'appearance' && (
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="p-4 rounded-xl border-2 border-accent bg-accent/5 cursor-pointer">
                                                <div className="flex justify-between items-center mb-4">
                                                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white"><Monitor size={18} /></div>
                                                    <div className="w-4 h-4 rounded-full border-2 border-accent flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-accent" /></div>
                                                </div>
                                                <h4 className="font-bold text-sm">System Default</h4>
                                                <p className="text-[10px] text-[var(--text-tertiary)]">Synchronize with device logic.</p>
                                            </div>
                                            <div className="p-4 rounded-xl border border-[var(--border-base)] hover:border-accent/40 bg-[var(--bg-secondary)] cursor-pointer transition-all">
                                                <div className="flex justify-between items-center mb-4">
                                                    <div className="w-8 h-8 rounded-lg bg-violet flex items-center justify-center text-white"><Sparkles size={18} /></div>
                                                    <div className="w-4 h-4 rounded-full border-2 border-[var(--border-base)]" />
                                                </div>
                                                <h4 className="font-bold text-sm">High Contrast</h4>
                                                <p className="text-[10px] text-[var(--text-tertiary)]">Optimize for visual clarity.</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-tertiary)]">Neural Flow Speed</h4>
                                            <div className="flex items-center gap-4">
                                                <div className="flex-1 h-2 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
                                                    <div className="w-[60%] h-full bg-gradient-brand" />
                                                </div>
                                                <span className="text-xs font-bold text-accent">Balanced</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeSection === 'billing' && (
                                    <div className="space-y-8">
                                        <div className="p-6 rounded-2xl bg-gradient-brand text-white relative overflow-hidden group">
                                            <div className="relative z-10">
                                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mb-1">Current Tier</p>
                                                <h3 className="text-3xl font-black mb-6">Enterprise OS</h3>
                                                <div className="flex items-center gap-6">
                                                    <div>
                                                        <p className="text-[10px] uppercase opacity-70">Operators</p>
                                                        <p className="font-bold">UNLIMITED</p>
                                                    </div>
                                                    <div className="w-px h-8 bg-white/20" />
                                                    <div>
                                                        <p className="text-[10px] uppercase opacity-70">Next Cycle</p>
                                                        <p className="font-bold">OCT 24, 2026</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-tertiary)]">Payment Protocol</h4>
                                            <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-base)] bg-[var(--bg-secondary)]">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-8 rounded border border-white/10 bg-black flex items-center justify-center text-[10px] font-bold italic tracking-tighter">VISA</div>
                                                    <div>
                                                        <p className="text-sm font-bold">•••• •••• •••• 4242</p>
                                                        <p className="text-[10px] text-[var(--text-tertiary)]">Expires 12/28</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="sm">Override</Button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeSection === 'api' && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {[
                                                { name: 'Stellar Node', status: 'Connected', icon: Globe },
                                                { name: 'Aether Engine', status: 'Connected', icon: Zap },
                                                { name: 'Neural Path', status: 'Inactive', icon: Sparkles },
                                                { name: 'Custom Hook', status: 'Active', icon: Key },
                                            ].map((node, i) => (
                                                <div key={i} className="p-4 rounded-xl border border-[var(--border-base)] bg-[var(--bg-secondary)] group hover:border-accent transition-all">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="w-10 h-10 rounded-lg bg-[var(--bg-hover)] text-accent flex items-center justify-center"><node.icon size={20} /></div>
                                                        <Badge variant={node.status === 'Inactive' ? 'ghost' : 'success'} size="xs">{node.status}</Badge>
                                                    </div>
                                                    <h4 className="font-bold text-sm mb-1">{node.name}</h4>
                                                    <p className="text-[10px] text-[var(--text-tertiary)] mb-4">Tactical endpoint for external logic.</p>
                                                    <Button variant="ghost" className="w-full text-[10px] py-1 h-8" size="sm">CONFIGURE</Button>
                                                </div>
                                            ))}
                                        </div>
                                        <Button variant="primary" iconLeft={Plus} className="w-full">Initialize New Connector</Button>
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
