import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Send, Bot, User, Sparkles, 
    Terminal, Zap, Globe, Cpu,
    Plus, History, Search, Settings,
    MessageSquare, Command, ArrowRight
} from 'lucide-react'
import Card from '../components/system/Card'
import Button from '../components/system/Button'
import Badge from '../components/system/Badge'

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
}

const INITIAL_MESSAGES: Message[] = [
    {
        id: '1',
        role: 'assistant',
        content: "Operational protocols engaged. I am Vantix OS AI. How can I assist with your workspace orchestration today?",
        timestamp: new Date()
    }
]

export default function AIAssistant() {
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = () => {
        if (!inputValue.trim()) return

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMsg])
        setInputValue('')
        setIsTyping(true)

        // Mock AI Response
        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "Executing analysis... Based on recent neural metrics, your cluster throughput is optimized. However, I suggest reviewing the 'Aether Engine' protocol for potential latency spikes in Sector 7.",
                timestamp: new Date()
            }
            setMessages(prev => [...prev, aiMsg])
            setIsTyping(false)
        }, 1500)
    }

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] gap-6 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold" style={{ color: 'var(--h1)' }}>Neural Command Center</h1>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Direct interface with Vantix Core AI.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Badge variant="success" icon={Cpu}>Processor Level 4</Badge>
                    <Badge variant="info" icon={Zap}>Latency: 14ms</Badge>
                </div>
            </div>

            <div className="flex-1 flex gap-6 min-h-0">
                {/* Conversations Sidebar */}
                <div className="hidden lg:flex flex-col w-72 shrink-0 gap-4">
                    <Card padding="sm" className="flex flex-col h-full overflow-hidden">
                        <Button variant="primary" iconLeft={Plus} className="w-full mb-4">New Session</Button>
                        
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" size={14} />
                            <input 
                                type="text" 
                                placeholder="Search logs..." 
                                className="w-full pl-9 h-9 text-xs rounded-btn bg-[var(--bg-secondary)] border border-[var(--border-base)] outline-none"
                            />
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                            <p className="text-[10px] font-bold uppercase tracking-wider mb-2 pl-2" style={{ color: 'var(--text-tertiary)' }}>Recent Logs</p>
                            {[
                                "Cluster Optimization Phase",
                                "Security Node Review",
                                "Marketing Strategy Beta",
                                "Neural Path Recalibration",
                                "Revenue Projection Analysis",
                                "Team Performance Metrics"
                            ].map((topic, i) => (
                                <button 
                                    key={i}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-3 group ${i === 0 ? 'bg-accent/10 text-accent font-medium' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'}`}
                                >
                                    <MessageSquare size={14} className={i === 0 ? 'text-accent' : 'text-[var(--text-tertiary)] group-hover:text-accent'} />
                                    <span className="truncate">{topic}</span>
                                </button>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Main Chat Interface */}
                <Card padding="none" className="flex-1 flex flex-col relative overflow-hidden">
                    {/* Chat Header */}
                    <div className="px-6 py-4 border-b flex items-center justify-between" style={{ background: 'rgba(var(--accent-rgb), 0.02)', borderColor: 'var(--border-base)' }}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white shadow-lg shadow-accent/20">
                                <Bot size={22} />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Vantix Core Assistant</h3>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                                    <span className="text-[10px] font-medium" style={{ color: 'var(--success)' }}>Neural Connection Active</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-9 w-9"><History size={18} /></Button>
                            <Button variant="ghost" size="icon" className="h-9 w-9"><Settings size={18} /></Button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div 
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
                    >
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex items-start gap-4 ${msg.role === 'assistant' ? '' : 'flex-row-reverse'}`}
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'assistant' ? 'bg-accent/10 text-accent' : 'bg-violet-500/10 text-violet-500'}`}>
                                    {msg.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
                                </div>
                                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                                    msg.role === 'assistant' 
                                    ? 'bg-[var(--bg-secondary)] border border-[var(--border-base)] text-[var(--text-secondary)] rounded-tl-none' 
                                    : 'bg-accent text-white rounded-tr-none shadow-lg shadow-accent/20'
                                }`}>
                                    {msg.content}
                                    <div className={`text-[10px] mt-2 opacity-50 ${msg.role === 'user' ? 'text-right' : ''}`}>
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-4"
                            >
                                <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                                    <Bot size={18} />
                                </div>
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent/40 animate-bounce" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent/40 animate-bounce delay-75" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent/40 animate-bounce delay-150" />
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t" style={{ borderColor: 'var(--border-base)' }}>
                        <div className="relative">
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault()
                                        handleSend()
                                    }
                                }}
                                placeholder="Summon AI command (e.g., /optimize center or 'Describe marketing metrics')..."
                                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-base)] rounded-xl px-4 py-3 pb-12 text-sm focus:border-accent outline-none resize-none min-h-[100px] transition-all"
                                style={{ color: 'var(--text-primary)' }}
                            />
                            <div className="absolute bottom-3 left-4 flex items-center gap-4">
                                <button className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--text-tertiary)] hover:text-accent transition-colors">
                                    <Terminal size={14} />
                                    <span>COMMAND MODE</span>
                                </button>
                                <button className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--text-tertiary)] hover:text-accent transition-colors">
                                    <Sparkles size={14} />
                                    <span>SUGGESTIONS</span>
                                </button>
                            </div>
                            <div className="absolute bottom-3 right-3 flex items-center gap-2">
                                <span className="text-[10px] font-medium text-[var(--text-tertiary)] hidden sm:inline-block">Press Enter to send</span>
                                <Button 
                                    className="h-8 w-8 !p-0"
                                    onClick={handleSend}
                                    disabled={!inputValue.trim()}
                                >
                                    <Send size={14} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Info Panel */}
                <div className="hidden xl:flex flex-col w-64 shrink-0 gap-6">
                    <Card padding="sm" glow>
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-tertiary)' }}>System Metrics</h4>
                        <div className="space-y-4">
                            {[
                                { label: 'Knowledge Base', value: '4.2TB', icon: Globe },
                                { label: 'Compute Allocation', value: '88%', icon: Cpu },
                                { label: 'Model Status', value: 'Optimal', icon: Sparkles }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center text-accent">
                                        <item.icon size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase" style={{ color: 'var(--text-tertiary)' }}>{item.label}</p>
                                        <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card padding="sm" variant="glass">
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-3 text-accent">AI Capabilities</h4>
                        <ul className="space-y-2">
                            {[
                                "Natural Language Query",
                                "System Diagnostics",
                                "Revenue Forecasting",
                                "Marketing Automation"
                            ].map((cap, i) => (
                                <li key={i} className="flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                                    <ArrowRight size={12} className="text-accent" />
                                    {cap}
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </div>
        </div>
    )
}
