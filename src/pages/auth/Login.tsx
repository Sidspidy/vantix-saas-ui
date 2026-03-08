import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Mail, Lock, Shield, User, UserCheck,
    ArrowRight, Terminal
} from 'lucide-react'
import Button from '../../components/system/Button'
import Card from '../../components/system/Card'

export default function Login() {
    const navigate = useNavigate()
    const [selectedRole, setSelectedRole] = useState<'admin' | 'manager' | 'member'>('admin')
    const [isLoading, setIsLoading] = useState(false)

    const roles = [
        { id: 'admin', label: 'Admin', icon: Shield, desc: 'Full System Access' },
        { id: 'manager', label: 'Manager', icon: UserCheck, desc: 'Team Control' },
        { id: 'member', label: 'Member', icon: User, desc: 'Workflow' },
    ]

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setTimeout(() => {
            navigate('/dashboard')
            setIsLoading(false)
        }, 1500)
    }

    const demoLogin = (role: typeof selectedRole) => {
        setSelectedRole(role)
        setIsLoading(true)
        setTimeout(() => {
            navigate('/dashboard')
            setIsLoading(false)
        }, 1200)
    }

    return (
        <Card padding="lg" glow className="relative overflow-visible">
            <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--h1)' }}>Welcome Back</h2>
                <p className="text-sm mt-1.5" style={{ color: 'var(--text-secondary)' }}>
                    Enter your credentials to access the command center.
                </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-wider pl-1" style={{ color: 'var(--text-tertiary)' }}>Email</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] group-focus-within:text-accent transition-colors" size={16} />
                        <input
                            type="email"
                            required
                            placeholder="admin@vantix.ai"
                            className="w-full h-11 border bg-[var(--bg-secondary)] focus:border-accent outline-none font-medium text-sm transition-all"
                            style={{ borderColor: 'var(--border-base)', borderRadius: 'var(--radius-input)', paddingLeft: '2.75rem' }}
                        />
                    </div>
                </div>

                <div className="space-y-1.5 text-left">
                    <div className="flex justify-between px-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Password</label>
                        <Link to="/forgot-password" className="text-[10px] font-medium text-accent hover:underline">Forgot?</Link>
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] group-focus-within:text-accent transition-colors" size={16} />
                        <input
                            type="password"
                            required
                            placeholder="••••••••••••"
                            className="w-full h-11 border bg-[var(--bg-secondary)] focus:border-accent outline-none font-medium text-sm transition-all"
                            style={{ borderColor: 'var(--border-base)', borderRadius: 'var(--radius-input)', paddingLeft: '2.75rem' }}
                        />
                    </div>
                </div>

                {/* Role Selector */}
                <div className="space-y-2 text-left pt-1 pb-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider pl-1" style={{ color: 'var(--text-tertiary)' }}>Role</label>
                    <div className="grid grid-cols-3 gap-2">
                        {roles.map((r) => (
                            <button
                                key={r.id}
                                type="button"
                                onClick={() => setSelectedRole(r.id as any)}
                                className={`flex flex-col items-center justify-center p-3 border transition-all cursor-pointer ${selectedRole === r.id
                                    ? 'bg-[rgba(var(--accent-rgb),0.08)] border-[var(--accent)] text-[var(--accent)] shadow-sm'
                                    : 'bg-[var(--bg-secondary)] border-[var(--border-base)] text-[var(--text-tertiary)] hover:border-[var(--text-tertiary)]'
                                    }`}
                                style={{ borderRadius: 'var(--radius-md)' }}
                            >
                                <r.icon size={16} className="mb-1.5" />
                                <span className="text-[9px] font-bold uppercase tracking-widest">{r.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-brand border-0 text-base shadow-xl"
                    style={{ boxShadow: '0 6px 24px rgba(var(--violet-rgb), 0.25)' }}
                    isLoading={isLoading}
                    iconRight={ArrowRight}
                >
                    Sign In
                </Button>
            </form>

            {/* Demo */}
            <div className="mt-8 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-[var(--border-base)]" />
                    <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>Quick Access</span>
                    <div className="h-px flex-1 bg-[var(--border-base)]" />
                </div>
                <div className="flex items-center justify-between gap-3 px-4 py-3 border"
                    style={{ borderColor: 'var(--border-base)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[rgba(var(--violet-rgb),0.1)] flex items-center justify-center">
                            <Terminal size={15} style={{ color: 'var(--violet)' }} />
                        </div>
                        <div className="text-left">
                            <p className="text-xs font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>Demo Sandbox</p>
                            <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>Bypass as {selectedRole}</p>
                        </div>
                    </div>
                    <Button variant="accent-subtle" size="sm" onClick={() => demoLogin(selectedRole)}>Launch</Button>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t font-medium text-xs flex justify-center gap-2" style={{ borderColor: 'var(--border-base)', color: 'var(--text-tertiary)' }}>
                <span>Don't have an account?</span>
                <Link to="/register" className="text-accent hover:underline font-bold">Sign Up</Link>
            </div>
        </Card>
    )
}
