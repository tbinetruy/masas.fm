import {
	updateNotificationBar,
} from "../../../reducers/actions/Header.js"

var NoSCSongs = {}

NoSCSongs.mapStateToProps = function(state) {
	return {
	}
}

NoSCSongs.mapDispatchToProps = function(dispatch) {
	return {
		updateNotificationBar: notificationText => dispatch(updateNotificationBar(notificationText))
	}
}

module.exports = NoSCSongs
