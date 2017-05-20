import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {
	consts as MASAS_consts,
	updateUserStep,
} from '../../MASAS_functions.jsx'
import { ProfileEdit } from './ProfileEdit.jsx'
import { saveProfile } from '../../reducers/actions/Profile.js'
import {
	setEditingProfile,
	updateProfilePicture,
} from '../../reducers/actions/Login.js'
import {
	closeAndEmptyMainModal,
	updatePageTitle,
} from '../../reducers/actions/App.js'
import { Button } from '../UI/UI.jsx'
import { getCookie } from '../../MASAS_functions.jsx'

/**
 * Redux container
 */

const reduxStatePropTypes = {
	pageTitle: PropTypes.string,
	userData: PropTypes.object,
	userToken: PropTypes.string,
}

const mapStateToProps = function(state) {
	return {
		userToken: state.appReducer.MASASuser,
		userData: state.appReducer.userData,
		pageTitle: state.appReducer.pageTitle,
	}
}

const reduxDispatchPropTypes = {
	closeModal: PropTypes.func,
	saveProfile: PropTypes.func,
	setEditingProfile: PropTypes.func,
	updateProfilePicture: PropTypes.func,
	updateTitle: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType, backArrowFunc) => dispatch(updatePageTitle(title, pageType, backArrowFunc)),
		saveProfile: (getCookie, callbackSuccess, callbackError = () => {}) => dispatch(saveProfile(getCookie, callbackSuccess, callbackError)),
		closeModal: () => dispatch(closeAndEmptyMainModal()),
		updateProfilePicture: isDefaultPicture => dispatch(updateProfilePicture(isDefaultPicture)),
		setEditingProfile: isEditingProfile => dispatch(setEditingProfile(isEditingProfile)),
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,
}

const smartDefaultProps = {
}

class CreateProfileSmart extends React.Component {
    constructor(props) {
        super(props)

		this.state = {
			avatar: this.getDefaultAvatar(),
		}

		this.getDefaultAvatar = this.getDefaultAvatar.bind(this)
		this.updateDefaultAvatar = this.updateDefaultAvatar.bind(this)
		this.saveProfile = this.saveProfile.bine(this)
    }

	componentDidMount() {
		this.props.updateTitle('My Profile')		// 0 = menu icon; 1 = arrow back
	}

	componentWillUnmount() {
		// close edit profile form at unmount
		this.props.setEditingProfile(false)
	}

	getDefaultAvatar() {
		const avatarUrlRoot = window.location.origin + '/static/img/avatars/'
		const avatarUrlSuffix = '.svg'
		let randomAvatar = Math.floor(Math.random() * 6)

		return avatarUrlRoot + randomAvatar + avatarUrlSuffix
	}

	// recursive so it always returns new avatar
	updateDefaultAvatar() {
		const avatar = this.getDefaultAvatar()

		if(avatar === this.state.avatar)
			this.updateDefaultAvatar()
		else
			this.setState({ avatar })
	}

	saveProfile() {
		this.props.saveProfile(getCookie, this.props.closeModal)

		this.props.updateProfilePicture(this.state.avatar)

		updateUserStep(this.props.userData, this.props.userToken, MASAS_consts.userSteps.HAS_CREATED_PROFILE)
	}

	render() {
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
}

CreateProfileSmart.propTypes = smartPropTypes
CreateProfileSmart.defaultProps = smartDefaultProps

const CreateProfile = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateProfileSmart)

export {
	CreateProfile,
}
