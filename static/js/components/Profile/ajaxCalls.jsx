import { store } from '../../reducers/reducers.js'
import { updateProfileInfo } from '../../reducers/actions/Profile.js'
const { dispatch } = store


// still here while refactoring
const updateProfileInfo2 = (callback) => {
	dispatch(updateProfileInfo(callback))
}

export {
	updateProfileInfo2 as updateProfileInfo,
}