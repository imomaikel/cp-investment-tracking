import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { InvestmentSchemaType, InvestmentType } from '@/lib/types';
import { server_createNewInvestment } from '@/actions/investments';
import { InvestmentSchema } from '@/validators/investment';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useTransition } from 'react';
import toast from 'react-hot-toast';

type NewInvestmentDialogProps = {
	isOpen: boolean;
	setIsOpen: (newState: boolean) => void;
	addNewInvestment: (newInvestment: InvestmentType) => void;
};
/**
 * Render the dialog to add a new investment
 * @param isOpen Is the dialog open?
 * @param setIsOpen Set the dialog open state
 * @param addNewInvestment Add a new investment function
 */
const NewInvestmentDialog = ({
	isOpen,
	setIsOpen,
	addNewInvestment,
}: NewInvestmentDialogProps) => {
	const [pending, startTransition] = useTransition();
	const form = useForm<InvestmentSchemaType>({
		resolver: zodResolver(InvestmentSchema),
		defaultValues: {
			buyPrice: 1,
			currentPrice: 1,
			name: '',
			quantity: 1,
		},
	});

	// Handle form submission
	const onSubmit = (values: InvestmentSchemaType) => {
		startTransition(() => {
			server_createNewInvestment(values)
				.then(({ newInvestment }) => {
					if (newInvestment) {
						toast.success('Investment added!');
						addNewInvestment(newInvestment);
						setIsOpen(false);
					} else {
						toast.error('Something went wrong!');
					}
				})
				.catch(() => toast.error('Something went wrong!'));
		});
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(state) => {
				if (pending) return;
				setIsOpen(state);
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New Investment</DialogTitle>
					<DialogDescription>
						Fill out the form below to add a new investment.
					</DialogDescription>
				</DialogHeader>
				<div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												placeholder='Stock F'
												{...field}
												disabled={pending}
											/>
										</FormControl>
										<FormDescription>Name of the investment.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='quantity'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Quantity</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={pending}
												onChange={(event) =>
													field.onChange(event.target.valueAsNumber)
												}
												type='number'
											/>
										</FormControl>
										<FormDescription>
											Number of shares/units owned.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='buyPrice'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Buy Price</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={pending}
												onChange={(event) =>
													field.onChange(parseFloat(event.target.value))
												}
												type='number'
											/>
										</FormControl>
										<FormDescription>
											The price at which the investment was purchased.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='currentPrice'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Current Price</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={pending}
												onChange={(event) =>
													field.onChange(parseFloat(event.target.value))
												}
												type='number'
											/>
										</FormControl>
										<FormDescription>
											The current market price of the investment.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type='submit' className='w-full !mt-6' disabled={pending}>
								Submit
							</Button>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default NewInvestmentDialog;
