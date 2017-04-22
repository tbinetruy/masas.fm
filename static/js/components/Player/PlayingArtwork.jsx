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
			artworkURL = this.props.SC_songInfo.artwork_url

		return (
			<div>
				<Artwork
					artworkURL={ artworkURL }
					allowPlayPause={ true }
					isItemPlaying={ !this.props.isPaused }
					onArtworkClick={ this.props.isPaused ? this.props.play : this.props.pause }
				/>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(PlayingArtwork)