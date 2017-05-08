var React = require('react')

var ReactRedux = require('react-redux')
var { mapStateToProps, mapDispatchToProps } = require('./containers/PlayerBar.jsx')

var { getTimeIntervalFromURL } = require('../../MASAS_functions.jsx')
var { Marquee } = require('../UI/UI.jsx')

import { POPULAR } from '../../reducers/actions/Player.js'
const SILENT_SOUND_SRC = '/static/mp3/silent.mp3'  // "http://www.xamuel.com/blank-mp3-files/point1sec.mp3" //

import {
	LikeButton,
} from './controls/LikeButton.jsx'

import {
	DislikeButton,
} from './controls/DislikeButton.jsx'

import {
	NextButton,
} from './controls/NextButton.jsx'

import {
	PlayButton,
} from './controls/PlayButton.jsx'

import {
	PreviousButton,
} from './controls/PreviousButton.jsx'



var Player = React.createClass({
	propTypes: {
		MASAS_songInfo: React.PropTypes.object,
		SC_songInfo: React.PropTypes.object,


		dispatch: React.PropTypes.func,
		isPaused: React.PropTypes.bool,
		isPlayerMobile: React.PropTypes.bool, 			// is UI on mobile player in footer tray
		isPlaylistPlaying: React.PropTypes.bool,
		pause: React.PropTypes.func,
		play: React.PropTypes.func,
		playNewSong: React.PropTypes.func,
		playNewSongFromPlaylist: React.PropTypes.func,
		playRandomSong: React.PropTypes.func,
		playingFromPopular: React.PropTypes.bool,
		playlist: React.PropTypes.array,
		playlistPosition: React.PropTypes.number,
		resumePlaying: React.PropTypes.func,
		setIsPlayerBuffering: React.PropTypes.func,
		showPlayerMobile: React.PropTypes.func,
		songPlaying: React.PropTypes.string,
		zzhhhhh: React.PropTypes.func,
	},

	componentWillMount: function() {
	},

	componentWillUnmount: function() {
		$('#jquery_jplayer_1').unbind($.jPlayer.event.ended)
		$('#jquery_jplayer_1').unbind($.jPlayer.event.play)
		$('#jquery_jplayer_1').unbind($.jPlayer.event.waiting)
		$('#jquery_jplayer_1').unbind($.jPlayer.event.stalled)
		$('#jquery_jplayer_1').unbind($.jPlayer.event.canplay)
		$('#jquery_jplayer_1').unbind($.jPlayer.event.pause)
	},

	componentDidMount: function() {
		if(this.props.songPlaying !== null && this.props.isPaused === false)
			this.props.resumePlaying()

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
	},

	componentWillReceiveProps: function(newProps) {
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
	},

	renderRadioTime: function() {
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
	},


	render: function() {
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
					<PreviousButton />
                    <PlayButton />
					<NextButton />
				</div>
			</div>
		)
	}
})

module.exports = {
	PlayerBar: ReactRedux.connect(
		mapStateToProps,
		mapDispatchToProps
	)(Player),
	SILENT_SOUND_SRC: SILENT_SOUND_SRC,
}