import React, { useState } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyReview';

const SurveyNew = () => {
	const [showReview, setShowReview] = useState(false);
	return (
		<div>
			{showReview ? (
				<SurveyReview setShowReview={setShowReview} />
			) : (
				<SurveyForm setShowReview={setShowReview} />
			)}
		</div>
	);
};

export default reduxForm({
	form: 'surveyForm',
})(SurveyNew);
