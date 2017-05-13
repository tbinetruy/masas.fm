var Discover = {}
import {
	changeBgState,
	changeModalContent,
	closeAndEmptyMainModal,
	incrementLoggedOutUserStep,
	toogleIsModalOpened,
	updateModalType,
	updatePageTitle,
} from '../../../reducers/actions/App.js'

import {
	changeDiscoverNumber,
} from '../../../reducers/actions/Discover.js'

import {
	updateTipBar,
} from '../../../reducers/actions/Header.js'

// Which part of the Redux global state does our component want to receive as props?
Discover.mapStateToProps = function(state) {
	return {
		// app state
		userToken: state.appReducer.MASASuser,
		userData: state.appReducer.userData,
		modalType: state.appReducer.modalType,
		isModalOpened: state.appReducer.isModalOpened,

		// page state
		discoverNumber: state.discoverReducer.discoverNumber,

		// other states
		songPlaying: state.playerReducer.songPlaying,
		MASAS_songInfo: state.playerReducer.MASAS_songInfo,
		loggedOutUserStep: state.appReducer.loggedOutUserStep,
	}
}

// Which action creators does it want to receive by props?
Discover.mapDispatchToProps = function(dispatch) {
	return {
		// higher level state updates
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
		toogleModal: () => dispatch(toogleIsModalOpened()),
		updateModalContent: (modalContent, modalType, closeModalFunc) => dispatch(changeModalContent(modalContent, modalType, closeModalFunc)),
		updateModalType: modalType => dispatch(updateModalType(modalType)),
		closeModal: () => dispatch(closeAndEmptyMainModal()),
		blackBgFilter: () => dispatch(changeBgState.black()),
		resetBgFilter: () => dispatch(changeBgState.reset()),

		// page state updates

		// other state updates
		handleTimePickerChange: discoverNumber => dispatch(changeDiscoverNumber(discoverNumber)),
		incrementLoggedOutUserStep: () => dispatch(incrementLoggedOutUserStep()),
		updateTipBar: (text, step, tipCTA) => dispatch(updateTipBar(text, step, tipCTA))
	}
}

module.exports = Discover
