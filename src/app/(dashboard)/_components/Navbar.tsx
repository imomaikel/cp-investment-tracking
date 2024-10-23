'use server';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import MobileMenu from './MobileMenu';
import Logo from '@/components/Logo';
import { auth } from '@/auth';
import Link from 'next/link';

/**
 * Navbar with logo and logout button
 */
const Navbar = async () => {
	const session = await auth();
	const user = session?.user;
	if (!user) return redirect('/sign-in');

	// Create username based on the email
	const email = user.email || '';
	const username = email.substring(0, email.indexOf('@'));

	return (
		<div className='w-full'>
			<div className='max-w-screen-2xl mx-auto flex w-full justify-between items-center border-b p-1'>
				<div className='flex gap-2 items-center'>
					<Logo sizePx={64} />
					<h1 className='font-bold antialiased text-2xl md:text-3xl'>
						Investment Tracker
					</h1>
				</div>
				<Button asChild variant='outline' className='hidden md:flex'>
					<Link
						href='/api/auth/logout'
						className='flex flex-col gap-0'
						prefetch={false}
					>
						<span>
							Logged in as <span className='font-semibold'>{username}</span>
						</span>
						<span className='text-muted-foreground text-xs'>
							Click to log out
						</span>
					</Link>
				</Button>
				<div className='md:hidden'>
					<MobileMenu />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
