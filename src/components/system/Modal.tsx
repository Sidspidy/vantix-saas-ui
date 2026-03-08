import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    description?: string
    children: React.ReactNode
    size?: 'sm' | 'md' | 'lg' | 'full'
    footer?: React.ReactNode
}

export default function Modal({
    isOpen,
    onClose,
    title,
    description,
    children,
    size = 'md',
    footer,
}: ModalProps) {
    // Disable scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    const sizes = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-2xl',
        full: 'max-w-[95vw] h-[90vh]'
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 16 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className={`
                            relative w-full overflow-hidden rounded-card border shadow-2xl flex flex-col
                            ${sizes[size]}
                        `}
                        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-base)' }}
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between p-6 pb-2">
                            <div>
                                {title && <h2 className="text-xl font-bold" style={{ color: 'var(--h1)' }}>{title}</h2>}
                                {description && <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>{description}</p>}
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1 rounded-btn hover:bg-[var(--bg-hover)] transition-colors text-[var(--text-tertiary)] hover:text-[var(--text-primary)] cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 overflow-y-auto max-h-[70vh]">
                            {children}
                        </div>

                        {/* Footer */}
                        {footer && (
                            <div className="p-4 px-6 border-t flex items-center justify-end gap-3 bg-[var(--bg-secondary)]"
                                style={{ borderColor: 'var(--border-base)' }}>
                                {footer}
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
