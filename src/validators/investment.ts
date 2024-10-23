import { z } from 'zod';

// New investment form validator
export const InvestmentSchema = z.object({
	name: z.string().min(1),
	quantity: z.number().min(1),
	buyPrice: z.number().min(0),
	currentPrice: z.number().min(0),
});
