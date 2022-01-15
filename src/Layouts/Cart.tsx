import CartItems from '../Components/CartItems';
import CartPrice from '../Components/CartPrice';
import Grid from '@mui/material/Grid';

const CartLayout = (): any => {
	return (
		<Grid container sx={{ width: '100%' }}>
			<Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
				<CartItems />
			</Grid>
			<Grid item lg={1} xl={1}></Grid>
			<Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
				<CartPrice />
			</Grid>
		</Grid>
	);
};

export default CartLayout;
