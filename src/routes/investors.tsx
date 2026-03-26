import { createFileRoute } from '@tanstack/react-router'
import { Trophy } from 'lucide-react'

import { usePortfolio } from '@/hooks/use-portfolio'
import { useAllOverlaps } from '@/hooks/use-overlap'
import { Card, CardContent } from '@/components/ui/card'
import { InvestorCard } from '@/components/investors/investor-card'

export const Route = createFileRoute('/investors')({
	component: InvestorsPage,
})

export function InvestorsPage() {
	const { holdings } = usePortfolio()
	const overlaps = useAllOverlaps(holdings)

	const bestMatch = overlaps[0]

	return (
		<div className='space-y-8'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>
					Superinvesterare
				</h1>
				<p className='mt-2 text-muted-foreground'>
					Jämför din portfölj med världens bästa investerare
				</p>
			</div>

			{bestMatch && bestMatch.overlap.score > 0 && (
				<Card className='border-primary/30 bg-primary/5'>
					<CardContent className='flex items-center gap-3 py-4'>
						<Trophy className='h-5 w-5 text-primary' />
						<p className='text-sm'>
							Du investerar mest likt{' '}
							<span className='font-semibold'>
								{bestMatch.investor.name}
							</span>{' '}
							med{' '}
							<span className='font-semibold text-primary'>
								{bestMatch.overlap.score.toFixed(0)}% matchning
							</span>
						</p>
					</CardContent>
				</Card>
			)}

			<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
				{overlaps.map(({ investor, overlap }) => (
					<InvestorCard
						key={investor.id}
						investor={investor}
						overlap={overlap}
					/>
				))}
			</div>
		</div>
	)
}
