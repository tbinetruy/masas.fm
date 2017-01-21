var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/CreateProfile.jsx")

import { updateUserStep, consts as MASAS_consts } from "../../MASAS_functions.jsx"

// import { BlurBackground } from "../MASAS_mixins.jsx"
var { Button } = require("../UI/UI.jsx")
// var { browserHistory } = require('react-router')

import ProfileEdit from "./ProfileEdit.jsx"
var { getCookie } = require("../../MASAS_functions.jsx")

var CreateProfile = React.createClass({
	propTypes: {
		userToken: React.PropTypes.string,
		userData: React.PropTypes.object,
		pageTitle: React.PropTypes.string,

		saveProfile: React.PropTypes.func,
		closeModal: React.PropTypes.func,
		updateProfilePicture: React.PropTypes.func,
		updateTitle: React.PropTypes.func,
		setEditingProfile: React.PropTypes.func,
	},

	getInitialState: function() {
		return {
			avatar: this.getDefaultAvatar(),
		}
	},

	componentDidMount: function() {
		this.props.updateTitle('My Profile')		// 0 = menu icon; 1 = arrow back
	},

	componentWillUnmount: function() {
		// close edit profile form at unmount
		this.props.setEditingProfile(false)
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
				<h1 className="page-title">
					{ this.props.pageTitle }
				</h1>
				<div className="alignment">
					<div className="avatar--wrapper">
						<img
							src={ this.state.avatar }
							onClick={ this.updateDefaultAvatar }
							className="avatar"
							alt="avatar" />
					</div>
					<div className="create-profile-form">
						<div className="scroll--wrapper">
							<ProfileEdit
								show={ true } />
						</div>

						<Button onClick={ this.saveProfile } className="save-button">Save</Button>
					</div>
				</div>
			</div>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateProfile)