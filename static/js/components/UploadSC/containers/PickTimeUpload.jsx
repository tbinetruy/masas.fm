import {
	updateProfileInfo,
} from "../../../reducers/actions/Profile.js"

import {
	closePickTimeWindow,
	handlePickTimeUpload,
} from "../../../reducers/actions/UploadSC.js"

import {
	changeModalContent,
	toogleIsModalOpened,
	updatePageTitle,
} from "../../../reducers/actions/App.js"

import {
	updateNotificationBar,
} from "../../../reducers/actions/Header.js"

var PickTimeUpload = {}


PickTimeUpload.mapStateToProps = function(state) {
	return {
		track: state.uploadSCReducer.choosingTime,
		MASASuser: state.appReducer.MASASuser,
		pickTimeUpload: state.uploadSCReducer.pickTimeUpload,
		userPk: state.appReducer.MASASuserPk,
	}
}

PickTimeUpload.mapDispatchToProps = function(dispatch) {

	return {
		toogleModal: () => dispatch(toogleIsModalOpened()),
		updateModalContent: modalContent => dispatch(changeModalContent(modalContent)),
		updateTitle: (title, pageType, callback) => dispatch(updatePageTitle(title, pageType, callback)),
		closeWindow: () => dispatch(closePickTimeWindow()),
		handleTimePickerChange: newDiscover => dispatch(handlePickTimeUpload(newDiscover)),
		emitNotification: text =>  dispatch(updateNotificationBar(text)),
		updateProfileInfo: () => dispatch(updateProfileInfo()),
	}
}

module.exports = PickTimeUpload
