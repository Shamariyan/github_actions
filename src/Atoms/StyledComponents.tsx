import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { grey } from '@mui/material/colors';

export const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.black, 0.1),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.black, 0.2),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'GrayText',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		[theme.breakpoints.up('md')]: {
			paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		},
		[theme.breakpoints.down('md')]: {
			paddingLeft: `calc(1em + ${theme.spacing(1)})`,
		},
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '20ch',
			'&:focus': {
				width: '25ch',
			},
		},
	},
}));

export const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
	color: grey[600],
	backgroundColor: grey[100],
	borderColor: grey[600],
	'&:hover': {
		color: theme.palette.primary.main,
		backgroundColor: grey[100],
		borderColor: theme.palette.primary.main,
	},
}));
