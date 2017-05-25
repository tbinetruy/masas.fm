import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
	playNewSongFromPlaylist,
	playPreviousSongInHistory,
} from '../../../reducers/actions/Player.js'


/**
 * Redux container
 */

const reduxStatePropTypes = {
    isPlaylistPlaying: PropTypes.bool,
    playingFromPopular: PropTypes.bool,
    playlistPosition: PropTypes.number,
    popularHistory: PropTypes.array,
}

const mapStateToProps = function(state) {
	return {
		isPlaylistPlaying: state.playerReducer.isPlaylistPlaying,
		playingFromPopular: state.playerReducer.playingFromPopular,
		playlistPosition: state.playerReducer.playlistPosition,
		popularHistory: state.popularReducer.history,
	}
}

const reduxDispatchPropTypes = {
    playNewSongFromPlaylist: PropTypes.func,
    playPreviousSong: PropTypes.func,
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

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,
}

const smartDefaultProps = {
}

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

PreviousButtonSmart.propTypes = smartPropTypes
PreviousButtonSmart.defaultProps = smartDefaultProps

const PreviousButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(PreviousButtonSmart)

export {
    PreviousButton
}

