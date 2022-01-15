import OrderSummary from '../Components/OrderSummary';
import { makeStyles } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import totalPriceCalculator from '../utils/totalPriceCalculator';
import { useSelector } from 'react-redux';
import { State } from '../store';

const useStyles = makeStyles((theme) => {
	return {
		mainButtons: {
			[theme.breakpoints.up('md')]: {
				display: 'flex',
				justifyContent: 'space-between',
			},
			[theme.breakpoints.only('md')]: {
				display: 'flex',
				justifyContent: 'space-between',
			},
			[theme.breakpoints.down('md')]: {
				display: 'none',
			},
		},
		paper: {
			paddingLeft: '5%',
			paddingRight: '5%',
			[theme.breakpoints.down('md')]: {
				display: 'none',
			},
			[theme.breakpoints.up('md')]: {
				display: 'block',
			},
			[theme.breakpoints.only('md')]: {
				display: 'none',
			},
		},
		mainGrid: {
			[theme.breakpoints.up('md')]: {
				display: 'block',
				marginTop: '3%',
				marginBottom: '5%',
			},

			[theme.breakpoints.only('md')]: {
				marginTop: '3%',
				marginBottom: '5%',
			},
			[theme.breakpoints.down('sm')]: {
				marginTop: '5%',
				marginBottom: '5%',
			},
		},
		heading: {
			fontWeight: 'bold',
			fontSize: 20,
			paddingBottom: '3%',
			paddingTop: '3%',
			paddingLeft: '3%',
		},
		text: {
			display: 'flex',
			justifyContent: 'space-between',
			padding: '3%',
			color: '#575757',
		},
		bottomnav: {
			position: 'fixed',
			bottom: 0,
			left: 0,
			right: 0,
			backgroundColor: '#f7f7f7',
			[theme.breakpoints.down('md')]: {
				display: 'block',
			},
			[theme.breakpoints.up('md')]: {
				display: 'none',
			},
			[theme.breakpoints.only('md')]: {
				display: 'block',
			},
		},

		btnContainer: {
			padding: '2.5%',
			textAlign: 'center',
		},
	};
});

const CheckoutSummary = () => {
	const classes = useStyles();
	const cart = useSelector((state: State) => state.auth.user.cartItems);
	const products = useSelector((state: State) => state.products.products);
	const total = totalPriceCalculator(cart, products);

	return (
		<>
			<Grid className={classes.mainGrid} container columns={6}>
				<Grid
					sx={{ marginLeft: '2%', marginRight: '2%' }}
					item
					xs={6}
					sm={6}
					md={6}
					lg={6}
					xl={6}
				>
					<Paper elevation={3} className={classes.paper}>
						<Box className={classes.heading}>Order Summary</Box>
						<Box className={classes.text}>
							<Typography>Subtotal </Typography>
							<Typography fontWeight={600} color={'black'}>
								₹ {total}
							</Typography>
						</Box>
						<Box className={classes.text}>
							<Typography>GST(included)</Typography>
							<Typography color={'black'}>18%</Typography>
						</Box>
						<Box
							className={classes.text}
							sx={{
								marginBottom: {
									xs: '15%',
									sm: '15%',
									md: '10%',
									lg: '0',
									xl: '0',
								},
							}}
						>
							<Typography>Delivery</Typography>
							<Typography color={'black'}> ₹ 0.00 </Typography>
						</Box>
						<Box className={classes.text}>
							<Typography fontWeight={600} color={'black'}>
								Estimated Total{' '}
							</Typography>
							<Typography fontWeight={600} color={'black'}>
								₹ {total}
							</Typography>
						</Box>
					</Paper>
				</Grid>
				<Grid
					sx={{ marginLeft: '2%', marginRight: '2%' }}
					item
					xs={6}
					sm={6}
					md={6}
					lg={6}
					xl={6}
				>
					<OrderSummary />
				</Grid>
			</Grid>
		</>
	);
};

export default CheckoutSummary;
