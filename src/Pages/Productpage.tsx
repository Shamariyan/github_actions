import Product from './../Layouts/Product';
import Box from '@mui/material/Box';
import ScrollToTop from '../utils/ScrollToTop';
import AlertComponent from '../Components/AlertComponent';
import Loading from '../utils/Loading';
import { useSelector } from 'react-redux';
import { State } from '../store';

const Productpage = () => {
	const loading = useSelector((state: State) => state.products.loading);

	return loading ? (
		<Loading />
	) : (
		<>
			<ScrollToTop />
			<Box
				sx={{
					mx: '5%',
					pt: { xs: '20%', sm: '12%', md: '8%', lg: '6%', xl: '6%' },
				}}
			>
				<AlertComponent />
				<Product />
			</Box>
		</>
	);
};

export default Productpage;
