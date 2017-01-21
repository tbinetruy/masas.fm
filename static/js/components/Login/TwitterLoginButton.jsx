var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/TwitterLoginButton.jsx")
// var {goToURL} = require("../../MASAS_functions.jsx")
// import { BlurBackground } from "../MASAS_mixins.jsx"
// var { Link } = require("../UI/UI.jsx")
// var { browserHistory } = require('react-router')

// var Template = (props) => {

// }

const TwitterLoginButtonContent = React.createClass({
	propTypes: {
		login: React.PropTypes.func,
	},

	componentWillMount: function() {
		this.processToken()
	},

	getRequestToken: function() {

	},

	processToken: function() {
		// this.props.login(token)
		document.twitterLogin = token => { console.log(token); this.props.login(token) }
	},

	windowpop: function(url, width, height) {
		var leftPosition, topPosition
		//Allow for borders.
		leftPosition = (window.screen.width / 2) - ((width / 2) + 10)
		//Allow for title and status bars.
		topPosition = (window.screen.height / 2) - ((height / 2) + 50)
		//Open the window.
		window.open(url, "Window2", "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no")
	},

	render: function() {

		return (
			<div onClick={ () => this.windowpop(window.location.origin + "/twitter-login/", 545, 433) } >
				<span>Twitter Login</span>
			</div>
		)
	}
})

export const TwitterLoginButton = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(TwitterLoginButtonContent)