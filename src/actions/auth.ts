'use server';
import { DEFAULT_INVESTMENTS } from '@/app/constans/investments';
import { AuthSchema, AuthSchemaType } from '@/validators/auth';
import { db, investments, users } from '@/schema';
import { eq } from 'drizzle-orm';
import { signIn } from '@/auth';
import bcrypt from 'bcryptjs';

/**
 * Create a new user account. Automatically redirects when the account creation is successful
 * @param data.email The e-mail of the new user
 * @param data.password The password of the new user
 */
export const server_signUp = async (data: AuthSchemaType) => {
	// Safe parse user input
	const parsedData = AuthSchema.safeParse(data);
	if (!parsedData.success) {
		return null;
	}

	const { email, password } = parsedData.data;

	// Check if user already exists
	const findUser = await db.select().from(users).where(eq(users.email, email));
	const user = findUser[0];

	// Hash password
	const hashedPassword = await bcrypt.hash(password, 12);

	// Create a new user and put the default investments
	if (!user) {
		await db.transaction(async (tx) => {
			const newUser = await tx
				.insert(users)
				.values({
					email,
					password: hashedPassword,
					name: email.substring(0, email.indexOf('@')),
				})
				.returning({
					userId: users.id,
				});

			// Create the default investments
			const newUserDefaultInvestments = DEFAULT_INVESTMENTS.map(
				(investment) => ({
					...investment,
					userId: newUser[0].userId,
				})
			);

			await tx.insert(investments).values(newUserDefaultInvestments);
		});
	}

	// Automatically sign in the user
	await signIn('credentials', {
		email,
		password,
		redirect: true,
		redirectTo: '/',
	});
};

/**
 * It checks if the credentials are valid. This function runs every time an unauthorized user tries to log in.
 * @param data.email The e-mail to verify
 * @param data.password The password to verify
 */
export const server_validateCredentials = async (data: unknown) => {
	// Safe parse user input
	const parsedData = AuthSchema.safeParse(data);
	if (!parsedData.success) {
		return null;
	}

	const { email, password } = parsedData.data;

	// Check if the user exists
	const findUser = await db.select().from(users).where(eq(users.email, email));
	const user = findUser[0];

	if (!user) return null;

	// Check if the password is valid
	const isPasswordValid = bcrypt.compare(password, user.password || '');
	if (!isPasswordValid) {
		return null;
	}

	return user;
};

/**
 * Try to sign in the user with credentials
 * @param email The e-mail of the user
 * @param password The password of the user
 * @returns Redirect URL if the credentials are valid
 */
export const server_signIn = async (
	email: string,
	password: string
): Promise<string | false> => {
	try {
		const redirectUrl = await signIn('credentials', {
			email,
			password,
			redirect: false,
		});

		return redirectUrl;
	} catch {
		return false;
	}
};
