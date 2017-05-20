import {
	changeModalContent,
	closeAndEmptyMainModal,
	logout,
	toogleIsModalOpened,
	toogleNavSidebar,
	updateSplashScreenLoginMessage,
} from '../../../reducers/actions/App.js'

var NavSidebar = {}

NavSidebar.mapStateToProps = function(state) {
	return {
	}
}

NavSidebar.mapDispatchToProps = function(dispatch) {
	return {
		toogleSidebar: () => dispatch(toogleNavSidebar()),
		updateLoginMessage: message => dispatch(updateSplashScreenLoginMessage(message)),
		logout: () => dispatch(logout()),
		closeModal: () => dispatch(closeAndEmptyMainModal()),
		updateModalContent: (modalContent, modalType) => dispatch(changeModalContent(modalContent, modalType)),
		toogleModal: () => dispatch(toogleIsModalOpened()),
	}
}

module.exports = NavSidebar
