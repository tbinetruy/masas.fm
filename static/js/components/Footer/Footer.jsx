import React, { PropTypes } from 'react'
import { connect }from 'react-redux'

import { UnsplashControls } from './UnsplashControls.jsx'
import { Player } from '../Player/PlayerBar.jsx'
import { ProgressBar } from './ProgressBar.jsx'

import {
	changeModalContent,
	toogleIsModalOpened,
} from '../../reducers/actions/App.js'

import {
	playNewSongFromPlaylist,
	playRandomSong
} from '../../reducers/actions/Player.js'

import {
	setPlayerProgressBar,
	toogleIsFooterOpened,
} from '../../reducers/actions/Footer.js'

import { showPlayerMobile } from '../../reducers/actions/App.js'

var { getTimeIntervalFromURL } = require('../../MASAS_functions.jsx')

/**
 * Redux container
 */

const reduxStatePropTypes = {
	MASAS_songInfo: PropTypes.object,
	SC_songInfo: PropTypes.object,
	isBuffering: PropTypes.bool,
	isModalOpened: PropTypes.bool,
	isPlayerBarOpened: PropTypes.bool,
	isPlayerPaused: PropTypes.bool,
	isPlaylistPlaying: PropTypes.bool,
	playlist: PropTypes.array,
	playlistPosition: PropTypes.number,
	progressBarWidth: PropTypes.number,
	songPlaying: PropTypes.string,
}

const mapStateToProps = function(state) {
	return {
		SC_songInfo: state.playerReducer.SC_songInfo,
		progressBarWidth: state.footerReducer.progressBar,
		isPlayerBarOpened: state.footerReducer.isOpened,
		isBuffering: state.playerReducer.isBuffering,
		songPlaying: state.playerReducer.songPlaying,
		MASAS_songInfo: state.playerReducer.MASAS_songInfo,
		isPlayerPaused: state.playerReducer.isPaused,
		isModalOpened: state.appReducer.isModalOpened,
		playlist: state.playerReducer.playlist,
		playlistPosition: state.playerReducer.playlistPosition,
		isPlaylistPlaying: state.playerReducer.isPlaylistPlaying
	}
}

const reduxDispatchPropTypes = {
	playNewSongFromPlaylist: PropTypes.func,
	playRandomSong: PropTypes.func,
	showPlayerMobile: PropTypes.func,
	toogleIsOpened:  PropTypes.func,
	toogleModal:  PropTypes.func,
	updateModalContent: PropTypes.func,
	updateProgressBar: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		playRandomSong: timeInterval => dispatch(playRandomSong(timeInterval)),
		updateProgressBar: progress => dispatch(setPlayerProgressBar(progress)),
		toogleIsOpened: () => dispatch(toogleIsFooterOpened()),
		toogleModal: () => dispatch(toogleIsModalOpened()),
		updateModalContent: modalContent => dispatch(changeModalContent(modalContent)),
		playNewSongFromPlaylist: playlistPosition => dispatch(playNewSongFromPlaylist(playlistPosition)),
		showPlayerMobile: choice => dispatch(showPlayerMobile(choice)),
	}
}

/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,
}

const smartDefaultProps = {
}

class FooterSmart extends React.Component {
	constructor(props) {
		super(props)

		this.playRandomSong = this.playRandomSong.bind(this)
		this.toogleMenu = this.toogleMenu.bind(this)
		this.openModal = this.openModal.bind(this)
		this.getNextSongIcon = this.getNextSongIcon.bind(this)
	}

	componentWillMount() {
        // Keeping track of progress bar here with a timer
		// allows us to reuse the progressBar component many times
		// without having to use multiple timers
		// probably needs to be moved to the playerBar comp however

		// init progress bar width
		var progressBarWidth = 0

		// init interval for progress bar width
		this.interval = setInterval( () => {
			// if player is playing

			//typeof($("#jquery_jplayer_1").data('jPlayer')) !== "undefined"
			if(this.props.songPlaying !== null && !this.props.isPlayerPaused && this.props.SC_songInfo) {
				// update progress bar length
				progressBarWidth = $('#jquery_jplayer_1').data('jPlayer').status.currentTime*1000*100 / this.props.SC_songInfo.duration
				this.props.updateProgressBar(progressBarWidth)
			} else {
				// verify that progress bar isn't already 0
				if(this.props.progressBarWidth !== 0)
					this.props.updateProgressBar(0)	// reset progress bar
			}
		}, 250)
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	playRandomSong() {
		const timeInterval = getTimeIntervalFromURL(this.props.MASAS_songInfo.timeInterval)

		this.props.playRandomSong(timeInterval)
	}

	toogleMenu() {
		if(!this.props.isModalOpened)
			this.props.toogleIsOpened()
	}


	openModal(modalType) {
	}

	getNextSongIcon() {
		if(this.props.songPlaying) {
			if(this.props.isPlaylistPlaying) {
				if(this.props.playlistPosition < this.props.playlist.length - 1)
					return <img onClick={this.props.playNewSongFromPlaylist.bind(this, this.props.playlistPosition + 1)} src="/static/img/MASAS_next.svg" alt="next song" className="next-icon" />
				else
					return
			} else
				return <img onClick={this.playRandomSong} src="/static/img/MASAS_next.svg" alt="next song" className="next-icon" />

		} else {
			return
		}
	}

	render() {
		return (
			<div className="footer--wrapper">

				<UnsplashControls />


				<div className={ 'slider--wrapper ' + (this.props.isPlayerBarOpened ? 'opened' : '') }>

					<ProgressBar />

					<div className="visible--wrapper">
						<div className="row no-margin"  style={{height: '100%'}}>
							<div className="col-md-2 col-display-none-sm buffer-info">
								<div className="box">
									<div className="">
										{this.props.isBuffering ? ' Buffering...' : ''}
									</div>
								</div>
							</div>
							<div className="col-xs-9 col-md-8 player--wrapper">
								<img
									src='/static/img/MASAS_icon_dot.svg'
									alt='open footer'
									className={ 'open-footer-icon' + (this.props.songPlaying ? '' : ' hidden') }
									onClick={ () => this.props.showPlayerMobile(true) }
									/>
								<Player />
							</div>
							<div className="col-xs-3 col-md-2 col-display-none-sm extra-controls--wrapper">
								<div className="box nextSong--wrapper">
									{ this.getNextSongIcon() }
								</div>
							</div>
						</div>
					</div>
					<div className="hidden--wrapper">
						<div className="col-md-2 col-display-none-sm">
							<div className="box">

							</div>
						</div>
						<div className="dislike-choices--wrapper">
							<span className="copyright" onClick={ this.openModal.bind(this, 2) }>Report as Copyright Infringment</span>
							<hr />
							<span className="spam" onClick={ this.openModal.bind(this, 1) }>Report as SPAM</span>
							<hr />
							<span className="suggest-time" onClick={ this.openModal.bind(this, 3) }>Suggest another time</span>
							<hr />
							<span className="no-like">I don't like it</span>
						</div>
						<div className="col-md-2 col-display-none-sm">
							<div className="box">

							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

FooterSmart.propTypes = smartPropTypes
FooterSmart.defaultState = smartDefaultProps


const Footer= connect(
    mapStateToProps,
    mapDispatchToProps
)(FooterSmart)

export {
	Footer,
}
