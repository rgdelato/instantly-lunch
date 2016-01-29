import { connect } from 'react-redux';
import RestaurantSearch from '../components/RestaurantSearch';
import { search } from '../actions/index';



const mapStateToProps = (state, props) => {
	return {
		searchText: state.search
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onSearch (text) {
			dispatch(search(text));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantSearch);
