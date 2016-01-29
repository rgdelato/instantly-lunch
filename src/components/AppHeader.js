import React, { Component } from 'react';
import { Link } from 'react-router';



export default class Header extends Component {
	render () {
		return (
			<div className="header">
				<div className="header-logo">
					<Link to="/">Lunch</Link>
				</div>
				<div className="header-links">
					<Link to="/restaurants">List All</Link>
				</div>
			</div>
		);
	}
};
