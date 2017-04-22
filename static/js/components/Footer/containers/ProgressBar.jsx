import {
	setPlayerProgressBar,
} from "../../../reducers/actions/Footer.js"

var ProgressBar = {}

ProgressBar.mapStateToProps = function(state) {
	return {
		progressBarWidth: state.footerReducer.progressBar,
		SC_songInfo: state.playerReducer.SC_songInfo,
	}
}

ProgressBar.mapDispatchToProps = function(dispatch) {
	return {
		updateProgressBar: progress => dispatch(setPlayerProgressBar(progress)),
	}
}

module.exports = ProgressBar