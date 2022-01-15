import ProductCards from './../Components/ProductCards';
import CategoryCards from '../Components/CategoryCards';
import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import { State } from '../store';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
	heading: {
		fontWeight: 'bold',
		fontSize: 24,
		marginTop: '2.5%',
		marginBottom: '2.5%',
	},
});

const Explore = () => {
	const classes = useStyles();
	const products = useSelector((state: State) => state.products.products);
	var prodArray = products.sort(() => 0.5 - Math.random()).slice(0, 12);

	return (
		<Box>
			<Box className={classes.heading}>Explore Categories</Box>
			<CategoryCards />
			<Box className={classes.heading}>Explore Products</Box>
			<ProductCards products={prodArray} />
		</Box>
	);
};

export default Explore;
