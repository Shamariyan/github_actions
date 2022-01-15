import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import ScrollToTop from '../utils/ScrollToTop';
import AddAddressSection from '../Layouts/AddAddressSection';

const useStyles = makeStyles((theme) => {
	return {
		container: {
			marginLeft: '5%',
			marginRight: '5%',
			[theme.breakpoints.down('sm')]: {
				paddingTop: '20%',
				// paddingLeft: '2%',
			},
			[theme.breakpoints.only('md')]: {
				paddingTop: '15%',
			},
			[theme.breakpoints.up('md')]: {
				paddingTop: '9%',
			},
			[theme.breakpoints.up('lg')]: {
				paddingTop: '9%',
			},
		},
	};
});

const AddAddressPage = () => {
	const classes = useStyles();
	return (
		<Box className={classes.container}>
			<ScrollToTop />
			<AddAddressSection />
		</Box>
	);
};

export default AddAddressPage;
