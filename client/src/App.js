import React, { Fragment, useEffect } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from './components/Header';
import { fetchUser } from './actions';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import SurveyNew from './components/surveys/SurveyNew';

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchUser());
	}, []);
	return (
		<div className='container'>
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
