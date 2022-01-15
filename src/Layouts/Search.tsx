import BottomTab from '../Components/BottomTab';
import FilterOptions from '../Components/FilterOptions';
import ProductCards from '../Components/ProductCards';
import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { productsActionCreators, State } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { useState } from 'react';
import Loading from '../utils/Loading';
import capitalize from '../utils/capitalize';

const useStyles = makeStyles((theme) => {
	return {
		container: {
			paddingTop: '5%',
			marginBottom: '5%',
			width: '100%',
		},
		filter: {
			[theme.breakpoints.down('md')]: {
				display: 'none',
			},
			[theme.breakpoints.up('md')]: {
				display: 'block',
			},
			height: '100%',
		},
		divider: {
			marginBottom: '2.5%',
		},
		sort: {
			[theme.breakpoints.down('md')]: {
				display: 'none',
			},
			[theme.breakpoints.up('md')]: {
				display: 'block',
			},
		},
	};
});

const Search = () => {
	const classes = useStyles();
	const sortData = ['Sort by price', 'Sort by name'];
	let { term } = useParams<any>();
	const [sort, setSort] = useState('');
	const products = useSelector((state: State) => state.products.filtersArray);
	const loading = useSelector((state: State) => state.products.loading);
	const dispatch = useDispatch();
	const { sortProducts } = bindActionCreators(productsActionCreators, dispatch);

	term = capitalize(term);

	const handleSort = (option: string) => {
		option === 'Sort by price' &&
			products.sort((a: any, b: any) => {
				return a.price - b.price;
			});
		sortProducts(products);

		option === 'Sort by name' &&
			products.sort((a: any, b: any) => {
				let a1 = a.productName.toLowerCase();
				let b1 = b.productName.toLowerCase();

				return a1 < b1 ? -1 : a1 > b1 ? 1 : 0;
			});
		sortProducts(products);
	};
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSort(event.target.value);
	};

	return loading ? (
		<Loading />
	) : (
		<>
			<Grid container className={classes.container}>
				<Grid item className={classes.filter} md={2} lg={2} xl={2}>
					<ListItemText
						sx={{ py: 2, px: 2 }}
						primary="Filters"
						primaryTypographyProps={{
							fontSize: 18,
							fontWeight: 'medium',
							letterSpacing: 0,
						}}
					/>
					<FilterOptions />
				</Grid>
				<Grid item sm={1} md={1} lg={1} xl={1}></Grid>
				<Grid
					sx={{ mb: { xs: '15%', sm: '15%', md: '10%', lg: '5%', xl: '5%' } }}
					container
					item
					xs={12}
					sm={11}
					md={9}
					lg={9}
					xl={9}
				>
					<Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
						<ListItemText
							sx={{
								py: 2,
								px: { xs: 0, sm: 0, md: 0, lg: 2, xl: 2 },
								pl: '5%',
								mt: { xs: '15%', sm: '15%', md: '10%', lg: '0%', xl: '0%' },
							}}
							primary={`Showing products for ${term}`}
							primaryTypographyProps={{
								fontSize: 18,
								fontWeight: 'medium',
								letterSpacing: 0,
							}}
						/>
					</Grid>
					<Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
						<Box className={classes.sort}>
							<TextField
								fullWidth
								id="standard-select-currency"
								select
								color="primary"
								label="Sort by"
								value={sort}
								onChange={handleChange}
								variant="standard"
							>
								{sortData.map((option, index) => (
									<MenuItem
										key={index}
										onClick={() => handleSort(option)}
										value={option}
									>
										{option}
									</MenuItem>
								))}
							</TextField>
						</Box>
					</Grid>
					<ProductCards products={products} />
				</Grid>
			</Grid>
			<BottomTab handleSort={handleSort} />
		</>
	);
};

export default Search;
