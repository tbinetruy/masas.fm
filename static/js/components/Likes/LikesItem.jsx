import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

var { timeIntervalURLToString } = require('../../MASAS_functions.jsx')
var { Marquee } = require('../UI/UI.jsx')

import {
	loadPlaylist,
	pausePlayer,
	playNewSongFromPlaylist,
} from '../../reducers/actions/Player.js'

/**
 * Redux container
 */

const reduxStatePropTypes = {
	isFetchingSong: PropTypes.bool,
	isPaused: PropTypes.bool,
	songPlaying: PropTypes.string,
	userData: PropTypes.object,
}

const mapStateToProps = function(state) {
	return {
		songPlaying: state.playerReducer.songPlaying,
		isPaused: state.playerReducer.isPaused,
		isFetchingSong: state.playerReducer.isFetchingSong,
		userData: state.appReducer.userData,
	}
}

const reduxDispatchPropTypes = {
	loadPlaylist: PropTypes.func,
	pause: PropTypes.func,
	playNewSongFromPlaylist: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		pause: () => dispatch(pausePlayer()),
		loadPlaylist: (playlist) => dispatch(loadPlaylist(playlist)),
		playNewSongFromPlaylist: (playlistPosition) => dispatch(playNewSongFromPlaylist(playlistPosition)),
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

	MASAS_songPk: PropTypes.number,
	MASASinfo: PropTypes.object,			// song info from MASAS database
	SCinfo: PropTypes.object,			// related song info from SC
	isShowingArtistInfo: PropTypes.bool,
}

const smartDefaultProps = {
}

class LikesItemSmart extends React.Component {
    constructor(props) {
        super(props)

		this.playTrack = this.playTrack.bind(this)
		this.renderPlayerControlButton = this.renderPlayerControlButton.bind(this)
    }

	playTrack() {
		var playlist = [].concat(this.props.userData.likes)
		playlist.sort((a,b) => { return Date.parse(b.created) - Date.parse(a.created) })
		playlist = playlist.map((like) => {
			return like.song.url
		})

		var playlistPosition = 0
		for(var i = 0; i < playlist.length; i++) {
			if(this.props.MASASinfo.url === playlist[i])
				playlistPosition = i
		}

		this.props.loadPlaylist(playlist)
		this.props.playNewSongFromPlaylist(playlistPosition)
	}

	renderPlayerControlButton() {
		if(this.props.MASASinfo)	// prevent accessing MASAS_songInfo.url before props.MASAS_songInfo is loaded
		{
			if(this.props.isFetchingSong)
				return <img src="/static/img/puff_loader.svg" alt="loading" className="artwork" />

			if (this.props.MASASinfo.url === this.props.songPlaying && this.props.isPaused === false)
				return <img src="/static/img/MASAS_player_pause.svg" alt="pause" className="artwork" onClick={this.props.pause } />

			return <img src="/static/img/MASAS_player_play.svg" alt="play" className="artwork" onClick={this.playTrack } />
		}
	}

	render() {
		var SCinfo = this.props.SCinfo

		var artworkURL = SCinfo.artwork_url
		if(SCinfo.artwork_url !== null) {
			artworkURL = SCinfo.artwork_url.substring(0,SCinfo.artwork_url.lastIndexOf('-'))+'-t300x300.jpg'
		}

		const isShowingArtistInfo = this.props.isShowingArtistInfo

		return (
			<div className="likes-item--wrapper">

				<div className="artwork--wrapper">
					<div className="artwork-div" style={ !this.props.SCinfo.artwork_url ? {backgroundColor: 'black'} : {} }>
						{ this.props.SCinfo.artwork_url ? <img src={ artworkURL } alt="artwork" className="artwork" onClick={this.playTrack } /> : '' }
					</div>
					<div className="artwork-overlay">
						{ this.renderPlayerControlButton() }
					</div>
				</div>
				<div className="text--wrapper" onClick={ () => { } }>
					<div className="song-name--wrapper">
						<div className="title">
							<Marquee>{ SCinfo.title }</Marquee>
						</div>
						<div className="dash"> - </div>
						<div className="artist">
							<Marquee>{ SCinfo.user.username }</Marquee>
						</div>
					</div>
					<div className="song-stats--wrapper">
						<div className="time">
							{ timeIntervalURLToString(this.props.MASASinfo.timeInterval) }
						</div>
					</div>
				</div>
			</div>
		)
	}
}

LikesItemSmart.propTypes = smartPropTypes
LikesItemSmart.defaultProps = smartDefaultProps

const LikesItem = connect(
	mapStateToProps,
	mapDispatchToProps
)(LikesItemSmart)

export {
	LikesItem,
}

