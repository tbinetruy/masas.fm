import {
	updatePageTitle,
} from "../../../reducers/actions/App.js"

import {
	playRandomSong,
	toggleSongLike,
} from "../../../reducers/actions/Player.js"

import { POPULAR } from "../../../reducers/actions/Player.js"

import {
	toogleIsModalOpened,
	changeModalContent,
	updateSplashScreenLoginMessage,
} from "../../../reducers/actions/App.js"

var Popular = {}

Popular.mapStateToProps = function(state) {
	return {
		userPk: state.appReducer.MASASuserPk,
		MASASuser: state.appReducer.MASASuser,
		songPlaying: state.playerReducer.songPlaying,
	}
}

Popular.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
		playRandomSong: () => dispatch(playRandomSong(POPULAR)),
		toggleSongLike: (userToken, songId) => dispatch(toggleSongLike(songId)),
		toogleModal: () => dispatch(toogleIsModalOpened()),
		updateLoginMessage: message => dispatch(updateSplashScreenLoginMessage(message)),
		updateModalContent: (modalContent, modalType) => dispatch(changeModalContent(modalContent, modalType)),
	}
}

module.exports = Popular
