import 'whatwg-fetch'
var Cookie = require("js-cookie")

import {
	updateNotificationBar,
} from "./Header.js"


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

// (obj) userDict => userDict.userToken and userDict.userPk 
export const updateProfilePicture = ({ userToken, userPk }) => (dispatch, getState) =>{
	const header = "Bearer " + userToken

	if(typeof(FB) !== "undefined")
		if(FB.getUserID()) {
			const avatar_url = "https://graph.facebook.com/v2.5/" + FB.getUserID() + "/picture"

			$.ajax({
				type: "PATCH",
				url: "/api/users/" + userPk + "/",
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
}

export const updateUserInfo = (userPk, userToken) => dispatch => {
	$.ajax({
		type: "GET",
		url: "/api/users/" + userPk + "/",
		success: userData => {
			dispatch(updateProfilePicture({ userToken, userPk, userData }))

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

export const loginWithToken = userToken => dispatch => {
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

					dispatch(updateUserInfo(pk, userToken))
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
			dispatch(loginWithToken(r.access_token))
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

// get token from oauth apis
// service: service to oauth against
// 'twiiter', 'facebook'
export const login = service => dispatch => {
	switch(service) {
		case 'facebook':
			dispatch(loginFB())
			break
		case 'twitter':
			break
	}
}
