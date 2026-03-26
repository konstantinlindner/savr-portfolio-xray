import { TrendingDown, TrendingUp } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { StockDetail } from '@/schemas/stock-detail'
import { Badge } from '@/components/ui/badge'

type StockHeaderProps = {
	detail: StockDetail
	weight: number
}

export function StockHeader({ detail, weight }: StockHeaderProps) {
	const isPositive = detail.dailyChange >= 0

	return (
		<div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
			<div className='flex items-center gap-4'>
				<div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary'>
					{detail.name[0]}
				</div>
				<div>
					<div className='flex items-center gap-2'>
						<h1 className='text-3xl font-bold tracking-tight'>
							{detail.name}
						</h1>
						<Badge variant='secondary' className='font-mono'>
							{detail.ticker}
						</Badge>
					</div>
					<p className='text-sm text-muted-foreground'>
						{weight > 0 ?
							`${weight}% av din portfölj`
						:	'Ej i din portfölj'}
					</p>
				</div>
			</div>
			<div className='text-right'>
				<p className='text-3xl font-bold'>
					${detail.currentPrice.toFixed(2)}
				</p>
				<div
					className={cn(
						'flex items-center justify-end gap-1 text-sm font-medium',
						isPositive ? 'text-positive' : 'text-negative',
					)}
				>
					{isPositive ?
						<TrendingUp className='h-4 w-4' />
					:	<TrendingDown className='h-4 w-4' />}
					{isPositive ? '+' : ''}
					{detail.dailyChange.toFixed(2)}%
				</div>
			</div>
		</div>
	)
}
