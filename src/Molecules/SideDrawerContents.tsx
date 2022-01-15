import Box from '@mui/material/Box';
import Svg from '../../assets/CakePoint-Logo.svg';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CategoriesList from '../Components/CategoriesList';
import { AccountIcon } from '../Atoms/Icons';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

interface SideDrawerProps {
	isAuthenticated: boolean;
	handlePopOpen: any;
	loginButtonClick: any;
	categoryData: any[];
	closeDrawer: any;
}

const useStyles = makeStyles(() => {
	return {
		mainBox: {
			width: 250,
		},
		listItem: {
			justifyContent: 'space-between',
		},
		name: {
			paddingLeft: 5,
		},
	};
});

const nameSpecialProp = {
	fontSize: 14,
	fontWeight: 'bold',
	letterSpacing: 0,
};

const SideDrawerContents = (props: SideDrawerProps) => {
	const history = useHistory();
	const classes = useStyles();

	return (
		<Box className={classes.mainBox} role="presentation">
			<ListItem className={classes.listItem} component="div">
				<Avatar alt={'Logo'} src={Svg} />
				<ListItemText
					className={classes.name}
					primary="The Cake Point"
					primaryTypographyProps={nameSpecialProp}
					onClick={() => {
						props.closeDrawer();
						history.push('/');
					}}
				/>
				{props.isAuthenticated ? (
					<Box>
						<AccountIcon
							handlePopOpen={props.handlePopOpen}
							isAuthenticated={props.isAuthenticated}
							isNavbarIcon={false}
						/>
					</Box>
				) : (
					<Button
						size="small"
						variant="outlined"
						color="secondary"
						onClick={props.loginButtonClick}
					>
						Login
					</Button>
				)}
			</ListItem>
			<CategoriesList
				data={props.categoryData}
				closeDrawer={props.closeDrawer}
			/>
		</Box>
	);
};

export default SideDrawerContents;
