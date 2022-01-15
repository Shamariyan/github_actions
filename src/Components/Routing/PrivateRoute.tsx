import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { State } from '../../store';

const PrivateRoute = ({
	children,
	path,
	exact,
}: {
	children: JSX.Element;
	path: string;
	exact: boolean;
}) => {
	const auth = useSelector((state: State) => state.auth.isAuthenticated);
	const loading = useSelector((state: State) => state.auth.loading);
	const isAuthenticated = auth === null ? false : true;

	return (
		<Route
			exact={exact}
			path={path}
			render={({ location }) =>
				isAuthenticated && !loading ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/',
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
