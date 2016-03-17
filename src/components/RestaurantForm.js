import React, { Component } from 'react';



const AttributeCheckbox = (props) => {
	const { name } = props;

	return (
		<label className="restaurant-item-attribute">
			<input type="checkbox" {...props} /> {name[0].toUpperCase() + name.slice(1)}
		</label>
	);
};



export default class RestaurantEditForm extends Component {
	render () {
		const { restaurant, onClear, style } = this.props;

		if (restaurant) {
			return (
				<fieldset className="restaurant-item" style={style}>
					<form onSubmit={::this.handleSubmit} >
						<input type="text" name="name" value={restaurant.name} onChange={::this.handleChange} placeholder="Name" />

						<div>
							<AttributeCheckbox name="cheap"    checked={restaurant.cheap} onChange={::this.handleChange} />
							<AttributeCheckbox name="fast"     checked={restaurant.fast} onChange={::this.handleChange} />
							<AttributeCheckbox name="walkable" checked={restaurant.walkable} onChange={::this.handleChange} />
						</div>

						<textarea name="notes" value={restaurant.notes} onChange={::this.handleChange} placeholder="Notes" />

						<div>
							<button type="button" onClick={e => {e.preventDefault(); onClear(); }}>Cancel</button>
							&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
							<button type="submit">Submit</button>
						</div>
					</form>
				</fieldset>
			);
		}

		return null;
	}

	handleChange (e) {
		const { onEdit } = this.props;

		let input = {};

		if (e.target.type === 'radio' || e.target.type === 'checkbox') {
			input[e.target.name] = e.target.checked;
		} else {
			input[e.target.name] = e.target.value;
		}

		onEdit(input);
	}

	handleSubmit (e) {
		const { onSave } = this.props;
		e.preventDefault();
		onSave();
	}
}
