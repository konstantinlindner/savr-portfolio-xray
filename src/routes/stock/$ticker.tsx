import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { getStockDetail } from '@/data/stock-details'
import { usePortfolio } from '@/hooks/use-portfolio'
import { Button } from '@/components/ui/button'
import { KeyMetricsCard } from '@/components/stock/key-metrics-card'
import { PriceChart } from '@/components/stock/price-chart'
import { StockDescription } from '@/components/stock/stock-description'
import { StockHeader } from '@/components/stock/stock-header'
import { StockNews } from '@/components/stock/stock-news'
import { SuperInvestorActivity } from '@/components/stock/super-investor-activity'
import { TransactionHistory } from '@/components/stock/transaction-history'

export const Route = createFileRoute('/stock/$ticker')({
	component: StockPage,
})

export function StockPage() {
	const { ticker } = Route.useParams()
	const router = useRouter()
	const detail = getStockDetail(ticker)
	const { holdings } = usePortfolio()
	const holding = holdings.find((h) => h.ticker === ticker)
	const isInPortfolio = !!holding

	if (!detail) {
		return (
			<div className='flex flex-col items-center justify-center py-20'>
				<h1 className='text-2xl font-bold'>Aktien hittades inte</h1>
				<p className='mt-2 text-muted-foreground'>
					Ingen aktie med ticker &quot;{ticker}&quot; finns.
				</p>
				<Link to='/'>
					<Button variant='outline' className='mt-4'>
						<ArrowLeft className='mr-2 h-4 w-4' />
						Tillbaka
					</Button>
				</Link>
			</div>
		)
	}

	return (
		<div className='space-y-8'>
			<div>
				{isInPortfolio ?
					<Link to='/'>
						<Button variant='ghost' size='sm' className='mb-4'>
							<ArrowLeft className='mr-2 h-4 w-4' />
							Min portfölj
						</Button>
					</Link>
				:	<Button
						variant='ghost'
						size='sm'
						className='mb-4'
						onClick={() => router.history.back()}
					>
						<ArrowLeft className='mr-2 h-4 w-4' />
						Tillbaka
					</Button>
				}
				<StockHeader detail={detail} weight={holding?.weight ?? 0} />
			</div>

			<div className='grid gap-8 lg:grid-cols-3'>
				<div className='space-y-8 lg:col-span-2'>
					<PriceChart
						priceHistory={detail.priceHistory}
						ticker={detail.ticker}
						transactions={detail.transactions}
					/>
					{detail.transactions.length > 0 && (
						<TransactionHistory
							transactions={detail.transactions}
						/>
					)}
				</div>
				<div className='space-y-8'>
					<KeyMetricsCard metrics={detail.metrics} />
					<StockDescription description={detail.description} />
					<SuperInvestorActivity ticker={detail.ticker} />
				</div>
			</div>

			{detail.news.length > 0 && <StockNews news={detail.news} />}
		</div>
	)
}
