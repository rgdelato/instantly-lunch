import React, { Component } from 'react';
import RestaurantList from '../containers/RestaurantList';
import RestaurantSearch from '../containers/RestaurantSearch';



export default class RestaurantListPage extends Component {
	render () {
		return (
			<div>
				<RestaurantSearch />
				<RestaurantList />
			</div>
		);
	}
};
