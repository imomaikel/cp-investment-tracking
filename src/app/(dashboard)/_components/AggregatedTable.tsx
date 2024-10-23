import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils';

type AggregatedTableProps = {
	data: {
		totalInvestment: number;
		totalCurrentValue: number;
		totalProfit: number;
	};
};
/**
 * Render the aggregated table with the user's investments that are updated in real time
 * @param data Aggregated data of the user's investments
 */
const AggregatedTable = ({ data }: AggregatedTableProps) => {
	return (
		<div className='space-y-2'>
			<h2 className='text-2xl font-semibold titleBar'>Statistics</h2>
			<div className='rounded-md border h-fit shadow-xl'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Total Investment</TableHead>
							<TableHead>Total Current Value</TableHead>
							<TableHead>Total Profit</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>{formatCurrency(data.totalInvestment)}</TableCell>
							<TableCell>{formatCurrency(data.totalCurrentValue)}</TableCell>
							<TableCell>{formatCurrency(data.totalProfit)}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default AggregatedTable;