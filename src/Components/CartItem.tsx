import { makeStyles } from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import CartCloseBtnComponent from '../Molecules/CartCloseBtnComponent';
import { authActionCreators, State } from '../store';
import cartToProduct from '../utils/cartToProduct';

const useStyles = makeStyles((theme) => {
	return {
		prodName: {
			[theme.breakpoints.up('md')]: {
				paddingLeft: '5%',
				paddingTop: 1,
			},
			[theme.breakpoints.only('md')]: {
				paddingTop: '3%',
				paddingLeft: '5%',
			},
			[theme.breakpoints.down('sm')]: {
				paddingTop: '3%',
				paddingLeft: 0,
			},
		},
		paper: {
			width: '100%',
			display: 'flex',
			justifyContent: 'space-between',
			padding: '2%',

			[theme.breakpoints.up('md')]: {
				marginBottom: '2%',
			},
			[theme.breakpoints.down('md')]: {
				marginBottom: '5%',
			},
		},
		name: {
			paddingBottom: '2%',
			paddingLeft: '5%',
		},
		price: {
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			paddingTop: '2%',
			paddingBottom: '2%',
		},
		rightAlign: {
			textAlign: 'right',
		},
		xbutton: { textAlign: 'end', width: 15 },
		detailsContainer: { display: 'flex', justifyContent: 'space-between' },
		prodPrice: {
			paddingLeft: '5%',
			[theme.breakpoints.up('md')]: {
				display: 'block',
			},
			[theme.breakpoints.only('md')]: {
				display: 'none',
			},
			[theme.breakpoints.down('sm')]: {
				display: 'none',
			},
		},
	};
});

const CartItem = ({ item }: any) => {
	const [qty, setqty] = useState<any>(item.units);
	const didMountRef = useRef(false);
	useEffect(() => {
		if (didMountRef.current) {
			updateFunction();
		} else didMountRef.current = true;
	}, [qty]);

	const dispatch = useDispatch();

	const arr = useSelector((state: State) => state.auth.user.cartItems);
	const products = useSelector((state: State) => state.products.products);

	const { updateCart, deleteCartItem } = bindActionCreators(
		authActionCreators,
		dispatch
	);

	const wid = window.innerWidth;

	const classes = useStyles();

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

	const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	const handleQty = (event: React.ChangeEvent<HTMLInputElement>) => {
		setqty(event.target.value);
	};
	const deleteCartItemFn = () => {
		deleteCartItem(item.productId);
	};

	return (
		<Paper elevation={2} className={classes.paper}>
			<Grid item container>
				<Grid item xs={5} sm={3} md={2} lg={2} xl={1}>
					<Card elevation={0}>
						<CardMedia
							height={100}
							component="img"
							image={`https://d1x0t3m3tl1ewa.cloudfront.net/${imageName}.jpg`}
							alt={product.altText}
							loading="lazy"
						/>
					</Card>
				</Grid>
				<Grid
					item
					container
					className={classes.detailsContainer}
					xs={7}
					sm={7}
					md={10}
					lg={10}
					xl={11}
				>
					<Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
						<Typography fontWeight={600} className={classes.name}>
							{product.productName}
						</Typography>
						<Typography className={classes.name} color="GrayText">
							Weight: {product.kg} kg
						</Typography>
						<Typography className={classes.prodPrice} color="GrayText">
							₹ {product.price}
						</Typography>
					</Grid>
					<Grid
						sx={{
							textAlign: {
								xs: 'center',
								sm: 'center',
								md: 'center',
								lg: 'end',
								xl: 'end',
							},
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
						}}
						item
						xs={8}
						sm={8}
						md={6}
						lg={4}
						xl={4}
					>
						<TextField
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
			</Grid>
			<Grid item xs={4} sm={3} md={2} lg={2} xl={2}>
				<Box className={classes.price}>
					<CartCloseBtnComponent
						wid={wid}
						classes={classes}
						deleteCartItem={deleteCartItemFn}
					/>
					<Typography
						fontWeight={600}
						className={classes.rightAlign}
						color={'black'}
					>
						₹ {price}
					</Typography>
				</Box>
			</Grid>
		</Paper>
	);
};
export default CartItem;
