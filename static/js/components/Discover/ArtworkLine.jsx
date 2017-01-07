var React = require("react")

var ReactRedux = require("react-redux")
var {
	mapStateToProps,
	mapDispatchToProps 
} = require("./containers/ArtworkLine.jsx")
var ArtworkLineItem = require("./ArtworkLineItem.jsx")

import { 
	POPULAR
} from "../../reducers/actions/Player.js"

import {
	getDiscoverNumberFromCurrentTime,
	getTimeIntervalNumberFromUrl,
} from "../../MASAS_functions.jsx"

var ArtworkLine = React.createClass({
	propTypes: {
		playFromPopular: React.PropTypes.bool, 							// if true, isgnore discoverNumber and play from popular
		discoverNumber: React.PropTypes.number,							// artwork shown from discover
		isFooterOpened: React.PropTypes.bool,
		renderForUITip: React.PropTypes.bool,	
		isModalOpened: React.PropTypes.bool,
		modalType: React.PropTypes.number,
		history: React.PropTypes.object,
		popularHistory: React.PropTypes.array,
		MASASuser: React.PropTypes.string,
		songPlaying: React.PropTypes.string,
		isPlayerPaused: React.PropTypes.bool,
		isSongPlayingLiked: React.PropTypes.bool,
		userToken: React.PropTypes.string,
		songPlayingArtistInfo: React.PropTypes.object,

		playPreviousSongInDiscover: React.PropTypes.func,
		lastSongInDiscoverHistory: React.PropTypes.func,
		playRandomSong: React.PropTypes.func,
		toggleIsFooterOpened: React.PropTypes.func,
		pause: React.PropTypes.func,
		play: React.PropTypes.func,
		toggleSongLike: React.PropTypes.func,
		playAndSaveHistory: React.PropTypes.func,
	},

	getDefaultProps: function() {
		return {
			renderForUITip: false,
			playFromPopular: false,
			discoverNumber: 1,
		}
	},

	componentDidMount: function() {
		this.scrollToEnd()
	},

	componentDidUpdate: function() {
		this.scrollToEnd()
	},

	scrollToEnd: function() {
		// this.refs.artworkLine.animate({ scrollLeft: this.refs.artworkLine.scrollWidth }, 1000);
		this.refs.artworkLine.scrollLeft = this.refs.artworkLine.scrollWidth
	},

	playRandomSong: function() {
		this.props.playRandomSong(this.props.playFromPopular ? POPULAR : this.props.discoverNumber)
	},
 
	render: function() {
		let { renderForUITip, isModalOpened, modalType } = this.props

		let history = this.props.history.all.filter( ({ MASAS_songInfo }) =>
			parseInt(getTimeIntervalNumberFromUrl(MASAS_songInfo.timeInterval)) === this.props.discoverNumber
		)

		if(this.props.playFromPopular)
			history = this.props.popularHistory.filter( ({ MASAS_songInfo }) => 
				parseInt(getTimeIntervalNumberFromUrl(MASAS_songInfo.timeInterval)) === getDiscoverNumberFromCurrentTime()
			)

		// if nothing is playing
		if(history.length === 0)
			return (
				
				<div className="artwork-line--wrapper">
					<div 
						className="left-side"
						style={{
							visibility: isModalOpened && modalType === 2 ? 'hidden' : 'visible'
						}}>
						<div className="artwork-line" ref="artworkLine">
							<div className="empty-artwork" style={{ visibility: 'hidden' }}></div>
						</div>
					</div>
					<div 
						className="artwork-playing--wrapper"
						style={{
							visibility: !renderForUITip && isModalOpened && modalType === 2 ? 'hidden' : 'visible'
						}}>	
						<div className="artwork-playing">
							<div
								onClick={ () => this.playRandomSong() }
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
		else {
			// artwork line (song history)
			let key_ID = 0

			// show only most recent songs in history
			if(history.length > 10)
				history = history.slice(history.length - 10, history.length)

			let artworkLine =  history.map( ({ SC_songInfo, MASAS_songInfo, artistInfo }) => {
				key_ID = key_ID + 1
				let artworkURL = ""
				if(SC_songInfo.artwork_url !== null) {
					artworkURL = SC_songInfo.artwork_url.substring(0,SC_songInfo.artwork_url.lastIndexOf("-"))+"-t300x300.jpg"
				}

				let isItemPlaying = this.props.songPlaying === MASAS_songInfo.url && this.props.isPlayerPaused === false

				return (
					<ArtworkLineItem 
						playFromPopular={ this.props.playFromPopular }
						isModalOpened={ isModalOpened }
						modalType={ modalType }
						key_ID={ key_ID }
						artworkURL={ artworkURL }
						SC_songInfo={ SC_songInfo }
						MASAS_songInfo={ MASAS_songInfo }
						isItemPlaying={ isItemPlaying }
						pause={ this.props.pause }
						playAndSaveHistory={ this.props.playAndSaveHistory }
						artistInfo={ artistInfo }
						key={ key_ID }
						/>
					)
			})
			artworkLine.pop()

			// bigger artwork in center
			let artworkPlaying = history.map( ({ SC_songInfo, MASAS_songInfo }) => { return { SC_songInfo, MASAS_songInfo } }).pop()

			const MASAS_songPlayingInfo = artworkPlaying.MASAS_songInfo
			artworkPlaying = artworkPlaying.SC_songInfo 		// retro compa, needs refactor
			// get bigger artwork
			let artworkPlayingURL = ""
			if(typeof(artworkPlaying) !== "undefined") 
				if(artworkPlaying.artwork_url)
					artworkPlayingURL = artworkPlaying.artwork_url.substring(0,artworkPlaying.artwork_url.lastIndexOf("-"))+"-t300x300.jpg"

			return  (
				<div className="artwork-line--wrapper">
					<div className="left-side">
						<div className="artwork-line" ref="artworkLine">
							<div className="artwork-line2">
								{ artworkLine }
							</div>
							<div className="empty-artwork" style={{ visibility: 'hidden' }}></div>
						</div>
					</div>
					<div 
						className={ "artwork-playing--wrapper " + (renderForUITip && isModalOpened && modalType === 2 ? 'hide-on-mobile' : '') + (!renderForUITip && isModalOpened && modalType === 2 ? 'hide-content' : '') }>

						<img
							onClick={ () => this.props.playPreviousSongInDiscover(this.props.discoverNumber)} 
							className={ "pervious-song-button" + (this.props.lastSongInDiscoverHistory(this.props.history.all, this.props.discoverNumber) === -1 ? " hidden" : "") }
							src="/static/img/MASAS_next.svg"
							alt="next" />
						<ArtworkLineItem 
							isModalOpened={ isModalOpened }
							modalType={ modalType }
							key_ID={ 0 }
							artworkURL={ artworkPlayingURL }
							SC_songInfo={ artworkPlaying }
							MASAS_songInfo={ MASAS_songPlayingInfo }
							isItemPlaying={ this.props.songPlaying === MASAS_songPlayingInfo.url && this.props.isPlayerPaused === false }
							pause={ this.props.pause }
							playAndSaveHistory={ this.props.playAndSaveHistory }
							isArtworkLarge={ true }
							songPlaying={ this.props.songPlaying }
							toggleSongLike={ this.props.toggleSongLike }
							isSongPlayingLiked={ this.props.isSongPlayingLiked }
							userToken={ this.props.userToken }
							artistInfo={ this.props.songPlayingArtistInfo }
							/>
						<img
							onClick={ () => this.playRandomSong() } 
							className="next-song-button"
							src="/static/img/MASAS_next.svg"
							alt="next" />
					</div>
					<div 
						className={ "button " + (this.props.songPlaying === MASAS_songPlayingInfo.url ? ' show ' : '') }
						style={{
							visibility: isModalOpened && modalType === 2 ? 'hidden' : 'visible'
						}}>
						<img
							onClick={ () => this.playRandomSong() } 
							className="next-song"
							src="/static/img/MASAS_next.svg"
							alt="next" />
						{ 
							this.props.isFooterOpened === false ?
								<img
									onClick={ this.props.toggleIsFooterOpened }
									src="/static/img/MASAS_icon_dot.svg"
									className="toggle-menu"
									alt="menu icon" />
							:
								<img
									onClick={ this.props.toggleIsFooterOpened }
									src="/static/img/MASAS_icon_close.svg"
									className="toggle-menu small"
									alt="menu icon" />
						}

					</div>
					<div className="right-side">
					</div>
				</div>
				)
		}
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(ArtworkLine)
