var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/App.jsx")

var AppDumb = require("./AppDumb.jsx")
var SplashScreen = require("./SplashScreen.jsx")

var SC = require('soundcloud')
var Cookie = require('js-cookie')

var CreateProfile = require("../Profile/CreateProfile.jsx")


var App = React.createClass({
	propTypes: {
		finishProcessingAuthCookie: React.PropTypes.func,

		// redux
		children: React.PropTypes.element,
		processingAuthCookie: React.PropTypes.bool,
		modalContent: React.PropTypes.element,
		MASASuser: React.PropTypes.string,
		userData: React.PropTypes.object,
		location: React.PropTypes.object,

		toogleModal: React.PropTypes.func,
		loginWithToken: React.PropTypes.func,
		forceRender: React.PropTypes.func,
		showAppFetchingBar: React.PropTypes.func,
		hideAppFetchingBar: React.PropTypes.func,
		updateUnsplashArtist: React.PropTypes.func,
		updateModalContent: React.PropTypes.func,
		closeModal: React.PropTypes.func,
	},

	componentWillMount: function() {
		// BIND EVENTS TO AJAX REQUESTS
		// http://api.jquery.com/Ajax_Events/
		$(document).bind("ajaxStart", () => {
			this.props.showAppFetchingBar()
		}).bind("ajaxStop", () => {
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
	},

	componentDidMount: function() {
		document.getElementsByTagName('body')[0].style.height = window.innerHeight + 'px'
		document.getElementById('content').style.height = window.innerHeight + 'px'
		document.getElementById('mobile-safari-bug-fix--wrapper').style.height = window.innerHeight + 'px'

		window.addEventListener("resize", () => {
			document.getElementsByTagName('body')[0].style.height = window.innerHeight + 'px'
			document.getElementById('content').style.height = window.innerHeight + 'px'
			document.getElementById('mobile-safari-bug-fix--wrapper').style.height = window.innerHeight + 'px'
		})

		// so mobile safari play/pause/play bug doesn't happen
		$("body").mouseup(() => {
			const currentjPlayerSource = $("#jquery_jplayer_1").data().jPlayer.status.src
			$("#jquery_jplayer_1").jPlayer("play")
			$("body").unbind("mouseup")
		})

		// only show splashscreen on site root
		if(this.props.location.pathname === '/')
			this.showSplashScreen()
	},

	showSplashScreen: function() {
		if(this.props.MASASuser === "") {
			this.props.toogleModal()
			this.props.updateModalContent(<SplashScreen />, 3)
		} else {
			this.props.closeModal()
		}
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
					console.log("create profile")
					this.props.updateModalContent(<CreateProfile />, 3)
					// call create profile
				}

			}

			// otherwise, close modal

		}
	},

	render: function() {
		let hideLoadingModalZIndex = 1000
		let loadingModalAnim = "none"
		if(!this.props.processingAuthCookie) {
			hideLoadingModalZIndex = -1000
			loadingModalAnim = "fadeout-loading-modal 1s linear"
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
