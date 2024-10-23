import {
	InvestmentSchema,
	InvestmentsValidator,
} from '@/validators/investment';
import { InferSelectModel } from 'drizzle-orm';
import { AuthSchema } from '@/validators/auth';
import { investments } from '@/schema';
import { z } from 'zod';

export type InvestmentsValidatorType = z.infer<typeof InvestmentsValidator>;
export type InvestmentSchemaType = z.infer<typeof InvestmentSchema>;
export type AuthSchemaType = z.infer<typeof AuthSchema>;

export type InvestmentType = InferSelectModel<typeof investments>;

export type InvestmentEditableFieldType = Pick<
	InvestmentType,
	'name' | 'buyPrice' | 'currentPrice' | 'quantity'
>;
export type EditFieldFnType = <T extends keyof InvestmentEditableFieldType>(
	id: string,
	field: T,
	value: InvestmentEditableFieldType[T]
) => void;

export type HistoryType = {
	id: string;
	field: keyof InvestmentEditableFieldType;
	valueBefore: InvestmentEditableFieldType[keyof InvestmentEditableFieldType];
	valueAfter: InvestmentEditableFieldType[keyof InvestmentEditableFieldType];
};
