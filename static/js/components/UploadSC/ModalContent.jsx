import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
	Button,
} from '../UI/UI.jsx'

import { toogleIsModalOpened } from '../../reducers/actions/App.js'


/**
 * Redux container
 */

const reduxStatePropTypes = {

}

const mapStateToProps = function(state) {
	return {
	}
}

const reduxDispatchPropTypes = {
	toogleIsModalOpened: PropTypes.func,

}

const mapDispatchToProps = function(dispatch) {
	return {
		toogleIsModalOpened: () => dispatch(toogleIsModalOpened()),
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,
	onSubmit: PropTypes.func.isRequired,				// function to execute when submitting form
}

const smartDefaultProps = {
}

class ModalContentSmart extends React.Component {
    constructor(props) {
        super(props)
    }

	render() {
		return (
			<div className="confirm-ownership--wrapper">
				<div className="lock-icon--wrapper">
					<img
						src="/static/img/MASAS_icon_i_certify.svg"
						className="lock-icon"
						alt="i certify icon" />
				</div>
				<div className="checkbox--wrapper">
					<p className="paragraph">
					Before you get Discovered, please certify that:
					</p>
					<ul className="bullets" type="disc">
						<li>You have the explicit permission from all right-holders of this sound to agree to the Terms of Use.</li>
						<li>This track is NOT a “Spam” or “Commercial”.</li>
						<li>No royalties will be paid to any of the right-holders of this sound for this upload.</li>
					</ul>
					<div className="submit--wrapper">
						<Button
							isBigButton={ true }
							isSecondaryAction={ false }
							onClick={this.props.onSubmit}
							className="submit">
							Upload
						</Button>
					</div>
				</div>
			</div>
		)
	}
}

ModalContentSmart.propTypes = smartPropTypes
ModalContentSmart.defaultProps = smartDefaultProps

const ModalContent = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalContentSmart)

export {
	ModalContent,
}
