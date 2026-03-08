import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
    X, Send, Bot, Sparkles
} from 'lucide-react'
import Button from '../system/Button'

interface AIPanelProps {
    isOpen: boolean
    onClose: () => void
}

export default function AIPanel({ isOpen, onClose }: AIPanelProps) {
    const navigate = useNavigate()
    const [messages, setMessages] = useState([
        { id: '1', role: 'ai', content: "Tactical Assistant online. How can I augment your operations today?" }
    ])
    const [input, setInput] = useState('')
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const userMsg = { id: Date.now().toString(), role: 'user', content: input }
        setMessages(prev => [...prev, userMsg])
        setInput('')

        // Simulated AI response
        setTimeout(() => {
            const aiMsg = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                content: `Analyzing "${input}"... Based on current telemetry, I recommend optimizing Segment B-4 for a 12% efficiency gain.`
            }
            setMessages(prev => [...prev, aiMsg])
        }, 1000)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[150] lg:hidden"
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-screen w-full max-w-sm z-[151] flex flex-col shadow-2xl border-l"
                        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-base)' }}
                    >
                        {/* Header */}
                        <div className="h-16 flex items-center justify-between px-6 border-b shrink-0"
                            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-base)' }}>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center shadow-lg shadow-accent/20">
                                    <Bot size={18} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold leading-none" style={{ color: 'var(--text-primary)' }}>Vantix AI</h3>
                                    <span className="text-[10px] text-accent font-bold uppercase tracking-wider">Tactical Hub</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        navigate('/ai')
                                        onClose()
                                    }}
                                    className="h-8 w-8 text-[var(--accent)]"
                                    title="Expand to Full Interface"
                                >
                                    <Sparkles size={16} />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-[var(--text-tertiary)]"><X size={16} /></Button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
                            {messages.map((m) => (
                                <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                                    <div className={`
                                        max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed
                                        ${m.role === 'user'
                                            ? 'bg-accent text-white shadow-md shadow-accent/10 rounded-tr-none'
                                            : 'bg-[var(--bg-hover)] text-[var(--text-secondary)] rounded-tl-none border border-[var(--border-base)]'
                                        }
                                    `}>
                                        {m.content}
                                    </div>
                                    <span className="text-[10px] mt-1.5 font-bold uppercase tracking-widest opacity-40 ml-1">
                                        {m.role === 'ai' ? 'Vantix Logic' : 'Command'}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Footer / Input */}
                        <div className="p-4 border-t" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-base)' }}>
                            <form onSubmit={handleSend} className="relative">
                                <textarea
                                    rows={1}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type tactical request..."
                                    className="w-full bg-[var(--bg-card)] border border-[var(--border-base)] rounded-xl py-3 pl-4 pr-12 text-sm outline-none focus:border-accent transition-all resize-none shadow-inner"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault()
                                            handleSend(e)
                                        }
                                    }}
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-2 p-2 rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors shadow-md shadow-accent/20 cursor-pointer"
                                    disabled={!input.trim()}
                                >
                                    <Send size={16} />
                                </button>
                            </form>
                            <p className="text-[9px] mt-3 text-center px-4" style={{ color: 'var(--text-tertiary)' }}>
                                Enhanced by Vantix LLM-4. Neural insights are probabilistic.
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
