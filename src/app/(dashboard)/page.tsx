import Footer from './_components/Footer';
import Navbar from './_components/Navbar';

const DashboardPage = () => {
	return (
		<div className='min-h-screen flex flex-col'>
			<nav>
				<Navbar />
			</nav>

			<div className='max-w-screen-2xl mx-auto flex flex-1 flex-col w-full'>
				<section className='flex flex-col flex-1'></section>

				<footer>
					<Footer />
				</footer>
			</div>
		</div>
	);
};

export default DashboardPage;
