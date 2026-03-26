import { cn } from '@/lib/utils'
import type { Transaction } from '@/schemas/stock-detail'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

type TransactionHistoryProps = {
	transactions: Transaction[]
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Transaktionshistorik</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Datum</TableHead>
							<TableHead>Typ</TableHead>
							<TableHead className='text-right'>Antal</TableHead>
							<TableHead className='text-right'>Pris</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{transactions.map((t, i) => (
							<TableRow key={i}>
								<TableCell>{t.date}</TableCell>
								<TableCell>
									<Badge
										variant='outline'
										className={cn(
											t.type === 'buy' ?
												'border-green-500/30 text-green-500'
											:	'border-red-500/30 text-red-500',
										)}
									>
										{t.type === 'buy' ? 'Köp' : 'Sälj'}
									</Badge>
								</TableCell>
								<TableCell className='text-right'>
									{t.shares}
								</TableCell>
								<TableCell className='text-right'>
									${t.price.toFixed(2)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
