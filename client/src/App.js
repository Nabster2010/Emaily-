import React, { Fragment, useEffect } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from './components/Header';
import { fetchUser } from './actions';
import { Landing } from './components/Landing';
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchUser());
	}, []);
	return (
		<div className='container' style={{ textAlign: 'center' }}>
			<BrowserRouter>
				<Fragment>
					<Header />
					<Route exact path='/' component={Landing} />
					<Route exact path='/surveys' component={Dashboard} />
					<Route exact path='/surveys/new' component={SurveyNew} />
				</Fragment>
			</BrowserRouter>
		</div>
	);
};

export default App;
