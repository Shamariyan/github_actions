import ProductActionCard from './ProductActionCard';
import { makeStyles } from '@material-ui/core';
import { Box, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';

const useStyles = makeStyles((theme) => {
	return {
		card: {},
		grid: {
			[theme.breakpoints.up('lg')]: {
				// paddingLeft: '5%',
			},
			display: 'inline-flex',
			flexDirection: 'row',
			flexWrap: 'wrap',
		},
		box: {
			width: '100%',
			[theme.breakpoints.down('md')]: {
				padding: '1%',
			},
			[theme.breakpoints.up('md')]: {
				padding: '3%',
				color: 'white',
			},
		},
	};
});

const ProductCards = ({ products }: any) => {
	const classes = useStyles();

	const gridCreator = () => {
		return products.map((object: any) => (
			<Grid key={object.SKUID} item xs={6} sm={6} md={3} lg={3} xl={3}>
				<Box className={classes.card}>
					<ProductActionCard object={object} />
				</Box>
			</Grid>
		));
	};

	return (
		<Paper className={classes.box} elevation={1}>
			<Grid
				container
				className={classes.grid}
				justifyContent="normal"
				spacing={{ xs: 1, sm: 1, md: 5, lg: 5, xl: 5 }}
				columns={12}
			>
				{gridCreator()}
			</Grid>
		</Paper>
	);
};

export default ProductCards;
