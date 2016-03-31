let exportVar = {}

exportVar.defaultState = {
	discoverNumber: 1,						// which discover to show on page
	// history: {
	// 	1: [],
	// 	2: [],
	// 	3: [],
	// 	4: [],
	// 	5: [],
	// 	6: [],
	// }
	history: []
}

const { defaultState } = exportVar

exportVar.discoverReducer = function(state = defaultState, action) {
	
	switch(action.type) {
		case 'ADD_SONG_TO_HISTORY':
			// action.SC_songInfo: (object)
			// action.MASAS_songInfo: (object)

			// // don't add latest song in history if action.songInfo already in
			// var discoverNumber = parseInt(action.MASAS_songInfo.timeInterval.substr(action.MASAS_songInfo.timeInterval.length - 2, 1))

			// // check discover number within range
			// var stateBis = {...state}
			// if ( !(discoverNumber >= 1 && discoverNumber <= 6) ) {
			// 	return 
			// 	// if(state.history[ discoverNumber ].length > 0) {
			// 	// 	var a = state.history[ discoverNumber ][ state.history[ discoverNumber ].length - 1 ]
			// 	// 	var b = { MASAS_songInfo: action.MASAS_songInfo, SC_songInfo: action.SC_songInfo }
			// 	// 	if(JSON.stringify(a) === JSON.stringify(b) )
			// 	// 		return state
			// 	// }

			// 	stateBis.history[discoverNumber].push({MASAS_songInfo: action.MASAS_songInfo, SC_songInfo: action.SC_songInfo})
			// }

			return {
				...state,
				history: [
					...state.history,
					{
						SC_songInfo: action.SC_songInfo,
						MASAS_songInfo: action.MASAS_songInfo
					}
			}
			
		case 'POP_SONG_FROM_HISTORY':
			// action.discoverNumber: (int) 1-6

			// var discoverNumber = action.discoverNumber
			var stateBis = state
			// if (discoverNumber >= 1 && discoverNumber <= 6)
				stateBis.history[discoverNumber].pop()

			return {
				...state,
				history: stateBis.history
			}
		case 'CHANGE_DISCOVER_NUMBER':
			var discoverNumber = action.discoverNumber
			if( !(discoverNumber <= 6 && discoverNumber >= 1) )
				discoverNumber = 1

			return {
				...state,
				discoverNumber
			}
		default:
			return state
	}
}


module.exports = exportVar