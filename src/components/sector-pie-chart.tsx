import { Cell, Pie, PieChart } from 'recharts'

import { cn } from '@/lib/utils'
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from '@/components/ui/chart'

const COLORS = [
	'var(--color-chart-1)',
	'var(--color-chart-2)',
	'var(--color-chart-3)',
	'var(--color-chart-4)',
	'var(--color-chart-5)',
]

type SectorPieChartProps = {
	data: { name: string; value: number }[]
	className?: string
}

export function SectorPieChart({
	data,
	className = 'h-[300px] w-full',
}: SectorPieChartProps) {
	const chartConfig = data.reduce<ChartConfig>((acc, s, i) => {
		acc[s.name] = {
			label: s.name,
			color: COLORS[i % COLORS.length],
		}
		return acc
	}, {})

	return (
		<ChartContainer
			config={chartConfig}
			className={cn('overflow-hidden', className)}
		>
			<PieChart>
				<ChartTooltip
					content={<ChartTooltipContent nameKey='name' />}
					formatter={(value) => [`${value}%`]}
				/>
				<Pie
					data={data}
					dataKey='value'
					nameKey='name'
					cx='50%'
					cy='50%'
					innerRadius={60}
					outerRadius={100}
					strokeWidth={2}
				>
					{data.map((entry, index) => (
						<Cell
							key={entry.name}
							fill={COLORS[index % COLORS.length]}
						/>
					))}
				</Pie>
				<ChartLegend
					content={<ChartLegendContent nameKey='name' />}
					className='flex-wrap'
				/>
			</PieChart>
		</ChartContainer>
	)
}
