import { Newspaper } from 'lucide-react'

import type { NewsArticle } from '@/schemas/stock-detail'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type StockNewsProps = {
	news: NewsArticle[]
}

export function StockNews({ news }: StockNewsProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex items-center gap-2'>
					<Newspaper className='h-5 w-5' />
					Nyheter
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='space-y-4'>
					{news.map((article, i) => (
						<div
							key={i}
							className='border-b border-border/40 pb-4 last:border-0 last:pb-0'
						>
							<h4 className='text-sm leading-snug font-medium'>
								{article.title}
							</h4>
							<p className='mt-1 text-xs text-muted-foreground'>
								{article.source} · {article.date}
							</p>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
