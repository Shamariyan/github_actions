import { useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { alertActionCreators, State } from '../store';
import Slide, { SlideProps } from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useSnackbar, VariantType } from 'notistack';
import { bindActionCreators } from 'redux';

const AlertComponent = () => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(true);
	const alerts = useSelector((state: State) => state.alert);
	const { removeAlert } = bindActionCreators(alertActionCreators, dispatch);

	function SlideTransition(props: SlideProps) {
		return <Slide {...props} direction="down" />;
	}

	const handleClose = (id: number) => {
		removeAlert(id);
	};

	if (alerts.length > 0) {
		return (
			<>
				{alerts.map((alert) => (
					<div key={alert.id}>
						<Snackbar
							open={open}
							color={alert.alertType}
							autoHideDuration={5000}
							TransitionComponent={SlideTransition}
						>
							<Alert
								severity={alert.alertType}
								variant="filled"
								sx={{ width: '100%' }}
								action={
									<IconButton
										aria-label="close"
										color="inherit"
										size="small"
										sx={{ p: 0.5 }}
										onClick={() => handleClose(alert.id)}
									>
										<CloseIcon />
									</IconButton>
								}
							>
								{alert.msg}
							</Alert>
						</Snackbar>
					</div>
				))}
			</>
		);
	}
	return null;
};
export default AlertComponent;
