import { 
	toogleIsModalOpened,
	changeModalContent,
} from '../../../reducers/actions/App.js'

import { 
	updateSCUserTracks,
	updateSCUsername,
	updateIsConnectedSC,
	updateMasasUserTracks,
} from '../../../reducers/actions/UploadSC.js'

var UploadSCHome = {}

UploadSCHome.mapStateToProps = function(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
		userPk: state.appReducer.MASASuserPk,
	}
}

UploadSCHome.mapDispatchToProps = function(dispatch) {
	return {
		toogleModal: () => dispatch(toogleIsModalOpened()),
		updateModalContent: (modalContent, modalType) => dispatch(changeModalContent(modalContent, modalType)),
		updateIsConnectedSC: (isConnectedSoundcloud) => dispatch(updateIsConnectedSC(isConnectedSoundcloud)),
		updateSCusername: (SCusername) => dispatch(updateSCUsername(SCusername)),
		updateMasasUserTracks: (masasUserTracks) => dispatch(updateMasasUserTracks(masasUserTracks)),
		updateSoundcloudUserTracks: (soundcloudUserTracks) => dispatch(updateSCUserTracks(soundcloudUserTracks)),
	}
}

module.exports = UploadSCHome
