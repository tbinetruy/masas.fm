var React = require('react')

var ReactRedux = require('react-redux')
var { mapStateToProps, mapDispatchToProps } = require('./containers/Footer.jsx')

var FooterModal = require('./FooterModals.jsx')
var UnsplashControls = require('./UnsplashControls.jsx')
var MiniProfileWrapper = require('../Profile/MiniProfileWrapper.jsx')
var { PlayerBar } = require('../Player/PlayerBar.jsx')
const Player = PlayerBar
var { getTimeIntervalFromURL } = require('../../MASAS_functions.jsx')
const ProgressBar = require('./ProgressBar.jsx')


var Footer = React.createClass({
	propTypes: {
		playlist: React.PropTypes.array,
		isPlaylistPlaying: React.PropTypes.bool,
		isPlayerBarOpened: React.PropTypes.bool,
		playlistPosition: React.PropTypes.number,
		playRandomSong: React.PropTypes.func,
		playNewSongFromPlaylist: React.PropTypes.func,
	},


	componentWillMount: function() {

        // Keeping track of progress bar here with a timer
		// allows us to reuse the progressBar component many times
		// without having to use multiple timers
		// probably needs to be moved to the playerBar comp however

		// init progress bar width
		var progressBarWidth = 0

		// init interval for progress bar width
		this.interval = setInterval( () => {
			// if player is playing

			//typeof($("#jquery_jplayer_1").data('jPlayer')) !== "undefined"
			if(this.props.songPlaying !== null && !this.props.isPlayerPaused && this.props.SC_songInfo) {
				// update progress bar length
				progressBarWidth = $('#jquery_jplayer_1').data('jPlayer').status.currentTime*1000*100 / this.props.SC_songInfo.duration
				this.props.updateProgressBar(progressBarWidth)
			} else {
				// verify that progress bar isn't already 0
				if(this.props.progressBarWidth !== 0)
					this.props.updateProgressBar(0)	// reset progress bar
			}
		}, 250)
	},

	componentWillUnmount: function() {
		clearInterval(this.interval)
	},

	playRandomSong: function () {
		const timeInterval = getTimeIntervalFromURL(this.props.MASAS_songInfo.timeInterval)

		this.props.playRandomSong(timeInterval)
	},

	toogleMenu: function() {
		if(!this.props.isModalOpened)
			this.props.toogleIsOpened()
	},


	openModal: function(modalType) {
		this.toogleMenu()

		// USE THIS LIFECYCLE FUNCTION TO UPDATE MODAL CONTENT
		var that = this
		this.props.updateModalContent(
			<FooterModal
				isSpamModal={ modalType === 1}
				isCopyrightModal={ modalType === 2 ? true : false}
				isSuggestTimeModal={ modalType === 3 ? true : false}
				/>
			)
		this.props.toogleModal()
	},

	getNextSongIcon: function() {
		if(this.props.songPlaying) {
			if(this.props.isPlaylistPlaying) {
				if(this.props.playlistPosition < this.props.playlist.length - 1)
					return <img onClick={this.props.playNewSongFromPlaylist.bind(this, this.props.playlistPosition + 1)} src="/static/img/MASAS_next.svg" alt="next song" className="next-icon" />
				else
					return
			} else
				return <img onClick={this.playRandomSong} src="/static/img/MASAS_next.svg" alt="next song" className="next-icon" />

		} else {
			return
		}
	},

	render: function() {
		return (
			<div className="footer--wrapper">

				<UnsplashControls />


				<div className={ 'slider--wrapper ' + (this.props.isPlayerBarOpened ? 'opened' : '') }>

					<MiniProfileWrapper />

					<ProgressBar />

					<div className="visible--wrapper">
						<div className="row no-margin"  style={{height: '100%'}}>
							<div className="col-md-2 col-display-none-sm buffer-info">
								<div className="box">
									<div className="">
										{this.props.isBuffering ? ' Buffering...' : ''}
									</div>
								</div>
							</div>
							<div className="col-xs-9 col-md-8 player--wrapper">
								<img
									src='/static/img/MASAS_icon_dot.svg'
									alt='open footer'
									className='open-footer-icon'
									/>
								<Player />
							</div>
							<div className="col-xs-3 col-md-2 col-display-none-sm extra-controls--wrapper">
								<div className="box nextSong--wrapper">
									{ this.getNextSongIcon() }
								</div>
							</div>
						</div>
					</div>
					<div className="hidden--wrapper">
						<div className="col-md-2 col-display-none-sm">
							<div className="box">

							</div>
						</div>
						<div className="dislike-choices--wrapper">
							<span className="copyright" onClick={ this.openModal.bind(this, 2) }>Report as Copyright Infringment</span>
							<hr />
							<span className="spam" onClick={ this.openModal.bind(this, 1) }>Report as SPAM</span>
							<hr />
							<span className="suggest-time" onClick={ this.openModal.bind(this, 3) }>Suggest another time</span>
							<hr />
							<span className="no-like">I don't like it</span>
						</div>
						<div className="col-md-2 col-display-none-sm">
							<div className="box">

							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Footer)
