import { Outlet } from '@tanstack/react-router'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export function RootLayout() {
	return (
		<div className='flex min-h-screen flex-col'>
			<Header />
			<main className='mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8'>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}
