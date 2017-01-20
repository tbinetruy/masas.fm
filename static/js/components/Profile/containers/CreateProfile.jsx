import {
	saveProfile,
} from "../../../reducers/actions/Profile.js"

import {
	closeAndEmptyMainModal,
} from "../../../reducers/actions/App.js"
var CreateProfile = {}

CreateProfile.mapStateToProps = function(state) {
	return {
	}
}

CreateProfile.mapDispatchToProps = function(dispatch) {
	return {
		saveProfile: (getCookie, callbackSuccess, callbackError = () => {}) => dispatch(saveProfile(getCookie, callbackSuccess, callbackError)),
		closeModal: () => dispatch(closeAndEmptyMainModal()),
	}
}

module.exports = CreateProfile
