import PropTypes from 'prop-types'
import React from 'react'

const Artwork = props => {
	const PauseButton = () => (
		<img
			src="/static/img/MASAS_player_pause.svg"
			alt="pause" />
	)

	const PlayButton = () => (
		<img
			src="/static/img/MASAS_player_play.svg"
			alt="play" />
	)

	let PausePlayButton = PlayButton

	if(props.isItemPlaying)
		PausePlayButton = PauseButton

	return (
		<div className={ 'artwork--wrapper' + (props.allowPlayPause ? ' news' : ' popular') }>
			{
				props.artworkURL ?
					<img src={ props.artworkURL } alt="artwork" className="artwork" />
				:
					<div className="artwork"></div>
			}
			{
				props.allowPlayPause ?
					<div
						className={ 'player-button' + (!props.isItemPlaying ? ' show' : '') }
						onClick={ props.onArtworkClick }>
						<PausePlayButton />
					</div>
				:
					<div style={{ display: 'none' }}></div>
			}
		</div>
	)
}

Artwork.propTypes = {
	allowPlayPause: PropTypes.bool,						// can user play pause song from artwork
	artworkURL: PropTypes.string.isRequired,				// artwork url as a string
	isItemPlaying: PropTypes.bool.isRequired,				// is song on artwork currently playing
	onArtworkClick: PropTypes.func.isRequired,			// callback called when clicking on artwork
}

Artwork.defaultProps = {
	allowPlayPause: true,
}

export {
	Artwork,
}