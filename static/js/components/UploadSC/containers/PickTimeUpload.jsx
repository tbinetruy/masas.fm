import {
	updateProfileInfo,
} from "../../../reducers/actions/Profile.js"

import {
	closePickTimeWindow,
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


// Which part of the Redux global state does our component want to receive as props?
PickTimeUpload.mapStateToProps = function(state) {
	return {
		track: state.uploadSCReducer.choosingTime,
		MASASuser: state.appReducer.MASASuser,
		pickTimeUpload: state.uploadSCReducer.pickTimeUpload,
		userPk: state.appReducer.MASASuserPk,
	}
}

// Which action creators does it want to receive by props?
PickTimeUpload.mapDispatchToProps = function(dispatch) {

	var closeWindow = () => {
		dispatch(closePickTimeWindow())
	}

	return {
		toogleModal: () => dispatch(toogleIsModalOpened()),
		updateModalContent: modalContent => dispatch(changeModalContent(modalContent)),
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
		closeWindow,
		onTimeChanged: time => dispatch({type:'HANDLE_PICK_TIME_UPLOAD', time: time}),
		handleTimePickerChange: newDiscover => dispatch({type:'HANDLE_PICK_TIME_UPLOAD', newDiscover}),
		emitNotification: text =>  dispatch(updateNotificationBar(text)),
		updateProfileInfo: () => dispatch(updateProfileInfo()),
	}
}

module.exports = PickTimeUpload
