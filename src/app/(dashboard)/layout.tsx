import { startCase } from 'lodash';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: startCase('Dashboard'),
};

// Layout of the Dashboard page
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return children;
};

export default DashboardLayout;
