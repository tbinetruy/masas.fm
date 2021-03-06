import 'whatwg-fetch'

import {
	addSongToHistory as addSongToDiscoverHistory,
	removeSongFromHistory
} from './Discover.js'

import {
	addSongToHistory as addSongToPopularHistory,
	popSongFromHistory,
} from './Popular.js'

import {
	updateNotificationBar,
	updateNotificationText,
} from './Header.js'

import { getTimeIntervalNumberFromUrl } from './MASAS_functions.js'
import { updateProfileInfo } from './Profile.js'



const POPULAR = -1

///// TO DELETE
const getCookie = (name) => {
	var cookieValue = null
	if (document.cookie && document.cookie != '') {
		var cookies = document.cookie.split(';')
		for (var i = 0; i < cookies.length; i++) {
			var cookie = $.trim(cookies[i])
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) == (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
				break
			}
		}
	}
	return cookieValue
}

export {
}

const SET_SONG_IS_FETCHING_TRUE = 'SET_SONG_IS_FETCHING_TRUE'
const UPDATE_MASAS_SONG_INFO = 'UPDATE_MASAS_SONG_INFO'
const UPDATE_SC_SONG_INFO = 'UPDATE_SC_SONG_INFO'
const UPDATE_ARTIST_INFO = 'UPDATE_ARTIST_INFO'
const SET_SONG_IS_FETCHING_FALSE = 'SET_SONG_IS_FETCHING_FALSE'
const LIKE_SONG = 'LIKE_SONG'
const UNLIKE_SONG = 'UNLIKE_SONG'
const STOP = 'STOP'
const PLAY = 'PLAY'
const PAUSE = 'PAUSE'
const PLAY_NEW_SONG = 'PLAY_NEW_SONG'
const PLAY_NEW_SONG_FROM_PLAYLIST = 'PLAY_NEW_SONG_FROM_PLAYLIST'
const SET_IS_BUFFERING_TRUE = 'SET_IS_BUFFERING_TRUE'
const SET_IS_BUFFERING_FALSE = 'SET_IS_BUFFERING_FALSE'
const TOOGLE_SONG_LIKE = 'TOGGLE_SONG_LIKE'
const LOAD_PLAYLIST = 'LOAD_PLAYLIST'
const SET_PLAYING_FROM_POPULAR = 'SET_PLAYING_FROM_POPULAR'


function loadPlaylist(playlist) {
	return {
		type: LOAD_PLAYLIST,
		playlist
	}
}

function toggleSongLike(songId) {
	return (dispatch, getState) => {
		const state = getState()
		const { MASASuserPk } =  state.appReducer
		const userToken = state.appReducer.MASASuser

		// optimistic UI
		dispatch({ type: TOOGLE_SONG_LIKE })

		// NO ACTION IF NO SONG IS PROVIDED
		if(!songId) {
			window.setTimeout( () => {
				dispatch(updateNotificationText(''))
				dispatch(updateNotificationText('No song is playing!'))

				// remove optimistic UI
				dispatch({ type: TOOGLE_SONG_LIKE })
			}, 0)

			return
		}

		// NO ACTION IF USER IS NOT LOGGED IN
		if(!userToken) {
			window.setTimeout( () => {
				dispatch(updateNotificationText(''))
				dispatch(updateNotificationText('Login to like music!'))

				// remove optimistic UI
				dispatch({ type: TOOGLE_SONG_LIKE })
			}, 0)

			return
		}


		// server check and UI update if necessary
		var header = 'Bearer ' + userToken
		var csrftoken = getCookie('csrftoken')

		const headers = {
			'Authorization': header,
			'X-CSRFToken': csrftoken
		}

		fetch(
			'/api/users/' + MASASuserPk + '/',
			{
				credentials: 'include',
				headers
			}
		)
		.then( r => r.json() )
		.then( user => {
			// var likes = user.likes

			var isSongLiked = user.likes.filter( (like) => {
				return like.song.url === songId
			})

			// song not liked yet
			if(isSongLiked.length === 0) {
				fetch('/api/statuses/', {
					method: 'POST',
					headers: { ...headers, 'content-type': 'application/json' },
					body: JSON.stringify({
						user: user.url,
						song: songId,
						status: 1
					})
				}).then( () => {
					// update UI
					dispatch({ type: LIKE_SONG })

					dispatch(updateNotificationText(''))
					dispatch(updateNotificationText('song liked'))

					// update user profile data
					dispatch(updateProfileInfo())
				}).catch( () => dispatch({ type: TOOGLE_SONG_LIKE }) )
			} else {

				// find if song liked => unlike
				var songLiked = user.likes.filter( (like) => { return like.song.url === songId } )

				if(songLiked.length === 1) {
					songLiked = isSongLiked[0]

					fetch(songLiked.url, {
						method: 'DELETE',
						headers
					}).then( () => {
						dispatch({ type: UNLIKE_SONG })

						dispatch(updateNotificationText(''))
						dispatch(updateNotificationText('song unliked'))

						// update user profile data
						dispatch(updateProfileInfo())
					}).catch( () => dispatch({ type: TOOGLE_SONG_LIKE }) )
				}

			}
		})
		.catch( () => {
			dispatch(updateNotificationText(''))
			dispatch(updateNotificationText('Login to like songs!'))

			// remove optimistic UI
			dispatch({ type: TOOGLE_SONG_LIKE })
		})
	}
}


