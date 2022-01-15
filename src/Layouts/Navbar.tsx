import Svg from '../../assets/CakePoint-Logo.svg';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import SideDrawerContents from '../Molecules/SideDrawerContents';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import AccountPopOver from '../Components/AccountPopOver';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	alertActionCreators,
	authActionCreators,
	productsActionCreators,
	State,
} from '../store';
import {
	Search,
	SearchIconWrapper,
	StyledInputBase,
} from '../Atoms/StyledComponents';
import {
	AccountIcon,
	HamburgerMenu,
	LoggedInCart,
	LoggedOutCart,
	SearchIcon,
} from '../Atoms/Icons';

const useStyles = makeStyles((theme) => {
	return {
		appBar: {
			[theme.breakpoints.up('md')]: {
				paddingLeft: '3.5%',
				paddingRight: '3.5%',
			},
			[theme.breakpoints.only('md')]: {
				paddingLeft: '3.5%',
				paddingRight: '3.5%',
			},
			[theme.breakpoints.down('md')]: {
				paddingLeft: '0%',
				paddingRight: '0%',
			},
		},
		imageComponent: {
			borderRadius: 25,
			cursor: 'pointer',
			[theme.breakpoints.up('md')]: {
				marginRight: '1%',
				maxHeight: 45,
				maxWidth: 45,
			},
			[theme.breakpoints.down('md')]: {
				marginRight: '3%',
				maxHeight: 30,
				maxWidth: 30,
			},
		},
		nameComponent: {
			flexGrow: 1,
			[theme.breakpoints.up('sm')]: {
				display: 'block',
			},
			[theme.breakpoints.down('xs')]: {
				display: 'none',
			},
		},
		mobileSearchIcon: {
			paddingRight: 4,
			paddingLeft: 2,
			height: '100%',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
	};
});

const Navbar = () => {
	const width = window.innerWidth;
	const history = useHistory();
	const classes = useStyles();
	const dispatch = useDispatch();

	const auth = useSelector((state: State) => state.auth.isAuthenticated);
	const user = useSelector((state: State) => state.auth.user);
	const isAuthenticated = auth === null ? false : true;
	const cartItems = user !== null ? user.cartItems : [];

	const { setAlert } = bindActionCreators(alertActionCreators, dispatch);
	const { changeLoginModal } = bindActionCreators(authActionCreators, dispatch);
	const { getFilteredProducts } = bindActionCreators(
		productsActionCreators,
		dispatch
	);

	const [toggleMenu, settoggleMenu] = useState(false);
	const [searchTerm, setsearchTerm] = useState('');
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const opn = Boolean(anchorEl);

	const data = [
		{ label: 'Cakes', types: ['Fresh cream cake', 'Butter cream cake'] },
		// { label: 'Snacks', types: ['Snack 1', 'Snack 2', 'Snack 3', 'Snack 4'] },
		// { label: 'Bakery', types: ['Bread 1', 'Bread 2', 'Bread 3', 'Bread 4'] },
		// {
		// 	label: 'Sweet Bits',
		// 	types: ['Sweet 1', 'Sweet 2', 'Sweet 3', 'Sweet 4'],
		// },
	];

	const handlePopOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopClose = () => {
		setAnchorEl(null);
	};

	const handleKeypress = (e: any) => {
		getFilteredProducts(searchTerm);
		history.push(`/search/${searchTerm}`);
	};

	const toggleDrawer =
		(open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === 'keydown' &&
				((event as React.KeyboardEvent).key === 'Tab' ||
					(event as React.KeyboardEvent).key === 'Shift')
			) {
				return;
			}
			settoggleMenu(open);
			// setState({ ...state });
		};

	const closeDrawer = () => {
		settoggleMenu(false);
	};

	return (
		<Box sx={{ flexGrow: 1, margin: 0, width: '100%' }}>
			<AppBar position="fixed" color="inherit" className={classes.appBar}>
				<Toolbar>
					<HamburgerMenu onClick={toggleDrawer(true)} />
					<Drawer open={toggleMenu} onClose={toggleDrawer(false)}>
						<SideDrawerContents
							isAuthenticated={isAuthenticated}
							handlePopOpen={handlePopOpen}
							loginButtonClick={() => changeLoginModal(true)}
							categoryData={data}
							closeDrawer={closeDrawer}
						/>
					</Drawer>{' '}
					<Box
						component="img"
						className={classes.imageComponent}
						onClick={() => history.push('/')}
						alt="Logo"
						src={Svg}
					/>
					<Typography variant="h5" noWrap className={classes.nameComponent}>
						<Link
							to="/"
							style={{
								textDecoration: 'none',
								color: 'inherit',
							}}
						>
							The Cake Point
						</Link>
					</Typography>
					<>
						{/* Will be added in the future */}
						{/*	<Dropdown name="Cakes" obj={data[0]} />
						 <Dropdown name="Bakery" />
						<Dropdown name="Snacks" />
						<Dropdown name="Sweet bits" /> */}
					</>
					<Search>
						{width > 1000 ? (
							<SearchIconWrapper>
								<SearchIcon />
							</SearchIconWrapper>
						) : null}
						<StyledInputBase
							endAdornment={
								width < 1000 ? (
									<Box
										className={classes.mobileSearchIcon}
										onClick={(e) => searchTerm.length > 2 && handleKeypress(e)}
									>
										<SearchIcon />
									</Box>
								) : null
							}
							placeholder="Search..."
							inputProps={{ 'aria-label': 'search' }}
							onChange={(e) => setsearchTerm(e.target.value.toLowerCase())}
							onKeyPress={(e) => e.key === 'Enter' && handleKeypress(e)}
						/>
					</Search>
					<AccountIcon
						handlePopOpen={handlePopOpen}
						isAuthenticated={isAuthenticated}
						isNavbarIcon={true}
					/>
					<AccountPopOver
						opn={opn}
						handlePopClose={handlePopClose}
						anchorEl={anchorEl}
						isLoggedIn={isAuthenticated}
						closeDrawer={closeDrawer}
					/>
					{isAuthenticated ? (
						<Link to="/checkout">
							<LoggedInCart cartLength={cartItems.length} />
						</Link>
					) : (
						<LoggedOutCart
							onClick={() => {
								setAlert('Login to Continue', 'error');
								changeLoginModal(true);
							}}
						/>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;
