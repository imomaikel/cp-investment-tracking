import { z } from 'zod';

// Sign in and sign up form validator
export const AuthSchema = z.object({
	email: z.string().email(),
	password: z.string().min(4),
});
export type AuthSchemaType = z.infer<typeof AuthSchema>;
