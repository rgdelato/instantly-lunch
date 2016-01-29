import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import { Actions } from '../actions/index';



const filter = (state = { cheap: false, fast: false, walkable: true }, action) => {
	switch (action.type) {
		case Actions.FILTER:
			return {
				...state,
				...action.payload.filter
			};
		default:
			return state;
	}
};

const editing = (state = {}, action) => {
	switch (action.type) {
		case Actions.EDIT:
			return (action.payload) ? { ...state, ...action.payload } : action.payload;
		case Actions.CLEAR_EDIT:
			return {};
		default:
			return state;
	}
};

const adding = (state = {}, action) => {
	switch (action.type) {
		case Actions.EDIT_NEW:
			return (action.payload) ? { ...state, ...action.payload } : action.payload;
		case Actions.CLEAR_NEW:
			return {};
		default:
			return state;
	}
};

const excluded = (state = {}, action) => {
	switch (action.type) {
		case Actions.EXCLUDE:
			return {
				...state,
				...action.payload
			};
		default:
			return state;
	}
};

const user = (state = {}, action) => {
	switch (action.type) {
		case Actions.LOCALSTORAGE:
			return {
				filter   : action.payload.user.filter,
				editing  : action.payload.user.editing,
				adding   : action.payload.user.adding,
				excluded : action.payload.user.excluded
			};
		default:
			return combineReducers({
				filter,
				editing,
				adding,
				excluded
			})(state, action);
	}
};



const random = (state = null, action) => {
	switch (action.type) {
		case Actions.RANDOMIZE:
			return (action.payload) ? action.payload.id : action.payload;
		default:
			return state;
	}
};



const search = (state = '', action) => {
	switch (action.type) {
		case Actions.SEARCH:
			return action.payload;
		default:
			return state;
	}
};



const restaurants = (state = {}, action) => {
	switch (action.type) {
		case Actions.FIREBASE:
		case Actions.LOCALSTORAGE:
			return action.payload.restaurants || state;
		default:
			return state;
	}
};



export default (state = {}, action) => {
	switch (action.type) {
		case '@@STATE':
			return action.payload;
		default:
			return combineReducers({
				user,
				random,
				search,
				restaurants,
				routing: routeReducer
			})(state, action);
	}
};
