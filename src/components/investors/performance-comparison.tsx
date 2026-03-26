import { useMemo } from 'react'
import { Line, LineChart, XAxis, YAxis } from 'recharts'

import { cn } from '@/lib/utils'
import {
	investorPerformance,
	userPerformance,
	generateCumulativeReturns,
} from '@/data/performance'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import {
	ChartContainer,
	ChartTooltip,
	type ChartConfig,
} from '@/components/ui/chart'

type PerformanceComparisonProps = {
	investorId: string
	investorName: string
}

const chartConfig = {
	user: {
		label: 'Din portfölj',
		color: 'var(--color-chart-1)',
	},
	investor: {
		label: 'Investerare',
		color: 'var(--color-chart-2)',
	},
} satisfies ChartConfig

const periods = [
	{ key: 'ytd' as const, label: 'Hittills i år' },
	{ key: 'oneYear' as const, label: '1 år' },
	{ key: 'threeYear' as const, label: '3 år (CAGR)' },
	{ key: 'fiveYear' as const, label: '5 år (CAGR)' },
	{ key: 'tenYear' as const, label: '10 år (CAGR)' },
]

function formatReturn(value: number | null) {
	if (value === null) return '—'
	const prefix = value >= 0 ? '+' : ''
	return `${prefix}${value.toFixed(1)}%`
}

export function PerformanceComparison({
	investorId,
	investorName,
}: PerformanceComparisonProps) {
	const invPerf = investorPerformance[investorId]

	const chartData = useMemo(() => {
		if (!invPerf) return []
		const userReturns = generateCumulativeReturns(
			userPerformance.oneYear,
			0,
			24,
		)
		const invReturns = generateCumulativeReturns(
			invPerf.oneYear,
			investorId.length,
			24,
		)

		return userReturns.map((p, i) => ({
			month: p.month,
			user: p.value,
			investor: invReturns[i]?.value ?? 100,
		}))
	}, [invPerf, investorId])

	if (!invPerf) return null

	return (
		<Card>
			<CardHeader>
				<CardTitle>Avkastningsjämförelse</CardTitle>
			</CardHeader>
			<CardContent className='space-y-6'>
				<div className='rounded-md border'>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Period</TableHead>
								<TableHead className='text-right'>
									Din portfölj
								</TableHead>
								<TableHead className='text-right'>
									{investorName}
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{periods.map(({ key, label }) => (
								<TableRow key={key}>
									<TableCell>{label}</TableCell>
									<TableCell
										className={cn(
											'text-right font-medium',
											(
												userPerformance[key] !== null
													&& (userPerformance[
														key
													] as number) >= 0
											) ?
												'text-positive'
											:	'text-negative',
										)}
									>
										{formatReturn(userPerformance[key])}
									</TableCell>
									<TableCell
										className={cn(
											'text-right font-medium',
											(
												invPerf[key] !== null
													&& (invPerf[key] as number)
														>= 0
											) ?
												'text-positive'
											:	'text-negative',
										)}
									>
										{formatReturn(invPerf[key])}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>

				<div>
					<p className='mb-3 text-sm text-muted-foreground'>
						Kumulativ avkastning senaste 24 månaderna (index = 100)
					</p>
					<ChartContainer
						config={chartConfig}
						className='h-[250px] w-full overflow-hidden'
					>
						<LineChart
							data={chartData}
							margin={{ left: 10, right: 10 }}
						>
							<XAxis
								dataKey='month'
								tick={{ fontSize: 11 }}
								tickFormatter={(m) => {
									const parts = m.split('-')
									return `${parts[1]}/${parts[0].slice(2)}`
								}}
								interval='preserveStartEnd'
							/>
							<YAxis
								tick={{ fontSize: 11 }}
								domain={['auto', 'auto']}
								width={45}
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
													{p.dataKey === 'user' ?
														'Din portfölj'
													:	investorName}
													:{' '}
													{Number(p.value).toFixed(1)}
												</p>
											))}
										</div>
									)
								}}
							/>
							<Line
								type='monotone'
								dataKey='user'
								stroke='var(--color-user)'
								strokeWidth={2}
								dot={false}
							/>
							<Line
								type='monotone'
								dataKey='investor'
								stroke='var(--color-investor)'
								strokeWidth={2}
								dot={false}
							/>
						</LineChart>
					</ChartContainer>
				</div>
			</CardContent>
		</Card>
	)
}
