import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import SurveyItem from './surveys/SurveyItem';
import { useDispatch, useSelector } from 'react-redux';
import { getSurveys } from '../actions';
const Dashboard = () => {
	const surveys = useSelector((state) => state.survey);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getSurveys());
	}, []);

	return (
		<Fragment>
			{surveys.length ? (
				surveys.map((survey) => <SurveyItem key={survey._id} survey={survey} />)
			) : (
				<div>No Surveys</div>
			)}
			<div className='fixed-action-btn'>
				<Link to='/surveys/new' className='btn-floating btn-large red'>
					<i className='large material-icons'>add</i>
				</Link>
			</div>
		</Fragment>
	);
};

export default Dashboard;
