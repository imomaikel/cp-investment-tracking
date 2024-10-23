'use client';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { InvestmentType } from '@/lib/types';

// Define chart config
const chartConfig = {
	currentValue: {
		label: 'Current Value',
		color: 'hsl(var(--chart-3))',
	},
	totalInvestment: {
		label: 'Total Investment',
		color: 'hsl(var(--chart-1))',
	},
	profit: {
		label: 'Profit',
		color: 'hsl(var(--chart-2))',
	},
} satisfies ChartConfig;

type InvestmentsChartProps = {
	data: InvestmentType[];
};
/**
 * Render the chart with with the user's investments that are updated in real time
 *  @param data All of the user's investments
 */
const InvestmentsChart = ({ data }: InvestmentsChartProps) => {
	const chartData = data.map((entry) => {
		const totalInvestment = entry.buyPrice * entry.quantity;
		const currentValue = entry.currentPrice * entry.quantity;
		const profit = currentValue - totalInvestment;

		return {
			name: entry.name,
			totalInvestment,
			currentValue,
			profit,
		};
	});

	return (
		<div className='rounded-md border shadow-xl bg-background'>
			<div className='p-4 text-center'>
				<h3 className='font-semibold text-xl'>Investments Chart</h3>
				<p className='text-sm text-muted-foreground'>
					Track every one of your investments and see how worth they are
				</p>
			</div>
			<ChartContainer config={chartConfig} className='w-full h-[300px]'>
				<BarChart accessibilityLayer data={chartData}>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey='name'
						tickLine={false}
						tickMargin={10}
						axisLine={false}
					/>
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Bar
						dataKey='currentValue'
						stackId='a'
						fill='var(--color-currentValue)'
						radius={[0, 0, 4, 4]}
					/>
					<Bar
						dataKey='totalInvestment'
						stackId='a'
						fill='var(--color-totalInvestment)'
						radius={[4, 4, 0, 0]}
					/>
					<Bar
						dataKey='profit'
						stackId='a'
						fill='var(--color-profit)'
						radius={[4, 4, 0, 0]}
					/>
				</BarChart>
			</ChartContainer>
		</div>
	);
};

export default InvestmentsChart;
