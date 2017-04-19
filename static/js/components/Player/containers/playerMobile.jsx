import {
	showPlayerMobile,
} from "../../../reducers/actions/App.js"

var PlayerMobile = {}

PlayerMobile.mapStateToProps = function(state) {
	return {
		isPlayerMobileShown: state.appReducer.isPlayerMobileShown,
	}
}

PlayerMobile.mapDispatchToProps = function(dispatch) {
	return {
		showPlayerMobile: choice => dispatch(showPlayerMobile(choice))
	}
}

module.exports = PlayerMobile
