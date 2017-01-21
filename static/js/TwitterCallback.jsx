var React = require("react")
import { getUrlParams } from "./MASAS_functions.jsx"

var TwitterCallback = React.createClass({

	redirect: function() {
		// send auth token
		this.processToken()

		// close popup
		window.close()
	},

	componentDidMount: function() {
		this.redirect()
	},

	processToken: function() {
		const { oauth_token } = getUrlParams()
		opener.document.twitterLogin(oauth_token)
	},

	render() {
		return (
				<b style={{ textAlign: 'center' }}>This popup should automatically close in a few seconds</b>
		)
	}
})

module.exports = TwitterCallback