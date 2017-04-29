import {
	playPlayer,
	pausePlayer,
	playPreviousSongInHistory,
	playRandomSong,
	playNewSongFromPlaylist,
	playNewSong,
	resumePlayer,
	setIsPlayerBuffering,
	toggleSongLike,
} from "../../../reducers/actions/Player.js"

import {
	updateMiniProfileContent,
	changeModalContent,
	updateSplashScreenLoginMessage,
	toogleIsModalOpened,
	showPlayerMobile,
} from "../../../reducers/actions/App.js"

// var { toggleSongLike } = require("../../../MASAS_functions.jsx")

var Player = {}

Player.mapStateToProps = function(state) {
	return {
		songPlaying: state.playerReducer.songPlaying,
		isPaused: state.playerReducer.isPaused,
		playerAtTime: state.playerReducer.playerAtTime,
		SC_songInfo: state.playerReducer.SC_songInfo,
		MASAS_songInfo: state.playerReducer.MASAS_songInfo,
		userPk: state.appReducer.MASASuserPk,
		playlist: state.playerReducer.playlist,
		playlistPosition: state.playerReducer.playlistPosition,
		isPlaylistPlaying: state.playerReducer.isPlaylistPlaying,
		playingFromPopular: state.playerReducer.playingFromPopular,
	}
}

Player.mapDispatchToProps = function(dispatch) {
	return {
		dispatch,
		play: () => dispatch(playPlayer()),
		pause: () => dispatch(pausePlayer()),
		resumePlaying: () => dispatch(resumePlayer()),	// same as this.props.play (see actions/Player.js) Not sure keeping both for historical reasons for now
		playNewSong: () => dispatch(playNewSong()),
		playRandomSong: (timeInterval = 0) => dispatch(playRandomSong(timeInterval)),
		playNewSongFromPlaylist: (playlistPosition) => dispatch(playNewSongFromPlaylist(playlistPosition)),
		setIsPlayerBuffering: value => dispatch(setIsPlayerBuffering(value)),
		showPlayerMobile: choice => dispatch(showPlayerMobile(choice)),
	}
}

module.exports = Player
