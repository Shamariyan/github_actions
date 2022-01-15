import backgroungImg from '../assets/Caption_background.jpg';
import { makeStyles } from '@material-ui/core';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => {
	return {
		caption: {
			width: '100%',
			height: '10%',
			maxHeight: '10%',
			marginTop: '3%',
			marginBottom: '3%',
			overflow: 'hidden',
			justifyContent: 'center',
			alignItems: 'center',
			textAlign: 'center',
		},
		content: {
			marginTop: '2%',
			marginBottom: '2%',
		},
	};
});

const CaptionCard = () => {
	const classes = useStyles();

	return (
		<Card className={classes.caption}>
			<CardContent className={classes.content}>
				<Typography
					gutterBottom
					fontWeight={500}
					fontSize={{ xs: 20, sm: 20, md: 30, lg: 30 }}
				>
					A bold caption that represents brand identity
				</Typography>
				<Typography fontSize={{ xs: 16, sm: 16, md: 22, lg: 22 }}>
					Lizards are a widespread group of squamate reptiles, with over 6,000
					species.
				</Typography>
			</CardContent>
		</Card>
	);
};

export default CaptionCard;
