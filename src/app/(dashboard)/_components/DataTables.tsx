'use client';
import { EditFieldFnType, InvestmentType } from '@/lib/types';
import InvestmentsTable from './InvestmentsTable';
import AggregatedTable from './AggregatedTable';
import { useEffect, useState } from 'react';

type DataTableProps = {
	investments: InvestmentType[];
};
/**
 * Render the tables
 * @param investments The user's investments
 */
const DataTables = ({ investments: initialInvestments }: DataTableProps) => {
	const [investments, setInvestments] = useState(initialInvestments);
	const [aggregatedData, setAggregatedData] = useState({
		totalInvestment: 0,
		totalCurrentValue: 0,
		totalProfit: 0,
	});

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

	return (
		<>
			<InvestmentsTable investments={investments} editField={editField} />
			<AggregatedTable data={aggregatedData} />
		</>
	);
};

export default DataTables;
