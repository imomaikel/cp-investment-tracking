// Do not mark as use-server
import { db, investments } from '@/schema';
import { desc, eq } from 'drizzle-orm';

/**
 * Get all user's investments
 * @param userId The id of the user
 * @returns User's investments
 */
export const getUserInvestments = async (userId: string) => {
	const userInvestments = await db
		.select()
		.from(investments)
		.where(eq(investments.userId, userId))
		.orderBy(desc(investments.createdAt));

	return userInvestments;
};
