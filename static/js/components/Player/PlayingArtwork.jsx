import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
	pausePlayer,
	playPlayer,
} from '../../reducers/actions/Player.js'

import { Artwork } from '../Discover/dumb/Artwork.jsx'

/**
 * Redux container
 */

const reduxStatePropTypes = {
	MASAS_songInfo: PropTypes.object,
	SC_songInfo: PropTypes.object,
	isPaused: PropTypes.bool,
}

const mapStateToProps = function(state) {
	return {
		MASAS_songInfo: state.playerReducer.MASAS_songInfo,
		SC_songInfo: state.playerReducer.SC_songInfo,
		isPaused: state.playerReducer.isPaused,
	}
}

const reduxDispatchPropTypes = {
	pause: PropTypes.func,
	play: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		play: () => dispatch(playPlayer()),
		pause: () => dispatch(pausePlayer()),
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

	onArtistClick: PropTypes.func,
}

const smartDefaultProps = {
	onArtistClick: () => {},
}

class PlayingArtworkSmart extends React.Component {
    constructor(props) {
        super(props)
    }

	render() {
		let artworkURL = ''
		if(this.props.SC_songInfo)
			if(this.props.SC_songInfo.artwork_url)
				artworkURL = this.props.SC_songInfo.artwork_url.substring(0,this.props.SC_songInfo.artwork_url.lastIndexOf('-'))+'-t300x300.jpg'

		return (
			<div className="player-mobile-artwork-playing--wrapper">
				<Artwork
					artworkURL={ artworkURL }
					allowPlayPause={ true }
					isItemPlaying={ !this.props.isPaused }
					onArtworkClick={ this.props.isPaused ? this.props.play : this.props.pause }
				/>
                {
					this.props.SC_songInfo ?
						<div className="song-info--wrapper">
							<div className="song-name">
								{ this.props.MASAS_songInfo.trackTitle }
							</div>
							<div className="artist-name" onClick={ this.props.onArtistClick }>
								{ this.props.SC_songInfo.user.username }
							</div>
						</div>
					:
						<div></div>
				}
			</div>
		)
	}
}

PlayingArtworkSmart.propTypes = smartPropTypes
PlayingArtworkSmart.defaultProps = smartDefaultProps

const PlayingArtwork = connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayingArtworkSmart)

export {
	PlayingArtwork,
}
