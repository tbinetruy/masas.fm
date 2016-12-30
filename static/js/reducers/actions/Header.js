export const UPDATE_NOTIFICATION_TEXT = "UPDATE_NOTIFICATION_TEXT"

export function updateNotificationText(text) {
	return {
		type: "UPDATE_NOTIFICATION_TEXT",
		notificationText: text,
	}
}

export function updateNotificationBar(notificationText) {
	return dispatch => {
		dispatch(updateNotificationText(""))
		window.setTimeout( () => dispatch(updateNotificationText(notificationText)), 0)
	}
}