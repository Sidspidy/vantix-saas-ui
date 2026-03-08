import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import {
    Zap, Shield, BarChart3, Bot,
    ArrowRight, Layers, Sparkles,
    Check, Star, Play, Globe,
    ChevronRight, Lock,
    Plus,
    Bell,
    User
} from 'lucide-react'
import Button from '../components/system/Button'
import ThemeToggle from '../components/system/ThemeToggle'

/* ─── ANIMATION VARIANTS ─────────────────────────────────── */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { 
            duration: 0.6, 
            delay: i * 0.1, 
            ease: "easeOut"
        }
    })
}

/* ─── DATA ────────────────────────────────────────────────── */
const FEATURES = [
    { title: 'AI Neural Engine', desc: 'Context-aware intelligence that predicts bottlenecks before they form.', icon: Bot, gradient: 'from-[var(--accent)] to-[var(--violet)]', stat: '94%', statLabel: 'Prediction accuracy' },
    { title: 'Tactical Visualizer', desc: 'Multi-dimensional KPI tracking with real-time data orchestration.', icon: BarChart3, gradient: 'from-[var(--violet)] to-[#C084FC]', stat: '2.4x', statLabel: 'Faster insights' },
    { title: 'Zero-Trust Custody', desc: 'Military-grade encryption with biometric and role-based access.', icon: Shield, gradient: 'from-[#60A5FA] to-[var(--accent)]', stat: 'SOC2', statLabel: 'Type II certified' },
    { title: 'Atomic Scale', desc: 'From lean startups to global empires — scales without compromise.', icon: Layers, gradient: 'from-[var(--accent)] to-[#38BDF8]', stat: '10M+', statLabel: 'Operations/sec' },
]

const BRANDS = ['CYBERNE', 'AETHER', 'HYPERION', 'NOVA ★', 'OMEGA', 'AXIOM', 'PARALLAX', 'SENTINEL']

const TESTIMONIALS = [
    { name: 'Sarah Chen', role: 'CTO, Hyperion Labs', text: 'Vantix replaced 5 tools in our stack. The AI engine alone saved us 40 hours per week.', avatar: 'SC' },
    { name: 'Marcus Webb', role: 'VP Operations, NovaStar', text: "The real-time analytics changed how we make decisions. It's like having a sixth sense.", avatar: 'MW' },
    { name: 'Priya Sharma', role: 'Founder, AetherAI', text: "Best enterprise platform we've deployed. The security model gave our board confidence.", avatar: 'PS' },
]

