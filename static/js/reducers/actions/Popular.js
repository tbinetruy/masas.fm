export const ADD_TO_HISTORY = 'ADD_SONG_TO_POPULAR_HISTORY'

export const POP_SONG_FROM_HISTORY = 'POP_SONG_FROM_HISTORY'

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