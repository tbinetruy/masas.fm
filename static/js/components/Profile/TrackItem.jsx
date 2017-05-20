import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { ChangeMoodModal } from './ChangeMoodModal.jsx'
import { RemoveSongModal } from './RemoveSongModal.jsx'
import { Marquee, RankingInfoIcon } from '../UI/UI.jsx'
import { isObjectEmpty, timeIntervalURLToString } from '../../MASAS_functions.jsx'

import {
	loadPlaylist,
	pausePlayer,
	playNewSongFromPlaylist,
} from '../../reducers/actions/Player.js'

import {
	changeModalContent,
	toogleIsModalOpened
} from '../../reducers/actions/App.js'

/**
 * Redux container
 */

const reduxStatePropTypes = {
	miniProfile: PropTypes.object,
	isPaused: PropTypes.bool,
	publicProfileInfo: PropTypes.object,
	songPlaying: PropTypes.string,
	userData: PropTypes.object,
}

const mapStateToProps = function(state) {
	return {
		songPlaying: state.playerReducer.songPlaying,
		isPaused: state.playerReducer.isPaused,
		userData: state.appReducer.userData,
		publicProfileInfo: state.profileReducer.publicProfileInfo,
		miniProfile: state.appReducer.miniProfile,
	}
}

const reduxDispatchPropTypes = {
	loadPlaylist: PropTypes.func,
	pause: PropTypes.func,
	playNewSongFromPlaylist: PropTypes.func,
	toogleModal: PropTypes.func,
	updateModalContent: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		pause: () => dispatch(pausePlayer()),
		loadPlaylist: playlist => dispatch(loadPlaylist(playlist)),
		playNewSongFromPlaylist: playlistPosition => dispatch(playNewSongFromPlaylist(playlistPosition)),
		toogleModal: () => dispatch(toogleIsModalOpened()),
		updateModalContent: modalContent => dispatch(changeModalContent(modalContent)),
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

	MASAS_songInfo: PropTypes.object,		//track MASAS info
	allowOpen: PropTypes.bool, 			// should allow open song tray
	isMiniProfile: PropTypes.bool,			// is track item shown in mini profile mode
	track: PropTypes.object,			//track SC info
}

const smartDefaultProps = {
	isMiniProfile: false
}

class TrackItemSmart extends React.Component {
    constructor(props) {
        super(props)

		this.playTrack = this.playTrack.bind(this)
		this.renderPlayerControlButton = this.renderPlayerControlButton.bind(this)
		this.toggleOpenTray = this.toggleOpenTray.bind(this)
		this.openChangeMoodModal = this.openChangeMoodModal.bind(this)
		this.openRemoveSongModal = this.openRemoveSongModal.bind(this)
    }

	playTrack() {
		var songs = {}

		if(this.props.isMiniProfile)
			songs = this.props.miniProfile.userData.songs
		else {
			if(isObjectEmpty(this.props.publicProfileInfo))
				songs = this.props.userData.songs
			else
				songs = this.props.publicProfileInfo.songs
		}

		var playlist = songs.map((song) => {
			return song.url
		})

		var playlistPosition = 0
		for(var i = 0; i < playlist.length; i++) {
			if(this.props.MASAS_songInfo.url === playlist[i])
				playlistPosition = i
		}

		this.props.loadPlaylist(playlist)
		this.props.playNewSongFromPlaylist(playlistPosition)
	}

	renderPlayerControlButton() {
		if (this.props.MASAS_songInfo.url === this.props.songPlaying && this.props.isPaused === false)
			return <img src="/static/img/MASAS_player_pause.svg" alt="pause" className="artwork" onClick={ this.props.pause } />
		else
			return <img src="/static/img/MASAS_player_play.svg" alt="play" className="artwork" onClick={ this.playTrack } />
	}

	toggleOpenTray() {
		var el = this.refs.trackWrapper

		if(el.className.includes(' open')) {
			el.className = el.className.replace(' open', '')
		} else {
			el.className = el.className + ' open'
		}
	}

	openChangeMoodModal() {
		this.props.updateModalContent(<ChangeMoodModal toggleModal={ this.props.toogleModal } MASAS_info={ this.props.MASAS_songInfo } SC_info={ this.props.track } />)
		this.props.toogleModal()
	}

	openRemoveSongModal() {
		this.props.updateModalContent(<RemoveSongModal toggleModal={ this.props.toogleModal } MASAS_info={ this.props.MASAS_songInfo } SC_info={ this.props.track } />)
		this.props.toogleModal()
	}

	render() {
		return (
			<div
				className={ 'track--wrapper'  + (this.props.isMiniProfile ? ' mini-profile' : '') }
				ref="trackWrapper">
				<div className="visible-info">
					<div className="artwork--wrapper">
						<div className="artwork-div">
							{
								this.props.track.artwork_url ?
									<img src={this.props.track.artwork_url} alt="cover art" className="artwork" onClick={this.playTrack } />
								:
									''
							}
						</div>
						<div className="artwork-overlay">
							{ this.renderPlayerControlButton() }
						</div>
					</div>
					<div className="song-info--wrapper" onClick={ this.props.allowOpen ? this.toggleOpenTray : () => {} } style={ !this.props.allowOpen ? { cursor: 'default'} : {} }>
						<div className="song-stats-1">
							<div className="song-name">
								<div className="title">
									<Marquee>{this.props.track.title}</Marquee>
								</div>
								<div className="username">
									<Marquee>{this.props.track.user.username}</Marquee>
								</div>
							</div>
						</div>
						<div className="song-stats-2">
							<div className="time">
								{ timeIntervalURLToString(this.props.MASAS_songInfo.timeInterval) }
							</div>
							{
								this.props.allowOpen ?
									<div className="plays">
										{ this.props.MASAS_songInfo.play_count } <img src="/static/img/MASAS_icon_play_count.svg" alt="play count" className="play-count-icon" />
									</div>
								:
									''
							}
						</div>
					</div>
				</div>
				{ this.props.allowOpen ?
					<div className="hidden-info">
						<div className="RankingInfoIcon--wrapper"><RankingInfoIcon ranking={ 0.5 } /></div>
						<div className="icon--wrapper">
							{ this.props.MASAS_songInfo.like_count }<img className="like-icon" src="/static/img/MASAS_liked.svg" alt="# of likes" />
							<img onClick={ this.openChangeMoodModal } className="hidden-mobile" src="/static/img/MASAS_icon_changemood.svg" alt="change mood" />
							<img onClick={ this.openRemoveSongModal } className="hidden-mobile" src="/static/img/MASAS_icon_trash.svg" alt="delete song" />
						</div>
					</div>
					:
					<div></div>
				}
			</div>
		)
	}
}

TrackItemSmart.propTypes = smartPropTypes
TrackItemSmart.defaultProps = smartDefaultProps

const TrackItem = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrackItemSmart)

export {
	TrackItem,
}
