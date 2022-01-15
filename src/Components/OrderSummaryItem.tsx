import { makeStyles } from '@material-ui/core';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authActionCreators, State } from '../store';
import cartToProduct from '../utils/cartToProduct';

const useStyles = makeStyles((theme) => {
	return {
		price: {
			width: '100%',
			display: 'flex',
			justifyContent: 'space-between',
			paddingTop: '2%',
			paddingBottom: '2%',
		},
		paper: {
			width: '100%',
			display: 'flex',
			justifyContent: 'space-between',
			padding: '2%',
			marginTop: '1%',
		},
		name: {
			paddingLeft: '5%',
		},
	};
});
const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const OrderSummaryItem = ({ item }: any) => {
	const [qty, setqty] = useState<any>(item.units);
	const didMountRef = useRef(false);
	useEffect(() => {
		if (didMountRef.current) {
			updateFunction();
		} else didMountRef.current = true;
	}, [qty]);

	const classes = useStyles();

	const dispatch = useDispatch();

	const { updateCart } = bindActionCreators(authActionCreators, dispatch);

	const arr = useSelector((state: State) => state.auth.user.cartItems);

	const products = useSelector((state: State) => state.products.products);

	const product = cartToProduct(item, products);

	var price = (product.price * product.kg * product.units).toFixed(2);

	const imageName = product.imageName;

	const updateFunction = () => {
		let newArray = arr.map((obj: any) => {
			if (obj.productId === item.productId) {
				obj.units = qty;
				return obj;
			}
			return obj;
		});
		updateCart(newArray);
	};

	const handleQty = (event: React.ChangeEvent<HTMLInputElement>) => {
		setqty(event.target.value);
	};

	return (
		<Paper elevation={0} className={classes.paper}>
			<Grid item container>
				<Grid item xs={3} sm={3} md={2} lg={2} xl={2}>
					<Card elevation={0}>
						<CardMedia
							height={100}
							component="img"
							image={`https://d1x0t3m3tl1ewa.cloudfront.net/${imageName}.jpg`}
							alt="Cake Image"
							loading="lazy"
						/>
					</Card>
				</Grid>
				<Grid item xs={3} sm={3} md={4} lg={4} xl={4}>
					<Typography fontWeight={600} noWrap className={classes.name}>
						{product.productName}
					</Typography>
					<Typography className={classes.name} color="GrayText">
						{product.kg} Kg
					</Typography>
					<TextField
						//fullWidth
						sx={{
							width: {
								xs: '60%',
								sm: '60%',
								md: '35%',
								lg: '30%',
								xl: '25%',
							},
							textAlign: 'center',
							paddingLeft: '5%',
						}}
						id="standard-select-qty"
						select
						value={qty}
						onChange={handleQty}
						helperText="Quantity"
						variant="standard"
					>
						{quantity.map((option, index) => (
							<MenuItem key={index} value={option}>
								{option}
							</MenuItem>
						))}
					</TextField>
				</Grid>
			</Grid>
			<Grid item>
				<Box className={classes.price}>
					<Typography fontWeight={600} color={'black'} noWrap>
						₹ {price}
					</Typography>
				</Box>
			</Grid>
		</Paper>
	);
};

export default OrderSummaryItem;
