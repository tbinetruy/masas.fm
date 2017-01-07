var React = require("react")
var { Marquee } = require("../../UI/UI.jsx")

export const SongInfo = props => {
	if(props.small)
		return (
			<div 
				onClick={ props.toggleShowProfile }
				className="song-info--wrapper">
				<Marquee className="title">{ props.SC_songInfo.title }</Marquee>
				<Marquee className="artist">{ props.SC_songInfo.user.username }</Marquee>
			</div>
		)
	else
			return (
				<div 
					className="song-info--wrapper"
					onClick={ props.toggleShowProfile }>
					<div
						className="like-icon" 
						style={ {
							display: (this.props.songPlaying === MASAS_songInfo.url ? 'flex' : 'none')
						} }
						onClick={ () => props.toggleSongLike(props.userToken, props.songPlaying) }>
						{
							props.isSongPlayingLiked ?
								<img src="/static/img/MASAS_liked.svg" alt="like" />
							:
								<img src="/static/img/MASAS_like_shadow.svg" alt="like" />
						}
					</div>
					<div 
						className="song-info">
						<div className="title"><Marquee>{ props.SC_songInfo.title }</Marquee></div>
						<div className="artist"><Marquee>{ props.SC_songInfo.user.username }</Marquee></div>
					</div>
				</div>
			)
}

SongInfo.PropTypes = {
	small: React.PropTypes.bool,                               // should show small version of component
	toggleShowProfile: React.PropTypes.func.isRequired,        // callback called when clicking on component
	SC_songInfo: React.PropTypes.object.isRequired,            // dict containing song info from SC api
	isSongPlayingLiked: React.PropTypes.bool.isRequired,       // is song liked
	MASAS_songInfo: React.PropTypes.object.isRequired,          // dict containing song info from MASAS api
}
