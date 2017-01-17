import {
	closeAndEmptyMainModal,
	changeModalContent,
	toogleIsModalOpened,
	updateSplashScreenLoginMessage,
	logout
} from "../../../reducers/actions/App.js"


var HeaderDropdown = {}

HeaderDropdown.mapStateToProps = function(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
		// userLoggedIn: state.appReducer.userLoggedIn,
		// username: state.appReducer.userData.user
		userData: state.appReducer.userData,
		isModalOpened: state.appReducer.isModalOpened,
	}
}

HeaderDropdown.mapDispatchToProps = function(dispatch) {
	return {
		logout: () => dispatch(logout()),
		updateLoginMessage: message => dispatch(updateSplashScreenLoginMessage(message)),
		updateModalContent: (modalContent, modalType) => dispatch(changeModalContent(modalContent, modalType)),
		toogleModal: () => dispatch(toogleIsModalOpened()),
		closeModal: () => dispatch(closeAndEmptyMainModal()),
	}
}

module.exports = HeaderDropdown
