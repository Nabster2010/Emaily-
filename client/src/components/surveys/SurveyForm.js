import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import _ from 'lodash';
import validateEmails from '../../utils/validateEmails';
import { FIELDS } from './formFields';

const SurveyForm = ({ handleSubmit, setShowReview }) => {
	function renderFields() {
		return _.map(FIELDS, ({ label, name }, indx) => {
			return (
				<Field
					type='text'
					component={SurveyField}
					label={label}
					name={name}
					key={indx}
				/>
			);
		});
	}
	return (
		<div>
			<form
				onSubmit={handleSubmit((values) => {
					setShowReview(true);
				})}
			>
				{renderFields()}
				<Link to='/surveys' className='btn red'>
					Cancel{' '}
				</Link>
				<button
					className='btn waves-effect waves-light right blue'
					type='submit'
				>
					Next
					<i className='material-icons right'>done</i>
				</button>
			</form>
		</div>
	);
};
function validate(values) {
	const errors = {};
	errors.recipients = validateEmails(values.recipients || '');

	FIELDS.forEach(({ name }) => {
		if (!values[name]) {
			errors[name] = 'you must provide avalue';
		}
	});

	return errors;
}

export default reduxForm({
	form: 'surveyForm',
	destroyOnUnmount: false,
	validate,
})(SurveyForm);
