import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    LayoutDashboard, Users, FolderKanban, BarChart3,
    Bell, Settings, Bot, ChevronLeft, ChevronRight,
    Zap,
} from 'lucide-react'

const NAV_ITEMS = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Teams', icon: Users, path: '/teams' },
    { label: 'Projects', icon: FolderKanban, path: '/projects' },
    { label: 'Analytics', icon: BarChart3, path: '/analytics' },
    { label: 'Notifications', icon: Bell, path: '/notifications' },
    { label: 'AI Assistant', icon: Bot, path: '/ai' },
    { label: 'Settings', icon: Settings, path: '/settings' },
]

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false)
    const location = useLocation()

    return (
        <motion.aside
            animate={{ width: collapsed ? 72 : 240 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="relative flex flex-col h-full overflow-hidden flex-shrink-0"
            style={{ background: 'var(--bg-sidebar)', borderRight: '1px solid var(--border-base)' }}
        >
            {/* Logo */}
            <div className="flex items-center h-16 px-4 flex-shrink-0 gap-3 border-b"
                style={{ borderColor: 'var(--border-base)' }}>
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-gradient-brand"
                    style={{ borderRadius: 'var(--radius-md)' }}>
                    <Zap size={16} className="text-white" />
                </div>
                <AnimatePresence>
                    {!collapsed && (
                        <motion.span
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                            transition={{ duration: 0.2 }}
                            className="font-bold text-lg tracking-tight text-gradient select-none"
                        >
                            VANTIX
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            {/* Nav items */}
            <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
                {NAV_ITEMS.map((item) => {
                    const isActive = location.pathname.startsWith(item.path)
                    return (
                        <NavItem
                            key={item.path}
                            item={item}
                            isActive={isActive}
                            collapsed={collapsed}
                        />
                    )
                })}
            </nav>

            {/* Collapse toggle */}
            <div className="p-4 border-t flex items-center justify-center"
                style={{ borderColor: 'var(--border-base)' }}>
                <button
                    onClick={() => setCollapsed((c) => !c)}
                    aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    className="w-8 h-8 flex items-center justify-center
                     hover:bg-[var(--bg-hover)] transition-colors cursor-pointer
                     text-[var(--text-secondary)]"
                    style={{ borderRadius: 'var(--radius-btn)' }}
                >
                    {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
            </div>
        </motion.aside>
    )
}

/* ── Individual Nav Item ─────────────────────────────────────── */
interface NavItemProps {
    item: { label: string; icon: React.ElementType; path: string }
    isActive: boolean
    collapsed: boolean
}

function NavItem({ item, isActive, collapsed }: NavItemProps) {
    const Icon = item.icon
    const [hovered, setHovered] = useState(false)

    return (
        <div className="relative px-2 mb-1"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            <NavLink
                to={item.path}
                className="flex items-center gap-3 h-10 px-2 relative
                   transition-colors cursor-pointer text-sm font-medium"
                style={{
                    borderRadius: 'var(--radius-btn)',
                    background: isActive ? 'var(--sidebar-active-bg)' : 'transparent',
                    color: isActive ? 'var(--sidebar-icon-active)' : 'var(--sidebar-icon)',
                }}
            >
                {/* Active indicator bar */}
                {isActive && (
                    <motion.div
                        layoutId="sidebar-active"
                        className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-accent"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                )}

                <Icon size={18} className="flex-shrink-0" />

                <AnimatePresence>
                    {!collapsed && (
                        <motion.span
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -6 }}
                            transition={{ duration: 0.18 }}
                            className="truncate"
                        >
                            {item.label}
                        </motion.span>
                    )}
                </AnimatePresence>
            </NavLink>

            {/* Tooltip when collapsed */}
            <AnimatePresence>
                {collapsed && hovered && (
                    <motion.div
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50
                       px-2.5 py-1.5 text-xs font-medium pointer-events-none
                       whitespace-nowrap shadow-lg"
                        style={{
                            borderRadius: 'var(--radius-sm)',
                            background: 'var(--bg-card)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--border-base)',
                        }}
                    >
                        {item.label}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
