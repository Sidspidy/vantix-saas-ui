import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent-subtle'
    size?: 'sm' | 'md' | 'lg' | 'icon'
    iconLeft?: LucideIcon
    iconRight?: LucideIcon
    isLoading?: boolean
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    iconLeft: IconLeft,
    iconRight: IconRight,
    isLoading,
    className = '',
    style,
    ...props
}: ButtonProps) {
    const variantStyles: Record<string, React.CSSProperties> = {
        primary: { background: 'var(--accent)', color: '#fff' },
        secondary: { background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-base)' },
        ghost: { background: 'transparent', color: 'var(--text-secondary)' },
        danger: { background: '#EF4444', color: '#fff' },
        'accent-subtle': { background: 'rgba(var(--accent-rgb), 0.10)', color: 'var(--accent)', border: '1px solid rgba(var(--accent-rgb), 0.20)' },
    }

    const variantClasses: Record<string, string> = {
        primary: 'hover:brightness-90 shadow-md active:scale-[0.98]',
        secondary: 'hover:brightness-95 active:scale-[0.98]',
        ghost: 'hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] active:scale-[0.96]',
        danger: 'hover:brightness-90 shadow-md shadow-red-500/20 active:scale-[0.98]',
        'accent-subtle': 'hover:brightness-90 active:scale-[0.98]',
    }

    const sizes = {
        sm: 'h-9 px-4 text-xs gap-1.5',
        md: 'h-10 px-5 text-sm gap-2',
        lg: 'h-12 px-6 text-base gap-2.5',
        icon: 'h-9 w-9 p-0 flex items-center justify-center'
    }

    return (
        <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.96 }}
            className={`
                inline-flex items-center justify-center
                font-semibold transition-all duration-200 cursor-pointer 
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                ${variantClasses[variant]} 
                ${sizes[size]} 
                ${className}
            `}
            style={{ borderRadius: 'var(--radius-btn)', ...variantStyles[variant], ...style }}
            {...(props as any)}
        >
            {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
                <>
                    {IconLeft && <IconLeft size={size === 'sm' ? 14 : 18} />}
                    {children}
                    {IconRight && <IconRight size={size === 'sm' ? 14 : 18} />}
                </>
            )}
        </motion.button>
    )
}
