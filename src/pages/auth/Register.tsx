import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Mail, User, Globe, ArrowRight, CheckCircle2
} from 'lucide-react'
import Button from '../../components/system/Button'
import Card from '../../components/system/Card'

export default function Register() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [isSent, setIsSent] = useState(false)

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setTimeout(() => {
            setIsSent(true)
            setIsLoading(false)
        }, 1200)
    }

    if (isSent) {
        return (
            <Card padding="lg" glow className="text-center">
                <div className="w-16 h-16 rounded-full bg-[rgba(var(--accent-rgb),0.15)] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={32} className="text-accent" />
                </div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--h1)' }}>Account Created</h2>
                <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
                    Check your email for verification instructions to activate your command center access.
                </p>
                <Button className="w-full h-12 bg-gradient-brand border-0"
                    style={{ boxShadow: '0 6px 24px rgba(var(--violet-rgb), 0.25)' }}
                    onClick={() => navigate('/login')}>
                    Continue to Sign In
                </Button>
            </Card>
        )
    }

    return (
        <Card padding="lg" glow>
            <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--h1)' }}>Create Account</h2>
                <p className="text-sm mt-1.5" style={{ color: 'var(--text-secondary)' }}>
                    Get started with Vantix — your AI-native command center.
                </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
                <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-wider pl-1" style={{ color: 'var(--text-tertiary)' }}>Full Name</label>
                    <div className="relative group">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] group-focus-within:text-accent transition-colors" size={16} />
                        <input
                            type="text" required placeholder="Alex Thompson"
                            className="w-full pl-10 h-11 border bg-[var(--bg-secondary)] focus:border-accent outline-none font-medium text-sm transition-all"
                            style={{ borderColor: 'var(--border-base)', borderRadius: 'var(--radius-input)' }}
                        />
                    </div>
                </div>

                <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-wider pl-1" style={{ color: 'var(--text-tertiary)' }}>Email</label>
                    <div className="relative group">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] group-focus-within:text-accent transition-colors" size={16} />
                        <input
                            type="email" required placeholder="alex@company.com"
                            className="w-full pl-10 h-11 border bg-[var(--bg-secondary)] focus:border-accent outline-none font-medium text-sm transition-all"
                            style={{ borderColor: 'var(--border-base)', borderRadius: 'var(--radius-input)' }}
                        />
                    </div>
                </div>

                <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-wider pl-1" style={{ color: 'var(--text-tertiary)' }}>Organization</label>
                    <div className="relative group">
                        <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] group-focus-within:text-accent transition-colors" size={16} />
                        <input
                            type="text" required placeholder="Acme Inc."
                            className="w-full pl-10 h-11 border bg-[var(--bg-secondary)] focus:border-accent outline-none font-medium text-sm transition-all"
                            style={{ borderColor: 'var(--border-base)', borderRadius: 'var(--radius-input)' }}
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-brand border-0 text-base shadow-xl"
                    style={{ boxShadow: '0 6px 24px rgba(var(--violet-rgb), 0.25)' }}
                    isLoading={isLoading}
                    iconRight={ArrowRight}
                >
                    Create Account
                </Button>
            </form>

            <div className="mt-8 pt-6 border-t font-medium text-xs flex justify-center gap-2" style={{ borderColor: 'var(--border-base)', color: 'var(--text-tertiary)' }}>
                <span>Already have an account?</span>
                <Link to="/login" className="text-accent hover:underline font-bold">Sign In</Link>
            </div>
        </Card>
    )
}
