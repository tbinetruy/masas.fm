import {
	closeAndEmptyMainModal,
	toogleIsModalOpened,
	toogleNavSidebar,
	changeModalContent,
	logout,
} from "../../../reducers/actions/App.js"
//var { logout } = require("../../../MASAS_functions.jsx")

var NavSidebar = {}

NavSidebar.mapStateToProps = function(state) {
	return {
		navSiderbarOpen: state.appReducer.navSiderbarOpen,
		MASASuser: state.appReducer.MASASuser,
		userData: state.appReducer.userData,
		isModalOpened: state.appReducer.isModalOpened,
	}
}

NavSidebar.mapDispatchToProps = function(dispatch) {
	return {
		toogleSidebar: () => dispatch(toogleNavSidebar()),
		logout: () => dispatch(logout()),
		closeModal: () => dispatch(closeAndEmptyMainModal()),
		updateModalContent: (modalContent, modalType) => dispatch(changeModalContent(modalContent, modalType)),
		toogleModal: () => dispatch(toogleIsModalOpened()),
	}
}

module.exports = NavSidebar
