import {
	BrowserRouter as Router,
	Route,
	Switch,
	useRouteMatch,
} from 'react-router-dom';
import Cart from '../Pages/Cartpage';
import AddressInfo from './AddressInfo';
import PaymentInfo from './PaymentInfo';

const Breadcrumbs = () => {
	let { path, url } = useRouteMatch();

	return (
		<Router>
			<Switch>
				<Route exact path={path}>
					<Cart />
				</Route>
				<Route exact path={`${path}/:delivery-address`}>
					<AddressInfo />
				</Route>
				<Route exact path={`${path}/:payment-details`}>
					<PaymentInfo />
				</Route>
			</Switch>
		</Router>
	);
};

export default Breadcrumbs;
