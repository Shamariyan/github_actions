import Popover from '@mui/material/Popover';
import LoginModal from './LoginModal';
import { bindActionCreators } from 'redux';
import { authActionCreators, State } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import AccountPopOverContent from '../Molecules/AccountPopOverContent';

export interface AccountPopOverProps {
	opn: any;
	anchorEl: Element | ((element: Element) => Element) | null | undefined;
	handlePopClose: (
		event: {},
		reason: 'backdropClick' | 'escapeKeyDown'
	) => void;
	isLoggedIn: any;
	closeDrawer: any;
}

const useStyles = makeStyles((theme) => {
	return {
		welcomeText: {
			fontWeight: 'bold',
			fontSize: 16,
			marginTop: '2.5%',
			marginBottom: '2.5%',
		},
		subHeading: {
			fontSize: 10,
			color: 'grey',
			marginBottom: '5%',
		},
		link: {
			width: '100%',
			textDecoration: 'none',
			color: 'inherit',
		},
		loginbtn: { minWidth: '200px' },
	};
});

const AccountPopOver = (props: AccountPopOverProps) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const userOptions = ['Personal Information', 'Order history', 'Logout'];
	const user = useSelector((state: State) => state.auth.user);
	const { logOut, changeLoginModal } = bindActionCreators(
		authActionCreators,
		dispatch
	);

	const opn = props.opn;
	const id = opn ? 'simple-popover' : undefined;

	return (
		<>
			<Popover
				id={id}
				open={opn}
				anchorEl={props.anchorEl}
				onClose={props.handlePopClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<AccountPopOverContent
					prop={props}
					classes={classes}
					user={user}
					userOptions={userOptions}
					logOut={logOut}
					changeLoginModal={changeLoginModal}
					id={id}
				/>
			</Popover>
			<LoginModal />
		</>
	);
};

export default AccountPopOver;
