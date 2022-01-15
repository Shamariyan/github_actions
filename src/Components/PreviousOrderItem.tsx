import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../store';

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
				marginTop: '2%',
			},
			[theme.breakpoints.down('md')]: {
				marginTop: '5%',
			},
		},
		paper2: {
			width: '100%',
			display: 'flex',
			justifyContent: 'space-between',
			padding: '2%',
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
	};
});

export const ProductItem = ({ item }: any) => {
	const classes = useStyles();
	const products = useSelector((state: State) => state.products.products);
	const product = products.find((obj: any) => obj._id === item.productId);
	const price = (product.price * item.weight * item.count).toFixed(2);
	return (
		<Paper className={classes.paper2}>
			<Grid container>
				<Grid
					item
					container
					sx={{ display: 'flex', justifyContent: 'space-between' }}
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
							₹ {product.price}
						</Typography>
						<Typography className={classes.name} color="GrayText">
							{item.weight} kg , {item.count} units
						</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={4} sm={3} md={2} lg={2} xl={2}>
				<Box className={classes.price}>
					<Typography sx={{ textAlign: 'right' }} color={'white'}>
						.
					</Typography>
					<Typography sx={{ textAlign: 'right' }} color={'grey'}>
						₹ {price}
					</Typography>
				</Box>
			</Grid>
		</Paper>
	);
};

const PreviousOrderItem = ({ item }: any) => {
	const classes = useStyles();

	let arr: any[] = [];
	item.orderItems.map((order: any) => {
		let a = order.products;
		arr.push(...a);
	});

	return (
		<>
			<Paper elevation={2} className={classes.paper}>
				<Grid item container>
					<Grid
						item
						container
						sx={{ display: 'flex', justifyContent: 'space-between' }}
						xs={7}
						sm={7}
						md={10}
						lg={10}
						xl={11}
					>
						<Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
							<Typography fontWeight={600} className={classes.name} noWrap>
								Id :{item.orderId}
							</Typography>
							<Typography className={classes.name} color="GrayText">
								{item.orderDate.slice(0, 10)}
							</Typography>
							<Typography className={classes.name} color="GrayText">
								{item.deliveryAddress.address},{item.deliveryAddress.pinCode}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={4} sm={3} md={2} lg={2} xl={2}>
					<Box className={classes.price}>
						<Typography
							fontWeight={500}
							sx={{ textAlign: 'right' }}
							color={'black'}
						>
							{item.paymentMethod}
						</Typography>
						<Typography
							fontWeight={600}
							sx={{ textAlign: 'right' }}
							color={'black'}
							noWrap
						>
							₹ {item.orderPrice.toFixed(2)}
						</Typography>
					</Box>
				</Grid>
			</Paper>
			{arr.length > 0
				? arr.map((item: any) => {
						return <ProductItem key={item._id} item={item} />;
				  })
				: null}
		</>
	);
};

export default PreviousOrderItem;
