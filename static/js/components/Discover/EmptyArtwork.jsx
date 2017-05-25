import PropTypes from 'prop-types'
import React from 'react'

class EmptyArtwork extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className={ 'artwork-line--wrapper ' + (this.props.playFromPopular ? 'popular' : '') }>
				<div
					className="left-side">
					<div className="artwork-line" ref="artworkLine">
						<div className="empty-artwork" style={{ visibility: 'hidden' }}></div>
					</div>
				</div>
				<div
					className="artwork-playing--wrapper">
					<div className="artwork-playing">
						<div
							onClick={ this.props.playRandomSong }
							className="player-button"
							style={{ display: 'flex' }}>
							<img src="/static/img/MASAS_player_play.svg" alt="play" />
						</div>
					</div>
					<div className={ 'song-info--wrapper' + (this.props.popularTheme ? ' popular' : '') }>
						<div className="like-icon">
							<img src="/static/img/MASAS_like_shadow.svg" style={{ pointer: 'default' }} alt="like" />
						</div>
						<div className="song-info">
							<div className="title"></div>
							<div className="artist"></div>
						</div>
					</div>
				</div>
				<div className="right-side">
				</div>
			</div>
		)
	}
}

EmptyArtwork.propTypes = {
	playFromPopular: PropTypes.bool,
	playRandomSong: PropTypes.func.isRequired,		// callback to execute when clicking on EmptyArtwork
	popularTheme: PropTypes.bool,						// should comp be styled for popular theme
}

EmptyArtwork.defaultProps = {
	popularTheme: false
}

export {
	EmptyArtwork,
}
