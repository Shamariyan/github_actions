import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { productsActionCreators } from '../store';

declare module '@mui/material/styles' {
	interface Palette {
		neutral: Palette['primary'];
	}

	// allow configuration using `createTheme`
	interface PaletteOptions {
		neutral?: PaletteOptions['primary'];
	}
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
	interface ButtonPropsColorOverrides {
		neutral: true;
	}
}

//this is a working style for the below component, not deleting just in case
//sx={{ maxWidth: 345, height: '100%' }}

const CategoryActionCard = ({ item }: any) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { getFilteredProducts } = bindActionCreators(
		productsActionCreators,
		dispatch
	);
	return (
		<Card elevation={0} sx={{ maxWidth: 180 }}>
			<CardActionArea
				sx={{ borderRadius: 120, maxWidth: 180, maxHeight: 180 }}
				onClick={() => {
					if (item.name === 'Birthday') {
						getFilteredProducts('chocolate');
						history.push(`/search/chocolate`);
						return;
					} else {
						if (item.name === 'Anniversary') {
							getFilteredProducts('fruit');
							history.push(`/search/fruit`);
							return;
						}
						getFilteredProducts(item.name.toLowerCase());
						history.push(`/search/${item.name}`);
					}
				}}
			>
				<CardMedia
					component="img"
					sx={{
						borderRadius: '50%',
						height: {
							xs: 140,
							sm: 140,
							md: 120,
							lg: 180,
							xl: 180,
						},
						width: {
							xs: 140,
							sm: 140,
							md: 120,
							lg: 180,
							xl: 180,
						},
					}}
					image={item.link}
					alt="Category image"
				/>
			</CardActionArea>
			<Box
				pt={'5%'}
				sx={{
					maxWidth: 180,
					textAlign: 'center',
				}}
			>
				<Typography fontWeight={600} fontSize={16}>
					{item.name}
				</Typography>
			</Box>
		</Card>
	);
};

export default CategoryActionCard;
