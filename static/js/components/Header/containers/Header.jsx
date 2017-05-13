import {
	closeAndEmptyMainModal,
	toogleNavSidebar,
} from "../../../reducers/actions/App.js"

import {
	toogleIsFooterOpened,
} from "../../../reducers/actions/Footer.js"

import {
	changeHomePageNumber,
} from "../../../reducers/actions/Home.js"

var Header = {}

Header.mapStateToProps = function(state) {
	return {
		pageType: state.appReducer.pageType,
		pageTitle: state.appReducer.pageTitle,
		user: state.appReducer.MASASuser,
		isPlayerBarOpened: state.footerReducer.isOpened,
		backArrowFunc: state.appReducer.backArrowFunc,
		isAppFetching: state.appReducer.isAppFetching,
		songPlaying: state.playerReducer.songPlaying,
		MASASuser: state.appReducer.MASASuser,
		isModalOpened: state.appReducer.isModalOpened,
		modalType: state.appReducer.modalType,
	}
}

Header.mapDispatchToProps = function(dispatch) {
	return {
		onSetNavSidebarOpen: () => dispatch(toogleNavSidebar()),
		toogleIsOpened: () => dispatch(toogleIsFooterOpened()),
		goToHomepageSlide1: () => dispatch(changeHomePageNumber(1,4)),
		closeModal: () => dispatch(closeAndEmptyMainModal()),
	}
}

module.exports = Header
