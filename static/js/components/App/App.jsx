import Cookie from 'js-cookie'

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { AppDumb } from './AppDumb.jsx'
import { CreateProfile } from '../Profile/CreateProfile.jsx'
import {
	changeModalContent,
	closeAndEmptyMainModal,
	doneProcessingAuthCookie,
	setAppFetchingStateFalse,
	setAppFetchingStateTrue,
} from '../../reducers/actions/App.js'
import { changeUnsplashArtist } from '../../reducers/actions/Home.js'
import { loginWithToken } from '../../reducers/actions/Login.js'
import {
	addRandomSongToHistory as addRandomSongToDiscoverHistory,
} from '../../reducers/actions/Discover.js'
import {
	addRandomSongToHistory as addRandomSongToPopularHistory,
} from '../../reducers/actions/Popular.js'


/**
 * Redux container
 */

const reduxStatePropTypes = {
	MASASuser: PropTypes.string,
	processingAuthCookie: PropTypes.bool,
	userData: PropTypes.object,
}

const mapStateToProps = function(state) {
	return {
		processingAuthCookie: state.appReducer.processingAuthCookie,
		MASASuser: state.appReducer.MASASuser,
		userData: state.appReducer.userData,
	}
}

const reduxDispatchPropTypes = {
	addRandomSongToDiscoverHistory: PropTypes.func,
	addRandomSongToPopularHistory: PropTypes.func,
	closeModal: PropTypes.func,
	forceRender: PropTypes.func,
	hideAppFetchingBar: PropTypes.func,
	loginWithToken: PropTypes.func,
	showAppFetchingBar: PropTypes.func,
	updateModalContent: PropTypes.func,
	updateUnsplashArtist: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
        addRandomSongToDiscoverHistory: interval => dispatch(addRandomSongToDiscoverHistory(interval)),
		addRandomSongToPopularHistory: () => dispatch(addRandomSongToPopularHistory()),
		closeModal: () => dispatch(closeAndEmptyMainModal()),
		loginWithToken: authToken => dispatch(loginWithToken(authToken)),
		forceRender: () => dispatch(doneProcessingAuthCookie()),
		showAppFetchingBar: () => dispatch(setAppFetchingStateTrue()),
		hideAppFetchingBar: () => dispatch(setAppFetchingStateFalse()),
		updateUnsplashArtist: () => dispatch(changeUnsplashArtist()),
		updateModalContent: (modalContent, modalType) => dispatch(changeModalContent(modalContent, modalType)),
	}
}


/**
 * pre fetch songs
 */
function initHistories(addRandomSongToDiscoverHistory, addRandomSongToPopularHistory) {
    const i_d = [1, 2, 3, 4, 5, 6] // 6 discover times
	const i_p = [0] // 1 popular

	i_d.forEach(e => addRandomSongToDiscoverHistory(e))
	i_p.forEach(() => addRandomSongToPopularHistory())
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

	children: PropTypes.element,
	location: PropTypes.object,
}


class AppSmart extends React.Component {
	constructor(props) {
		super(props)

		this.showSplashScreen = this.showSplashScreen.bind(this)
		this.getUserTokenFromCookie = this.getUserTokenFromCookie.bind(this)
	}

	componentWillMount() {
		// BIND EVENTS TO AJAX REQUESTS
		// http://api.jquery.com/Ajax_Events/
		$(document).bind('ajaxStart', () => {
			this.props.showAppFetchingBar()
		}).bind('ajaxStop', () => {
			this.props.hideAppFetchingBar()
		})


		// INIT SOUNDCLOUD JS SDK
		SC.initialize({
			client_id: document.MASAS.SC.client_id,
			redirect_uri: document.MASAS.SC.redirect_uri ,
			display: 'popup'
		})

		// SIGN IN USER IF VALID MASAS AND FB TOKENs STORED IN COOKIES
		var userToken = this.getUserTokenFromCookie()

		if(userToken)
			this.props.loginWithToken(userToken)

		this.props.forceRender()	// auth cookie is done processing


		// INIT BACKGROUND WITH UNSPLASH MASAS LIKES
		this.props.updateUnsplashArtist()

		// INIT DISCOVER AND POPULAR HISTORIES
		initHistories(this.props.addRandomSongToDiscoverHistory, this.props.addRandomSongToPopularHistory)
	}

	componentDidMount() {
		document.getElementsByTagName('body')[0].style.height = window.innerHeight + 'px'
		document.getElementById('content').style.height = window.innerHeight + 'px'
		document.getElementById('mobile-safari-bug-fix--wrapper').style.height = window.innerHeight + 'px'

		window.addEventListener('resize', () => {
			document.getElementsByTagName('body')[0].style.height = window.innerHeight + 'px'
			document.getElementById('content').style.height = window.innerHeight + 'px'
			document.getElementById('mobile-safari-bug-fix--wrapper').style.height = window.innerHeight + 'px'
		})

		// so mobile safari play/pause/play bug doesn't happen
		$('body').mouseup(() => {
			const currentjPlayerSource = $('#jquery_jplayer_1').data().jPlayer.status.src
			$('#jquery_jplayer_1').jPlayer('play')
			$('body').unbind('mouseup')
		})

		// only show splashscreen on site root
		if(this.props.location.pathname === '/')
			this.showSplashScreen()
	}

	componentDidUpdate(prevProps) {
		// check if user has logged in
		if(this.props.MASASuser !== prevProps.MASASuser) {
			// check if userData is not empty array.
			if(this.props.userData.usersteps){
				// if has created profile => close modal
				if(this.props.userData.usersteps.map( entry => entry.step ).includes(8)) {
					this.props.closeModal()
				} else {
					this.props.updateModalContent(<CreateProfile />, 5)
					// call create profile
				}

			}

			// otherwise, close modal

		}
	}

	showSplashScreen() {
	}

	getUserTokenFromCookie() {
		return Cookie.get('MASAS_authToken')
	}

	render() {
		let hideLoadingModalZIndex = 1000
		let loadingModalAnim = 'none'
		if(!this.props.processingAuthCookie) {
			hideLoadingModalZIndex = -1000
			loadingModalAnim = 'fadeout-loading-modal 3s cubic-bezier(1, 0.02, 0.78,-0.2)'
		}

		return <AppDumb
				hideLoadingModalZIndex={ hideLoadingModalZIndex }
				loadingModalAnim={ loadingModalAnim }>{ this.props.children }</AppDumb>
	}
}


AppSmart.propTypes = smartPropTypes

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppSmart)

export {
	App,
}


