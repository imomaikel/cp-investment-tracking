'use client';
import { EditFieldFnType, HistoryType, InvestmentType } from '@/lib/types';
import { server_updateInvestments } from '@/actions/investments';
import { useEffect, useState, useTransition } from 'react';
import InvestmentsChart from './InvestmentsChart';
import InvestmentsTable from './InvestmentsTable';
import AggregatedTable from './AggregatedTable';
import StackedChart from './StackedChart';
import toast from 'react-hot-toast';

type DataTableProps = {
	investments: InvestmentType[];
};
/**
 * Render the tables
 * @param investments The user's investments
 */
const DataTables = ({ investments: initialInvestments }: DataTableProps) => {
	const [investments, setInvestments] = useState(initialInvestments);
	const [undoData, setUndoData] = useState<HistoryType[]>([]);
	const [redoData, setRedoData] = useState<HistoryType[]>([]);
	const [aggregatedData, setAggregatedData] = useState({
		totalInvestment: 0,
		totalCurrentValue: 0,
		totalProfit: 0,
	});
	const [isSaving, startTransition] = useTransition();

	// Aggregate the user's investments
	const aggregateData = (dataToAggregate: typeof investments) => {
		const data = dataToAggregate.reduce<typeof aggregatedData>(
			(acc, curr) => {
				const currentInvestment = curr.buyPrice * curr.quantity;
				const currentValue = curr.currentPrice * curr.quantity;
				return {
					totalInvestment: acc.totalInvestment + currentInvestment,
					totalCurrentValue: acc.totalCurrentValue + currentValue,
					totalProfit: acc.totalProfit + (currentValue - currentInvestment),
				};
			},
			{ totalInvestment: 0, totalCurrentValue: 0, totalProfit: 0 }
		);
		setAggregatedData(data);
	};

	// Edit the selected field and recalculate the aggregated data
	const editField: EditFieldFnType = (id, field, value) => {
		const updatedInvestments = investments.map((investment) =>
			investment.id === id ? { ...investment, [field]: value } : investment
		);
		setInvestments(updatedInvestments);
		aggregateData(updatedInvestments);
	};

	// Initial aggregate
	useEffect(() => aggregateData(initialInvestments), []);

	// Add a new investment
	const addNewInvestment = (newInvestment: InvestmentType) => {
		const updatedInvestments = [newInvestment, ...investments];
		aggregateData(updatedInvestments);
		setInvestments(updatedInvestments);
	};

	// Restore the history and update the stack
	const restoreHistory = (action: HistoryType, method: 'undo' | 'redo') => {
		// Update the changed value
		const updatedInvestments = investments.map((investment) => {
			if (investment.id === action.id) {
				return {
					...investment,
					[action.field]:
						method === 'undo' ? action.valueBefore : action.valueAfter,
				};
			}
			return investment;
		});

		aggregateData(updatedInvestments);
		setInvestments(updatedInvestments);

		// Update the stack
		if (method === 'undo') {
			setRedoData((prev) => prev.concat({ ...action }));
		} else {
			setUndoData((prev) => prev.concat({ ...action }));
		}
	};

	// Undo function
	const undo = () => {
		const action = undoData[undoData.length - 1];
		if (!action) return;

		restoreHistory(action, 'undo');

		setUndoData((prev) => prev.slice(0, -1));
	};

	// Redo function
	const redo = () => {
		const action = redoData[redoData.length - 1];
		if (!action) return;

		restoreHistory(action, 'redo');

		setRedoData((prev) => prev.slice(0, -1));
	};

	// (Server action) Save changes
	const saveChanges = () => {
		startTransition(() => {
			server_updateInvestments(investments)
				.then((isSuccess) => {
					if (isSuccess) {
						toast.success('Investments saved!');
						setUndoData([]);
						setRedoData([]);
					} else {
						toast.error('Something went wrong!');
					}
				})
				.catch(() => toast.error('Something went wrong!'));
		});
	};

	const canUndo = !!undoData.length;
	const canRedo = !!redoData.length;

	return (
		<div className='flex flex-col gap-6'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 px-2 sm:px-4'>
				<InvestmentsTable
					investments={investments}
					editField={editField}
					addNewInvestment={addNewInvestment}
					canUndo={canUndo}
					canRedo={canRedo}
					redo={redo}
					undo={undo}
					registerEditHistory={setUndoData}
					saveChanges={saveChanges}
					isSaving={isSaving}
				/>
				<div className='flex flex-col gap-4'>
					<AggregatedTable data={aggregatedData} />
					<StackedChart data={aggregatedData} />
				</div>
			</div>
			<div className='px-2 sm:px-4'>
				<InvestmentsChart data={investments} />
			</div>
		</div>
	);
};

export default DataTables;
