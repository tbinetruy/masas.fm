import React, { PropTypes } from 'react'

import { Marquee } from '../../UI/UI.jsx'

const SongInfo = props => {
	if(props.small)
		return (
			<div
				onClick={ props.toggleShowProfile }
				className={'song-info--wrapper' + (props.popularTheme ? ' popular' : '' )} >
				<Marquee className="title">{ props.SC_songInfo.title }</Marquee>
				<Marquee className="artist">{ props.SC_songInfo.user.username }</Marquee>
			</div>
		)
	else
			return (
				<div className={'song-info--wrapper' + (props.popularTheme ? ' popular' : '' ) }>
					<div
						className={ 'like-icon ' + (props.songPlaying === props.MASAS_songInfo.url ? 'show' : 'hide') }
						onClick={ () => props.toggleSongLike() }>
						{
							props.isSongPlayingLiked && props.MASASuser !== '' ?
								<img src="/static/img/MASAS_liked.svg" alt="unlike" />
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
	MASAS_songInfo: PropTypes.object.isRequired,          // dict containing song info from MASAS api
	MASASuser: PropTypes.string,							// user login token
	SC_songInfo: PropTypes.object.isRequired,				// dict containing song info from SC api
	isSongPlayingLiked: PropTypes.bool.isRequired,		// is song liked
	popularTheme: PropTypes.bool,							// should song info be themed for discover page
	small: PropTypes.bool,								// should show small version of component
	songPlaying: PropTypes.string,						// MASAS api url of currently playing song
	toggleShowProfile: PropTypes.func.isRequired,			// callback called when clicking on component
	toggleSongLike: PropTypes.func,						// callback called when song is liked from component
}

SongInfo.defaultProps = {
	isSongPlayingLiked: false,
	popularTheme: false,
}

export {
	SongInfo,
}