import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Search, LayoutGrid, Users,
    BarChart3, Settings, Bell,
    Zap, Terminal, ArrowRight,
    Command as CommandIcon
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface CommandPaletteProps {
    isOpen: boolean
    onClose: () => void
}

const COMMANDS = [
    { id: 'dash', label: 'Go to Dashboard', icon: LayoutGrid, path: '/dashboard', shortcut: 'G D' },
    { id: 'teams', label: 'Manage Teams', icon: Users, path: '/teams', shortcut: 'G T' },
    { id: 'projects', label: 'View Projects', icon: Zap, path: '/projects', shortcut: 'G P' },
    { id: 'analytics', label: 'Neural Analytics', icon: BarChart3, path: '/analytics', shortcut: 'G A' },
    { id: 'notifs', label: 'Notifications', icon: Bell, path: '/notifications', shortcut: 'G N' },
    { id: 'settings', label: 'System Settings', icon: Settings, path: '/settings', shortcut: 'G S' },
    { id: 'ai', label: 'Summon AI Assistant', icon: Terminal, action: 'ai', shortcut: '?' },
]

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
    const navigate = useNavigate()
    const [query, setQuery] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)

    const filteredCommands = COMMANDS.filter(cmd =>
        cmd.label.toLowerCase().includes(query.toLowerCase())
    )

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                isOpen ? onClose() : null // Handled by parent but good to have
            }
            if (!isOpen) return

            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowDown') setSelectedIndex(s => (s + 1) % filteredCommands.length)
            if (e.key === 'ArrowUp') setSelectedIndex(s => (s - 1 + filteredCommands.length) % filteredCommands.length)
            if (e.key === 'Enter') handleSelect(filteredCommands[selectedIndex])
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, filteredCommands, selectedIndex])

    const handleSelect = (cmd: typeof COMMANDS[0]) => {
        if (cmd?.path) navigate(cmd.path)
        if (cmd?.action === 'ai') {
            // Trigger AI (handled via global event or parent prop)
            window.dispatchEvent(new CustomEvent('open-ai-assistant'))
        }
        onClose()
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />

                    {/* Palette */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-2xl overflow-hidden rounded-card border shadow-2xl"
                        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-base)' }}
                    >
                        {/* Search Bar */}
                        <div className="flex items-center gap-3 px-5 h-16 border-b" style={{ borderColor: 'var(--border-base)' }}>
                            <Search size={20} className="text-[var(--text-tertiary)]" />
                            <input
                                autoFocus
                                value={query}
                                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                                placeholder="Tactical search or type a command..."
                                className="flex-1 bg-transparent border-none outline-none font-medium text-lg"
                                style={{ color: 'var(--text-primary)' }}
                            />
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[var(--bg-hover)] border border-[var(--border-base)]">
                                <span className="text-[10px] font-bold tracking-widest text-[var(--text-tertiary)]">ESC</span>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="max-h-[400px] overflow-y-auto p-2 py-4">
                            {filteredCommands.length > 0 ? (
                                <div className="space-y-1">
                                    <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>Available Protocols</p>
                                    {filteredCommands.map((cmd, i) => (
                                        <button
                                            key={cmd.id}
                                            onClick={() => handleSelect(cmd)}
                                            onMouseEnter={() => setSelectedIndex(i)}
                                            className={`
                                                w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-left
                                                ${selectedIndex === i ? 'bg-accent text-white shadow-lg shadow-accent/20 translate-x-1' : 'hover:bg-[var(--bg-hover)]'}
                                            `}
                                        >
                                            <div className={`p-2 rounded-lg ${selectedIndex === i ? 'bg-white/20' : 'bg-[var(--bg-secondary)]'}`}>
                                                <cmd.icon size={18} className={selectedIndex === i ? 'text-white' : 'text-accent'} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-sm tracking-tight">{cmd.label}</p>
                                            </div>
                                            {cmd.shortcut && (
                                                <div className={`text-[10px] font-mono px-2 py-1 rounded border ${selectedIndex === i ? 'border-white/30 bg-white/10' : 'border-[var(--border-base)] bg-[var(--bg-secondary)] text-[var(--text-tertiary)]'}`}>
                                                    {cmd.shortcut}
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 text-center">
                                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                                        <Terminal size={24} className="text-red-500" />
                                    </div>
                                    <p className="font-bold" style={{ color: 'var(--text-primary)' }}>No protocols found for "{query}"</p>
                                    <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>Verify request syntax and try again.</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-5 h-12 border-t flex items-center justify-between text-[10px] font-bold uppercase tracking-widest"
                            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-base)', color: 'var(--text-tertiary)' }}>
                            <div className="flex gap-4">
                                <span className="flex items-center gap-1.5"><ArrowRight size={10} /> Navigate</span>
                                <span className="flex items-center gap-1.5"><CommandIcon size={10} /> Enter</span>
                            </div>
                            <span>Vantix Internal Console</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
