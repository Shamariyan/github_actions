import ProductCards from '../Components/ProductCards';
import ProductView from '../Components/ProductView';
import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import { State } from '../store';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => {
	return {
		container: {
			marginBottom: '5%',
		},
		heading: {
			fontWeight: 'bold',
			fontSize: 24,
			marginTop: '2.5%',
			marginBottom: '2.5%',
		},
	};
});

const Product = () => {
	const classes = useStyles();
	const products = useSelector((state: State) => state.products.products);
	const product = useSelector((state: State) => state.products.product);
	var prodArray = products
		.filter((item: any) => item._id !== product._id)
		.sort(() => 0.5 - Math.random())
		.slice(0, 4);

	return (
		<>
			<Box className={classes.container}>
				<ProductView />
				<Box className={classes.heading}>You may also like</Box>
				<ProductCards products={prodArray} />
			</Box>
		</>
	);
};

export default Product;
