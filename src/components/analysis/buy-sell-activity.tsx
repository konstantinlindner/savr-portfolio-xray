import { useMemo } from 'react'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import type { Holding } from '@/schemas/holding'
import { getBuySellActivity } from '@/data/portfolio-analytics'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	ChartContainer,
	ChartTooltip,
	type ChartConfig,
} from '@/components/ui/chart'

type BuySellActivityProps = {
	holdings: Holding[]
}

const chartConfig = {
	buys: {
		label: 'Köp',
		color: 'var(--color-positive)',
	},
	sells: {
		label: 'Sälj',
		color: 'var(--color-negative)',
	},
} satisfies ChartConfig

export function BuySellActivity({ holdings }: BuySellActivityProps) {
	const activity = useMemo(() => getBuySellActivity(holdings), [holdings])

	return (
		<Card>
			<CardHeader>
				<CardTitle>Köp- & säljaktivitet</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div className='grid grid-cols-3 gap-4'>
					<div>
						<p className='text-xs text-muted-foreground'>
							Totala köp
						</p>
						<p className='text-lg font-bold'>
							{activity.totalBuys}
						</p>
					</div>
					<div>
						<p className='text-xs text-muted-foreground'>
							Totala sälj
						</p>
						<p className='text-lg font-bold'>
							{activity.totalSells}
						</p>
					</div>
					<div>
						<p className='text-xs text-muted-foreground'>
							Investerat belopp
						</p>
						<p className='text-lg font-bold'>
							${activity.totalInvested.toLocaleString()}
						</p>
					</div>
				</div>

				<ChartContainer
					config={chartConfig}
					className='h-[250px] w-full overflow-hidden'
				>
					<BarChart
						data={activity.monthly}
						margin={{ left: 10, right: 10 }}
					>
						<XAxis
							dataKey='month'
							tick={{ fontSize: 11 }}
							tickFormatter={(m) => {
								const parts = m.split('-')
								return `${parts[1]}/${parts[0].slice(2)}`
							}}
						/>
						<YAxis
							tick={{ fontSize: 11 }}
							tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
							width={55}
						/>
						<ChartTooltip
							content={({ active, payload, label }) => {
								if (!active || !payload?.length) return null
								return (
									<div className='rounded-lg border bg-background px-3 py-2 text-xs shadow-xl'>
										<p className='mb-1 text-muted-foreground'>
											{label}
										</p>
										{payload.map((p) => (
											<p
												key={p.dataKey as string}
												style={{ color: p.color }}
											>
												{p.dataKey === 'buys' ?
													'Köp'
												:	'Sälj'}
												: $
												{Number(
													p.value,
												).toLocaleString()}
											</p>
										))}
									</div>
								)
							}}
						/>
						<Bar
							dataKey='buys'
							fill='var(--color-buys)'
							radius={[4, 4, 0, 0]}
						/>
						<Bar
							dataKey='sells'
							fill='var(--color-sells)'
							radius={[4, 4, 0, 0]}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
