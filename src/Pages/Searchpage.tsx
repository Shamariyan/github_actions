import Search from '../Layouts/Search';
import Box from '@mui/material/Box';
import ScrollToTop from '../utils/ScrollToTop';
import AlertComponent from '../Components/AlertComponent';
import { useSelector } from 'react-redux';
import { State } from '../store';
import Loading from '../utils/Loading';

const Searchpage = () => {
	const loading = useSelector((state: State) => state.products.loading);

	return loading ? (
		<Loading />
	) : (
		<>
			<ScrollToTop />
			<Box sx={{ mx: '5%' }}>
				<AlertComponent />
				<Search />
			</Box>
		</>
	);
};

export default Searchpage;
