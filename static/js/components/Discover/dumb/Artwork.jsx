var React = require("react")

export const Artwork = props => (
    <div className="artwork--wrapper2">
        {
            props.artworkURL ?
                <img src={ props.artworkURL } alt="artwork" className="artwork"/>
            :
                <div className="artwork"></div>
        }
        <div 
            className={ "player-button" }
            onClick={ props.onArtworkClick }>
            {
                props.isItemPlaying ?
                    <img 
                        src="/static/img/MASAS_player_pause.svg" 
                        alt="pause" />
                :
                    <img 
                        src="/static/img/MASAS_player_play.svg" 
                        
                        alt="play" />
            }
        </div>
    </div>
)

Artwork.propTypes = {
	artworkURL: React.PropTypes.string.isRequired,				// artwork url as a string
	onArtworkClick: React.PropTypes.func.isRequired,			// callback called when clicking on artwork
	isItemPlaying: React.PropTypes.bool.isRequired,				// is song on artwork currently playing
	allowPlayPause: React.PropTypes.bool,						// can user play pause song from artwork
}

Artwork.defaultProps = {
	allowPlayPause: true,
}