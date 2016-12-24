import 'whatwg-fetch'
var Cookie = require("js-cookie")

var { browserHistory } = require("react-router")

export const updateAuthCookie = (userToken) => {
	Cookie.set("MASAS_authToken", userToken)
}

// (obj) userDict => userDict.userToken and userDict.userPk 
export const updateProfilePicture = ({ userToken, userPk }) => {
	var header = "Bearer " + userToken

	if(typeof(FB) !== "undefined")
		$.ajax({
			type: "PATCH",
			url: "/api/users/" + userPk + "/",
			headers: {
				"Authorization": header,
				"Content-Type": "application/json"
			},
			data: JSON.stringify({
				avatar_url: "https://graph.facebook.com/v2.5/" + FB.getUserID() + "/picture",
			}),
			success: () => { },
			error: () => { }
		})
}

export const updateUserInfo = (userPk, userToken) => {
	return dispatch => {
		$.ajax({
			type: "GET",
			url: "/api/users/" + userPk + "/",
			success: userData => {
				// check that terms and conditions were accepted (commented for now, might not need it)
				const hasAcceptedTerms = 1 // userData.usersteps.filter( (userStep) => userStep.step === 1).length

				if(hasAcceptedTerms) {
					updateProfilePicture({ userToken, userPk, userData })

					// log in user
					dispatch({ type: "UPDATE_USER_PK", pk: userPk })
					dispatch({ type: "LOGIN", token: userToken, userData , pk: userPk })
					dispatch({ type: "UPDATE_NOTIFICATION_TEXT", notificationText: "" })
					dispatch({ type: "UPDATE_NOTIFICATION_TEXT", notificationText: "Welcome !" })

					// if(window.location.pathname !== "/")
					// 	browserHistory.push('/')
				} else {
					// show terms and conditions form
					var TermsAndCond = require("./components/Login/TermsAndCond.jsx")
					dispatch({ type: "CHANGE_MODAL_CONTENT", modalContent: <TermsAndCond userPk={ parseInt(userPk) } userToken={ userToken } userData={ userData } /> })
					dispatch({ type: "TOOGLE_IS_MODAL_OPENED" })
				}
			},
			error: e => {
			}
		})
	}
}

export const logInWithToken = (removeVariable, userToken) => {
	return dispatch => {
		var header = "Bearer " + userToken
		$.ajax({
			type: "GET",
			url: "/api/check-user/",	
			headers: {
				"Authorization": header,
			},
			success: (data) => {
				if(data.userPk !== "None") {
					if(data.auth === "None") {
						// remove cookie
						const delete_cookie = function( name ) {
							document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
						}

						delete_cookie("MASAS_authToken")
					} else {
						var pk = data.userPk

						updateUserInfo(pk, userToken)
					}
				}

				// render app
				dispatch({type:"DONE_PROCESSING_AUTH_COOKIE"})
			},
			error: (err) => {
				// render app
				dispatch({type: "UPDATE_NOTIFICATION_TEXT", notificationText: ""})
				dispatch({type: "UPDATE_NOTIFICATION_TEXT", notificationText: err.responseText})
				dispatch({type:"DONE_PROCESSING_AUTH_COOKIE"})

			},
		})
	}
}

export const acceptTerms = (userToken, userData, userPk) => {
	return dispatch => {
		var header = "Bearer " + userToken

		$.ajax({
			type: "POST",
			url: "/api/usersteps/",
			headers: {
				"Authorization": header,
			},
			data: {
				user: userData.url,
				step: 1,
			},
			success: () => {
				dispatch({ type: "UPDATE_USER_PK", pk: userPk })
				dispatch({ type: "LOGIN", token: userToken, userData , pk: userPk })
				dispatch({ type: "TOOGLE_IS_MODAL_OPENED" })
				dispatch({ type: "UPDATE_NOTIFICATION_TEXT", notificationText: "" })
				dispatch({ type: "UPDATE_NOTIFICATION_TEXT", notificationText: "Welcome !" })
				
				browserHistory.push("/profile")
			},
			error: () => {
				dispatch({ type: "UPDATE_NOTIFICATION_TEXT", notificationText: "" })
				dispatch({ type: "UPDATE_NOTIFICATION_TEXT", notificationText: "Welcome !" })
			}
		})
	}
}

export const convertToken = () => {
	return dispatch => {
		$.ajax({
			type: "POST",
			url: "/auth/convert-token/",
			data: {
				grant_type: "convert_token",
				client_id: "biHRTlM74WJ2l8NddjR6pa8uNYpWC4vFzTjyjOUO",
				client_secret: "aNXFRxyW20wBDLmTlf4ntmFKYSQ7qvig3PSRLlSxBYfxpmFPnh9JJz876eLMIeZJaoYyM2F6Q7q36QveAWacmiOT14y1z0EwpqO7lQVhXBx037FNGr6mDwYNq1fGfNVl",
				backend: "facebook",
				token: FB.getAccessToken(),
			},
			success: (data) => { 
				logInWithToken(dispatch, data.access_token)
				getUserPk(data.access_token, updateProfilePicture)	
				updateAuthCookie(data.access_token)
			},
			error: () => { 
				dispatch({type:"LOGOUT"})
			}
		})
	}
}

export const getUserPk = (userToken, callbackFunc = null) => {
	return dispatch => {
		var header = "Bearer " + userToken
		$.ajax({
			type: "GET",
			url: "/api/check-user/",	
			headers: {
				"Authorization": header,
			},
			success: (data) => {
				var pk = data.userPk

				dispatch({type: "UPDATE_USER_PK", pk: pk})

				if(callbackFunc)
					callbackFunc({ userToken, userPk: data.userPk})
			},
			error: () => {
			},
		})
	}
}

export const loginFB = () => {
	// if FB SDK not loaded
	if (typeof(FB) === "undefined")
		return 0

	// CHECK IF FB ACCESS TOKEN ALREADY EXISTS
	const FB_token  = FB.getAccessToken()
	if(FB_token) {
		convertToken(FB_token)
	}
	else
		FB.login( (response) => {
			if (response.status === 'connected') {
				// Logged into your app and Facebook.
				convertToken(FB.getAccessToken())
			} else if (response.status === 'not_authorized') {
				// The person is logged into Facebook, but not your app.
			} else {
				// The person is not logged into Facebook, so we're not sure if
				// they are logged into this app or not.
			}
		})
}
