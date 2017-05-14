export const ADD_TO_HISTORY = 'ADD_SONG_TO_POPULAR_HISTORY'
export const POP_SONG_FROM_HISTORY = 'POP_SONG_FROM_HISTORY'
export const UPDATE_API_GENRES = 'UPDATE_API_GENRES'
export const UPDATE_TEXTBOX_VALUE = 'UPDATE_GENRES_TEXTBOX_VALUE'
export const UPDATE_SELECTED_GENRE = 'UPDATE_SELECTED_GENRE'

export function updateApiGenres(apiGenres) {
	return {
		type: UPDATE_API_GENRES,
		apiGenres
	}
}

export function updateTextboxValue(textboxValue) {
	return {
		type: UPDATE_TEXTBOX_VALUE,
		textboxValue
	}
}

export function updateSelectedGenre(genre) {
	return {
		type: UPDATE_SELECTED_GENRE,
		genre
	}
}
export function addSongToHistory(MASAS_songInfo, SC_songInfo) {
	return {
		type: ADD_TO_HISTORY,
		MASAS_songInfo,
		SC_songInfo,
	}
}

export function popSongFromHistory() {
	return {
		type: POP_SONG_FROM_HISTORY
	}
}

/**
 *
 */
export const addRandomSongToHistory = () => async (dispatch) => {
	const MASAS_songInfoPromise = await fetch('/api/play/?&radio=popular')
	const MASAS_songInfo = await MASAS_songInfoPromise.json()

	const { SC_ID } = MASAS_songInfo
	const SC_songInfo= await SC.get('/tracks/' + SC_ID)

	dispatch(addSongToHistory(MASAS_songInfo, SC_songInfo))
}
