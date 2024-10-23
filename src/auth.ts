import CredentialsProvider from 'next-auth/providers/credentials';
import { server_validateCredentials } from './actions/auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth from 'next-auth';
import { db } from './schema';

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: DrizzleAdapter(db),
	pages: {
		signIn: '/sign-in',
	},
	session: { strategy: 'jwt' },
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				const user = await server_validateCredentials(credentials);
				return user;
			},
		}),
	],
});
