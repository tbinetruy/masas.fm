var React = require("react")

export const EmptyArtwork = props => (
	<div className="artwork-line--wrapper">
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
					onClick={ props.playRandomSong }
					className="player-button"
					style={{ display: 'flex' }}>
					<img src="/static/img/MASAS_player_play.svg" alt="play"/>
				</div>
			</div>
			<div className="song-info--wrapper">
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

EmptyArtwork.propTypes ={
	playRandomSong: React.PropTypes.func.isRequired,		// callback to execute when clicking on EmptyArtwork
}