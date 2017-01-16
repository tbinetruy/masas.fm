import {
	updatePageTitle,
} from "../../../reducers/actions/App.js"
var Popular = {}

Popular.mapStateToProps = function(state) {
	return {
		userPk: state.appReducer.MASASuserPk,
	}
}

Popular.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
	}
}

module.exports = Popular
