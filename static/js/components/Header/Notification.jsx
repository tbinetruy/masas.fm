import * as React from 'react'

import { connect }from 'react-redux'

import {
	updateUserStep,
} from '../../reducers/actions/Profile.js'

/**
 * Redux container
 */

const mapStateToProps = function(state) {
	return {
		notificationText: state.headerReducer.notificationText,
		tipCTA: state.headerReducer.tipCTA,
		tipText: state.headerReducer.tipText,
		tipNumber: state.headerReducer.tipNumber,
		userData: state.appReducer.userData,
	}
}

const mapDispatchToProps = function(dispatch) {
	return {
		updateUserStep: step => dispatch(updateUserStep(step)),
	}
}

/**
 * Notification div dumb
 */
const NotificationDiv = ({ text, translateUp }) => (
	<div
		className={ 'notification--wrapper2' + (translateUp ? ' translate-up ' : '') }>
		<div className="notification-text" id="notification-text">
			{ text }
		</div>
	</div>
)

NotificationDiv.propTypes = {
	text: React.PropTypes.string.isRequired,
	translateUp: React.PropTypes.bool,
}

/**
 * Tip div dumb
 */
const TipDiv = ({ tipText, tipNumber, updateUserStep, className, tipCTA }) => (
	<div className={ 'tip--wrapper' + className }>
		<div className="tip-text" id="tip-text">
			{ tipText }
		</div>
		<div
			className='tip-control'
			onClick={ () => updateUserStep(tipNumber) }
			>
			{ tipCTA }
		</div>
	</div>
)

TipDiv.propTypes = {
	className: React.PropTypes.string,
	tipCTA: React.PropTypes.node,
	tipNumber: React.PropTypes.number,
	tipText: React.PropTypes.string.isRequired,
	updateUserStep: React.PropTypes.func.isRequired,
}

/**
 * Dumb component
 */
const NotificationSystemDumb = ({ notificationText, tipText, tipNumber, updateUserStep, tipCTA }) => (
	<div
		className="notification--wrapper1"
		style={{ pointerEvents: (tipText === '' ? 'none' : 'initial') }}>
		<TipDiv
			tipCTA={ tipCTA }
			tipText={ tipText }
			tipNumber={ tipNumber }
			updateUserStep={ updateUserStep }
			className={ tipText === '' ? ' hidden ' : '' }
			/>
		{
			notificationText !== '' ?
				<NotificationDiv
					text={ notificationText }
					translateUp={ tipText === '' ? true : false }
					/>
			:
				''
		}
	</div>
)

NotificationSystemDumb.propTypes = {
	notificationText: React.PropTypes.string,
	tipCTA: React.PropTypes.node,
	tipNumber: React.PropTypes.number,
	tipText: React.PropTypes.string,
	updateUserStep: React.PropTypes.func,
}

/**
 * Smart component
 */
class NotificationSystemSmart extends React.Component {
	constructor(props) {
		super(props)
	}

	getTipText() {
		let hasUserSeenTip = false

		if(this.props.userData.usersteps)
			hasUserSeenTip = this.props.userData.usersteps
				.map(e => e.step === this.props.tipNumber)
				.reduce((e, acc) => acc + e)

		if(hasUserSeenTip)
			return ''
		else
			return this.props.tipText
	}

	render() {
		return (
			<NotificationSystemDumb
				notificationText={ this.props.notificationText }
				tipText={ this.getTipText() }
				tipNumber={ this.props.tipNumber }
				updateUserStep={ this.props.updateUserStep }
				tipCTA={ this.props.tipCTA }
			/>
		)
	}
}

NotificationSystemSmart.propTypes = {
	notificationText: React.PropTypes.string,
	tipCTA: React.PropTypes.node,
	tipNumber: React.PropTypes.number,
	tipText: React.PropTypes.string,
	updateUserStep: React.PropTypes.func,
	userData: React.PropTypes.object,
}

const Notification = connect(
	mapStateToProps,
	mapDispatchToProps
)(NotificationSystemSmart)

export {
	Notification,
}

