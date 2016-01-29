import React, { Component } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import RestaurantItem from '../containers/RestaurantItem';
import RestaurantAdd from '../containers/RestaurantAdd';



export default class RestaurantList extends Component {
	constructor (props) {
		super(props);
		
		this.getStyles = this.getStyles.bind(this);
		this.willEnterOrLeave = this.willEnterOrLeave.bind(this);
	}
	
	getStyles (restaurants, editing) {
		return restaurants.reduce((acc, restaurant) => {
			acc[restaurant.id] = {
				opacity: spring(1),
				maxHeight: spring(300),
				marginBottom: spring(24),
				borderWidth: 1,
				padding: spring(12),
				restaurant,
				editing
			};
			return acc;
		}, {});
	}
	
	willEnterOrLeave (key, style) {
		return {
			opacity: spring(0),
			maxHeight: spring(0),
			marginBottom: spring(0),
			borderWidth: 0,
			padding: spring(0),
			restaurant: style.restaurant,
			editing: style.editing
		};
	}
	
	render () {
		const { restaurants, editing } = this.props;
		
		return (
			<div className="restaurant-list">
				
				<TransitionMotion
					styles={this.getStyles(restaurants, editing)}
					willEnter={this.willEnterOrLeave}
					willLeave={this.willEnterOrLeave}
				>
					{(styles) =>
						<div>
							{Object.keys(styles).map((id) => {
								const { restaurant, editing, ...style } = styles[id];
								
								return (
									<RestaurantItem
										key={restaurant.id}
										restaurant={(editing.id === restaurant.id) ? editing : restaurant}
										editing={editing.id === restaurant.id}
										style={style}
									/>
								);
							})}
						</div>
					}
				</TransitionMotion>
				
				<RestaurantAdd />
			</div>
		);
	}
};
