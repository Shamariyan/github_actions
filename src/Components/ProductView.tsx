import ProductCustomization from './ProductCustomization';
import { makeStyles } from '@material-ui/core';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	alertActionCreators,
	authActionCreators,
	productsActionCreators,
	State,
} from '../store';
import { bindActionCreators } from 'redux';
import { useState } from 'react';

const useStyles = makeStyles((theme) => {
	return {
		prodName: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			paddingTop: '5%',
		},
		card: { maxWidth: 640, maxHeight: 460 },
		prodDescription: { paddingTop: '5%' },
		prodButtons: { paddingTop: '10%' },
	};
});

const ProductView = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const auth = useSelector((state: State) => state.auth.isAuthenticated);
	const product = useSelector((state: State) => state.products.product);
	const user = useSelector((state: State) => state.auth.user);
	const { setAlert } = bindActionCreators(alertActionCreators, dispatch);
	const { addItemToCart, changeLoginModal } = bindActionCreators(
		authActionCreators,
		dispatch
	);
	const [object, setobject] = useState({});
	const [kg, setkg] = useState<any>(1);
	const uom = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7];
	const handleUom = (event: React.ChangeEvent<HTMLInputElement>) => {
		setkg(event.target.value);
	};

	const bool =
		user &&
		user.cartItems.filter((item: any) => {
			return item.productId == product._id;
		}).length === 0
			? false
			: true;

	const handleAddToCart = () => {
		var item = product;
		item.kg = kg;
		addItemToCart(item);
	};

	const imageName = product.imageName;

	return (
		<Grid container>
			<Grid
				item
				justifyContent={'center'}
				xs={12}
				sm={12}
				md={12}
				lg={5}
				xl={5}
			>
				<Card elevation={0} className={classes.card}>
					<CardMedia
						component="img"
						image={`https://d1x0t3m3tl1ewa.cloudfront.net/${imageName}.jpg`}
						alt={product.altText}
						loading="lazy"
					/>
				</Card>
			</Grid>
			<Grid item lg={1} xl={1}></Grid>
			<Grid item container xs={12} sm={12} md={12} lg={6} xl={6}>
				<Grid item container className={classes.prodName}>
					<Grid item xs={8} sm={8} md={9} lg={10} xl={10}>
						<Typography variant="h5" noWrap>
							{product.productName} ({product.type})
						</Typography>
					</Grid>
					<Grid textAlign="right" item xs={4} sm={4} md={3} lg={2} xl={2}>
						<Typography variant="h5" noWrap>
							₹ {product.price.toFixed(2)}
						</Typography>
					</Grid>
				</Grid>
				<Grid
					item
					xs={12}
					sm={12}
					md={12}
					lg={12}
					xl={12}
					className={classes.prodDescription}
				>
					<Typography fontSize={16}>{product.productDescription}</Typography>
				</Grid>
				<ProductCustomization kg={kg} uom={uom} handleUom={handleUom} />
				<Grid
					alignItems="baseline"
					item
					xs={12}
					sm={12}
					md={6}
					lg={6}
					xl={6}
					className={classes.prodButtons}
				>
					{auth === true ? (
						<Button
							disableElevation
							sx={{ width: '100%' }}
							onClick={bool ? () => {} : () => handleAddToCart()}
							variant="contained"
						>
							{bool ? 'Already in cart' : 'ADD TO CART'}
						</Button>
					) : (
						<Button
							disableElevation={true}
							onClick={() => {
								setAlert('Login to Continue', 'error');
								changeLoginModal(true);
							}}
							fullWidth
							variant="contained"
						>
							ADD TO CART{' '}
						</Button>
					)}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default ProductView;
