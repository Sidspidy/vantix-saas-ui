import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Bell, User, Settings, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from '../system/ThemeToggle'

interface TopbarProps {
    onOpenAI?: () => void
    onOpenCommandPalette?: () => void
}

export default function Topbar({ onOpenAI, onOpenCommandPalette }: TopbarProps) {
    const navigate = useNavigate()
    const [notifCount] = useState(3)
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const profileRef = useRef<HTMLDivElement>(null)

    // Close profile menu on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
                setShowProfileMenu(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    return (
        <header
            className="h-16 flex items-center justify-between px-6 flex-shrink-0 gap-4"
            style={{
                background: 'var(--bg-secondary)',
                borderBottom: '1px solid var(--border-base)',
            }}
        >
            {/* Search */}
            <button
                onClick={onOpenCommandPalette}
                aria-label="Open command palette (Ctrl+K)"
                className="flex items-center gap-3 h-10 px-4 text-sm
                   transition-all cursor-pointer w-72 text-left
                   border hover:border-[var(--accent)]"
                style={{
                    background: 'var(--bg-primary)',
                    borderColor: 'var(--border-base)',
                    color: 'var(--text-tertiary)',
                    borderRadius: 'var(--radius-btn)',
                }}
            >
                <Search size={15} className="flex-shrink-0" />
                <span className="flex-1 truncate">Search or Ctrl+K...</span>
                <kbd className="text-[10px] px-1.5 py-0.5 border font-mono flex-shrink-0"
                    style={{
                        borderRadius: '6px',
                        borderColor: 'var(--border-base)',
                        background: 'var(--bg-hover)',
                        color: 'var(--text-disabled)',
                    }}>
                    ⌘K
                </kbd>
            </button>

            {/* Right controls */}
            <div className="flex items-center gap-1.5">
                {/* AI Assistant */}
                <button
                    onClick={onOpenAI}
                    aria-label="Open AI Assistant"
                    className="relative flex items-center gap-1.5 h-9 px-3.5 text-sm
                     font-semibold cursor-pointer transition-all border
                     hover:bg-[rgba(var(--violet-rgb),0.08)]"
                    style={{
                        borderRadius: 'var(--radius-btn)',
                        borderColor: 'rgba(var(--violet-rgb), 0.3)',
                        color: 'var(--violet)',
                    }}
                >
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                    >
                        ✦
                    </motion.div>
                    <span className="hidden sm:inline">AI</span>
                </button>

                {/* Notifications — navigates to /notifications */}
                <button
                    onClick={() => navigate('/notifications')}
                    aria-label="Notifications"
                    className="relative flex items-center justify-center w-9 h-9
                       hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
                    style={{ borderRadius: 'var(--radius-btn)' }}
                >
                    <Bell size={18} style={{ color: 'var(--text-secondary)' }} />
                    <AnimatePresence>
                        {notifCount > 0 && (
                            <motion.span
                                key="badge"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="absolute top-1 right-1 w-2 h-2 rounded-full"
                                style={{ background: 'var(--violet)' }}
                            />
                        )}
                    </AnimatePresence>
                </button>

                <ThemeToggle />

                {/* Profile Avatar — with dropdown menu */}
                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        aria-label="Profile menu"
                        className="flex items-center justify-center w-9 h-9 rounded-full
                         cursor-pointer hover:ring-2 hover:ring-[rgba(var(--violet-rgb),0.4)] transition-all
                         bg-gradient-brand"
                    >
                        <User size={16} className="text-white" />
                    </button>

                    <AnimatePresence>
                        {showProfileMenu && (
                            <motion.div
                                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 top-full mt-2 w-56 py-2 border shadow-xl z-50"
                                style={{
                                    background: 'var(--bg-card)',
                                    borderColor: 'var(--border-base)',
                                    borderRadius: 'var(--radius-card)',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                                }}
                            >
                                {/* User info */}
                                <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border-base)' }}>
                                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Admin User</p>
                                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>admin@vantix.ai</p>
                                </div>
                                {/* Menu items */}
                                {[
                                    { label: 'Settings', icon: Settings, action: () => { navigate('/settings'); setShowProfileMenu(false) } },
                                    { label: 'Notifications', icon: Bell, action: () => { navigate('/notifications'); setShowProfileMenu(false) } },
                                ].map(item => (
                                    <button
                                        key={item.label}
                                        onClick={item.action}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium
                                                 hover:bg-[var(--bg-hover)] transition-colors cursor-pointer text-left"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        <item.icon size={15} />
                                        {item.label}
                                    </button>
                                ))}
                                <div className="mt-1 border-t pt-1" style={{ borderColor: 'var(--border-base)' }}>
                                    <button
                                        onClick={() => { navigate('/'); setShowProfileMenu(false) }}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium
                                                 hover:bg-[var(--bg-hover)] transition-colors cursor-pointer text-left"
                                        style={{ color: 'var(--danger)' }}
                                    >
                                        <LogOut size={15} />
                                        Sign Out
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    )
}
