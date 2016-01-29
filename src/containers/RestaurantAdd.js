import { connect } from 'react-redux';
import RestaurantAdd from '../components/RestaurantAdd';
import { editNew, saveNew, clearNew } from '../actions/index';



const mapStateToProps = (state, props) => {
	return {
		adding: state.user && state.user.adding && state.user.adding.id
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onEditAdd (data) {
			dispatch(editNew(data));
		},
		onSaveAdd (data) {
			dispatch(saveNew(data));
		},
		onClearAdd () {
			dispatch(clearNew());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantAdd);
