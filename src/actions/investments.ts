'use server';
import {
	InvestmentSchema,
	InvestmentsValidator,
} from '@/validators/investment';
import { InvestmentSchemaType, InvestmentsValidatorType } from '@/lib/types';
import { getUserInvestments } from '@/helpers';
import { db, investments } from '@/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/auth';

/**
 * Create a new investment
 * @param data New investment data
 */
export const server_createNewInvestment = async (
	data: InvestmentSchemaType
) => {
	// Check if the user is authenticated
	const session = await auth();
	if (!session?.user.id) return { newInvestment: null };

	// Safe parse user input
	const parsedData = InvestmentSchema.safeParse(data);
	if (!parsedData.success) {
		return { newInvestment: null };
	}

	const { buyPrice, currentPrice, name, quantity } = parsedData.data;

	try {
		// Create a new investment
		const newInvestment = await db
			.insert(investments)
			.values({
				buyPrice,
				currentPrice,
				name,
				quantity,
				userId: session.user.id,
			})
			.returning({
				id: investments.id,
				name: investments.name,
				quantity: investments.quantity,
				buyPrice: investments.buyPrice,
				currentPrice: investments.currentPrice,
				createdAt: investments.createdAt,
				userId: investments.userId,
			});

		return { newInvestment: newInvestment[0] };
	} catch {
		return { newInvestment: null };
	}
};

export const server_updateInvestments = async (
	data: InvestmentsValidatorType
) => {
	// Check if the user is authenticated
	const session = await auth();
	if (!session?.user.id) return false;

	// Safe parse user input
	const parsedData = InvestmentsValidator.safeParse(data);
	if (!parsedData.success) {
		return false;
	}

	const investmentsToUpdateInput = parsedData.data;

	const currentInvestments = await getUserInvestments(session.user.id);

	const investmentsToUpdate = investmentsToUpdateInput.flatMap((investment) => {
		const findInvestment = currentInvestments.find(
			(entry) => entry.id === investment.id
		);
		if (!findInvestment || !findInvestment.id) return [];
		if (
			findInvestment.buyPrice === investment.buyPrice &&
			findInvestment.name === investment.name &&
			findInvestment.currentPrice === investment.currentPrice &&
			findInvestment.quantity === investment.quantity
		)
			return [];
		return investment;
	});

	try {
		await db.transaction(async (tx) => {
			await Promise.all(
				investmentsToUpdate.map(async (investment) => {
					await tx
						.update(investments)
						.set({
							...investment,
						})
						.where(eq(investments.id, investment.id!));
				})
			);
		});
		return true;
	} catch {
		return false;
	}
};
