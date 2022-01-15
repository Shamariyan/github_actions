import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PreviousOrderItems from './PreviousOrderItems';

const useStyles = makeStyles((theme) => {
	return {
		heading: {
			fontWeight: 'bold',
			fontSize: 24,
			marginTop: '1.5%',
			marginBottom: '2.5%',
			textAlign: 'left',
		},
		heading1: {
			fontWeight: 'bold',
			fontSize: 24,
			marginTop: '1.5%',
			marginBottom: '2.5%',
			textAlign: 'center',
		},
		text: {
			textAlign: 'center',
		},
		continue: {
			display: 'flex',
			justifyContent: 'center',
		},
	};
});

const PreviousOrders = () => {
	const classes = useStyles();

	return (
		<>
			<Grid
				container
				rowSpacing={{ xs: 2, sm: 2, md: 3 }}
				columnSpacing={{ xs: 0, sm: 2, md: 3 }}
				justifyContent="center"
			>
				<Grid item md={2} lg={2} xl={2}></Grid>
				<Grid item xs={12} sm={12} md={4} lg={4}>
					<Box className={classes.heading}>Previous Orders</Box>
				</Grid>
				<Grid item xs={12} sm={12} md={4} lg={4}></Grid>
				<Grid item md={2} lg={2} xl={2}></Grid>
				<Grid item md={1} lg={2} xl={2}></Grid>
				<Grid item xs={12} sm={12} md={10} lg={8} xl={8}>
					<PreviousOrderItems />
				</Grid>
				<Grid item md={1} lg={2} xl={2}></Grid>
			</Grid>
		</>
	);
};

export default PreviousOrders;
