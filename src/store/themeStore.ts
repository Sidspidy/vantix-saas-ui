import { create } from 'zustand'

type Theme = 'dark' | 'light'

interface ThemeStore {
    theme: Theme
    isTransitioning: boolean
    toggle: () => void
    setTheme: (t: Theme) => void
}

function applyTheme(theme: Theme) {
    const root = document.documentElement
    root.classList.remove('dark', 'light')
    root.classList.add(theme)
    localStorage.setItem('vantix-theme', theme)
}

// Water-flow transition: circle wipe → change theme → card reveal
function animatedToggle(currentTheme: Theme, setStore: (v: Partial<ThemeStore>) => void) {
    const root = document.documentElement
    const next: Theme = currentTheme === 'dark' ? 'light' : 'dark'

    // 1. Start water-flow animation on current theme
    setStore({ isTransitioning: true })
    root.classList.add('theme-transitioning')

    // 2. At 300ms (mid-animation), swap the actual theme
    setTimeout(() => {
        applyTheme(next)
        setStore({ theme: next })
    }, 300)

    // 3. Remove transition class after animation completes
    setTimeout(() => {
        root.classList.remove('theme-transitioning')
        setStore({ isTransitioning: false })

        // 4. Trigger card-reveal stagger on all visible cards
        const cards = document.querySelectorAll('[data-theme-animate]')
        cards.forEach((card, i) => {
            const el = card as HTMLElement
            el.classList.remove('theme-card-enter')
            void el.offsetWidth // force reflow
            el.style.animationDelay = `${i * 50}ms`
            el.classList.add('theme-card-enter')
            setTimeout(() => {
                el.classList.remove('theme-card-enter')
                el.style.animationDelay = ''
            }, 600 + i * 50)
        })
    }, 800)
}

const savedTheme = (localStorage.getItem('vantix-theme') as Theme) ?? 'dark'
applyTheme(savedTheme)

export const useThemeStore = create<ThemeStore>((set, get) => ({
    theme: savedTheme,
    isTransitioning: false,

    toggle: () => {
        const { theme, isTransitioning } = get()
        if (isTransitioning) return // prevent double-toggle
        animatedToggle(theme, (v) => set(v as any))
    },

    setTheme: (t: Theme) => {
        applyTheme(t)
        set({ theme: t })
    },
}))
