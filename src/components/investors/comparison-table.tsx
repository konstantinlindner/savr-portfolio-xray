import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { Link } from '@tanstack/react-router'

import { cn } from '@/lib/utils'
import type { OverlapResult } from '@/hooks/use-overlap'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

type ComparisonRow = {
	ticker: string
	name: string
	investorWeight: number | null
	userWeight: number | null
	shared: boolean
}

type ComparisonTableProps = {
	overlap: OverlapResult
	investorName: string
}

const columnHelper = createColumnHelper<ComparisonRow>()

export function ComparisonTable({
	overlap,
	investorName,
}: ComparisonTableProps) {
	const rows: ComparisonRow[] = [
		...overlap.sharedHoldings.map((h) => ({
			ticker: h.ticker,
			name: h.name,
			investorWeight: h.investorWeight,
			userWeight: h.userWeight,
			shared: true,
		})),
		...overlap.uniqueToInvestor.map((h) => ({
			ticker: h.ticker,
			name: h.name,
			investorWeight: h.weight,
			userWeight: null,
			shared: false,
		})),
		...overlap.uniqueToUser.map((h) => ({
			ticker: h.ticker,
			name: h.name,
			investorWeight: null,
			userWeight: h.weight,
			shared: false,
		})),
	]

	const columns = [
		columnHelper.accessor('ticker', {
			header: 'Ticker',
			cell: (info) => (
				<Link
					to='/stock/$ticker'
					params={{ ticker: info.getValue() }}
					className='font-mono font-medium text-primary hover:underline'
				>
					{info.getValue()}
				</Link>
			),
		}),
		columnHelper.accessor('name', {
			header: 'Namn',
			cell: (info) => (
				<Link
					to='/stock/$ticker'
					params={{ ticker: info.row.original.ticker }}
					className='hover:text-primary hover:underline'
				>
					{info.getValue()}
				</Link>
			),
		}),
		columnHelper.accessor('investorWeight', {
			header: () => investorName,
			cell: (info) => {
				const val = info.getValue()
				return val !== null ?
						<span className='font-medium'>{val.toFixed(1)}%</span>
					:	<span className='text-muted-foreground'>—</span>
			},
		}),
		columnHelper.accessor('userWeight', {
			header: 'Din portfölj',
			cell: (info) => {
				const val = info.getValue()
				return val !== null ?
						<span className='font-medium'>{val.toFixed(1)}%</span>
					:	<span className='text-muted-foreground'>—</span>
			},
		}),
	]

	const table = useReactTable({
		data: rows,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<div className='overflow-x-auto rounded-md border'>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((hg) => (
						<TableRow key={hg.id}>
							{hg.headers.map((header) => (
								<TableHead key={header.id}>
									{flexRender(
										header.column.columnDef.header,
										header.getContext(),
									)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.map((row) => (
						<TableRow
							key={row.id}
							className={cn(
								row.original.shared && 'bg-primary/5',
							)}
						>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id}>
									{flexRender(
										cell.column.columnDef.cell,
										cell.getContext(),
									)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
