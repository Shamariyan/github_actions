import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { productsActionCreators } from '../store';

interface categoryListItemsProps {
	closeDrawer: any;
	item: string;
}

export const CategoryListItems = (props: categoryListItemsProps) => {
	const history = useHistory();
	const dispatch = useDispatch();

	const { getFilteredProducts } = bindActionCreators(
		productsActionCreators,
		dispatch
	);
	return (
		<ListItemButton component="a" href="#customized-list">
			<ListItemText
				sx={{ my: 0 }}
				primary={props.item}
				primaryTypographyProps={{
					fontSize: 14,
				}}
				onClick={() => {
					props.closeDrawer();
					getFilteredProducts(props.item.toLowerCase());
					history.push(`/search/${props.item}`);
				}}
			/>
		</ListItemButton>
	);
};
