import { createFileRoute } from '@tanstack/react-router'

import { getStockDetail } from '@/data/stock-details'
import { usePortfolio } from '@/hooks/use-portfolio'
import { PortfolioSummary } from '@/components/portfolio/portfolio-summary'
import { StockCard } from '@/components/portfolio/stock-card'

export const Route = createFileRoute('/')({
	component: HomePage,
})

export function HomePage() {
	const { holdings } = usePortfolio()

	return (
		<div className='space-y-8'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>
					Min Portfölj
				</h1>
				<p className='mt-2 text-muted-foreground'>
					Dina innehav hämtade från SAVR
				</p>
			</div>

			<PortfolioSummary holdings={holdings} />

			<div className='grid gap-4 sm:grid-cols-2'>
				{holdings.map((h) => {
					const detail = getStockDetail(h.ticker)
					return (
						<StockCard
							key={h.ticker}
							detail={detail}
							weight={h.weight}
						/>
					)
				})}
			</div>
		</div>
	)
}
