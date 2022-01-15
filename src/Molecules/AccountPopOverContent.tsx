import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import { AccountPopOverProps } from '../Components/AccountPopOver';
import {
	AccountHeading,
	LoggedInAccountModalItem,
} from './AccountModalComponents';

interface AccountPopOverContentProps {
	prop: AccountPopOverProps;
	classes: any;
	user: any;
	userOptions: any[];
	logOut: any;
	changeLoginModal: any;
	id: any;
}

const AccountPopOverContent = (props: AccountPopOverContentProps) => {
	const { prop, classes, user, userOptions, logOut, changeLoginModal, id } =
		props;
	return (
		<Paper elevation={3} sx={{ py: 3, px: 2 }}>
			<AccountHeading
				isLoggedIn={prop.isLoggedIn}
				classes={classes}
				user={user}
			/>
			<Divider />
			{prop.isLoggedIn ? (
				<Box>
					{userOptions.map((item, index) => {
						return (
							<LoggedInAccountModalItem
								key={item}
								item={item}
								classes={classes}
								logOut={logOut}
								closeDrawer={prop.closeDrawer}
								handlePopClose={prop.handlePopClose}
							/>
						);
					})}
				</Box>
			) : (
				<Box>
					<Button
						fullWidth
						aria-describedby={id}
						variant="contained"
						className={classes.loginbtn}
						onClick={(e) => {
							prop.handlePopClose(e, 'backdropClick');
							changeLoginModal(true);
						}}
					>
						LOGIN
					</Button>
				</Box>
			)}
		</Paper>
	);
};

export default AccountPopOverContent;
