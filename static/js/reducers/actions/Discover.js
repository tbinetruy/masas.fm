export const ADD_SONG_TO_HISTORY = "ADD_SONG_TO_HISTORY"


export function addSongToHistory(MASAS_songInfo, SC_songInfo, artistInfo) {
	return {
		type: ADD_SONG_TO_HISTORY,
		MASAS_songInfo,
		SC_songInfo,
		artistInfo
	}
}
