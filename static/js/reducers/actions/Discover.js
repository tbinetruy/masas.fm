export const ADD_SONG_TO_HISTORY = "ADD_SONG_TO_HISTORY"
export const CHANGE_DISCOVER_NUMBER = "CHANGE_DISCOVER_NUMBER"
export const REMOVE_SONG_FROM_HISTORY = "REMOVE_SONG_FROM_HISTORY"

export function removeSongFromHistory(indexToRemove) {
	return {
		type: REMOVE_SONG_FROM_HISTORY,
		indexToRemove
	}
}

export function changeDiscoverNumber(discoverNumber) {
	return {
		type: CHANGE_DISCOVER_NUMBER,
		discoverNumber
	}
}

export function addSongToHistory(MASAS_songInfo, SC_songInfo) {
	return {
		type: ADD_SONG_TO_HISTORY,
		MASAS_songInfo,
		SC_songInfo,
		artistInfo: null,
	}
}

/**
 *
 */
export const addRandomSongToHistory = interval => async (dispatch) => {
	const MASAS_songInfoPromise = await fetch('/api/play/?&time_interval_id=' + interval )
	const MASAS_songInfo = await MASAS_songInfoPromise.json()

	const { SC_ID } = MASAS_songInfo
	const SC_songInfo= await SC.get('/tracks/' + SC_ID)

	dispatch(addSongToHistory(MASAS_songInfo, SC_songInfo))
}


