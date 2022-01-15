import { makeStyles } from '@material-ui/core';
import { Button, Link as Liink, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, useHistory } from 'react-router-dom';
import { alertActionCreators, authActionCreators, State } from '../store';
import AlertComponent from './AlertComponent';
import orderCreator from '../utils/orderCreator';
import cartToProduct from '../utils/cartToProduct';
import totalPriceCalculator from '../utils/totalPriceCalculator';
import { OrderModal } from './OrderModal';

const useStyles = makeStyles((theme) => {
	return {
		container: {
			paddingTop: '5%',
			[theme.breakpoints.down('md')]: {
				marginBottom: '10%',
			},
		},
		paymentContainer: {
			paddingTop: '1%',
		},
		heading: {
			fontWeight: 'bold',
			fontSize: 24,
			marginTop: '2.5%',
			marginBottom: '2%',
			[theme.breakpoints.down('md')]: {
				paddingLeft: '2%',
			},
			textAlign: 'left',
		},
		subHeading: {
			textAlign: 'left',
			marginBottom: '4%',
			[theme.breakpoints.down('md')]: {
				paddingLeft: '2%',
			},
			color: '#575757',
		},
		text: {
			display: 'flex',
			justifyContent: 'space-between',
			paddingRight: '5%',
			paddingLeft: '5%',
			paddingTop: '2%',
			color: '#575757',
		},
		bottomnav: {
			position: 'fixed',
			bottom: 0,
			left: 0,
			right: 0,
			paddingTop: '2%',
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
		mainButtons: {
			width: '100%',
			paddingTop: '10%',

			[theme.breakpoints.down('md')]: {
				display: 'none',
			},
			[theme.breakpoints.up('md')]: {
				display: 'block',
			},
			[theme.breakpoints.up('md')]: {
				display: 'flex',
				justifyContent: 'left',
			},
			[theme.breakpoints.only('md')]: {
				display: 'flex',
				justifyContent: 'left',
			},
		},
		paymentSelectionBox: {
			width: '100%',
			border: 'solid',
			borderWidth: '1px',
			paddingTop: '1%',
			paddingBottom: '1%',
			paddingLeft: '2%',
			marginTop: '2%',
			borderColor: 'lightGrey',
		},
		address: {
			width: '100%',
			borderBottom: 'solid',
			borderBottomWidth: '1px',
			padding: '2%',
			borderBottomColor: 'lightGrey',
			display: 'flex',
			justifyContent: 'space-between',
		},
	};
});

interface orderObj {
	userId: string;
	orderPrice: number;
	paymentDone: boolean;
	paymentMethod: string;
	deliveryAddress: any;
	orderItems: Array<any>;
}

const PaymentSelection = () => {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const address = useSelector((state: State) => state.products.address);
	const products = useSelector((state: State) => state.products.products);
	const auth = useSelector((state: State) => state.auth);
	const user = useSelector((state: State) => state.auth.user);
	const { placeOrder, deleteCart, updateCart } = bindActionCreators(
		authActionCreators,
		dispatch
	);
	const [value, setValue] = useState('COD');
	const [open, setopen] = useState(false);

	const price = Number(totalPriceCalculator(user.cartItems, products));

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
	};

	const orderPlacementHandler = () => {
		const productArray = user.cartItems.map((item: any) => {
			const product = cartToProduct(item, products);
			return product;
		});

		const orderItems = productArray.map((item: any) => {
			const obj = {
				productId: '',
				vendorId: '',
				count: 0,
				price: 0,
				weight: 0,
				orderStatus: 'In progress',
			};
			obj.productId = item._id;
			obj.vendorId = item.vendorId;
			obj.count = item.units;
			obj.weight = item.kg;

			return obj;
		});

		const orderObject: orderObj = {
			userId: user._id,
			orderPrice: price,
			paymentDone: false,
			paymentMethod: 'COD',
			deliveryAddress: address,
			orderItems: orderItems,
		};

		placeOrder(orderObject);

		setopen(true);
		deleteCart();
	};

	const handleClose = () => {
		setopen(false);
		history.push('/');
	};

	return (
		<Grid container>
			<AlertComponent />
			<OrderModal open={open} handleClose={handleClose} />
			<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
				<Box className={classes.container}>
					<Box className={classes.address}>
						<Box
							sx={{
								width: {
									xs: '25%',
									sm: '25%',
									md: '20%',
									lg: '15%',
									xl: '15%',
								},
							}}
						>
							<Typography color={'#575757'} noWrap pr={1}>
								Deliver To
							</Typography>
						</Box>
						<Box
							sx={{
								width: {
									xs: '60%',
									sm: '60%',
									md: '65%',
									lg: '70%',
									xl: '70%',
								},
								textAlign: 'left',
							}}
						>
							<Typography noWrap fontWeight={500}>
								{address.address}
							</Typography>
						</Box>
						<Box
							sx={{
								width: '15%',
								textAlign: 'right',
							}}
						>
							<Link
								to="/delivery-address"
								style={{
									textDecoration: 'none',
									color: 'inherit',
								}}
								color={'#'}
							>
								<Typography
									pl={1}
									sx={{
										':hover': {
											textDecoration: 'underline',
										},
										textDecoration: 'none',
										fontSize: 10,
										color: '#575757',
									}}
								>
									Change
								</Typography>
							</Link>
						</Box>
					</Box>
					<Box className={classes.address} sx={{ borderBottom: 'none' }}>
						<Box
							sx={{
								width: {
									xs: '25%',
									sm: '25%',
									md: '20%',
									lg: '15%',
									xl: '15%',
								},
							}}
						>
							<Typography color={'#575757'} noWrap pr={1}>
								Contact No
							</Typography>
						</Box>
						<Box
							sx={{
								textAlign: 'left',
								width: {
									xs: '60%',
									sm: '60%',
									md: '65%',
									lg: '70%',
									xl: '70%',
								},
							}}
						>
							<Typography noWrap fontWeight={500}>
								{address.phoneNumber}
							</Typography>
						</Box>
						<Box sx={{ width: '15%', textAlign: 'right' }}>
							<Link
								to="/delivery-address"
								style={{
									textDecoration: 'none',
									color: 'inherit',
								}}
								color={'#'}
							>
								<Typography
									pl={1}
									sx={{
										':hover': {
											textDecoration: 'underline',
										},
										textDecoration: 'none',
										fontSize: 10,
										color: '#575757',
									}}
								>
									Change
								</Typography>
							</Link>
						</Box>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
				<Box className={classes.paymentContainer}>
					<Box className={classes.heading}>Payment Method</Box>
					<Box className={classes.subHeading}>
						Choose your preferred mode of payment
					</Box>
					<Box className={classes.paymentSelectionBox}>
						<FormControl component="fieldset">
							{/* <FormLabel component="legend">
								Select your payment method
							</FormLabel> */}
							<RadioGroup
								aria-label="payment Method"
								name="controlled-radio-buttons-group"
								value={value}
								onChange={handleChange}
							>
								<FormControlLabel
									value="COD"
									control={<Radio />}
									label="Cash on Delivery"
								/>
							</RadioGroup>
						</FormControl>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
				<Box className={classes.mainButtons}>
					<Link
						to="/delivery-address"
						style={{
							textDecoration: 'none',
							color: 'inherit',
						}}
					>
						<Button
							fullWidth
							size="large"
							sx={{
								minWidth: 150,
								maxWidth: 200,
								display: 'inline-block',
								overflow: 'visible',
								whiteSpace: 'nowrap',
							}}
							color="primary"
							variant="text"
						>
							Return to delivery Info
						</Button>
					</Link>

					<Button
						size="large"
						sx={{ minWidth: 150, ml: '5%' }}
						color="primary"
						variant="contained"
						// startIcon={<Sort />}
						onClick={orderPlacementHandler}
						// 	setAlert('Order has been placed successfully', 'success')
						// }
					>
						PLACE ORDER
					</Button>
				</Box>
			</Grid>
			<Paper className={classes.bottomnav} elevation={3}>
				<Grid container columns={12}>
					<Grid item xs={12} sm={12}>
						<Box className={classes.text}>
							<Typography>Subtotal </Typography>
							<Typography fontWeight={600} color={'black'}>
								₹ {price}
							</Typography>
						</Box>
						<Box className={classes.text}>
							<Typography>GST(included) </Typography>
							<Typography color={'black'}>18%</Typography>
						</Box>
						<Box className={classes.text}>
							<Typography>Delivery</Typography>
							<Typography color={'black'}>₹ 0.00</Typography>
						</Box>
						<Box className={classes.text}>
							<Typography fontWeight={600} color={'black'}>
								Estimated Total
							</Typography>
							<Typography fontWeight={600} color={'black'}>
								₹ {price}
							</Typography>
						</Box>
					</Grid>
					<Grid className={classes.btnContainer} item xs={12} sm={12}>
						<Button
							size="large"
							fullWidth
							sx={{ minWidth: 100 }}
							color="primary"
							variant="contained"
							onClick={orderPlacementHandler}
						>
							PLACE ORDER
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
};

export default PaymentSelection;
