/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // === SURFACE LAYERS ===
                'bg-primary': 'var(--bg-primary)',
                'bg-secondary': 'var(--bg-secondary)',
                'bg-sidebar': 'var(--bg-sidebar)',
                'bg-card': 'var(--bg-card)',
                'bg-hover': 'var(--bg-hover)',
                'border-base': 'var(--border-base)',

                // === TEXT ===
                'text-primary': 'var(--text-primary)',
                'text-secondary': 'var(--text-secondary)',
                'text-tertiary': 'var(--text-tertiary)',
                'text-disabled': 'var(--text-disabled)',

                // === ACCENT ===
                accent: '#4F7CFF',
                'accent-hover': '#3B6AF6',
                'accent-active': '#2F5BEA',

                // === STATUS ===
                success: 'var(--success)',
                warning: 'var(--warning)',
                danger: 'var(--danger)',
                info: 'var(--info)',
                'success-bg': 'var(--success-bg)',
                'warning-bg': 'var(--warning-bg)',
                'danger-bg': 'var(--danger-bg)',

                // === CHARTS ===
                'chart-primary': '#4F7CFF',
                'chart-secondary': '#22C55E',
                'chart-highlight': '#F59E0B',
                'chart-grid': 'var(--chart-grid)',
                'chart-axis': '#94A3B8',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                card: 'var(--radius-card)',
                btn: 'var(--radius-btn)',
            },
            boxShadow: {
                card: '0 4px 24px rgba(0,0,0,0.18)',
                'card-hover': '0 8px 32px rgba(0,0,0,0.24)',
                'accent-glow': '0 0 0 1px rgba(79,124,255,0.18)',
                'accent-ring': '0 0 0 3px rgba(79,124,255,0.25)',
            },
            animation: {
                'fade-in': 'fadeIn 0.35s ease forwards',
                'slide-in': 'slideIn 0.4s cubic-bezier(0.25,0.46,0.45,0.94) forwards',
                'count-up': 'countUp 1.2s ease forwards',
                shimmer: 'shimmer 1.6s infinite linear',
            },
            keyframes: {
                fadeIn: { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
                slideIn: { from: { opacity: '0', transform: 'translateX(24px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },
            transitionDuration: {
                theme: '350ms',
            },
        },
    },
    plugins: [],
}
