import { useMemo, useState } from 'react'
import { Area, AreaChart, ReferenceDot, XAxis, YAxis } from 'recharts'

import type { PricePoint, Transaction } from '@/schemas/stock-detail'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from '@/components/ui/chart'

type PriceChartProps = {
	priceHistory: PricePoint[]
	ticker: string
	transactions?: Transaction[]
}

const chartConfig = {
	price: {
		label: 'Pris',
		color: 'var(--color-chart-1)',
	},
} satisfies ChartConfig

export function PriceChart({
	priceHistory,
	ticker,
	transactions = [],
}: PriceChartProps) {
	const [period, setPeriod] = useState<'1M' | '3M'>('3M')

	const cutoff = period === '1M' ? 30 : 90
	const data = priceHistory.slice(-cutoff)

	const markers = useMemo(() => {
		return transactions
			.map((t) => {
				// Find exact or closest date in visible data
				const exact = data.find((p) => p.date === t.date)
				if (exact)
					return {
						date: exact.date,
						price: exact.price,
						type: t.type,
					}
				// Find closest date
				let closest = data[0]
				let minDiff = Math.abs(
					new Date(data[0].date).getTime()
						- new Date(t.date).getTime(),
				)
				for (const p of data) {
					const diff = Math.abs(
						new Date(p.date).getTime() - new Date(t.date).getTime(),
					)
					if (diff < minDiff) {
						minDiff = diff
						closest = p
					}
				}
				// Only show if within the visible range
				if (minDiff > 7 * 24 * 60 * 60 * 1000) return null
				return {
					date: closest.date,
					price: closest.price,
					type: t.type,
				}
			})
			.filter(
				(
					m,
				): m is { date: string; price: number; type: 'buy' | 'sell' } =>
					m !== null,
			)
	}, [data, transactions])

	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between'>
				<CardTitle>Kursutveckling — {ticker}</CardTitle>
				<div className='flex gap-1'>
					{(['1M', '3M'] as const).map((p) => (
						<Button
							key={p}
							variant={period === p ? 'default' : 'outline'}
							size='sm'
							onClick={() => setPeriod(p)}
						>
							{p}
						</Button>
					))}
				</div>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={chartConfig}
					className='h-[300px] w-full overflow-hidden'
				>
					<AreaChart data={data} margin={{ left: 10, right: 10 }}>
						<defs>
							<linearGradient
								id='priceGradient'
								x1='0'
								y1='0'
								x2='0'
								y2='1'
							>
								<stop
									offset='5%'
									stopColor='var(--color-price)'
									stopOpacity={0.3}
								/>
								<stop
									offset='95%'
									stopColor='var(--color-price)'
									stopOpacity={0}
								/>
							</linearGradient>
						</defs>
						<XAxis
							dataKey='date'
							tick={{ fontSize: 11 }}
							tickFormatter={(d) => {
								const date = new Date(d)
								return `${date.getDate()}/${date.getMonth() + 1}`
							}}
							interval='preserveStartEnd'
						/>
						<YAxis
							domain={['auto', 'auto']}
							tick={{ fontSize: 11 }}
							tickFormatter={(v) => `$${v}`}
							width={65}
						/>
						<ChartTooltip
							content={<ChartTooltipContent />}
							formatter={(value) => [
								`$${Number(value).toFixed(2)}`,
								'Pris',
							]}
						/>
						<Area
							type='monotone'
							dataKey='price'
							stroke='var(--color-price)'
							fill='url(#priceGradient)'
							strokeWidth={2}
						/>
						{markers.map((m, i) => (
							<ReferenceDot
								key={i}
								x={m.date}
								y={m.price}
								r={6}
								fill={
									m.type === 'buy' ?
										'var(--color-positive)'
									:	'var(--color-negative)'
								}
								stroke='var(--color-card)'
								strokeWidth={2}
							/>
						))}
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
