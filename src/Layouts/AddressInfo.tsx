import CheckoutSummary from './CheckoutSummary';
import DeliveryAddress from '../Components/DeliveryAddress';
import Grid from '@mui/material/Grid';
import { AddressBreadcrumb } from '../utils/Breadcrumb';

const AddressInfo = () => {
	return (
		<Grid container>
			<Grid
				sx={{
					paddingTop: {
						xs: '20%',
						sm: '20%',
						md: '10%',
						lg: '8%',
						xl: '8%',
					},
					paddingLeft: {
						xs: '1%',
						sm: '1%',
						md: '3%',
						lg: '5%',
						xl: '5%',
					},
					paddingRight: { xs: '1%', sm: '1%', md: '3%', lg: '5%', xl: '5%' },
				}}
				item
				xs={12}
				sm={12}
				md={7}
				lg={7}
				xl={7}
			>
				<AddressBreadcrumb />
				<DeliveryAddress />
			</Grid>
			<Grid
				sx={{
					paddingTop: '10%',
					paddingLeft: {
						xs: '1%',
						sm: '1%',
						md: '3%',
						lg: '5%',
						xl: '5%',
					},
					height: {
						lg: window.innerHeight,
						xl: window.innerHeight,
					},
					position: {
						lg: 'relative',
						xl: 'relative',
					},
					overflowY: {
						lg: 'scroll',
						xl: 'scroll',
					},
					overflowX: 'hidden',
					paddingRight: { xs: '1%', sm: '1%', md: '3%', lg: '5%', xl: '5%' },
				}}
				item
				xs={12}
				sm={12}
				md={5}
				lg={5}
				xl={5}
			>
				<CheckoutSummary />
			</Grid>
		</Grid>
	);
};

export default AddressInfo;
