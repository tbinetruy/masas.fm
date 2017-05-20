const ADD_SONG_TO_HISTORY = 'ADD_SONG_TO_HISTORY'
const CHANGE_DISCOVER_NUMBER = 'CHANGE_DISCOVER_NUMBER'
const REMOVE_SONG_FROM_HISTORY = 'REMOVE_SONG_FROM_HISTORY'


function removeSongFromHistory(indexToRemove) {
	return {
		type: REMOVE_SONG_FROM_HISTORY,
		indexToRemove
	}
}

function changeDiscoverNumber(discoverNumber) {
	return {
		type: CHANGE_DISCOVER_NUMBER,
		discoverNumber
	}
}

function addSongToHistory(MASAS_songInfo, SC_songInfo) {
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
const addRandomSongToHistory = interval => async (dispatch) => {
	const MASAS_songInfoPromise = await fetch('/api/play/?&time_interval_id=' + interval )
	const MASAS_songInfo = await MASAS_songInfoPromise.json()

	const { SC_ID } = MASAS_songInfo
	const SC_songInfo= await SC.get('/tracks/' + SC_ID)

	dispatch(addSongToHistory(MASAS_songInfo, SC_songInfo))
}



export {
	ADD_SONG_TO_HISTORY,
	CHANGE_DISCOVER_NUMBER,
	REMOVE_SONG_FROM_HISTORY,

	addRandomSongToHistory,
	addSongToHistory,
	changeDiscoverNumber,
	removeSongFromHistory,
}