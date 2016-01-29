require('./styles/styles.scss');

import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './reducers/index';

import base from './firebase';
import { Actions } from './actions/index';

import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { syncReduxAndRouter } from 'redux-simple-router';

import App from './components/App';
import RandomizerPage from './containers/RandomizerPage';
import RestaurantListPage from './components/RestaurantListPage';



// apply middleware/devtools to Redux
const createStoreWithMiddleware = compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : (f) => { return f; }
)(createStore);

// create store
let store = createStoreWithMiddleware(reducer);



// load initial data from localStorage
// const localStorageUserData = localStorage && localStorage.getItem('user');
// if (localStorageUserData) {
// 	store.dispatch({
// 		type: Actions.LOCALSTORAGE,
// 		payload: {
// 			user: JSON.parse(localStorageUserData)
// 		}
// 	});
// }



// save user data into localStorage when it changes
let currentUserState;
store.subscribe(function () {
	let previousUserState = currentUserState;
	currentUserState = store.getState().user;
	
	if (previousUserState !== currentUserState) {
		localStorage.setItem('user', JSON.stringify(currentUserState));
	}
});



// load initial/ongoing data from Firebase
base.child('restaurants').on('value', (snapshot) => {
	store.dispatch({
		type: Actions.FIREBASE,
		payload: {
			restaurants: snapshot.val()
		}
	});
});



// sync URL route with redux-simple-router
const history = createBrowserHistory();
syncReduxAndRouter(history, store);



// configure the routes
render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App} >
				<IndexRoute component={RandomizerPage} />
				<Route path="restaurants" component={RestaurantListPage} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);
