import { updateNotificationBar } from './Header.js'
var Cookie = require('js-cookie')

import { resetTextboxValue } from './Profile.js'

// to refactor
const isObjectEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object



const INCREMENT_LOGGED_OUT_USER_STEP = 'INCREMENT_LOGGED_OUT_USER_STEP'
const RESET_LOGGED_OUT_USER_STEP = 'RESET_LOGGED_OUT_USER_STEP'
const CHANGE_MODAL_CONTENT = 'CHANGE_MODAL_CONTENT'
const UPDATE_MODAL_TYPE = 'UPDATE_MODAL_TYPE'
const CLOSE_AND_EMPTY_MAIN_MODAL = 'CLOSE_AND_EMPTY_MAIN_MODAL'
const TOOGLE_IS_MODAL_OPENED = 'TOOGLE_IS_MODAL_OPENED'
const UPDATE_PAGE_TITLE = 'UPDATE_PAGE_TITLE'
const BLUR_BG = 'BLUR_BG'
const SATURATE_BG = 'SATURATE_BG'
const BLUR_BG_MOBILE = 'BLUR_BG_MOBILE'
const SATURATE_BG_MOBILE = 'SATURATE_BG_MOBILE'
const MODAL_SATURATE_BG = 'MODAL_SATURATE_BG'
const MODAL_BLUR_BG = 'MODAL_BLUR_BG'
const DONE_PROCESSING_AUTH_COOKIE = 'DONE_PROCESSING_AUTH_COOKIE'
const SET_APP_FETCHING_STATE_FALSE = 'SET_APP_FETCHING_STATE_FALSE'
const SET_APP_FETCHING_STATE_TRUE = 'SET_APP_FETCHING_STATE_TRUE'
const CHANGE_SLASH_SCREEN_PAGE = 'CHANGE_SLASH_SCREEN_PAGE'
const TOOGLE_NAV_SIDEBAR = 'TOOGLE_NAV_SIDEBAR'
const UPDATE_MINI_PROFILE_VISIBILITY = 'UPDATE_MINI_PROFILE_VISIBILITY'
const UPDATE_MINI_PROFILE_CONTENT = 'UPDATE_MINI_PROFILE_CONTENT'
const UPDATE_SC_SONG_INFO = 'UPDATE_MINI_PROFILE_SC_SONG_INFO'
const UPDATE_SPLASH_SCREEN_LOGIN_MESSAGE = 'UPDATE_SPLASH_SCREEN_LOGIN_MESSAGE'
const SHOW_PLAYER_MOBILE = 'SHOW_PLAYER_MOBILE'
const RESET_BG = 'RESET_BG'
const BLACK_BG = 'BLACK_BG'



const showPlayerMobile = isPlayerMobileShown => {
	// $desktop-min-width: 992px
	if($(window).width() > 992)
		return {
			type: ''
		}

	return {
		type: SHOW_PLAYER_MOBILE,
		isPlayerMobileShown,
	}
}

const updateSplashScreenLoginMessage = message => {
	return {
		type: UPDATE_SPLASH_SCREEN_LOGIN_MESSAGE,
		splashScreenLoginMessage: message,
	}
}

const logout = () => dispatch => {
	Cookie.remove('MASAS_authToken')

	// update appReducer state
	dispatch({type: 'LOGOUT'})

	// update edit profile state
	dispatch(resetTextboxValue())

	FB.logout(function(response) {
		updateNotificationBar('Logged out !')
	})
}

function updateMiniProfileSCsongInfo() {
	return (dispatch, getState) => {
		const state = getState()
		const { miniProfile } = state.appReducer


		var idString = miniProfile.userData.songs.map( song => song.SC_ID ).join()

		SC.get('tracks', {limit: 200, ids: idString}).then( SC_songInfo => {
			dispatch({
				type: UPDATE_SC_SONG_INFO,
				SC_songInfo
			})
		})
	}
}

function updateMiniProfileContent(userApiURL) {
	return dispatch => {
		fetch(userApiURL)
		.then( r => r.json() )
		.then( userData => {
			dispatch({
				type: UPDATE_MINI_PROFILE_CONTENT,
				userData
			})
		})
		.catch( () => { })
	}
}


function updateMiniProfileVisibility(isVisible) {
	return {
		type: UPDATE_MINI_PROFILE_VISIBILITY,
		isVisible
	}
}

function toogleNavSidebar() {
	return {
		type: 'TOOGLE_NAV_SIDEBAR'
	}
}

function changeSplashScreenPage(splashScreenPage) {
	return {
		type: CHANGE_SLASH_SCREEN_PAGE,
		splashScreenPage
	}
}

function setAppFetchingStateTrue() {
	return {
		type: SET_APP_FETCHING_STATE_TRUE
	}
}


