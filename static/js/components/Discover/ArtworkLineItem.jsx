import React, { PropTypes } from 'react'
import { connect }from 'react-redux'

import { Artwork } from './dumb/Artwork.jsx'
import { SongInfo } from './dumb/SongInfo.jsx'
import { SplashScreen } from '../App/SplashScreen.jsx'
import { resumePlayer } from '../../reducers/actions/Player.js'
import {
	changeModalContent,
	toogleIsModalOpened,
	updateMiniProfileContent,
	updatePageTitle,
	updateSplashScreenLoginMessage,
} from '../../reducers/actions/App.js'


/**
 * Redux container
 */

const reduxStatePropTypes = {
	MASASuser: PropTypes.string.isRequired,
}

const mapStateToProps = function(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
	}
}

const reduxDispatchPropTypes = {
	toggleModal: PropTypes.func,
	resumePlayer: PropTypes.func,
	updateLoginMessage: PropTypes.func,
	updateMiniProfileContent: PropTypes.func,
	updateModalContent: PropTypes.func,
	updateTitle: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch(updatePageTitle(title, pageType)),
		updateLoginMessage: message => dispatch(updateSplashScreenLoginMessage(message)),
		updateModalContent: (modalContent, modalType) => dispatch(changeModalContent(modalContent, modalType)),
		toggleModal: () => dispatch(toogleIsModalOpened()),
		resumePlayer: () => dispatch(resumePlayer()),
		updateMiniProfileContent: userApiURL => dispatch(updateMiniProfileContent(userApiURL))
	}
}

/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

	MASAS_songInfo: PropTypes.object,
	SC_songInfo: PropTypes.object,
	allowPlayPause: PropTypes.bool,					// can use click on artwork to play pause
	artworkURL: PropTypes.string,
	isArtworkLarge: PropTypes.bool,					// larger ArtworkLineItem
	isItemPlaying: PropTypes.bool,
	isSongPlayingLiked: PropTypes.bool,
	key_ID: PropTypes.number,
	pause: PropTypes.func,
	playAndSaveHistory: PropTypes.func,
	popularTheme: PropTypes.bool,						// should comp be themed for popular page
	songPlaying: PropTypes.string,
	toggleSongLike: PropTypes.func,
}

const smartDefaultProps = {
	isArtworkLarge: false,
	allowPlayPauseOnClick: true,
}

class ArtworkLineItemSmart extends React.Component {
	constructor(props) {
		super(props)

		this.toggleShowProfile = this.toggleShowProfile.bind(this)
		this.toggleSongLike = this.toggleSongLike.bind(this)
		this.onArtworkClick = this.onArtworkClick.bind(this)
	}

	toggleShowProfile() {
		this.props.updateMiniProfileContent(this.props.MASAS_songInfo.trackArtist)
	}

	toggleSongLike() {
		// show login modal if user not logged in
		if(this.props.MASASuser === '') {
			this.props.updateLoginMessage('Please log-in to Like & Save songs')
			this.props.updateModalContent(<SplashScreen startPage={ 1 } />, 3)
			this.props.toggleModal()
		} else {
			this.props.toggleSongLike(this.props.MASASuser, this.props.songPlaying)
		}
	}

	onArtworkClick() {
		if(this.props.isItemPlaying)
			this.props.pause()
		else if(this.props.songPlaying === this.props.MASAS_songInfo.url)
			this.props.resumePlayer(this.props.popularTheme)
		else
			this.props.playAndSaveHistory(this.props.MASAS_songInfo.url, this.props.popularTheme)
	}

	render() {
		let {
			key_ID,
			artworkURL,
			isItemPlaying,
			isArtworkLarge,
			allowPlayPause,
			MASAS_songInfo,
			SC_songInfo,
			isSongPlayingLiked,
			songPlaying,
			popularTheme,
			MASASuser,
		} = this.props


		return (
			<div
				className={ 'artwork-line-item--wrapper ' + (isArtworkLarge ? 'artwork-playing' : '') }
				key={ key_ID }>
				<Artwork
					artworkURL={ artworkURL }
					onArtworkClick={ this.onArtworkClick }
					isItemPlaying={ isItemPlaying }
					allowPlayPause={ allowPlayPause }
					/>
				<SongInfo
					small={ !isArtworkLarge }
					toggleShowProfile={ this.toggleShowProfile }
					toggleSongLike={ this.toggleSongLike }
					isSongPlayingLiked={ isSongPlayingLiked }
					songPlaying={ songPlaying }
					SC_songInfo={ SC_songInfo }
					MASAS_songInfo={ MASAS_songInfo }
					popularTheme={ popularTheme }
					MASASuser={ MASASuser }
					/>
			</div>
		)
	}
}

ArtworkLineItemSmart.propTypes = smartPropTypes
ArtworkLineItemSmart.defaultProps = smartDefaultProps

const ArtworkLineItem = connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtworkLineItemSmart)

export {
	ArtworkLineItem,
}