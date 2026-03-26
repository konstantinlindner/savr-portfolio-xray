import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, TrendingUp } from 'lucide-react'

import { cn } from '@/lib/utils'
import { getInvestorById } from '@/data/investors'
import { usePortfolio } from '@/hooks/use-portfolio'
import { useOverlap } from '@/hooks/use-overlap'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComparisonTable } from '@/components/investors/comparison-table'
import { HoldingsBarChart } from '@/components/investors/holdings-bar-chart'
import { PerformanceComparison } from '@/components/investors/performance-comparison'
import { SectorDonutChart } from '@/components/investors/sector-donut-chart'

export const Route = createFileRoute('/investor/$id')({
	component: InvestorPage,
})

export function InvestorPage() {
	const { id } = Route.useParams()
	const investor = getInvestorById(id)
	const { holdings } = usePortfolio()
	const overlap = useOverlap(holdings, investor?.holdings ?? [])

	if (!investor) {
		return (
			<div className='flex flex-col items-center justify-center py-20'>
				<h1 className='text-2xl font-bold'>
					Investeraren hittades inte
				</h1>
				<p className='mt-2 text-muted-foreground'>
					Ingen investerare med id "{id}" finns.
				</p>
				<Link to='/investors'>
					<Button variant='outline' className='mt-4'>
						<ArrowLeft className='mr-2 h-4 w-4' />
						Tillbaka
					</Button>
				</Link>
			</div>
		)
	}

	function getOverlapColor(score: number) {
		if (score >= 10) return 'text-positive'
		if (score >= 5) return 'text-yellow-500'
		return 'text-muted-foreground'
	}

	return (
		<div className='space-y-8'>
			<div>
				<Link to='/investors'>
					<Button variant='ghost' size='sm' className='mb-4'>
						<ArrowLeft className='mr-2 h-4 w-4' />
						Superinvesterare
					</Button>
				</Link>

				<div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
					<div className='flex items-center gap-4'>
						<div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary'>
							{investor.name
								.split(' ')
								.map((n) => n[0])
								.join('')}
						</div>
						<div>
							<h1 className='text-3xl font-bold tracking-tight'>
								{investor.name}
							</h1>
							<p className='text-muted-foreground'>
								{investor.fund}
							</p>
							<p className='mt-1 text-sm text-muted-foreground italic'>
								{investor.tagline}
							</p>
						</div>
					</div>
					<Card className='sm:min-w-[200px]'>
						<CardContent className='py-4 text-center'>
							<p className='mb-1 text-xs tracking-wider text-muted-foreground uppercase'>
								Matchning med din portfölj
							</p>
							<p
								className={cn(
									'text-4xl font-bold',
									getOverlapColor(overlap.score),
								)}
							>
								{overlap.score.toFixed(0)}%
							</p>
							<p className='mt-1 text-sm text-muted-foreground'>
								{overlap.sharedHoldings.length} gemensamma
								innehav
							</p>
						</CardContent>
					</Card>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className='flex items-center gap-2'>
						<TrendingUp className='h-5 w-5' />
						Investeringsfilosofi
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='leading-relaxed text-muted-foreground'>
						{investor.philosophy}
					</p>
				</CardContent>
			</Card>

			<PerformanceComparison
				investorId={investor.id}
				investorName={investor.name}
			/>

			<div className='grid gap-8 *:min-w-0 lg:grid-cols-2'>
				<Card>
					<CardHeader>
						<CardTitle>Topp 10 innehav</CardTitle>
					</CardHeader>
					<CardContent>
						<HoldingsBarChart holdings={investor.holdings} />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Sektorfördelning</CardTitle>
					</CardHeader>
					<CardContent>
						<SectorDonutChart sectors={investor.sectorAllocation} />
					</CardContent>
				</Card>
			</div>

			<Separator />

			<div className='space-y-4'>
				<h2 className='text-2xl font-bold'>
					Jämförelse med din portfölj
				</h2>

				{overlap.sharedHoldings.length > 0 && (
					<div className='flex flex-wrap gap-2'>
						<span className='text-sm text-muted-foreground'>
							Gemensamma innehav:
						</span>
						{overlap.sharedHoldings.map((h) => (
							<Badge
								key={h.ticker}
								className='bg-primary/10 text-primary'
							>
								{h.ticker}
							</Badge>
						))}
					</div>
				)}

				<ComparisonTable
					overlap={overlap}
					investorName={investor.name}
				/>
			</div>
		</div>
	)
}
