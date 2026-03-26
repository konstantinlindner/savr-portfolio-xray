import type { KeyMetrics } from '@/schemas/stock-detail'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type KeyMetricsCardProps = {
	metrics: KeyMetrics
}

const metricLabels: {
	key: keyof KeyMetrics
	label: string
	format: (v: number | string) => string
}[] = [
	{ key: 'peRatio', label: 'P/E-tal', format: (v) => String(v) },
	{ key: 'marketCap', label: 'Börsvärde', format: (v) => String(v) },
	{ key: 'high52w', label: '52v Högsta', format: (v) => `$${v}` },
	{ key: 'low52w', label: '52v Lägsta', format: (v) => `$${v}` },
	{ key: 'dividendYield', label: 'Direktavkastning', format: (v) => `${v}%` },
	{ key: 'beta', label: 'Beta', format: (v) => String(v) },
	{ key: 'eps', label: 'Vinst/aktie', format: (v) => `$${v}` },
]

export function KeyMetricsCard({ metrics }: KeyMetricsCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Nyckeltal</CardTitle>
			</CardHeader>
			<CardContent>
				<dl className='grid grid-cols-2 gap-x-4 gap-y-3'>
					{metricLabels.map(({ key, label, format }) => (
						<div key={key}>
							<dt className='text-xs text-muted-foreground'>
								{label}
							</dt>
							<dd className='text-sm font-medium'>
								{format(metrics[key])}
							</dd>
						</div>
					))}
				</dl>
			</CardContent>
		</Card>
	)
}
