import Cookie from 'js-cookie'

var MASAS_functions = {}

/////
/////
/////
////		Useful functions
////
/////
/////

const getUserPkFromURL = url => {
	var str = url
	str = str.slice(0, str.length-1)
	str = str.substring(str.lastIndexOf('/')+1,str.length)

	return str
}

const getTimeIntervalNumberFromUrl = url => {
	return parseInt(MASAS_functions.getUserPkFromURL(url))
}

const isObjectEmpty = obj => Object.keys(obj).length === 0 && obj.constructor === Object
const isObjectNotEmpty = obj => Object.keys(obj).length !== 0 && obj.constructor === Object

const background = {
	blur: () => {
		$('#body--background').addClass('blurred')
	},
	unblur: () => {
		$('#body--background').removeClass('blurred')
	}
}

const discoverHashtagNames = () => {
	return [
		'#EarlyMorning',
		'#LateMorning',
		'#EarlyAfternoon',
		'#LateAfternoon',
		'#EarlyEvening',
		'#LateEvening'
	]
}

const timeIntervalURLToString = (timeIntervalURL) => {
	var switchVar = timeIntervalURL.substr(timeIntervalURL.length - 2, 1)
	const hastagNames = MASAS_functions.discoverHashtagNames()

	switch(switchVar) {
		case '1':
			return hastagNames[0]
		case '2':
			return hastagNames[1]
		case '3':
			return hastagNames[2]
		case '4':
			return hastagNames[3]
		case '5':
			return hastagNames[4]
		case '6':
			return hastagNames[5]
		default:
			return ''
	}
}

// https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
const makePromiseCancelable = (promise) => {
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

const updateAuthCookie = (userToken) => {
	Cookie.set('MASAS_authToken', userToken)
}


// using jQuery
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

// (BOOL) checks if a sequence is a subsequence of a string
const isSubsequence = (sequence, string) => {
	if (string.toLowerCase().includes(sequence.toLowerCase()))
		return true
	else
		return false
}

// returns 1-6 for timeInterval based on songId
const getTimeIntervalFromURL = (timeIntervalURL) => {
	return parseInt(timeIntervalURL.substr(timeIntervalURL.length - 2, 1))
}

export {
	getTimeIntervalFromURL,
	isSubsequence,
	getCookie,
	updateAuthCookie,
	makePromiseCancelable,
	timeIntervalURLToString,
	discoverHashtagNames,
	isObjectEmpty,
	isObjectNotEmpty,
	getTimeIntervalNumberFromUrl,
	getUserPkFromURL,
}