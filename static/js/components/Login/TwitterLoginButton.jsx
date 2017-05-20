import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { login } from '../../reducers/actions/Login.js'


/**
 * Redux container
 */

const reduxStatePropTypes = {

}

const mapStateToProps = function(state) {
	return {
	}
}

const reduxDispatchPropTypes = {
	login: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		login: token => dispatch(login('twitter', token)),
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,
}

const smartDefaultProps = {
}

class TwitterLoginButtonContentSmart extends React.Component {
    constructor(props) {
        super(props)
    }

	componentWillMount() {
		this.processToken()
	}

	getRequestToken() {

	}

	processToken() {
		document.twitterLogin = token => this.props.login(token)
	}

	windowpop(url, width, height) {
		var leftPosition, topPosition
		//Allow for borders.
		leftPosition = (window.screen.width / 2) - ((width / 2) + 10)
		//Allow for title and status bars.
		topPosition = (window.screen.height / 2) - ((height / 2) + 50)
		//Open the window.
		window.open(url, 'Window2', 'status=no,height=' + height + ',width=' + width + ',resizable=yes,left=' + leftPosition + ',top=' + topPosition + ',screenX=' + leftPosition + ',screenY=' + topPosition + ',toolbar=no,menubar=no,scrollbars=no,location=no,directories=no')
	}

	render() {
		return (
			<div
				className="twitter-login-button"
				onClick={ () => this.windowpop(window.location.origin + '/twitter-login/', 545, 433) }
			>
				<span>Twitter</span>
			</div>
		)
	}
}

TwitterLoginButtonContentSmart.propTypes = smartPropTypes
TwitterLoginButtonContentSmart.defaultProps = smartDefaultProps

const TwitterLoginButtonContent = connect(
    mapStateToProps,
    mapDispatchToProps
)(TwitterLoginButtonContentSmart)

export {
	TwitterLoginButtonContent as TwitterLoginButton,
}