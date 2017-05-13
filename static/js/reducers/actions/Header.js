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
function updateTipText(tipText, tipNumber, tipCTA) {
	return {
		type: UPDATE_TIP_TEXT,
		tipText,
		tipNumber,
		tipCTA,
	}
}

function updateTipBar(tipText, step=0, tipCTA='') {
	return (dispatch, getState) => {
		dispatch(updateTipText(''))

		const { userData, MASASuser } = getState().appReducer
		let showTip = 1

		if(MASASuser)
			if(userData.usersteps.length) {
				const userSteps = userData.usersteps
				showTip = !userSteps
					.map(e => e.step === step)
					.reduce((e, acc) => acc + e)

			}

		if(showTip)
			window.setTimeout(() => dispatch(updateTipText(tipText, step, tipCTA)), 0)
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