import React, { Component } from 'react';
import { connect } from 'react-redux';
import { snapshot } from '../actions';



class Footer extends Component {
	render () {
		const { state } = this.props;
		
		return (
			<div className="footer">
				<div className="footer-content">
					<label>
						<input type="text" name="state"
							value={JSON.stringify(state)}
							onChange={::this.handleChange}
						/>
					</label>
				</div>
			</div>
		);
	}
	
	handleChange (e) {
		const { dispatch } = this.props;
		dispatch(snapshot(e.target.value));
	}
};

export default connect((state) => { return { state }; })(Footer);
