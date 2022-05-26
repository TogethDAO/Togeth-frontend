import { FC } from 'react';
import Footer from './Footer';
import Header from './Header';

const Wrapper: FC = ({ children }) => {
	return (
		<section className="flex flex-col min-h-screen">
			<Header></Header>
			<main className="flex-1">{children}</main>
			<Footer></Footer>
		</section>
	);
};
export default Wrapper;
