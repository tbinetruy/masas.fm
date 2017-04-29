import {
	updatePageTitle,
} from "../../../reducers/actions/App.js"

import react from "react"
const React = react

import { connect }from "react-redux"

import {
	playPlayer,
	pausePlayer,
	playRandomSong,

	playNewSongFromPlaylist,
	playNewSong,
	resumePlayer,
	setIsPlayerBuffering,
	toggleSongLike,
} from "../../../reducers/actions/Player.js"

/**
 * Redux container
 */

const mapStateToProps = function(state) {
	return {
		isFetchingSong: state.playerReducer.isFetchingSong,
		isPaused: state.playerReducer.isPaused,
		songPlaying: state.playerReducer.songPlaying,
	}
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
class PlayButtonSmart extends React.Component {
    constructor(props) {
        super(props)
    }

	componentWillMount = () => {
	}

    // play / pause / fetching button
	getControlButtons = () => {
		// show loader if fetching song info
		/*if(this.props.isFetchingSong)
			return <img
                src="/static/img/puff_loader.svg"
                alt="loading"
                className="player-button"
                id="player-play-button"/>*/

		// pause on click if song playing is not paused
		if(this.props.songPlaying !== null && this.props.isPaused === false)
			return <img
                onClick={ this.props.pause }
                src="/static/img/MASAS_player_pause.svg"
                alt="pause button"
                className="player-button"
                id="player-play-button"/>

		// if nothing is playing, play random song on play icon
		if(!this.props.songPlaying)
			return <img
                onClick={ () => this.props.playRandomSong(0) }
                src="/static/img/MASAS_player_play.svg"
                alt="play button"
                className="player-button"
                id="player-play-button"/>

		// else, click play to unpause
		return <img
            onClick={ this.props.play }
            src="/static/img/MASAS_player_play.svg"
            alt="play button"
            className="player-button"
            id="player-play-button" />
	}

	render = () => {
		return (
			<div className="play-button-component--wrapper">
                { this.getControlButtons() }
			</div>
		)
	}
}

PlayButtonSmart.propTypes = {
        isFetchingSong: React.PropTypes.bool,
        songPlaying: React.PropTypes.string,
        isPaused: React.PropTypes.bool,

        play: React.PropTypes.func,
        playRandomSong: React.PropTypes.func,
        pause: React.PropTypes.func,
}

const PlayButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayButtonSmart)

export {
    PlayButton
}

