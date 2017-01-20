import {
	saveProfile,
} from "../../../reducers/actions/Profile.js"

import {
	updateProfilePicture,
} from "../../../reducers/actions/Login.js"

import {
	closeAndEmptyMainModal,
	updatePageTitle,
} from "../../../reducers/actions/App.js"
var CreateProfile = {}

CreateProfile.mapStateToProps = function(state) {
	return {
		userToken: state.appReducer.MASASuser,
		userData: state.appReducer.userData,
		pageTitle: state.appReducer.pageTitle,
	}
}

CreateProfile.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType, backArrowFunc) => dispatch(updatePageTitle(title, pageType, backArrowFunc)),
		saveProfile: (getCookie, callbackSuccess, callbackError = () => {}) => dispatch(saveProfile(getCookie, callbackSuccess, callbackError)),
		closeModal: () => dispatch(closeAndEmptyMainModal()),
		updateProfilePicture: isDefaultPicture => dispatch(updateProfilePicture(isDefaultPicture))
	}
}

module.exports = CreateProfile
