import CartItem from './CartItem';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../store';

const CartItems = () => {
	const dispatch = useDispatch();
	const products = useSelector((state: State) => state.products.products);
	const arr = useSelector((state: State) => state.auth.user.cartItems);

	return (
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
			{arr &&
				arr.map((item: any, index: any) => {
					return <CartItem key={index} item={item} />;
				})}
		</Box>
	);
};

export default CartItems;
