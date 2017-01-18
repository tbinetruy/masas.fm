import {
	toogleIsModalOpened,
} from "../../../reducers/actions/App.js"

var ModalContent = {}

// Which part of the Redux global state does our component want to receive as props?
ModalContent.mapStateToProps = function(state) {
	return {
	}
}

// Which action creators does it want to receive by props?
ModalContent.mapDispatchToProps = function(dispatch) {
	return {
		toogleIsModalOpened: () => dispatch(toogleIsModalOpened()),
	}
}

module.exports = ModalContent
