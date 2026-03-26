import { Loader2 } from 'lucide-react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function AnalysisLoading() {
	return (
		<div className='space-y-6'>
			<div className='flex items-center gap-3'>
				<Loader2 className='h-5 w-5 animate-spin text-primary' />
				<p className='text-sm text-muted-foreground'>
					AI analyserar din portfölj...
				</p>
			</div>
			{[1, 2, 3].map((i) => (
				<Card key={i}>
					<CardHeader>
						<Skeleton className='h-6 w-40' />
					</CardHeader>
					<CardContent className='space-y-3'>
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-3/4' />
						<Skeleton className='h-4 w-5/6' />
					</CardContent>
				</Card>
			))}
		</div>
	)
}
