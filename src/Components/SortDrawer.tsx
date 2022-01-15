import { filterOptionItems } from './FilterOptions';
import Sort from '@mui/icons-material/Sort';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { bindActionCreators } from 'redux';
import { productsActionCreators, State } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

const SortDrawer = (props: any) => {
	const { width, sorttoggleDrawer, handleSort } = props;
	const didMountRef = useRef(false);
	const sortData = ['Sort by price', 'Sort by name'];
	const [state, setstate] = useState('');
	const products = useSelector((state: State) => state.products.filtersArray);
	const dispatch = useDispatch();
	const { sortProducts } = bindActionCreators(productsActionCreators, dispatch);

	useEffect(() => {
		if (didMountRef.current) {
			// 	handleSort(state);
			sorttoggleDrawer();
		} else didMountRef.current = true;
	}, [state]);

	useEffect(() => {
		handleSort(state);
	}, [state]);

	//this part is needed to fix the sort issue in mobile view
	// const handleSort = (option: string) => {
	// 	option === 'Sort by price' &&
	// 		products.sort((a: any, b: any) => {
	// 			return a.price - b.price;
	// 		});
	// 	sortProducts(products);

	// 	option === 'Sort by name' &&
	// 		products.sort((a: any, b: any) => {
	// 			let a1 = a.productName.toLowerCase();
	// 			let b1 = b.productName.toLowerCase();

	// 			return a1 < b1 ? -1 : a1 > b1 ? 1 : 0;
	// 		});
	// 	sortProducts(products);
	// };

	return (
		<Box
			width={width}
			role="presentation"
			// onClick={toggleDrawer(false)}
			// onKeyDown={toggleDrawer(false)}
		>
			<ListItemButton component="a">
				<Sort />
				<ListItemText
					sx={{ py: 1, px: 1 }}
					primary="Sort by"
					primaryTypographyProps={{
						fontSize: 20,
						fontWeight: 'medium',
						letterSpacing: 0,
					}}
				/>
			</ListItemButton>
			<Divider />
			{sortData.map((item: string, index: number) => {
				return (
					<ListItemButton key={index} onClick={() => setstate(item)}>
						<ListItemText
							sx={{ my: 2 }}
							primary={item}
							primaryTypographyProps={{
								fontSize: 16,
							}}
						/>
					</ListItemButton>
				);
			})}
		</Box>
	);
};

export default SortDrawer;
