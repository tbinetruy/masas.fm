import {
	changeModalContent,
	toogleIsModalOpened,
	updatePageTitle,
} from '../../../reducers/actions/App.js'

import {
	closePickTimeWindow,
	handlePickTimeUpload,
	updateIsUploadButtonDisabled,
} from '../../../reducers/actions/UploadSC.js'

import { updateNotificationBar } from '../../../reducers/actions/Header.js'
import { updateProfileInfo } from '../../../reducers/actions/Profile.js'



const mapStateToProps = function(state) {
	return {
		track: state.uploadSCReducer.choosingTime,
		MASASuser: state.appReducer.MASASuser,
		pickTimeUpload: state.uploadSCReducer.pickTimeUpload,
		userPk: state.appReducer.MASASuserPk,
		isUploadButtonDisabled: state.uploadSCReducer.isUploadButtonDisabled,
	}
}

const mapDispatchToProps = function(dispatch) {

	return {
		toogleModal: () => dispatch(toogleIsModalOpened()),
		updateModalContent: modalContent => dispatch(changeModalContent(modalContent)),
		updateTitle: (title, pageType, callback) => dispatch(updatePageTitle(title, pageType, callback)),
		closeWindow: () => dispatch(closePickTimeWindow()),
		handleTimePickerChange: newDiscover => dispatch(handlePickTimeUpload(newDiscover)),
		emitNotification: text =>  dispatch(updateNotificationBar(text)),
		updateProfileInfo: () => dispatch(updateProfileInfo()),
		updateIsUploadButtonDisabled: isUploadButtonDisabled => dispatch(updateIsUploadButtonDisabled(isUploadButtonDisabled)),
	}
}

export {
	mapDispatchToProps,
	mapStateToProps,
}