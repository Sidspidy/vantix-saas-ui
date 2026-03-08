import { motion } from 'framer-motion'

interface SkeletonProps {
    className?: string
    width?: string | number
    height?: string | number
    circle?: boolean
}

export default function Skeleton({
    className = '',
    width,
    height,
    circle = false,
    ...props
}: SkeletonProps) {
    return (
        <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 0.8,
                ease: 'easeInOut'
            }}
            className={`
                skeleton rounded-btn overflow-hidden relative
                ${circle ? 'rounded-full' : ''}
                ${className}
            `}
            style={{
                width: width ?? '100%',
                height: height ?? '1rem',
                background: 'var(--bg-hover)',
            }}
            {...props}
        />
    )
}
