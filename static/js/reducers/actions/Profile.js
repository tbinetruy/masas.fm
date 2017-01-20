import "whatwg-fetch"

import {
	updateNotificationBar
} from "./Header.js"

// var { isObjectEmpty } = require("../../MASAS_functions.jsx")
const isObjectEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object

export const UPDATE_USER_SC_SONGS = 'UPDATE_USER_SC_SONGS'
export const UPDATE_PUBLIC_PROFILE_INFO = 'UPDATE_PUBLIC_PROFILE_INFO'
export const TOGGLE_EDITING_PROFILE = 'TOOGLE_EDITING_PROFILE'
export const UPDATE_EDIT_PROFILE_TEXTBOX_VALUES = 'UPDATE_EDIT_PROFILE_TEXTBOX_VALUES'
export const UPDATE_SONG_MOOD_MODAL_VALUE = 'UPDATE_SONG_MOOD_MODAL_VALUE'
export const UPDATE_BACK_ARROW_FUNC = 'UPDATE_BACK_ARROW_FUNC'


// returns url of random default avatar
export const getRandomDefaultAvatar = () => {
	const avatarUrlRoot = "/static/img/avatars/"
	const avatarUrlSuffix = ".svg"
	const randomAvatar = Math.floor(Math.random() * 6)

	return avatarUrlRoot + randomAvatar + avatarUrlSuffix
}

// isDefaultPicture: (bool) should update profile with url of default profile picture
// pictureURL: (str) url of profile picture if not default
export const updateProfilePicture = (isDefaultPicture, pictureURL) => (dispatch, getState) =>{
	const state = getState()
	const {
		MASASuser,
		MASASuserPk,
	} = state
	const header = "Bearer " + MASASuser
	let avatar_url = getRandomDefaultAvatar()

	if(!isDefaultPicture)
		avatar_url = pictureURL

	$.ajax({
		type: "PATCH",
		url: "/api/users/" + MASASuserPk + "/",
		headers: {
			"Authorization": header,
			"Content-Type": "application/json"
		},
		data: JSON.stringify({
			avatar_url,
		}),
		success: () => {
			const { userData } = getState().appReducer

			if(userData.avatar_url !== avatar_url)
				dispatch(updateUserInfo(userPk, userToken))
		},
		error: () => { }
	})
}

export function updateProfileBackArrowFunc(backArrowFunc) {
	return {
		type: UPDATE_BACK_ARROW_FUNC,
		backArrowFunc
	}
}
export function updateEditProfileTextboxValues(textboxValues) {
	return {
		type: UPDATE_EDIT_PROFILE_TEXTBOX_VALUES,
		textboxValues,
	}
}

export function updateSongMoodModalValue(discoverNumber) {
	return {
		type: UPDATE_SONG_MOOD_MODAL_VALUE,
		discoverNumber
	}
}

export function toggleEditingProfile() {
	return {
		type: TOGGLE_EDITING_PROFILE,
	}
}

export function updatePublicProfileInfo(publicProfileInfo) {
	return {
		type: UPDATE_PUBLIC_PROFILE_INFO,
		publicProfileInfo
	}
}

export function updateUserSCSongs(userSCSongs) {
	return {
		type:UPDATE_USER_SC_SONGS,
		userSCSongs,
	}
}

export function getSCinfo() {
	return (dispatch, getState) => {
		const state = getState()
		const { publicProfileInfo } = state.profileReducer
		const { userData } = state.appReducer

		var songs = {}

		if(isObjectEmpty(publicProfileInfo))
			songs = userData.songs
		else
			songs = publicProfileInfo.songs

		if(typeof(songs) !== "undefined") {
			var idString = songs.map( song => song.SC_ID ).join()

			SC.get('tracks', {limit: 200, ids: idString}).then( (response) => {
				dispatch(updateUserSCSongs(response))
			})
		}
	}
}


// (int) userPk : user pk
export function getPublicProfileInfo(userPk) {
	return dispatch => fetch("/api/users/" + userPk + "/")
			.then( resp => resp.json() )
			.then( resp => {
				dispatch( updatePublicProfileInfo(resp) )
				dispatch( getSCinfo() )
			} )
}

export function updateProfileInfo(callback) {
	return (dispatch, getState) => {
		const state = getState()
		const { MASASuser, userData } = state.appReducer

		var headers = new Headers()
		headers.append("Authorization", "Bearer " + MASASuser)

		fetch(userData.url, { headers })
		.then( r => r.json() )
		.then( userData => {
			dispatch({ type: 'UPDATE_USER_DATA', userData })
			if(callback)
				callback()
		})
	}
}

function updateLinks(userData, textboxValues, header, csrftoken) {
	return dispatch => {
		const counterTotal = textboxValues.link_set.filter(a => a !== "").length
		var counterSuccess = 0

		textboxValues.link_set.map( textboxLink => {
			if(textboxLink !== "")
				fetch("/api/links/", {
					method: "POST",
					headers: {
						"Authorization": header,
						"X-CSRFToken": csrftoken,
						"content-type": "application/json",
					},
					body: JSON.stringify({
						link: textboxLink,
						user: userData.url
					}),
				}).then( r => {
					counterSuccess = counterSuccess + 1

					if(counterSuccess === counterTotal) {
						dispatch(updateProfileInfo())
						dispatch(updateNotificationBar('Profile updated !'))
					}
				}).catch( e => {
					dispatch(updateNotificationBar("Error updating profile..."))
					// optimistic ui, close profile on save click and show again if problem occurred
					dispatch(toggleEditingProfile())
				})
		})
	}
}

function deleteLinks(userData, textboxValues, header, csrftoken) {
	return dispatch => {
		const counterTotal = userData.link_set.length
		var counterSuccess = 0

		if(!counterTotal)
			dispatch(updateLinks(userData, textboxValues, header, csrftoken))
		else {
			userData.link_set.map((userLink) => {
				fetch(userLink.url, {
					method: "DELETE",
					headers: {
						"Authorization": header,
						"X-CSRFToken": csrftoken
					}
				}).then( r => {
					counterSuccess = counterSuccess + 1

					if(counterSuccess === counterTotal) {
						dispatch(updateLinks(userData, textboxValues, header, csrftoken))
					}
				}).catch( e => {
					dispatch(updateNotificationBar("Error updating profile..."))
				})
			})
		}
	}
}

// saves profile
// getCookie: function to get for csrftoken from cookies
// callbackSuccess: callback to call on success
// callbackError: callback to call on error
export function saveProfile(getCookie, callbackSuccess = () => {}, callbackError = () => {}) {
	return (dispatch, getState) => {
		const state = getState()
		const { MASASuser, userData } = state.appReducer
		const userToken = MASASuser
		var textboxValues = { ...state.profileReducer.textboxValues }
		delete textboxValues.link_set
		// textboxValues.city = textboxValues.city

		const header = "Bearer " + userToken
		var csrftoken = getCookie("csrftoken")

		////////// UPDATE PROFILE
		fetch(userData.url, {
			method: "PATCH",
			headers: {
				"Authorization": header,
				"X-CSRFToken": csrftoken,
				"content-type": "application/json"
			},
			body: JSON.stringify(textboxValues),
		}).then( r => {
			textboxValues = { ...state.profileReducer.textboxValues }
			dispatch(deleteLinks(userData, textboxValues, header, csrftoken))

			callbackSuccess()

			// close edit profile
			dispatch(toggleEditingProfile())
		}).catch( e => {
			dispatch(updateNotificationBar("Error updating profile..."))

			callbackError()
		})
	}
}



