import {
	showPlayerMobile,
} from "../../../reducers/actions/App.js"

import {
	updateProfileBackArrowFunc,
} from "../../../reducers/actions/Profile.js"

var PlayerMobile = {}

PlayerMobile.mapStateToProps = function(state) {
	return {
		MASAS_songInfo: state.playerReducer.MASAS_songInfo,
		isPlayerMobileShown: state.appReducer.isPlayerMobileShown,
	}
}

PlayerMobile.mapDispatchToProps = function(dispatch) {
	return {
		showPlayerMobile: choice => dispatch(showPlayerMobile(choice)),
		updateProfileBackArrowFunc: func => dispatch(updateProfileBackArrowFunc(func)),
	}
}

module.exports = PlayerMobile
