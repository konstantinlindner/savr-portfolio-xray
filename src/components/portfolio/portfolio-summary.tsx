import { useMemo } from 'react'
import { DollarSign } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { Holding } from '@/schemas/holding'
import { getStockDetail } from '@/data/stock-details'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { SectorPieChart } from '@/components/sector-pie-chart'

type PortfolioSummaryProps = {
	holdings: Holding[]
}

export function PortfolioSummary({ holdings }: PortfolioSummaryProps) {
	const sectorCounts = holdings.reduce<Record<string, number>>((acc, h) => {
		acc[h.sector] = (acc[h.sector] || 0) + h.weight
		return acc
	}, {})

	const sectors = Object.entries(sectorCounts)
		.sort((a, b) => b[1] - a[1])
		.map(([sector, weight]) => ({ name: sector, value: weight }))

	const metrics = useMemo(() => {
		let totalValue = 0
		let weightedPE = 0
		let weightedBeta = 0
		let weightedChange = 0
		let bestTicker = ''
		let bestChange = -Infinity
		let worstTicker = ''
		let worstChange = Infinity

		for (const h of holdings) {
			const detail = getStockDetail(h.ticker)
			if (!detail) continue
			totalValue += detail.currentPrice * h.weight * 10
			if (detail.metrics.peRatio > 0) {
				weightedPE += detail.metrics.peRatio * h.weight
			}
			weightedBeta += detail.metrics.beta * h.weight
			weightedChange += detail.dailyChange * h.weight
			if (detail.dailyChange > bestChange) {
				bestChange = detail.dailyChange
				bestTicker = detail.ticker
			}
			if (detail.dailyChange < worstChange) {
				worstChange = detail.dailyChange
				worstTicker = detail.ticker
			}
		}

		const totalWeight = holdings.reduce((s, h) => s + h.weight, 0)
		return {
			totalValue: Math.round(totalValue),
			avgPE: totalWeight > 0 ? weightedPE / totalWeight : 0,
			avgBeta: totalWeight > 0 ? weightedBeta / totalWeight : 0,
			dailyChange: totalWeight > 0 ? weightedChange / totalWeight : 0,
			bestTicker,
			bestChange,
			worstTicker,
			worstChange,
			sectorCount: sectors.length,
		}
	}, [holdings, sectors.length])

	const isPositiveDay = metrics.dailyChange >= 0

	const metricRows: {
		label: string
		value: string
		description: string
		color?: string
	}[] = [
		{
			label: 'Antal innehav',
			value: `${holdings.length}`,
			description: `Fördelat på ${metrics.sectorCount} sektorer`,
		},
		{
			label: 'Bäst idag',
			value: `${metrics.bestTicker} ${metrics.bestChange >= 0 ? '+' : ''}${metrics.bestChange.toFixed(1)}%`,
			description: 'Innehav med högst dagsförändring',
			color: metrics.bestChange >= 0 ? 'text-positive' : 'text-negative',
		},
		{
			label: 'Sämst idag',
			value: `${metrics.worstTicker} ${metrics.worstChange >= 0 ? '+' : ''}${metrics.worstChange.toFixed(1)}%`,
			description: 'Innehav med lägst dagsförändring',
			color: metrics.worstChange >= 0 ? 'text-positive' : 'text-negative',
		},
		{
			label: 'Snitt P/E',
			value: metrics.avgPE.toFixed(1),
			description: 'Viktat genomsnittligt P/E-tal',
		},
		{
			label: 'Snitt Beta',
			value: metrics.avgBeta.toFixed(2),
			description: 'Viktad marknadskorrelation',
		},
	]

	return (
		<div className='grid gap-4 *:min-w-0 sm:grid-cols-2'>
			<Card>
				<CardHeader>
					<CardTitle>Portföljöversikt</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div className='rounded-lg bg-primary/5 p-4 text-center'>
						<div className='mb-1 flex items-center justify-center gap-1 text-xs text-muted-foreground'>
							<DollarSign className='h-3 w-3' />
							Portföljvärde
						</div>
						<p className='text-3xl font-bold'>
							${metrics.totalValue.toLocaleString()}
						</p>
						<p
							className={cn(
								'mt-1 text-sm font-medium',
								isPositiveDay ? 'text-positive' : (
									'text-negative'
								),
							)}
						>
							{isPositiveDay ? '+' : ''}
							{metrics.dailyChange.toFixed(2)}% idag
						</p>
					</div>

					<Separator />

					<dl className='space-y-3'>
						{metricRows.map(
							({ label, value, description, color }) => (
								<div
									key={label}
									className='flex items-center justify-between'
								>
									<div>
										<dt className='text-sm font-medium'>
											{label}
										</dt>
										<dd className='text-xs text-muted-foreground'>
											{description}
										</dd>
									</div>
									<dd
										className={cn(
											'text-sm font-bold',
											color,
										)}
									>
										{value}
									</dd>
								</div>
							),
						)}
					</dl>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Sektorfördelning</CardTitle>
				</CardHeader>
				<CardContent>
					<SectorPieChart data={sectors} />
				</CardContent>
			</Card>
		</div>
	)
}
