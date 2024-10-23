import authConfig from './auth.config';
import NextAuth from 'next-auth';

const { auth } = NextAuth(authConfig);

// Require the user to be logged in to use the application
export default auth((req) => {
	const { nextUrl } = req;

	// Check if the user is authenticated
	const isAuthenticated = !!req.auth;

	const isAuthPage = ['/sign-in', '/sign-up'].some((entry) =>
		nextUrl.pathname.includes(entry)
	);

	if (!isAuthenticated) {
		// Redirect if the user is not authenticated
		if (!isAuthPage) {
			return Response.redirect(new URL('/sign-in', nextUrl));
		}
	} else if (isAuthPage) {
		return Response.redirect(new URL('/', nextUrl));
	}
});

export const config = {
	matcher: [
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		'/(api|trpc)(.*)',
	],
};
