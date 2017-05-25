import {
	changeBgState,
	changeModalContent,
	closeAndEmptyMainModal,
	toogleIsModalOpened,
	updateModalType,
	updatePageTitle,
} from '../../../reducers/actions/App.js'

import {
	updateIsConnectedSC,
	updateMasasUserTracks,
	updateSCUserTracks,
	updateSCUsername,
} from '../../../reducers/actions/UploadSC.js'

import { getUserTracks } from '../ajaxCalls.jsx'


// Which part of the Redux global state does our component want to receive as props?
const mapStateToProps = function(state) {
	return {
		// app state
		MASASuser: state.appReducer.MASASuser,
		userPk: state.appReducer.MASASuserPk,
		userData: state.appReducer.userData,
		modalType: state.appReducer.modalType,
		isModalOpened: state.appReducer.isModalOpened,

		// page state
		choosingTime: state.uploadSCReducer.choosingTime,
		soundcloudUserTracks: state.uploadSCReducer.soundcloudUserTracks,
		masasUserTracks: state.uploadSCReducer.masasUserTracks,
		SCusername:  state.uploadSCReducer.SCusername,
		isConnectedSoundcloud: state.uploadSCReducer.isConnectedSoundcloud,

		// other states
	}
}

// Which action creators does it want to receive by props?
const mapDispatchToProps = function(dispatch) {
	return {
		// higher level state updates
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
		toogleModal: () => dispatch(toogleIsModalOpened()),
		updateModalContent: (modalContent, modalType) => dispatch(changeModalContent(modalContent, modalType)),
		updateModalType: (modalType) => dispatch(updateModalType(modalType)),
		closeModal: () => dispatch(closeAndEmptyMainModal()),

		// page state updates
		updateSoundcloudUserTracks: (soundcloudUserTracks) => dispatch(updateSCUserTracks(soundcloudUserTracks)),
		updateMasasUserTracks: (masasUserTracks) => dispatch(updateMasasUserTracks(masasUserTracks)),
		updateSCusername: (SCusername) => dispatch(updateSCUsername(SCusername)),
		updateIsConnectedSC: (isConnectedSoundcloud) => dispatch(updateIsConnectedSC(isConnectedSoundcloud)),
		getUserTracks: (userPk, success, error) => getUserTracks(userPk, success, error),

		// other state updates
		blurBg: (blur) => dispatch(changeBgState.blur(blur)),
		saturateBg: (sat) => dispatch(changeBgState.saturate(sat)),
		blurMobileBr: (blur) => dispatch(changeBgState.blurMobile(blur)),
	}
}

export {
	mapDispatchToProps,
	mapStateToProps,
}
