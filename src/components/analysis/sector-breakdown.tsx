import { useMemo } from 'react'

import type { Holding } from '@/schemas/holding'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SectorPieChart } from '@/components/sector-pie-chart'

type SectorBreakdownProps = {
	holdings: Holding[]
}

export function SectorBreakdown({ holdings }: SectorBreakdownProps) {
	const sectors = useMemo(() => {
		const counts: Record<string, { weight: number; count: number }> = {}
		for (const h of holdings) {
			if (!counts[h.sector]) counts[h.sector] = { weight: 0, count: 0 }
			counts[h.sector].weight += h.weight
			counts[h.sector].count++
		}
		return Object.entries(counts)
			.sort((a, b) => b[1].weight - a[1].weight)
			.map(([sector, data]) => ({ sector, ...data }))
	}, [holdings])

	const chartData = sectors.map((s) => ({ name: s.sector, value: s.weight }))

	return (
		<Card>
			<CardHeader>
				<CardTitle>Branschfördelning</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<SectorPieChart data={chartData} />
				<div className='space-y-2'>
					{sectors.map((s) => (
						<div
							key={s.sector}
							className='flex items-center justify-between text-sm'
						>
							<span>{s.sector}</span>
							<span className='text-muted-foreground'>
								{s.weight}% · {s.count} innehav
							</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
