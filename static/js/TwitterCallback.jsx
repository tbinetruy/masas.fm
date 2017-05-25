import * as createClass from 'create-react-class'
import React from 'react'
import { getUrlParams } from './MASAS_functions.jsx'

const TwitterCallback = createClass({

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
		const { oauth_token, oauth_token_secret } = getUrlParams()

		const token = 'oauth_token_secret='
			+ oauth_token_secret
			+ '&'
			+ 'oauth_token='
			+ oauth_token
		opener.document.twitterLogin(token)
	},

	render() {
		return (
				<b style={{ textAlign: 'center' }}>This popup should automatically close in a few seconds</b>
		)
	}
})

export {
	TwitterCallback,
}