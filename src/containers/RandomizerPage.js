import { connect } from 'react-redux';
import RandomizerPage from '../components/RandomizerPage';
import { filter, randomize } from '../actions/index';



const mapStateToProps = (state, ownProps) => {
	const restaurant = (state.random) ? state.restaurants[state.random] : undefined;
	
	return {
		restaurant,
		editing: state.user && state.user.editing,
		filter: state.user.filter
	};
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onFilter (filterObject) {
			dispatch(filter(filterObject));
		},
		onRandomize () {
			dispatch(randomize());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RandomizerPage);
