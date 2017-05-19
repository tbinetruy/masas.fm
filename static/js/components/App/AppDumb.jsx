import * as React from 'react'
import { connect }from 'react-redux'

import { closeAndEmptyMainModal } from '../../reducers/actions/App.js'

var Header = require('../Header/Header.jsx')
var Footer = require('../Footer/Footer.jsx')
var Discover = require('../Discover/Discover.jsx')
var NavSidebar = require('../NavSidebar/NavSidebar.jsx')
var { Modal } = require('../UI/UI.jsx')
var PlayerAudioTag = require('../Player/PlayerAudioTag.jsx')
var PlayerMobile = require('../Player/PlayerMobile.jsx')

/**
 * Redux container
 */


const mapStateToProps = function(state) {
	return {
		bgFilter: state.appReducer.bgFilter,
		modalType: state.appReducer.modalType,
		isModalOpened: state.appReducer.isModalOpened,
		modalContent: state.appReducer.modalContent,
	}
}

const mapDispatchToProps = function(dispatch) {
	return {
		closeModal: () => dispatch(closeAndEmptyMainModal())
	}
}


/**
 * Smart component
 */
class AppDumbClass extends React.Component {
	getDefaultProps() {
		return {
			hideLoadingModalZIndex: 100,
			loadingModalAnim: 'fadeout-loading-modal 1s linear',
		}
	}

	componentWillMount() {
	}

	render() {
		const authCookieFrontgroundStyle = {
			position: 'fixed',
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: 'black',
			color: 'white',
			opacity: this.props.hideLoadingModalZIndex ? 0 : 1,
			animation: this.props.loadingModalAnim,
			pointerEvents: this.props.hideLoadingModalZIndex > 0 ? 'default' : 'none'
		}

		return (
			<NavSidebar>
				<div style = { styles.container } id="mobile-safari-bug-fix--wrapper" >
					<div
						className={
							'body--background'
							+
							( this.props.bgFilter.blurred ? ' blurred ' : '' )
							+
							( this.props.bgFilter.saturated ? ' saturated ' : '' )
							+
							( this.props.bgFilter.mobileBlurred ? ' blurred-mobile ' : '' )
							+
							( this.props.bgFilter.mobileSaturated ? ' mobileSaturated ' : '' )
							+
							( this.props.bgFilter.modalBlurred ? ' modal-blurred ' : '' )
							+
							( this.props.bgFilter.modalSaturated ? ' modal-saturated ' : '' )
							+
							( this.props.bgFilter.black ? ' black ' : '' )
						}
						id="body--background">
						<div className="bg-image" id="app-bg-image"></div>
					</div>
					<Header />
						<div
							className={ 'modal-blur--wrapper' + ( this.props.isModalOpened && this.props.modalType !== 2 ? ' blurred' : '' )}
							style={{
								opacity: !(this.props.isModalOpened && this.props.modalType === 4) ? 1 : 0,
							}}>
							{
								this.props.children ?
									this.props.children
								:
									<Discover />
							}
						</div>
						<div
							style={ authCookieFrontgroundStyle }>
							<img
								style={{
									height: '7rem',
									width: '7rem',
								}}
								src="/static/img/MASAS_logo-M.svg"
								alt="loading" />
						</div>

					<Footer />

				</div>
				<PlayerAudioTag />
				<Modal
					isOpened={ this.props.isModalOpened }
					closeModalFunc={ this.props.closeModal }
					type={ this.props.modalType }>
					{ this.props.modalContent }
				</Modal>
				<PlayerMobile />
			</NavSidebar>
		)
	}
}

AppDumbClass.propTypes = {
	bgFilter: React.PropTypes.object,
	children: React.PropTypes.element,
	closeModal: React.PropTypes.func,
	hideLoadingModalZIndex: React.PropTypes.number,			// loading modal z-index
	isModalOpened: React.PropTypes.bool,
	loadingModalAnim: React.PropTypes.string,				// loading modal animation
	modalContent: React.PropTypes.element,
	modalType: React.PropTypes.number,
}


const styles = {
	container: {
		height: window.innerHeight + 'px',
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: 'black',
	}
}

const AppDumb = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppDumbClass)

export {
	AppDumb
}
