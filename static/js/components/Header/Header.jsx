import React, { PropTypes } from 'react'
import { connect }from 'react-redux'

import { Notification } from './Notification.jsx'
import { HeaderDropdown } from './HeaderDropdown.jsx'

var { getPathList } = require('../../MASAS_functions.jsx')
var Link = require('../UI/Link.jsx')

import {
	closeAndEmptyMainModal,
	toogleNavSidebar,
} from '../../reducers/actions/App.js'

import { toogleIsFooterOpened } from '../../reducers/actions/Footer.js'

import { changeHomePageNumber } from '../../reducers/actions/Home.js'

/**
 * Redux container
 */

const reduxStatePropTypes = {
	MASASuser: PropTypes.string,
	backArrowFunc: PropTypes.func,
	isAppFetching: PropTypes.bool,
	isModalOpened: PropTypes.bool,
	isPlayerBarOpened: PropTypes.bool,
	modalType: PropTypes.number,
	pageTitle: PropTypes.string,
	pageType: PropTypes.number,
	songPlaying: PropTypes.string,
	user: PropTypes.string,
}

const mapStateToProps = function(state) {
	return {
		pageType: state.appReducer.pageType,
		pageTitle: state.appReducer.pageTitle,
		user: state.appReducer.MASASuser,
		isPlayerBarOpened: state.footerReducer.isOpened,
		backArrowFunc: state.appReducer.backArrowFunc,
		isAppFetching: state.appReducer.isAppFetching,
		songPlaying: state.playerReducer.songPlaying,
		MASASuser: state.appReducer.MASASuser,
		isModalOpened: state.appReducer.isModalOpened,
		modalType: state.appReducer.modalType,
	}
}

const reduxDispatchPropTypes = {
	closeModal: PropTypes.func,
	goToHomepageSlide1: PropTypes.func,
	onSetNavSidebarOpen: PropTypes.func,
	toogleIsOpened: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		onSetNavSidebarOpen: () => dispatch(toogleNavSidebar()),
		toogleIsOpened: () => dispatch(toogleIsFooterOpened()),
		goToHomepageSlide1: () => dispatch(changeHomePageNumber(1,4)),
		closeModal: () => dispatch(closeAndEmptyMainModal()),
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

class HeaderSmart extends React.Component {
    constructor(props) {
        super(props)
    }

	render() {
		let formatForModal = false
		if(this.props.modalType === 5 && this.props.isModalOpened)
			formatForModal = true

		return (
			<nav  className={ 'header' + (formatForModal ? ' show-mobile' : '') }>
				<div className="ajax-loader--wrapper">
					<div className={ 'ajax-loader' + (this.props.isAppFetching ? ' visible' : '') }>
					</div>
				</div>
				<Notification />
				<div className="top-decoration--top-border">
				</div>
				<div className="top-decoration">
				</div>
				<div className="row middle-xs desktop-header">
					<div className="col-xs-10 links--wrapper">
						<div className="box" style={{
							display: 'flex',
							flex: 2,
							flexDirection: 'row',
							justifyContent: 'space-between',
							position: 'relative',
							maxWidth: '37rem',
						}}>
							<Link to="/" className="logo" onClick={ () => { this.props.goToHomepageSlide1(); this.props.closeModal() } }>
								<img src="/static/img/navlogo.png" alt="MASAS" className="logo" />
							</Link>
							<div className="header-links--wrapper" style={{ display: 'flex' }}>
								<div className={ 'header-link first' + (getPathList.discover === window.location.pathname ? ' active' : '')}>
									<Link onClick={ this.props.closeModal } to="/discover" disabled={ false }>Discover</Link>
								</div>
								<div className={ 'header-link' + (getPathList.likes  === window.location.pathname ? ' active' : '') }>
									<Link onClick={ this.props.closeModal } to="/likes" disabled={false}>Likes</Link>
								</div>
								<div className={ 'header-link' + (getPathList.upload === window.location.pathname ? ' active' : '') }>
									<Link onClick={ this.props.closeModal } to="/upload" disabled={false}>Upload</Link>
								</div>
							</div>
						</div>
						<HeaderDropdown />
					</div>
				</div>
				<div className="row middle-xs phone-header">
					<div className="col-xs-3">
						<div className="box" style={ formatForModal ? { pointerEvents: 'none', opacity: 0 } : {} }>
							{ this.props.pageType === 0 ?
								<img onClick={ this.props.onSetNavSidebarOpen} src="/static/img/MASAS_hamburger_menu.svg" alt="menu" className="menu-icon" />
								:
								<img onClick={ () => { this.props.backArrowFunc(); this.props.closeModal() } } src="/static/img/MASAS_arrow_left.svg" alt="back" className="menu-icon" />
							}
						</div>
					</div>
					<div className="col-xs-6">
							<div className="box title">{ this.props.pageTitle }</div>
					</div>
					<div className="col-xs-3">
					</div>
				</div>
			</nav>
		)
	}
}


HeaderSmart.propTypes = smartPropTypes
HeaderSmart.defaultProps = smartDefaultProps

const Header = connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderSmart)

export {
	Header,
}

