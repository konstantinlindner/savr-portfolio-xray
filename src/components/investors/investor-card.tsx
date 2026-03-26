import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { Investor } from '@/schemas/investor'
import type { OverlapResult } from '@/hooks/use-overlap'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

type InvestorCardProps = {
	investor: Investor
	overlap: OverlapResult
}

function getOverlapColor(score: number) {
	if (score >= 10) return 'text-positive'
	if (score >= 5) return 'text-yellow-500'
	return 'text-muted-foreground'
}

function getInitials(name: string) {
	return name
		.split(' ')
		.map((n) => n[0])
		.join('')
		.slice(0, 2)
}

export function InvestorCard({ investor, overlap }: InvestorCardProps) {
	return (
		<Link to='/investor/$id' params={{ id: investor.id }}>
			<Card className='group flex h-full cursor-pointer flex-col transition-all duration-200 hover:scale-[1.02] hover:shadow-lg'>
				<CardHeader className='pb-3'>
					<div className='flex items-start justify-between'>
						<div className='flex items-center gap-3'>
							<div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary'>
								{getInitials(investor.name)}
							</div>
							<div>
								<h3 className='leading-tight font-semibold'>
									{investor.name}
								</h3>
								<p className='text-sm text-muted-foreground'>
									{investor.fund}
								</p>
							</div>
						</div>
						<div className='text-right'>
							<div
								className={cn(
									'text-2xl font-bold',
									getOverlapColor(overlap.score),
								)}
							>
								{overlap.score.toFixed(0)}%
							</div>
							<p className='text-xs text-muted-foreground'>
								matchning
							</p>
						</div>
					</div>
				</CardHeader>
				<CardContent className='flex flex-1 flex-col space-y-3'>
					<p className='text-sm text-muted-foreground italic'>
						{investor.tagline}
					</p>
					<div className='flex flex-wrap gap-1'>
						{investor.holdings.slice(0, 5).map((h) => (
							<Badge
								key={h.ticker}
								variant='secondary'
								className='text-xs'
							>
								{h.ticker}
							</Badge>
						))}
						{investor.holdings.length > 5 && (
							<Badge variant='outline' className='text-xs'>
								+{investor.holdings.length - 5}
							</Badge>
						)}
					</div>
					{overlap.sharedHoldings.length > 0 && (
						<p className='text-xs text-primary'>
							{overlap.sharedHoldings.length} gemensamma innehav:{' '}
							{overlap.sharedHoldings
								.map((h) => h.ticker)
								.join(', ')}
						</p>
					)}
					<div className='mt-auto flex items-center justify-end text-xs text-muted-foreground transition-colors group-hover:text-foreground'>
						Visa detaljer
						<ArrowRight className='ml-1 h-3 w-3 transition-transform group-hover:translate-x-1' />
					</div>
				</CardContent>
			</Card>
		</Link>
	)
}
