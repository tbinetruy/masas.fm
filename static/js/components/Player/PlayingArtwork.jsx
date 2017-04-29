var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/PlayingArtwork.jsx")

import { Artwork } from "../Discover/dumb/Artwork.jsx"

// var {goToURL} = require("../../MASAS_functions.jsx")
// import { BlurBackground } from "../MASAS_mixins.jsx"
// var { Link } = require("../UI/UI.jsx")
// var { browserHistory } = require('react-router')

// var PlayingArtwork = (props) => {

// }

var PlayingArtwork = React.createClass({
	propTypes: {
		SC_songInfo: React.PropTypes.object,
		MASAS_songInfo: React.PropTypes.object,
		isPaused: React.PropTypes.bool,

		play: React.PropTypes.func,
		pause: React.PropTypes.func,
	},

	componentWillMount: function() {
	},

	render: function() {
		let artworkURL = ""
		if(this.props.SC_songInfo)
			if(this.props.SC_songInfo.artwork_url)
				artworkURL = this.props.SC_songInfo.artwork_url.substring(0,this.props.SC_songInfo.artwork_url.lastIndexOf("-"))+"-t300x300.jpg"

		return (
			<div className="player-mobile-artwork-playing--wrapper">
				<Artwork
					artworkURL={ artworkURL }
					allowPlayPause={ true }
					isItemPlaying={ !this.props.isPaused }
					onArtworkClick={ this.props.isPaused ? this.props.play : this.props.pause }
				/>
                {
					this.props.SC_songInfo ?
						<div className="song-info--wrapper">
							<div className="song-name">
								{ this.props.MASAS_songInfo.trackTitle }
							</div>
							<div className="artist-name">
								{ this.props.SC_songInfo.user.username }
							</div>
						</div>
					:
						<div></div>
				}
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(PlayingArtwork)