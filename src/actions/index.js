import { pushPath } from 'redux-simple-router';
import base from '../firebase';



export const Actions = {
	LOCALSTORAGE : 'LOCALSTORAGE',
	FIREBASE     : 'FIREBASE',
	FILTER       : 'FILTER',
	RANDOMIZE    : 'RANDOMIZE',
	EDIT         : 'EDIT',
	SAVE_EDIT    : 'SAVE_EDIT',
	CLEAR_EDIT   : 'CLEAR_EDIT',
	EDIT_NEW     : 'EDIT_NEW',
	SAVE_NEW     : 'SAVE_NEW',
	CLEAR_NEW    : 'CLEAR_NEW',
	EXCLUDE      : 'EXCLUDE',
	SEARCH       : 'SEARCH'
};



export const snapshot = (state) => {

	return (dispatch) => {

		try {
			const newState = JSON.parse(state);
			const url = newState.routing.path;

			dispatch({
				type: '@@STATE',
				payload: newState
			});

			dispatch(pushPath(url));

		} catch (e) {
			// console.log(e);
		}
	};
};



export const filter = (filter) => {
	return {
		type: Actions.FILTER,
		payload: {
			filter
		}
	};
};



export const randomize = () => {

	return (dispatch, getState) => {

		let matchIds = Object.keys(getState().restaurants);

		// remove excluded IDs from the list
		matchIds = matchIds.filter(id => !getState().user.excluded[id]);

		// remove the IDs that don't match the user's filter settings
		const userFilter = getState().user.filter;

		matchIds = matchIds.filter((id) => {
			const restaurant = getState().restaurants[id];

			return (
				((userFilter.cheap)    ? restaurant.cheap    : true) &&
				((userFilter.fast)     ? restaurant.fast     : true) &&
				((userFilter.walkable) ? restaurant.walkable : true)
			);
		});

		// if we have more than 1 left, then remove the restaurant we selected last time as well
		// so the same option doesn't come up multiple times in a row
		if (matchIds.length > 1) {
			matchIds = matchIds.filter(id => id !== getState().user.random);
		}

		// if we have any matches left after all of that, then we randomize!
		let payload;

		if (matchIds.length > 0) {
			payload = { id: matchIds[Math.floor(Math.random() * matchIds.length)] };
		} else {
			payload = null;
		}

		dispatch({
			type: Actions.RANDOMIZE,
			payload
		});
	};
};



export const edit = (editData) => {
	return {
		type: Actions.EDIT,
		payload: editData
	};
};



export const clearEdit = () => {
	return {
		type: Actions.CLEAR_EDIT
	};
};



export const saveEdit = () => {

	return (dispatch, getState) => {
		const editData = getState().user.editing;
		let restaurantBase = base.child('restaurants/' + editData.id);

		restaurantBase.set(editData, (error) => {
			if (error) {
// 				dispatch({type: 'failed'});
			} else {
				dispatch(clearEdit());
			}
		});
	};
};



export const editNew = (newData) => {
	return {
		type: Actions.EDIT_NEW,
		payload: newData
	};
};



export const clearNew = () => {
	return {
		type: Actions.CLEAR_NEW
	};
};



export const saveNew = (newData) => {

	return (dispatch, getState) => {
		let restaurantBase = base.child('restaurants/');
		let newRestaurant = restaurantBase.push();

		newRestaurant.set({
			...getState().user.adding,
			...newData,
			id : newRestaurant.key()
		}, (error) => {
			if (error) {
// 				dispatch({type: 'failed'});
			} else {
				dispatch(clearNew());
			}
		});
	};
};



export const exclude = (data) => {
	// data = { [id]: true } or { [id]: false }
	return {
		type: Actions.EXCLUDE,
		payload: data
	};
};



export const search = (text) => {
	return {
		type: Actions.SEARCH,
		payload: text
	};
};
