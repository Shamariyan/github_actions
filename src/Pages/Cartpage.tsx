import CartLayout from './../Layouts/Cart';
import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import ScrollToTop from '../utils/ScrollToTop';
import { CartBreadcrumb } from '../utils/Breadcrumb';
import AlertComponent from '../Components/AlertComponent';
import { useSelector } from 'react-redux';
import { State } from '../store';
import Loading from '../utils/Loading';

const useStyles = makeStyles((theme) => {
	return {
		heading: {
			fontWeight: 'bold',
			fontSize: 24,
			marginTop: '1.5%',
			marginBottom: '2.5%',
		},
		crumb: {
			[theme.breakpoints.down('sm')]: {
				paddingTop: '20%',
				paddingLeft: '2%',
			},
			[theme.breakpoints.only('md')]: {
				paddingTop: '15%',
			},
			[theme.breakpoints.up('md')]: {
				paddingTop: '9%',
			},
			[theme.breakpoints.up('lg')]: {
				paddingTop: '9%',
			},
		},
	};
});

const Cart = () => {
	const classes = useStyles();
	const loading = useSelector((state: State) => state.products.loading);
	return loading ? (
		<Loading />
	) : (
		<Box
			sx={{
				mx: {
					xs: 0,
					sm: 0,
					md: '2%',
					lg: '5%',
					xl: '5%',
				},
			}}
		>
			<ScrollToTop />
			<AlertComponent />
			<Box className={classes.crumb}>
				<CartBreadcrumb />
			</Box>
			<Box className={classes.heading}>Your shopping cart</Box>
			<CartLayout />
		</Box>
	);
};

export default Cart;
