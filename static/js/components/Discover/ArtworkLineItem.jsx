var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/ArtworkLineItem.jsx")


import { Artwork } from "./dumb/Artwork.jsx"
import { SongInfo } from "./dumb/SongInfo.jsx"


var ArtworkLineItem = React.createClass({
	propTypes: {
		isModalOpened: React.PropTypes.bool,
		modalType: React.PropTypes.number,

		key_ID: React.PropTypes.number,
		artworkURL: React.PropTypes.string,
		SC_songInfo: React.PropTypes.object,
		MASAS_songInfo: React.PropTypes.object,
		isItemPlaying: React.PropTypes.bool,
		isArtworkLarge: React.PropTypes.bool,					// larger ArtworkLineItem
		songPlaying: React.PropTypes.string,
		isSongPlayingLiked: React.PropTypes.bool,
		userToken: React.PropTypes.string,
		artistInfo: React.PropTypes.object,						// artist info
		allowPlayPause: React.PropTypes.bool,					// can use click on artwork to play pause

		updateMiniProfileContent: React.PropTypes.func,
		pause: React.PropTypes.func,
		playAndSaveHistory: React.PropTypes.func,
		resumePlayer: React.PropTypes.func,
		toggleSongLike: React.PropTypes.func,
	},

	getDefaultProps: function() {
		return {
			isArtworkLarge: false,
			allowPlayPauseOnClick: true,
		}
	},

	componentWillMount: function() {
	},

	componentDidMount: function() {
	},

	componentWillUnmount: function() {
	},

	toggleShowProfile: function() {
		this.props.updateMiniProfileContent(this.props.MASAS_songInfo.trackArtist)
	},

	onArtworkClick: function() {
		if(this.props.isItemPlaying)
			this.props.pause()
		else if(this.props.songPlaying === this.props.MASAS_songInfo.url)
			this.props.resumePlayer()
		else
			this.props.playAndSaveHistory(this.props.MASAS_songInfo.url)
	},

	render: function() {
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
			toggleSongLike,
		} = this.props


		return (
			<div
				className={ "artwork-line-item--wrapper " + (isArtworkLarge ? "artwork-playing" : "") }
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
					toggleSongLike={ toggleSongLike }
					isSongPlayingLiked={ isSongPlayingLiked }
					songPlaying={ songPlaying }
					SC_songInfo={ SC_songInfo }
					MASAS_songInfo={ MASAS_songInfo }
					/>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(ArtworkLineItem)
