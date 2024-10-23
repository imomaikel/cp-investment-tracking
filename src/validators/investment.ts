import { z } from 'zod';

// New investment form validator
export const InvestmentSchema = z.object({
	name: z.string().min(1),
	quantity: z.number().min(1),
	buyPrice: z.number().min(0),
	currentPrice: z.number().min(0),
});

// Update investments validator
export const InvestmentsValidator = z.array(
	z.object({
		name: z.string().min(1),
		quantity: z.number().min(1),
		buyPrice: z.number().min(0),
		currentPrice: z.number().min(0),
		id: z.string().optional(),
	})
);
