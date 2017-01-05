import {
	ADD_TO_HISTORY,

} from "./actions/Popular.js"

let exportVar = {}

exportVar.defaultState = {
	history: [],							// array containing info relative to  songs played from popular
}

const { defaultState } = exportVar

exportVar.popularReducer = function(state = defaultState, action) {
	
	switch(action.type) {
		case ADD_TO_HISTORY:
			return {
				...state,
				history: [
					...state.history,
					{
						MASAS_songInfo: action.MASAS_songInfo,
						SC_songInfo: action.SC_songInfo,
					}
				]
			};

		default:
			return state
	}
}


module.exports = exportVar