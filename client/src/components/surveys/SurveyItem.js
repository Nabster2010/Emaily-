import React from 'react';
import PropTypes from 'prop-types';

const SurveyItem = ({ survey }) => {
	return (
		<div className='card'>
			<div className='card-content'>
				<span className='card-title'>{survey.title}</span>
				<p>{survey.body}</p>
				<p className='rigth' style={{ textAlign: 'right' }}>
					sent on:{new Date(survey.dateSent).toLocaleString()}
				</p>
			</div>
			<div className='card-action'>
				<a href='#'>yes :{survey.yes}</a>
				<a href='#'>No :{survey.no}</a>
			</div>
		</div>
	);
};

SurveyItem.propTypes = {};

export default SurveyItem;
