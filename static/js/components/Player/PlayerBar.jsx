/**
 * remove jquery dpeendency
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

var { getTimeIntervalFromURL } = require('../../MASAS_functions.jsx')
var { Marquee } = require('../UI/UI.jsx')

const SILENT_SOUND_SRC = '/static/mp3/silent.mp3'

import { POPULAR } from '../../reducers/actions/Player.js'
import { LikeButton } from './controls/LikeButton.jsx'
import { DislikeButton } from './controls/DislikeButton.jsx'
import { NextButton } from './controls/NextButton.jsx'
import { PlayButton } from './controls/PlayButton.jsx'
import { PreviousButton } from './controls/PreviousButton.jsx'

import {
	pausePlayer,
	playNewSong,
	playNewSongFromPlaylist,
	playPlayer,
	playRandomSong,
	resumePlayer,
	setIsPlayerBuffering,
} from '../../reducers/actions/Player.js'

import { showPlayerMobile } from '../../reducers/actions/App.js'



/**
 * Redux container
 */

const reduxStatePropTypes = {
	MASAS_songInfo: PropTypes.object,
	SC_songInfo: PropTypes.object,
	isPaused: PropTypes.bool,
	isPlaylistPlaying: PropTypes.bool,
	playingFromPopular: PropTypes.bool,
	playlist: PropTypes.array,
	playlistPosition: PropTypes.number,
	songPlaying: PropTypes.string,
}

const mapStateToProps = function(state) {
	return {
		songPlaying: state.playerReducer.songPlaying,
		isPaused: state.playerReducer.isPaused,
		SC_songInfo: state.playerReducer.SC_songInfo,
		MASAS_songInfo: state.playerReducer.MASAS_songInfo,
		playlist: state.playerReducer.playlist,
		playlistPosition: state.playerReducer.playlistPosition,
		isPlaylistPlaying: state.playerReducer.isPlaylistPlaying,
		playingFromPopular: state.playerReducer.playingFromPopular,
	}
}

const reduxDispatchPropTypes = {
	dispatch: PropTypes.func,
	pause: PropTypes.func,
	play: PropTypes.func,
	playNewSong: PropTypes.func,
	playNewSongFromPlaylist: PropTypes.func,
	playRandomSong: PropTypes.func,
	resumePlaying: PropTypes.func,
	setIsPlayerBuffering: PropTypes.func,
	showPlayerMobile: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		dispatch,
		play: () => dispatch(playPlayer()),
		pause: () => dispatch(pausePlayer()),
		resumePlaying: () => dispatch(resumePlayer()),	// same as this.props.play (see actions/Player.js) Not sure keeping both for historical reasons for now
		playNewSong: () => dispatch(playNewSong()),
		playRandomSong: (timeInterval = 0) => dispatch(playRandomSong(timeInterval)),
		playNewSongFromPlaylist: (playlistPosition) => dispatch(playNewSongFromPlaylist(playlistPosition)),
		setIsPlayerBuffering: value => dispatch(setIsPlayerBuffering(value)),
		showPlayerMobile: choice => dispatch(showPlayerMobile(choice)),
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

	isPlayerMobile: PropTypes.bool, 			// is UI on mobile player in footer tray
}

const smartDefaultProps = {
}

class PlayerSmart extends React.Component {
    constructor(props) {
        super(props)

		this.renderRadioTime = this.renderRadioTime.bind(this)
    }

	componentWillUnmount() {
		$('#jquery_jplayer_1').unbind($.jPlayer.event.ended)
		$('#jquery_jplayer_1').unbind($.jPlayer.event.play)
		$('#jquery_jplayer_1').unbind($.jPlayer.event.waiting)
		$('#jquery_jplayer_1').unbind($.jPlayer.event.stalled)
		$('#jquery_jplayer_1').unbind($.jPlayer.event.canplay)
		$('#jquery_jplayer_1').unbind($.jPlayer.event.pause)
	}

