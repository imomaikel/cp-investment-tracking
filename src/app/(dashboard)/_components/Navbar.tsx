import { Button } from '@/components/ui/button';
import MobileMenu from './MobileMenu';
import Logo from '@/components/Logo';
import Link from 'next/link';

type NavbarProps = {
	username: string;
};
/**
 * Navbar with logo and logout button
 * @param username The user's name based on the e-mail
 */
const Navbar = ({ username }: NavbarProps) => {
	return (
		<div className='w-full'>
			<div className='max-w-screen-2xl mx-auto flex w-full justify-between items-center border-b p-1'>
				<div className='flex gap-2 items-center'>
					<Logo sizePx={64} />
					<h1 className='font-bold antialiased text-2xl md:text-3xl'>
						Investment Tracker
					</h1>
				</div>
				<Button asChild variant='outline' className='hidden md:flex gap-0'>
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
