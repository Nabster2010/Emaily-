import { FETCH_USER } from '../actions/Types';

// const initialState = {
// 	user: null,
// 	loading: true,
// 	isAuthenticated: false,
// };

export default function (state = null, action) {
	switch (action.type) {
		case FETCH_USER:
			return action.payload || false;
		default:
			return state;
	}
}
