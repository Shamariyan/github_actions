import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { bindActionCreators } from 'redux';
import { alertActionCreators, authActionCreators, State } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import AlertComponent from './AlertComponent';

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

const AddressBook = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = useSelector((state: State) => state.auth.user);
	const { addAddress } = bindActionCreators(authActionCreators, dispatch);
	const { setAlert } = bindActionCreators(alertActionCreators, dispatch);

	const events = [
		{
			value: 'Birthday',
			label: 'Birthday',
		},
		{
			value: 'Anniversary',
			label: 'Anniversary',
		},
		{
			value: 'Wedding',
			label: 'Wedding',
		},
		{
			value: 'Corporate celebration',
			label: 'Corporate celebration',
		},
		{
			value: 'Others',
			label: 'Others',
		},
	];

	// This part is to include autofill of address later on.
	// const initialState = {
	// 	name: user.userName ? user.userName : '',
	// 	email: user.emailId ? user.emailId : '',
	// 	phoneNumber: user.phoneNumber ? user.phoneNumber : '',
	// };

	const initialState = {
		name: '',
		phoneNumber: '',
		address: '',
		pinCode: '',
	};

	const [addressObj, setaddressObj] = useState(initialState);

	const { name, address, pinCode, phoneNumber } = addressObj;

	const onChange = (e: { target: { name: any; value: any } }) => {
		setaddressObj({ ...addressObj, [e.target.name]: e.target.value });
	};

	const bool =
		name == '' ||
		name.length < 3 ||
		address.length < 15 ||
		pinCode.length != 6 ||
		phoneNumber.length < 10;

	const onSubmit = () => {
		if (!bool) {
			addAddress(addressObj);
			return;
		}
		setAlert('Please enter valid details to continue', 'error');
	};

	return (
		<>
			<AlertComponent />
			<Grid
				container
				rowSpacing={{ xs: 3, sm: 3, md: 5, lg: 5, xl: 5 }}
				columnSpacing={{ xs: 0, sm: 2, md: 3 }}
				justifyContent="center"
			>
				<Grid item md={2} lg={2} xl={2}></Grid>
				<Grid item xs={12} sm={12} md={4} lg={4}>
					<Box className={classes.heading}> Add a new address</Box>
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
					<TextField
						fullWidth
						id="standard-search"
						label="Phone Number"
						value={phoneNumber}
						name="phoneNumber"
						onChange={onChange}
						variant="standard"
					/>
				</Grid>
				<Grid item md={2} lg={2} xl={2}></Grid>
				<Grid item md={2} lg={2} xl={2}></Grid>
				<Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
					<TextField
						fullWidth
						id="standard-search"
						label="Full address"
						value={address}
						name="address"
						onChange={onChange}
						variant="standard"
					/>
				</Grid>
				<Grid item md={2} lg={2} xl={2}></Grid>
				<Grid item md={2} lg={2} xl={2}></Grid>
				<Grid item xs={12} sm={12} md={4} lg={4}>
					<TextField
						fullWidth
						id="standard-search"
						label="Pin Code"
						value={pinCode}
						name="pinCode"
						onChange={onChange}
						variant="standard"
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={4} lg={4}></Grid>
				<Grid item md={2} lg={2} xl={2}></Grid>
				<Grid item md={2} lg={2} xl={2}></Grid>
				<Grid item xs={12} sm={12} md={4} lg={4}>
					<Box className={classes.button}>
						<Button
							size="large"
							variant="text"
							onClick={() => setaddressObj(initialState)}
						>
							Cancel
						</Button>
						<Button size="large" variant="contained" onClick={onSubmit}>
							Add address
						</Button>
					</Box>
				</Grid>
				<Grid item xs={12} sm={12} md={4} lg={4}></Grid>
				<Grid item md={2} lg={2} xl={2}></Grid>
			</Grid>
		</>
	);
};

export default AddressBook;
