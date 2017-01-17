import {
	resumePlayer
} from "../../../reducers/actions/Player.js"

import {
	updatePageTitle,
	updateMiniProfileContent,
	updateSplashScreenLoginMessage,
	toogleIsModalOpened,
	changeModalContent,
} from "../../../reducers/actions/App.js"

var ArtworkLineItem = {}

ArtworkLineItem.mapStateToProps = function(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
	}
}

ArtworkLineItem.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
		updateLoginMessage: message => dispatch(updateSplashScreenLoginMessage(message)),
		updateModalContent: (modalContent, modalType) => dispatch(changeModalContent(modalContent, modalType)),
		toggleModal: () => dispatch(toogleIsModalOpened()),
		resumePlayer: () => dispatch(resumePlayer()),
		updateMiniProfileContent: userApiURL => dispatch(updateMiniProfileContent(userApiURL))
	}
}

module.exports = ArtworkLineItem
