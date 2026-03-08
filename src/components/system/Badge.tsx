import React from 'react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface BadgeProps {
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'ghost'
    size?: 'xs' | 'sm' | 'md'
    icon?: LucideIcon
    className?: string
    pulse?: boolean
}

export default function Badge({
    children,
    variant = 'primary',
    size = 'sm',
    icon: Icon,
    className = '',
    pulse = false,
    ...props
}: BadgeProps) {
    const variants = {
        primary: 'bg-accent/15 text-accent border border-accent/20',
        secondary: 'bg-[var(--bg-hover)] text-[var(--text-secondary)] border border-[var(--border-base)]',
        success: 'bg-[var(--success-bg)] text-[var(--success)] border border-[var(--success)]/20',
        warning: 'bg-[var(--warning-bg)] text-[var(--warning)] border border-[var(--warning)]/20',
        danger: 'bg-[var(--danger-bg)] text-[var(--danger)] border border-[var(--danger)]/20',
        info: 'bg-blue-500/15 text-blue-400 border border-blue-500/20',
        ghost: 'bg-transparent text-[var(--text-tertiary)] border border-[var(--border-base)]'
    }

    const sizes = {
        xs: 'px-1.5 py-0.5 text-[9px] gap-1',
        sm: 'px-2 py-0.5 text-[10px] gap-1.5',
        md: 'px-3 py-1 text-xs gap-1.5'
    }

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`
                inline-flex items-center justify-center font-bold uppercase tracking-tight rounded-full
                ${variants[variant]} 
                ${sizes[size]} 
                ${className}
            `}
            {...props}
        >
            {pulse && (
                <span className="relative flex h-1.5 w-1.5 mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        style={{ backgroundColor: 'currentColor' }}></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 opacity-100"
                        style={{ backgroundColor: 'currentColor' }}></span>
                </span>
            )}
            {Icon && <Icon size={size === 'xs' ? 10 : 12} />}
            {children}
        </motion.div>
    )
}
