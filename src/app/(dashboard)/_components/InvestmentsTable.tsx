'use client';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from '@tanstack/react-table';
import {
	EditFieldFnType,
	HistoryType,
	InvestmentEditableFieldType,
	InvestmentType,
} from '@/lib/types';
import {
	Dispatch,
	SetStateAction,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { FaExclamation, FaPlus, FaRedo, FaUndo } from 'react-icons/fa';
import NewInvestmentDialog from './NewInvestmentDialog';
import { Button } from '@/components/ui/button';
import { LuArrowUpDown } from 'react-icons/lu';
import EditableField from './EditableField';
import { motion } from 'framer-motion';

type InvestmentsTableProps = {
	investments: InvestmentType[];
	isSaving: boolean;
	canUndo: boolean;
	canRedo: boolean;
	registerEditHistory: Dispatch<SetStateAction<HistoryType[]>>;
	addNewInvestment: (newInvestment: InvestmentType) => void;
	editField: EditFieldFnType;
	saveChanges: () => void;
	undo: () => void;
	redo: () => void;
};
/**
 * Render an editable table the with user's investments
 * @param investments All of the user's investments
 * @param isSaving Is saving
 * @param canUndo Can undo
 * @param canRedo Can redo
 * @param registerEditHistory The function to register the edit history
 * @param addNewInvestment The function to add a new investment
 * @param editField The function to edit the selected field
 * @param saveChanges The function to save the changes
 * @param undo The undo function
 * @param redo The redo function
 *
 */
const InvestmentsTable = ({
	investments,
	isSaving,
	canUndo,
	canRedo,
	editField: originalEditField,
	registerEditHistory,
	addNewInvestment,
	saveChanges,
	undo,
	redo,
}: InvestmentsTableProps) => {
	const [activeFieldId, setActiveFieldId] = useState<null | string>(null);
	const [newDataDialogOpen, setNewDataDialogOpen] = useState(false);
	const [sorting, setSorting] = useState<SortingState>([]);

	// Store changes before the edit
	const originalCellData = useRef<
		(InvestmentType & { field: keyof InvestmentEditableFieldType }) | null
	>(null);

	// Before editing, store the original value
	const editField: EditFieldFnType = (id, field, value) => {
		if (!originalCellData.current) {
			const findInvestment = investments.find((entry) => entry.id === id);
			if (findInvestment) {
				originalCellData.current = { ...findInvestment, field };
			}
		}
		originalEditField(id, field, value);
	};

	// Cancel the edit and add the changes to the history
	const onCancelEdit = () => {
		if (originalCellData.current?.field) {
			const updatedCell = investments.find(
				(entry) => entry.id === originalCellData.current?.id
			);
			if (updatedCell) {
				const fieldToEdit = originalCellData.current.field;
				const originalValue = originalCellData.current[fieldToEdit];
				registerEditHistory((prev) =>
					prev.concat({
						field: fieldToEdit,
						id: updatedCell.id,
						valueAfter: updatedCell[fieldToEdit],
						valueBefore: originalValue,
					})
				);
			}
		}
		originalCellData.current = null;
		setActiveFieldId(null);
	};

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
							onCancel={onCancelEdit}
							activeFieldId={activeFieldId}
							editField={editField}
							id={id}
							isSaving={isSaving}
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
							onCancel={onCancelEdit}
							activeFieldId={activeFieldId}
							editField={editField}
							id={id}
							setActiveFieldId={setActiveFieldId}
							value={value}
							cellId={cellId}
							fieldType='quantity'
							isSaving={isSaving}
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
							onCancel={onCancelEdit}
							activeFieldId={activeFieldId}
							editField={editField}
							id={id}
							setActiveFieldId={setActiveFieldId}
							value={value}
							cellId={cellId}
							fieldType='buyPrice'
							isSaving={isSaving}
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
							onCancel={onCancelEdit}
							activeFieldId={activeFieldId}
							editField={editField}
							id={id}
							setActiveFieldId={setActiveFieldId}
							value={value}
							cellId={cellId}
							fieldType='currentPrice'
							isSaving={isSaving}
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
			<div className='flex justify-between items-center'>
				<h2 className='text-xl md:text-2xl font-semibold titleBar'>
					Your Investments
				</h2>
				<Button
					className='shadow-lg'
					onClick={() => setNewDataDialogOpen(true)}
					disabled={isSaving}
				>
					<FaPlus />
					<span>Add New</span>
				</Button>
			</div>
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
									No investments.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className='flex flex-col gap-4 md:flex-row md:justify-between'>
				<div className='titleBar'>
					<span className='font-bold text-lg'>Hint!</span>
					<p className='text-muted-foreground text-sm'>
						You can edit the fields by clicking on the table cell.
					</p>
				</div>
				<div className='gap-2 flex items-center mt-auto'>
					<Button
						variant='outline'
						className='shadow-md'
						disabled={!canUndo || isSaving}
						onClick={undo}
					>
						Undo
						<FaUndo />
					</Button>
					<Button
						variant='outline'
						className='shadow-md'
						disabled={!canRedo || isSaving}
						onClick={redo}
					>
						<FaRedo />
						Redo
					</Button>
				</div>
			</div>
			{canUndo && (
				<motion.div
					key={`changes-${canUndo}`}
					transition={{ type: 'spring' }}
					animate={{ opacity: [0, 1], y: [10, 0] }}
					className='flex items-center gap-6 !my-6'
				>
					<p className='shrink-0 flex gap-2 items-center font-bold text-destructive'>
						<FaExclamation className='size-8 animate-bounce' />
						<span>You have unsaved changes.</span>
					</p>
					<Button
						className='w-full shadow-md'
						onClick={saveChanges}
						disabled={isSaving}
					>
						Save
					</Button>
				</motion.div>
			)}
			<NewInvestmentDialog
				isOpen={newDataDialogOpen}
				setIsOpen={setNewDataDialogOpen}
				addNewInvestment={addNewInvestment}
			/>
		</div>
	);
};

export default InvestmentsTable;
