import 'whatwg-fetch'

import {
	updateNotificationBar,
} from './Header.js'

import { getCookie } from '../../MASAS_functions.jsx'
const isObjectEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object

const UPDATE_USER_SC_SONGS = 'UPDATE_USER_SC_SONGS'
const UPDATE_PUBLIC_PROFILE_INFO = 'UPDATE_PUBLIC_PROFILE_INFO'
const TOGGLE_EDITING_PROFILE = 'TOOGLE_EDITING_PROFILE'
const UPDATE_EDIT_PROFILE_TEXTBOX_VALUES = 'UPDATE_EDIT_PROFILE_TEXTBOX_VALUES'
const UPDATE_SONG_MOOD_MODAL_VALUE = 'UPDATE_SONG_MOOD_MODAL_VALUE'
const UPDATE_BACK_ARROW_FUNC = 'UPDATE_BACK_ARROW_FUNC'
const RESET_TEXTBOX_VALUES = 'RESET_TEXTBOX_VALUES'
const SET_EDITING_PROFILE_VISIBILITY = 'SET_EDITING_PROFILE_VISIBILITY'

const updateUserStep = step => (disptach, getState) => {
	const { MASASuser, userData } = getState().appReducer

	const header = 'Bearer ' + MASASuser
	var csrftoken = getCookie('csrftoken')

	if(MASASuser) {
		fetch('/api/usersteps/', {
			method: 'POST',
			headers: {
				'Authorization': header,
				'X-CSRFToken': csrftoken,
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				user: userData.url,
				step
			}),
		}).then(() => disptach(updateProfileInfo()))
	}
}

const resetTextboxValue = () => {
	return {
		type: RESET_TEXTBOX_VALUES,
	}
}

// returns url of random default avatar
const getRandomDefaultAvatar = () => {
	const avatarUrlRoot = '/static/img/avatars/'
	const avatarUrlSuffix = '.svg'
	const randomAvatar = Math.floor(Math.random() * 6)

	return avatarUrlRoot + randomAvatar + avatarUrlSuffix
}

// isDefaultPicture: (bool) should update profile with url of default profile picture
// pictureURL: (str) url of profile picture if not default
const updateProfilePicture = (isDefaultPicture, pictureURL) => (dispatch, getState) => {
	const state = getState()
	const {
		MASASuser,
		MASASuserPk,
	} = state
	const header = 'Bearer ' + MASASuser
	let avatar_url = getRandomDefaultAvatar()

	if(!isDefaultPicture)
		avatar_url = pictureURL

	$.ajax({
		type: 'PATCH',
		url: '/api/users/' + MASASuserPk + '/',
		headers: {
			'Authorization': header,
			'Content-Type': 'application/json'
		},
		data: JSON.stringify({
			avatar_url,
		}),
		success: () => {
			const { userData } = getState().appReducer

			dispatch(updateProfileInfo())
		},
		error: () => { }
	})
}

function updateProfileBackArrowFunc(backArrowFunc) {
	return {
		type: UPDATE_BACK_ARROW_FUNC,
		backArrowFunc
	}
}
function updateEditProfileTextboxValues(textboxValues) {
	return {
		type: UPDATE_EDIT_PROFILE_TEXTBOX_VALUES,
		textboxValues,
	}
}

function updateSongMoodModalValue(discoverNumber) {
	return {
		type: UPDATE_SONG_MOOD_MODAL_VALUE,
		discoverNumber
	}
}

function toggleEditingProfile() {
	return {
		type: TOGGLE_EDITING_PROFILE,
	}
}

function setEditingProfile(isEditingProfile) {
	return {
		type: SET_EDITING_PROFILE_VISIBILITY,
		isEditingProfile: !!isEditingProfile,
	}
}

function updatePublicProfileInfo(publicProfileInfo) {
	return {
		type: UPDATE_PUBLIC_PROFILE_INFO,
		publicProfileInfo
	}
}

function updateUserSCSongs(userSCSongs) {
	return {
		type:UPDATE_USER_SC_SONGS,
		userSCSongs,
	}
}

function getSCinfo() {
	return (dispatch, getState) => {
		const state = getState()
		const { publicProfileInfo } = state.profileReducer
		const { userData } = state.appReducer

		var songs = {}

		if(isObjectEmpty(publicProfileInfo))
			songs = userData.songs
		else
			songs = publicProfileInfo.songs

		if(typeof(songs) !== 'undefined') {
			var idString = songs.map( song => song.SC_ID ).join()

			SC.get('tracks', {limit: 200, ids: idString}).then( (response) => {
				dispatch(updateUserSCSongs(response))
			})
		}
	}
}


// (int) userPk : user pk
function getPublicProfileInfo(userPk) {
	return dispatch => fetch('/api/users/' + userPk + '/')
			.then( resp => resp.json() )
			.then( resp => {
				dispatch( updatePublicProfileInfo(resp) )
				dispatch( getSCinfo() )
			} )
}

function updateProfileInfo(callback) {
	return (dispatch, getState) => {
		const state = getState()
		const { MASASuser, userData } = state.appReducer

		var headers = new Headers()
		headers.append('Authorization', 'Bearer ' + MASASuser)

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
		const counterTotal = textboxValues.link_set.filter(a => a !== '').length
		var counterSuccess = 0

		textboxValues.link_set.map( textboxLink => {
			if(textboxLink !== '')
				fetch('/api/links/', {
					method: 'POST',
					headers: {
						'Authorization': header,
						'X-CSRFToken': csrftoken,
						'content-type': 'application/json',
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
					dispatch(updateNotificationBar('Error updating profile...'))
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
					method: 'DELETE',
					headers: {
						'Authorization': header,
						'X-CSRFToken': csrftoken
					}
				}).then( r => {
					counterSuccess = counterSuccess + 1

					if(counterSuccess === counterTotal) {
						dispatch(updateLinks(userData, textboxValues, header, csrftoken))
					}
				}).catch( e => {
					dispatch(updateNotificationBar('Error updating profile...'))
				})
			})
		}
	}
}

// saves profile
// getCookie: function to get for csrftoken from cookies
// callbackSuccess: callback to call on success
// callbackError: callback to call on error
function saveProfile(getCookie, callbackSuccess = () => {}, callbackError = () => {}) {
	return (dispatch, getState) => {
		const state = getState()
		const { MASASuser, MASASuserPk, userData } = state.appReducer
		const userToken = MASASuser
		var textboxValues = { ...state.profileReducer.textboxValues }
		delete textboxValues.link_set
		// textboxValues.city = textboxValues.city

		const header = 'Bearer ' + userToken
		var csrftoken = getCookie('csrftoken')

		if(textboxValues.city === '')
			textboxValues.city = undefined

		////////// UPDATE PROFILE
		fetch(userData.url, {
			method: 'PATCH',
			headers: {
				'Authorization': header,
				'X-CSRFToken': csrftoken,
				'content-type': 'application/json'
			},
			body: JSON.stringify(textboxValues),
		}).then( r => {
			textboxValues = { ...state.profileReducer.textboxValues }
			dispatch(deleteLinks(userData, textboxValues, header, csrftoken))

			// update profile info state on save
			dispatch(updateProfileInfo())

			callbackSuccess()

			// close edit profile
			dispatch(toggleEditingProfile())
		}).catch( e => {
			dispatch(updateNotificationBar('Error updating profile...'))

			callbackError()
		})
	}
}

export {
	RESET_TEXTBOX_VALUES,
	SET_EDITING_PROFILE_VISIBILITY,
	TOGGLE_EDITING_PROFILE,
	UPDATE_BACK_ARROW_FUNC,
	UPDATE_EDIT_PROFILE_TEXTBOX_VALUES,
	UPDATE_USER_SC_SONGS,
	UPDATE_PUBLIC_PROFILE_INFO,
	UPDATE_SONG_MOOD_MODAL_VALUE,

	getPublicProfileInfo,
	getRandomDefaultAvatar,
	getSCinfo,
	resetTextboxValue,
	saveProfile,
	setEditingProfile,
	toggleEditingProfile,
	updateEditProfileTextboxValues,
	updateProfilePicture,
	updateProfileBackArrowFunc,
	updateProfileInfo,
	updatePublicProfileInfo,
	updateSongMoodModalValue,
	updateUserStep,
	updateUserSCSongs,
}