export default function Landing() {
    const heroRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden" style={{ background: 'var(--bg-primary)' }}>

            {/* ═══════════ FLOATING NAV ═══════════ */}
            <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl"
                style={{
                    background: 'rgba(var(--accent-rgb), 0.03)',
                    backdropFilter: 'blur(24px) saturate(180%)',
                    border: '1px solid rgba(var(--accent-rgb), 0.10)',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(var(--violet-rgb), 0.06)',
                }}>
                <div className="flex items-center justify-between h-14 px-5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-brand flex items-center justify-center shadow-lg"
                            style={{ borderRadius: 'var(--radius-md)', boxShadow: '0 0 20px rgba(var(--violet-rgb), 0.3)' }}>
                            <Zap size={16} className="text-white fill-white" />
                        </div>
                        <span className="font-black text-lg tracking-tight text-gradient">VANTIX</span>
                    </div>
                    <div className="hidden md:flex items-center gap-7">
                        {['Platform', 'Solutions', 'Enterprise', 'Pricing'].map(l => (
                            <a key={l} href="#" className="text-sm font-medium hover:text-[var(--accent)] transition-colors"
                                style={{ color: 'var(--text-tertiary)' }}>{l}</a>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <Link to="/login">
                            <Button variant="ghost" size="sm">Sign In</Button>
                        </Link>
                        <Link to="/register">
                            <Button size="sm" className="bg-gradient-brand border-0 shadow-lg"
                                style={{ boxShadow: '0 4px 20px rgba(var(--violet-rgb), 0.25)' }}>
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* ═══════════ HERO ═══════════ */}
            <section ref={heroRef} className="relative pt-36 pb-28 px-6 overflow-hidden min-h-[100vh] flex items-center">
                {/* BG environment */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 grid-pattern opacity-60" />
                    <div className="absolute inset-0 mesh-gradient" />
                    <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] rounded-full animate-float-slow"
                        style={{ background: 'radial-gradient(circle, rgba(var(--accent-rgb), 0.12) 0%, transparent 70%)' }} />
                    <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full animate-float-medium"
                        style={{ background: 'radial-gradient(circle, rgba(var(--violet-rgb), 0.10) 0%, transparent 70%)' }} />
                    <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] rounded-full animate-float-slow"
                        style={{ background: 'radial-gradient(circle, rgba(var(--accent-rgb), 0.06) 0%, transparent 70%)', animationDelay: '4s' }} />
                    <div className="absolute inset-0 noise-texture" />
                    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 0%, var(--bg-primary) 80%)' }} />
                </div>

                <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-6xl mx-auto text-center relative z-10 w-full">
                    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 border mb-8"
                            style={{
                                borderRadius: 'var(--radius-full)',
                                background: 'rgba(var(--violet-rgb), 0.08)',
                                borderColor: 'rgba(var(--violet-rgb), 0.20)',
                            }}>
                            <Sparkles size={14} style={{ color: 'var(--violet)' }} />
                            <span className="text-xs font-bold tracking-wide" style={{ color: 'var(--violet)' }}>PLATFORM 4.0 — AI NATIVE</span>
                            <ChevronRight size={14} style={{ color: 'var(--violet)' }} />
                        </div>
                    </motion.div>

                    <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.95]"
                        style={{ color: 'var(--h1)' }}>
                        Operations at the<br />
                        <span className="text-gradient-hero">Speed of Thought</span>
                    </motion.h1>

                    <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
                        className="max-w-2xl mx-auto text-lg md:text-xl mb-12 leading-relaxed"
                        style={{ color: 'var(--text-secondary)' }}>
                        The AI-native enterprise control center. Synchronize teams,
                        automate workflows, and visualize success with{' '}
                        <span className="text-gradient font-semibold">tactical precision</span>.
                    </motion.p>

                    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
                        className="flex flex-wrap items-center justify-center gap-4 mb-6">
                        <Link to="/dashboard">
                            <Button size="lg" iconRight={ArrowRight}
                                className="bg-gradient-brand border-0 text-base px-8 h-14 shadow-xl"
                                style={{ boxShadow: '0 8px 40px rgba(var(--violet-rgb), 0.3)' }}>
                                Enter Command Center
                            </Button>
                        </Link>
                        <Button size="lg" variant="secondary" className="text-base px-8 h-14" iconLeft={Play}>
                            Watch Demo
                        </Button>
                    </motion.div>

                    <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={4}
                        className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>
                        <span className="inline-flex items-center gap-1.5"><Lock size={11} /> No credit card required</span>
                        <span className="mx-3 opacity-30">•</span>
                        <span>SOC2 Type II</span>
                        <span className="mx-3 opacity-30">•</span>
                        <span>99.99% Uptime</span>
                    </motion.p>
                </motion.div>
            </section>

            {/* ═══════════ DASHBOARD MOCKUP ═══════════ */}
            <section className="relative px-6 -mt-10 mb-24 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="max-w-6xl mx-auto relative"
                >
                    <div className="absolute -inset-6 -z-10"
                        style={{ background: 'linear-gradient(135deg, rgba(var(--accent-rgb), 0.12), rgba(var(--violet-rgb), 0.08))', filter: 'blur(80px)', borderRadius: 'var(--radius-xl)' }} />

                    <div className="overflow-hidden border shadow-2xl"
                        style={{ borderColor: 'rgba(var(--accent-rgb), 0.12)', borderRadius: 'var(--radius-xl)', boxShadow: '0 25px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(var(--violet-rgb), 0.05)' }}>
                        {/* Chrome bar */}
                        <div className="h-10 flex items-center px-4 gap-2 border-b" style={{ background: 'var(--bg-sidebar)', borderColor: 'var(--border-base)' }}>
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="h-6 w-72 flex items-center justify-center text-[10px] font-mono"
                                    style={{ borderRadius: 'var(--radius-md)', background: 'rgba(var(--accent-rgb), 0.06)', color: 'var(--text-tertiary)' }}>
                                    🔒 app.vantix.ai/dashboard
                                </div>
                            </div>
                        </div>
                        {/* Dashboard */}
                        <div className="h-[380px] sm:h-[480px] md:h-[560px] w-full flex" style={{ background: 'var(--bg-primary)' }}>
                            {/* Sidebar */}
                            <div className="w-14 border-r flex flex-col items-center py-4 gap-3"
                                style={{ borderColor: 'var(--border-base)', background: 'var(--bg-sidebar)' }}>
                                <div className="w-7 h-7 bg-gradient-brand flex items-center justify-center" style={{ borderRadius: 'var(--radius-sm)' }}>
                                    <Zap size={12} className="text-white" />
                                </div>
                                {[1, 2, 3, 4].map(k => (
                                    <div key={k} className="w-6 h-6" style={{
                                        borderRadius: 'var(--radius-sm)',
                                        background: k === 1 ? 'rgba(var(--accent-rgb), 0.15)' : 'rgba(var(--violet-rgb), 0.06)',
                                    }} />
                                ))}
                            </div>
                            {/* Main */}
                            <div className="flex-1 flex flex-col min-w-0">
                                <div className="h-12 border-b flex items-center justify-between px-5" style={{ borderColor: 'var(--border-base)' }}>
                                    <div className="w-40 h-4 rounded-full" style={{ background: 'rgba(var(--accent-rgb), 0.08)' }} />
                                    <div className="flex gap-2">
                                        <Link to="/notifications" className="w-6 h-6 rounded-full flex items-center justify-center hover:scale-110 transition-transform" style={{ background: 'rgba(var(--violet-rgb), 0.1)' }}>
                                            <Bell size={10} className="text-[var(--violet)]" />
                                        </Link>
                                        <Link to="/settings" className="w-6 h-6 rounded-full bg-gradient-brand flex items-center justify-center hover:scale-110 transition-transform shadow-sm">
                                            <User size={10} className="text-white" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex-1 p-5 space-y-4 overflow-hidden">
                                    {/* KPI Row */}
                                    <div className="grid grid-cols-4 gap-3">
                                        {[
                                            { v: '$284,500', l: 'Revenue', c: 'accent', d: '+12.4%' },
                                            { v: '1,847', l: 'Operators', c: 'violet', d: '+5.3%' },
                                            { v: '94.2%', l: 'Efficiency', c: 'accent', d: '+3.1%' },
                                            { v: '99.7%', l: 'Health', c: 'violet', d: '+0.2%' },
                                        ].map((kpi, i) => (
                                            <motion.div key={i}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.8 + i * 0.1, type: 'spring', stiffness: 200 }}
                                                className="h-[80px] p-3 flex flex-col justify-between group"
                                                style={{
                                                    borderRadius: 'var(--radius-md)',
                                                    background: 'rgba(var(--bg-card-rgb), 0.5)',
                                                    border: '1px solid var(--border-base)',
                                                    backdropFilter: 'blur(4px)'
                                                }}>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[8px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>{kpi.l}</span>
                                                    <span className="text-[9px] font-bold px-1 rounded" style={{ color: 'var(--success)', background: 'rgba(var(--success-rgb), 0.1)' }}>{kpi.d}</span>
                                                </div>
                                                <span className="text-sm font-bold tracking-tighter" style={{ color: 'var(--text-primary)' }}>{kpi.v}</span>
                                                <div className="w-full h-1 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: '70%' }}
                                                        transition={{ duration: 1, delay: 1.2 + i * 0.1 }}
                                                        className="h-full"
                                                        style={{ background: kpi.c === 'accent' ? 'var(--accent)' : 'var(--violet)' }}
                                                    />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    {/* Chart */}
                                    <div className="h-44 relative overflow-hidden flex flex-col p-4"
                                        style={{ borderRadius: 'var(--radius-md)', background: 'rgba(var(--bg-card-rgb), 0.3)', border: '1px solid var(--border-base)' }}>
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="flex gap-4">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-2 h-2 rounded-full bg-accent" />
                                                    <span className="text-[8px] font-bold">NODE THRU</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-2 h-2 rounded-full bg-violet" />
                                                    <span className="text-[8px] font-bold">LATENCY</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-1">
                                                {[1, 2, 3].map(m => <div key={m} className="w-6 h-1 rounded-full" style={{ background: m === 1 ? 'var(--accent)' : 'var(--border-base)' }} />)}
                                            </div>
                                        </div>
                                        <div className="flex-1 relative">
                                            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
                                                <defs>
                                                    <linearGradient id="landing-g1" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="rgba(var(--accent-rgb), 0.3)" />
                                                        <stop offset="100%" stopColor="rgba(var(--accent-rgb), 0)" />
                                                    </linearGradient>
                                                </defs>
                                                <motion.path d="M0 80 Q 50 20, 100 60 T 200 30 T 300 70 T 400 20"
                                                    fill="none" stroke="var(--accent)" strokeWidth="3"
                                                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                                                    viewport={{ once: true }} transition={{ duration: 2.5, delay: 1 }} />
                                                <motion.path d="M0 80 Q 50 20, 100 60 T 200 30 T 300 70 T 400 20 L 400 100 L 0 100 Z"
                                                    fill="url(#landing-g1)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                                                    viewport={{ once: true }} transition={{ duration: 1.5, delay: 1.5 }} />
                                                {/* Dots at peaks */}
                                                {[100, 200, 400].map((x, i) => (
                                                    <motion.circle key={i} cx={x} cy={x === 100 ? 60 : x === 200 ? 30 : 20} r="3" fill="var(--accent)" stroke="var(--bg-primary)" strokeWidth="1"
                                                        initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 2.5 + i * 0.2 }} />
                                                ))}
                                            </svg>
                                        </div>
                                    </div>
                                    {/* Bottom cards */}
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { t: 'Active Neural Link', s: 'Stellar Node 04', p: '98%', c: 'accent' },
                                            { t: 'Security Audit', s: 'Protocol Omega', s2: 'Secure', c: 'violet' },
                                            { t: 'Resource Usage', s: 'Compute Cluster B', p: '42%', c: 'accent' },
                                        ].map((card, i) => (
                                            <div key={i} className="h-24 p-3 flex flex-col justify-between" style={{
                                                borderRadius: 'var(--radius-md)',
                                                background: 'rgba(var(--bg-card-rgb), 0.4)',
                                                border: '1px solid var(--border-base)',
                                            }}>
                                                <div className="flex justify-between">
                                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: card.c === 'accent' ? 'rgba(var(--accent-rgb), 0.1)' : 'rgba(var(--violet-rgb), 0.1)', color: card.c === 'accent' ? 'var(--accent)' : 'var(--violet)' }}>
                                                        <Plus size={14} />
                                                    </div>
                                                    <div className="flex -space-x-2">
                                                        {[1, 2, 3].map(a => <div key={a} className="w-5 h-5 rounded-full border border-dark-900 bg-dark-700" style={{ background: `hsl(${a * 40}, 60%, 50%)` }} />)}
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-bold truncate" style={{ color: 'var(--text-primary)' }}>{card.t}</p>
                                                    <p className="text-[8px] uppercase tracking-tighter" style={{ color: 'var(--text-tertiary)' }}>{card.s}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ═══════════ INFINITE SCROLL BRANDS ═══════════ */}
            <section className="py-14 border-y overflow-hidden relative" style={{ borderColor: 'var(--border-base)' }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-center mb-8" style={{ color: 'var(--text-tertiary)' }}>
                    Trusted by industry catalysts worldwide
                </p>
                <div className="relative">
                    {/* Fade edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(90deg, var(--bg-primary), transparent)' }} />
                    <div className="absolute right-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(270deg, var(--bg-primary), transparent)' }} />
                    {/* Scrolling track */}
                    <div className="flex marquee-scroll" style={{ width: 'max-content' }}>
                        {[...BRANDS, ...BRANDS].map((l, i) => (
                            <span key={`${l}-${i}`}
                                className="text-2xl font-black tracking-tighter mx-12 whitespace-nowrap select-none opacity-20 hover:opacity-70 transition-opacity cursor-default"
                                style={{ color: 'var(--h1)' }}>
                                {l}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ FEATURES — HORIZONTAL SCROLL CARDS ═══════════ */}
            <section className="py-28 px-6 relative">
                <div className="absolute inset-0 mesh-gradient opacity-40 -z-10" />
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] px-4 py-2 border inline-block mb-6"
                                style={{ color: 'var(--accent)', borderColor: 'rgba(var(--accent-rgb), 0.2)', background: 'rgba(var(--accent-rgb), 0.05)', borderRadius: 'var(--radius-full)' }}>
                                Core Capabilities
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6" style={{ color: 'var(--h1)' }}>
                                Built for <span className="text-gradient">operational excellence</span>
                            </h2>
                            <p className="max-w-2xl mx-auto text-lg" style={{ color: 'var(--text-secondary)' }}>
                                Every feature designed with surgical precision. No bloat. No compromise.
                            </p>
                        </motion.div>
                    </div>

                    {/* Horizontal scrollable on mobile, grid on desktop */}
                    <div className="flex md:grid md:grid-cols-2 gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 md:overflow-visible">
                        {FEATURES.map((f, i) => (
                            <motion.div key={f.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                data-theme-animate
                                className="group relative border p-8 overflow-hidden transition-all duration-300 hover:border-[rgba(var(--accent-rgb),0.3)] snap-center min-w-[300px] md:min-w-0 flex-shrink-0 md:flex-shrink"
                                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-base)', borderRadius: 'var(--radius-xl)' }}>
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0"
                                    style={{ background: 'radial-gradient(ellipse at 30% 0%, rgba(var(--accent-rgb), 0.06), transparent 60%)' }} />
                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`w-14 h-14 bg-gradient-to-br ${f.gradient} flex items-center justify-center shadow-lg`}
                                            style={{ borderRadius: 'var(--radius-lg)', boxShadow: '0 8px 30px rgba(var(--violet-rgb), 0.2)' }}>
                                            <f.icon size={24} className="text-white" />
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-black" style={{ color: 'var(--h1)' }}>{f.stat}</div>
                                            <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>{f.statLabel}</div>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 tracking-tight" style={{ color: 'var(--h1)' }}>{f.title}</h3>
                                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{f.desc}</p>
                                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                                        style={{ color: 'var(--accent)' }}>
                                        Learn more <ArrowRight size={14} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ STATS ═══════════ */}
            <section className="py-20 px-6 border-y relative overflow-hidden" style={{ borderColor: 'var(--border-base)' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-[rgba(var(--accent-rgb),0.03)] via-transparent to-[rgba(var(--violet-rgb),0.03)] -z-10" />
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {[
                        { value: '500+', label: 'Enterprise Clients' },
                        { value: '10M+', label: 'Tasks Automated' },
                        { value: '99.99%', label: 'Uptime SLA' },
                        { value: '< 14ms', label: 'Avg. Latency' },
                    ].map((s, i) => (
                        <motion.div key={s.label}
                            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                            <div className="text-4xl md:text-5xl font-black tracking-tight text-gradient-hero mb-2">{s.value}</div>
                            <div className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>{s.label}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ═══════════ TESTIMONIALS — HORIZONTAL SCROLL ═══════════ */}
            <section className="py-28 px-6 relative">
                <div className="absolute inset-0 mesh-gradient opacity-30 -z-10" />
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <div className="flex items-center justify-center gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} className="fill-amber-400 text-amber-400" />)}
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ color: 'var(--h1)' }}>
                                Loved by <span className="text-gradient">operators</span>
                            </h2>
                            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                                Hear from teams that transformed their operations.
                            </p>
                        </motion.div>
                    </div>

                    <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 md:overflow-visible">
                        {TESTIMONIALS.map((t, i) => (
                            <motion.div key={t.name}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }} transition={{ delay: i * 0.15 }}
                                data-theme-animate
                                className="group border p-8 transition-all duration-300 hover:border-[rgba(var(--violet-rgb),0.3)] snap-center min-w-[300px] md:min-w-0 flex-shrink-0 md:flex-shrink"
                                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-base)', borderRadius: 'var(--radius-xl)' }}>
                                <div className="flex items-center gap-1 mb-5">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} className="fill-amber-400/60 text-amber-400/60" />)}
                                </div>
                                <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>"{t.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-xs font-bold text-white shadow-lg"
                                        style={{ boxShadow: '0 4px 16px rgba(var(--violet-rgb), 0.25)' }}>
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{t.name}</p>
                                        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{t.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ CTA ═══════════ */}
            <section className="relative py-32 px-6 overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0"
                        style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, rgba(var(--accent-rgb), 0.05) 50%, var(--bg-primary) 100%)' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full"
                        style={{ background: 'radial-gradient(ellipse, rgba(var(--violet-rgb), 0.10) 0%, transparent 70%)' }} />
                </div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <Globe size={40} className="mx-auto mb-6 opacity-20" style={{ color: 'var(--violet)' }} />
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6" style={{ color: 'var(--h1)' }}>
                            Ready to command<br /><span className="text-gradient-hero">your future?</span>
                        </h2>
                        <p className="text-lg md:text-xl mb-12 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                            Join 500+ enterprises optimizing their operations with Vantix.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/register">
                                <Button size="lg" className="bg-gradient-brand border-0 text-base px-10 h-14 shadow-xl"
                                    style={{ boxShadow: '0 8px 40px rgba(var(--violet-rgb), 0.3)' }} iconRight={ArrowRight}>
                                    Start Free Trial
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button size="lg" variant="ghost" className="text-base px-8 h-14">Talk to Sales</Button>
                            </Link>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
                            {['No credit card', 'Free 14-day trial', 'Cancel anytime'].map(t => (
                                <span key={t} className="flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>
                                    <Check size={14} className="text-emerald-500" /> {t}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════ FOOTER ═══════════ */}
            <footer className="py-16 px-6 border-t" style={{ borderColor: 'var(--border-base)' }}>
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-brand flex items-center justify-center" style={{ borderRadius: 'var(--radius-md)' }}>
                                    <Zap size={14} className="text-white" />
                                </div>
                                <span className="font-black text-lg tracking-tight text-gradient">VANTIX</span>
                            </div>
                            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                                AI-native operations for the next enterprise generation.
                            </p>
                        </div>
                        {[
                            { title: 'Product', links: ['Platform', 'AI Engine', 'Analytics', 'Security'] },
                            { title: 'Company', links: ['About', 'Careers', 'Blog', 'Press'] },
                            { title: 'Resources', links: ['Docs', 'API', 'Status', 'Changelog'] },
                            { title: 'Legal', links: ['Terms', 'Privacy', 'DPA', 'GDPR'] },
                        ].map(col => (
                            <div key={col.title}>
                                <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-secondary)' }}>{col.title}</h4>
                                <div className="space-y-2.5">
                                    {col.links.map(l => (
                                        <a key={l} href="#" className="block text-sm hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-tertiary)' }}>{l}</a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t" style={{ borderColor: 'var(--border-base)' }}>
                        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>© 2026 Vantix AI Inc. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            {['Twitter', 'GitHub', 'LinkedIn', 'Discord'].map(l => (
                                <a key={l} href="#" className="text-xs font-medium hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-tertiary)' }}>{l}</a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
