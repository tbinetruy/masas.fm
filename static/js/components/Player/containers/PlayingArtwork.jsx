import {
	playPlayer,
	pausePlayer,
} from "../../../reducers/actions/Player.js"

var PlayingArtwork = {}

PlayingArtwork.mapStateToProps = function(state) {
	return {
		MASAS_songInfo: state.playerReducer.MASAS_songInfo,
		SC_songInfo: state.playerReducer.SC_songInfo,
		isPaused: state.playerReducer.isPaused,
	}
}

PlayingArtwork.mapDispatchToProps = function(dispatch) {
	return {
		play: () => dispatch(playPlayer()),
		pause: () => dispatch(pausePlayer()),
	}
}

module.exports = PlayingArtwork
