import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/PersonOutlineOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import Search from '@mui/icons-material/Search';

export const LoggedInCart = (props: { cartLength: number }) => {
	return (
		<IconButton
			size="large"
			edge="start"
			color="secondary"
			aria-label="open drawer"
			sx={{
				display: {
					xs: 'block',
					sm: 'block',
					md: 'block',
					lg: 'block',
				},
				ml: { xs: 2, sm: 1, md: 3, lg: 3 },

				':hover': {
					backgroundColor: 'transparent',
					color: 'darkgrey',
				},
			}}
		>
			<Badge badgeContent={props.cartLength} color="primary">
				<ShoppingCartOutlined fontSize="medium" />
			</Badge>
		</IconButton>
	);
};

export const LoggedOutCart = (props: any) => {
	return (
		<IconButton
			size="large"
			edge="start"
			color="secondary"
			aria-label="open drawer"
			onClick={props.onClick}
			sx={{
				display: { xs: 'block', sm: 'block', md: 'block', lg: 'block' },
				ml: { xs: 2, sm: 1, md: 3, lg: 3 },

				':hover': {
					backgroundColor: 'transparent',
					color: 'darkgrey',
				},
			}}
		>
			<ShoppingCartOutlined fontSize="medium" />
		</IconButton>
	);
};

export const AccountIcon = (props: {
	handlePopOpen: any;
	isAuthenticated: boolean;
	isNavbarIcon: boolean;
}) => {
	return (
		<IconButton
			size="large"
			edge="start"
			color="inherit"
			aria-label="open drawer"
			onClick={props.handlePopOpen}
			sx={{
				display: props.isNavbarIcon
					? { xs: 'none', sm: 'block', md: 'block', lg: 'block' }
					: 'block',
				ml: props.isNavbarIcon ? { sm: 1, md: 3, lg: 3 } : 0,
				mt:
					props.isAuthenticated && props.isNavbarIcon
						? { sm: 0.5, md: 1, lg: 1, xl: 1 }
						: 0,
				':hover': {
					backgroundColor: 'transparent',
					color: 'darkgrey',
				},
			}}
		>
			<PersonIcon fontSize="medium" />
		</IconButton>
	);
};

export const HamburgerMenu = (props: { onClick: any }) => {
	return (
		<IconButton
			size="large"
			edge="start"
			color="inherit"
			aria-label="open drawer"
			onClick={props.onClick}
			sx={{
				flexGrow: 1,
				display: {
					xs: 'block',
					sm: 'none',
					md: 'none',
					lg: 'none',
					xl: 'none',
				},
			}}
		>
			<MenuIcon fontSize="medium" />
		</IconButton>
	);
};

export const SearchIcon = () => {
	return (
		<Search
			sx={{
				color: '#232323',
			}}
		/>
	);
};
