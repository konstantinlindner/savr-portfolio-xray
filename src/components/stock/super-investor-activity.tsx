import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { investors } from '@/data/investors'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type SuperInvestorActivityProps = {
	ticker: string
}

export function SuperInvestorActivity({ ticker }: SuperInvestorActivityProps) {
	const holders = investors
		.map((inv) => {
			const holding = inv.holdings.find((h) => h.ticker === ticker)
			if (!holding) return null
			return { investor: inv, weight: holding.weight }
		})
		.filter(
			(
				h,
			): h is { investor: (typeof investors)[number]; weight: number } =>
				h !== null,
		)

	return (
		<Card>
			<CardHeader>
				<CardTitle>Superinvesterare</CardTitle>
			</CardHeader>
			<CardContent>
				{holders.length === 0 ?
					<p className='text-sm text-muted-foreground'>
						Ingen superinvesterare äger denna aktie
					</p>
				:	<div className='space-y-3'>
						{holders.map((h) => (
							<Link
								key={h.investor.id}
								to='/investor/$id'
								params={{ id: h.investor.id }}
								className='flex items-center justify-between rounded-md p-2 transition-colors hover:bg-accent/50'
							>
								<div className='flex items-center gap-3'>
									<div className='flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary'>
										{h.investor.name
											.split(' ')
											.map((n) => n[0])
											.join('')}
									</div>
									<div>
										<p className='text-sm font-medium'>
											{h.investor.name}
										</p>
										<p className='text-xs text-muted-foreground'>
											{h.investor.fund}
										</p>
									</div>
								</div>
								<div className='flex items-center gap-2'>
									<Badge variant='secondary'>
										{h.weight}%
									</Badge>
									<ArrowRight className='h-3 w-3 text-muted-foreground' />
								</div>
							</Link>
						))}
					</div>
				}
			</CardContent>
		</Card>
	)
}
