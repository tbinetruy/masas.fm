import {
	updatePageTitle,
} from "../../../reducers/actions/App.js"

var NoSCSongs = {}

NoSCSongs.mapStateToProps = function(state) {
	return {
	}
}

NoSCSongs.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
	}
}

module.exports = NoSCSongs
