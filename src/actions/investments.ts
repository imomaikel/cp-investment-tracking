'use server';
import { InvestmentSchema } from '@/validators/investment';
import { InvestmentSchemaType } from '@/lib/types';
import { db, investments } from '@/schema';
import { auth } from '@/auth';

/**
 * Create a new investment
 * @param data New investment data
 */
export const createNewInvestment = async (data: InvestmentSchemaType) => {
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
