import {
	changeModalContent,
	toogleIsModalOpened,
	updateSplashScreenLoginMessage,
} from '../../../reducers/actions/App.js'

import {
	updateIsConnectedSC,
	updateMasasUserTracks,
	updateSCUserTracks,
	updateSCUsername,
} from '../../../reducers/actions/UploadSC.js'

import { updateProfilePicture } from '../../../reducers/actions/Login.js'


const mapStateToProps = function(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
		userPk: state.appReducer.MASASuserPk,
	}
}

const mapDispatchToProps = function(dispatch) {
	return {
		toogleModal: () => dispatch(toogleIsModalOpened()),
		updateLoginMessage: message => dispatch(updateSplashScreenLoginMessage(message)),
		updateModalContent: (modalContent, modalType) => dispatch(changeModalContent(modalContent, modalType)),
		updateIsConnectedSC: (isConnectedSoundcloud) => dispatch(updateIsConnectedSC(isConnectedSoundcloud)),
		updateSCusername: (SCusername) => dispatch(updateSCUsername(SCusername)),
		updateMasasUserTracks: (masasUserTracks) => dispatch(updateMasasUserTracks(masasUserTracks)),
		updateSoundcloudUserTracks: (soundcloudUserTracks) => dispatch(updateSCUserTracks(soundcloudUserTracks)),
		updateProfilePicture: isDefaultPicture => dispatch(updateProfilePicture(isDefaultPicture))
	}
}

export {
	mapDispatchToProps,
	mapStateToProps,
}