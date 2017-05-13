import {
	changeBgState,
	updatePageTitle,
} from '../../../reducers/actions/App.js'

import {
	updateTipBar,
} from '../../../reducers/actions/Header.js'

import {
	playRandomSong,
	toggleSongLike,
} from '../../../reducers/actions/Player.js'

import { POPULAR } from '../../../reducers/actions/Player.js'

import {
	changeModalContent,
	toogleIsModalOpened,
	updateSplashScreenLoginMessage,
} from '../../../reducers/actions/App.js'

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
		blackBgFilter: () => dispatch(changeBgState.black()),
		resetBgFilter: () => dispatch(changeBgState.reset()),
		updateTipBar: (text, step, tipCTA) => dispatch(updateTipBar(text, step, tipCTA))
	}
}

module.exports = Popular
