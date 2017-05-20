import 'whatwg-fetch'

const UPDATE_NUMBER_OF_LIKES_SHOWN = 'UPDATE_NUMBER_OF_LIKES_SHOWN'
const REQUEST_LIKES = 'REQUEST_LIKES'
const TOOGLE_HASHTAG_FILTER = 'TOOGLE_HASHTAG_FILTER'
const UPDATE_LIKES = 'UPDATE_LIKES'
const UPDATE_MINI_PROFILE = 'UPDATE_LIKE_ARTWORK_MINI_PROFILE'
const TOGGLE_MINI_PROFILE = 'TOGGLE_LIKE_ARTWORK_MINI_PROFILE'
const UPDATE_LIKES_SEARCH_INPUT = 'UPDATE_LIKES_SEARCH_INPUT'

function updateLikesSearchInput(input) {
	return {
		type: UPDATE_LIKES_SEARCH_INPUT,
		input
	}
}

function updateNumberLikesShown(numRowLikesShown) {
	return {
		type: UPDATE_NUMBER_OF_LIKES_SHOWN,
		numRowLikesShown
	}
}

function updateLikes(SCinfo) {
	return {
		type: 'UPDATE_LIKES',
		SCinfo,
		userLikes: null
	}
}

// const apiRoot = 'http://masas.fm//'
function toogleHashtagFilter(hashtagNumber) {
	return {
		type: TOOGLE_HASHTAG_FILTER,
		hashtagNumber,
	}
}

function requestLikes() {
	return {
		type: REQUEST_LIKES
	}
}

function updateLikesOld(SCinfo) {
	return {
		type: UPDATE_LIKES,
		SCinfo,
		userLikes: null
	}
}

function updateMiniProfile(songPk, artistInfo) {
	return {
		type: UPDATE_MINI_PROFILE,
		songPk,
		artistInfo
	}
}

function fetchMiniProfile(MASAS_songInfo) {
	return dispatch => fetch(MASAS_songInfo.song.trackArtist)
			.then( resp => resp.json() )
			.then( resp => dispatch( updateMiniProfile(MASAS_songInfo.pk, resp)) )
}

function updateLikes(dispatch, SCinfo, MASASinfo) {
	const userLikes =  SCinfo.map( song => {
		var MASAS_songInfo = MASASinfo.filter( like => like.song.SC_ID === song.id )

		if(MASAS_songInfo.length === 1) {
			// dispatch(fetchMiniProfile(MASAS_songInfo[0]))
			return {
				SC_songInfo: song,
				MASAS_songInfo: MASAS_songInfo[0],
				showProfile: false,
				artistInfo: null,
			}
		} else
			return
	})

	return {
		type: UPDATE_LIKES,
		SCinfo,
		userLikes,
	}
}

function toogleMiniProfile(MASAS_songPk) {
	return {
		type: TOGGLE_MINI_PROFILE,
		songPk: MASAS_songPk,
	}
}

function fetchLikes() {
	return (dispatch, getState) => {
		const state = getState()
		const { userData } = state.appReducer

		if(typeof(userData.likes) !== 'undefined') {
			var idString = userData.likes.map( like => like.song.SC_ID ).join()
			SC.get('tracks', {limit: userData.likes.length, ids: idString})
			.then( response => {
				// dispatch(updateLikesOld(response))
				dispatch(updateLikes(dispatch, response, userData.likes))
			})
		} else {
			dispatch( updateLikes( dispatch, [], [] ) )
		}
	}
}

export {
	UPDATE_NUMBER_OF_LIKES_SHOWN,
	REQUEST_LIKES,
	TOOGLE_HASHTAG_FILTER,
	UPDATE_LIKES,
	UPDATE_MINI_PROFILE,
	TOGGLE_MINI_PROFILE,
	UPDATE_LIKES_SEARCH_INPUT,

	updateLikesSearchInput,
	updateNumberLikesShown,
	updateLikes,
	toogleHashtagFilter,
	toogleMiniProfile,
	fetchLikes,
}