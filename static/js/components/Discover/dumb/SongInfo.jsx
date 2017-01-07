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
				<div className="song-info--wrapper">
					<div
						className="like-icon"
						style={ {
							display: (props.songPlaying === props.MASAS_songInfo.url ? 'flex' : 'none')
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
						onClick={ props.toggleShowProfile }
						className="song-info">
						<div className="title"><Marquee>{ props.SC_songInfo.title }</Marquee></div>
						<div className="artist"><Marquee>{ props.SC_songInfo.user.username }</Marquee></div>
					</div>
				</div>
			)
}

SongInfo.propTypes = {
	small: React.PropTypes.bool,                               // should show small version of component
	userToken: React.PropTypes.string,                         // user login token
	songPlaying: React.PropTypes.string,                       // MASAS api url of currently playing song
	toggleShowProfile: React.PropTypes.func.isRequired,        // callback called when clicking on component
	toggleSongLike: React.PropTypes.func,                      // callback called when song is liked from component
	SC_songInfo: React.PropTypes.object.isRequired,            // dict containing song info from SC api
	isSongPlayingLiked: React.PropTypes.bool.isRequired,       // is song liked
	MASAS_songInfo: React.PropTypes.object.isRequired,          // dict containing song info from MASAS api
}

SongInfo.defaultProps = {
	isSongPlayingLiked: false,
}
