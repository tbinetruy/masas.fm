import React, { PropTypes } from 'react'
import { connect }from 'react-redux'

import { closeAndEmptyMainModal } from '../../reducers/actions/App.js'

import { Header } from '../Header/Header.jsx'
import { Footer } from '../Footer/Footer.jsx'
import { Discover } from '../Discover/Discover.jsx'
import { NavSidebar } from '../NavSidebar/NavSidebar.jsx'
var { Modal } = require('../UI/UI.jsx')
import { PlayerAudioTag } from '../Player/PlayerAudioTag.jsx'
import { PlayerMobile } from '../Player/PlayerMobile.jsx'

/**
 * Redux container
 */

const reduxStatePropTypes = {
	bgFilter: PropTypes.object,
	isModalOpened: PropTypes.bool,
	modalContent: PropTypes.element,
	modalType: PropTypes.number,
}

const mapStateToProps = function(state) {
	return {
		bgFilter: state.appReducer.bgFilter,
		modalType: state.appReducer.modalType,
		isModalOpened: state.appReducer.isModalOpened,
		modalContent: state.appReducer.modalContent,
	}
}

const reduxDispatchPropTypes = {
	closeModal: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		closeModal: () => dispatch(closeAndEmptyMainModal())
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

	children: PropTypes.element,
	hideLoadingModalZIndex: PropTypes.number,			// loading modal z-index
	loadingModalAnim: PropTypes.string,				// loading modal animation
}

const smartDefaultProps = {
	hideLoadingModalZIndex: 100,
	loadingModalAnim: 'fadeout-loading-modal 1s linear',
}

const AppDumbClass = props => {
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
		opacity: props.hideLoadingModalZIndex ? 0 : 1,
		animation: props.loadingModalAnim,
		pointerEvents: props.hideLoadingModalZIndex > 0 ? 'default' : 'none'
	}

	return (
		<NavSidebar>
			<div style = { styles.container } id="mobile-safari-bug-fix--wrapper" >
				<div
					className={
						'body--background'
						+
						( props.bgFilter.blurred ? ' blurred ' : '' )
						+
						( props.bgFilter.saturated ? ' saturated ' : '' )
						+
						( props.bgFilter.mobileBlurred ? ' blurred-mobile ' : '' )
						+
						( props.bgFilter.mobileSaturated ? ' mobileSaturated ' : '' )
						+
						( props.bgFilter.modalBlurred ? ' modal-blurred ' : '' )
						+
						( props.bgFilter.modalSaturated ? ' modal-saturated ' : '' )
						+
						( props.bgFilter.black ? ' black ' : '' )
					}
					id="body--background">
					<div className="bg-image" id="app-bg-image"></div>
				</div>
				<Header />
					<div
						className={ 'modal-blur--wrapper' + ( props.isModalOpened && props.modalType !== 2 ? ' blurred' : '' )}
						style={{
							opacity: !(props.isModalOpened && props.modalType === 4) ? 1 : 0,
						}}>
						{
							props.children ?
								props.children
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
				isOpened={ props.isModalOpened }
				closeModalFunc={ props.closeModal }
				type={ props.modalType }>
				{ props.modalContent }
			</Modal>
			<PlayerMobile />
		</NavSidebar>
	)
}

AppDumbClass.propTypes = smartPropTypes
AppDumbClass.defaultProps = smartDefaultProps


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
	AppDumb,
}
