'use client';
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from '@tanstack/react-table';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { EditFieldFnType, InvestmentType } from '@/lib/types';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LuArrowUpDown } from 'react-icons/lu';
import EditableField from './EditableField';

type InvestmentsTableProps = {
	investments: InvestmentType[];
	editField: EditFieldFnType;
};
/**
 * Render an editable table the with user's investments
 * @param investments All of the user's investments
 * @param editField The function to edit the selected field
 */
const InvestmentsTable = ({
	investments,
	editField,
}: InvestmentsTableProps) => {
	const [activeFieldId, setActiveFieldId] = useState<null | string>(null);
	const [sorting, setSorting] = useState<SortingState>([]);

	// Define the table columns
	const tableColumns = useMemo(() => {
		const columns: ColumnDef<InvestmentType>[] = [
			{
				accessorKey: 'name',
				header: ({ column }) => {
					return (
						<Button
							variant='ghost'
							className='w-full'
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === 'asc')
							}
						>
							Name
							<LuArrowUpDown className='ml-2 h-4 w-4' />
						</Button>
					);
				},
				cell: ({ cell }) => {
					const value = cell.row.original.name;
					const id = cell.row.original.id;
					const cellId = cell.id;

					return (
						<EditableField
							activeFieldId={activeFieldId}
							editField={editField}
							id={id}
							setActiveFieldId={setActiveFieldId}
							value={value}
							cellId={cellId}
							fieldType='name'
						/>
					);
				},
			},
			{
				accessorKey: 'quantity',
				header: ({ column }) => {
					return (
						<Button
							variant='ghost'
							className='w-full'
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === 'asc')
							}
						>
							Quantity
							<LuArrowUpDown className='ml-2 h-4 w-4' />
						</Button>
					);
				},
				cell: ({ cell }) => {
					const value = cell.row.original.quantity;
					const id = cell.row.original.id;
					const cellId = cell.id;

					return (
						<EditableField
							activeFieldId={activeFieldId}
							editField={editField}
							id={id}
							setActiveFieldId={setActiveFieldId}
							value={value}
							cellId={cellId}
							fieldType='quantity'
						/>
					);
				},
			},
			{
				accessorKey: 'buyPrice',
				header: ({ column }) => {
					return (
						<Button
							variant='ghost'
							className='w-full'
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === 'asc')
							}
						>
							Buy Price
							<LuArrowUpDown className='ml-2 h-4 w-4' />
						</Button>
					);
				},
				cell: ({ cell }) => {
					const value = cell.row.original.buyPrice;
					const id = cell.row.original.id;
					const cellId = cell.id;

					return (
						<EditableField
							activeFieldId={activeFieldId}
							editField={editField}
							id={id}
							setActiveFieldId={setActiveFieldId}
							value={value}
							cellId={cellId}
							fieldType='buyPrice'
						/>
					);
				},
			},
			{
				accessorKey: 'currentPrice',
				header: ({ column }) => {
					return (
						<Button
							variant='ghost'
							className='w-full'
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === 'asc')
							}
						>
							Current Price
							<LuArrowUpDown className='ml-2 h-4 w-4' />
						</Button>
					);
				},
				cell: ({ cell }) => {
					const value = cell.row.original.currentPrice;
					const id = cell.row.original.id;
					const cellId = cell.id;

					return (
						<EditableField
							activeFieldId={activeFieldId}
							editField={editField}
							id={id}
							setActiveFieldId={setActiveFieldId}
							value={value}
							cellId={cellId}
							fieldType='currentPrice'
						/>
					);
				},
			},
		];
		return columns;
	}, [activeFieldId, editField, setActiveFieldId]);

	// React table configuration
	const table = useReactTable({
		data: investments,
		columns: tableColumns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
	});

	// Close the active field when the user presses the escape key
	useEffect(() => {
		const onKeyPress = (event: KeyboardEvent) => {
			if (event.key === 'Escape' || event.key === 'Enter') {
				setActiveFieldId(null);
			}
		};

		window.addEventListener('keydown', onKeyPress);

		// Remove the event listener when the component unmounts
		return () => window.removeEventListener('keydown', onKeyPress);
	}, []);

	return (
		<div className='space-y-2'>
			<h2 className='text-2xl font-semibold titleBar'>Your Investments</h2>
			<div className='rounded-md border h-fit shadow-xl'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header, idx) => {
									return (
										<TableHead
											key={header.id}
											style={{
												width: idx === 0 ? '40%' : '20%',
											}}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={tableColumns.length}
									className='h-24 text-center'
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default InvestmentsTable;
