import {
	UPDATE_NOTIFICATION_TEXT,
	UPDATE_TIP_TEXT,
} from './actions/Header.js'

let exportVar = {}

exportVar.defaultState = {
	username: null,			// username shown in header dropdown
	notificationText: '',		// (STR) content of notification bar
	tipText: '',			// (str) content of tip
	tipNumber: 0,			// (int) tip number to check against usersteps
}
const{ defaultState } = exportVar

exportVar.headerReducer = function(state = defaultState, action) {

	switch(action.type) {
		case 'SET_USERNAME':
			return {
				...state,
				username: action.username
			}
		case UPDATE_NOTIFICATION_TEXT:
			return {
				...state,
				notificationText: action.notificationText
			}
		case UPDATE_TIP_TEXT:
			return {
				...state,
				tipText: action.tipText,
				tipNumber: action.tipNumber,
			}
		default:
			return state
	}
}


module.exports = exportVar