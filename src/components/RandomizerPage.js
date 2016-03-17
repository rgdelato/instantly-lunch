import React, { Component } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import RestaurantItem from '../containers/RestaurantItem';



class AttributeCheckbox extends Component {
	render () {
		const { name } = this.props;

		return (
			<label className="restaurant-item-attribute">
				<input type="checkbox" {...this.props} /> {name[0].toUpperCase() + name.slice(1)}
			</label>
		);
	}
}



export default class RandomizerPage extends Component {
	constructor (props) {
		super(props);

		this.getStyles = this.getStyles.bind(this);
		this.willEnterOrLeave = this.willEnterOrLeave.bind(this);
	}

	getStyles (restaurant, editing) {
		if (restaurant) {
			return {
				[restaurant.id]: {
					opacity: spring(1),
					maxHeight: spring(300),
					marginBottom: spring(24),
					borderWidth: 1,
					padding: spring(12),
					restaurant,
					editing
				}
			};
		} else {
			return {};
		}
	}

	willEnterOrLeave (key, styles) {
		return {
			opacity: spring(0),
			maxHeight: spring(0),
			marginBottom: spring(0),
			borderWidth: 0,
			padding: spring(0),
			restaurant: styles.restaurant,
			editing: styles.editing
		};
	}

	render () {
		const { restaurant, editing, filter, onRandomize } = this.props;

		return (
			<div>
				<div className="restaurant-list">
					<TransitionMotion
						styles={this.getStyles(restaurant, editing)}
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
				</div>

				<button onClick={onRandomize}>Randomize</button>

				<br clear="all" />
				<br clear="all" />

				<div className="restaurant-list">
					<div className="restaurant-item-attributes">
						<AttributeCheckbox
							name="cheap"
							checked={filter.cheap}
							onChange={::this.handleChange}
						/>
						<AttributeCheckbox
							name="fast"
							checked={filter.fast}
							onChange={::this.handleChange}
						/>
						<AttributeCheckbox
							name="walkable"
							checked={filter.walkable}
							onChange={::this.handleChange}
						/>
					</div>
				</div>
			</div>
		);
	}

	handleChange (e) {
		this.props.onFilter({
			[e.target.name]: e.target.checked
		});
	}
}
