var {browserHistory} = require('react-router')
var Cookie = require('js-cookie')

var MASAS_functions = {}

MASAS_functions.logout = (dispatch) => {
	console.log("logout ===>", dispatch)
	Cookie.remove('MASAS_authToken')
	dispatch({type: 'LOGOUT'})
}

MASAS_functions.updateAuthCookie = (userToken) => {
	Cookie.set('MASAS_authToken', userToken)
}

MASAS_functions.goToURL = (path) => {
	browserHistory.push(path)
}

/*
	takes dispatch (from mapDispatchToProps(dispatch) in containers) and user token
	result: returns nothing. but updates appReducer's auth token and user pk
*/
MASAS_functions.logInWithToken = (dispatch, userToken) => {
	var header = "Bearer " + userToken
	$.ajax({
		type: "GET",
		url: 'api/check-user/',	
		headers: {
			"Authorization": header,
		},
		success: (data) => {
			if(data.userPk !== "None") {
				console.log(data)
				var pk = data.userPk

				// let picURL = "http://graph.facebook.com/me/picture?access_token=" + FB_token
				// FB.api(picURL, function(r) {
				// 	console.log(r)
					dispatch({type: 'UPDATE_USER_PK', pk: pk})
					dispatch({type: 'LOGIN', token: userToken, userData: data})
				// })
				
			}

			// render app
			dispatch({type:'DONE_PROCESSING_AUTH_COOKIE'})
		},
		error: (err) => {
			console.log(err)
			// render app
			dispatch({type:'DONE_PROCESSING_AUTH_COOKIE'})
		},
	})
}

// using jQuery
MASAS_functions.getCookie = function(name) {
	var cookieValue = null
	if (document.cookie && document.cookie != '') {
		var cookies = document.cookie.split(';')
		for (var i = 0; i < cookies.length; i++) {
			var cookie = jQuery.trim(cookies[i])
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) == (name + '=')) {
			    cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
			    break
			}
		}
	}
	return cookieValue
}

// pause player
MASAS_functions.pausePlayer = function(dispatch) {
	console.log('pausing')
	// pause player
	$("#jquery_jplayer_1").jPlayer('pause')
	
	// get time to start playing at this time when unpausing and update app state
	var pausingAtTime = Math.round($("#jquery_jplayer_1").data("jPlayer").status.currentTime)
	dispatch({ type: 'PAUSE', pausingAtTime: pausingAtTime })
}

MASAS_functions.playPreviousSong = function(dispatch, discoverHistory) {
	// POP SONG FROM HISTORY
	dispatch({ type: 'POP_SONG_FROM_HISTORY' })

	// PLAY LATEST SONG IN HISTORY
	console.log("SONG_URL =>", discoverHistory.all[discoverHistory.all.length-1].MASAS_songInfo.url)
	dispatch({ type: 'PLAY_NEW_SONG', song: discoverHistory.all[discoverHistory.all.length-1].MASAS_songInfo.url })
}

// play new random song based on song play count and likes
// addToHistory: (BOOL) should song be added to history
MASAS_functions.playNewSong = function(dispatch, MASAS_songId, addToHistory = true) {
	// PLAY NEW SONG
	dispatch({ type: 'PLAY_NEW_SONG', song: MASAS_songId})

	// STORE NEW SONG IN HISTORY if addToHistory = true
	// fetch MASAS song info
	if(addToHistory)
		$.ajax({
			type: "GET",
			url: MASAS_songId,
			success: (MASAS_songInfo) => {
				// fetch SC song info
				SC.get('/tracks/' + MASAS_songInfo.SC_ID).then((SC_songInfo) => {
					dispatch({
						type: 'ADD_SONG_TO_HISTORY',
						MASAS_songInfo,
						SC_songInfo
					})
				}).catch( (err) => {
					console.warn(err)
				})
			},
			error: (err) => {
				console.warn(err)
			},
		})
}

module.exports = MASAS_functions