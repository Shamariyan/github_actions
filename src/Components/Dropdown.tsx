import { KeyboardArrowDownRounded } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { productsActionCreators } from '../store';

export default function PositionedMenu(props: any) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const dispatch = useDispatch();
	const history = useHistory();
	const { getFilteredProducts } = bindActionCreators(
		productsActionCreators,
		dispatch
	);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const dropdownItems = (obj: any) => {
		let arr = obj.types;
		return arr.map((item: string) => {
			return (
				<MenuItem
					key={item}
					onClick={() => {
						getFilteredProducts(item.toLowerCase());
						history.push(`/search/${item}`);
					}}
				>
					{item}
				</MenuItem>
			);
		});
	};
	return (
		<div>
			<Button
				sx={{
					color: 'black',
					display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex' },
					':hover': {
						backgroundColor: 'transparent',
						color: 'darkgrey',
					},
				}}
				id="demo-positioned-button"
				aria-controls="demo-positioned-menu"
				aria-haspopup="true"
				disableTouchRipple={true}
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				endIcon={<KeyboardArrowDownRounded color="inherit" />}
			>
				{props.name}
			</Button>
			<Menu
				id="demo-positioned-menu"
				aria-labelledby="demo-positioned-button"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				disableAutoFocusItem
			>
				{dropdownItems(props.obj)}
			</Menu>
		</div>
	);
}
