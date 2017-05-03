var React = require('react')

var ReactRedux = require('react-redux')
var { mapStateToProps, mapDispatchToProps } = require('./containers/App.jsx')

var AppDumb = require('./AppDumb.jsx')

var SC = require('soundcloud')
var Cookie = require('js-cookie')

var CreateProfile = require('../Profile/CreateProfile.jsx')

import { addSongToHistory as addSongToDiscoverHistoryRedux } from '../../reducers/actions/Discover.js'
import { addSongToHistory as addSongToPopularHistoryRedux } from '../../reducers/actions/Popular.js'

async function addSongToDiscoverHistory() {
	const MASAS_songInfoPromise = await fetch('/api/play/')
	const MASAS_songInfo = await MASAS_songInfoPromise.json()
	const { SC_ID } = MASAS_songInfo
}
/**
 *
 */
async function initHistories() {
	console.log()
}


var App = React.createClass({
	propTypes: {
		MASASuser: React.PropTypes.string,
		children: React.PropTypes.element,
		closeModal: React.PropTypes.func,
		finishProcessingAuthCookie: React.PropTypes.func,
		forceRender: React.PropTypes.func,
		hideAppFetchingBar: React.PropTypes.func,
		location: React.PropTypes.object,
		loginWithToken: React.PropTypes.func,
		modalContent: React.PropTypes.element,
		processingAuthCookie: React.PropTypes.bool,
		showAppFetchingBar: React.PropTypes.func,
		toogleModal: React.PropTypes.func,
		updateModalContent: React.PropTypes.func,
		updateUnsplashArtist: React.PropTypes.func,
		userData: React.PropTypes.object,
	},

	componentWillMount: function() {
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
	},

	componentDidMount: function() {
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
	},

	showSplashScreen: function() {
	},

	getUserTokenFromCookie: function() {
		return Cookie.get('MASAS_authToken')
	},

	componentDidUpdate: function(prevProps) {
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
	},

	render: function() {
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
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
