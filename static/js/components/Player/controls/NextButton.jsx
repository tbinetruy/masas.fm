import {
} from "../../../reducers/actions/App.js"

import react from "react"
const React = react

import { connect }from "react-redux"

import {
	playRandomSong,
	playNewSongFromPlaylist,
} from "../../../reducers/actions/Player.js"

import { POPULAR } from "../../../reducers/actions/Player.js"

/**
 * Redux container
 */

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

const mapDispatchToProps = function(dispatch) {
	return {
		playNewSongFromPlaylist: (playlistPosition) => dispatch(playNewSongFromPlaylist(playlistPosition)),
		playRandomSong: (timeInterval = 0) => dispatch(playRandomSong(timeInterval)),
	}
}


/**
 * Smart component
 */
class NextButtonSmart extends React.Component {
    constructor(props) {
        super(props)
    }

	getNextButton = () => {
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

	render = () => {
		return (
			<div className="next-button-component--wrapper">
                { this.getNextButton() }
			</div>
		)
	}
}

NextButtonSmart.propTypes = {
    songPlaying: React.PropTypes.string,
    isPlaylistPlaying: React.PropTypes.bool,
    MASAS_songInfo: React.PropTypes.object,
    playingFromPopular: React.PropTypes.bool,
    playlistPosition: React.PropTypes.number,
    playlist: React.PropTypes.array,

    playNewSongFromPlaylist: React.PropTypes.func,
    playRandomSong: React.PropTypes.func,
}

const NextButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(NextButtonSmart)

export {
    NextButton
}

