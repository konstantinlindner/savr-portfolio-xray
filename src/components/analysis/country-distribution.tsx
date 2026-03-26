import { useMemo } from 'react'

import type { Holding } from '@/schemas/holding'
import { getCountryDistribution } from '@/data/portfolio-analytics'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SectorPieChart } from '@/components/sector-pie-chart'

type CountryDistributionProps = {
	holdings: Holding[]
}

export function CountryDistribution({ holdings }: CountryDistributionProps) {
	const countries = useMemo(
		() => getCountryDistribution(holdings),
		[holdings],
	)

	return (
		<Card>
			<CardHeader>
				<CardTitle>Landsfördelning</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<SectorPieChart data={countries} />
				{countries.length === 1 && (
					<p className='text-xs text-muted-foreground'>
						Din portfölj är helt koncentrerad till{' '}
						{countries[0].name}. Överväg diversifiering till andra
						marknader.
					</p>
				)}
			</CardContent>
		</Card>
	)
}
