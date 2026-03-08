import { motion, AnimatePresence } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { Zap } from 'lucide-react'
import ThemeToggle from '../components/system/ThemeToggle'

export default function AuthLayout() {
    const location = useLocation()

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
            style={{ background: 'var(--bg-primary)' }}>

            {/* Theme Toggle — top-right */}
            <div className="fixed top-5 right-5 z-50">
                <ThemeToggle />
            </div>

            {/* Background Atmosphere */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 grid-pattern opacity-40" />
                <div className="absolute top-[15%] left-[20%] w-[35%] h-[40%] rounded-full animate-float-slow"
                    style={{ background: 'radial-gradient(circle, rgba(var(--accent-rgb), 0.12) 0%, transparent 70%)' }} />
                <div className="absolute bottom-[15%] right-[15%] w-[30%] h-[40%] rounded-full animate-float-medium"
                    style={{ background: 'radial-gradient(circle, rgba(var(--violet-rgb), 0.10) 0%, transparent 70%)' }} />
                <div className="absolute inset-0 noise-texture" />
                <div className="absolute inset-0"
                    style={{ background: 'radial-gradient(ellipse at center, transparent 0%, var(--bg-primary) 75%)' }} />
            </div>

            <div className="w-full max-w-md relative">
                {/* Logo Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center mb-8"
                >
                    <div className="w-14 h-14 bg-gradient-brand text-white flex items-center justify-center shadow-xl mb-4"
                        style={{ borderRadius: 'var(--radius-lg)', boxShadow: '0 8px 30px rgba(var(--violet-rgb), 0.25)' }}>
                        <Zap size={28} className="fill-white" />
                    </div>
                    <h1 className="text-2xl font-black tracking-tight text-gradient">VANTIX</h1>
                    <p className="text-xs mt-2 font-medium" style={{ color: 'var(--text-tertiary)' }}>Tactical Operations Interface</p>
                </motion.div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                        transition={{ duration: 0.4, ease: 'circOut' }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>

                <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-8 text-xs"
                    style={{ color: 'var(--text-tertiary)' }}
                >
                    v4.3.0 — Secured by Quantum-ECC
                </motion.p>
            </div>
        </div>
    )
}
