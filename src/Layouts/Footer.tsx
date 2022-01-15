import { makeStyles } from '@material-ui/core';
import FacebookOutlined from '@mui/icons-material/FacebookOutlined';
import Instagram from '@mui/icons-material/Instagram';
import { Link } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const useStyles = makeStyles((theme) => {
	return {
		gridItem: {
			[theme.breakpoints.down('xl')]: {
				paddingLeft: '5%',
			},
		},
		main: {
			backgroundColor: '#e5e5e5',
			marginTop: '2.5%',
			paddingTop: '2.5%',
			// marginBottom: '2.5%',
		},
		div: {
			paddingTop: '2.5%',
			// paddingBottom: '2.5%',
			color: '',
		},
		social: {
			marginTop: '2.5%',
		},
		icons: {
			color: 'GrayText',
			'&:hover': {
				color: '#de3841',
			},
		},
	};
});

const supportLinks = (): any => {
	return [
		'Contact Us',
		'FAQs',
		'Cancellation & Refund',
		'Terms & Conditions',
	].map((item) => {
		return (
			<ListItem key={item} disablePadding>
				<ListItemButton>
					<ListItemText
						primary={item}
						primaryTypographyProps={{
							fontSize: 16,
							fontWeight: 'medium',
							letterSpacing: 0,
						}}
					/>
				</ListItemButton>
			</ListItem>
		);
	});
};

const Footer = () => {
	const classes = useStyles();

	return (
		<Box className={classes.main}>
			<Grid container>
				{/* Need to be added in the future */}
				{/* <Grid
					className={classes.gridItem}
					item
					xs={12}
					sm={12}
					md={6}
					lg={4}
					xl={4}
				>
					<ListItemText
						primary="Inside The Cake Point"
						primaryTypographyProps={{
							fontSize: 16,
							fontWeight: 'bold',
							letterSpacing: 0,
						}}
					/>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemText
								primary="Our Story"
								primaryTypographyProps={{
									fontSize: 16,
									fontWeight: 'medium',
									letterSpacing: 0,
								}}
							/>
						</ListItemButton>
					</ListItem>
				</Grid>
				<Grid
					className={classes.gridItem}
					item
					xs={12}
					sm={12}
					md={6}
					lg={4}
					xl={4}
				>
					<ListItemText
						primary="Help & Support"
						primaryTypographyProps={{
							fontSize: 16,
							fontWeight: 'bold',
							letterSpacing: 0,
						}}
					/>
					{supportLinks()}
				</Grid> */}
				<Grid
					className={classes.gridItem}
					item
					xs={12}
					sm={12}
					md={12}
					lg={12}
					xl={12}
				>
					<Box sx={{ display: 'flex', width: '100%', textAlign: 'center' }}>
						Made with love by {'   '}
						<a
							href="https://www.trustybytes.com"
							style={{ textDecoration: 'none', color: 'black', marginLeft: 2 }}
						>
							{'   '} Trusty Bytes
						</a>
					</Box>
					<Box className={classes.social}>
						<a
							href="https://www.instagram.com/wethecakepoint/"
							title="instagram"
							target="_blank"
							rel="noreferrer noopener"
							style={{ textDecoration: 'none', color: 'GrayText' }}
						>
							<Instagram sx={{ marginRight: 5 }} className={classes.icons} />
						</a>
						<Link
							href="https://www.facebook.com/WeTheCakePoint"
							title="facebook"
							target="_blank"
							rel="noreferrer noopener"
							style={{ textDecoration: 'none', color: 'inherit' }}
						>
							<FacebookOutlined className={classes.icons} />
						</Link>
					</Box>
				</Grid>
			</Grid>
			<Divider className={classes.div} />
		</Box>
	);
};

export default Footer;
