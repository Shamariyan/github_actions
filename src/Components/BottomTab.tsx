import FilterDrawer from './FilterDrawer';
import SortDrawer from './SortDrawer';
import { makeStyles } from '@material-ui/core';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Sort from '@mui/icons-material/Sort';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useState } from 'react';

const useStyles = makeStyles((theme) => {
	return {
		bottomnav: {
			position: 'fixed',
			bottom: 0,
			left: 0,
			right: 0,
			[theme.breakpoints.down('md')]: {
				display: 'block',
			},
			[theme.breakpoints.up('md')]: {
				display: 'none',
			},
		},
		btnContainer: {
			padding: '2.5%',
			textAlign: 'center',
		},
	};
});

const BottomTab = ({ handleSort }: { handleSort: any }) => {
	const classes = useStyles();
	const width = window.innerWidth;
	const [toggleMenu, settoggleMenu] = useState(false);
	const [sorttoggleMenu, setsorttoggleMenu] = useState(false);

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
		};

	const sorttoggleDrawer =
		(open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === 'keydown' &&
				((event as React.KeyboardEvent).key === 'Tab' ||
					(event as React.KeyboardEvent).key === 'Shift')
			) {
				return;
			}
			setsorttoggleMenu(open);
		};

	return (
		<Paper className={classes.bottomnav} elevation={3}>
			<SwipeableDrawer
				disableDiscovery={true}
				onOpen={toggleDrawer(true)}
				anchor="left"
				open={toggleMenu}
				onClose={toggleDrawer(false)}
			>
				<FilterDrawer width={width} closeDrawer={toggleDrawer(false)} />
			</SwipeableDrawer>
			<SwipeableDrawer
				disableDiscovery={true}
				disableSwipeToOpen={true}
				onOpen={sorttoggleDrawer(true)}
				elevation={5}
				anchor="bottom"
				open={sorttoggleMenu}
				onClose={sorttoggleDrawer(false)}
			>
				<SortDrawer
					sorttoggleDrawer={() => setsorttoggleMenu(false)}
					width={width}
					handleSort={handleSort}
				/>
			</SwipeableDrawer>
			<Grid container>
				<Grid className={classes.btnContainer} item xs={6} sm={6}>
					<Button
						disableElevation={true}
						size="large"
						sx={{ minWidth: 150 }}
						color="warning"
						variant="contained"
						startIcon={<FilterAltOutlinedIcon />}
						onClick={toggleDrawer(true)}
					>
						Filter
					</Button>
				</Grid>
				<Grid className={classes.btnContainer} item xs={6} sm={6}>
					<Button
						disableElevation={true}
						size="large"
						sx={{ minWidth: 150 }}
						color="warning"
						variant="contained"
						startIcon={<Sort />}
						onClick={sorttoggleDrawer(true)}
					>
						Sort
					</Button>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default BottomTab;
