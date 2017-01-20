var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/CreateProfile.jsx")

import { updateUserStep, consts as MASAS_consts } from "../../MASAS_functions.jsx"

// import { BlurBackground } from "../MASAS_mixins.jsx"
// var { Link } = require("../UI/UI.jsx")
// var { browserHistory } = require('react-router')

import ProfileEdit from "./ProfileEdit.jsx"
var { getCookie } = require("../../MASAS_functions.jsx")

var CreateProfile = React.createClass({
	propTypes: {
		userToken: React.PropTypes.string,
		userData: React.PropTypes.object,

		saveProfile: React.PropTypes.func,
		closeModal: React.PropTypes.func,
		updateProfilePicture: React.PropTypes.func,
	},

	getInitialState: function() {
		return {
			avatar: this.getDefaultAvatar(),
		}
	},

	getDefaultAvatar: function() {
		const avatarUrlRoot = window.location.origin + "/static/img/avatars/"
		const avatarUrlSuffix = ".svg"
		let randomAvatar = Math.floor(Math.random() * 6)

		return avatarUrlRoot + randomAvatar + avatarUrlSuffix
	},

	// recursive so it always returns new avatar
	updateDefaultAvatar: function() {
		const avatar = this.getDefaultAvatar()

		if(avatar === this.state.avatar)
			this.updateDefaultAvatar()
		else
			this.setState({ avatar })
	},

	saveProfile: function() {
		this.props.saveProfile(getCookie, this.props.closeModal)

		this.props.updateProfilePicture(this.state.avatar)

		updateUserStep(this.props.userData, this.props.userToken, MASAS_consts.userSteps.HAS_CREATED_PROFILE)
	},

	updateUserStep: function() {
		// not in redux because does not affect redux state

	},

	render: function() {
		return (
			<div className="create-profile--wrapper">
				<div className="avatar--wrapper">
					<img
						src={ this.state.avatar }
						onClick={ this.updateDefaultAvatar }
						className="avatar"
						alt="avatar" />
				</div>
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