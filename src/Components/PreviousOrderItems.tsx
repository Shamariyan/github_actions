import Box from '@mui/material/Box';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authActionCreators, State } from '../store';
import Loading from '../utils/Loading';
import PreviousOrderItem from './PreviousOrderItem';

const PreviousOrderItems = () => {
	const dispatch = useDispatch();
	const { getPreviousOrders } = bindActionCreators(
		authActionCreators,
		dispatch
	);
	const loading = useSelector((state: State) => state.products.loading);
	useEffect(() => {
		getPreviousOrders();
	}, []);

	const orders = useSelector((state: State) => state.auth.previousOrders);

	return loading ? (
		<Loading />
	) : (
		<Box
			sx={{
				pr: {
					xs: '0%',
					sm: '0%',
					md: '3%',
					lg: '3%',
					xl: '3%',
				},
				marginBottom: {
					xs: '40%',
					sm: '40%',
					md: '3%',
					lg: '1%',
					xl: '1%',
				},
			}}
		>
			{orders &&
				orders.map((item: any, index: any) => {
					return <PreviousOrderItem key={index} item={item} />;
				})}
		</Box>
	);
};

export default PreviousOrderItems;
