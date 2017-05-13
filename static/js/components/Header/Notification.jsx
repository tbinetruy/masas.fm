import * as React from 'react'

import { connect }from 'react-redux'

/**
 * Redux container
 */

const mapStateToProps = function(state) {
	return {
		notificationText: state.headerReducer.notificationText,
		tipText: state.headerReducer.tipText,
	}
}

const mapDispatchToProps = function(dispatch) {
	return {
	}
}

/**
 * Notification div dumb
 */
const NotificationDiv = ({ text }) => (
	<div className="notification--wrapper2">
		<div className="notification-text" id="notification-text">
			{ text }
		</div>
	</div>
)

NotificationDiv.propTypes = {
	text: React.PropTypes.string.isRequired,
}

/**
 * Tip div dumb
 */
const TipDiv = ({ text }) => (
	<div className="tip--wrapper">
		<div className="tip-text" id="tip-text">
			{ text }
		</div>
	</div>
)

TipDiv.propTypes = {
	text: React.PropTypes.string.isRequired,
}

/**
 * Dumb component
 */
const NotificationSystemDumb = ({ notificationText, tipText }) => (
	<div className="notification--wrapper1">
		{
			tipText !== '' ?
				<TipDiv text={ tipText } />
			:
				''
		}
		{
			notificationText !== '' ?
				<NotificationDiv text={ notificationText } />
			:
				''
		}
	</div>
)

NotificationSystemDumb.propTypes = {
	notificationText: React.PropTypes.string,
	tipText: React.PropTypes.string,
}

/**
 * Smart component
 */
class NotificationSystemSmart extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<NotificationSystemDumb
				notificationText={ this.props.notificationText }
				tipText={ this.props.tipText }
			/>
		)
	}
}

NotificationSystemSmart.propTypes = {
	notificationText: React.PropTypes.string,
	tipText: React.PropTypes.string,
}

const Notification = connect(
	mapStateToProps,
	mapDispatchToProps
)(NotificationSystemSmart)

export {
	Notification,
}

