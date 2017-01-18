import {
	fetchLikes,
	updateLikes,
	toogleHashtagFilter,
	updateLikesSearchInput,
} from "../../../reducers/actions/Likes.js"

import {
	toogleIsModalOpened,
	changeModalContent,
	updatePageTitle,
} from "../../../reducers/actions/App.js"

var Likes = {}

// Which part of the Redux global state does our component want to receive as props?
Likes.mapStateToProps = function(state) {
	return {
		// userLikes: state.likesReducer.userLikes,
		userData: state.appReducer.userData,
		SCinfo: state.likesReducer.SCinfo,
		userPk: state.appReducer.MASASuserPk,
		reFetch: state.likesReducer.reFetch,
		searchInput: state.likesReducer.searchInput,
		hashtagFilter: state.likesReducer.hashtagFilter,
		userLikes: state.likesReducer.userLikes,
	}
}

// Which action creators does it want to receive by props?
Likes.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
		getLikes: () => dispatch(fetchLikes()),
		updateLikes: SCinfo => dispatch(updateLikes(SCinfo)),
		toogleModal: () => dispatch(toogleIsModalOpened()),
		updateModalContent: modalContent => dispatch(changeModalContent(modalContent)),
		toogleHashtag: hashtagNumber => dispatch(toogleHashtagFilter(hashtagNumber)),
		updateSearchInput: input => dispatch(updateLikesSearchInput(input)),
	}
}

module.exports = Likes
