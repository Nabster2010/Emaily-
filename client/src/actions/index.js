import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './Types';

export const fetchUser = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/current_user');
		dispatch({
			type: FETCH_USER,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
	}
};
export const handleToken = (token) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.post('/api/stripe', token, config);
		dispatch({
			type: FETCH_USER,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
	}
};

export const submit_survey = (values, history) => async (dispatch) => {
	const res = await axios.post('/api/surveys', values);
	dispatch({
		type: FETCH_USER,
		payload: res.data,
	});
	history.push('/surveys');
};

export const getSurveys = () => async (dispatch) => {
	const res = await axios.get('/api/surveys');
	dispatch({
		type: FETCH_SURVEYS,
		payload: res.data.reverse(),
	});
};
