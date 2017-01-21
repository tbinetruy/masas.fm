import 'whatwg-fetch'
var Cookie = require("js-cookie")

import {
	updateNotificationBar,
} from "./Header.js"


// global vars to this file
let GOOGLE_USER_ID = undefined
const GOOGLE_API_KEY = "AIzaSyCOTG3VdcDm8hAKe1abZQMjIggV4atedtI"

export const logout = () => {
	return dispatch => {
		Cookie.remove("MASAS_authToken")

		dispatch({type: "LOGOUT"})

		FB.logout(function(response) {
			updateNotificationBar("Logged out !")
		})
	}
}

export const updateUserEmail = ({ userPk, userToken, userData }) => {
	const header = "Bearer " + userToken

	if(typeof(FB) !== "undefined") {
		FB.api("/me", { locale: "en_US", fields: "name, email" },
			function({ email }) {

				// update email if user email not defined yet
				if(email && !userData.email)
					$.ajax({
						type: "PATCH",
						url: "/api/users/" + userPk + "/",
						headers: {
							"Authorization": header,
							"Content-Type:": "application/json"
						},
						data: JSON.stringify({
							email,
						}),
						success: () => {
						},
						error: () => {
						}
					})
			}
		)
	}
}

export const updateAuthCookie = userToken => {
	Cookie.set("MASAS_authToken", userToken, { expires: 30 })
}

export const getUserPk = (userToken, callbackFunc = null) => dispatch => {
	var header = "Bearer " + userToken
	$.ajax({
		type: "GET",
		url: "/api/check-user/",
		headers: {
			"Authorization": header,
		},
		success: r => {
			var pk = r.userPk

			dispatch({type: "UPDATE_USER_PK", pk: pk})

			if(callbackFunc)
				callbackFunc({ userToken, userPk: r.userPk})
		},
		error: () => {
		},
	})
}


// isDefaultPicture: (bool) should update profile with url of default profile picture
// pictureURL: (str) url of profile picture if not default
export const updateProfilePicture = pictureURL => (dispatch, getState) =>{
	const state = getState()
	const {
		MASASuser,
		MASASuserPk,
	} = state.appReducer
	const header = "Bearer " + MASASuser
	const avatar_url = pictureURL

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
				dispatch(updateUserInfo(MASASuserPk, MASASuser))
		},
		error: () => { }
	})
}

// updates profile picture
export const updateUserInfo = (userPk, userToken) => dispatch => {
	$.ajax({
		type: "GET",
		url: "/api/users/" + userPk + "/",
		success: userData => {

			// log in user
			dispatch({ type: "UPDATE_USER_PK", pk: userPk })
			dispatch({ type: "LOGIN", token: userToken, userData , pk: userPk })
			dispatch({ type: "UPDATE_NOTIFICATION_TEXT", notificationText: "" })
			dispatch({ type: "UPDATE_NOTIFICATION_TEXT", notificationText: "Welcome !" })
		},
		error: () => {
		}
	})
}


// checks masas api user token and logs him in UI if token valid
// userToken: (str) masas api user token
// backend: (str) backend used to log in (to update profile picture)
export const loginWithToken = (userToken, backend) => dispatch => {
	var header = "Bearer " + userToken
	$.ajax({
		type: "GET",
		url: "/api/check-user/",
		headers: {
			"Authorization": header,
		},
		success: r => {
			if(r.userPk !== "None") {
				if(r.auth === "None") {
					// remove cookie
					const delete_cookie = function( name ) {
						document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
					}

					delete_cookie("MASAS_authToken")
				} else {
					var pk = r.userPk

					dispatch(updateUserInfo(pk, userToken, backend))
				}
			}

			// render app
			dispatch({type:"DONE_PROCESSING_AUTH_COOKIE"})
		},
		error: e => {
			// render app
			dispatch({type: "UPDATE_NOTIFICATION_TEXT", notificationText: ""})
			dispatch({type: "UPDATE_NOTIFICATION_TEXT", notificationText: e.responseText})
			dispatch({type:"DONE_PROCESSING_AUTH_COOKIE"})
		},
	})
}

// converts backend (FB, google, etc) tokens to MASAS token (masas api)
export const convertToken = (token, backend) => dispatch =>{
	$.ajax({
		type: "POST",
		url: "/auth/convert-token/",
		data: {
			grant_type: "convert_token",
			client_id: "biHRTlM74WJ2l8NddjR6pa8uNYpWC4vFzTjyjOUO",
			client_secret: "aNXFRxyW20wBDLmTlf4ntmFKYSQ7qvig3PSRLlSxBYfxpmFPnh9JJz876eLMIeZJaoYyM2F6Q7q36QveAWacmiOT14y1z0EwpqO7lQVhXBx037FNGr6mDwYNq1fGfNVl",
			backend,
			token,
		},
		success: r => {
			dispatch(loginWithToken(r.access_token, backend))
			dispatch(getUserPk(r.access_token))
			updateAuthCookie(r.access_token)
		},
		error: () => {
			dispatch({ type:"LOGOUT" })
		}
	})
}

// get token from FB and convert it to MASAS token
export const loginFB = () => dispatch => {
	// if FB SDK not loaded
	if (typeof(FB) === "undefined")
		return 0

	// CHECK IF FB ACCESS TOKEN ALREADY EXISTS
	const FB_token  = FB.getAccessToken()
	if(FB_token)
		dispatch(convertToken(FB_token, 'facebook'))
	else
		FB.login( (response) => {
			if (response.status === 'connected') {
				// Logged into your app and Facebook.
				dispatch(convertToken(FB.getAccessToken(), 'facebook'))
			} else if (response.status === 'not_authorized') {
				// The person is logged into Facebook, but not your app.
			} else {
				// The person is not logged into Facebook, so we're not sure if
				// they are logged into this app or not.
			}
		})
}

const loginGoogle = token => dispatch => {
	GOOGLE_USER_ID = token
	dispatch(convertToken(token, 'google-oauth2'))
}

// get token from oauth apis
// service: service to oauth against
// 'twiiter', 'facebook'
// token: undefined for FB (calculated later) ; token value as string if Google
export const login = (service, token = undefined) => dispatch => {
	switch(service) {
		case 'facebook':
			dispatch(loginFB())
			break
		case 'google':
			dispatch(loginGoogle(token))
			break
		case 'twitter':
			dispatch(convertToken(token, service))
			break
	}
}
