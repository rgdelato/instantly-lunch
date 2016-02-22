import React, { Component } from 'react';
import { TransitionMotion, spring, presets } from 'react-motion';
import Header from '../components/AppHeader';
import Footer from '../components/AppFooter';



export default class App extends Component {
	constructor (props) {
		super(props);

		this.getStyles = this.getStyles.bind(this);
		this.willEnter = this.willEnter.bind(this);
	}

	getStyles (key, children) {
		return {
			[key]: {
				opacity: spring(1, presets.gentle),
				children
			}
		};
	}

	willEnter (key) {
		return {
			opacity: 0
		};
	}

	render () {
		const { children, location: { pathname, key } } = this.props;

		return (
			<div>

				<Header />

				<TransitionMotion
					styles={this.getStyles(pathname, children)}
					willEnter={this.willEnter}
				>
					{(styles) =>
						<div className="content">
							{Object.keys(styles).map((id) => {
								const { children, ...style } = styles[id];
								return (
									<div key={id} style={style}>{children}</div>
								);
							})}
						</div>
					}
				</TransitionMotion>

				<Footer />

			</div>
		);
	}
};
