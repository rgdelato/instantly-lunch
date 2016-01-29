import React, { Component } from 'react';



export default class RestaurantSearch extends Component {
	render () {
		const { searchText, onSearch } = this.props;
		
		return (
			<div className="restaurant-search">
				<input type="text" placeholder="Search..." value={searchText} onChange={(e) => {onSearch(e.target.value)}} />
			</div>
		);
	}
};
