var LoginForm = {}

import { login } from "../../../reducers/actions/login.js"

// Which part of the Redux global state does our component want to receive as props?
LoginForm.mapStateToProps = function(state) {
	return {

	}
}

// Which action creators does it want to receive by props?
LoginForm.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType}),
		login: backend => dispatch(login(backend)),
	}
}

module.exports = LoginForm
