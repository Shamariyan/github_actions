import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import { Link } from 'react-router-dom';

interface AccountHeadingProps {
	isLoggedIn: boolean;
	classes: any;
	user: any;
}

interface LoggedInAccountModalItemProps {
	item: string;
	classes: any;
	logOut: any;
	closeDrawer: any;
	handlePopClose: any;
}

export const AccountHeading = (props: AccountHeadingProps) => {
	const { isLoggedIn, classes, user } = props;
	return (
		<>
			<Box className={classes.welcomeText}>
				{isLoggedIn
					? user && user.userName !== null && user.userName !== undefined
						? `Welcome, ${user.userName}`
						: `Welcome to The Cake Point`
					: `Welcome to The Cake Point`}
			</Box>
			<Box className={classes.subHeading}>Access and manage your account </Box>
			<Box className={classes.subHeading}>
				{isLoggedIn
					? user && user.phoneNumber !== null
						? `Logged in with ${user.phoneNumber}`
						: null
					: null}
			</Box>
		</>
	);
};

export const LoggedInAccountModalItem = (
	props: LoggedInAccountModalItemProps
) => {
	const { item, classes, logOut, closeDrawer, handlePopClose } = props;
	return (
		<Box
			component="div"
			onClick={(e: any) => handlePopClose(e, 'backdropClick')}
		>
			<Link
				to={
					item === 'Personal Information'
						? '/profile'
						: item === 'Order history'
						? '/orders'
						: ''
				}
				className={classes.link}
			>
				<ListItemButton
					onClick={() => {
						item === 'Logout' ? logOut() : null;
						closeDrawer();
					}}
				>
					{item}
				</ListItemButton>
			</Link>
		</Box>
	);
};
