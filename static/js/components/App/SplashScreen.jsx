import Swiper from 'swiper/dist/js/swiper.min.js'

import React, { PropTypes } from 'react'
import { connect }from 'react-redux'

import { Button } from '../UI/UI.jsx'
import { LoginForm } from '../Login/LoginForm.jsx'
import {
	LegalsHome as Legals,
} from '../Legals/LegalsHome.jsx'
import {
	changeSplashScreenPage,
	closeAndEmptyMainModal,
} from '../../reducers/actions/App.js'
import { goToURL } from '../../MASAS_functions.jsx'


/**
 * Redux container
 */

const reduxStatePropTypes = {
	backgroundURL: PropTypes.string,
	splashScreenLoginMessage: PropTypes.string,
	splashScreenPage: PropTypes.number,
}

const mapStateToProps = function(state) {
	return {
		splashScreenPage: state.appReducer.splashScreenPage,
		splashScreenLoginMessage: state.appReducer.splashScreenLoginMessage,
		backgroundURL: state.homeReducer.backgroundURL,
	}
}

const reduxDispatchPropTypes = {
	closeSplashScreen: PropTypes.func,
	updateSplashScreenPage: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		updateSplashScreenPage: (splashScreenPage) => dispatch(changeSplashScreenPage(splashScreenPage)),
		closeSplashScreen: () => dispatch(closeAndEmptyMainModal()),

	}
}

/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

	startPage: PropTypes.number,
}

const smartDefaultProps = {
	startPage: 0,
}

class SplashScreenSmart extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			login: false
		}

		this.slideNext = this.slideNext.bind(this)
		this.slidePrev = this.slidePrev.bind(this)
	}

	componentDidMount() {
		this.mainSwiper = new Swiper('.main-swiper-container', {
			noSwiping: true,
			allowSwipeToPrev: false,
			allowSwipeToNext: false,
			onSlideChangeStart: (instance) => {
				this.props.updateSplashScreenPage(instance.activeIndex)
			},
		})

		// init starting page (home splash screen or login)
		this.props.updateSplashScreenPage(this.props.startPage)
		this.mainSwiper.slideTo(this.props.startPage, 0)
	}

	componentWillUnmount() {
	}

	slideNext() {
		this.mainSwiper.slideNext()
	}

	slidePrev() {
		this.mainSwiper.slidePrev()
	}

	render() {
		const styles = {
			wrapper: {
				backgroundImage: 'url(' + this.props.backgroundURL + ')',
				backgroundSize: 'cover'
			}
		}

		return (
				<div
					className={ 'splash-screen--wrapper ' + (this.props.splashScreenPage === 1 ? 'login' : '') + (this.props.splashScreenPage === 2 ? 'legals' : '') }>
					<div
						className={ 'swiper-container main-swiper-container ' + (this.props.splashScreenPage === 2 ? 'legals-height' : '') } >
						<div className="swiper-wrapper main-swiper-wrapper">

							<div className="swiper-slide first-slide">
								<img src="/static/img/MASAS_logo_tipi.svg" alt="MASAS-logo" />

								<div
									className="main-content"
									>
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
											isSecondaryAction={ true }>Share My Sounds</Button>
										<Button
											onClick={ () => { this.props.closeSplashScreen(); goToURL('/crowdradio') } }
											>Play Crowdradio</Button>
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
					<div
						style={ styles.wrapper }
						className="test1 background-2 preload">
					</div>
				</div>
		)
	}
}

SplashScreenSmart.propTypes = smartPropTypes
SplashScreenSmart.defaultProps = smartDefaultProps

const SplashScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(SplashScreenSmart)

export {
	SplashScreen,
}
