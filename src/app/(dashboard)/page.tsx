'use server';
import { getUserInvestments } from '@/actions/investments';
import DataTables from './_components/DataTables';
import { redirect } from 'next/navigation';
import Footer from './_components/Footer';
import Navbar from './_components/Navbar';
import { auth } from '@/auth';

const DashboardPage = async () => {
	const session = await auth();
	const user = session?.user;
	if (!user?.id) return redirect('/sign-in');

	// Create username based on the email
	const email = user.email || '';
	const username = email.substring(0, email.indexOf('@'));

	// Get user's investments
	const userInvestments = await getUserInvestments(user.id);

	return (
		<div className='min-h-screen flex flex-col'>
			<nav>
				<Navbar username={username} />
			</nav>

			<div className='max-w-screen-2xl mx-auto flex flex-1 flex-col w-full'>
				<section className='flex flex-col flex-1 pt-4 pb-24 sm:pb-16 md:pb-10 lg:pb-8'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<DataTables investments={userInvestments} />
					</div>
				</section>

				<footer className='fixed bottom-0 bg-background max-w-screen-2xl w-full'>
					<Footer />
				</footer>
			</div>
		</div>
	);
};

export default DashboardPage;
