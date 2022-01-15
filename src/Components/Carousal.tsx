import img1 from '../../assets/carousal1.jpg';
import img2 from '../../assets/carousal2.jpg';
import img3 from '../../assets/carousal3.jpg';
import img4 from '../../assets/carousal4.jpg';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';

export const Item = (props: any) => {
	return (
		<Box
			sx={{
				// styling is still not finalized, so not removing the comments
				// width: 4 / 6,
				// minHeight: { xs: '60%', sm: '60%', md: '60%', lg: '60%', xl: '60%' },
				// maxHeight: { lg: '45%', xl: '45%' },
				width: { md: 4 / 6, lg: 4 / 6, xl: 4 / 6 },
				mt: { xs: '15%', sm: '15%', md: '10%', lg: '5%', xl: '5%' },
				mx: { md: '2%', lg: '2%', xl: '2%' },
			}}
		>
			<CardMedia
				sx={{
					// styling is still not finalized, so not removing the comments
					// height: '100%',
					// objectFit: 'cover',
					// marginLeft: '21%',
					// marginRight: '12%',
					marginLeft: { md: '21%', lg: '22%', xl: '23%' },
				}}
				component="img"
				image={props.item.img}
				alt={props.item.name}
			/>
		</Box>
	);
};

const LoadedCarousal = (props: any) => {
	return (
		<Carousel
			interval={5000}
			animation="slide"
			indicatorIconButtonProps={{
				style: {
					color: '#de3838',
				},
			}}
			activeIndicatorIconButtonProps={{
				style: {
					backgroundColor: '#de3838',
				},
			}}
			fullHeightHover={true}
		>
			{props.items.map((item: any, i: any) => (
				<Item key={i} item={item} />
			))}
		</Carousel>
	);
};

const LoadingImage = () => {
	return <Box sx={{ fontSize: 30 }}>Loading...</Box>;
};

const Carousal = () => {
	const [isLoading, setisLoading] = useState(true);
	const [image, setimage]: any = useState([
		{
			name: 'Carousal card #1',
			img: img1,
		},
		{
			name: 'Carousal card #2',
			img: img2,
		},
		{
			name: 'Carousal card #3',
			img: img3,
		},
		{
			name: 'Carousal card #4',
			img: img4,
		},
	]);

	useEffect(() => {
		setTimeout(() => {
			setisLoading(false);
		}, 100);
	}, []);

	return (
		<div>
			{isLoading && <LoadingImage />}
			{!isLoading && <LoadedCarousal items={image} />}
		</div>
	);
};

export default Carousal;
