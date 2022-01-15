import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Close from '@material-ui/icons/Close';

interface CartCloseBtnComponentProps {
	wid: number;
	classes: any;
	deleteCartItem: any;
}

const CartCloseBtnComponent = (props: CartCloseBtnComponentProps) => {
	const { wid, classes, deleteCartItem } = props;

	return (
		<>
			{wid > 600 ? (
				<Link
					underline="hover"
					variant="body2"
					component="button"
					color="gray"
					className={classes.rightAlign}
					onClick={deleteCartItem}
				>
					Remove
				</Link>
			) : (
				<Box className={classes.rightAlign}>
					<IconButton
						size="small"
						className={classes.xbutton}
						aria-label="delete item"
						onClick={deleteCartItem}
					>
						<Close fontSize="small" color="disabled" />
					</IconButton>
				</Box>
			)}
		</>
	);
};

export default CartCloseBtnComponent;
