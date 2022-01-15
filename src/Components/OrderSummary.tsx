import OrderSummaryItem from './OrderSummaryItem';
import { makeStyles } from '@material-ui/core';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import { State } from '../store';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => {
	return {
		container: {
			width: '100%',
			height: '100%',
			[theme.breakpoints.down('md')]: {
				paddingLeft: '1%',
				paddingBottom: '5%',
				paddingRight: '1%',
			},
			[theme.breakpoints.up('md')]: {
				paddingLeft: '5%',
				paddingBottom: '5%',
				paddingRight: '5%',
				marginTop: '5%',
			},
		},
		main: {
			[theme.breakpoints.down('md')]: {
				marginBottom: 200,
			},
		},
		heading: {
			fontWeight: 'bold',
			fontSize: 20,
			paddingBottom: '3%',
			paddingTop: '3%',
			[theme.breakpoints.down('md')]: {
				paddingLeft: '3%',
			},
			[theme.breakpoints.up('md')]: {
				paddingLeft: '3%',
			},
		},
	};
});

const OrderSummary = () => {
	const classes = useStyles();
	const arr = useSelector((state: State) => state.auth.user.cartItems);
	return (
		<Box className={classes.main}>
			<Paper elevation={3} className={classes.container}>
				<Box className={classes.heading}>Your cart</Box>
				<Grid container>
					<Grid item container xs={12} sm={12} md={12} lg={12} xl={12}>
						{arr.map((item: any, index: any) => {
							return <OrderSummaryItem key={index} item={item} />;
						})}
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
};

export default OrderSummary;
