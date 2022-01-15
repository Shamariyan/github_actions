import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PersonalInformation from '../Components/PersonalInformation';
import { makeStyles } from '@material-ui/core';
import { IconButton, Typography } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => {
	return {
		heading: {
			fontWeight: 'bold',
			fontSize: 24,
			marginTop: '1.5%',
			marginBottom: '2.5%',
			textAlign: 'left',
			[theme.breakpoints.down('md')]: {
				display: 'none',
			},
		},
	};
});

const ProfileSection = () => {
	const classes = useStyles();
	const history = useHistory();

	return (
		<>
			<Grid container>
				<Grid item md={3} lg={2} xl={2}>
					<Box className={classes.heading}>My Profile</Box>
					<Box sx={{ display: 'flex' }}>
						<Typography py={2} fontWeight={600}>
							Personal Information
						</Typography>
						<IconButton
							size="large"
							edge="end"
							color="inherit"
							aria-label="open drawer"
							sx={{
								display: { xs: 'none', sm: 'block', md: 'block', lg: 'block' },
								':hover': {
									backgroundColor: 'transparent',
									color: 'darkgrey',
								},
								paddingTop: 2,
							}}
						>
							<ArrowRightIcon fontSize="medium" />
						</IconButton>
					</Box>
					<Box
						component="a"
						onClick={() => {
							history.push('/orders');
						}}
						sx={{ cursor: 'pointer' }}
					>
						<Typography py={2}>Order History</Typography>
					</Box>
					{/* Will be added in the future */}
					{/* <Box
						component="a"
						onClick={() => {
							history.push('/address');
						}}
						sx={{ cursor: 'pointer' }}
					>
						<Typography py={2}>Address Book</Typography>
					</Box>
					<Box>
						<Typography py={2}>Payment Option</Typography>
					</Box> */}
				</Grid>
				<Grid item xs={12} sm={12} md={9} lg={10} xl={10}>
					<PersonalInformation />
				</Grid>
			</Grid>
		</>
	);
};

export default ProfileSection;
