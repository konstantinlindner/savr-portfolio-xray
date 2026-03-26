import { useState } from 'react'
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
	type SortingState,
} from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import type { Holding } from '@/schemas/holding'
import { Button } from '@/components/ui/button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

type PortfolioTableProps = {
	holdings: Holding[]
}

const columnHelper = createColumnHelper<Holding>()

const columns = [
	columnHelper.accessor('ticker', {
		header: ({ column }) => (
			<Button
				variant='ghost'
				size='sm'
				onClick={() => column.toggleSorting()}
				className='-ml-3'
			>
				Ticker
				<ArrowUpDown className='ml-1 h-3 w-3' />
			</Button>
		),
		cell: (info) => (
			<span className='font-mono font-medium'>{info.getValue()}</span>
		),
	}),
	columnHelper.accessor('name', {
		header: ({ column }) => (
			<Button
				variant='ghost'
				size='sm'
				onClick={() => column.toggleSorting()}
				className='-ml-3'
			>
				Namn
				<ArrowUpDown className='ml-1 h-3 w-3' />
			</Button>
		),
	}),
	columnHelper.accessor('sector', {
		header: 'Sektor',
		cell: (info) => (
			<span className='text-muted-foreground'>{info.getValue()}</span>
		),
	}),
	columnHelper.accessor('weight', {
		header: ({ column }) => (
			<Button
				variant='ghost'
				size='sm'
				onClick={() => column.toggleSorting()}
				className='-ml-3'
			>
				Vikt %
				<ArrowUpDown className='ml-1 h-3 w-3' />
			</Button>
		),
		cell: (info) => (
			<span className='font-medium text-positive'>
				{info.getValue().toFixed(1)}%
			</span>
		),
	}),
]

export function PortfolioTable({ holdings }: PortfolioTableProps) {
	const [sorting, setSorting] = useState<SortingState>([])

	const table = useReactTable({
		data: holdings,
		columns,
		state: { sorting },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	})

	return (
		<div className='rounded-md border'>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id}>
									{header.isPlaceholder ? null : (
										flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)
									)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.length ?
						table.getRowModel().rows.map((row) => (
							<TableRow key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext(),
										)}
									</TableCell>
								))}
							</TableRow>
						))
					:	<TableRow>
							<TableCell
								colSpan={columns.length}
								className='h-24 text-center'
							>
								Inga innehav att visa.
							</TableCell>
						</TableRow>
					}
				</TableBody>
			</Table>
		</div>
	)
}
