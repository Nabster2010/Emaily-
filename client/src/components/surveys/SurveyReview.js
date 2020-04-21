import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { FIELDS } from './formFields';
import { submit_survey } from '../../actions';
import { useHistory } from 'react-router-dom';
function SurveyReview({ setShowReview }) {
	const history = useHistory();
	const dispatch = useDispatch();
	const {
		surveyForm: { values },
	} = useSelector((state) => state.form);
	return (
		<div>
			<h4>Please Review Your Data</h4>

			{FIELDS.map((field) => {
				return (
					<div key={field.name}>
						<label>{field.name}</label> <div>{values[field.name]}</div>
					</div>
				);
			})}

			<button className='btn gray' onClick={() => setShowReview(false)}>
				back
			</button>
			<button
				onClick={() => dispatch(submit_survey(values, history))}
				className='btn waves-effect waves-light right green'
				type='submit'
			>
				Send Survey
				<i className='material-icons right'>email</i>
			</button>
		</div>
	);
}

SurveyReview.propTypes = {};

export default SurveyReview;
