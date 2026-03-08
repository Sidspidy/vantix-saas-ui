import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useThemeStore } from '../store/themeStore'
import Sidebar from '../components/layout/Sidebar'
import Topbar from '../components/layout/Topbar'
import AIPanel from '../components/layout/AIPanel'
import CommandPalette from '../components/system/CommandPalette'

export default function AppLayout() {
    const location = useLocation()
    const { theme } = useThemeStore()
    const [isAIPanelOpen, setIsAIPanelOpen] = useState(false)
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)

    // Global Key Listener for Command Palette
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                setIsCommandPaletteOpen(prev => !prev)
            }
        }

        const handleOpenAI = () => setIsAIPanelOpen(true)

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('open-ai-assistant', handleOpenAI)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('open-ai-assistant', handleOpenAI)
        }
    }, [])

    return (
        <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
            {/* Command Palette */}
            <CommandPalette
                isOpen={isCommandPaletteOpen}
                onClose={() => setIsCommandPaletteOpen(false)}
            />

            {/* AI Assistant */}
            <AIPanel isOpen={isAIPanelOpen} onClose={() => setIsAIPanelOpen(false)} />

            {/* Sidebar */}
            <Sidebar />

            {/* Main area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Topbar
                    onOpenAI={() => setIsAIPanelOpen(true)}
                    onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
                />

                {/* Page content — each section gets re-animated on theme change */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${location.pathname}-${theme}`}
                            initial={{ opacity: 0.6, scale: 0.98, y: 6 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: -6 }}
                            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                            className="h-full"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    )
}
