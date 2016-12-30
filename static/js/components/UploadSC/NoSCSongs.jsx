var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/NoSCSongs.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
// import { BlurBackground } from "../MASAS_mixins.jsx"
var { Button } = require("../UI/UI.jsx")
// var { browserHistory } = require('react-router')


var NoSCSongs = React.createClass({
	propTypes: {
		logoutSC: React.PropTypes.func,				// called on logout
	},

	getDefaultProps: function() {
		return {
			logoutSC: () => {},
		}
	},

	componentWillMount: function() {
	},

	render: function() {
		return (
			<div className="no-sc-songs--wrapper">
				<h2>Nothing uploaded on your Soundcloud?</h2>
				<p>We all have Artists’ friends, give them their chance!</p>
				<Button
					onClick={ () => {} }>Invite a friend</Button>
				<Button
					onClick={ this.props.logoutSC }>or sign in with another Soundcloud account</Button>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(NoSCSongs)
