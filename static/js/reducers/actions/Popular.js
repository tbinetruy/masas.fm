const ADD_TO_HISTORY = 'ADD_SONG_TO_POPULAR_HISTORY'
const POP_SONG_FROM_HISTORY = 'POP_SONG_FROM_HISTORY'
const UPDATE_API_GENRES = 'UPDATE_API_GENRES'
const UPDATE_TEXTBOX_VALUE = 'UPDATE_GENRES_TEXTBOX_VALUE'
const UPDATE_SELECTED_GENRE = 'UPDATE_SELECTED_GENRE'

function updateApiGenres(apiGenres) {
	return {
		type: UPDATE_API_GENRES,
		apiGenres
	}
}

function updateTextboxValue(textboxValue) {
	return {
		type: UPDATE_TEXTBOX_VALUE,
		textboxValue
	}
}

function updateSelectedGenre(genre) {
	return {
		type: UPDATE_SELECTED_GENRE,
		genre
	}
}

function addSongToHistory(MASAS_songInfo, SC_songInfo) {
	return {
		type: ADD_TO_HISTORY,
		MASAS_songInfo,
		SC_songInfo,
	}
}

function popSongFromHistory() {
	return {
		type: POP_SONG_FROM_HISTORY
	}
}

/**
 *
 */
const addRandomSongToHistory = () => async (dispatch) => {
	const MASAS_songInfoPromise = await fetch('/api/play/?&radio=popular')
	const MASAS_songInfo = await MASAS_songInfoPromise.json()

	const { SC_ID } = MASAS_songInfo
	const SC_songInfo= await SC.get('/tracks/' + SC_ID)

	dispatch(addSongToHistory(MASAS_songInfo, SC_songInfo))
}

export {
	ADD_TO_HISTORY,
	POP_SONG_FROM_HISTORY,
	UPDATE_API_GENRES,
	UPDATE_TEXTBOX_VALUE,
	UPDATE_SELECTED_GENRE,

	updateApiGenres,
	updateTextboxValue,
	updateSelectedGenre,
	addSongToHistory,
	popSongFromHistory,
	addRandomSongToHistory,
}