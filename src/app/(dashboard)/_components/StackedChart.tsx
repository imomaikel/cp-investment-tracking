'use client';
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
} from '@/components/ui/chart';
import { FaHeartPulse } from 'react-icons/fa6';
import { Pie, PieChart } from 'recharts';
import { useMemo } from 'react';

// Define chart config
const chartConfig = {
	total: {
		label: 'Total',
	},
	CurrentValue: {
		label: 'Current Value',
		color: 'hsl(var(--chart-3))',
	},
	Investment: {
		label: 'Investment',
		color: 'hsl(var(--chart-1))',
	},
	Profit: {
		label: 'Profit',
		color: 'hsl(var(--chart-2))',
	},
} satisfies ChartConfig;

type AggregatedTableProps = {
	data: {
		totalInvestment: number;
		totalCurrentValue: number;
		totalProfit: number;
	};
};
/**
 * Render the chart with with the user's aggregated investments that are updated in real time
 * @param data Aggregated data of the user's investments
 */
const StackedChart = ({ data }: AggregatedTableProps) => {
	const { totalCurrentValue, totalInvestment, totalProfit } = data;

	// Create chart data
	const chartData = useMemo(() => {
		const data = [
			{
				name: 'CurrentValue',
				total: totalCurrentValue,
				fill: 'var(--color-CurrentValue)',
			},
			{
				name: 'Investment',
				total: totalInvestment,
				fill: 'var(--color-Investment)',
			},
		];
		if (totalProfit > 0) {
			data.push({
				name: 'Profit',
				total: totalProfit,
				fill: 'var(--color-Profit)',
			});
		}

		return data;
	}, [totalCurrentValue, totalInvestment, totalProfit]);

	return (
		<div className='rounded-md border h-fit shadow-xl bg-background flex justify-between items-center'>
			<div className='px-4 text-center'>
				<h3 className='font-semibold text-xl'>Statistics Chart</h3>
				<p className='text-sm text-muted-foreground'>
					Compare your total investment, current value, and profit
				</p>
				<p className='mt-12 flex justify-center gap-2 items-center w-full'>
					<FaHeartPulse className='size-6 text-red-600 animate-pulse' />
					<span className='text-sm text-muted-foreground'>
						Real-time updates
					</span>
				</p>
			</div>
			<div className='flex-1 pb-0'>
				<ChartContainer
					config={chartConfig}
					className='mx-auto aspect-square max-h-[300px]'
				>
					<PieChart>
						<Pie data={chartData} dataKey='total' />
						<ChartLegend
							content={<ChartLegendContent nameKey='name' />}
							className='-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center'
						/>
					</PieChart>
				</ChartContainer>
			</div>
		</div>
	);
};

export default StackedChart;
