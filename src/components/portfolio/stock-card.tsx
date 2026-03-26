import { Link } from '@tanstack/react-router'
import { TrendingDown, TrendingUp } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { StockDetail } from '@/schemas/stock-detail'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

type StockCardProps = {
	detail: StockDetail
	weight: number
}

export function StockCard({ detail, weight }: StockCardProps) {
	const isPositive = detail.dailyChange >= 0

	return (
		<Link to='/stock/$ticker' params={{ ticker: detail.ticker }}>
			<Card className='group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg'>
				<CardContent className='flex items-center justify-between py-4'>
					<div className='flex items-center gap-3'>
						<div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary'>
							{detail.name[0]}
						</div>
						<div>
							<div className='flex items-center gap-2'>
								<p className='font-semibold'>{detail.ticker}</p>
								<Badge variant='secondary' className='text-xs'>
									{weight}%
								</Badge>
							</div>
							<p className='text-sm text-muted-foreground'>
								{detail.name}
							</p>
						</div>
					</div>
					<div className='text-right'>
						<p className='font-medium'>
							${detail.currentPrice.toFixed(2)}
						</p>
						<div
							className={cn(
								'flex items-center justify-end gap-1 text-xs font-medium',
								isPositive ? 'text-positive' : 'text-negative',
							)}
						>
							{isPositive ?
								<TrendingUp className='h-3 w-3' />
							:	<TrendingDown className='h-3 w-3' />}
							{isPositive ? '+' : ''}
							{detail.dailyChange.toFixed(2)}%
						</div>
					</div>
				</CardContent>
			</Card>
		</Link>
	)
}
