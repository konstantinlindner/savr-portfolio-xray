import { useMemo } from 'react'

import type { Holding } from '@/schemas/holding'
import { getCurrencyExposure } from '@/data/portfolio-analytics'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SectorPieChart } from '@/components/sector-pie-chart'

type CurrencyExposureProps = {
	holdings: Holding[]
}

export function CurrencyExposure({ holdings }: CurrencyExposureProps) {
	const currencies = useMemo(() => getCurrencyExposure(holdings), [holdings])

	return (
		<Card>
			<CardHeader>
				<CardTitle>Valutaexponering</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<SectorPieChart data={currencies} />
				{currencies.length === 1 && (
					<p className='text-xs text-muted-foreground'>
						100% exponering mot {currencies[0].name}. Du har ingen
						valutadiversifiering.
					</p>
				)}
			</CardContent>
		</Card>
	)
}
