//
//	All functions used that I don't know where to factor that are often used throughout the code
//

// should not touch redux states

// some functions still do but should be removed soon

import 'whatwg-fetch'

const { dispatch } = require('./reducers/reducers.js')

import {
	pausePlayer,
	playNewSong,
	playPreviousSongInHistory,
	playRandomSong,
	toggleSongLike,
} from './reducers/actions/Player.js'

import {
	closeAndEmptyMainModal,
} from './reducers/actions/App.js'

import {
	updateNotificationBar,
} from './reducers/actions/Header.js'

var { browserHistory } = require('react-router')
var Cookie = require('js-cookie')

var MASAS_functions = {}

/////
/////
/////
////		Ajax
////
/////
/////

// userStep: (int)
MASAS_functions.consts = {
	userSteps: {
		HAS_CREATED_PROFILE: 8,
	}
}
MASAS_functions.updateUserStep = (userData, userToken, userStep) => {

	const header = 'Bearer ' + userToken
	var csrftoken = MASAS_functions.getCookie('csrftoken')

	////////// UPDATE PROFILE
	fetch('/api/usersteps/', {
		method: 'POST',
		headers: {
			'Authorization': header,
			'X-CSRFToken': csrftoken,
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			user: userData.url,
			step: userStep
		}),
	}).then( r => {
	}).catch( e => {
	})
}

/////
/////
/////
////		Useful functions
////
/////
/////

// returns a dict with urls used for different pages on the website
MASAS_functions.getPathList = {
	home: '/',
	discover: '/discover',
	popular: '/crowdradio',
	likes: '/likes',
	profile: '/profile',
	user: '/user',
	legals: '/legals',
	upload: '/upload',
	settings: '/settings'
}

// return key pair object with key = url get params ; pair = value associated with get key
// source: http://stackoverflow.com/a/979995
MASAS_functions.getUrlParams = () => {
	// This function is anonymous, is executed immediately and
	// the return value is assigned to QueryString!
	var query_string = {}
	var query = window.location.search.substring(1)
	var vars = query.split('&')
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split('=')
		// If first entry with this name
		if (typeof query_string[pair[0]] === 'undefined') {
			query_string[pair[0]] = decodeURIComponent(pair[1])
		// If second entry with this name
		} else if (typeof query_string[pair[0]] === 'string') {
			var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ]
			query_string[pair[0]] = arr
		// If third or later entry with this name
		} else {
			query_string[pair[0]].push(decodeURIComponent(pair[1]))
		}
	}

	return query_string
}

// input: usersteps from masas api
// output: array of ints filled with user steps
MASAS_functions.getUserSteps = usersteps => {
	return usersteps.map( entry => entry.step )
}

// source: http://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
MASAS_functions.copyTextToClipboard = function(text) {
	var textArea = document.createElement('textarea')

	//
	// *** This styling is an extra step which is likely not required. ***
	//
	// Why is it here? To ensure:
	// 1. the element is able to have focus and selection.
	// 2. if element was to flash render it has minimal visual impact.
	// 3. less flakyness with selection and copying which **might** occur if
	//    the textarea element is not visible.
	//
	// The likelihood is the element won't even render, not even a flash,
	// so some of these are just precautions. However in IE the element
	// is visible whilst the popup box asking the user for permission for
	// the web page to copy to the clipboard.
	//

	// Place in top-left corner of screen regardless of scroll position.
	textArea.style.position = 'fixed'
	textArea.style.top = 0
	textArea.style.left = 0

	// Ensure it has a small width and height. Setting to 1px / 1em
	// doesn't work as this gives a negative w/h on some browsers.
	textArea.style.width = '2em'
	textArea.style.height = '2em'

	// We don't need padding, reducing the size if it does flash render.
	textArea.style.padding = 0

	// Clean up any borders.
	textArea.style.border = 'none'
	textArea.style.outline = 'none'
	textArea.style.boxShadow = 'none'

	// Avoid flash of white box if rendered for any reason.
	textArea.style.background = 'transparent'


	textArea.value = text

	document.body.appendChild(textArea)

	textArea.select()

	try {
		var successful = document.execCommand('copy')
		var msg = successful ? 'successful' : 'unsuccessful'
		console.log('Copying text command was ' + msg)
	} catch (err) {
		console.log('Oops, unable to copy')
	}

	document.body.removeChild(textArea)
}


MASAS_functions.getDiscoverNumberFromCurrentTime = () => {
	const hours = new Date().getHours()

	if(hours >= 4 && hours < 8)
		return 1
	else if(hours >= 8 && hours < 12)
		return 2
	else if(hours >= 12 && hours < 15)
		return 3
	else if(hours >= 15 && hours < 18)
		return 4
	else if(hours >= 18 && hours < 22)
		return 5
	else if(hours >= 22 || hours < 4)
		return 6
}

