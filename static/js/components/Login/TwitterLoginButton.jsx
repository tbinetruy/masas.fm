var React = require("react")

// var {goToURL} = require("../../MASAS_functions.jsx")
// import { BlurBackground } from "../MASAS_mixins.jsx"
// var { Link } = require("../UI/UI.jsx")
// var { browserHistory } = require('react-router')

// var Template = (props) => {

// }

export const TwitterLoginButton = React.createClass({
	propTypes: {
	},

	componentWillMount: function() {
		this.processToken()
	},

	getRequestToken: function() {

	},

	processToken: function(token) {
		document.twitterLogin = token => console.log(token)
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
			<div onClick={ () => this.windowpop(document.MASAS.FOO + "?next=" + encodeURI("/twitter-callback/"), 545, 433) } >
				<span>Twitter Login</span>
			</div>
		)
	}
})
