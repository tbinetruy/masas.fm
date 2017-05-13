const UPDATE_NOTIFICATION_TEXT = 'UPDATE_NOTIFICATION_TEXT'
const UPDATE_TIP_TEXT = 'UPDATE_TIP_TEXT'

/**
 * notification bar
 */
function updateNotificationText(text) {
	return {
		type: UPDATE_NOTIFICATION_TEXT,
		notificationText: text,
	}
}

function updateNotificationBar(notificationText) {
	return dispatch => {
		dispatch(updateNotificationText(''))
		window.setTimeout( () => dispatch(updateNotificationText(notificationText)), 0)
	}
}

/**
 * tip bar
 */
function updateTipText(text) {
	return {
		type: UPDATE_TIP_TEXT,
		tipText: text,
	}
}

function updateTipBar(notificationText) {
	return dispatch => {
		dispatch(updateTipText(''))
		window.setTimeout( () => dispatch(updateTipText(notificationText)), 0)
	}
}

export {
	UPDATE_NOTIFICATION_TEXT,
	UPDATE_TIP_TEXT,
	updateNotificationBar,
	updateNotificationText,
	updateTipBar,
	updateTipText,
}