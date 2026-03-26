import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import type { Holding } from '@/schemas/holding'
import {
	ChartContainer,
	ChartTooltip,
	type ChartConfig,
} from '@/components/ui/chart'

type HoldingsBarChartProps = {
	holdings: Holding[]
}

const chartConfig = {
	weight: {
		label: 'Vikt %',
		color: 'var(--color-chart-1)',
	},
} satisfies ChartConfig

export function HoldingsBarChart({ holdings }: HoldingsBarChartProps) {
	const data = holdings.map((h) => ({
		ticker: h.ticker,
		name: h.name,
		weight: h.weight,
	}))

	return (
		<ChartContainer
			config={chartConfig}
			className='h-[350px] w-full overflow-hidden'
		>
			<BarChart
				data={data}
				layout='vertical'
				margin={{ left: 10, right: 20 }}
			>
				<XAxis type='number' tickFormatter={(v) => `${v}%`} />
				<YAxis
					dataKey='ticker'
					type='category'
					width={65}
					tick={{ fontSize: 12 }}
				/>
				<ChartTooltip
					content={({ active, payload }) => {
						if (!active || !payload?.length) return null
						const d = payload[0].payload
						return (
							<div className='rounded-lg border bg-background px-3 py-2 text-xs shadow-xl'>
								<p className='font-medium'>{d.name}</p>
								<p className='text-muted-foreground'>
									{d.ticker} — {d.weight}%
								</p>
							</div>
						)
					}}
				/>
				<Bar
					dataKey='weight'
					fill='var(--color-weight)'
					radius={[0, 4, 4, 0]}
				/>
			</BarChart>
		</ChartContainer>
	)
}
