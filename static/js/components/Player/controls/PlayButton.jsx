import {
	pausePlayer,
	playPlayer,
	playRandomSong,
} from '../../../reducers/actions/Player.js'

import PropTypes from 'prop-types'
import React from 'react'
import { connect }from 'react-redux'


/**
 * Redux container
 */

const reduxStatePropTypes = {
	isFetchingSong: PropTypes.bool,
	isPaused: PropTypes.bool,
	songPlaying: PropTypes.string,
}

const mapStateToProps = function(state) {
	return {
		isFetchingSong: state.playerReducer.isFetchingSong,
		isPaused: state.playerReducer.isPaused,
		songPlaying: state.playerReducer.songPlaying,
	}
}

const reduxDispatchPropTypes = {
	pause: PropTypes.func,
	play: PropTypes.func,
	playRandomSong: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		pause: () => dispatch(pausePlayer()),
		play: () => dispatch(playPlayer()),
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

class PlayButtonSmart extends React.Component {
    constructor(props) {
        super(props)

		this.getControlButtons = this.getControlButtons.bind(this)
    }

    // play / pause / fetching button
	getControlButtons() {
		// pause on click if song playing is not paused
		if(this.props.songPlaying !== null && this.props.isPaused === false)
			return <img
                onClick={ this.props.pause }
                src="/static/img/MASAS_player_pause.svg"
                alt="pause button"
                className="player-button"
                id="player-play-button" />

		// if nothing is playing, play random song on play icon
		if(!this.props.songPlaying)
			return <img
                onClick={ () => this.props.playRandomSong(0) }
                src="/static/img/MASAS_player_play.svg"
                alt="play button"
                className="player-button"
                id="player-play-button" />

		// else, click play to unpause
		return <img
            onClick={ this.props.play }
            src="/static/img/MASAS_player_play.svg"
            alt="play button"
            className="player-button"
            id="player-play-button" />
	}

	render() {
		return (
			<div className="play-button-component--wrapper">
                { this.getControlButtons() }
			</div>
		)
	}
}

PlayButtonSmart.propTypes = smartPropTypes
PlayButtonSmart.defaultProps = smartDefaultProps

const PlayButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayButtonSmart)

export {
    PlayButton
}

