var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/PlayerMobile.jsx")

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
				<div onClick={ () => this.props.showPlayerMobile(false) }>hello</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(PlayerMobile)