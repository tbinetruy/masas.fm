// var { updateProfileInfo } = require('../ajaxCalls.jsx')

import {
	getPublicProfileInfo,
	getSCinfo,
	saveProfile,
	toggleEditingProfile,
	updateProfileBackArrowFunc,
	updateProfileInfo,
	updatePublicProfileInfo,
	updateUserSCSongs
} from '../../../reducers/actions/Profile.js'

import {
	updatePageTitle,
} from '../../../reducers/actions/App.js'

var Profile = {}

// Which part of the Redux global state does our component want to receive as props?
Profile.mapStateToProps = function(state) {
	return {
	}
}

// Which action creators does it want to receive by props?
Profile.mapDispatchToProps = function(dispatch) {
	return {
	}
}

module.exports = Profile
