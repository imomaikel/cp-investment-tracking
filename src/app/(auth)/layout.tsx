import { Separator } from '@/components/ui/separator';
import Logo from '@/components/Logo';

// Layout of the Sign in and Sign up pages
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='min-h-screen flex items-start mt-16 md:mt-0 md:items-center justify-center px-4'>
			<div className='p-2 md:p-6 border rounded shadow-md w-full max-w-sm'>
				<div className='flex items-center gap-2'>
					<Logo sizePx={100} />
					<div className='flex flex-col'>
						<h1 className='text-xl font-bold'>Investment Tracker</h1>
						<p className='text-muted-foreground text-sm'>
							Authorization required
						</p>
					</div>
				</div>

				<Separator className='my-4' />

				{children}
			</div>
		</div>
	);
};

export default AuthLayout;
