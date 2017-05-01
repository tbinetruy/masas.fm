var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/PlayerMobile.jsx")

var { PlayerBar } = require("./PlayerBar.jsx")

import ProgressBar from "../Footer/ProgressBar.jsx"
import PlayingArtwork from "./PlayingArtwork.jsx"


const PlayerMobile = React.createClass({
	propTypes: {
		isPlayerMobileShown: React.PropTypes.bool,

		showPlayerMobile: React.PropTypes.func,
	},

	componentWillMount: function() {
	},

	render: function() {
		return (
			<div className={ "player-mobile--top-wrapper" + (this.props.isPlayerMobileShown ? " show" : "") }>
				<div
					className="close-button--wrapper"
					onClick={ () => this.props.showPlayerMobile(false) }>
					<img src="/static/img/icon_close.svg" alt="close" />
				</div>
				<div className="header">
					MASAS Player
				</div>
				<div className="player-mobile-discover--wrapper">
					<PlayingArtwork />
				</div>
                <div className="player-mobile-player--wrapper">
					<ProgressBar />
					<PlayerBar
						isPlayerMobile={ true }/>
				</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(PlayerMobile)