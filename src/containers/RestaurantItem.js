import { connect } from 'react-redux';
import RestaurantItem from '../components/RestaurantItem';
import { edit, saveEdit, clearEdit, exclude } from '../actions/index';



const mapStateToProps = (state, props) => {
	return {
		excluded: state.user.excluded[props.restaurant.id]
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onEdit (data) {
			dispatch(edit(data));
		},
		onSave (data) {
			dispatch(saveEdit(data));
		},
		onClear () {
			dispatch(clearEdit());
		},
		onExclude (data) {
			dispatch(exclude(data));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantItem);
