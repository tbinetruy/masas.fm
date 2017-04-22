var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/PlayerMobile.jsx")

var { PlayerBar } = require("./PlayerBar.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
// import { BlurBackground } from "../MASAS_mixins.jsx"
// var { Link } = require("../UI/UI.jsx")
// var { browserHistory } = require('react-router')

// var Template = (props) => {

// }

var PlayerMobile = React.createClass({
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
					close
				</div>
				<div className="player-mobile-discover--wrapper">
				</div>
                <div className="player-mobile-player--wrapper">
					<PlayerBar />
				</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(PlayerMobile)