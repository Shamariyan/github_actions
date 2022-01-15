import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Link as Lk, useRouteMatch } from 'react-router-dom';

export const CartBreadcrumb = () => {
	let { path, url } = useRouteMatch();

	return (
		<div>
			<Breadcrumbs separator="›" aria-label="breadcrumb">
				<Lk style={{ textDecoration: 'none', color: 'black' }} to="/checkout">
					Cart
				</Lk>
				<Typography>Delivery Address</Typography>
				<Typography>Payment</Typography>
			</Breadcrumbs>
		</div>
	);
};

export const AddressBreadcrumb = () => {
	return (
		<div>
			<Breadcrumbs separator="›" aria-label="breadcrumb">
				<Lk style={{ textDecoration: 'none', color: 'black' }} to="/checkout">
					Cart
				</Lk>
				<Lk
					style={{ textDecoration: 'none', color: 'black' }}
					to="/delivery-address"
				>
					Delivery Address
				</Lk>
				<Typography>Payment</Typography>
			</Breadcrumbs>
		</div>
	);
};

export const PaymentBreadcrumb = () => {
	return (
		<div>
			<Breadcrumbs separator="›" aria-label="breadcrumb">
				<Lk style={{ textDecoration: 'none', color: 'black' }} to="/checkout">
					Cart
				</Lk>
				<Lk
					style={{ textDecoration: 'none', color: 'black' }}
					to="/delivery-address"
				>
					Delivery Address
				</Lk>
				<Lk
					style={{ textDecoration: 'none', color: 'black' }}
					to="/payment-details"
				>
					Payment
				</Lk>
			</Breadcrumbs>
		</div>
	);
};
