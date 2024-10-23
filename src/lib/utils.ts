import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/**
 * Formats a price to a currency format with dots
 * @param value Price to format
 * @returns Formatted price
 */
export const formatCurrency = (value: number) => {
	const formatter = new Intl.NumberFormat('en-DE');

	return formatter.format(value);
};
