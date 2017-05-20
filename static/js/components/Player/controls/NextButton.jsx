import React, { PropTypes } from 'react'
import { connect }from 'react-redux'

import {
	playNewSongFromPlaylist,
	playRandomSong,
} from '../../../reducers/actions/Player.js'

import { POPULAR } from '../../../reducers/actions/Player.js'

/**
 * Redux container
 */

const reduxStatePropTypes = {
    MASAS_songInfo: React.PropTypes.object,
    isPlaylistPlaying: React.PropTypes.bool,
    playingFromPopular: React.PropTypes.bool,
    playlist: React.PropTypes.array,
    playlistPosition: React.PropTypes.number,
    songPlaying: React.PropTypes.string,
}

const mapStateToProps = function(state) {
	return {
		songPlaying: state.playerReducer.songPlaying,
		isPlaylistPlaying: state.playerReducer.isPlaylistPlaying,
		MASAS_songInfo: state.playerReducer.MASAS_songInfo,
		playingFromPopular: state.playerReducer.playingFromPopular,
		playlistPosition: state.playerReducer.playlistPosition,
		playlist: state.playerReducer.playlist,
	}
}

const reduxDispatchPropTypes = {
    playNewSongFromPlaylist: React.PropTypes.func,
    playRandomSong: React.PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		playNewSongFromPlaylist: (playlistPosition) => dispatch(playNewSongFromPlaylist(playlistPosition)),
		playRandomSong: (timeInterval = 0) => dispatch(playRandomSong(timeInterval)),
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

class NextButtonSmart extends React.Component {
    constructor(props) {
        super(props)

		this.getNextButton = this.getNextButton.bind(this)
    }

	getNextButton() {
		if(this.props.songPlaying) {
			if(this.props.isPlaylistPlaying) {
				// if there is a next song in playlist
				if(this.props.playlistPosition < this.props.playlist.length - 1)
					return <img
						onClick={ () => this.props.playNewSongFromPlaylist(this.props.playlistPosition + 1) }
						src="/static/img/MASAS_next.svg"
						alt="next song"
						className="next-song-icon" />
				else
					return <img
						src="/static/img/MASAS_next.svg"
						style={{ visibility: 'hidden' }}
						alt="next song"
						className="next-song-icon" />
			}
			// not paying from playlist, play random song from discover of popular
			else if(this.props.MASAS_songInfo) {
				let timeInterval = this.props.MASAS_songInfo.timeInterval[this.props.MASAS_songInfo.timeInterval.length - 2]
				if(this.props.playingFromPopular)
					timeInterval = POPULAR

				return <img
					onClick={ () => this.props.playRandomSong(timeInterval) }
					src="/static/img/MASAS_next.svg"
					alt="next song"
					className="next-song-icon" />
			}
		} else {
			// hide next button if no songs are loaded
			return <img
				src="/static/img/MASAS_next.svg"
				style={{ visibility: 'hidden' }}
				alt="next song"
				className="next-song-icon" />
		}
	}

	render() {
		return (
			<div className="next-button-component--wrapper">
                { this.getNextButton() }
			</div>
		)
	}
}

NextButtonSmart.propTypes = smartPropTypes
NextButtonSmart.defaultProps = smartDefaultProps

const NextButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(NextButtonSmart)

export {
    NextButton,
}