function setIsPlayerBuffering(value = true) {
	if(value)
		return {
			type: SET_SONG_IS_FETCHING_TRUE
		}
	else
		return {
			type: SET_SONG_IS_FETCHING_FALSE
		}
}

// see playerReducer
function likeSong(value = true) {
	if(value)
		return {
			type: LIKE_SONG
		}
	else
		return {
			type: UNLIKE_SONG
		}
}

// update player like button based on like status of currently playing song by user
function updateLikeButton(MASAS_songInfo) {
	return (dispatch, getState) => {
		const state = getState()
		const {
			MASASuser,
			MASASuserPk
		} = state.appReducer

		var headers = new Headers()
		headers.append('Authorization', 'Bearer ' + MASASuser)

		if(MASASuserPk)
			fetch( '/api/users/' + MASASuserPk + '/', { headers })
			.then( r => r.json() )
			.then( user => {
				var isSongLiked = user.likes.filter( (like) => {
					return like.song.url === MASAS_songInfo.url
				})

				// update player state
				if (isSongLiked.length === 0)
					dispatch(likeSong(false))
				else
					dispatch(likeSong(true))
			}).catch( () => { } )

	}
}

// Updates state when fetch song to play info starts / ends
function setIsSongFetching(value = true) {
	if(value)
		return {
			type: SET_SONG_IS_FETCHING_TRUE
		}
	else
		return {
			type: SET_SONG_IS_FETCHING_FALSE
		}
}

// stops jPlayer
function stopPlayer() {
	return {
		type: STOP,
	}
}

// plays jPlayer
function playPlayer() {
	return {
		type: PLAY,
	}
}

// resumes song based on given URL
// playingFromPopular: (bool) are we resuming popular player
function resumePlayer(playingFromPopular = false) {
	// resume jPlayer
	$('#jquery_jplayer_1').jPlayer('play')

	// update UI state
	return {
		type: PLAY,
		playingFromPopular,
	}
}

// pause player
function pausePlayer() {
	return dispatch => {
		// pause player
		$('#jquery_jplayer_1').jPlayer('pause')

		// get time to start playing at this time when unpausing and update app state
		var pausingAtTime = Math.round($('#jquery_jplayer_1').data('jPlayer').status.currentTime)
		dispatch({ type: PAUSE, pausingAtTime: pausingAtTime })
	}
}

