/**
 * patching request needs to be moved to a redux action creator (thunk)
 * patching url hard coded to dev url. wtf ??
 * updateprofileinfo is not a function ; call redux thunk action creator
 * lose jquery dependency
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateSongMoodModalValue } from '../../reducers/actions/Profile.js'

import {
	getCookie,
	updateNotificationBar,
	updateProfileInfo,
 } from '../../MASAS_functions.jsx'

import {
	TimePicker,
	Button,
 } from '../UI/UI.jsx'

/**
 * Redux container
 */

const reduxStatePropTypes = {
	MASASuser: PropTypes.string,
	moodValue: PropTypes.number,
}

const mapStateToProps = function(state) {
	return {
		moodValue: state.profileReducer.changeSongMoodValue,
		MASASuser: state.appReducer.MASASuser,
	}
}

const reduxDispatchPropTypes = {
	updateMoodValue: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		updateMoodValue: (discoverNumber) => dispatch(updateSongMoodModalValue(discoverNumber)),
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

	MASAS_info: PropTypes.object,
	SC_info: PropTypes.object,
	toggleModal: PropTypes.func,
}

const smartDefaultProps = {
}

class ChangeMoodModalSmart extends React.Component {
    constructor(props) {
        super(props)

		this.changeMood = this.changeMood.bind(this)
    }

	changeMood() {
		var header = 'Bearer ' + this.props.MASASuser
		var csrftoken = getCookie('csrftoken')

		$.ajax({
			type: 'PATCH',
			url: this.props.MASAS_info.url,
			headers: {
				'Authorization': header,
				'X-CSRFToken': csrftoken
			},
			data: {
				timeInterval: 'http://localhost:8000/api/time-intervals/' + this.props.moodValue + '/',
			},
			success: (r) => {
				this.props.toggleModal()
				updateNotificationBar('Song updated')
				updateProfileInfo()
			},
			error: (e) => {
				updateNotificationBar('Error')
			}
		})
	}

	render() {
		return (
			<div className="profile-modal--wrapper">
				<div className="song-info--wrapper">
					<div className="artwork">
						{
							this.props.SC_info.artwork_url ?
								<img src={ this.props.SC_info.artwork_url } alt="artwork" />
							:
								''
						}
					</div>
					<div className="song-title">
						{ this.props.SC_info.title }
					</div>
				</div>
				<div className="profile-modal-content">
					<h2>
						Would you like to update which discover mood your sound will play on?
					</h2>
					<div className="suggest-time-modal--wrapper">
						<TimePicker
							wrapperClassName="suggest-time-modal--wrapper"
							canvasId="suggest-time-modal-timePicker-canvas-id"
							initialDiscover={ parseInt(this.props.MASAS_info.timeInterval.substr(this.props.MASAS_info.timeInterval.length - 2, 1)) }
							currentDiscover={ this.props.moodValue }
							onSliderChange={ this.props.updateMoodValue }
							showHashtag={ true } />
					</div>
					<Button
						isSecondaryAction={ false }
						isBigButton={ false }
						isDisabled={ false }
						onClick={ this.changeMood }>
						yes
					</Button>
				</div>
				<div className="cancel-button" onClick={ this.props.toggleModal }>Cancel</div>
			</div>
		)
	}
}

ChangeMoodModalSmart.propTypes = smartPropTypes
ChangeMoodModalSmart.defaultProps = smartDefaultProps

const ChangeMoodModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangeMoodModalSmart)

export {
	ChangeMoodModal,
}