MASAS_functions.getUserPkFromURL = url => {
	var str = url
	str = str.slice(0, str.length-1)
	str = str.substring(str.lastIndexOf('/')+1,str.length)

	return str
}

MASAS_functions.getTimeIntervalNumberFromUrl = url => {
	return MASAS_functions.getUserPkFromURL(url)
}

MASAS_functions.isObjectEmpty = obj => Object.keys(obj).length === 0 && obj.constructor === Object
MASAS_functions.isObjectNotEmpty = obj => Object.keys(obj).length !== 0 && obj.constructor === Object

MASAS_functions.background = {
	blur: () => {
		$('#body--background').addClass('blurred')
	},
	unblur: () => {
		$('#body--background').removeClass('blurred')
	}
}

MASAS_functions.discoverHashtagNames = () => {
	return [
		'#EarlyMorning',
		'#LateMorning',
		'#EarlyAfternoon',
		'#LateAfternoon',
		'#EarlyEvening',
		'#LateEvening'
	]
}

MASAS_functions.timeIntervalURLToString = (timeIntervalURL) => {
	var switchVar = timeIntervalURL.substr(timeIntervalURL.length - 2, 1)
	const hastagNames = MASAS_functions.discoverHashtagNames()

	switch(switchVar) {
		case '1:
			return hastagNames[0]
		case "2":
			return hastagNames[1]
		case "3":
			return hastagNames[2]
		case "4":
			return hastagNames[3]
		case "5":
			return hastagNames[4]
		case "6":
			return hastagNames[5]
		default:
			return ""
	}
}

// https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
MASAS_functions.makePromiseCancelable = (promise) => {
	let hasCanceled_ = false;

	const wrappedPromise = new Promise((resolve, reject) => {
		promise.then((val) =>
			hasCanceled_ ? reject({isCanceled: true}) : resolve(val)
		)

		promise.catch((error) =>
			hasCanceled_ ? reject({isCanceled: true}) : reject(error)
		)
	})

	return {
		promise: wrappedPromise,
		cancel() {
			hasCanceled_ = true
		},
	}
}

MASAS_functions.updateAuthCookie = (userToken) => {
	Cookie.set("MASAS_authToken", userToken)
}

MASAS_functions.goToURL = (path) => {
	browserHistory.push(path)
}

// using jQuery
MASAS_functions.getCookie = (name) => {
	var cookieValue = null
	if (document.cookie && document.cookie != "") {
		var cookies = document.cookie.split(";")
		for (var i = 0; i < cookies.length; i++) {
			var cookie = $.trim(cookies[i])
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) == (name + "=")) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
				break
			}
		}
	}
	return cookieValue
}

// (BOOL) checks if a sequence is a subsequence of a string
MASAS_functions.isSubsequence = (sequence, string) => {
	if (string.toLowerCase().includes(sequence.toLowerCase()))
		return true
	else
		return false
}

// returns 1-6 for timeInterval based on songId
MASAS_functions.getTimeIntervalFromURL = (timeIntervalURL) => {
	return parseInt(timeIntervalURL.substr(timeIntervalURL.length - 2, 1))
}

/////
/////
/////
////		PROFILE
////
/////
/////


MASAS_functions.logout = () => {
	Cookie.remove("MASAS_authToken")

	dispatch({type: "LOGOUT"})

	FB.logout(function(response) {
		MASAS_functions.updateNotificationBar("Logged out !")
	})
}


/////
/////
/////
////		PLAYER (legacy functions that might still be used)
////
/////
/////

// pause player
MASAS_functions.pausePlayer = () => {
	dispatch(pausePlayer())
}

MASAS_functions.playPreviousSong = () => {
	dispatch(playPreviousSongInHistory())
}

// update player state with new song (playNewSong in Player/ajaxCalls will take care of playing it on state change)
// addToHistory: (BOOL) should song be added to history
MASAS_functions.playNewSong = () => {
	dispatch(playNewSong())
}

// gets song based on timeInteral and play song
MASAS_functions.playRandomSong = (MASASuser, timeInterval = 0) => {
	dispatch(playRandomSong(timeInterval))
},

// songId = url to django rest for this song
// Refactor with like and dislike functions called from toogleSongLike
MASAS_functions.toggleSongLike = (userToken, songId) => {
	dispatch(toggleSongLike(songId))
}

/////
/////
/////
////		Other UI
////
/////
/////

MASAS_functions.closeModal = () => {
	dispatch(closeAndEmptyMainModal())
}

MASAS_functions.updateNotificationBar = (notificationText) => {
	dispatch(updateNotificationBar(notificationText))

}

module.exports = MASAS_functions
