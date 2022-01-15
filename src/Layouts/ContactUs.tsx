import ContactForm from '../Components/ContactForm';
import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
	contact: {
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: '2.5%',
		marginTop: '2.5%',
	},
	text: {
		paddingTop: '2.5%',
		paddingBottom: '2.5%',
	},
});

const ContactUs = () => {
	const classes = useStyles();
	return (
		<Box className={classes.contact}>
			<Typography
				fontWeight={{ xs: 500, sm: 500, md: 400, lg: 400, xl: 400 }}
				fontSize={{ xs: 20, sm: 20, md: 35, lg: 35 }}
			>
				Looking for something special and customized
			</Typography>
			<Typography
				className={classes.text}
				fontSize={{ xs: 16, sm: 16, md: 22, lg: 22 }}
			>
				Tell us about your event
			</Typography>
			<ContactForm />
		</Box>
	);
};

export default ContactUs;
