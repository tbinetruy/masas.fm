/**
 * need to remove store dependency and move to action creator
 */
import { store } from '../reducers/reducers.js'
import { changeBgState } from '../reducers/actions/App.js'

const { dispatch } = store


const MobileBlurBackground = {
	componentDidMount: function() {
		// add blur class to background
		dispatch(changeBgState.blurMobile(true))
	},

	componentWillUnmount: function() {
		// remove blur class from background
		dispatch(changeBgState.blurMobile(false))
	}
}

const BlurBackground = {
	componentDidMount: function() {

		// add blur class to background
		dispatch(changeBgState.blur(true))
	},

	componentWillUnmount: function() {
		// remove blur class from background
		dispatch(changeBgState.blur(false))
	}
}

export {
	MobileBlurBackground,
	BlurBackground,
}
