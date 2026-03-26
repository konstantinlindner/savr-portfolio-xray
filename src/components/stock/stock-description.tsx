import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type StockDescriptionProps = {
	description: string
}

export function StockDescription({ description }: StockDescriptionProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Om bolaget</CardTitle>
			</CardHeader>
			<CardContent>
				<p className='text-sm leading-relaxed text-muted-foreground'>
					{description}
				</p>
			</CardContent>
		</Card>
	)
}
