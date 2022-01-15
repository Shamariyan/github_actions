import { makeStyles } from '@material-ui/core';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { State } from '../store';
import totalPriceCalculator from '../utils/totalPriceCalculator';

const useStyles = makeStyles((theme) => {
	return {
		mainButtons: {
			[theme.breakpoints.up('md')]: {
				display: 'flex',
				justifyContent: 'space-between',
			},
			[theme.breakpoints.only('md')]: {
				display: 'flex',
				justifyContent: 'space-between',
			},
			[theme.breakpoints.down('md')]: {
				display: 'none',
			},
		},
		paper: {
			padding: '5%',
			color: 'white',
			[theme.breakpoints.down('md')]: {
				display: 'none',
			},
			[theme.breakpoints.up('md')]: {
				display: 'block',
			},
			[theme.breakpoints.only('md')]: {
				display: 'none',
			},
		},
		mainGrid: {
			[theme.breakpoints.up('md')]: {
				display: 'block',
				marginTop: '0%',
				marginBottom: '5%',
				paddingRight: '1%',
			},

			[theme.breakpoints.only('md')]: {
				marginTop: '3%',
				marginBottom: '5%',
				paddingRight: '2%',
			},
			[theme.breakpoints.down('sm')]: {
				marginTop: '5%',
				marginBottom: '5%',
				paddingRight: '5%',
			},
		},
		text: {
			display: 'flex',
			justifyContent: 'space-between',
			padding: '3%',
			color: '#575757',
		},
		bottomnav: {
			position: 'fixed',
			bottom: 0,
			left: 0,
			right: 0,
			backgroundColor: '#f7f7f7',
			[theme.breakpoints.down('md')]: {
				display: 'block',
			},
			[theme.breakpoints.up('md')]: {
				display: 'none',
			},
			[theme.breakpoints.only('md')]: {
				display: 'block',
			},
		},
		btnContainer: {
			padding: '2.5%',
			textAlign: 'center',
		},
	};
});

const CartPrice = () => {
	const classes = useStyles();
	const cart = useSelector((state: State) => state.auth.user.cartItems);
	const products = useSelector((state: State) => state.products.products);

	const total = totalPriceCalculator(cart, products);
	return (
		<>
			<Grid className={classes.mainGrid} container columns={6}>
				<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
					<Paper elevation={3} className={classes.paper}>
						<Box className={classes.text}>
							<Typography fontWeight={600} variant="h6" color={'black'}>
								Order Summary
							</Typography>
						</Box>
						<Box className={classes.text}>
							<Typography>Subtotal </Typography>
							<Typography fontWeight={600} color={'black'} ml={2}>
								₹ {total}
							</Typography>
						</Box>
						<Box
							className={classes.text}
							sx={{
								marginBottom: {
									xs: '15%',
									sm: '15%',
									md: '10%',
									lg: '0',
									xl: '0',
								},
							}}
						>
							<Typography variant="caption">
								Delivery Charges & GST included
							</Typography>
						</Box>
						<Box className={classes.mainButtons}>
							<Link
								to={cart.length !== 0 ? '/delivery-address' : '/checkout'}
								style={{
									width: '100%',
									textDecoration: 'none',
									color: 'inherit',
								}}
							>
								<Button
									fullWidth
									sx={{ minWidth: 170 }}
									size="large"
									color="primary"
									variant="contained"
								>
									PROCEED TO CHECKOUT
								</Button>
							</Link>
						</Box>
					</Paper>
				</Grid>
			</Grid>
			<Paper className={classes.bottomnav} elevation={3}>
				<Grid container columns={12}>
					<Grid item xs={12} sm={12}>
						<Box className={classes.text} sx={{ paddingTop: '3%' }}>
							<Typography>Subtotal </Typography>
							<Typography fontWeight={600} color={'black'} ml={2}>
								₹ {total}
							</Typography>
						</Box>
						<Box className={classes.text}>
							<Typography variant="caption">
								Delivery Charges & GST included
							</Typography>
						</Box>
					</Grid>
					<Grid className={classes.btnContainer} item xs={12} sm={12}>
						<Link
							to={cart.length !== 0 ? '/delivery-address' : '/checkout'}
							style={{
								width: '100%',
								textDecoration: 'none',
								color: 'inherit',
							}}
						>
							<Button
								size="large"
								fullWidth
								sx={{ minWidth: 100 }}
								color="primary"
								variant="contained"
							>
								PROCEED TO CHECKOUT
							</Button>
						</Link>
					</Grid>
				</Grid>
			</Paper>
		</>
	);
};

export default CartPrice;
