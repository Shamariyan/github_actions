import FilterOptions from './FilterOptions';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

interface Prop {
	width: number;
	closeDrawer: any;
}

const FilterDrawer = (props: Prop) => {
	const { width, closeDrawer } = props;

	return (
		<Box width={width} role="presentation">
			<ListItemButton component="a" href="#customized-list">
				<FilterAltOutlinedIcon />
				<ListItemText
					sx={{ py: 1, px: 1 }}
					primary="Filters"
					primaryTypographyProps={{
						fontSize: 20,
						fontWeight: 'medium',
						letterSpacing: 0,
					}}
				/>
			</ListItemButton>
			<Divider />
			<FilterOptions />
			<Grid container sx={{ paddingTop: '5%' }}>
				<Grid sx={{ textAlign: 'center' }} item xs={6} sm={6}>
					<Button
						disableElevation={true}
						size="large"
						sx={{ minWidth: 100 }}
						color="info"
						variant="outlined"
						onClick={closeDrawer}
					>
						Cancel
					</Button>
				</Grid>
				<Grid sx={{ textAlign: 'center' }} item xs={6} sm={6}>
					<Button
						disableElevation={true}
						size="large"
						sx={{ minWidth: 100 }}
						color="primary"
						variant="contained"
						onClick={closeDrawer}
					>
						Apply
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

export default FilterDrawer;
