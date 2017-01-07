var React = require("react")

export const Artwork = props => {
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

	let { onArtworkClick } = props

	if(!props.allowPlayPause) {
		PausePlayButton = () => <div></div>
		onArtworkClick = () => {}
	}

	return (
		<div className="artwork--wrapper">
			{
				props.artworkURL ?
					<img src={ props.artworkURL } alt="artwork" className="artwork"/>
				:
					<div className="artwork"></div>
			}
			<div
				className={ "player-button" }
				onClick={ onArtworkClick }>
				<PausePlayButton />
			</div>
		</div>
	)
}

Artwork.propTypes = {
	artworkURL: React.PropTypes.string.isRequired,				// artwork url as a string
	onArtworkClick: React.PropTypes.func.isRequired,			// callback called when clicking on artwork
	isItemPlaying: React.PropTypes.bool.isRequired,				// is song on artwork currently playing
	allowPlayPause: React.PropTypes.bool,						// can user play pause song from artwork
}

Artwork.defaultProps = {
	allowPlayPause: true,
}