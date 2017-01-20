var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/CreateProfile.jsx")

// var {goToURL} = require("../../MASAS_functions.jsx")
// import { BlurBackground } from "../MASAS_mixins.jsx"
// var { Link } = require("../UI/UI.jsx")
// var { browserHistory } = require('react-router')

import ProfileEdit from "./ProfileEdit.jsx"
var { getCookie } = require("../../MASAS_functions.jsx")

var CreateProfile = React.createClass({
	propTypes: {
		saveProfile: React.PropTypes.func,
		closeModal: React.PropTypes.func,
	},

	componentWillMount: function() {
	},

	saveProfile: function() {
		this.props.saveProfile(getCookie, this.props.closeModal)
	},

	render: function() {
		return (
			<div className="create-profile--wrapper">
				<ProfileEdit
					show={ true } />

				<div onClick={ this.saveProfile }>Save</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateProfile)