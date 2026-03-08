import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, ArrowRight, ShieldAlert } from 'lucide-react'
import Button from '../../components/system/Button'
import Card from '../../components/system/Card'

export default function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false)
    const [isSent, setIsSent] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setTimeout(() => {
            setIsSent(true)
            setIsLoading(false)
        }, 1000)
    }

    if (isSent) {
        return (
            <Card padding="lg" glow className="text-center">
                <div className="w-16 h-16 rounded-full bg-[rgba(var(--accent-rgb),0.15)] flex items-center justify-center mx-auto mb-6">
                    <ShieldAlert size={32} className="text-accent" />
                </div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--h1)' }}>Reset Link Sent</h2>
                <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
                    Check your email for a link to reset your password and regain access.
                </p>
                <Link to="/login">
                    <Button variant="ghost" className="w-full h-11" iconLeft={ArrowLeft}>Back to Sign In</Button>
                </Link>
            </Card>
        )
    }

    return (
        <Card padding="lg" glow>
            <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--h1)' }}>Reset Password</h2>
                <p className="text-sm mt-1.5" style={{ color: 'var(--text-secondary)' }}>
                    Enter your email to receive a password reset link.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="space-y-1.5 pt-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider pl-1" style={{ color: 'var(--text-tertiary)' }}>Email</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] group-focus-within:text-accent transition-colors" size={16} />
                        <input
                            type="email" required placeholder="admin@vantix.ai"
                            className="w-full h-11 border bg-[var(--bg-secondary)] focus:border-accent outline-none font-medium text-sm transition-all"
                            style={{ borderColor: 'var(--border-base)', borderRadius: 'var(--radius-input)', paddingLeft: '2.75rem' }}
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
                    Send Reset Link
                </Button>
            </form>

            <Link to="/login" className="mt-8 pt-6 border-t font-medium text-xs flex justify-center items-center gap-2 group" style={{ borderColor: 'var(--border-base)', color: 'var(--text-tertiary)' }}>
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Sign In</span>
            </Link>
        </Card>
    )
}
