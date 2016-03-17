import React, { Component } from 'react';
import classNames from 'classnames';
import RestaurantForm from '../components/RestaurantForm';



const Attribute = ({ test, trueText, falseText }) => {
	return (
		<div className={classNames({
			'restaurant-item-attribute': true,
			'disabled': !test
		})}>
			{ (test) ? '\u2713 ' + trueText : '\u2715 ' + falseText }
		</div>
	);
};



export default class RestaurantItem extends Component {
	render () {
		const { style, restaurant, editing, excluded, onEdit, onSave, onClear, onExclude } = this.props;

		// edit case
		if (editing) {

			return (
				<RestaurantForm
					style={style}
					restaurant={restaurant}
					onEdit={onEdit}
					onSave={onSave}
					onClear={onClear}
				/>
			);

		// normal case
		} else {
			return (
				<div className="restaurant-item" style={style}>
					<h1>{restaurant.name} </h1>

					<p>{restaurant.notes}</p>

					<div className="restaurant-item-attributes">
						<Attribute test={restaurant.cheap} trueText="Cheap" falseText="Expensive" />
						<Attribute test={restaurant.fast} trueText="Fast" falseText="Slow" />
						<Attribute test={restaurant.walkable} trueText="Walkable" falseText="Driving" />
					</div>

					<div className="restaurant-item-exclude">
						<label>
							<input type="checkbox" checked={excluded} onChange={(e) => { onExclude({[restaurant.id]: e.target.checked}); } } /> Exclude from Randomization
						</label>
					</div>

					<button
						type="button"
						className="restaurant-item-edit-button"
						onClick={() => { onEdit(restaurant); }}
					>
						{'\u270E Edit'}
					</button>
				</div>
			);
		}
	}
}