function updateJPlayerState(SC_songInfo, playAfterUpdateState = true) {
	var streamURL = SC_songInfo.stream_url + '?client_id=e5d965905a85b11e108d064bc04430a3'

	// If jPlayer hasn't being instanciated yet, instanciate it with song URL to play
	if($('#jquery_jplayer_1').data('jPlayer') === undefined) {
		$('#jquery_jplayer_1').jPlayer({
			ready: function(	) {
				$(this).jPlayer('setMedia', {
					mp3: streamURL,
					m4a: streamURL,
					oga: streamURL
				}).jPlayer('play')
			},

			// space bar triggers play pause
			keyBindings: {
				play: {
					key: 32,
					fn: function(f) {
						if(f.status.paused) {
							f.play()
						} else {
							f.pause()
						}
					}
				}
			},

			swfPath: 'http://jplayer.org/latest/dist/jplayer',
			supplied: 'mp3, oga',
			wmode: 'window',
			useStateClassSkin: true,
			autoBlur: false,
			smoothPlayBar: true,
			keyEnabled: true,
			remainingDuration: true,
			toggleDuration: true
		})
	// if jPlayer has already been instanciated, update the URL to play
	} else {
		$('#jquery_jplayer_1').jPlayer( 'clearMedia' )
		$('#jquery_jplayer_1').jPlayer('setMedia', {
			mp3: streamURL,
			m4a: streamURL,
			oga: streamURL
		})
	}

	// play jPlayer
	if(playAfterUpdateState)
		$('#jquery_jplayer_1').jPlayer('play')
}

// resets player state
function resetPlayer() {
	return dispatch => {
		// end loading state
		dispatch(setIsSongFetching(false))

		// stop player
		dispatch(stopPlayer())
	}
}

function updateMASAS_songInfo(songInfo) {
	return {
		type: UPDATE_MASAS_SONG_INFO,
		songInfo,
	}
}

function updateSC_songInfo(songInfo) {
	return {
		type: UPDATE_SC_SONG_INFO,
		songInfo,
	}
}

function updateArtistInfo(artistInfo) {
	return {
		type: UPDATE_ARTIST_INFO,
		artistInfo,
	}
}


// plays song from start based on given URL
// playFromPopular: (bool) is song played from popular (info useful for player bar next and back buttons)
function playSong(songURL, playingFromPopular = true) {
	return {
		type: PLAY_NEW_SONG,
		song: songURL,
		playingFromPopular,
	}
}

// called when state.playerReducer.songPlaying changes
// we get song to play from state
// grab its stream link from SC
// initiate jPlayer with new song
// and do all the necessary UI updates (update like button etc)
function playNewSong() {
	return (dispatch, getState) => {
		const state = getState()
		const {
			songPlaying,
			isPlaylistPlaying,
		} = state.playerReducer

		dispatch(setIsSongFetching(true))
		// dispatch(playSong(songPlaying))

		// if state.appReducer.MASAS_songInfo.SC_ID === state.appReducer.SC_songInfo.id
		fetch(songPlaying)
		.then( r => r.json() )
		.then( MASAS_songInfo => {
			// protect against empty array
			let state_SC_songInfo = {}
			if(state.playerReducer.SC_songInfo)
				state_SC_songInfo = state.playerReducer.SC_songInfo

			if(MASAS_songInfo.SC_ID !== state_SC_songInfo.id || !state_SC_songInfo.id) {
				SC.get('/tracks/' + MASAS_songInfo.SC_ID)
				.then( SC_songInfo => {
					updateJPlayerState(SC_songInfo)

					// update currently playing song state
					dispatch(updateMASAS_songInfo(MASAS_songInfo))
					dispatch(updateSC_songInfo(SC_songInfo))

					// add song to discover history if not playing from playlist
					if(!isPlaylistPlaying)
						dispatch(addSongToDiscoverHistory(MASAS_songInfo, SC_songInfo))

					// update song liked button based on server response (vs optimistic UI)
					dispatch(updateLikeButton(MASAS_songInfo))

					// end loading state
					dispatch(setIsSongFetching(false))
				})
				.catch( e => resetPlayer() )
			} else {
				// update song liked button based on server response (vs optimistic UI)
				dispatch(updateLikeButton(MASAS_songInfo))

				// end loading state
				dispatch(setIsSongFetching(false))
			}
		}).catch( e => resetPlayer() )
	}
}

// play previous song in history
function playPreviousSongInHistory() {
	return (dispatch, getState) => {
		const state = getState()
		const { history } = state.popularReducer

		// POP SONG FROM HISTORY
		dispatch(popSongFromHistory())

		// PLAY LATEST SONG IN HISTORY
		const songURL = history[history.length-1].MASAS_songInfo.url
		dispatch(playSong(songURL))
	}
}

