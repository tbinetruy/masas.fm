import {
	changeModalContent,
	closeAndEmptyMainModal,
	doneProcessingAuthCookie,
	setAppFetchingStateFalse,
	setAppFetchingStateTrue,
	toogleIsModalOpened,
} from '../../../reducers/actions/App.js'

import {
	changeUnsplashArtist,
} from '../../../reducers/actions/Home.js'

import {
	loginWithToken,
} from '../../../reducers/actions/login.js'

import {
	addRandomSongToHistory as addRandomSongToDiscoverHistory,
} from '../../../reducers/actions/discover.js'

import {
	addRandomSongToHistory as addRandomSongToPopularHistory
} from '../../../reducers/actions/popular.js'

var App = {}

// Which part of the Redux global state does our component want to receive as props?
App.mapStateToProps = function(state) {
	return {
		navSiderbarOpen: state.appReducer.navSiderbarOpen,
		processingAuthCookie: state.appReducer.processingAuthCookie,
		MASASuser: state.appReducer.MASASuser,
		userData: state.appReducer.userData,

		bgFilter: state.appReducer.bgFilter,
		modalType: state.appReducer.modalType,
		isModalOpened: state.appReducer.isModalOpened,
		modalContent: state.appReducer.modalContent,
	}
}

// Which action creators does it want to receive by props?
App.mapDispatchToProps = function(dispatch) {
	return {
        addRandomSongToDiscoverHistory: interval => dispatch(addRandomSongToDiscoverHistory(interval)),
		addRandomSongToPopularHistory: () => dispatch(addRandomSongToPopularHistory()),
		toogleModal: () => dispatch(toogleIsModalOpened()),
		closeModal: () => dispatch(closeAndEmptyMainModal()),
		loginWithToken: authToken => dispatch(loginWithToken(authToken)),
		forceRender: () => dispatch(doneProcessingAuthCookie()),
		showAppFetchingBar: () => dispatch(setAppFetchingStateTrue()),
		hideAppFetchingBar: () => dispatch(setAppFetchingStateFalse()),
		updateUnsplashArtist: () => dispatch(changeUnsplashArtist()),
		updateModalContent: (modalContent, modalType) => dispatch(changeModalContent(modalContent, modalType)),
	}
}

module.exports = App
