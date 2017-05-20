/**
 * NEEDS DIRECT PARENT WITH => position: relative, height = something, width = something
 */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { changeBgState } from '../../reducers/actions/App.js'

// exeptionally import store to retrieve 1 value (read only)
var { getState } = require('../../reducers/reducers.js')
import { closeModal } from '../../MASAS_functions.jsx'

/**
 * Redux container
 */

const reduxStatePropTypes = {
	backgroundURL: PropTypes.string,
	pageTitle: PropTypes.string,
}

const mapStateToProps = function(state) {
	return {
		backgroundURL: state.homeReducer.backgroundURL,
		pageTitle: state.appReducer.pageTitle,
	}
}

const reduxDispatchPropTypes = {
	modalBlurBg: PropTypes.func,
	modalSaturateBg: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		modalBlurBg: (blur) => dispatch(changeBgState.modalBlur(blur)),
		modalSaturateBg: (sat) => dispatch(changeBgState.modalSaturate(sat)),
	}
}

/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

	children: PropTypes.node,
	closeModalFunc: PropTypes.func, 		// what to execute when clicking on close modal area (arrow or overlay)
	isOpened: PropTypes.bool,			// is modal shown
	type: PropTypes.number, 			// what type the modal is
}

const smartDefaultProps = {
	isOpened: false,
	closeModalFunc: () => {},
	type: 1,
}

class ModalSmart extends React.Component {
    constructor(props) {
        super(props)

		this.closeModal = this.closeModal.bind(this)
    }

	componentWillReceiveProps(nextProps) {
		// update background blur on modal appear/dissapear
		// unless we are on /upload page (it handles background blurs itself)
		if(nextProps.isOpened === false) {
			// remove background blur
			this.props.modalBlurBg(false)
			this.props.modalSaturateBg(false)
		} else if(nextProps.isOpened === true && nextProps.type === 1) {
			this.props.modalBlurBg(true)
			this.props.modalSaturateBg(true)
			// put background blur on
		} else if( nextProps.isOpened === true && (nextProps.type === 2 || nextProps.type === 4)) {
			this.props.modalBlurBg(true)
			this.props.modalSaturateBg(false)
		}
	}

	closeModal() {
		getState().appReducer.closeModalFunc()
		closeModal()
	}

	render() {
		// default modal (report copyright/spam/delete etc)
		if(this.props.type === 1)
			return (
				<div className={ 'MASAS-modal' + (this.props.isOpened ? '' : ' closed') } id="MASAS-modal">
					<div className="modal-overlay" onClick={ this.props.closeModalFunc }>

					</div>
					<div className="modal-content--wrapper">
						<img onClick={ this.props.closeModalFunc } src="/static/img/MASAS_close_icon.svg" className="close-icon" alt="close modal" />
						<div className="modal-content">
							{ this.props.children }
						</div>
					</div>
				</div>
			)
		// tip modal
		else if(this.props.type === 2)
			return (
				<div
					className={ 'MASAS-modal type2' + (this.props.isOpened ? '' : ' closed') }
					id="MASAS-modal"
					onClick={ () => { this.closeModal(); this.props.closeModalFunc() } }>
					<div className="modal-type-2--wrapper">
						<div className="tip-title">
							<img src="/static/img/tip-light-bulb.png" alt="light bulb icon" />
							Tip
						</div>
						<div className="">
								{ this.props.children }
						</div>
					</div>
				</div>
			)
		// info modal (why can't sync song)
		else if(this.props.type === 4)
			return (
				<div
					className={ 'MASAS-modal type2' + (this.props.isOpened ? '' : ' closed') }
					id="MASAS-modal"
					onClick={ () => { this.closeModal(); this.props.closeModalFunc() } }>
					<div className="modal-type-4--wrapper">
						{ this.props.children }
					</div>
				</div>
			)
		// splash screen
		else if(this.props.type === 3)
			return (
				<div className={ 'MASAS-modal type3' + (this.props.isOpened ? '' : ' closed') } id="MASAS-modal">
					<div className="modal-type-3--wrapper">
						{ this.props.children }
					</div>
				</div>
			)
		// create my profile
		else if(this.props.type === 5)
			return (
				<div className={ 'MASAS-modal type5' + (this.props.isOpened ? '' : ' closed') } id="MASAS-modal">
					<div
						className="modal-background"
						style={{
							backgroundImage: 'url(' + this.props.backgroundURL + ')'
						}}>
					</div>
					<div className="modal-type-5--wrapper">
						{ this.props.children }
					</div>
				</div>
			)
	}
}


ModalSmart.propTypes = smartPropTypes
ModalSmart.defaultProps = smartDefaultProps

const Modal = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalSmart)

export {
	Modal,
}