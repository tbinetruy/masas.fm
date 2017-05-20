import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { ProfileWrapper } from './ProfileWrapper.jsx'
import { ProfileDumb } from './ProfileDumb.jsx'

var { getCookie, isObjectEmpty } = require('../../MASAS_functions.jsx')

import {
	getPublicProfileInfo,
	getSCinfo,
	saveProfile,
	toggleEditingProfile,
	updateProfileBackArrowFunc,
	updatePublicProfileInfo,
	updateUserSCSongs
} from '../../reducers/actions/Profile.js'

import { updatePageTitle } from '../../reducers/actions/App.js'


/**
 * Redux container
 */

const reduxStatePropTypes = {
	isEditingProfile: PropTypes.bool,
	publicProfileInfo: PropTypes.object,
	textboxValues: PropTypes.object,
	userData: PropTypes.object,
	userSCSongs: PropTypes.array,
	userToken: PropTypes.string,
	backArrowFunc: PropTypes.func,
}

const mapStateToProps = function(state) {
	return {
		userToken: state.appReducer.MASASuser,
		userData: state.appReducer.userData,
		isEditingProfile: state.profileReducer.isEditingProfile,
		textboxValues: state.profileReducer.textboxValues,
		publicProfileInfo: state.profileReducer.publicProfileInfo,
		userSCSongs: state.profileReducer.userSCSongs,
		backArrowFunc: state.profileReducer.backArrowFunc,
	}
}

const reduxDispatchPropTypes = {
	getPublicProfileInfo: PropTypes.func,
	getSCinfo: PropTypes.func,
	resetBackArrowFunc: PropTypes.func,
	saveProfile: PropTypes.func,
	toggleEditingProfile: PropTypes.func,
	updatePublicProfileInfo: PropTypes.func,
	updateTitle: PropTypes.func,
	updateUserSCSongs: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType, backArrowFunc) => dispatch(updatePageTitle(title, pageType, backArrowFunc)),
		toggleEditingProfile: () => dispatch(toggleEditingProfile()),
		updatePublicProfileInfo: publicProfileInfo => dispatch(updatePublicProfileInfo(publicProfileInfo)),
		updateUserSCSongs: userSCSongs => dispatch(updateUserSCSongs(userSCSongs)),
		getPublicProfileInfo: (userPk) => dispatch(getPublicProfileInfo(userPk)),
		getSCinfo: () => dispatch(getSCinfo()),
		saveProfile: (getCookie) => dispatch(saveProfile(getCookie)),
		resetBackArrowFunc: () => dispatch(updateProfileBackArrowFunc(null)),
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

	route: PropTypes.object,
	routeParams: PropTypes.object,
}

const smartDefaultProps = {
}

class ProfileSmart extends React.Component {
    constructor(props) {
        super(props)

		this.updateTitle = this.updateTitle.bind(this)
		this.getPublicProfileInfo = this.getPublicProfileInfo.bind(this)
		this.updatePageTitle = this.updatePageTitle.bind(this)
		this.getSCinfo = this.getSCinfo.bind(this)
		this.saveProfile = this.saveProfile.bind(this)
    }

	componentWillMount() {
		this.updateTitle('My Profile')		// 0 = menu icon; 1 = arrow back

		this.getSCinfo()

		this.getPublicProfileInfo()
	}

	componentWillUnmount() {
		if(Object.keys(this.props.publicProfileInfo).length !== 0)
			this.props.updatePublicProfileInfo({})

		// reset back arrow func
		this.props.resetBackArrowFunc(null)
	}

	// componentWillReceiveProps: function(nextProps, nextState) {
	componentWillReceiveProps(nextProps) {
		if(nextProps.route.publicProfile !== this.props.route.publicProfile) {
			if(nextProps.route.publicProfile)
				this.getPublicProfileInfo(nextProps)
			else
				this.props.updatePublicProfileInfo({})
			window.setTimeout(() => this.getSCinfo(), 0)
		}
	}

	componentDidUpdate(prevProps) {
		if(JSON.stringify(this.props.userData.songs) !== JSON.stringify(prevProps.userData.songs))
			this.getSCinfo()

		this.updatePageTitle()
	}

	updateTitle(title) {
		if(this.props.backArrowFunc)
			this.props.updateTitle(title, 1, this.props.backArrowFunc)
		else
			this.props.updateTitle(title, 0)
	}

	getPublicProfileInfo(props = null) {
		if(props === null)
			props = this.props

		if(typeof(props.routeParams.username) !== 'undefined')
			this.props.getPublicProfileInfo(props.routeParams.username)
	}

	updatePageTitle() {
		if(this.isPublicProfile) {
			if(!isObjectEmpty(this.props.publicProfileInfo)) {
				var titleStr = this.props.publicProfileInfo.name ? this.props.publicProfileInfo.name : this.props.publicProfileInfo.username
				this.updateTitle(titleStr + '\'s Profile')
			}
		} else
			this.updateTitle('My Profile')
	}

	getSCinfo() {
		this.props.getSCinfo()
	}


	saveProfile() {
		this.props.saveProfile(getCookie)
	}

	render() {
		var showProfile = false
		var userData = {}
		this.isPublicProfile = typeof(this.props.routeParams.username) !== 'undefined'
		var { isPublicProfile } = this

		if(isPublicProfile) {
			showProfile = !isObjectEmpty(this.props.publicProfileInfo)
			userData = this.props.publicProfileInfo
		} else {
			showProfile = !isObjectEmpty(this.props.userData)
			userData = this.props.userData

			if(this.props.userToken === '')
				showProfile = false
		}

		if(showProfile) {
			return <ProfileDumb
				userData={ userData }
				isPublicProfile={ isPublicProfile }
				isEditingProfile={ this.props.isEditingProfile }
				userSCSongs={ this.props.userSCSongs }
				toogleEditingProfile={ this.props.toggleEditingProfile }
				saveProfile={ this.saveProfile } />
		} else {
			return (
				<div style={{display: 'flex', flex: 1}}>
					<ProfileWrapper />
				</div>
			)
		}
	}
}

ProfileSmart.propTypes = smartPropTypes
ProfileSmart.defaultProps = smartDefaultProps

const Profile = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileSmart)

export {
	Profile,
}
