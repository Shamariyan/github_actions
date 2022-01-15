import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const useStyles = makeStyles((theme) => {
	return {
		checkIcon: {
			display: 'flex',
			width: '100%',
			justifyContent: 'center',
		},
		heading: {
			fontSize: 30,
			fontWeight: 'bold',
			textAlign: 'center',
		},
		paperWrapper: {
			display: 'flex',
			width: '100%',
			justifyContent: 'center',
		},
		paper: {
			minWidth: '60%',
		},
	};
});

const OrderModal2 = () => {
	const classes = useStyles();
	return (
		<>
			<Box className={classes.checkIcon}>
				<CheckCircleOutlineSharpIcon color="primary" sx={{ fontSize: 150 }} />
			</Box>
			<Box className={classes.heading}>
				Your order has been placed successfully
			</Box>
			<Box className={classes.paperWrapper}>
				<Paper elevation={1} className={classes.paper}>
					Order Details
				</Paper>
			</Box>
		</>
	);
};

export default OrderModal2;
