import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    LayoutGrid, List,
    Plus, Search, Filter,
    MoreVertical, Clock
} from 'lucide-react'
import Button from '../components/system/Button'
import Card from '../components/system/Card'
import Badge from '../components/system/Badge'

/* ── MOCK PROJECTS ─────────────────────────────────────────── */
const PROJECTS = [
    {
        id: '1', title: 'Aether Engine Core',
        status: 'ongoing', priority: 'high',
        assignee: 'Alex Thompson',
        progress: 68,
        deadline: '12 Mar'
    },
    {
        id: '2', title: 'Market Sentiment Bot',
        status: 'ongoing', priority: 'medium',
        assignee: 'Sarah Chen',
        progress: 42,
        deadline: '18 Mar'
    },
    {
        id: '3', title: 'Security Protocol V4',
        status: 'completed', priority: 'high',
        assignee: 'James Rodriguez',
        progress: 100,
        deadline: '02 Mar'
    },
    {
        id: '4', title: 'Frontend Refactor',
        status: 'ongoing', priority: 'low',
        assignee: 'Priya Patel',
        progress: 85,
        deadline: '24 Mar'
    },
    {
        id: '5', title: 'Cluster Expansion',
        status: 'delayed', priority: 'high',
        assignee: 'Erik Nilsson',
        progress: 15,
        deadline: '08 Mar'
    },
]

const STATUS_VARIANTS: Record<string, any> = {
    ongoing: 'info',
    completed: 'success',
    delayed: 'danger',
}

export default function Projects() {
    const [view, setView] = useState<'list' | 'kanban'>('list')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredProjects = PROJECTS.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.assignee.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6 pb-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold" style={{ color: 'var(--h1)' }}>Projects & Tasks</h1>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Tactical task orchestration & delivery tracking.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex bg-[var(--bg-secondary)] p-1 rounded-btn border" style={{ borderColor: 'var(--border-base)' }}>
                        <button
                            onClick={() => setView('list')}
                            className={`p-1.5 rounded-btn transition-all ${view === 'list' ? 'bg-accent text-white shadow-sm' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'}`}
                        >
                            <List size={18} />
                        </button>
                        <button
                            onClick={() => setView('kanban')}
                            className={`p-1.5 rounded-btn transition-all ${view === 'kanban' ? 'bg-accent text-white shadow-sm' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'}`}
                        >
                            <LayoutGrid size={18} />
                        </button>
                    </div>
                    <Button iconLeft={Plus}>New Project</Button>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] group-focus-within:text-accent transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Search projects, assignees..."
                        className="h-10 w-full bg-[var(--bg-secondary)] border border-[var(--border-base)] outline-none transition-all focus:border-accent"
                        style={{ paddingLeft: '2.75rem', borderRadius: 'var(--radius-input)' }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button variant="secondary" iconLeft={Filter} size="md">Filters</Button>
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
                {view === 'list' ? (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Card padding="none" hoverEffect={false}>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b" style={{ borderColor: 'var(--border-base)', background: 'var(--bg-secondary)' }}>
                                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Project</th>
                                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Status</th>
                                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Progress</th>
                                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Assignee</th>
                                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Deadline</th>
                                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-right" style={{ color: 'var(--text-tertiary)' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y" style={{ borderColor: 'var(--border-base)' }}>
                                        {filteredProjects.map((proj) => (
                                            <tr key={proj.id} className="group hover:bg-[var(--bg-hover)] transition-colors">
                                                <td className="px-5 py-4">
                                                    <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{proj.title}</p>
                                                    <p className="text-[10px] uppercase font-bold text-accent mt-0.5 tracking-wider">VANTIX-CORE-{proj.id}</p>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <Badge variant={STATUS_VARIANTS[proj.status]} size="xs">{proj.status}</Badge>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <div className="w-full max-w-[100px]">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-[10px] font-bold" style={{ color: 'var(--text-secondary)' }}>{proj.progress}%</span>
                                                        </div>
                                                        <div className="h-1 w-full bg-[var(--bg-hover)] rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-accent transition-all duration-500"
                                                                style={{ width: `${proj.progress}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-[10px] font-bold text-accent">
                                                            {proj.assignee[0]}
                                                        </div>
                                                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{proj.assignee}</span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                                                        <Clock size={12} className="text-[var(--text-tertiary)]" />
                                                        {proj.deadline}
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4 text-right">
                                                    <Button variant="ghost" size="icon"><MoreVertical size={16} /></Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </motion.div>
                ) : (
                    <motion.div
                        key="kanban"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {['Todo', 'In Progress', 'Done'].map((col) => (
                            <div key={col} className="space-y-4">
                                <div className="flex items-center justify-between px-1">
                                    <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>{col}</h3>
                                    <Badge variant="ghost" size="xs">3</Badge>
                                </div>
                                <div className="space-y-3">
                                    {filteredProjects.slice(0, 2).map((proj) => (
                                        <Card key={proj.id} padding="sm" className="cursor-grab active:cursor-grabbing">
                                            <div className="flex flex-col gap-3">
                                                <div className="flex items-start justify-between">
                                                    <Badge variant={proj.priority === 'high' ? 'danger' : 'secondary'} size="xs">{proj.priority}</Badge>
                                                    <MoreVertical size={14} className="text-[var(--text-tertiary)]" />
                                                </div>
                                                <h4 className="font-bold text-sm" style={{ color: 'var(--h2)' }}>{proj.title}</h4>
                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-[8px] font-bold text-accent">
                                                            {proj.assignee[0]}
                                                        </div>
                                                        <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{proj.deadline}</span>
                                                    </div>
                                                    <div className="text-[10px] font-bold" style={{ color: 'var(--text-secondary)' }}>{proj.progress}%</div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                    <Button variant="ghost" className="w-full border-dashed border-[var(--border-base)] h-10 bg-transparent" iconLeft={Plus}>Add Task</Button>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
