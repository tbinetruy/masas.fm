export const ADD_TO_HISTORY = "ADD_SONG_TO_POPULAR_HISTORY"

export const POP_SONG_FROM_HISTORY = "POP_SONG_FROM_HISTORY"

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