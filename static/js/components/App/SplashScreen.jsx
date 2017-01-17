var React = require("react")
var Swiper = require("swiper/dist/js/swiper.min.js")
var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/SplashScreen.jsx")

var { goToURL } = require("../../MASAS_functions.jsx")
var { Button } = require("../UI/UI.jsx")
var LoginForm = require("../Login/LoginForm.jsx")
var Legals = require("../Legals/LegalsHome.jsx")


var SplashScreen = React.createClass({
	propTypes: {
		startPage: React.PropTypes.number,
		splashScreenPage: React.PropTypes.number,
		MASASuser: React.PropTypes.string,
		splashScreenLoginMessage: React.PropTypes.string,

		updateSplashScreenPage: React.PropTypes.func,
		closeSplashScreen: React.PropTypes.func,
	},

	getDefaultProps: function() {
		return {
			startPage: 0,
		};
	},

	getInitialState: function() {
		return {
			login: false
		}
	},

	changeBackground: function(hashtag) {
		const test1 = document.getElementsByClassName('test1')[0]
		const test2 = document.getElementsByClassName('test2')[0]

		if(test1 && test2) {
			if($('.test1').css("opacity") === "1") {
				$('.splash-screen--wrapper').css('background-image', 'none')
				$('.test1').css('opacity', 0)
				$('.test2').css('opacity', 1)
				test1.className = "test1"
				test2.className = "test2 background-" + hashtag
			} else {
				$('.test2').css('opacity', 0)
				$('.test1').css('opacity', 1)
				test2.className = "test2"
				test1.className = "test1 background-" + hashtag
			}
		}
	},

	componentDidMount: function() {
		const { changeBackground } = this

		this.backgroundNumber = 1
		this.changeBackground = window.setInterval( () => {
			if(this.props.splashScreenPage === 0)
				switch(this.backgroundNumber) {
					case 0:
						changeBackground(0)
						break
					case 1:
						changeBackground(1)
						break
					case 2:
						changeBackground(2)
						break
					case 3:
						changeBackground(3)
						break
					case 4:
						changeBackground(4)
						break
					case 5:
						changeBackground(5)
						break
				}

			if(this.backgroundNumber < 5)
				this.backgroundNumber = this.backgroundNumber  + 1
			else
				this.backgroundNumber = 0
		}, 6000)

		this.mainSwiper = new Swiper('.main-swiper-container', {
			noSwiping: true,
			allowSwipeToPrev: false,
			allowSwipeToNext: false,
			onSlideChangeStart: (instance) => {
				this.props.updateSplashScreenPage(instance.activeIndex)
			}
		})

		// init starting page (home splash screen or login)
		this.props.updateSplashScreenPage(this.props.startPage)
		this.mainSwiper.slideTo(this.props.startPage, 0)
	},

	componentWillUnmount: function() {
		window.clearInterval(this.changeBackground)
	},

	slideNext: function() {
		this.mainSwiper.slideNext()
	},

	slidePrev: function() {
		this.mainSwiper.slidePrev()
	},

	componentWillReceiveProps: function(nextProps) {
	},

	render: function() {
		if(this.mainSwiper && this.props.splashScreenPage === 2)
			styles = {
				swiperContainer: {
					height: '80%',
				}
			}

		return (
				<div className={ "splash-screen--wrapper " + (this.props.splashScreenPage === 1 ? "login" : "") + (this.props.splashScreenPage === 2 ? "legals" : "") }>
					<div
						className={ "swiper-container main-swiper-container " + (this.props.splashScreenPage === 2 ? "legals-height" : "") } >
						<div className="swiper-wrapper main-swiper-wrapper">

							<div className="swiper-slide first-slide">
								<img src="/static/img/MASAS_logo_tipi.svg" alt="MASAS-logo" />
								<div
									className="main-content"
									opacity>
									<h1>music by the mood</h1>

									<div className="swiper-container hashtag-swiper-container">
										<div className="swiper-wrapper hashtag-swiper-wrapper">
											<div className="swiper-slide">#EarlyMorning</div>
											<div className="swiper-slide">#LateMorning</div>
											<div className="swiper-slide">#EarlyAfternoon</div>
											<div className="swiper-slide">#LateAfternoon</div>
											<div className="swiper-slide">#EarlyEvening</div>
											<div className="swiper-slide">#LateEvening</div>
										</div>

										<div className="swiper-pagination"></div>
									</div>
									<div className="login-buttons--wrapper">
										<Button
											onClick={ () => { this.props.closeSplashScreen(); goToURL('/upload') } }
											isSecondaryAction={ true }>Share Your Sounds</Button>
										<Button
											onClick={ () => { this.props.closeSplashScreen(); goToURL('/discover') } }
											>Discover Music</Button>
									</div>
								</div>
							</div>

							<div className="swiper-slide second-slide">
								<div className="login-content">
									<div className="login-content-top">
										<img src="/static/img/MASAS_logo-M.svg" className="masas-logo" alt="MASAS-logo" />
										<h2 className="login-message-mobile">{ this.props.splashScreenLoginMessage }</h2>
										<div className="logo-subtitle">
											<img src="/static/img/login/logo_subtitle_1.png" className="img1" />
											<img src="/static/img/login/logo_subtitle_2.png" className="img2" />
										</div>
									</div>

									<div className="login-content-bottom">
										<div className="login-buttons">
											<h2 className="login-message-desktop">{ this.props.splashScreenLoginMessage }</h2>
											<p className="login-privacy-info">
												We’ll never post anything without your permision!
											</p>
											<LoginForm />
											<Button
												noBorders={ true }
												onClick={ this.props.closeSplashScreen }
												isBigButton={ false }
												className="login-cancel-button"
												isSecondaryAction={ true }>
												Cancel
											</Button>
										</div>

										<p onClick={ this.slideNext } className="terms-paragraph">
											<span>By logging-in, you agree to MASAS' </span><em>Terms of Use</em> <span> & </span><em>Cookie Policy</em>
										</p>
									</div>
								</div>
							</div>

							<div className="swiper-slide third-slide">
								<Legals
									backButtonFunc={ this.slidePrev }
									splashScreenLegals={ true } />
								<Button
									isBigButton={ false }
									onClick={ this.slidePrev }
									isSecondaryAction={ true }>
									Back
								</Button>
							</div>
						</div>
					</div>
					<div className="test1 background-0">
					</div>
					<div className="test2">
					</div>
					<div
						style={{ opacity: 0, zIndex: -1000, top: "1000%" }}
						className="test1 background-2 preload">
					</div>
					<div
						style={{ opacity: 0, zIndex: -1000, top: "1000%" }}
						className="test1 background-3 preload">
					</div>
					<div
						style={{ opacity: 0, zIndex: -1000, top: "1000%" }}
						className="test1 background-4 preload">
					</div>
					<div
						style={{ opacity: 0, zIndex: -1000, top: "1000%" }}
						className="test1 background-5 preload">
					</div>
				</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(SplashScreen)
