import { connect } from 'react-redux';
import RestaurantList from '../components/RestaurantList';



// simple search just using "indexOf"
const filterBySearch = (restaurants, mixedCaseSearchText) => {

	const restaurantIds = Object.keys(restaurants);

	if (mixedCaseSearchText) {
		const searchText = mixedCaseSearchText.toLowerCase();

		return restaurantIds.filter((id) => {
			const restaurant = restaurants[id];
			return (restaurant && restaurant.name.toLowerCase().indexOf(searchText) !== -1);
		});

	} else {
		return restaurantIds;
	}
};



// pass the array of restaurant IDs
const mapStateToProps = (state) => {

	const searchedRestaurantIds = filterBySearch(state.restaurants, state.search);

	return {
		restaurants: searchedRestaurantIds.map((id) => {
			return state.restaurants[id];
		}),
		editing: state.user && state.user.editing
	};
};

export default connect(mapStateToProps)(RestaurantList);
