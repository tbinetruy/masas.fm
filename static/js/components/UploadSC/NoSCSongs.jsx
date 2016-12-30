var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/NoSCSongs.jsx")

var { copyTextToClipboard } = require("../../MASAS_functions.jsx")
// import { BlurBackground } from "../MASAS_mixins.jsx"
var { Button } = require("../UI/UI.jsx")
// var { browserHistory } = require('react-router')


var NoSCSongs = React.createClass({
	propTypes: {
		updateNotificationBar: React.PropTypes.func,
		logoutSC: React.PropTypes.func,				// called on logout
	},

	getDefaultProps: function() {
		return {
			logoutSC: () => {},
		}
	},

	componentWillMount: function() {
	},

	inviteFriend: function() {
		copyTextToClipboard("http://masas.fm")
		this.props.updateNotificationBar("http://masas.fm copied to your clipboard!")
	},

	render: function() {
		return (
			<div className="no-sc-songs--wrapper">
				<h2>Nothing uploaded on your Soundcloud?</h2>
				<p>We all have Artist friends, give them their chance!</p>
				
				<div className="buttons">
					<Button
						onClick={ this.inviteFriend }>Invite a friend</Button>
					<div
						className="cancel"
						onClick={ this.props.logoutSC }>or sign in with another Soundcloud account</div>
				</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(NoSCSongs)