import {
	updatePageTitle,
} from '../../../reducers/actions/App.js'


const mapStateToProps = function(state) {
	return {
		SCusername:  state.uploadSCReducer.SCusername,
		soundcloudUserTracks: state.uploadSCReducer.soundcloudUserTracks,
		masasUserTracks: state.uploadSCReducer.masasUserTracks,
	}
}

const mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
	}
}

export {
	mapDispatchToProps,
	mapStateToProps,
}