	componentDidMount() {
		if(this.props.songPlaying !== null && this.props.isPaused === false)
			this.props.resumePlaying()

		// dont attach events on player mobile
		if(this.props.isPlayerMobile)
			return

		// add event listener to play new song at end of current song
		$('#jquery_jplayer_1').bind($.jPlayer.event.ended, () => {
			// get state from reducer because "this" object doesn't have access to state mutations
			// (this object is a copy of component instance at componentDidMount)

			const { getState } = require('../../reducers/reducers.js')
			if(getState().playerReducer.songPlaying !== null) {
				const currentTimeIntervalURL = getState().playerReducer.MASAS_songInfo.timeInterval
				const currentTimeInterval = getTimeIntervalFromURL(currentTimeIntervalURL)

				if(this.props.isPlaylistPlaying) {
					this.props.playNewSongFromPlaylist(this.props.playlistPosition + 1)
				} else if(this.props.playingFromPopular) {
					this.props.playRandomSong(POPULAR)
				} else {
					this.props.playRandomSong(currentTimeInterval)
				}
			}
		})

		// update player UI on start play
		$('#jquery_jplayer_1').bind($.jPlayer.event.play, () => {
			// this.props.dispatch({ type: 'PLAY' })
			// this.props.dispatch({ type: 'SET_IS_BUFFERING_FALSE' })
			this.props.play()
			this.props.setIsPlayerBuffering(false)
		})

		// test buffering
		$('#jquery_jplayer_1').bind($.jPlayer.event.waiting, () => {
			if($('#jquery_jplayer_1').data('jPlayer').status.src !== SILENT_SOUND_SRC)
				this.props.setIsPlayerBuffering(true)
		})
		$('#jquery_jplayer_1').bind($.jPlayer.event.stalled, () => {
			if($('#jquery_jplayer_1').data('jPlayer').status.src !== SILENT_SOUND_SRC)
				this.props.setIsPlayerBuffering(true)
		})
		$('#jquery_jplayer_1').bind($.jPlayer.event.canplay, () => {
			this.props.setIsPlayerBuffering(false)
		})

		// update player UI on start play
		$('#jquery_jplayer_1').bind($.jPlayer.event.pause, () => {
			// this.props.dispatch({ type: 'PAUSE' })
			this.props.pause()
		})
	}

	componentWillReceiveProps(newProps) {
		if( newProps.songPlaying !== null && (this.props.songPlaying !== newProps.songPlaying || this.props.isPaused !== newProps.isPaused))
		{
			if(newProps.songPlaying !== this.props.songPlaying) {
				// if new song, fetch new song and play it
				this.props.playNewSong()

			} else if(newProps.isPaused === true) {
				// if not a new song and is paused, then pause
				this.props.pause()
			} else
				this.props.resumePlaying()
		}
	}

	renderRadioTime() {
		var switchVar = this.props.MASAS_songInfo.timeInterval.substr(this.props.MASAS_songInfo.timeInterval.length - 2, 1)
		switch(switchVar) {
			case '1':
				return '#EarlyMorning'
			case '2':
				return '#LateMorning'
			case '3':
				return '#EarlyAfternoon'
			case '4':
				return '#LateAfternoon'
			case '5':
				return '#EarlyEvening'
			case '6':
				return '#LateEvening'
			default:
				return
		}
	}


	render() {
		return (
			<div className={ 'navbar-player--wrapper' + (this.props.isPlayerMobile ? ' player-mobile' : '') }>
                <LikeButton />
                <DislikeButton />
				<div className="song-info--wrapper1">
					{ this.props.SC_songInfo ?
						<div className="song-info--wrapper2" >
							<div className="text-info" onClick={ () => this.props.showPlayerMobile(true) }>
								<div className="song-name">
									<Marquee className="song-title">
										{ this.props.SC_songInfo.title+ ' - ' }
									</Marquee>
									<Marquee className="song-artist">
										{ this.props.SC_songInfo.user.username }
									</Marquee>
								</div>
							</div>
							<div className="sc-icon">
								<a href={ this.props.SC_songInfo.permalink_url } target="_blank">
									<img src="/static/img/MASAS_logo_soundcloud.svg" alt="soundcloud page" />
								</a>
							</div>
						</div>
					: '' }
				</div>
				<div className="player-controls--wrapper">
                    {
						this.props.isPlayerMobile ?
							<LikeButton />
						:
							''
					}
					<PreviousButton />
                    <PlayButton />
					<NextButton />
                    {
						this.props.isPlayerMobile ?
							<DislikeButton />
						:
							''
					}
				</div>
			</div>
		)
	}
}

PlayerSmart.propTypes = smartPropTypes
PlayerSmart.defaultProps = smartDefaultProps

const Player = connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerSmart)

export {
	SILENT_SOUND_SRC,
	Player,
}
