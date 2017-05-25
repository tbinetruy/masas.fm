import React from 'react'
import PropTypes from 'prop-types'
import { connect }from 'react-redux'

import {
	changeModalContent,
	closeAndEmptyMainModal,
	logout,
	toogleIsModalOpened,
	updateSplashScreenLoginMessage
} from '../../reducers/actions/App.js'
import {
	Button,
	Link,
} from '../UI/UI.jsx'
import { browserHistory } from 'react-router'
import { SplashScreen } from '../App/SplashScreen.jsx'

/**
 * Dumb component
 */
const MenuLink = props => (
	<div className="menu-link">
		<img src={ props.src } alt="profile pic" />
		<Link to={ props.URL } onClick={ props.onClick }>{ props.children }</Link>
	</div>
)

MenuLink.propTypes = {
	URL: PropTypes.string,
	children: PropTypes.node,
	onClick: PropTypes.func,
	src: PropTypes.string,
}

/**
 * Redux container
 */

const reduxStatePropTypes = {

}

const mapStateToProps = function(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
		userData: state.appReducer.userData,
		isModalOpened: state.appReducer.isModalOpened,
	}
}

const reduxDispatchPropTypes = {

}

const mapDispatchToProps = function(dispatch) {
	return {
		logout: () => dispatch(logout()),
		updateLoginMessage: message => dispatch(updateSplashScreenLoginMessage(message)),
		updateModalContent: (modalContent, modalType) => dispatch(changeModalContent(modalContent, modalType)),
		toogleModal: () => dispatch(toogleIsModalOpened()),
		closeModal: () => dispatch(closeAndEmptyMainModal()),
	}
}

/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

	MASASuser: PropTypes.string,
	closeModal: PropTypes.func,
	dispatch: PropTypes.func,
	isModalOpened: PropTypes.bool,
	logout: PropTypes.func,
	toogleModal: PropTypes.func,
	updateLoginMessage: PropTypes.func,
	updateModalContent: PropTypes.func,
	userData: PropTypes.object,
}

const smartDefaultProps = {
}

class HeaderDropdownSmart extends React.Component {
    constructor(props) {
        super(props)

		this.logout = this.logout.bind(this)
    }

	componentWillReceiveProps() {
	}

	logout() {
		this.props.logout()
	}

	render() {
		if (this.props.MASASuser !== '') {
			return (
				<div className="dropdown--wrapper">
					<div
						onClick={ () => { this.props.closeModal(); browserHistory.push('/profile') } }
						className="username--wrapper">
						<Link to="/profile">
							<img src={ this.props.userData.avatar_url } alt="profile picture" className="profile-picture" />
							<span className="username" id="username-header"> {this.props.userData.name ? this.props.userData.name : this.props.userData.username}</span>
						</Link>
					</div>
					<div className="dropdown-content">
						<MenuLink onClick={ this.props.closeModal } src='/static/img/MASAS_play_number.svg' URL="/profile">My Profile</MenuLink>
						<hr />
						<MenuLink onClick={ this.props.closeModal }  src='/static/img/MASAS_logo_world.svg' URL="/legals">Legals</MenuLink>
						<hr />
						<MenuLink onClick={ this.props.closeModal }  src='/static/img/MASAS_settings.svg' URL="/manifesto">About Us</MenuLink>
						<hr />
						<MenuLink onClick={ () => { this.props.closeModal(); this.logout() } }  src='/static/img/MASAS_icon_log_out.svg' URL="/">Sign out</MenuLink>
					</div>
				</div>
			)
		} else
			return (
				<div className="dropdown--wrapper" >
					<Button
						isBigButton={ false }
						isSecondaryAction={ true }
						onClick={ () => {
							!this.props.isModalOpened ? this.props.toogleModal() : 0
							this.props.updateLoginMessage('')
							this.props.updateModalContent(<SplashScreen startPage={ 1 } />, 3)
						} }>
							Log-in
					</Button>
				</div>
			)
	}
}

HeaderDropdownSmart.propTypes = smartPropTypes
HeaderDropdownSmart.defaultProps = smartDefaultProps

const HeaderDropdown = connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderDropdownSmart)

export {
	HeaderDropdown,
}