import React, { Component } from 'react';
import RestaurantForm from '../components/RestaurantForm';



export default class RestaurantAdd extends Component {
	render () {
		const { adding, onEditAdd, onSaveAdd, onClearAdd } = this.props;
		
		if (adding) {
			return (
				<RestaurantForm
					restaurant={{}}
					onEdit={onEditAdd}
					onSave={onSaveAdd}
					onClear={onClearAdd}
				/>
			);
		} else {
			return (
				<button type="button" onClick={e => onEditAdd({ id: 'new-temp-id' })}>Add Restaurant</button>
			);
		}
	}
};
