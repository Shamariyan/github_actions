import CategoryActionCard from './CategoryActionCard';
import { makeStyles } from '@material-ui/core';
import { Box, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';

const useStyles = makeStyles((theme) => {
	return {
		card: {
			display: 'flex',

			justifyContent: 'center',
		},
		grid: {
			display: 'inline-flex',
			flexDirection: 'row',
			flexWrap: 'wrap',
			justifyContent: 'space-between',
		},
		box: {
			width: '100%',
			[theme.breakpoints.down('md')]: {
				padding: '2%',
			},
			[theme.breakpoints.up('md')]: {
				padding: '2%',
				color: 'white',
			},
			justifyContent: 'center',
		},
	};
});

const CategoryCards = () => {
	const classes = useStyles();

	const gridCreator = () => {
		let arr = ['Fresh Cream', 'Butter Cream', 'Birthday', 'Anniversary'];
		let array = [
			{
				name: 'Fresh Cream',
				link: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
			},
			{
				name: 'Butter Cream',
				link: 'https://images.unsplash.com/photo-1586985289906-406988974504?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
			},
			{
				name: 'Birthday',
				link: 'https://images.unsplash.com/photo-1545696563-af8f6ec2295a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80',
			},
			{
				name: 'Anniversary',
				link: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
			},
		];

		return array.map((value) => (
			<Grid key={value.name} item xs={6} sm={4} md={4} lg={3} xl={3}>
				<Box className={classes.card}>
					<CategoryActionCard item={value} />
				</Box>
			</Grid>
		));
	};

	return (
		<Paper className={classes.box} elevation={1}>
			<Grid
				container
				className={classes.grid}
				justifyContent="center"
				alignItems="center"
				spacing={{ xs: 4, sm: 4, md: 10, lg: 10, xl: 10 }}
				columns={12}
			>
				{gridCreator()}
			</Grid>
		</Paper>
	);
};

export default CategoryCards;
