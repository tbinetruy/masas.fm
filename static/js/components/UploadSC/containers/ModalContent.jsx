import { toogleIsModalOpened } from '../../../reducers/actions/App.js'


// Which part of the Redux global state does our component want to receive as props?
const mapStateToProps = function(state) {
	return {
	}
}

// Which action creators does it want to receive by props?
const mapDispatchToProps = function(dispatch) {
	return {
		toogleIsModalOpened: () => dispatch(toogleIsModalOpened()),
	}
}

export {
	mapDispatchToProps,
	mapStateToProps,
}