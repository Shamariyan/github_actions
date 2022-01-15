import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TodayTwoTone from '@mui/icons-material/TodayTwoTone';
import DateAdapter from '@mui/lab/AdapterMoment';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useState } from 'react';
import { MobileDatePicker } from '@mui/lab';
import { TodayRounded } from '@mui/icons-material';
import { bindActionCreators } from 'redux';
import { alertActionCreators, authActionCreators, State } from '../store';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => {
	return {
		heading: {
			fontWeight: 'bold',
			fontSize: 24,
			marginTop: '1.5%',
			marginBottom: '2.5%',
		},
		button: {
			display: 'flex',
			justifyContent: 'space-around',
		},
		date: {
			width: '100%',
		},
	};
});

const PersonalInformation = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = useSelector((state: State) => state.auth.user);
	const { updateProfile } = bindActionCreators(authActionCreators, dispatch);
	const { setAlert } = bindActionCreators(alertActionCreators, dispatch);

	const initialState = {
		name: user.userName ? user.userName : '',
		email: user.emailId ? user.emailId : '',
		phone: user.phoneNumber ? user.phoneNumber : '',
	};

	const [profile, setprofile] = useState(initialState);

	const { name, email, phone } = profile;

	const [date, setdate] = useState<Date | null>(new Date());

	const handleDateChange = (newValue: Date | null) => {
		setdate(newValue);
	};
	const onChange = (e: { target: { name: any; value: any } }) => {
		setprofile({ ...profile, [e.target.name]: e.target.value });
	};

	const bool = name == '' || name.length < 3 || email.length < 10;

	const onSubmit = () => {
		if (!bool) {
			updateProfile(name, email);
			setAlert('Profile successfully updated', 'success');
			return;
		}
		setAlert('Please enter a valid Name and Email', 'error');
	};

	return (
		<>
			<Grid
				container
				rowSpacing={{ xs: 3, sm: 3, md: 5, lg: 5, xl: 5 }}
				columnSpacing={{ xs: 0, sm: 2, md: 3 }}
				justifyContent="center"
			>
				<Grid item md={2} lg={2} xl={2}></Grid>
				<Grid item xs={12} sm={12} md={4} lg={4}>
					<Box className={classes.heading}> Personal Information</Box>
				</Grid>
				<Grid item xs={12} sm={12} md={4} lg={4}></Grid>
				<Grid item md={2} lg={2} xl={2}></Grid>
				<Grid item md={2} lg={2} xl={2}></Grid>
				<Grid item xs={12} sm={12} md={4} lg={4}>
					<TextField
						fullWidth
						id="standard-search"
						label="Name"
						value={name}
						name="name"
						onChange={onChange}
						variant="standard"
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={4} lg={4}>
					<LocalizationProvider dateAdapter={DateAdapter}>
						<MobileDatePicker
							label="DOB"
							inputFormat="DD/MM/YYYY"
							value={date}
							onChange={handleDateChange}
							renderInput={(params) => (
								<TextField
									className={classes.date}
									variant="standard"
									{...params}
								/>
							)}
						/>
					</LocalizationProvider>
				</Grid>
				<Grid item md={2} lg={2} xl={2}></Grid>
				<Grid item md={2} lg={2} xl={2}></Grid>
				<Grid item xs={12} sm={12} md={4} lg={4}>
					<TextField
						fullWidth
						id="standard-search"
						label="Phone Number"
						value={phone}
						name="phone"
						onChange={onChange}
						variant="standard"
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={4} lg={4}>
					<TextField
						fullWidth
						id="standard-search"
						label="Email"
						value={email}
						name="email"
						onChange={onChange}
						variant="standard"
					/>
				</Grid>
				<Grid item md={2} lg={2} xl={2}></Grid>
				<Grid item md={2} lg={2} xl={2}></Grid>
				<Grid item xs={12} sm={12} md={8} lg={8}>
					{/* <TextField
						fullWidth
						multiline
						id="outlined-textarea"
						label="Tell us about your event"
						rows={4}
					/> */}
				</Grid>
				<Grid item md={2} lg={2} xl={2}></Grid>
				<Grid item md={2} lg={2} xl={2}></Grid>
				<Grid item xs={12} sm={12} md={4} lg={4}>
					<Box className={classes.button}>
						<Button
							size="large"
							variant="text"
							onClick={() => setprofile(initialState)}
						>
							Cancel
						</Button>
						<Button size="large" variant="contained" onClick={onSubmit}>
							Confirm
						</Button>
					</Box>
				</Grid>
				<Grid item xs={12} sm={12} md={4} lg={4}></Grid>
				<Grid item md={2} lg={2} xl={2}></Grid>
			</Grid>
		</>
	);
};

export default PersonalInformation;
