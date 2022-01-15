import Navbar from './Layouts/Navbar';
import Homepage from './Pages/Homepage';
import Productpage from './Pages/Productpage';
import Searchpage from './Pages/Searchpage';
import '@fontsource/plus-jakarta-sans';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './store/reducers/index';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	createTheme,
	responsiveFontSizes,
	ThemeProvider,
} from '@mui/material/styles';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './store/actions/auth';
import ProfilePage from './Pages/ProfilePage';
import PreviousOrdersPage from './Pages/PreviousOrdersPage';
import PrivateRoute from './Components/Routing/PrivateRoute';
import Cart from './Pages/Cartpage';
import AddressInfo from './Layouts/AddressInfo';
import PaymentInfo from './Layouts/PaymentInfo';
import { SnackbarProvider } from 'notistack';
import AddAddressPage from './Pages/AddAddressPage';
import PreviousOrderItems from './Components/PreviousOrderItems';
import PreviousOrders from './Components/PreviousOrders';
import OrderModal2 from './Components/OrderModal2';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}
const store = createStore(
	reducers,
	composeWithDevTools(applyMiddleware(thunk))
);

let theme = createTheme({
	palette: {
		primary: {
			main: '#de3838',
		},
		info: {
			main: '#54545b',
		},
		secondary: {
			main: '#232323',
		},
		warning: {
			main: '#EFEFF0',
		},
		neutral: {
			main: '#2f2f2f',
		},
		success: {
			main: '#2e7d32',
		},
	},
	shape: {
		borderRadius: 1,
	},
	typography: {
		fontFamily: ['Plus Jakarta Sans', 'sans-serif'].join(','),
		button: {
			textTransform: 'none',
		},
	},
});
theme = responsiveFontSizes(theme);

const App = () => {
	useEffect(() => {
		store.dispatch<any>(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<ThemeProvider theme={theme}>
					<SnackbarProvider maxSnack={3} preventDuplicate hideIconVariant>
						<CssBaseline />
						<header>
							<Navbar />
						</header>
						<main>
							<Switch>
								<Route exact path="/">
									<Homepage />
								</Route>
								<Route exact path="/search/:term">
									<Searchpage />
								</Route>
								<Route exact path="/product/:id">
									<Productpage />
								</Route>
								<PrivateRoute exact path="/checkout">
									<Cart />
								</PrivateRoute>
								<PrivateRoute exact path="/delivery-address">
									<AddressInfo />
								</PrivateRoute>
								<PrivateRoute exact path="/payment-details">
									<PaymentInfo />
								</PrivateRoute>
								<PrivateRoute exact path="/profile">
									<ProfilePage />
								</PrivateRoute>
								<PrivateRoute exact path="/orders">
									<PreviousOrdersPage />
								</PrivateRoute>
								<PrivateRoute exact path="/address">
									<AddAddressPage />
								</PrivateRoute>
							</Switch>
						</main>
						{/* 404 route */}
						{/* <Route path="*">
								<div style={{ marginTop: '10%' }}>404 no match found</div>
							</Route> */}
					</SnackbarProvider>
				</ThemeProvider>
			</Router>
		</Provider>
	);
};

export default App;
