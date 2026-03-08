import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'

interface CardProps extends HTMLMotionProps<'div'> {
    variant?: 'default' | 'elevated' | 'glass' | 'borderless'
    hoverEffect?: boolean
    glow?: boolean
    padding?: 'none' | 'sm' | 'md' | 'lg'
    delay?: number
}

export default function Card({
    children,
    variant = 'default',
    hoverEffect = true,
    glow = false,
    padding = 'md',
    delay = 0,
    className = '',
    ...props
}: CardProps) {
    const variants = {
        default: 'bg-[var(--bg-card)] border border-[var(--border-base)]',
        elevated: 'bg-[var(--bg-card)] border border-[var(--border-base)] shadow-lg shadow-black/20',
        glass: 'bg-[var(--bg-card)]/80 backdrop-blur-md border border-[var(--border-base)]',
        borderless: 'bg-[var(--bg-card)]'
    }

    const paddings = {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-5',
        lg: 'p-8'
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay }}
            whileHover={hoverEffect ? { y: -3, boxShadow: '0 8px 32px rgba(0,0,0,0.24)' } : {}}
            data-theme-animate
            className={`
                relative overflow-hidden transition-all-350
                ${variants[variant]} 
                ${paddings[padding]} 
                ${glow ? 'glow-accent' : ''} 
                ${className}
            `}
            style={{ borderRadius: 'var(--radius-card)', ...props.style }}
            {...props}
        >
            {children}
        </motion.div>
    )
}
