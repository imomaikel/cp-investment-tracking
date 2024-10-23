import type { DefaultSession, NextAuthConfig } from 'next-auth';

declare module 'next-auth' {
	interface Session {
		user: DefaultSession['user'] & {};
	}
}

export default {
	providers: [],
} satisfies NextAuthConfig;
