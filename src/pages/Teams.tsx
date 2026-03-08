import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Users, Plus, Search, Filter, MoreVertical,
    Shield, User, UserCheck, Mail, Globe,
    Circle, AlertTriangle
} from 'lucide-react'
import Button from '../components/system/Button'
import Card from '../components/system/Card'
import Badge from '../components/system/Badge'
import Modal from '../components/system/Modal'

/* ── MOCK DATA ─────────────────────────────────────────────── */
const TEAM_MEMBERS = [
    {
        id: '1', name: 'Alex Thompson', role: 'Admin',
        email: 'alex.t@vantix.ai',
        status: 'online',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        joined: '2 months ago',
        department: 'Operations'
    },
    {
        id: '2', name: 'Sarah Chen', role: 'Manager',
        email: 's.chen@vantix.ai',
        status: 'online',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        joined: '5 months ago',
        department: 'Engineering'
    },
    {
        id: '3', name: 'James Rodriguez', role: 'Member',
        email: 'james.r@vantix.ai',
        status: 'away',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
        joined: '1 year ago',
        department: 'Design'
    },
    {
        id: '4', name: 'Priya Patel', role: 'Member',
        email: 'p.patel@vantix.ai',
        status: 'offline',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
        joined: '3 weeks ago',
        department: 'Marketing'
    },
    {
        id: '5', name: 'Erik Nilsson', role: 'Member',
        email: 'e.nilsson@vantix.ai',
        status: 'online',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Erik',
        joined: '6 months ago',
        department: 'Engineering'
    },
]

const ROLE_ICONS: Record<string, any> = {
    Admin: Shield,
    Manager: UserCheck,
    Member: User,
}

const ROLE_VARIANTS: Record<string, 'info' | 'success' | 'secondary'> = {
    Admin: 'info',
    Manager: 'success',
    Member: 'secondary',
}

const STATUS_COLORS: Record<string, string> = {
    online: 'var(--success)',
    away: 'var(--warning)',
    offline: 'var(--text-disabled)',
}

export default function Teams() {
    const [searchQuery, setSearchQuery] = useState('')
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    const filteredMembers = TEAM_MEMBERS.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.department.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6 pb-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold" style={{ color: 'var(--h1)' }}>
                        Team Management
                    </h1>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                        Manage roles, invitations, and team permissions.
                    </p>
                </div>
                <Button
                    onClick={() => setIsAddModalOpen(true)}
                    iconLeft={Plus}
                >
                    Add Member
                </Button>
            </div>

            {/* Add Member Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Invite New Member"
                description="They will receive an email invitation to join your workspace."
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                        <Button onClick={() => setIsAddModalOpen(false)}>Send Invitation</Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Email Address</label>
                        <input type="email" placeholder="e.g. name@company.com" autoFocus />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Role</label>
                            <select>
                                <option>Member</option>
                                <option>Manager</option>
                                <option>Admin</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Department</label>
                            <select>
                                <option>Engineering</option>
                                <option>Design</option>
                                <option>Marketing</option>
                                <option>Operations</option>
                            </select>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: 'Total Members', value: TEAM_MEMBERS.length, icon: Users },
                    { label: 'Online Now', value: TEAM_MEMBERS.filter(m => m.status === 'online').length, icon: Globe },
                    { label: 'Pending Invites', value: '2', icon: Mail },
                ].map((stat) => (
                    <Card key={stat.label} padding="sm" hoverEffect={false}>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-btn flex items-center justify-center"
                                style={{ background: 'rgba(79,124,255,0.08)' }}>
                                <stat.icon size={16} className="text-accent" />
                            </div>
                            <div>
                                <p className="text-xl font-bold" style={{ color: 'var(--h1)' }}>{stat.value}</p>
                                <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: 'var(--text-tertiary)' }}>{stat.label}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] group-focus-within:text-accent transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Search by name, email, or department..."
                        className="h-10 w-full bg-[var(--bg-secondary)] border border-[var(--border-base)] outline-none transition-all focus:border-accent"
                        style={{ paddingLeft: '2.75rem', borderRadius: 'var(--radius-input)' }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Button variant="secondary" iconLeft={Filter} size="md">
                    Filters
                </Button>
            </div>

            {/* Table */}
            <Card padding="none" hoverEffect={false}>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b" style={{ borderColor: 'var(--border-base)', background: 'var(--bg-secondary)' }}>
                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Member</th>
                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Status</th>
                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Role</th>
                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Department</th>
                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-right" style={{ color: 'var(--text-tertiary)' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y" style={{ borderColor: 'var(--border-base)' }}>
                            <AnimatePresence mode="popLayout">
                                {filteredMembers.map((member) => (
                                    <motion.tr
                                        key={member.id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="group hover:bg-[var(--bg-hover)] transition-colors"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={member.avatar} alt="" className="w-10 h-10 rounded-full border border-[var(--border-base)]" />
                                                <div>
                                                    <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{member.name}</p>
                                                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{member.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                <Circle size={8} fill={STATUS_COLORS[member.status]} style={{ color: STATUS_COLORS[member.status] }} />
                                                <span className="text-xs capitalize font-medium" style={{ color: 'var(--text-secondary)' }}>{member.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <Badge
                                                variant={ROLE_VARIANTS[member.role] || 'secondary'}
                                                icon={ROLE_ICONS[member.role]}
                                            >
                                                {member.role}
                                            </Badge>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{member.department}</span>
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical size={16} />
                                            </Button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {filteredMembers.length === 0 && (
                    <div className="p-12 flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 rounded-full border flex items-center justify-center mb-4"
                            style={{ borderColor: 'var(--border-base)', background: 'var(--bg-secondary)' }}>
                            <AlertTriangle size={20} className="text-[var(--text-tertiary)]" />
                        </div>
                        <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>No members found</p>
                        <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>Try adjusting your search or filters.</p>
                    </div>
                )}
            </Card>
        </div>
    )
}
