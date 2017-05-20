
const UPDATE_SC_USER_TRACKS = 'UPDATE_SC_USER_TRACKS'
const UPDATE_MASAS_USER_TRACKS = 'UPDATE_MASAS_USER_TRACKS'
const UPDATE_SC_USERNAME = 'UPDATE_SC_USERNAME'
const UPDATE_IS_CONNECTED_SC = 'UPDATE_IS_CONNECTED_SC'
const HANDLE_PICK_TIME_UPLOAD = 'HANDLE_PICK_TIME_UPLOAD'
const UPDATE_UPLOAD_TIP_TIME_PICKER_VALUE = 'UPDATE_UPLOAD_TIP_TIME_PICKER_VALUE'
const CLOSE_PICK_TIME_WINDOW = 'CLOSE_PICK_TIME_WINDOW'
const UPDATE_IS_DISABLED_UPLOAD_BUTTON = 'UPDATE_IS_DISABLED_UPLOAD_BUTTON'

function updateIsUploadButtonDisabled(isUploadButtonDisabled) {
	return {
		type: UPDATE_IS_DISABLED_UPLOAD_BUTTON,
		isUploadButtonDisabled,
	}
}

function closePickTimeWindow() {
	return {
		type: CLOSE_PICK_TIME_WINDOW,
	}
}

function updateUploadTipTimePickerValue(tipTimePickerValue) {
	return {
		type: UPDATE_UPLOAD_TIP_TIME_PICKER_VALUE,
		tipTimePickerValue
	}
}

function handlePickTimeUpload(newDiscover) {
	return {
		type: HANDLE_PICK_TIME_UPLOAD,
		newDiscover
	}
}

function updateSCUserTracks(soundcloudUserTracks) {
	return {
		type: UPDATE_SC_USER_TRACKS,
		soundcloudUserTracks,
	}
}

function updateMasasUserTracks(masasUserTracks) {
	return {
		type: UPDATE_MASAS_USER_TRACKS,
		masasUserTracks,
	}
}

function updateSCUsername(SCusername) {
	return {
		type: UPDATE_SC_USERNAME,
		SCusername,
	}
}

function updateIsConnectedSC(isConnectedSoundcloud) {
	return {
		type: UPDATE_IS_CONNECTED_SC,
		isConnectedSoundcloud
	}
}

export {
	CLOSE_PICK_TIME_WINDOW,
	HANDLE_PICK_TIME_UPLOAD,
	UPDATE_IS_CONNECTED_SC,
	UPDATE_IS_DISABLED_UPLOAD_BUTTON,
	UPDATE_MASAS_USER_TRACKS,
	UPDATE_SC_USER_TRACKS,
	UPDATE_SC_USERNAME,
	UPDATE_UPLOAD_TIP_TIME_PICKER_VALUE,

	closePickTimeWindow,
	handlePickTimeUpload,
	updateIsConnectedSC,
	updateIsUploadButtonDisabled,
	updateSCUserTracks,
	updateSCUsername,
	updateUploadTipTimePickerValue,
}