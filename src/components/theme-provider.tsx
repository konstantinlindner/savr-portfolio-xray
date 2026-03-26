import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from 'react'

type Theme = 'dark' | 'light'

type ThemeContextValue = {
	theme: Theme
	setTheme: (theme: Theme) => void
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = 'savr-theme'

export function ThemeProvider({
	children,
	defaultTheme = 'dark',
}: {
	children: ReactNode
	defaultTheme?: Theme
}) {
	const [theme, setThemeState] = useState<Theme>(() => {
		const stored = localStorage.getItem(STORAGE_KEY)
		return stored === 'light' || stored === 'dark' ? stored : defaultTheme
	})

	useEffect(() => {
		const root = document.documentElement
		root.classList.remove('light', 'dark')
		root.classList.add(theme)
		localStorage.setItem(STORAGE_KEY, theme)
	}, [theme])

	const setTheme = useCallback((t: Theme) => setThemeState(t), [])
	const toggleTheme = useCallback(
		() => setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark')),
		[],
	)

	return (
		<ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export function useTheme() {
	const context = useContext(ThemeContext)
	if (!context) throw new Error('useTheme must be used within ThemeProvider')
	return context
}
