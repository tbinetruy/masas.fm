var LoginForm = {}

import {
	login,
} from "../../../reducers/actions/Login.js"

import {
	updatePageTitle,
} from "../../../reducers/actions/App.js"

LoginForm.mapStateToProps = function(state) {
	return {

	}
}

LoginForm.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
		login: (backend, token = undefined) => dispatch(login(backend, token)),
	}
}

module.exports = LoginForm
