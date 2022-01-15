import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { productsActionCreators } from '../store';
import capitalize from '../utils/capitalize';

interface obj {
	name: string;
	price: string;
	unit: number;
	descrpition: string;
	message: string;
}

const ProductActionCard = ({ object }: any) => {
	const dispatch = useDispatch();
	const { getProduct } = bindActionCreators(productsActionCreators, dispatch);
	const { productName, _id, price, imageName, altText } = object;

	//This part is to create a fetch function for the images,will be of use later
	// const [cakeImage, setcakeImage] = useState(
	// 	'https://source.unsplash.com/300x300/?cake'
	// );

	// useEffect(() => {
	// 	fetchFunction();
	// }, []);

	// const link = `https://d1x0t3m3tl1ewa.cloudfront.net/${imageName}.jpg`;

	// const fetchFunction = async () => {
	// 	try {
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };
	//sx={{ maxWidth: 240, maxHeight: 300 }}

	const name = capitalize(productName.toLowerCase());

	return (
		<Card elevation={5}>
			<Link onClick={() => getProduct(_id)} to={`/product/${_id}`}>
				<CardActionArea>
					<CardMedia
						component="img"
						height={150}
						image={`https://d1x0t3m3tl1ewa.cloudfront.net/${imageName}.jpg`}
						alt={altText}
						loading="lazy"
					/>
				</CardActionArea>
			</Link>
			<CardContent sx={{ paddingTop: 1.5, paddingBottom: 0 }}>
				<Typography fontWeight={400} noWrap>
					{name}
				</Typography>
			</CardContent>
			<CardActions
				sx={{
					paddingTop: { xs: 0, sm: 0, md: 1, lg: 1, xl: 1 },
					justifyContent: 'space-between',
				}}
			>
				<Typography
					color="GrayText"
					fontSize={{ xs: 12, sm: 12, md: 14, lg: 14, xl: 14 }}
				>
					₹ {price.toFixed(2)}
				</Typography>
				<Link
					onClick={() => getProduct(_id)}
					to={`/product/${_id}`}
					style={{
						textDecoration: 'none',
						color: 'inherit',
					}}
				>
					<Button
						size="small"
						variant="outlined"
						color="info"
						sx={{
							border: { xs: 0, sm: 0, md: 1, lg: 1, xl: 1 },
						}}
						startIcon={<AddIcon />}
					>
						Add
					</Button>
				</Link>
			</CardActions>
		</Card>
	);
};

export default ProductActionCard;
