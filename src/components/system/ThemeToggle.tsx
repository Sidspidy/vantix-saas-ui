import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useThemeStore } from '../../store/themeStore'

export default function ThemeToggle() {
    const { theme, toggle } = useThemeStore()
    const isDark = theme === 'dark'

    return (
        <button
            onClick={toggle}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            className="relative flex items-center justify-center w-9 h-9 rounded-btn
                 hover:bg-[var(--bg-hover)] transition-colors cursor-pointer
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
            {/* Animated icon swap */}
            <motion.div
                key={theme}
                initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="absolute"
            >
                {isDark ? (
                    <Sun size={18} className="text-[var(--text-secondary)] hover:text-accent transition-colors" />
                ) : (
                    <Moon size={18} className="text-[var(--text-secondary)] hover:text-accent transition-colors" />
                )}
            </motion.div>
        </button>
    )
}
