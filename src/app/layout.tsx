import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: {
		default: 'Investment Tracker',
		template: '%s - Investment Tracker',
	},
	description:
		'Real-time tracking of investments with automatic calculations, providing total values and insights into current gains or losses.',
};

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='en' className={poppins.className}>
			<body>
				{children}
				<Toaster position='top-left' />
			</body>
		</html>
	);
};

export default RootLayout;
