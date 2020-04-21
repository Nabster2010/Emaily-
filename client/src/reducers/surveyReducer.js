import { FETCH_SURVEYS } from '../actions/Types';

export default function (state = [], action) {
	switch (action.type) {
		case FETCH_SURVEYS:
			return action.payload || false;
		default:
			return state;
	}
}
