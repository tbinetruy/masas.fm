import {
	Button,
	Link,
	TimePicker
} from '../UI/UI.jsx'


import {
	changeModalContent,
	toogleIsModalOpened,
	updatePageTitle,
} from '../../reducers/actions/App.js'

import {
	closePickTimeWindow,
	handlePickTimeUpload,
	updateIsUploadButtonDisabled,
} from '../../reducers/actions/UploadSC.js'

import { ModalContent } from './ModalContent.jsx'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { getCookie } from '../../MASAS_functions.jsx'
import { updateNotificationBar } from '../../reducers/actions/Header.js'
import { updateProfileInfo } from '../../reducers/actions/Profile.js'


/**
 * Redux container
 */

const reduxStatePropTypes = {
	MASASuser: PropTypes.string,
	isUploadButtonDisabled: PropTypes.bool,
	pickTimeUpload: PropTypes.number,
	track: PropTypes.object,			// array containing track information
}

const mapStateToProps = function(state) {
	return {
		track: state.uploadSCReducer.choosingTime,
		MASASuser: state.appReducer.MASASuser,
		pickTimeUpload: state.uploadSCReducer.pickTimeUpload,
		isUploadButtonDisabled: state.uploadSCReducer.isUploadButtonDisabled,
	}
}

const reduxDispatchPropTypes = {
	closeWindow: PropTypes.func,
	emitNotification: PropTypes.func,
	handleTimePickerChange: PropTypes.func,
	updateIsUploadButtonDisabled: PropTypes.func,
	updateModalContent: PropTypes.func,
	updateProfileInfo: PropTypes.func,
	updateTitle: PropTypes.func,
	toogleModal: PropTypes.func,
}

const mapDispatchToProps = function(dispatch) {
	return {
		toogleModal: () => dispatch(toogleIsModalOpened()),
		updateModalContent: modalContent => dispatch(changeModalContent(modalContent)),
		updateTitle: (title, pageType, callback) => dispatch(updatePageTitle(title, pageType, callback)),
		closeWindow: () => dispatch(closePickTimeWindow()),
		handleTimePickerChange: newDiscover => dispatch(handlePickTimeUpload(newDiscover)),
		emitNotification: text =>  dispatch(updateNotificationBar(text)),
		updateProfileInfo: () => dispatch(updateProfileInfo()),
		updateIsUploadButtonDisabled: isUploadButtonDisabled => dispatch(updateIsUploadButtonDisabled(isUploadButtonDisabled)),
	}
}


/**
 * Smart component
 */

const smartPropTypes = {
	...reduxStatePropTypes,
	...reduxDispatchPropTypes,

	checkUserStep: PropTypes.func,		// check user step and show tip modal if necessary
	visible: PropTypes.bool,				// is cancel button visible
}

const smartDefaultProps = {
	checkUserStep: () => {}
}

class PickTimeUploadSmart extends React.Component {
    constructor(props) {
        super(props)

		this.submitSong = this.submitSong.bind(this)
		this.openModal = this.openModal.bind(this)
    }

	componentWillMount() {
		this.props.updateTitle('Upload', 1, this.props.closeWindow)		// 0 = menu icon; 1 = arrow back

		// disable uplaod button until user has interacted with sun
		this.props.updateIsUploadButtonDisabled(true)

		this.props.checkUserStep()
	}

	submitSong() {

		var csrftoken = getCookie('csrftoken')
		var header = 'Bearer ' + this.props.MASASuser
		$.ajax({
			type: 'POST',
			url: 'api/songs/',
			headers: {
				'Authorization': header,
				'X-CSRFToken': csrftoken
			},
			data: {
				trackTitle: this.props.track.title,
				trackDuration: this.props.track.duration,
				SC_ID: this.props.track.id,
				timeInterval: 'http://localhost:8000/api/time-intervals/' + this.props.pickTimeUpload + '/'
			},
			success: () => {
				this.props.emitNotification('song synced ;)')

				// UPDATE USER INFO
				this.props.updateProfileInfo()

				// CLOSE MODAL
				this.props.toogleModal()

				// CLOSE CHOOSING TIME
				this.props.closeWindow()

			},
			error: (err) => {
				// CLOSE MODAL
				this.props.toogleModal()

				// EMIT NOTIFICATION
				this.props.emitNotification(err.responseJSON.SC_ID)
			},
		})
	}

	openModal() {
		// USE THIS LIFECYCLE FUNCTION TO UPDATE MODAL CONTENT
		var that = this
		this.props.updateModalContent(
			<ModalContent onSubmit={ that.submitSong } />
			)
		this.props.toogleModal()
	}

	render() {

		return (
			<div className="pick-time-sc-sync">
				<div className="song-name--wrapper">
					{
						this.props.track.artwork_url ?
							<img src={this.props.track.artwork_url} alt="song artwork" className="artwork" />
						:
							<div className="artwork"></div>
					}

					<h2 className="song-title">{this.props.track.title}</h2>
				</div>
				<div className="pickTime--wrapper">
					<div className="canvas">
						<TimePicker
							initialDiscover={ 2 }
							currentDiscover={ this.props.pickTimeUpload }
							onSliderChange={ this.props.handleTimePickerChange }
							wrapperClassName="timePicker--pick-time-upload--wrapper"
							initText="Drag the sun around!"
							ref="timePicker"
							onFirstSunMove={ () => this.props.updateIsUploadButtonDisabled(false) }
							canvasId="timePicker--pick-time-upload--id" />
					</div>
				</div>
				<div className="button--wrapper">
					<Button
						className="submit"
						small={true}
						white={true}
						isDisabled={ this.props.isUploadButtonDisabled }
						onClick={this.openModal}>Submit</Button>
					<Link
						to="/upload"
						className="cancel-button"
						onClick={this.props.closeWindow}>
						<span>cancel</span>
					</Link>
				</div>
			</div>
		)
	}
}


PickTimeUploadSmart.propTypes = smartPropTypes
PickTimeUploadSmart.defaultProps = smartDefaultProps

const PickTimeUpload = connect(
    mapStateToProps,
    mapDispatchToProps
)(PickTimeUploadSmart)

export {
	PickTimeUpload,
}
