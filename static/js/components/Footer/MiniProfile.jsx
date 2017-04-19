var React = require("react")

const MiniProfile = React.createClass({
	propTypes: {
		artistInfo: React.PropTypes.object,
	},

	componentWillMount: function() {
	},

	getDefaultProps: function() {
		return {
			artistInfo: null,
		}
	},

	render: function() {
		return (
			<div className="footer-mini-profile--wrapper">
				MiniProfile !!!!
			</div>
		)
	}
})

module.exports = MiniProfile
