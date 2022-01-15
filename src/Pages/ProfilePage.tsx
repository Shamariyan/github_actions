import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import ScrollToTop from '../utils/ScrollToTop';
import ProfileSection from '../Layouts/ProfileSection';
import AlertComponent from '../Components/AlertComponent';
import { useSelector } from 'react-redux';
import { State } from '../store';
import Loading from '../utils/Loading';

const useStyles = makeStyles((theme) => {
	return {
		container: {
			marginLeft: '5%',
			marginRight: '5%',
			[theme.breakpoints.down('sm')]: {
				paddingTop: '20%',
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

const ProfilePage = () => {
	const classes = useStyles();
	const loading = useSelector((state: State) => state.auth.loading);

	return loading ? (
		<Loading />
	) : (
		<Box className={classes.container}>
			<ScrollToTop />
			<AlertComponent />
			<ProfileSection />
		</Box>
	);
};

export default ProfilePage;
