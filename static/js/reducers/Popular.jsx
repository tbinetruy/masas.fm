import {
	ADD_TO_HISTORY,
	POP_SONG_FROM_HISTORY,
	UPDATE_API_GENRES,
	UPDATE_SELECTED_GENRE,
	UPDATE_TEXTBOX_VALUE,
} from './actions/Popular.js'

let exportVar = {}

exportVar.defaultState = {
	history: [],							// array containing info relative to  songs played from popular
	genre: {								// (obj) data relative to popular genre selection
		apiGenres: [],						// (array) genres retrieved from api
		selectedGenre: '',					// (str) genre selected
		textboxValue: '',					// (str) textbox value
	}
}

const { defaultState } = exportVar

exportVar.popularReducer = function(state = defaultState, action) {

	switch(action.type) {
		case UPDATE_SELECTED_GENRE:
			return {
				...state,
				genre: {
					...state.genre,
					selectedGenre: action.genre
				}
			}
		case UPDATE_TEXTBOX_VALUE:
			return {
				...state,
				genre: {
					...state.genre,
					textboxValue: action.textboxValue
				}
			}
		case UPDATE_API_GENRES:
			return {
				...state,
				genre: {
					...state.genre,
					apiGenres: action.apiGenres
				}
			}
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
		case POP_SONG_FROM_HISTORY:
			var stateBis = state
			stateBis.history.pop()

			return {
				...state,
				history: stateBis.history
			}
		default:
			return state
	}
}


module.exports = exportVar