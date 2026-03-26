import { useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Menu, ScanSearch, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

const navLinks = [
	{ to: '/' as const, label: 'Hem' },
	{ to: '/investors' as const, label: 'Superinvesterare' },
	{ to: '/analysis' as const, label: 'Analys' },
]

export function Header() {
	const [mobileOpen, setMobileOpen] = useState(false)
	const routerState = useRouterState()
	const currentPath = routerState.location.pathname

	return (
		<header className='sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md'>
			<div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
				<Link to='/' className='flex items-center gap-2'>
					<ScanSearch className='h-6 w-6 text-primary' />
					<span className='text-lg font-bold tracking-tight'>
						SAVR Portfolio X-Ray
					</span>
				</Link>

				<nav className='hidden items-center gap-1 md:flex'>
					{navLinks.map((link) => (
						<Link
							key={link.to}
							to={link.to}
							className={cn(
								'rounded-md px-3 py-2 text-sm font-medium transition-colors',
								currentPath === link.to ?
									'bg-accent text-accent-foreground'
								:	'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
							)}
						>
							{link.label}
						</Link>
					))}
					<ThemeToggle />
				</nav>

				<div className='flex items-center gap-2 md:hidden'>
					<ThemeToggle />
					<Button
						variant='ghost'
						size='icon'
						onClick={() => setMobileOpen(!mobileOpen)}
						aria-label='Meny'
					>
						{mobileOpen ?
							<X className='h-5 w-5' />
						:	<Menu className='h-5 w-5' />}
					</Button>
				</div>
			</div>

			{mobileOpen && (
				<nav className='border-t border-border/40 px-4 pt-2 pb-4 md:hidden'>
					{navLinks.map((link) => (
						<Link
							key={link.to}
							to={link.to}
							onClick={() => setMobileOpen(false)}
							className={cn(
								'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
								currentPath === link.to ?
									'bg-accent text-accent-foreground'
								:	'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
							)}
						>
							{link.label}
						</Link>
					))}
				</nav>
			)}
		</header>
	)
}
