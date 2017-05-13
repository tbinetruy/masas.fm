import * as React from 'react'

import {
	playNewSongFromPlaylist,
	playPreviousSongInHistory,
} from '../../../reducers/actions/Player.js'

import { connect }from 'react-redux'

/**
 * Redux container
 */

const mapStateToProps = function(state) {
	return {
		isPlaylistPlaying: state.playerReducer.isPlaylistPlaying,
		playingFromPopular: state.playerReducer.playingFromPopular,
		playlistPosition: state.playerReducer.playlistPosition,
		popularHistory: state.popularReducer.history,
	}
}

const mapDispatchToProps = function(dispatch) {
	return {
		playPreviousSong: () => dispatch(playPreviousSongInHistory()),
		playNewSongFromPlaylist: (playlistPosition) => dispatch(playNewSongFromPlaylist(playlistPosition)),
	}
}


/**
 * Smart component
 */
class PreviousButtonSmart extends React.Component {
    constructor(props) {
        super(props)
    }

	getPreviousButton() {
		// no back button if playing from discover
		if(!this.props.playingFromPopular && !this.props.isPlaylistPlaying)
			return

		if(this.props.isPlaylistPlaying) {
			if(this.props.playlistPosition === 0)
				return <img src="/static/img/MASAS_next.svg" style={{ visibility: 'hidden' }} alt="next song" className="previous-song-icon"  />
			else
				return <img
					src="/static/img/MASAS_next.svg"
					onClick={ () => this.props.playNewSongFromPlaylist(this.props.playlistPosition - 1) }
					alt="pevious song"
					className="previous-song-icon"
					/>
		} else {
			if(this.props.popularHistory.length > 1)
				return <img
					src="/static/img/MASAS_next.svg"
					onClick={ () => this.props.playPreviousSong() }
					alt="previous song"
					className="previous-song-icon"
					style={{ visibility: this.props.popularHistory.length > 1 ? 'visible' : 'hidden' }}
					/>
			else
				return <img src="/static/img/MASAS_next.svg" style={{ visibility: 'hidden' }} alt="next song" className="previous-song-icon"  />
		}
	}

	render() {
		return (
			<div className="previous-button-component--wrapper">
                { this.getPreviousButton() }
			</div>
		)
	}
}

PreviousButtonSmart.propTypes = {
    isPlaylistPlaying: React.PropTypes.bool,
    playNewSongFromPlaylist: React.PropTypes.func,
    playPreviousSong: React.PropTypes.func,
    playingFromPopular: React.PropTypes.bool,
    playlistPosition: React.PropTypes.number,
    popularHistory: React.PropTypes.array,

}

const PreviousButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(PreviousButtonSmart)

export {
    PreviousButton
}

