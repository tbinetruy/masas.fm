import * as React from 'react'

import { connect }from 'react-redux'

/**
 * Redux container
 */

const mapStateToProps = function(state) {
	return {
		notificationText: state.headerReducer.notificationText,
	}
}

const mapDispatchToProps = function(dispatch) {
	return {
	}
}

/**
 * Dumb component
 */
const NotificationDumb = ({ notificationText }) => (
	<div className="notification--wrapper1">
		{
			notificationText !== '' ?
				<div className="notification--wrapper2">
					<div className="notification-text" id="notification-text">
						{ notificationText }
					</div>
				</div>
			:
				''
		}
	</div>
)

NotificationDumb.propTypes = {
	notificationText: React.PropTypes.string,
}

/**
 * Smart component
 */
class NotificationSmart extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<NotificationDumb
				notificationText={ this.props.notificationText }
			/>
		)
	}
}

NotificationSmart.propTypes = {
	notificationText: React.PropTypes.string,
}

const Notification = connect(
	mapStateToProps,
	mapDispatchToProps
)(NotificationSmart)

export {
	Notification,
}