function setAppFetchingStateFalse() {
	return {
		type: SET_APP_FETCHING_STATE_FALSE
	}
}

function doneProcessingAuthCookie() {
	return {
		type: DONE_PROCESSING_AUTH_COOKIE
	}
}

function incrementLoggedOutUserStep() {
	return {
		type: INCREMENT_LOGGED_OUT_USER_STEP
	}
}
function resetLoggedOutUserStep() {
	return {
		type: RESET_LOGGED_OUT_USER_STEP
	}
}

function changeModalContent(modalContent, modalType = 1, closeModalFunc = () => {} ) {
	if(closeModalFunc === undefined)
		closeModalFunc = () => {}

	return {
		type: CHANGE_MODAL_CONTENT,
		modalContent,
		modalType,
		closeModalFunc
	}
}

function updateModalType(modalType) {
	return {
		type: UPDATE_MODAL_TYPE,
		modalType,
	}
}

function closeAndEmptyMainModal() {
	return {
		type: CLOSE_AND_EMPTY_MAIN_MODAL
	}
}

function toogleIsModalOpened() {
	return {
		type: TOOGLE_IS_MODAL_OPENED,
	}
}

function updatePageTitle(title, pageType, backArrowFunc = () => {}) {
	return {
		type: UPDATE_PAGE_TITLE,
		title,
		pageType,
		backArrowFunc
	}
}



const changeBgState = {}

changeBgState.black = function() {
	return {
		type: BLACK_BG,
	}
}

changeBgState.reset = function() {
	return {
		type: RESET_BG,
	}
}

// blur = bool
changeBgState.blur = function(blur) {
	var isBlurred = true
	if(!blur)
		isBlurred = blur
	return {
		type: BLUR_BG,
		isBlurred
	}
}

// sat = bool
changeBgState.saturate = function(sat) {
	var isSaturated = true
	if(!sat)
		isSaturated = sat
	return {
		type: SATURATE_BG,
		isSaturated,
	}
}

// blur = bool
changeBgState.modalBlur = function(blur) {
	var isBlurred = true
	if(!blur)
		isBlurred = blur
	return {
		type: MODAL_BLUR_BG,
		isBlurred
	}
}

// sat = bool
changeBgState.modalSaturate = function(sat) {
	var isSaturated = true
	if(!sat)
		isSaturated = sat
	return {
		type: MODAL_SATURATE_BG,
		isSaturated,
	}
}

// blur = bool
changeBgState.blurMobile = function(blur) {
	var isBlurred = true
	if(!blur)
		isBlurred = blur
	return {
		type: BLUR_BG_MOBILE,
		isBlurred
	}
}

// sat = bool
changeBgState.saturateMobile = function(sat) {
	var isSaturated = true
	if(!sat)
		isSaturated = sat
	return {
		type: SATURATE_BG_MOBILE,
		isSaturated,
	}
}


export {
	BLACK_BG,
	BLUR_BG,
	BLUR_BG_MOBILE,
	CHANGE_MODAL_CONTENT,
	CHANGE_SLASH_SCREEN_PAGE,
	CLOSE_AND_EMPTY_MAIN_MODAL,
	DONE_PROCESSING_AUTH_COOKIE,
	INCREMENT_LOGGED_OUT_USER_STEP,
	MODAL_BLUR_BG,
	MODAL_SATURATE_BG,
	RESET_LOGGED_OUT_USER_STEP,
	SATURATE_BG,
	SATURATE_BG_MOBILE,
	SHOW_PLAYER_MOBILE,
	SET_APP_FETCHING_STATE_FALSE,
	SET_APP_FETCHING_STATE_TRUE,
	TOOGLE_IS_MODAL_OPENED,
	TOOGLE_NAV_SIDEBAR,
	UPDATE_MINI_PROFILE_VISIBILITY,
	UPDATE_MINI_PROFILE_CONTENT,
	UPDATE_MODAL_TYPE,
	UPDATE_PAGE_TITLE,
	UPDATE_SC_SONG_INFO,
	UPDATE_SPLASH_SCREEN_LOGIN_MESSAGE,

	closeAndEmptyMainModal,
	changeBgState,
	changeModalContent,
	changeSplashScreenPage,
	doneProcessingAuthCookie,
	incrementLoggedOutUserStep,
	resetLoggedOutUserStep,
	logout,
	showPlayerMobile,
	setAppFetchingStateFalse,
	setAppFetchingStateTrue,
	toogleIsModalOpened,
	toogleNavSidebar,
	updateMiniProfileSCsongInfo,
	updateMiniProfileContent,
	updateMiniProfileVisibility,
	updateModalType,
	updatePageTitle,
	updateSplashScreenLoginMessage,
}