import {
	updatePageTitle,
} from '../../../reducers/actions/App.js'

var UploadSCSongTable = {}

UploadSCSongTable.mapStateToProps = function(state) {
	return {
		SCusername:  state.uploadSCReducer.SCusername,
		soundcloudUserTracks: state.uploadSCReducer.soundcloudUserTracks,
		masasUserTracks: state.uploadSCReducer.masasUserTracks,
	}
}

UploadSCSongTable.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
	}
}

module.exports = UploadSCSongTable
