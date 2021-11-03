import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ROUTES, PRIVATE_ROUTES, PRIVATE_ROUTES_ADMIN, PRIVATE_ROUTES_MANAGER } from './routes';
import Header from './components/header';
import { useSelector } from 'react-redux';

function App() {

	const token = useSelector(auth => auth.Auth.accessToken);

	const role = useSelector(auth => auth.Auth.info.role)

	const isLoggedIn = () => {
		return token !== "";
	}

	return (
		<Router>
			<div className="bg-gray-50 h-screen">
				<Header />
				<div>
					<div className="w-full h-full">
						<Switch>
							{
								showRotesPublic(ROUTES)
							}
							{
								showRotesPrivate(PRIVATE_ROUTES, isLoggedIn())
							}
							{
								showRotesPrivateAdmin(PRIVATE_ROUTES_ADMIN, isLoggedIn(), role)
							}
							{
								showRotesPrivateMANAGER(PRIVATE_ROUTES_MANAGER, isLoggedIn(), role)
							}
						</Switch>
					</div>
				</div>
			</div>
		</Router>
	)
}

const showRotesPrivateAdmin = (routes, isLoggedIn, role) => {
	var result = null;
	if (routes.length > 0) {
		result = routes.map((route, index) => {
			return (<Route
				key={index}
				path={route.path}
				exact
				render={props => (isLoggedIn && role === "ADMIN") ? <route.main {...props} /> :
					<Redirect to={{
						pathname: '/',
						state: { from: props.location }
					}} />}
			/>)

		})
	}
	return result;
}

const showRotesPrivateMANAGER = (routes, isLoggedIn, role) => {
	var result = null;
	if (routes.length > 0) {
		result = routes.map((route, index) => {
			return (<Route
				key={index}
				path={route.path}
				exact
				render={props => (isLoggedIn && role === "MANAGER") ? <route.main {...props} /> :
					<Redirect to={{
						pathname: '/',
						state: { from: props.location }
					}} />}
			/>)

		})
	}
	return result;
}

const showRotesPrivate = (routes, isLoggedIn) => {
	var result = null;
	if (routes.length > 0) {
		result = routes.map((route, index) => {
			return (<Route
				key={index}
				path={route.path}
				exact
				render={props => isLoggedIn ? <route.main {...props} /> :
					<Redirect to={{
						pathname: '/login',
						state: { from: props.location }
					}} />}
			/>)

		})
	}
	return result;
}


const showRotesPublic = (routes) => {
	var result = null;
	if (routes.length > 0) {
		result = routes.map((route, index) => {
			return (<Route
				key={index}
				path={route.path}
				exact={route.exact}
				render={props => <route.main {...props} />}
			/>)

		})
	}
	return result;
}

export default App;
