import {
	changeModalContent,
	closeAndEmptyMainModal,
	logout,
	toogleIsModalOpened,
	toogleNavSidebar,
	updateSplashScreenLoginMessage,
} from '../../reducers/actions/App.js'

import { Link } from '../UI/UI.jsx'
import PropTypes from 'prop-types'
import React from 'react'
import Sidebar from 'react-sidebar'
import { SplashScreen } from '../App/SplashScreen.jsx'
import { connect } from 'react-redux'
import { goToURL } from '../../MASAS_functions.jsx'

/**
 * Redux container
 */

const reduxStatePropTypes = {
	MASASuser: PropTypes.string.isRequired,
	isModalOpened: PropTypes.bool,
	navSiderbarOpen: PropTypes.bool.isRequired,
	userData: PropTypes.object.isRequired,
}

const mapStateToProps = function(state) {
	return {
		navSiderbarOpen: state.appReducer.navSiderbarOpen,
		MASASuser: state.appReducer.MASASuser,
		userData: state.appReducer.userData,
		isModalOpened: state.appReducer.isModalOpened,
	}
}

const reduxDispatchPropTypes = {
	closeModal: PropTypes.func,
	logout: PropTypes.func,
	toogleModal: PropTypes.func,
	toogleSidebar: PropTypes.func,
	updateLoginMessage: PropTypes.func,
	updateModalContent: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		toogleSidebar: () => dispatch(toogleNavSidebar()),
		updateLoginMessage: message => dispatch(updateSplashScreenLoginMessage(message)),
		logout: () => dispatch(logout()),
		closeModal: () => dispatch(closeAndEmptyMainModal()),
		updateModalContent: (modalContent, modalType) => dispatch(changeModalContent(modalContent, modalType)),
		toogleModal: () => dispatch(toogleIsModalOpened()),
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

	children: PropTypes.node,
}

const smartDefaultProps = {
}

class NavSidebarSmart extends React.Component {
    constructor(props) {
        super(props)

		this.clearUI = this.clearUI.bind(this)
		this.logout = this.logout.bind(this)
		this.goToLogin = this.goToLogin.bind(this)
		this.goToProfile = this.goToProfile.bind(this)
    }

	goToProfile() {
		goToURL('/profile')
		this.clearUI()
	}

	goToLogin() {
		if(!this.props.isModalOpened)
			this.props.toogleModal()

		this.props.updateLoginMessage('')
		this.props.updateModalContent(<SplashScreen startPage={ 1 } />, 3)
		this.props.toogleSidebar()
	}

	logout() {
		this.clearUI()
		this.props.logout()
	}

	// closes sidebar and modal
	clearUI() {
		this.props.toogleSidebar()
		this.props.closeModal()
	}

	render() {
		var sidebarContent = <div className="navSidebar--wrapper">
						{ this.props.MASASuser !== '' ?
							<div className="profile-picture--wrapper" onClick={ this.goToProfile }>
								<img src={this.props.userData.avatar_url + '?width=300'}alt="profile-picture" className="profile-picture" />
								<span className="username">My Profile</span>
							</div>
							:
							<div className="profile-picture--wrapper" onClick={ this.goToLogin }>
								<span className="username">Login</span>
							</div>
						}
						<div className="content">
							<div className="nav-links">
								<div className="link">
									<Link to='/crowdradio' onClick={ this.clearUI }>
										crowdradio
									</Link>
								</div>
								<div className="link">
									<Link to='/discover' disabled={ false } onClick={this.clearUI}>
										discover
									</Link>
								</div>
								<div className="link">
									<Link disabled={ false } to="/likes" onClick={this.clearUI}>
										likes
									</Link>
								</div>
								<div className="link">
									<Link disabled={ false } to="/upload" onClick={this.clearUI}>
										upload
									</Link>
								</div>
							</div>
							<div className="navSidebar-footer">
								<Link to="/legals" onClick={this.clearUI}>Legals</Link>
								<Link disabled={true}>Settings</Link>
								{ this.props.MASASuser ?
									<Link to="/" onClick={this.logout}>Logout</Link>
									:
									<div style={{ display: 'none' }}></div>
								}
							</div>
						</div>
					</div>

		const navBarStylesOverride = {
			root: {
				overflow: 'hidden',
			},
			sidebar: {
				zIndex: 12,
			},
			content: {
				overflow: 'hidden',
			},
			overlay: {
				zIndex: 11,
			},
			dragHandle: {
				zIndex: 3,
			}
		}

		return (
			<Sidebar sidebar={ sidebarContent }
				open={ this.props.navSiderbarOpen }
				onSetOpen={ this.props.toogleSidebar }
				styles={ navBarStylesOverride }
				touchHandleWidth={ 20 }>
				{ this.props.children }
			</Sidebar>
		)
	}
}

NavSidebarSmart.propTypes = smartPropTypes
NavSidebarSmart.defaultProps = smartDefaultProps

const NavSidebar = connect(
    mapStateToProps,
    mapDispatchToProps
)(NavSidebarSmart)

export {
	NavSidebar,
}
