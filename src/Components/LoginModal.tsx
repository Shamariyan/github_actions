import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Grid, Paper, TextField } from '@mui/material';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { alertActionCreators, authActionCreators, State } from '../store';

const useStyles = makeStyles({
	heading: {
		fontWeight: 'bold',
		fontSize: 24,
		marginTop: '2.5%',
		textAlign: 'left',
		marginBottom: '2.5%',
	},
});

const style = {
	position: 'absolute' as 'absolute',
	top: '40%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 300,
	bgcolor: 'background.paper',
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
};

const LoginModal = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [open, setOpen] = React.useState(false);
	const [otpModal, setotpModal] = React.useState(false);
	const [phoneNumber, setphoneNumber] = React.useState('');

	const auth = useSelector((state: State) => state.auth);
	const isLoginModalOpen = auth.isLoginModalOpen;

	const { sendOtp, changeLoginModal } = bindActionCreators(
		authActionCreators,
		dispatch
	);
	const { setAlert } = bindActionCreators(alertActionCreators, dispatch);

	useEffect(() => {
		if (isLoginModalOpen === true) {
			handleOpen();
			return;
		}
	}, [isLoginModalOpen]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setphoneNumber(event.target.value);
	};

	const handleotp = () => {
		if (phoneNumber.length === 10) {
			sendOtp(phoneNumber);
			setotpModal(true);
			handleClose();
			return;
		} else {
			setAlert('Enter a Valid mobile number', 'error');
		}
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		changeLoginModal(false);
		setOpen(false);
	};

	const goBackHandler = () => {
		setotpModal(false);
		setOpen(true);
	};

	return (
		<React.Fragment>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
			>
				<Grid container>
					<Paper sx={{ ...style, maxWidth: 500 }}>
						<Grid item xs={12} lg={12}>
							<Box className={classes.heading}>Login</Box>
							<TextField
								fullWidth
								id="phone"
								value={phoneNumber}
								label="Enter your Mobile number"
								onChange={handleChange}
								variant="standard"
								InputProps={{
									startAdornment: `+91  `,
								}}
							/>
						</Grid>
						<Grid
							sx={{
								paddingTop: 5,
							}}
							item
							xs={12}
							lg={12}
						>
							<Button
								fullWidth
								size="large"
								variant="contained"
								onClick={handleotp}
							>
								Send OTP
							</Button>
						</Grid>
					</Paper>
				</Grid>
			</Modal>
			<Otpmodal
				open={otpModal}
				phoneNumber={phoneNumber}
				setotpModal={setotpModal}
				goBack={goBackHandler}
			/>
		</React.Fragment>
	);
};

const Otpmodal = ({ open, phoneNumber, setotpModal, goBack }: any) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { verifyOtp } = bindActionCreators(authActionCreators, dispatch);
	const { setAlert } = bindActionCreators(alertActionCreators, dispatch);

	const auth = useSelector((state: State) => state.auth);
	const [ModalOpen, setModalOpen] = React.useState(false);
	const [Otp, setOtp] = React.useState('');

	useEffect(() => {
		if (open === true && auth.isAuthenticated === null) {
			setModalOpen(true);
			return;
		} else {
		}
	}, [open]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setOtp(event.target.value);
	};

	const goBackHandler = () => {
		goBack();
		setModalOpen(false);
	};

	const otpVerified = () => {
		if (Otp.length === 6) {
			verifyOtp(phoneNumber, Otp);
			setotpModal(false);
			setModalOpen(false);
			return;
		} else {
			setAlert('Enter a valid OTP', 'error');
		}
	};
	return (
		<React.Fragment>
			<Modal
				open={ModalOpen}
				onClose={otpVerified}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
			>
				<Grid container>
					<Paper sx={{ ...style, maxWidth: 500 }}>
						<Grid item xs={12} lg={12}>
							<Box className={classes.heading}>Verify your number</Box>
							<TextField
								fullWidth
								id="phone"
								sx={{ textAlign: 'center', alignItems: 'center' }}
								label={`Enter the 6-digit OTP`}
								helperText={`OTP sent to +91${phoneNumber}`}
								inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
								value={Otp}
								onChange={handleChange}
								variant="standard"
							/>
						</Grid>
						<Grid
							sx={{
								paddingTop: 5,
							}}
							item
							xs={12}
							lg={12}
						>
							<Button
								fullWidth
								size="large"
								variant="contained"
								onClick={otpVerified}
							>
								Login
							</Button>
							<Button fullWidth size="small" sx={{ my: 1 }} variant="text">
								Resend OTP
							</Button>
							<Button
								fullWidth
								size="small"
								variant="text"
								onClick={goBackHandler}
							>
								Wrong number? Go Back
							</Button>
						</Grid>
					</Paper>
				</Grid>
			</Modal>
		</React.Fragment>
	);
};

export default LoginModal;
