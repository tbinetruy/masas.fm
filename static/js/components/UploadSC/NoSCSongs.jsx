import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { copyTextToClipboard } from '../../MASAS_functions.jsx'
import { Button } from '../UI/UI.jsx'

import { updateNotificationBar } from '../../reducers/actions/Header.js'

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
	updateNotificationBar: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		updateNotificationBar: notificationText => dispatch(updateNotificationBar(notificationText))
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

	logoutSC: PropTypes.func,				// called on logout
}

const smartDefaultProps = {
	logoutSC: () => {},
}

class NoSCSongsSmart extends React.Component {
    constructor(props) {
        super(props)

		this.inviteFriend = this.inviteFriend.bind(this)
    }

	inviteFriend() {
		copyTextToClipboard('http://masas.fm')
		this.props.updateNotificationBar('http://masas.fm copied to your clipboard!')
	}

	render() {
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
}

NoSCSongsSmart.propTypes = smartPropTypes
NoSCSongsSmart.defaultProps = smartDefaultProps

const NoSCSongs = connect(
    mapStateToProps,
    mapDispatchToProps
)(NoSCSongsSmart)

export {
	NoSCSongs,
}
