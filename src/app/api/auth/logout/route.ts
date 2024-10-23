import { signOut } from '@/auth';

// A route used to log out from the current account
const handler = async () => {
	await signOut();
};

export { handler as GET };
