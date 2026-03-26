import { useMemo } from 'react'
import { TrendingUp } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { Holding } from '@/schemas/holding'
import { getRiskMetrics } from '@/data/portfolio-analytics'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type PortfolioRiskMetricsProps = {
	holdings: Holding[]
}

export function PortfolioRiskMetrics({ holdings }: PortfolioRiskMetricsProps) {
	const metrics = useMemo(() => getRiskMetrics(holdings), [holdings])

	const metricRows: {
		label: string
		value: string
		description: string
		color?: string
	}[] = [
		{
			label: 'Sharpekvot',
			value: metrics.sharpeRatio.toFixed(2),
			description: 'Avkastning per riskenhet',
			color: metrics.sharpeRatio >= 1 ? 'text-positive' : undefined,
		},
		{
			label: 'Sortinokvot',
			value: metrics.sortinoRatio.toFixed(2),
			description: 'Avkastning per nedsidesrisk',
			color: metrics.sortinoRatio >= 1.5 ? 'text-positive' : undefined,
		},
		{
			label: 'Standardavvikelse',
			value: `${metrics.standardDeviation.toFixed(1)}%`,
			description: 'Volatilitet (årlig)',
		},
		{
			label: 'Max drawdown',
			value: `${metrics.maxDrawdown.toFixed(1)}%`,
			description: 'Största kursfallet',
			color: 'text-negative',
		},
		{
			label: 'Beta',
			value: metrics.avgBeta.toFixed(2),
			description: 'Marknadskorrelation',
		},
		{
			label: 'Tracking error',
			value: `${metrics.trackingError.toFixed(1)}%`,
			description: 'Avvikelse mot index',
		},
		{
			label: 'Information ratio',
			value: metrics.informationRatio.toFixed(2),
			description: 'Överavkastning per tracking error',
		},
	]

	return (
		<Card>
			<CardHeader>
				<CardTitle>Riskmetrik</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div className='rounded-lg bg-primary/5 p-4 text-center'>
					<div className='mb-1 flex items-center justify-center gap-1 text-xs text-muted-foreground'>
						<TrendingUp className='h-3 w-3' />
						CAGR (genomsnittlig årlig avkastning)
					</div>
					<p className='text-3xl font-bold text-positive'>
						{metrics.cagr.toFixed(1)}%
					</p>
				</div>

				<Separator />

				<dl className='space-y-3'>
					{metricRows.map(({ label, value, description, color }) => (
						<div
							key={label}
							className='flex items-center justify-between'
						>
							<div>
								<dt className='text-sm font-medium'>{label}</dt>
								<dd className='text-xs text-muted-foreground'>
									{description}
								</dd>
							</div>
							<dd className={cn('text-sm font-bold', color)}>
								{value}
							</dd>
						</div>
					))}
				</dl>
			</CardContent>
		</Card>
	)
}
