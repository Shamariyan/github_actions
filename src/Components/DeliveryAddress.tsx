import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { alertActionCreators, productsActionCreators, State } from '../store';
import totalPriceCalculator from '../utils/totalPriceCalculator';
import AlertComponent from './AlertComponent';

const useStyles = makeStyles((theme) => {
	return {
		heading: {
			fontWeight: 'bold',
			fontSize: 24,
			marginTop: '2.5%',
			marginBottom: '2%',
			textAlign: 'left',
			[theme.breakpoints.down('md')]: {
				paddingLeft: '2%',
			},
			[theme.breakpoints.down('md')]: {
				marginTop: '5%',
			},
		},
		subHeading: {
			textAlign: 'left',
			marginBottom: '	4%',
			color: '#575757',
			[theme.breakpoints.down('md')]: {
				paddingLeft: '2%',
			},
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
	};
});

const DeliveryAddress = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const { addAddress } = bindActionCreators(productsActionCreators, dispatch);
	const { setAlert } = bindActionCreators(alertActionCreators, dispatch);
	const user = useSelector((state: State) => state.auth.user);
	const products = useSelector((state: State) => state.products.cart);
	const cart = useSelector((state: State) => state.auth.user.cartItems);
	const array = useSelector((state: State) => state.products.products);
	const price = totalPriceCalculator(cart, array);
	const arr = products.map((item) => {
		var itemPrice = item.price * item.kg * item.units;
		return itemPrice;
	});

	var total = arr.includes(NaN)
		? 0.0
		: arr.reduce((a, b) => a + b, 0).toFixed(2);

	const addressBook = user.addressBook[0];
	console.log(addressBook);

	const [formData, setFormData] = useState({
		name: addressBook !== undefined ? addressBook.name : '',
		address: addressBook !== undefined ? addressBook.address : '',
		pinCode: addressBook !== undefined ? addressBook.pinCode : '',
		phoneNumber:
			addressBook !== undefined
				? addressBook.phoneNumber
				: `+91 ${user.phoneNumber}`,
	});

	const bool =
		formData.name == '' ||
		formData.pinCode.length !== 6 ||
		formData.address.length < 5 ||
		formData.phoneNumber.length < 10;

	const nextPage = () => {
		if (bool) {
			setAlert('Kindly check if the entered details are correct', 'error');
			return;
		}
		addAddress(formData);
		history.push('/payment-details');
	};

	const { name, address, pinCode, phoneNumber } = formData;

	const onChange = (e: { target: { name: any; value: any } }) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	return (
		<Grid container display={'flex'}>
			<AlertComponent />
			<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
				<Box>
					<Box className={classes.heading}>Delivery Address</Box>
					<Box className={classes.subHeading}>
						Add delivery address to place your order
					</Box>
					<Box>
						<TextField
							fullWidth
							margin="normal"
							onChange={onChange}
							value={name}
							label="Name"
							name="name"
							id="fullWidth"
						/>
						<TextField
							fullWidth
							name="address"
							multiline
							maxRows={3}
							margin="normal"
							onChange={onChange}
							value={address}
							label="Full Address"
							id="fullWidth"
						/>
						<TextField
							fullWidth
							name="pinCode"
							margin="normal"
							type="number"
							onChange={onChange}
							value={pinCode}
							label="Pin code"
							id="fullWidth"
						/>
						<TextField
							fullWidth
							name="phoneNumber"
							margin="normal"
							onChange={onChange}
							value={phoneNumber}
							label="Contact Number"
							id="fullWidth"
						/>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
				<Box className={classes.mainButtons}>
					<Link
						to="/checkout"
						style={{
							textDecoration: 'none',
							color: 'inherit',
						}}
					>
						<Button
							size="large"
							sx={{ minWidth: 150 }}
							color="primary"
							variant="text"
						>
							Return to cart
						</Button>
					</Link>
					<Button
						size="large"
						sx={{ minWidth: 150, ml: '5%' }}
						color="primary"
						variant="contained"
						onClick={() => nextPage()}
					>
						CONTINUE TO PAYMENT
					</Button>
				</Box>
			</Grid>
			<Paper className={classes.bottomnav} elevation={3}>
				<Grid container columns={12}>
					<Grid item xs={12} sm={12}>
						<Box className={classes.text}>
							<Typography>Subtotal </Typography>
							<Typography fontWeight={600} color={'black'}>
								{' '}
								₹ {price}
							</Typography>
						</Box>
						<Box className={classes.text}>
							<Typography>GST(included) </Typography>
							<Typography color={'black'}> 18% </Typography>
						</Box>
						<Box className={classes.text}>
							<Typography>Delivery</Typography>
							<Typography color={'black'}>₹ 0.00</Typography>
						</Box>
						<Box className={classes.text}>
							<Typography fontWeight={600} color={'black'}>
								Estimated Total{' '}
							</Typography>
							<Typography fontWeight={600} color={'black'}>
								{price}
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
							onClick={() => nextPage()}
						>
							CONTINUE TO PAYMENT
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
};

export default DeliveryAddress;