// returns last song in history for a given discover number
// history: array ; discoverNum: int \in [0,5]
function lastSongInDiscoverHistory(history, discoverNum) {
	// go through history array
	var i = 0

	// looping from most recent song to oldest to converge quicker.
	// history.length 2
	for(i = history.length-2; i > -1; i--) {
		if(getTimeIntervalNumberFromUrl(history[i].MASAS_songInfo.timeInterval) === discoverNum) {
			return i
		}
	}

	return -1
}

// play previous song in discover
function playPreviousSongInDiscover(discoverNum) {
	return (dispatch, getState) => {
		const state = getState()
		const history = [].concat(state.discoverReducer.history.all)

		// find array index of latest song in history if it exists
		const indexToRemove = lastSongInDiscoverHistory(history, discoverNum)

		// remove it if it exists
		if(indexToRemove > -1) {
			dispatch(removeSongFromHistory(indexToRemove))

			// remove song that is currently playing
			dispatch(popSongFromHistory())

			// play it
			const removedSong = history.splice(indexToRemove,1)
			const url = removedSong[0].MASAS_songInfo.url
			dispatch(playSong(url))
		}
	}
}

function playRandomSong(timeInterval = 0) {
	return (dispatch, getState) => {
		const state = getState()
		const { MASASuser } = state.appReducer

		var URL = document.playUrl === undefined ? '/api/play/' : document.playUrl
		if (URL.indexOf('?') < 0)
			URL = URL + '?'

        // switch popular and dicover for testing
		if(timeInterval && timeInterval !== POPULAR)
			URL = URL + '&time_interval_id=' + timeInterval + '&radio=popular'

		else if(timeInterval && timeInterval === POPULAR) {
            // no time interval for discover for this test
			// const popularTimeInterval = getDiscoverNumberFromCurrentTime()
			// URL = URL + "&time_interval_id=" + popularTimeInterval
		}

		var headers = {}
		var method = 'GET'

		// make post request if unauth
		if(MASASuser !== '') {
			const header = 'Bearer ' + MASASuser

			headers = {
				'Authorization': header,
			}
		}

		dispatch(setIsSongFetching(true))
		fetch(URL, {
			headers,
			method,
			credentials: 'include'
		}).then( r => r.json() )
		.then( data => {
			// dispatch all necessary info and start playing
			dispatch(updateMASAS_songInfo(data))

			if(timeInterval === POPULAR)
				dispatch(addSongToPopularHistory(data, data.metadata))
			else
				dispatch(addSongToDiscoverHistory(data, data.metadata))

			updateJPlayerState(data.metadata)
			dispatch(updateSC_songInfo(data.metadata))
			dispatch(playSong(data.url, timeInterval === POPULAR))
		})
		.catch( e => {
			resetPlayer()

			if(e.status === 401)
				dispatch(updateNotificationBar('Login to play music !'))
		})
	}
}

function playNewSongFromPlaylist(playlistPosition) {
	return {
		type: PLAY_NEW_SONG_FROM_PLAYLIST,
		playlistPosition
	}
}

export {
	LIKE_SONG,
	LOAD_PLAYLIST,
	PAUSE,
	PLAY,
	POPULAR,
	PLAY_NEW_SONG,
	PLAY_NEW_SONG_FROM_PLAYLIST,
	SET_IS_BUFFERING_TRUE,
	SET_IS_BUFFERING_FALSE,
	SET_PLAYING_FROM_POPULAR,
	SET_SONG_IS_FETCHING_FALSE,
	SET_SONG_IS_FETCHING_TRUE,
	STOP,
	TOOGLE_SONG_LIKE,
	UPDATE_ARTIST_INFO,
	UPDATE_MASAS_SONG_INFO,
	UPDATE_SC_SONG_INFO,
	UNLIKE_SONG,

	loadPlaylist,
	lastSongInDiscoverHistory,
	toggleSongLike,
	playPlayer,
	pausePlayer,
	playNewSong,
	playNewSongFromPlaylist,
	playPreviousSongInDiscover,
	playPreviousSongInHistory,
	playRandomSong,
	playSong,
	resumePlayer,
	setIsPlayerBuffering,
	setIsSongFetching,
	stopPlayer,
	updateLikeButton,
}